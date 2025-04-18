import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Smile } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Represents a single chat message.
 */
interface Message {
  id: number;
  content: string;
  sender: "user" | "other";
  timestamp: string;
}

/**
 * Props for the SimpleChat component.
 */
interface SimpleChatProps {
  /** The name of the contact being chatted with. */
  contactName: string;
  /** The URL for the contact's avatar image. */
  contactAvatar: string;
  /** An array of message objects representing the conversation history. */
  messages: Message[];
  /** Callback function triggered when the user sends a message. */
  onSendMessage: (message: string) => void;
}

/**
 * A component that renders a simple chat interface, including message display and input.
 */
const SimpleChat: React.FC<SimpleChatProps> = ({
  contactName,
  contactAvatar,
  messages,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  // TODO: Implement actual typing indicator logic, potentially driven by props or WebSocket events.
  // const [isTyping, setIsTyping] = useState(false); // Temporarily disable random typing indicator
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Effect hook to scroll to the bottom of the message list when new messages arrive
   * and handle the (currently disabled) typing indicator.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Simulate typing indicator (currently disabled)
    // const typingTimeout = setTimeout(() => {
    //   setIsTyping(Math.random() > 0.5);
    // }, 3000);
    // return () => clearTimeout(typingTimeout);
  }, [messages]);

  /**
   * Handles the form submission when the user sends a message.
   * Prevents default form submission, calls the onSendMessage prop if the input is not empty,
   * and resets the input field.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
      // setIsTyping(true); // Reset typing indicator after sending (currently disabled)
    }
  };

  /**
   * Helper function to get the avatar URL.
   * Currently returns the input URL directly, but could be extended for logic like default avatars.
   * @param {string} url - The avatar URL.
   * @returns {string} The processed avatar URL.
   */
  const getAvatarUrl = (url: string) => url; // Simple helper, might be expanded later

  return (
    <div className="h-full flex flex-col bg-[#1B1F3B] rounded-xl overflow-hidden border border-[#3ABEFF]/10 shadow-lg flex-1">
      {/* Chat Header */}
      <div className="p-5 bg-[#222741] border-b border-[#3ABEFF]/10 flex items-center gap-4">
        <Avatar className="h-12 w-12 ring-2 ring-[#3ABEFF]/40">
          <AvatarImage src={getAvatarUrl(contactAvatar)} alt={contactName} />
          <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-bold">
            {contactName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-[#F5F5F5]">{contactName}</h2>
          {/* {isTyping && ( // Typing indicator display (currently disabled)
            <motion.p
              className="text-sm text-[#6EE7B7] font-medium"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Typing...
            </motion.p>
          )} */}
        </div>
      </div>

      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6 bg-[#1B1F3B]">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Avatar for the 'other' sender */}
            {message.sender === "other" && (
              <Avatar className="w-10 h-10 mr-3 mt-1 ring-1 ring-[#3ABEFF]/20">
                <AvatarImage src={getAvatarUrl(contactAvatar)} alt={contactName} />
                <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] text-xs font-bold">
                  {contactName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm ${
                message.sender === "user"
                  ? "bg-[#3ABEFF] text-[#1B1F3B] rounded-br-sm ml-2"
                  : "bg-[#222741] text-[#F5F5F5] rounded-bl-sm border border-[#3ABEFF]/10"
              } hover:scale-[1.01] transition-all`}
            >
              <p className="text-base">{message.content}</p>
              <p className="text-xs text-[#D3D3D3]/80 text-right mt-1">
                {message.timestamp}
              </p>
            </div>

            {/* Avatar for the 'user' sender */}
            {message.sender === "user" && (
              // TODO: Replace hardcoded user avatar with dynamic data
              <Avatar className="w-10 h-10 ml-3 mt-1 ring-1 ring-[#3ABEFF]/20">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="User Avatar" // Consider making alt text more specific if possible
                />
                <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] text-xs font-bold">
                  {/* // TODO: Generate user initials dynamically */}
                  SJ
                </AvatarFallback>
              </Avatar>
            )}
          </motion.div>
        ))}
        {/* Element to target for scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-[#222741] border-t border-[#3ABEFF]/10 flex items-center gap-3"
      >
        {/* Emoji Picker Button (Placeholder) */}
        <motion.button
          type="button"
          className="text-[#D3D3D3] hover:text-[#FFE066] transition-colors p-2 rounded-full hover:bg-[#3ABEFF]/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open emoji picker" // Added accessibility label
        >
          <Smile size={22} />
        </motion.button>

        {/* Text Input Area */}
        <motion.div
          className="flex-1 bg-[#1B1F3B] rounded-full px-5 py-3 border border-[#3ABEFF]/20 flex items-center"
          whileTap={{ scale: 0.995 }}
        >
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="outline-none w-full bg-transparent text-base text-[#F5F5F5] placeholder-[#D3D3D3]/60"
            aria-label="Message input" // Added accessibility label
          />
        </motion.div>

        {/* Send Button */}
        <motion.button
          type="submit"
          disabled={!inputValue.trim()}
          className={`p-3 rounded-full ${
            inputValue.trim()
              ? "bg-[#3ABEFF] text-[#1B1F3B] hover:bg-[#3ABEFF]/90"
              : "bg-[#3ABEFF]/10 text-[#D3D3D3]/60 cursor-not-allowed" // Added cursor-not-allowed when disabled
          } transition-colors`}
          whileHover={inputValue.trim() ? { scale: 1.1 } : {}}
          whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
          aria-label="Send message" // Added accessibility label
        >
          <Send size={20} />
        </motion.button>
      </form>
    </div>
  );
};

export default SimpleChat;
