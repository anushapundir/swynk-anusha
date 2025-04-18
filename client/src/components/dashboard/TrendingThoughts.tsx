import { TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Assuming you have this utility

// TODO: Replace with dynamically fetched trending thoughts from an API.
const trendingThoughts = [
  {
    id: 1,
      user: { name: "Sasha Johnson", avatar: "https://randomuser.me/api/portraits/women/32.jpg", isVerified: true },
      text: "ChatGPT-5 is about to drop and everyone is sleeping on the potential impact.",
      category: "ai",
      likes: 382,
    },
    {
      id: 2,
      user: { name: "Michael Brown", avatar: "https://randomuser.me/api/portraits/men/45.jpg", isVerified: false },
      text: "React Server Components are a game-changer. Less boilerplate, more magic.",
      category: "frontend",
      likes: 271,
    },
    {
      id: 3,
      user: { name: "Jessica Kim", avatar: "https://randomuser.me/api/portraits/women/67.jpg", isVerified: true },
      text: "Bootstrapping vs VC: The funding debate that shaped our startup DNA.",
      category: "startup",
      likes: 245,
    },
    {
      id: 4,
      user: { name: "Daniel Lee", avatar: "https://randomuser.me/api/portraits/men/22.jpg", isVerified: false },
      text: "Web3 is pivoting toward utility. NFTs for real-world assets are coming.",
      category: "tech",
      likes: 218,
    },
    {
      id: 5,
      user: { name: "Emma Taylor", avatar: "https://randomuser.me/api/portraits/women/15.jpg", isVerified: true },
      text: "Just launched our AI image API. Unlimited access for early testers!",
      category: "ai",
      likes: 192,
  },
];

/**
 * Mapping of category IDs to their corresponding Tailwind CSS classes
 * for background, text, and border styling of category badges.
 */
const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  ai:       { bg: 'bg-[#3ABEFF]/10',   text: 'text-[#3ABEFF]',   border: 'border-[#3ABEFF]/30' },
  frontend: { bg: 'bg-[#FFE066]/10',   text: 'text-[#FFE066]',   border: 'border-[#FFE066]/30' },
  startup:  { bg: 'bg-[#FF6B6B]/10',   text: 'text-[#FF6B6B]',   border: 'border-[#FF6B6B]/30' },
  tech:     { bg: 'bg-[#6EE7B7]/10',   text: 'text-[#6EE7B7]',   border: 'border-[#6EE7B7]/30' },
  default:  { bg: 'bg-slate-700/50',  text: 'text-slate-300',  border: 'border-slate-600/50' }, // Fallback style
};

/**
 * TrendingThoughts component displays a list of currently popular or trending posts.
 * It includes user avatars, names, post text, likes, and category badges.
 * The top trending post has distinct styling.
 */
export const TrendingThoughts = () => {
  return (
    // Main container, sticky on large screens
    <div className="rounded-2xl bg-[#222741]/80 shadow-xl border border-[#3ABEFF]/20 p-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6 lg:sticky lg:top-8">
      {/* Component Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#3ABEFF] p-2 rounded-full shadow-md flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-[#1B1F3B]" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-[#F5F5F5] tracking-tight">
          Trending Globally
        </h2>
      </div>

      {/* List of Trending Thought Cards */}
      <div className="space-y-4 sm:space-y-5">
        {trendingThoughts.map((thought, index) => {
          // Determine styles based on category, fallback to default
          const styles = categoryStyles[thought.category] || categoryStyles.default;
          // Check if this is the top-ranked thought
          const isTop = index === 0;

          return (
            // Individual thought card container
            <div
              key={thought.id}
              className={cn(
                "rounded-xl relative p-4 transition-all duration-300 hover:shadow-lg group border",
                // Apply special styling for the top thought, regular styling otherwise
                isTop
                  ? "bg-gradient-to-tr from-[#3ABEFF]/10 via-[#FFCE35]/5 to-[#FF6B6B]/5 border-[#3ABEFF]/30 shadow-md"
                  : "bg-[#1B1F3B]/60 border-[#3ABEFF]/10 hover:bg-[#1B1F3B]/90 hover:border-[#3ABEFF]/20"
              )}
            >
              {/* Crown icon decoration for the top thought */}
              {isTop && (
                <div className="absolute -top-2.5 -left-2.5 text-lg sm:text-xl animate-bounce-slow">
                  👑
                </div>
              )}

              {/* Card Header: Rank (desktop), Avatar, Name, Likes */}
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                {/* Rank Number (visible on larger screens) */}
                <div className="text-xs sm:text-sm font-bold text-[#3ABEFF] hidden sm:block">{index + 1}</div>

                {/* User Avatar */}
                <Avatar className="h-6 w-6 sm:h-7 sm:w-7 ring-1 ring-[#3ABEFF]/40">
                  <AvatarImage
                    src={thought.user.avatar}
                    alt={thought.user.name}
                  />
                  {/* Fallback displays user initials */}
                  <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] text-[9px] sm:text-[10px] font-semibold">
                    {thought.user.name
                      .split(" ")
                      .map((n) => n[0]) // Get first letter of each part
                      .filter(Boolean) // Remove empty strings if any
                      .slice(0, 2) // Take max 2 initials
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* User Name and Verification Badge */}
                <span className="text-xs sm:text-sm font-medium text-[#D3D3D3] flex items-center mr-auto truncate">
                  <span className="truncate">{thought.user.name}</span>
                  {/* Display verified badge if applicable */}
                  {thought.user.isVerified && (
                    <svg
                      className="w-3 h-3 text-[#3ABEFF] inline-block ml-1 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </span>

                {/* Like Count */}
                <span className="text-[11px] sm:text-[12px] text-[#D3D3D3]/70 flex items-center flex-shrink-0 ml-2 sm:ml-0">
                  ❤️ <span className="ml-1">{thought.likes}</span>
                </span>
              </div>

              {/* Main Thought Text Content */}
              <p className="text-sm text-[#F5F5F5]/90 leading-relaxed group-hover:text-[#3ABEFF]/90 transition-colors duration-200">
                {thought.text}
              </p>

              {/* Category Badge Area */}
              <div className="mt-3 sm:mt-4">
                {/* Badge styled based on categoryStyles mapping */}
                <span
                  className={cn(
                    "text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-sm",
                    styles.bg,
                    styles.text,
                    styles.border
                  )}
                >
                  {thought.category}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Call-to-Action */}
      <div className="pt-3 sm:pt-4 border-t border-[#3ABEFF]/20 text-center">
        {/* TODO: Implement navigation or loading more trending thoughts */}
        <button className="text-xs sm:text-sm font-medium text-[#3ABEFF] hover:underline transition">
          See more trending thoughts
        </button>
      </div>
    </div>
  );
};