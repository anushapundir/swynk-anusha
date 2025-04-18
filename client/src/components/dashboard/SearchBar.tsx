import { useState } from "react";

/**
 * Props for the SearchBar component.
 */
interface SearchBarProps {
  /**
   * Callback function triggered when a search is performed.
   * @param query The search query string.
   */
  onSearch: (query: string) => void;
  /**
   * Callback function triggered when a category is selected.
   * @param category The ID of the selected category (empty string for "All Posts").
   */
  onCategorySelect: (category: string) => void;
}

// Keep categories as they are
const categories = [
  { id: "", name: "All Posts" }, // id="" represents "All"
  { id: "ai", name: "AI" },
  { id: "frontend", name: "Frontend" },
  { id: "tech", name: "Tech" },
  { id: "startup", name: "Startup" },
];

/**
 * SearchBar component allows users to search for posts and filter by category.
 * It includes a search input field and category filter buttons.
 *
 * @param {SearchBarProps} props - The component props.
 * @param {Function} props.onSearch - Callback function for handling search input submission.
 * @param {Function} props.onCategorySelect - Callback function for handling category selection.
 */
export const SearchBar = ({ onSearch, onCategorySelect }: SearchBarProps) => {
  // State for the current search query entered by the user.
  const [searchQuery, setSearchQuery] = useState("");
  // State for the currently active category filter. Initialize with "" to match the "All Posts" category ID.
  const [activeCategory, setActiveCategory] = useState<string>("");

  /**
   * Handles the submission of the search form.
   * Prevents the default form submission behavior and calls the onSearch callback.
   * @param {React.FormEvent} e - The form event object.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  /**
   * Handles clicks on category filter buttons.
   * Sets the active category state and calls the onCategorySelect callback.
   * @param {string} categoryId - The ID of the clicked category.
   */
  const handleCategoryClick = (categoryId: string) => {
    // Set the clicked category as active
    setActiveCategory(categoryId);
    // Notify the parent component of the category selection
    onCategorySelect(categoryId);
  };

  return (
    <div className="w-full">
      {/* --- Main Container --- */}
      {/* Increased gap for more separation, especially when stacked on mobile */}
      {/* md:items-center ensures vertical alignment on larger screens */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

        {/* --- Search Field --- */}
        {/* Kept max-width for larger screens, w-full ensures it fills space on mobile */}
        <form onSubmit={handleSearch} className="relative w-full md:max-w-lg"> {/* Slightly increased md:max-w */}
          {/* Increased icon size and adjusted left padding accordingly */}
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3ABEFF] text-xl md:text-2xl pointer-events-none"> {/* Added pointer-events-none */}
            🔍
          </span>
          {/* Increased padding (py, pl, pr), font size */}
          <input
            type="text"
            placeholder="✨ Search thoughts, ideas, vibes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-5 py-3 bg-[#222741] text-base md:text-lg text-[#F5F5F5] placeholder-[#D3D3D3]/70
                       rounded-full border border-[#3ABEFF]/20 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]/50 transition duration-200" // Increased focus ring opacity
          />
        </form>

        {/* --- Filter Tags --- */}
        {/* Increased gap for better spacing, especially when wrapped on mobile */}
        {/* justify-center md:justify-end ensures filters center on mobile when wrapped, align right on desktop */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-end">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              // Increased padding, consistent text size (good for mobile tap targets)
              className={`px-4 py-1.5 text-base rounded-full font-medium transition-all duration-200 border whitespace-nowrap
                ${
                  activeCategory === category.id
                    ? "bg-[#3ABEFF]/20 text-[#3ABEFF] border-[#3ABEFF]/40 shadow-sm" // Enhanced active state
                    : "text-[#D3D3D3] border-transparent hover:bg-[#FFE066]/20 hover:text-[#FFE066]"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};