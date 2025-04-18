import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { z } from "zod";
import { storage } from "./storage";
import { insertMessageSchema, insertConversationSchema } from "@shared/schema";
import { log } from "./vite";

// Type for the websocket clients map
interface WebSocketClient extends WebSocket {
  userId?: number;
}

// Type for WebSocket messages
type WSMessageType = 
  | { type: "message"; data: any }
  | { type: "typing_start"; userId: number }
  | { type: "typing_end"; userId: number };

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP Server
  const httpServer = createServer(app);
  
  // Create WebSocket Server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store connected clients
  const clients = new Map<number, WebSocketClient>();

  wss.on("connection", (ws: WebSocketClient) => {
    log("WebSocket connected", "ws");
    
    // Handle incoming messages
    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        log(`Received message: ${JSON.stringify(data)}`, "ws");
        
        // Handle authentication
        if (data.type === "auth") {
          const userId = parseInt(data.userId);
          if (!isNaN(userId)) {
            ws.userId = userId;
            clients.set(userId, ws);
            
            // Update user's online status
            await storage.updateUser(userId, { lastSeen: new Date() });
            
            log(`Client authenticated with userId: ${userId}`, "ws");
          }
        }
        
        // Handle new message
        else if (data.type === "message" && ws.userId) {
          const { receiverId, content } = data;
          
          if (receiverId && content) {
            // Create the message in storage
            const message = await storage.createMessage({
              senderId: ws.userId,
              receiverId,
              content
            });
            
            // Send to recipient if online
            const recipientWs = clients.get(receiverId);
            if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
              recipientWs.send(JSON.stringify({
                type: "message",
                data: message
              }));
            }
            
            // Send confirmation back to sender
            ws.send(JSON.stringify({
              type: "message_sent",
              data: message
            }));
          }
        }
        
        // Handle typing indicators
        else if (data.type === "typing_start" && ws.userId) {
          const receiverId = data.receiverId;
          
          // Update user's typing status
          await storage.updateUser(ws.userId, { isTyping: true });
          
          // Notify the recipient if they're online
          const recipientWs = clients.get(receiverId);
          if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
            recipientWs.send(JSON.stringify({
              type: "typing_start",
              userId: ws.userId
            }));
          }
        }
        
        else if (data.type === "typing_end" && ws.userId) {
          const receiverId = data.receiverId;
          
          // Update user's typing status
          await storage.updateUser(ws.userId, { isTyping: false });
          
          // Notify the recipient if they're online
          const recipientWs = clients.get(receiverId);
          if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
            recipientWs.send(JSON.stringify({
              type: "typing_end",
              userId: ws.userId
            }));
          }
        }
      } catch (error) {
        log(`Error processing message: ${error}`, "ws");
      }
    });
    
    // Handle disconnection
    ws.on("close", async () => {
      if (ws.userId) {
        // Update last seen timestamp
        await storage.updateUser(ws.userId, { 
          lastSeen: new Date(),
          isTyping: false 
        });
        
        // Remove from clients map
        clients.delete(ws.userId);
        log(`Client disconnected: userId ${ws.userId}`, "ws");
      }
    });
  });

  // API Routes for Users
  app.get('/api/users', async (req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      
      // Don't send passwords to the client
      const safeUsers = users.map(user => {
        const { password, ...safeUser } = user;
        return safeUser;
      });
      
      res.json(safeUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  
  app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Don't send password to the client
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  // API Routes for Messages
  app.get('/api/messages/:senderId/:receiverId', async (req: Request, res: Response) => {
    try {
      const senderId = parseInt(req.params.senderId);
      const receiverId = parseInt(req.params.receiverId);
      
      if (isNaN(senderId) || isNaN(receiverId)) {
        return res.status(400).json({ error: 'Invalid user IDs' });
      }
      
      const messages = await storage.getMessages(senderId, receiverId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });
  
  app.post('/api/messages', async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const result = insertMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: 'Invalid message data',
          details: result.error.format() 
        });
      }
      
      const message = await storage.createMessage(result.data);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create message' });
    }
  });
  
  app.post('/api/messages/:id/read', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid message ID' });
      }
      
      const message = await storage.markMessageAsRead(id);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark message as read' });
    }
  });

  // API Routes for Conversations
  app.get('/api/conversations/:userId', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      const conversations = await storage.getConversationsForUser(userId);
      
      // Enhance conversations with user details
      const enhancedConversations = await Promise.all(conversations.map(async (conv) => {
        const otherUserId = conv.participant1Id === userId ? conv.participant2Id : conv.participant1Id;
        const otherUser = await storage.getUser(otherUserId);
        
        if (!otherUser) {
          return { ...conv, otherUser: { id: otherUserId } };
        }
        
        // Don't send password to the client
        const { password, ...safeUser } = otherUser;
        
        return {
          ...conv,
          otherUser: safeUser
        };
      }));
      
      res.json(enhancedConversations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  });
  
  app.post('/api/conversations', async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const result = insertConversationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: 'Invalid conversation data',
          details: result.error.format() 
        });
      }
      
      // Check if conversation already exists
      const existingConversation = await storage.getConversation(
        result.data.participant1Id, 
        result.data.participant2Id
      );
      
      if (existingConversation) {
        return res.status(200).json(existingConversation);
      }
      
      const conversation = await storage.createConversation(result.data);
      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create conversation' });
    }
  });

  return httpServer;
}
