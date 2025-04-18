import React, { useState } from "react";
import { Search } from "lucide-react";

/**
 * Represents a contact or conversation participant.
 */
interface Contact {
  id: number;
  name: string;
  avatar: string;
  /** Optional flag indicating if the contact is currently typing. */
  isTyping?: boolean;
  /** Optional preview of the last message in the conversation. */
  lastMessage?: string;
}

/**
 * Props for the ConversationList component.
 */
interface ConversationListProps {
  /** An array of contact objects to display. */
  contacts: Contact[];
  /** The ID of the currently active/selected contact. */
  activeContactId: number | null; // Allow null for no selection
  /** Callback function triggered when a contact is selected. */
  onSelectContact: (contactId: number) => void;
}

/**
 * Renders a list of conversations/contacts with search functionality.
 * Handles displaying avatars (with fallbacks), names, typing indicators, and last messages.
 * Note: This component has significant overlap with ConversationSidebar. Consider consolidating.
 */
const ConversationList: React.FC<ConversationListProps> = ({
  contacts,
  activeContactId,
  onSelectContact,
}) => {
  /** State for the search input query. */
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Filters the contacts based on the search query (case-insensitive match on name).
   */
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Generates an avatar URL.
   * Returns the provided URL if it's a valid web URL (starts with http or /).
   * Otherwise, generates a placeholder avatar using the ui-avatars.com API.
   * @param {string} url - The provided avatar URL string.
   * @param {string} name - The contact's name (used for placeholder generation).
   * @returns {string} The final avatar URL (either original or generated placeholder).
   */
  const getAvatarUrl = (url: string, name: string): string => {
    if (url && (url.startsWith("http") || url.startsWith("/"))) {
      return url;
    }
    // Fallback to ui-avatars.com if no valid URL is provided
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=3ABEFF&color=fff&size=128`; // Added size parameter
  };

  return (
    <div className="h-full flex flex-col bg-[#1B1F3B] rounded-l-xl overflow-hidden border-r border-[#3ABEFF]/10">
      {/* List Header Area */}
      <div className="p-5 border-b border-[#3ABEFF]/10">
        <h2 className="text-xl font-bold text-[#F5F5F5] mb-4">Messages</h2>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#D3D3D3]" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..." // More specific placeholder
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pl-10 pr-4 rounded-full bg-[#222741] border border-[#3ABEFF]/20 text-sm text-[#F5F5F5] placeholder-[#D3D3D3]/50 outline-none focus:ring-2 focus:ring-[#3ABEFF]/40 transition-shadow"
            aria-label="Search contacts"
          />
        </div>
      </div>

      {/* Scrollable Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          // Message when no contacts match search
          <div className="p-4 text-center text-[#D3D3D3]/70 text-sm mt-3">
            {searchQuery ? `No contacts found matching "${searchQuery}"` : "No contacts"}
          </div>
        ) : (
          // Map over filtered contacts to render each list item
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors duration-150 ${
                activeContactId === contact.id
                  ? "bg-[#3ABEFF]/15" // Slightly adjusted selected background
                  : "hover:bg-[#3ABEFF]/10"
              }`}
              role="button" // Indicate clickable element
              aria-current={activeContactId === contact.id ? "true" : undefined}
            >
              {/* Avatar Section */}
              <div className="relative flex-shrink-0"> {/* Added flex-shrink-0 */}
                <div className="h-12 w-12 rounded-full overflow-hidden border border-[#3ABEFF]/20 shadow-sm"> {/* Added shadow */}
                  <img
                    src={getAvatarUrl(contact.avatar, contact.name)}
                    alt={`${contact.name}'s avatar`}
                    className="h-full w-full object-cover bg-[#222741]" // Added background color
                    onError={(e) => {
                      // Optional: Handle image loading errors, e.g., set to default
                      (e.target as HTMLImageElement).src = getAvatarUrl('', contact.name);
                    }}
                  />
                </div>
                {/* Typing Indicator Dot */}
                {contact.isTyping && (
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#1B1F3B] shadow-md" /> {/* Adjusted size/shadow */}
                )}
              </div>

              {/* Name and Status/Last Message Section */}
              <div className="flex-1 min-w-0"> {/* Ensures truncation works */}
                <div className="flex justify-between items-baseline mb-0.5"> {/* Added margin */}
                  <h3 className="font-semibold text-base text-[#F5F5F5] truncate">{contact.name}</h3> {/* Increased font weight/size */}
                </div>
                {/* Display Typing status or Last Message */}
                {contact.isTyping ? (
                  <p className="text-sm text-[#6EE7B7] font-medium italic">Typing...</p> {/* Adjusted style */}
                ) : contact.lastMessage ? (
                  <p className="text-sm text-[#D3D3D3]/80 truncate">{contact.lastMessage}</p> {/* Adjusted style */}
                ) : (
                  <p className="text-sm text-[#D3D3D3]/60 italic">No messages yet</p> // Placeholder if no last message
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
