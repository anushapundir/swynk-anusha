import * as React from "react";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { Sidebar } from "@/components/dashboard/Sidebar"; // Assuming Sidebar handles its own responsiveness
// Note: Using relative paths here, adjust if your project structure differs
import { PublishProjectCard } from "../../components/projects/PublishProjectCard";
import { ProjectFeed } from "../../components/projects/ProjectFeed";
import { Leaderboard } from "../../components/projects/Leaderboard";
import { StatusCard } from "../../components/projects/StatusCard";
import { MilestoneTracker } from "../../components/projects/MilestoneTracker";

/**
 * Projects page component.
 * Renders the main layout for the projects section, including a sidebar,
 * a main content feed for publishing and viewing projects, and a right-hand
 * column with widgets like leaderboard, status, and milestones.
 */
export const Projects = () => {
  return (
    // Base container for the entire page
    <div className="min-h-screen bg-[#1B1F3B] text-[#F5F5F5] overflow-x-hidden">
      {/* Sidebar Component (handles its own mobile sheet/desktop fixed rendering) */}
      <Sidebar />

      {/* Main content area, adjusted for the sidebar width on medium screens and up */}
      {/* md:pl-20 should match the desktop sidebar width */}
      <div className="flex flex-col md:pl-20">

        {/* Sticky Header within the main content area */}
        <div className="sticky top-0 z-30 bg-[#1B1F3B]/90 backdrop-blur-md border-b border-[#3ABEFF]/20 px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-bold text-[#F5F5F5] truncate">Projects</h1>
            {/* User profile dropdown appears in the header */}
            <ProfileDropdown />
          </div>
        </div>

        {/* Content Columns Container: Holds the main feed and right widgets */}
        {/* Stacks vertically on small screens, side-by-side on large screens (lg:flex-row) */}
        {/* pt-4 adds space below the sticky header */}
        <div className="w-full max-w-[2000px] mx-auto flex flex-col lg:flex-row lg:gap-8 pt-4 pb-12">

          {/* Left Column (Main Content Feed) */}
          {/* Takes up remaining space on large screens (flex-1) */}
          <div className="flex-1 min-w-0 px-4 md:px-8">

            {/* Section for publishing a new project */}
            <div className="py-6">
              <PublishProjectCard />
            </div>

            {/* Section displaying the feed of existing projects */}
            <div className="py-6">
              <h2 className="text-xl font-semibold text-[#3ABEFF] mb-4 px-1">
                Discover Projects
              </h2>
              <ProjectFeed />
            </div>
          </div>

          {/* Right Column (Widgets/Sidebar Content) */}
          {/* Fixed width on large screens, full width when stacked */}
          <div className="w-full lg:w-[380px] flex-shrink-0 px-4 md:px-6 pt-8 lg:pt-0">
            {/* Inner container for sticky positioning of widgets on large screens */}
            {/* lg:sticky top-[76px] - Adjust '76px' based on actual sticky header height + desired gap */}
            <div className="lg:sticky top-[76px] space-y-6">
              {/* Project-related Widgets */}
              <Leaderboard />
              <StatusCard />
              <MilestoneTracker />
            </div>
          </div>

        </div> {/* End Content Columns Container */}
      </div> {/* End Main content area */}
    </div> // End Base container
  );
};

// Default export for potential dynamic imports or routing conventions
export default Projects;