import React, { useState, useEffect } from "react";
import SimpleChat from "@/components/messaging/SimpleChat";
import ConversationList from "@/components/messaging/ConversationList";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { useIsMobile } from "@/hooks/use-mobile"; // Custom hook for responsive behavior
import { ChevronLeft } from "lucide-react";

/**
 * Represents a single chat message.
 */
interface Message {
  id: number; // Unique identifier for the message
  content: string; // The text content of the message
  sender: "user" | "other"; // Indicates if the message was sent by the current user or the contact
  timestamp: string; // Formatted timestamp of when the message was sent
}

/**
 * Represents a contact and their conversation history.
 */
interface Contact {
  id: number; // Unique identifier for the contact
  name: string; // Name of the contact
  avatar: string; // URL to the contact's avatar image
  isTyping?: boolean; // Optional flag indicating if the contact is currently typing
  lastMessage?: string; // Preview of the last message in the conversation
  messages: Message[]; // Array of messages in the conversation
}

/**
 * Messaging page component.
 * Provides a two-pane chat interface with a conversation list and an active chat window.
 * Handles contact selection, message sending (with simulated replies), and responsive layout adjustments.
 */
export const Messaging = () => {
  // Hook to determine if the current view is mobile
  const isMobile = useIsMobile();
  // State to control whether the chat view is shown on mobile (vs. the conversation list)
  const [showChat, setShowChat] = useState(!isMobile); // Default to showing chat on desktop, list on mobile

  // TODO: Replace with dynamic contact/message data fetched from an API or state management.
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
        name: "Sophia Miller",
        avatar:         "https://randomuser.me/api/portraits/women/45.jpg",
      isTyping: true,
      lastMessage: "That sounds great! Maybe we can work...",
      messages: [
        {
          id: 1,
          content: "Hey! Just saw your pitch on Swynk - absolutely loved it 💡",
          sender: "other",
          timestamp: "10:42 AM"
        },
        {
          id: 2,
          content: "Thanks Sophia! Would love to collab sometime ☕",
          sender: "user",
          timestamp: "10:44 AM"
        },
        {
          id: 3,
          content: "That sounds great! Maybe we can work on a project together.",
          sender: "other",
          timestamp: "10:45 AM"
        },
        {
          id: 4,
          content: "For sure! Let's set up a time to chat more 😊",
          sender: "user",
          timestamp: "10:46 AM"
        }
      ]
    },
    {
      id: 2,
      name: "Alexander Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "I'd be interested in discussing your project",
      messages: [
        {
          id: 1,
          content: "Hello! I saw your profile and was impressed with your experience.",
          sender: "other",
          timestamp: "Yesterday"
        },
        {
          id: 2,
          content: "Thanks Alexander! What do you do?",
          sender: "user",
          timestamp: "Yesterday"
        },
        {
          id: 3,
          content: "I'm a UX designer working with tech startups. I'd be interested in discussing your project.",
          sender: "other",
          timestamp: "Yesterday"
        }
      ]
    },
    {
      id: 3,
        name: "Sophie Wilson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      lastMessage: "Let me know when you're available",
      messages: [
        {
          id: 1,
          content: "Hi! I'm looking for a collaboration partner for my new app idea.",
          sender: "other",
          timestamp: "Monday"
        },
        {
          id: 2,
          content: "Sounds interesting! Tell me more about it.",
          sender: "user",
          timestamp: "Monday"
        },
        {
          id: 3,
          content: "It's a fitness tracking app with social features. Let me know when you're available to chat more about it.",
          sender: "other",
          timestamp: "Monday"
        }
      ]
    },
    {
      id: 4,
      name: "Thomas Anderson",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      lastMessage: "The meetup is next Thursday at 6PM",
      messages: [
        {
          id: 1,
          content: "Are you coming to the tech meetup?",
          sender: "other",
          timestamp: "Last week"
        },
        {
          id: 2,
          content: "I'm thinking about it. When is it?",
          sender: "user",
          timestamp: "Last week"
        },
        {
          id: 3,
          content: "The meetup is next Thursday at 6PM. Would be great to see you there!",
          sender: "other",
          timestamp: "Last week"
        }
      ]
    },
    {
      id: 5,
        name: "Samantha Taylor",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      lastMessage: "Thanks for the feedback!",
      messages: [
        {
          id: 1,
          content: "What did you think of my portfolio?",
          sender: "other",
          timestamp: "2 weeks ago"
        },
        {
          id: 2,
          content: "I thought it was really impressive, especially your UX work!",
          sender: "user",
          timestamp: "2 weeks ago"
        },
        {
          id: 3,
          content: "Thanks for the feedback! I've been working hard on improving my designs.",
          sender: "other",
          timestamp: "2 weeks ago"
        }
      ]
    },
    {
      id: 6,
        name: "Daniel Lee",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      lastMessage: "I'll send you the proposal tomorrow",
      messages: [
        {
          id: 1,
          content: "Do you have time to review a proposal?",
          sender: "other",
          timestamp: "3 weeks ago"
        },
        {
          id: 2,
          content: "Sure, when can you send it?",
          sender: "user",
          timestamp: "3 weeks ago"
        },
        {
          id: 3,
          content: "I'll send you the proposal tomorrow. It's for a new marketing campaign.",
          sender: "other",
          timestamp: "3 weeks ago"
        }
      ]
    }
  ]);

  // State to keep track of the currently selected contact ID.
  const [activeContactId, setActiveContactId] = useState<number>(1); // Default to the first contact

  // Derived state: Find the full contact object based on the activeContactId.
  // Fallback to the first contact if the active ID somehow doesn't match.
  const activeContact = contacts.find(contact => contact.id === activeContactId) || contacts[0];

  /**
   * Handles selecting a contact from the ConversationList.
   * Updates the activeContactId state and switches to the chat view on mobile.
   *
   * @param {number} contactId - The ID of the selected contact.
   */
  const handleContactSelect = (contactId: number) => {
    setActiveContactId(contactId);
    // On mobile, switch view to the chat window when a contact is selected
    if (isMobile) {
      setShowChat(true);
    }
  };

  /**
   * Handles sending a new message from the SimpleChat component.
   * Adds the user's message to the active conversation and simulates a reply from the contact.
   *
   * @param {string} content - The text content of the message to send.
   */
  const handleSendMessage = (content: string) => {
    // Create the new message object for the user
    const newMessage: Message = {
      id: Date.now(), // Use timestamp for unique ID (simple approach)
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Format time
    };

    // Update the contacts state: add the new message to the active conversation
    setContacts(prevContacts =>
      prevContacts.map(contact => {
        if (contact.id === activeContactId) {
          return {
            ...contact,
            messages: [...contact.messages, newMessage], // Append the new message
            lastMessage: content.substring(0, 30) + (content.length > 30 ? "..." : ""), // Update last message preview
            isTyping: false // Assume contact stops typing when user sends message
          };
        }
        return contact;
      })
    );

    // --- Simulate a reply from the contact ---
    // TODO: Replace this simulation with actual WebSocket/API logic for real-time messages.
    setTimeout(() => {
      // Predefined possible responses for simulation
      const responses = [
        "That's a great idea! I'm excited to explore this further.",
        "I've been thinking about something similar! Great minds think alike.",
        "Perfect! I'll put together some initial thoughts and share them with you.",
        "I've worked on something similar before - happy to share my insights!",
        "Looking forward to our collaboration! This is going to be amazing."
      ];
      // Pick a random response
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      // Create the response message object
      const responseMessage: Message = {
        id: Date.now() + 1, // Ensure unique ID
        content: randomResponse,
        sender: "other", // Response is from the contact
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Update contacts state again: add the simulated response message
      setContacts(prevContacts =>
        prevContacts.map(contact => {
          if (contact.id === activeContactId) {
            return {
              ...contact,
              messages: [...contact.messages, responseMessage], // Append the response
              lastMessage: randomResponse.substring(0, 30) + (randomResponse.length > 30 ? "..." : ""), // Update preview
              isTyping: false // Contact finished typing the response
            };
          }
          return contact;
        })
      );

      // Simulate the contact potentially starting to type again after a delay
      setTimeout(() => {
        setContacts(prevContacts =>
          prevContacts.map(contact => {
            if (contact.id === activeContactId) {
              return {
                ...contact,
                // Randomly decide if the contact starts typing again (e.g., 70% chance)
                isTyping: Math.random() > 0.3
              };
            }
            return contact;
          })
        );
      }, 1000 + Math.random() * 3000); // Delay before potentially typing again

    }, 1000 + Math.random() * 2000); // Delay before sending the simulated response
  };

  return (
    // Base container for the entire page
    <div className="min-h-screen bg-[#1B1F3B] text-[#F5F5F5]">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area (adjusts for sidebar) */}
      {/* Using padding and h-screen with calc to manage height */}
      <div className="pl-4 md:pl-24 px-2 md:pr-6 py-4 md:py-6 h-screen max-h-screen overflow-hidden flex flex-col">
        {/* Top Bar within Content Area (Profile Dropdown) */}
        <div className="flex justify-end mb-4">
          <ProfileDropdown />
        </div>

        {/* Main Chat Interface Container */}
        {/* Takes remaining height, rounded corners, shadow, flex for two panes */}
        <div className="w-full h-[calc(100%-4rem)] bg-[#222741] rounded-xl overflow-hidden shadow-xl flex border border-[#3ABEFF]/10">

          {/* Left Pane: Conversation List */}
          {/* Width fixed on desktop, full width on mobile unless chat is shown */}
          <div className={`${isMobile ? (showChat ? 'hidden' : 'w-full') : 'w-[320px]'} flex-shrink-0 bg-[#1B1F3B] border-r border-[#3ABEFF]/10`}>
            <ConversationList
              contacts={contacts}
              activeContactId={activeContactId}
              onSelectContact={handleContactSelect}
            />
          </div>

          {/* Right Pane: Active Chat Window */}
          {/* Takes remaining space, hidden on mobile if list is shown */}
          <div className={`flex-1 bg-[#1B1F3B] ${isMobile && !showChat ? 'hidden' : 'flex flex-col'}`}>
            {/* Mobile Only: Back button to return to conversation list */}
            {isMobile && (
              <button
                onClick={() => setShowChat(false)} // Set state to show the list
                className="p-4 flex items-center text-[#3ABEFF] hover:text-[#3ABEFF]/80 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 mr-2" />
                Back to conversations
              </button>
            )}
            {/* Active Chat Component */}
            <SimpleChat
              contactName={activeContact.name}
              contactAvatar={activeContact.avatar}
              messages={activeContact.messages}
              onSendMessage={handleSendMessage} // Pass the handler function
            />
          </div>
        </div>
      </div>
    </div>
  );
};
