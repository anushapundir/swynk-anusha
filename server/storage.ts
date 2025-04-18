import { 
  users, type User, type InsertUser,
  messages, type Message, type InsertMessage,
  conversations, type Conversation, type InsertConversation
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Message methods
  getMessages(senderId: number, receiverId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  
  // Conversation methods
  getConversation(userId1: number, userId2: number): Promise<Conversation | undefined>;
  getConversationsForUser(userId: number): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private conversations: Map<number, Conversation>;
  private userIdCounter: number;
  private messageIdCounter: number;
  private conversationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.conversations = new Map();
    this.userIdCounter = 1;
    this.messageIdCounter = 1;
    this.conversationIdCounter = 1;
    
    // Initialize sample data directly using the correct types
    const generateUser = (id: number, username: string, name: string) => {
      const user: User = {
        id,
        username,
        password: "password",
        name,
        avatar: `/avatars/${name.toLowerCase()}.png`,
        isTyping: false,
        lastSeen: new Date()
      };
      this.users.set(id, user);
      this.userIdCounter = Math.max(this.userIdCounter, id + 1);
      return user;
    };
    
    // Create sample users
    const user1 = generateUser(1, "sophia", "Sophia");
    const user2 = generateUser(2, "alexander", "Alexander");
    const user3 = generateUser(3, "sophie", "Sophie");
    const user4 = generateUser(4, "thomas", "Thomas");
    const user5 = generateUser(5, "samantha", "Samantha");
    const user6 = generateUser(6, "daniel", "Daniel");
    
    // Create sample conversations and messages
    const createConversationAndMessages = async (user1: User, user2: User, messages: string[]) => {
      const conversation: Conversation = {
        id: this.conversationIdCounter++,
        participant1Id: user1.id,
        participant2Id: user2.id,
        lastMessageAt: new Date(),
        lastMessagePreview: messages[messages.length - 1].substring(0, 30) + "..."
      };
      
      this.conversations.set(conversation.id, conversation);
      
      // Add messages
      let messageDate = new Date();
      messageDate.setHours(messageDate.getHours() - messages.length);
      
      for (const content of messages) {
        const sender = messages.indexOf(content) % 2 === 0 ? user1.id : user2.id;
        const receiver = sender === user1.id ? user2.id : user1.id;
        
        const message: Message = {
          id: this.messageIdCounter++,
          senderId: sender,
          receiverId: receiver,
          content,
          createdAt: new Date(messageDate),
          readAt: null
        };
        
        this.messages.set(message.id, message);
        messageDate = new Date(messageDate.getTime() + 10 * 60000); // 10 minutes later
      }
    };
    
    // Create sample conversations asynchronously
    setTimeout(() => {
      createConversationAndMessages(user1, user2, [
        "Hey! Just saw your pitch on Swynk - absolutely loved it 💡",
        "Thanks Sophia! Would love to collab sometime ☕",
        "That sounds great! Maybe we can work on a project together.",
        "For sure! Let's set up a time to chat more 😊"
      ]);
      
      createConversationAndMessages(user1, user3, [
        "Hi Sophie, I noticed you're also interested in UX design!",
        "Yes! I've been working on some new prototypes lately.",
        "Would love to see them and maybe give some feedback."
      ]);
      
      createConversationAndMessages(user1, user4, [
        "Thomas, did you get my email about the networking event?",
        "Just got it! I'll be there for sure.",
        "Great! Looking forward to seeing you there."
      ]);
    }, 500);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      isTyping: false,
      lastSeen: new Date(),
      name: insertUser.name || "",
      avatar: insertUser.avatar || ""
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  // Message methods
  async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (message) => 
        (message.senderId === senderId && message.receiverId === receiverId) ||
        (message.senderId === receiverId && message.receiverId === senderId)
    ).sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const now = new Date();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: now,
      readAt: null
    };
    this.messages.set(id, message);
    
    // Update or create conversation
    const conversation = await this.getConversation(insertMessage.senderId, insertMessage.receiverId);
    if (conversation) {
      await this.updateConversation(conversation.id, {
        lastMessageAt: now,
        lastMessagePreview: insertMessage.content.slice(0, 50) + (insertMessage.content.length > 50 ? '...' : '')
      });
    } else {
      await this.createConversation({
        participant1Id: insertMessage.senderId,
        participant2Id: insertMessage.receiverId
      });
    }
    
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, readAt: new Date() };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  // Conversation methods
  async getConversation(userId1: number, userId2: number): Promise<Conversation | undefined> {
    return Array.from(this.conversations.values()).find(
      (conversation) => 
        (conversation.participant1Id === userId1 && conversation.participant2Id === userId2) ||
        (conversation.participant1Id === userId2 && conversation.participant2Id === userId1)
    );
  }
  
  async getConversationsForUser(userId: number): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conversation => 
        conversation.participant1Id === userId || 
        conversation.participant2Id === userId
      )
      .sort((a, b) => {
        if (!a.lastMessageAt || !b.lastMessageAt) return 0;
        // Sort by most recent message
        return b.lastMessageAt.getTime() - a.lastMessageAt.getTime();
      });
  }
  
  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.conversationIdCounter++;
    const now = new Date();
    const conversation: Conversation = {
      ...insertConversation,
      id,
      lastMessageAt: now,
      lastMessagePreview: ''
    };
    this.conversations.set(id, conversation);
    return conversation;
  }
  
  async updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(id);
    if (!conversation) return undefined;
    
    const updatedConversation = { ...conversation, ...updates };
    this.conversations.set(id, updatedConversation);
    return updatedConversation;
  }
}

export const storage = new MemStorage();
