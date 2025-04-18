import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Represents a single chat message with sender/receiver info and timestamps.
 */
interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: Date;
  readAt: Date | null;
}

/**
 * Represents a user in the chat, including their typing status.
 */
interface User {
  id: number;
  name: string;
  avatar: string;
  isTyping: boolean;
}

/**
 * Props for the MessageList component.
 */
interface MessageListProps {
  /** An array of message objects to display. */
  messages: Message[];
  /** The user object representing the current logged-in user. */
  currentUser: User;
  /** The user object representing the other participant in the chat. */
  otherUser: User;
}

/**
 * Renders a list of chat messages, grouped by date, including sender avatars,
 * timestamps, and a typing indicator.
 */
export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUser,
  otherUser,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  /**
   * Scrolls the message list to the bottom smoothly.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Effect hook to scroll to the bottom whenever the messages array changes.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Memoized hook to group messages by date (YYYY-MM-DD format).
   * This optimizes performance by only recalculating groups when messages change.
   */
  const groupedMessages = useMemo(() => {
    const groups: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      const dateStr = format(new Date(message.createdAt), "yyyy-MM-dd");
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(message);
    });
    return groups;
  }, [messages]);

  /**
   * Generates a user-friendly display string for a given date string (YYYY-MM-DD).
   * Returns 'Today', 'Yesterday', or a formatted date string (e.g., "MMMM d, yyyy").
   * @param {string} dateStr - The date string in YYYY-MM-DD format.
   * @returns {string} The display string for the date.
   */
  const getDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === format(today, "yyyy-MM-dd")) return "Today";
    if (dateStr === format(yesterday, "yyyy-MM-dd")) return "Yesterday";
    return format(date, "MMMM d, yyyy");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      {/* Iterate over message groups (grouped by date) */}
      {Object.entries(groupedMessages).map(([dateStr, dateMessages]) => (
        <div key={dateStr} className="space-y-5">
          {/* Date Separator */}
          <div className="flex justify-center">
            <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium text-gray-500 shadow">
              {getDateDisplay(dateStr)}
            </span>
          </div>

          {/* Iterate over messages within the current date group */}
          {dateMessages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"
                  } items-end gap-3`}
              >
                {/* Other user's avatar (shown for messages not sent by current user) */}
                {!isCurrentUser && (
                  <Avatar className="h-10 w-10 shadow-sm">
                    <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                    <AvatarFallback className="bg-[#FEBEBE]/30 text-[#FEBEBE] text-sm">
                      {otherUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Message bubble with animation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[75%] ${
                    isMobile ? "max-w-[85%]" : ""
                  } px-5 py-3 text-base rounded-2xl leading-relaxed ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-[#FFCE35]/90 to-[#3B55D9]/10 text-gray-900 rounded-br-sm"
                      : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-sm text-gray-500 text-right mt-1">
                    {format(new Date(message.createdAt), "h:mm a")}
                  </p>
                </motion.div>

                {/* Current user's avatar (shown for messages sent by current user) */}
                {isCurrentUser && (
                  <Avatar className="h-10 w-10 shadow-sm">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-[#3B55D9]/20 text-[#3B55D9] text-sm">
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Typing indicator for the other user */}
      {otherUser.isTyping && (
        <div className="flex items-end gap-3">
          <Avatar className="h-10 w-10 shadow-sm">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback className="bg-[#FEBEBE]/20 text-[#FEBEBE] text-sm">
              {otherUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Animated dots indicating typing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FEBEBE]/20 rounded-2xl px-5 py-3 rounded-bl-sm"
          >
            <div className="flex gap-2 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBEBE] animate-pulse"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBEBE] animate-pulse delay-150"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBEBE] animate-pulse delay-300"></div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reference element to enable scrolling to the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};
