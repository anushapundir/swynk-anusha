import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

/**
 * Defines the available categories for thoughts, including their ID and display name.
 */
const categories = [
  { id: "general", name: "🌈 General" },
  { id: "ai", name: "🤖 AI" },
  { id: "frontend", name: "🎨 Frontend" },
  { id: "tech", name: "🧠 Tech" },
  { id: "startup", name: "🚀 Startup" },
];

/**
 * Props for the ThoughtPost component.
 */
interface ThoughtPostProps {
  /**
   * Callback function triggered when a new thought is posted.
   * @param thought - An object containing the thought text and selected category ID.
   */
  onPostThought: (thought: { text: string; category: string }) => void;
}

/**
 * ThoughtPost component provides a UI for users to compose and publish a new thought.
 * It includes a textarea for the thought content, category selection, action buttons (like emoji insertion),
 * a character counter, and a submit button.
 *
 * @param {ThoughtPostProps} props - The component props.
 */
export const ThoughtPost = ({ onPostThought }: ThoughtPostProps) => {
  // State for the text content of the thought being composed.
  const [thought, setThought] = useState("");
  // State for the ID of the selected category (null if none selected).
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // State to manage the loading indicator during submission.
  const [loading, setLoading] = useState(false);

  // Maximum allowed characters for a thought.
  const maxCharacters = 300;
  // Calculated remaining characters based on current thought length.
  const remainingCharacters = maxCharacters - thought.length;

  /**
   * Handles the form submission for posting a new thought.
   * Prevents default form behavior, validates input, simulates a network request,
   * calls the onPostThought callback, and resets the form state.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Proceed only if thought text exists and a category is selected.
    if (thought.trim() && selectedCategory) {
      setLoading(true); // Show loading indicator
      // Simulate API call delay
      setTimeout(() => {
        // Call the parent component's post handler
        onPostThought({ text: thought, category: selectedCategory });
        // Reset form fields
        setThought("");
        setSelectedCategory(null);
        setLoading(false); // Hide loading indicator
      }, 800);
    }
  };

  return (
    // Main container for the thought posting component
    <div className="relative bg-[#222741] border border-[#3ABEFF]/20 rounded-2xl p-8 shadow-lg transition-all duration-300 z-0">

      {/* Decorative floating thought bubble, hidden during loading */}
      {!loading && (
        <div className="absolute top-[20px] left-[88px] text-3xl z-20 animate-bounce">
            💭
        </div>
      )}

      {/* Conditional Rendering: Loading state or Form */}
      {loading ? (
        // Loading State Placeholder UI (Pulse animation)
        <div className="p-8 animate-pulse space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#2E2E2E]" /> {/* Avatar Placeholder */}
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-[#2E2E2E] rounded w-3/4"></div> {/* Text Placeholder */}
              <div className="h-5 bg-[#2E2E2E] rounded w-5/6"></div> {/* Text Placeholder */}
            </div>
          </div>
          <div className="h-4 w-28 bg-[#2E2E2E] rounded"></div> {/* Badge Placeholder */}
        </div>
      ) : (
        // Main Form Content (visible when not loading)
        // Relative positioning + z-index to keep form elements interactive below the cloud
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="flex items-start gap-4 md:gap-8">
            {/* User Avatar Section */}
            {/* TODO: Replace with actual logged-in user's avatar and name/initials */}
            <div className="rounded-full p-[3px] bg-gradient-to-br from-[#3ABEFF]/40 via-[#6EE7B7]/20 to-[#3ABEFF]/40 shadow">
              <Avatar className="h-12 w-12 md:h-14 md:w-14 ring-2 ring-[#3ABEFF]/40">
                <AvatarImage
                  src={`https://randomuser.me/api/portraits/women/32.jpg`}
                  alt="Sasha Johnson" // TODO: Use dynamic alt text
                />
                <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-semibold text-lg">
                  {/* Generate initials from name */}
                  {("Sasha Johnson").split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Main Content Area: Textarea and Actions */}
            <div className="flex-1 space-y-6">
              {/* Thought Input Textarea */}
              <textarea
                placeholder="What's sparkling in your mind today?"
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                maxLength={maxCharacters}
                className="w-full min-h-[140px] px-6 py-5 text-base resize-none bg-[#1B1F3B]/70 text-[#F5F5F5] placeholder-[#D3D3D3]/60 border border-[#3ABEFF]/20 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]/50 transition"
              />

              {/* Action Buttons Row (Emojis, Category, Submit) */}
              <div className="flex justify-between items-center gap-5 flex-wrap">
                {/* Left side: Emoji Buttons and Category Selector */}
                <div className="flex gap-3 items-center">
                  {/* Placeholder Emoji/Action Buttons */}
                  {/* TODO: Implement functionality for these buttons (e.g., add media) */}
                  {["📸", "🎥", "📝"].map((emoji, i) => (
                    <button
                      key={i}
                      type="button"
                      className="text-[#D3D3D3]/80 hover:text-[#3ABEFF] hover:bg-[#3ABEFF]/10 p-3 rounded-full transition"
                    >
                      <span className="text-xl">{emoji}</span>
                    </button>
                  ))}

                  {/* Category Selector Button and Popup */}
                  <div className="relative">
                    {/* Button to toggle category selection */}
                    <button
                      type="button"
                      className="text-[#D3D3D3]/80 hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/10 p-3 rounded-full transition"
                      // Toggles selection, defaults to 'general' if none selected yet
                      onClick={() =>
                        setSelectedCategory(selectedCategory ? null : "general")
                      }
                    >
                      <span className="text-xl">🧩</span>
                    </button>

                    {/* Category Selection Popup (appears when a category is selected/toggled) */}
                    {selectedCategory && (
                      <div className="absolute top-full left-0 mt-3 z-[999] w-max max-w-xs bg-[#1B1F3B] border border-[#3ABEFF]/30 rounded-xl shadow-xl px-4 py-3 flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => setSelectedCategory(category.id)} // Set selected category on click
                            className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition ${
                              selectedCategory === category.id
                                ? "bg-[#3ABEFF]/20 text-[#3ABEFF]" // Active style
                                : "text-[#D3D3D3] hover:bg-[#FFE066]/20 hover:text-[#1B1F3B]" // Inactive style
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  // Disable button if no thought or category selected
                  disabled={!thought.trim() || !selectedCategory || loading}
                  className="relative overflow-hidden rounded-full px-8 py-3 text-base font-semibold shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-3 group text-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Animated gradient background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] via-[#E94B4B] to-[#FF6B6B] animate-pulse rounded-full z-0"></span>
                  <span className="relative z-10 text-lg">🚀</span>
                  <span className="relative z-10">Post it</span>
                </button>
              </div>

              {/* Character Counter (visible when typing) */}
              {thought.length > 0 && (
                <div className="text-right text-sm text-[#D3D3D3]/80">
                  {/* Highlight counter when near limit */}
                  <span
                    className={
                      remainingCharacters < 20 ? "text-[#FF6B6B]" : ""
                    }
                  >
                    {remainingCharacters} characters remaining
                  </span>
                </div>
              )}

              {/* Selected Category Badge (visible when category selected) */}
              {selectedCategory && (
                <div className="flex justify-end">
                  <Badge
                    variant="outline"
                    className="bg-[#3ABEFF]/10 border-[#3ABEFF]/30 text-[#3ABEFF] text-sm px-3 py-1"
                  >
                    {/* Display the name of the selected category */}
                    {categories.find((c) => c.id === selectedCategory)?.name ??
                      "Category"} {/* Fallback text */}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};