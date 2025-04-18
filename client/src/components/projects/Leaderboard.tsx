import * as React from "react";
const { useState, useRef, useEffect } = React;
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; 

// Dummy Leaderboard Data (kept the same)
const leaderboardData = [
    {
        id: 1,
        name: "Arjun Mehta",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        points: 4756,
        rank: 1,
        projects: 12,
    },
    {
        id: 2,
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/54.jpg",
        points: 4321,
        rank: 2,
        projects: 10,
    },
    {
        id: 3,
        name: "Vikram Desai",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        points: 3982,
        rank: 3,
        projects: 8,
    },
];

export const Leaderboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // --- Carousel Logic (remains the same) ---
  useEffect(() => {
    startInterval();
    return () => {
      stopInterval();
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Added eslint disable comment if needed

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + leaderboardData.length) % leaderboardData.length);
    resetInterval();
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % leaderboardData.length);
    resetInterval();
  };

  const stopInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const startInterval = () => {
    stopInterval(); // Clear existing interval before starting a new one
     intervalRef.current = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % leaderboardData.length);
    }, 4000);
  }

  const resetInterval = () => {
    startInterval(); // Simply restart the interval
  };
  // --- End Carousel Logic ---


  // --- Derived Data (remains the same) ---
  const activeUser = leaderboardData[activeIndex];
  const level = Math.floor(activeUser.points / 1000);
  const progressPercent = Math.min(100, (activeUser.points % 1000) / 10); // Assuming 1000 points per level
  // --- End Derived Data ---


  // --- Styling Variables ---
  const rankStyles: Record<number, { ring: string; badge: string; title: string }> = {
    1: { ring: "ring-[#FFE066]", badge: "bg-[#FFE066] text-[#1B1F3B]", title: "🥇 Legend" },
    2: { ring: "ring-[#C0C0C0]", badge: "bg-[#C0C0C0] text-[#1B1F3B]", title: "🥈 Pro" }, // Using Silver color
    3: { ring: "ring-[#cd7f32]", badge: "bg-[#cd7f32] text-white", title: "🥉 Rising" }, // Using Bronze color
  };
  const currentRankStyle = rankStyles[activeUser.rank] ?? { ring: "ring-gray-500", badge: "bg-gray-500 text-white", title: "Contributor" }; // Fallback
  // --- End Styling Variables ---

  return (
    // --- Main Container ---
    // Increased padding using responsive classes
    <div className="relative rounded-xl overflow-hidden border border-[#3ABEFF]/20 shadow-lg p-4 md:p-6 bg-[#222741] transition-all duration-300 group">

      {/* --- Header --- */}
      {/* Increased text size, added margin */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg md:text-xl font-semibold text-[#F5F5F5]">Leaderboard</h2>
        {/* Slightly larger badge */}
        <span className="bg-[#FFE066] text-xs px-2.5 py-1 rounded-full text-[#1B1F3B] font-semibold">
          Top 3
        </span>
      </div>
      {/* Increased text size and margin */}
      <p className="text-sm text-[#D3D3D3]/90 mb-5 md:mb-6">Top contributors this month</p>

      {/* --- Carousel Body --- */}
      {/* Increased vertical margin */}
      <div className="flex justify-between items-center my-5 md:my-6">
        {/* --- Prev Button --- */}
        {/* Increased size for better tap target */}
        <button
          onClick={handlePrev}
          aria-label="Previous leaderboard user"
          className="h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center text-[#D3D3D3]/80 hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/15 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50"
        >
          <ChevronLeft size={20} /> {/* Slightly larger icon */}
        </button>

        {/* --- Active User Details --- */}
        <div className="relative text-center flex flex-col items-center px-2"> {/* Added horizontal padding */}
          <div className="relative mb-3">
             {/* Increased Avatar size */}
            <Avatar
              className={cn(
                "h-20 w-20 md:h-24 md:w-24 ring-4 rounded-full shadow-lg transition-all duration-300",
                currentRankStyle.ring // Use dynamic ring color
              )}
            >
              <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
              {/* Increased fallback text size */}
              <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-semibold text-lg">
                {activeUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
             {/* Rank Badge on Avatar */}
            <span className={cn(
                "absolute -bottom-1 -right-1 text-xs font-bold px-1.5 py-0.5 rounded-full shadow border border-black/10",
                currentRankStyle.badge // Use dynamic badge color
             )}>
              #{activeUser.rank}
            </span>
          </div>

          {/* Rank Title */}
           {/* Increased text size */}
          <div className="text-sm text-[#D3D3D3]/90 font-semibold mb-1">
            {currentRankStyle.title} {/* Use dynamic title */}
          </div>

          {/* User Name */}
           {/* Increased text size */}
          <h3 className="font-semibold text-[#F5F5F5] text-base md:text-lg">
            {activeUser.name}
          </h3>

           {/* Stats */}
            {/* Increased text size */}
          <p className="text-sm text-[#D3D3D3]/90 mt-1">
            {activeUser.points.toLocaleString()} XP • {activeUser.projects} projects
          </p>

          {/* --- XP Bar --- */}
          {/* Increased width and height slightly */}
          <div className="w-36 md:w-40 h-2.5 mt-4 rounded-full bg-[#3ABEFF]/15 overflow-hidden" title={`Level Progress: ${progressPercent.toFixed(0)}%`}>
            <div
              className="h-full bg-gradient-to-r from-[#3ABEFF] via-[#6EE7B7] to-[#FFE066] transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Level Text */}
          {/* Increased text size */}
          <p className="text-xs text-[#D3D3D3]/80 mt-1.5 tracking-wide">
            Level {level}
          </p>

          {/* Example User Title/Tag */}
          {/* Increased text size and padding */}
          {/* <span className="mt-2 inline-block px-2.5 py-1 bg-[#3ABEFF]/10 text-xs text-[#3ABEFF] rounded-full font-medium">
            UI Architect 🚀
          </span> */}
        </div>

        {/* --- Next Button --- */}
        {/* Increased size for better tap target */}
        <button
          onClick={handleNext}
          aria-label="Next leaderboard user"
          className="h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center text-[#D3D3D3]/80 hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/15 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#6EE7B7]/50" // Changed hover color for variety
        >
          <ChevronRight size={20} /> {/* Slightly larger icon */}
        </button>
      </div>

      {/* --- Dot Navigation --- */}
      {/* Increased size, gap, and margin */}
      <div className="flex justify-center gap-2 mt-4 md:mt-5">
        {leaderboardData.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to user ${index + 1}`}
            onClick={() => {
              setActiveIndex(index);
              resetInterval();
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300 ease-in-out",
              index === activeIndex
                ? "w-5 bg-[#3ABEFF]" // Active dot wider
                : "w-2 bg-[#3ABEFF]/30 hover:bg-[#3ABEFF]/60" // Inactive dots
            )}
          />
        ))}
      </div>

      {/* --- Footer CTA --- */}
      {/* Increased margin, padding, text size */}
      <div className="mt-5 md:mt-6 pt-4 border-t border-[#3ABEFF]/15 text-center">
        <button className="text-sm md:text-base text-[#3ABEFF] font-medium hover:underline transition duration-200 focus:outline-none focus:ring-1 focus:ring-[#3ABEFF]/50 rounded-md px-2 py-1">
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};