import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Assuming Button is used correctly
import { Image, Upload, Sparkles } from "lucide-react"; // Added Sparkles
import { cn } from "@/lib/utils"; // Assuming you have this utility

export const PublishProjectCard = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isFormFocused, setIsFormFocused] = useState(false); // Tracks if title input focused

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectTitle.trim()) return; // Prevent submission without title

    console.log("Published project:", { projectTitle, projectDescription });
    // Reset form state
    setProjectTitle("");
    setProjectDescription("");
    setIsFormFocused(false);
    
  };

  // Determine if the form is "active" (focused or has content)
  // This helps keep the description visible if user types then clicks away
  const isFormActive = isFormFocused || projectTitle.length > 0 || projectDescription.length > 0;

  return (
    // Increased padding, added overflow-hidden
    <div className="w-full rounded-2xl bg-[#222741] border border-[#3ABEFF]/20 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Increased padding and spacing */}
        <div className="p-4 md:p-6 space-y-5">

          {/* --- Header --- */}
          <div className="flex items-center gap-4">
            {/* Increased Avatar size */}
            <Avatar className="h-14 w-14 border border-[#3ABEFF]/30 shadow-sm flex-shrink-0">
              <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sasha Johnson" />
              {/* Increased fallback text size */}
              <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] text-base font-medium">
                SJ
              </AvatarFallback>
            </Avatar>
            {/* Added min-w-0 for potential truncation */}
            <div className="min-w-0">
              {/* Increased text sizes */}
              <p className="text-lg font-semibold text-[#F5F5F5] truncate">
                Sasha Johnson
              </p>
              <p className="text-base text-[#D3D3D3]/90 truncate">🎨 Product Designer</p>
            </div>
          </div>

          {/* --- Title Input --- */}
          {/* Increased text size, padding, rounded corners, focus ring opacity */}
          <input
            type="text"
            placeholder="📌 What's your project called?" // More engaging placeholder
            className="w-full px-4 py-3.5 text-base font-medium bg-[#1B1F3B]/80 border border-[#3ABEFF]/25 text-[#F5F5F5] placeholder-[#D3D3D3]/60 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]/50 focus:border-[#3ABEFF]/50 transition-all duration-200"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            onFocus={() => setIsFormFocused(true)}
             // Consider onBlur if needed, but isFormActive handles persistence
            // onBlur={() => setIsFormFocused(projectTitle.length > 0 || projectDescription.length > 0)}
          />

          {/* --- Collapsible Section (Description & Uploads) --- */}
          {/* Using AnimatePresence for smoother expand/collapse */}
          <AnimatePresence initial={false}>
            {isFormActive && ( // Use isFormActive to keep open if populated
              <motion.div
                key="project-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden space-y-4" // Added space-y here
              >
                {/* --- Description Textarea --- */}
                {/* Increased text size, padding, min-height, rounded corners */}
                <textarea
                  placeholder="📝 Tell us more about your awesome project..." // Engaging placeholder
                  className="w-full px-4 py-3.5 text-base bg-[#1B1F3B]/80 text-[#F5F5F5] placeholder-[#D3D3D3]/60 border border-[#3ABEFF]/25 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]/50 focus:border-[#3ABEFF]/50 transition-all duration-200 min-h-[140px] resize-none"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  onFocus={() => setIsFormFocused(true)} // Keep focus state updated
                   // onBlur={() => setIsFormFocused(projectTitle.length > 0 || projectDescription.length > 0)}
                />

                {/* --- Upload buttons --- */}
                {/* Increased size (no size="sm"), text size, icon size, gap */}
                <div className="flex flex-wrap gap-3 md:gap-4 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    // size prop removed
                    className="flex items-center gap-2 text-base text-[#D3D3D3] border-[#3ABEFF]/30 hover:bg-[#3ABEFF]/10 hover:text-[#3ABEFF] transition duration-200 rounded-lg px-4 py-2" // Explicit padding
                  >
                    <Image size={18} /> {/* Increased icon size */}
                    Add Image
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    // size prop removed
                    className="flex items-center gap-2 text-base text-[#D3D3D3] border-[#3ABEFF]/30 hover:bg-[#3ABEFF]/10 hover:text-[#3ABEFF] transition duration-200 rounded-lg px-4 py-2" // Explicit padding
                  >
                    <Upload size={18} /> {/* Increased icon size */}
                    Add Files
                  </Button>
                  {/* Optional: Add more buttons like Link, etc. */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- Placeholder Text (when collapsed and empty) --- */}
          {!isFormActive && ( // Show only when inactive AND empty
            <div className="pt-1 text-base text-[#D3D3D3]/70 italic flex items-center gap-2 cursor-text" onClick={() => document.querySelector('input[type="text"]')?.focus()}>
              <Sparkles size={18} className="text-[#FFE066]/80" />
              Share your latest project idea...
            </div>
          )}
        </div>

        {/* --- Bottom Bar --- */}
        {/* Using AnimatePresence for smoother transition */}
        <AnimatePresence initial={false}>
           {isFormActive && ( // Show only when active
            <motion.div
              key="publish-actions"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-[#1B1F3B]/70 border-t border-[#3ABEFF]/20 px-4 md:px-6 py-3 flex flex-wrap justify-between items-center gap-3 overflow-hidden" // Added flex-wrap, gap
            >
              {/* Increased text size */}
              <div className="text-sm text-[#D3D3D3]/90">
                💡 Tip: Add relevant tags for better discovery!
              </div>
              {/* Increased text size, padding, rounded corners */}
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#3ABEFF] to-[#6EE7B7] hover:from-[#6EE7B7] hover:to-[#3ABEFF] text-[#1B1F3B] text-base font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!projectTitle.trim()} // Disable if title is empty
              >
                🚀 Publish
              </Button>
            </motion.div>
           )}
        </AnimatePresence>
      </form>
    </div>
  );
};