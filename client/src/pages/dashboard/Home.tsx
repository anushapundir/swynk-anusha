// Home.tsx (Dark Theme Unified & Responsive)
import React, { useState } from "react";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { ThoughtPost } from "@/components/dashboard/ThoughtPost";
import { ThoughtFeed } from "@/components/dashboard/ThoughtFeed";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { SuggestedUsers } from "@/components/dashboard/SuggestedUsers";
import { TrendingThoughts } from "@/components/dashboard/TrendingThoughts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Home component serves as the main dashboard page.
 * It orchestrates the layout including the Sidebar, a sticky header with SearchBar
 * and ProfileDropdown, a main content feed area (ThoughtPost, SuggestedUsers, ThoughtFeed),
 * and a right-hand sidebar with widgets (ProfileCard, TrendingThoughts).
 * It manages the state for search queries and category filtering.
 */
export const Home = () => {
  // State for the current search query entered in the SearchBar.
  const [searchQuery, setSearchQuery] = useState("");
  // State for the selected category filter. Empty string ("" or null) means "All Posts".
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  /**
   * Handles the search query submission from the SearchBar.
   * @param {string} query - The submitted search query.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Optional: Consider resetting category when a new search is performed.
    // setSelectedCategory("");
  };

  /**
   * Handles the category selection from the SearchBar.
   * @param {string} category - The ID of the selected category.
   */
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Optional: Consider clearing search query when a category is selected.
    // setSearchQuery("");
  };

  /**
   * Placeholder handler for when a new thought is posted via ThoughtPost.
   * @param {object} thought - The posted thought object ({ text: string; category: string }).
   */
  const handlePostThought = (thought: { text: string; category: string }) => {
    // TODO: Implement actual logic to add the new thought to the feed or display confirmation.
    console.log("Posted thought:", thought);
  };

  /**
   * Inline component representing the user's profile card displayed in the right sidebar.
   * Shows avatar, name, role, basic stats, and a link to the full profile.
   */
  const ProfileCard = () => (
    // TODO: Replace hardcoded user data with data from authentication context or API.
    <div className="relative bg-[#222741] border border-[#3ABEFF]/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative floating emoji */}
      <div className="absolute -top-3 -right-3 text-2xl animate-bounce">✨</div>

      {/* User Info Section */}
      <div className="flex items-center gap-4 mb-5">
        <Avatar className="h-16 w-16 ring-2 ring-[#3ABEFF]/40 flex-shrink-0">
          <AvatarImage
            src="https://randomuser.me/api/portraits/women/32.jpg" // Placeholder Avatar
            alt="Sasha Johnson" // Placeholder Name
          />
          <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-semibold text-lg">
            SJ {/* Placeholder Initials */}
          </AvatarFallback>
        </Avatar>
        {/* Ensure text truncates correctly if names/roles are long */}
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-[#F5F5F5] truncate">
            Sasha Johnson {/* Placeholder Name */}
          </h2>
          <p className="text-sm text-[#D3D3D3]/80 -mt-0.5 truncate">
            Director of Ops at Swynk {/* Placeholder Role */}
          </p>
        </div>
      </div>

      {/* Profile Stats Section */}
      <div className="space-y-2 text-sm text-[#D3D3D3]/80 mb-6">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">👁️ Profile views</span>
          <span className="font-semibold text-[#3ABEFF]">456</span> {/* Placeholder Stat */}
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">👀 Connections</span>
          <span className="font-semibold text-[#3ABEFF]">128</span> {/* Placeholder Stat */}
        </div>
      </div>

      {/* View Profile Button */}
      {/* TODO: Link this button to the actual user profile page */}
      <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFE066] via-[#FF9A8B]/80 to-[#FF6B6B]/70 text-[#1B1F3B] text-sm font-semibold shadow-md hover:scale-[1.03] transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FFE066]/50">
        View Profile
      </button>
    </div>
  );

  // --- Main Component Return Structure ---
  return (
    // Base container for the entire page
    <div className="min-h-screen bg-[#1B1F3B] text-[#F5F5F5] overflow-x-hidden">
      {/* Sidebar Component (handles its own mobile/desktop rendering) */}
      <Sidebar />

      {/* Main content area, adjusted for the sidebar width on medium screens and up */}
      {/* md:pl-20 should match the desktop sidebar width (e.g., w-20 = 5rem) */}
      <div className="flex flex-col md:pl-20">

        {/* Sticky Header containing SearchBar and ProfileDropdown */}
        <div className="sticky top-0 z-30 bg-[#1B1F3B]/90 backdrop-blur-md border-b border-[#3ABEFF]/20 px-4 md:px-8 py-3">
          {/* Top row of header: Title/Logo and Profile Dropdown */}
          <div className="flex items-center justify-between mb-3">
            {/* Desktop Title */}
            <h1 className="hidden md:block text-xl font-bold text-[#F5F5F5]">
              Dashboard
            </h1>
            {/* Mobile Title/Logo */}
            <div className="md:hidden text-lg font-bold text-[#F5F5F5]">
              Swynk
            </div>
            <ProfileDropdown />
          </div>
          {/* Search Bar integrated into the sticky header */}
          <SearchBar
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Content Columns Container: Holds the main feed and right widgets */}
        {/* Stacks vertically on small screens, side-by-side on large screens (lg:flex-row) */}
        {/* pt-4 adds space below the sticky header */}
        <div className="w-full max-w-[2000px] mx-auto flex flex-col lg:flex-row lg:gap-8 pt-4">

          {/* Left Column (Main Content Feed) */}
          {/* Takes up remaining space on large screens (flex-1) */}
          <div className="flex-1 lg:flex-grow min-w-0 bg-[#1B1F3B] lg:border-x border-[#3ABEFF]/10 px-4 md:px-8 pb-12">
            {/* Thought Posting Component */}
            <div className="py-6">
              <ThoughtPost onPostThought={handlePostThought} />
            </div>
            {/* Suggested Users Component */}
            <div className="py-6">
              <SuggestedUsers />
            </div>
            {/* Thought Feed Component (filtered by selectedCategory) */}
            <div className="pt-6">
              {/* Pass selectedCategory (or empty string for all) to filter the feed */}
              <ThoughtFeed selectedCategory={selectedCategory || ""} />
            </div>
          </div>

          {/* Right Column (Widgets/Sidebar Content) */}
          {/* Fixed width on large screens, hidden below lg breakpoint */}
          <div className="hidden lg:block w-full lg:w-[380px] flex-shrink-0 px-4 md:px-6 py-6 lg:py-0">
            {/* Inner container for sticky positioning of widgets on large screens */}
            {/* lg:sticky top-[100px] - Adjust '100px' based on actual sticky header height + desired gap */}
            <div className="lg:sticky top-[100px] space-y-6">
              <ProfileCard />
              <TrendingThoughts />
            </div>
          </div>
        </div> {/* End Content Columns Container */}
      </div> {/* End Main content area */}
    </div> // End Base container
  );
};

// Exporting as default allows for potential dynamic imports or common routing patterns
export default Home;
