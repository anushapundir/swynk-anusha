import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

/**
 * Represents a user participating in a conversation.
 */
interface User {
  id: number;
  name: string;
  avatar: string;
  isTyping: boolean;
}

/**
 * Represents a single conversation entry in the sidebar.
 */
interface Conversation {
  id: number;
  participant1Id: number;
  participant2Id: number;
  lastMessageAt: Date;
  lastMessagePreview: string;
  otherUser: User; // Details of the other participant in the conversation
}

/**
 * Props for the ConversationSidebar component.
 */
interface ConversationSidebarProps {
  /** An array of conversation objects to display. */
  conversations: Conversation[];
  /** The ID of the currently logged-in user. */
  currentUserId: number;
  /** The ID of the currently selected conversation, or null if none is selected. */
  selectedConversationId: number | null;
  /** Callback function triggered when a conversation is selected. */
  onSelectConversation: (conversation: Conversation) => void;
}

/**
 * A sidebar component that displays a list of conversations, allows searching,
 * indicates typing status, and handles conversation selection.
 */
export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  currentUserId, // Note: currentUserId is passed but not directly used in this component's logic
  selectedConversationId,
  onSelectConversation,
}) => {
  /** State for the search input value. */
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Memoized hook to filter conversations based on the search term.
   * Filters by other user's name or last message preview, case-insensitively.
   * Returns the original list if the search term is empty.
   */
  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) return conversations;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.otherUser.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        conv.lastMessagePreview.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [conversations, searchTerm]);

  return (
    <div className="h-full flex flex-col bg-[#1B1F3B] border-r border-[#3ABEFF]/10">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-[#3ABEFF]/10">
        <h1 className="text-2xl font-bold text-[#F5F5F5] mb-4">Messages</h1>
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D3D3D3]">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..." // More specific placeholder
            className="w-full py-2.5 pl-10 pr-4 rounded-full bg-[#222741] border border-[#3ABEFF]/20 text-base text-[#F5F5F5] placeholder-[#D3D3D3]/50 outline-none focus:ring-2 focus:ring-[#3ABEFF]/40 transition-shadow"
            aria-label="Search conversations"
          />
        </div>
      </div>

      {/* Conversation List Area */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          // Message displayed when no conversations match the search
          <div className="p-5 text-center text-[#D3D3D3]/70 text-base mt-4">
            No conversations found matching "{searchTerm}"
          </div>
        ) : (
          // Map over filtered conversations to render each item
          filteredConversations.map((conversation) => {
            const isSelected = selectedConversationId === conversation.id;

            return (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: "rgba(58, 190, 255, 0.05)" }}
                whileTap={{ backgroundColor: "rgba(58, 190, 255, 0.1)" }}
                className={`px-5 py-4 cursor-pointer border-b border-[#3ABEFF]/10 transition-colors duration-150 ${
                  isSelected ? "bg-[#3ABEFF]/15" : "hover:bg-[#3ABEFF]/5" // Adjusted hover/selected states
                }`}
                onClick={() => onSelectConversation(conversation)}
                aria-current={isSelected ? "page" : undefined} // Accessibility for selected item
              >
                <div className="flex items-center gap-4">
                  {/* Avatar and Typing Indicator */}
                  <div className="relative flex-shrink-0"> {/* Added flex-shrink-0 */}
                    <Avatar className="h-12 w-12 border border-[#3ABEFF]/20 shadow-sm">
                      <AvatarImage
                        src={conversation.otherUser.avatar}
                        alt={`${conversation.otherUser.name}'s avatar`}
                      />
                      <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] text-lg font-bold">
                        {conversation.otherUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* Typing indicator dot */}
                    {conversation.otherUser.isTyping && (
                      <motion.span // Added animation to typing indicator
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#6EE7B7] rounded-full border-2 border-[#1B1F3B] shadow-md"
                      />
                    )}
                  </div>

                  {/* Conversation Details (Name, Timestamp, Preview) */}
                  <div className="flex-1 min-w-0"> {/* Ensure text truncation works */}
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="text-base font-semibold text-[#F5F5F5] truncate">
                        {conversation.otherUser.name}
                      </h3>
                      <span className="text-sm text-[#D3D3D3]/70 flex-shrink-0 ml-2"> {/* Added flex-shrink-0 and margin */}
                        {format(new Date(conversation.lastMessageAt), "p")}
                      </span>
                    </div>
                    {/* Last message preview or typing indicator text */}
                    <p
                      className={`text-sm truncate ${
                        conversation.otherUser.isTyping
                          ? "text-[#6EE7B7] italic font-medium" // Style typing indicator text
                          : "text-[#D3D3D3]/80"
                      }`}
                    >
                      {conversation.otherUser.isTyping
                        ? "Typing..."
                        : conversation.lastMessagePreview}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
