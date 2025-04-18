import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Smile, Send } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Assuming a type from the library, replace with actual if available
type EmojiMartData = {
  native: string;
  // Add other properties if needed
};

/**
 * Props for the MessageInput component.
 */
interface MessageInputProps {
  /** Callback function triggered when the user submits a message. */
  onSendMessage: (content: string) => void;
  /** Callback function triggered when the user starts typing. */
  onTypingStart: () => void;
  /** Callback function triggered when the user stops typing. */
  onTypingEnd: () => void;
}

/**
 * A component for composing and sending messages.
 * Includes text input, an emoji picker, and typing indicator logic.
 */
export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTypingStart,
  onTypingEnd,
}) => {
  /** State for the current message input value. */
  const [message, setMessage] = useState("");
  /** State to control the visibility of the emoji picker popover. */
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  /** State to hold the timeout ID for the typing indicator. */
  const [
    typingTimeout,
    setTypingTimeout,
  ] = useState<ReturnType<typeof setTimeout> | null>(null);
  /** Ref for the text input element to allow focusing. */
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles form submission.
   * Prevents default submission, trims the message, calls onSendMessage,
   * clears the input, and stops the typing indicator.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
        onTypingEnd(); // Ensure typing ends immediately on send
      }
    }
  };

  /**
   * Handles user typing activity.
   * Calls onTypingStart and sets/resets a timeout to call onTypingEnd after a delay.
   */
  const handleTyping = () => {
    if (!typingTimeout) {
      onTypingStart(); // Only call start if not already typing
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeout = setTimeout(() => {
      onTypingEnd();
      setTypingTimeout(null);
    }, 2000); // 2-second delay before sending typing end event
    setTypingTimeout(timeout);
  };

  /**
   * Handles the selection of an emoji from the picker.
   * Appends the native emoji character to the message input,
   * hides the picker, and focuses the input field.
   * @param {EmojiMartData} emoji - The selected emoji data object.
   */
  const handleEmojiSelect = (emoji: EmojiMartData) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  /**
   * Effect hook to clear the typing timeout when the component unmounts.
   */
  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-[#222741] border-t border-[#3ABEFF]/10 flex items-center gap-3"
    >
      {/* Emoji Picker Popover */}
      <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
        <PopoverTrigger asChild>
          {/* Button to trigger the emoji picker */}
          <motion.button // Added motion here for consistency
            type="button"
            className="text-[#D3D3D3] hover:text-[#FFE066] transition-colors p-2 rounded-full hover:bg-[#3ABEFF]/10"
            aria-label="Add emoji"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Smile size={22} />
          </motion.button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-none mb-1 bg-transparent shadow-xl"
          align="start"
          side="top"
        >
          {/* Emoji Picker Component */}
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
            previewPosition="none"
            searchPosition="none" // Hide search for cleaner look, if desired
            navPosition="bottom" // Move nav to bottom
          />
        </PopoverContent>
      </Popover>

      {/* Text Input Area */}
      <motion.div
        className="relative flex-1 bg-[#1B1F3B] rounded-full px-5 py-3 shadow-sm border border-[#3ABEFF]/20"
        whileTap={{ scale: 0.995 }}
      >
        <input
          type="text"
          ref={inputRef}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            // Trigger typing on key down unless it's Enter (which submits)
            if (e.key !== "Enter") {
              handleTyping();
            } else {
              // Optionally clear typing timeout immediately on Enter press
              if (typingTimeout) clearTimeout(typingTimeout);
            }
          }}
          className="outline-none w-full text-base text-[#F5F5F5] bg-transparent placeholder-[#D3D3D3]/60"
          aria-label="Message input" // Added accessibility label
        />
      </motion.div>

      {/* Send Button */}
      <motion.button
        type="submit"
        disabled={!message.trim()}
        className={`p-3 rounded-full transition-colors ${
          message.trim()
            ? "bg-[#3ABEFF] text-[#1B1F3B] hover:bg-[#3ABEFF]/90"
            : "bg-[#3ABEFF]/10 text-[#D3D3D3]/60 cursor-not-allowed" // Added cursor-not-allowed
        }`}
        whileHover={message.trim() ? { scale: 1.05 } : {}}
        whileTap={message.trim() ? { scale: 0.95 } : {}}
        aria-label="Send message"
      >
        <Send size={20} />
      </motion.button>
    </form>
  );
};
