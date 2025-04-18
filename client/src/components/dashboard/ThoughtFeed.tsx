import React from "react";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Keep Badge import if potentially used for category or elsewhere in the future
// import { Badge } from "@/components/ui/badge";

// TODO: Replace with dynamically fetched thoughts from an API.
const dummyThoughts = [
    {
      id: 1,
      user: {
        name: "Sophia Lee",
        username: "@sophiatech",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        isVerified: true,
      },
      text: "Just stumbled upon a fascinating AI paper about neural networks mimicking human intuition. Anyone else exploring this area?",
      category: "ai",
      likes: 42,
      comments: 7,
      time: "2h ago",
    },
    {
      id: 2,
      user: {
        name: "Marco Delgado",
        username: "@marcodev",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        isVerified: false,
      },
      text: "Built a React component library today that cut our development time in half. Reusable components are seriously the way to go.",
      category: "frontend",
      likes: 28,
      comments: 5,
      time: "4h ago",
    },
    {
      id: 3,
      user: {
        name: "Priya Sharma",
        username: "@priyacode",
        avatar: "https://randomuser.me/api/portraits/women/75.jpg",
        isVerified: true,
      },
      text: "Working on a startup that helps businesses adopt green tech solutions. Anyone else in the sustainability + tech space want to connect?",
      category: "startup",
      likes: 35,
      comments: 12,
      time: "6h ago",
  },
];

/**
 * Mapping of category IDs to their corresponding Tailwind CSS classes
 * for styling category badges within the thought feed.
 * Uses more vibrant, filled backgrounds compared to TrendingThoughts badges.
 */
const categoryBadgeStyles: Record<string, string> = {
    ai: "bg-[#3ABEFF] text-[#1B1F3B] border-[#3ABEFF]/60",
    frontend: "bg-[#FFE066] text-[#1B1F3B] border-[#FFE066]/60",
    startup: "bg-[#FF6B6B] text-[#1B1F3B] border-[#FF6B6B]/60",
    tech: "bg-[#6EE7B7] text-[#1B1F3B] border-[#6EE7B7]/60",
    default: "bg-gray-500 text-white border-gray-600", // Fallback style
};

/**
 * Props for the ThoughtFeed component.
 */
interface ThoughtFeedProps {
  /**
   * The ID of the currently selected category to filter the feed.
   * If null or undefined, all thoughts are shown.
   */
  selectedCategory?: string | null;
}

/**
 * ThoughtFeed component displays a list or grid of thought posts.
 * It can be filtered by category and shows user information, post content,
 * category badge, and engagement actions (like, comment, share).
 *
 * @param {ThoughtFeedProps} props - The component props.
 */
export const ThoughtFeed = ({ selectedCategory }: ThoughtFeedProps) => {
  // Filter thoughts based on the selected category prop.
  // If no category is selected, show all thoughts.
  const filteredThoughts = selectedCategory
    ? dummyThoughts.filter((thought) => thought.category === selectedCategory)
    : dummyThoughts;

  return (
    // Main container for the feed
    <div className="space-y-10">
      {/* Feed Title */}
      <h2 className="text-3xl font-bold text-[#F5F5F5] tracking-tight">
        💬 Latest Thought Capsules
      </h2>

      {/* Conditional Rendering: Empty State or Thought Grid */}
      {filteredThoughts.length === 0 ? (
        // Empty State Message (when filter results in no thoughts)
        <div className="bg-[#222741] border border-[#3ABEFF]/30 rounded-2xl p-8 shadow text-center">
          <p className="text-[#D3D3D3]/80 text-base">No thoughts in this category yet.</p>
        </div>
      ) : (
        // Grid layout for displaying thought cards
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredThoughts.map((thought, i) => (
            // Individual Thought Card
            <div
              key={thought.id}
              className="bg-[#222741] border border-[#3ABEFF]/20 rounded-2xl px-7 py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden"
            >
              {/* Subtle animated gradient background aura */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFE066]/10 via-[#FF6B6B]/10 to-[#3ABEFF]/10 opacity-30 blur-2xl z-0"></div>

              {/* Card Content (positioned above the aura) */}
              <div className="relative z-10 flex items-start gap-6">
                {/* User Avatar */}
                <Avatar className="h-14 w-14 ring-2 ring-[#3ABEFF]/40 shadow-sm">
                  <AvatarImage
                    src={thought.user.avatar}
                    alt={thought.user.name}
                  />
                  {/* Fallback displays user initials */}
                  <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-semibold text-base">
                    {thought.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Main Content Area: Header, Text, Badge, Actions */}
                <div className="flex-1 space-y-4">
                  {/* Post Header: Name, Verification, Username, Time */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h3 className="font-semibold text-lg text-[#F5F5F5]">
                      {thought.user.name}
                    </h3>
                    {/* Display verified badge if applicable */}
                    {thought.user.isVerified && (
                      <svg
                        className="w-3.5 h-3.5 text-[#3ABEFF]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                    <span className="text-base text-[#D3D3D3]/80">
                      {thought.user.username}
                    </span>
                    <span className="text-[#D3D3D3]/50">·</span>
                    <span className="text-base text-[#D3D3D3]/80">
                      {thought.time}
                    </span>
                  </div>

                  {/* Main Thought Text */}
                  <p className="text-base leading-relaxed text-[#F5F5F5]/90 group-hover:text-[#3ABEFF] transition-colors">
                    {thought.text}
                  </p>

                  {/* Category Badge */}
                  <div>
                    {/* Badge styled based on categoryBadgeStyles mapping */}
                    <span
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border backdrop-blur-sm capitalize ${
                        categoryBadgeStyles[thought.category] ?? categoryBadgeStyles.default
                      }`}
                    >
                      {thought.category}
                    </span>
                  </div>

                  {/* Action Buttons: Like, Comment, Share */}
                  <div className="flex items-center pt-3 space-x-8 text-base text-[#D3D3D3]/70">
                    {/* TODO: Implement like functionality */}
                    <button className="flex items-center gap-1.5 hover:text-[#FF6B6B] transition-all hover:scale-105">
                      <ThumbsUp size={18} />
                      {thought.likes}
                    </button>
                    {/* TODO: Implement comment viewing/adding functionality */}
                    <button className="flex items-center gap-1.5 hover:text-[#3ABEFF] transition-all hover:scale-105">
                      <MessageCircle size={18} />
                      {thought.comments}
                    </button>
                    {/* TODO: Implement share functionality */}
                    <button className="flex items-center gap-1.5 hover:text-[#FFE066] transition-all hover:scale-105">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};