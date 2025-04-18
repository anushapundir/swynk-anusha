import React, { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Assuming Button is used correctly
import { Heart, MessageCircle, Share2, Plus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this utility

// Highlight icon logic (remains the same)
const getHighlightIcon = (text: string) => {
  if (/dev|build|solo/i.test(text)) return "👨‍💻";
  if (/week|timeline|duration/i.test(text)) return "⏱️";
  if (/impact|accuracy|results|data/i.test(text)) return "📊";
  if (/launch|speed|milestone/i.test(text)) return "🚀";
  if (/team|collab|group/i.test(text)) return "🤝";
  return "✨";
};

// Complete Project Data
const projects = [
  {
    id: 1,
    title: "Rail-Kavach",
    description:
      "AI-powered train prevention system. Improves safety using IoT sensors + real-time alerts. Blah Blah Blah, Blah Blah. AI-powered train prevention system. Improves safety using IoT sensors + real-time alerts. Blah Blah Blah, Blah Blah.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=3084&auto=format&fit=crop",
    tech: ["IoT", "React", "Python"],
    highlights: [
      "4-week development",
      "Solo developer build",
      "Achieved 98% real-time detection accuracy",
    ],
    user: {
      name: "Paarangat Rai Sharma",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Engineering Lead",
    },
    likes: 243,
    comments: 87,
    shares: 34,
    isFollowing: false,
  },
  {
    id: 2,
    title: "EcoCharge",
    description:
      "Solar EV charging station network. Clean power for cars, scalable for cities.",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=3259&auto=format&fit=crop",
    tech: ["Solar", "GreenTech", "IoT"],
    highlights: [
      "Deployed across 3 campuses",
      "Reduced CO₂ by 1.4 tons/month",
      "5-member sustainability team",
    ],
    user: {
      name: "Mira Kapoor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Sustainability Expert",
    },
    likes: 187,
    comments: 42,
    shares: 29,
    isFollowing: true,
  },
  {
    id: 3,
    title: "MindfulAI",
    description:
      "AI mental health tracker. Offers mood journaling, meditation, and mood insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3270&auto=format&fit=crop",
    tech: ["AI", "Mental Health", "Next.js"],
    highlights: [
      "Launched on World Mental Health Day",
      "3,000+ active daily users",
      "Built with therapists",
    ],
    user: {
      name: "Vikram Menon",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Product Designer",
    },
    likes: 312,
    comments: 104,
    shares: 56,
    isFollowing: false,
  },
  {
    id: 4,
    title: "SkillSync",
    description:
      "AI matches learners with mentors based on goals. Personalized growth journeys.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=3080&auto=format&fit=crop",
    tech: ["AI", "EdTech", "Node.js"],
    highlights: [
      "Matched 500+ students in beta",
      "Backed by SkillUp Foundation",
      "1-week onboarding process",
    ],
    user: {
      name: "Aisha Jain",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "Full Stack Dev",
    },
    likes: 165,
    comments: 23,
    shares: 18,
    isFollowing: true,
  },
  {
    id: 5,
    title: "UrbanGreen",
    description:
      "Smart irrigation system for urban farms. Saves water. IoT integrated.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=3020&auto=format&fit=crop",
    tech: ["IoT", "AgriTech", "Python"],
    highlights: [
      "Cut water usage by 60%",
      "Integrated with weather API",
      "Hardware tested across 10 rooftops",
    ],
    user: {
      name: "Dev Patel",
      avatar: "https://randomuser.me/api/portraits/men/83.jpg",
      role: "IoT Engineer",
    },
    likes: 124,
    comments: 34,
    shares: 21,
    isFollowing: false,
  },
  {
    id: 6,
    title: "SafeWalk",
    description:
      "Women’s safety app using live location & emergency SOS alert. Real-time map ping.",
    image:
      "https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=3060&auto=format&fit=crop",
    tech: ["React Native", "Firebase", "Security"],
    highlights: [
      "Partnered with 2 NGOs",
      "Built with women-led dev team",
      "Alert system response under 5 sec",
    ],
    user: {
      name: "Neha Sharma",
      avatar: "https://randomuser.me/api/portraits/women/95.jpg",
      role: "Mobile Dev",
    },
    likes: 289,
    comments: 63,
    shares: 44,
    isFollowing: false,
  },
];

// --- Project Card Component ---
const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  // State logic
  const [isFollowing, setIsFollowing] = useState(project.isFollowing);
  const [likes, setLikes] = useState(project.likes);
  const [liked, setLiked] = useState(false);

  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };
  // --- End State Logic ---

  return (
    // Increased padding, spacing, added overflow-hidden
    <div className="bg-[#222741] border border-[#3ABEFF]/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full p-6 space-y-5 overflow-hidden">
      {/* --- Header --- */}
      {/* Added flex-wrap for safety on very narrow containers */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-4 min-w-0">
          {" "}
          {/* Added min-w-0 */}
          {/* Increased Avatar size */}
          <Avatar className="h-12 w-12 border border-[#3ABEFF]/30 flex-shrink-0">
            <AvatarImage src={project.user.avatar} alt={project.user.name} />
            {/* Increased fallback text size */}
            <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-medium text-base">
              {project.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            {" "}
            {/* Wrapper for truncation */}
            {/* Increased text sizes */}
            <p className="text-lg font-semibold text-[#F5F5F5] truncate">
              {project.user.name}
            </p>
            <p className="text-base text-[#D3D3D3]/80 truncate">
              {project.user.role}
            </p>
          </div>
        </div>

        {/* --- Follow Button --- */}
        {/* Increased size (removed size="sm"), text size, icon size */}
        <Button
          variant={isFollowing ? "outline" : "default"}
          // size prop removed to use default, adjust padding/text instead
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-base transition-colors duration-200 flex-shrink-0", // Added flex-shrink-0
            isFollowing
              ? "text-[#D3D3D3] border-[#3ABEFF]/40 hover:bg-[#3ABEFF]/10 hover:text-[#3ABEFF]"
              : "bg-[#3ABEFF] hover:bg-[#6EE7B7] text-[#1B1F3B]", // Example hover change
          )}
          onClick={handleFollow}
        >
          {isFollowing ? (
            "Following"
          ) : (
            <>
              <Plus size={16} /> Follow
            </>
          )}
        </Button>
      </div>

      {/* --- Image --- */}
      {/* Changed to aspect-ratio for responsiveness */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl group">
        {" "}
        {/* Use aspect-ratio */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          loading="lazy" // Added lazy loading
        />
        {/* Optional: Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* --- Content --- */}
      {/* Increased title size, description line-height */}
      <div className="flex flex-col space-y-4 flex-grow">
        {" "}
        {/* Added flex-grow */}
        <h3 className="text-xl font-bold text-[#F5F5F5] hover:text-[#3ABEFF] transition-colors cursor-pointer">
          {project.title}
        </h3>
        {/* Added line-clamp (requires @tailwindcss/line-clamp plugin) */}
        <p className="text-base text-[#D3D3D3]/90 leading-relaxed line-clamp-3 flex-grow">
          {" "}
          {/* Added line-clamp & flex-grow */}
          {project.description}
        </p>
        {/* --- Tags --- */}
        {/* Increased text size, padding */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((tag: string) => (
            <span
              key={tag}
              className="bg-[#3ABEFF]/10 text-[#3ABEFF] px-3.5 py-1.5 rounded-full border border-[#3ABEFF]/30 text-sm font-medium"
            >
              {" "}
              {/* Adjusted size/padding */}
              {tag}
            </span>
          ))}
        </div>
        {/* --- Highlights --- */}
        {/* Kept text size, slight margin adjustment */}
        <motion.ul
          className="text-base text-[#D3D3D3]/80 space-y-1.5 list-none pt-1" // Removed list-disc, list-inside; adjusted spacing
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {project.highlights.map((point: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 pt-0.5">{getHighlightIcon(point)}</span>
              <span>{point}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* --- Action Bar --- */}
      {/* Increased padding-top, gap, icon size */}
      <div className="pt-4 mt-auto flex flex-wrap justify-between items-center gap-y-3">
        {" "}
        {/* Added mt-auto, flex-wrap, gap-y */}
        {/* Like/Comment/Share */}
        <div className="flex items-center gap-5 text-base text-[#D3D3D3]/80">
          {" "}
          {/* Adjusted gap */}
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 transition-colors duration-200 hover:text-[#FF6B6B]",
              liked ? "text-[#FF6B6B]" : "",
            )}
            aria-label={liked ? "Unlike project" : "Like project"}
          >
            <Heart
              size={22}
              className={cn(liked ? "fill-current" : "fill-none")}
            />{" "}
            {/* Use fill-current */}
            <span className="font-medium">{likes.toLocaleString()}</span>
          </button>
          <button
            className="flex items-center gap-2 hover:text-[#3ABEFF] transition duration-200"
            aria-label="View comments"
          >
            <MessageCircle size={22} />
            <span className="font-medium">{project.comments}</span>
          </button>
          <button
            className="flex items-center gap-2 hover:text-[#FFE066] transition duration-200"
            aria-label="Share project"
          >
            <Share2 size={22} />
           
          </button>
        </div>
        {/* View Button */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-base text-[#D3D3D3]/90 hover:text-[#6EE7B7] transition group"
          aria-label={`View project ${project.title}`}
        >
          <span className="group-hover:underline font-medium">
            View Project
          </span>
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};

// --- Project Feed Component ---
export const ProjectFeed = () => {
  return (
    // Adjusted grid columns and gap for responsiveness
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {" "}
      {/* Adjusted gap */}
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
