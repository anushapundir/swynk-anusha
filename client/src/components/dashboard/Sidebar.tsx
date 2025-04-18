import { useState } from "react";
import {
  Home,
  FolderKanban,
  MessageCircle,
  Coffee,
  Settings,
  LogOut,
  Shuffle,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import logo from "@assets/logo.png"; // Make sure this path is correct
import { useIsMobile } from "@/hooks/use-mobile"; // Custom hook to check for mobile viewport
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/**
 * Configuration for primary navigation items in the sidebar.
 */
const navItems = [
  { href: "/dashboard", icon: <Home size={24} />, label: "Home" },
  { href: "/projects", icon: <FolderKanban size={24} />, label: "Projects" },
  {
    href: "/swynk",
    icon: <Shuffle size={24} />,
    label: "Swynk",
    isSwynk: true, // Special flag for Swynk item styling
  },
  { href: "/messages", icon: <MessageCircle size={24} />, label: "Messages" },
  { href: "/coffee-meet", icon: <Coffee size={24} />, label: "Coffee Meet" },
];

/**
 * Configuration for secondary/settings items in the sidebar.
 */
const settingsItems = [
  { href: "/settings", icon: <Settings size={24} />, label: "Settings" },
  { action: "logout", icon: <LogOut size={24} />, label: "Logout" }, // Uses 'action' instead of 'href'
];

/**
 * Sidebar component provides navigation for the application.
 * It renders as a fixed sidebar on desktop and a slide-out sheet on mobile.
 */
export const Sidebar = () => {
  // Get the current URL location to determine the active nav item.
  const [location] = useLocation();
  // Check if the current viewport is considered mobile.
  const isMobile = useIsMobile();
  // State to control the visibility of the mobile sheet menu.
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  /**
   * Internal component rendering the actual content of the sidebar
   * (logo, navigation links, settings/logout).
   * Reused for both desktop and mobile sheet views.
   *
   * @param {object} props - Component props.
   * @param {boolean} [props.isSheet=false] - Indicates if the content is being rendered inside the mobile sheet.
   */
  const SidebarContent = ({ isSheet = false }) => (
    <div className="flex flex-col justify-between items-center h-full py-6 px-2">
      {/* Top Section: Logo and Main Navigation */}
      <div className="flex flex-col items-center w-full">
        {/* Logo */}
        <Link
          href="/dashboard"
          // Close sheet on navigation if it's open
          onClick={() => isSheet && setIsSheetOpen(false)}
        >
          <div className="w-12 h-12 mb-8 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
            <img src={logo} alt="Swynk Logo" className="w-14 h-14" />
          </div>
        </Link>

        {/* Main Navigation Icons */}
        <nav className="flex flex-col items-center gap-6 w-full">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                // Close sheet on navigation if it's open
                onClick={() => isSheet && setIsSheetOpen(false)}
              >
                <div
                  className={cn(
                    "relative group w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 ease-in-out backdrop-blur-sm cursor-pointer",
                    // Active state styling (special case for Swynk)
                    isActive && item.isSwynk
                      ? "bg-soft-yellow text-midnight ring-2 ring-soft-yellow/60 scale-110 shadow-lg animate-pulse"
                      : isActive
                      ? "bg-sky text-white scale-105 shadow-md ring-1 ring-sky/50"
                      : // Default inactive state
                        "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white hover:scale-105 shadow-sm",
                  )}
                >
                  {item.icon}
                  {/* Tooltip (shown on desktop, hidden in sheet) */}
                  {!isSheet && (
                    <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left bg-gradient-to-r from-sky to-blue-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-lg whitespace-nowrap z-50 font-medium">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Settings & Logout */}
      <div className="flex flex-col items-center gap-5 w-full">
        {settingsItems.map((item) =>
          // Render as a Link if 'href' exists
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              // Close sheet on navigation if it's open
              onClick={() => isSheet && setIsSheetOpen(false)}
            >
              <div className="relative group w-14 h-14 flex items-center justify-center rounded-2xl text-white/70 bg-white/5 hover:bg-white/15 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out shadow-sm cursor-pointer">
                {item.icon}
                {/* Tooltip (shown on desktop, hidden in sheet) */}
                {!isSheet && (
                  <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left bg-gradient-to-r from-sky to-blue-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-lg whitespace-nowrap z-50 font-medium">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ) : (
            // Render as a Button if 'action' exists (e.g., Logout)
            <button
              key={item.label}
              onClick={() => {
                // TODO: Implement actual logout logic
                console.log("Logout action triggered");
                // Close sheet after action if it's open
                if (isSheet) setIsSheetOpen(false);
              }}
              className="relative group w-14 h-14 flex items-center justify-center rounded-2xl text-white/70 bg-white/5 hover:bg-white/15 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out shadow-sm cursor-pointer"
            >
              {item.icon}
              {/* Tooltip (shown on desktop, hidden in sheet) */}
              {!isSheet && (
                <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left bg-gradient-to-r from-sky to-blue-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-lg whitespace-nowrap z-50 font-medium">
                  {item.label}
                </span>
              )}
            </button>
          ),
        )}
      </div>
    </div>
  );

  // --- Mobile Rendering: Show hamburger button and slide-out Sheet ---
  if (isMobile) {
    return (
      <>
        {/* Fixed Hamburger Menu Button appears only on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-[60] text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 w-10 h-10" // High z-index to stay on top
          onClick={() => setIsSheetOpen(true)} // Opens the sheet
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Sheet Component (Slide-out Panel from left) */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="left"
            className="w-20 bg-midnight p-0 border-r border-white/10 shadow-xl" // Minimal width, custom styling
          >
            {/* Render the shared sidebar content inside the sheet */}
            <SidebarContent isSheet={true} />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // --- Desktop Rendering: Show fixed sidebar ---
  return (
    // Fixed sidebar, hidden on mobile (md:block)
    <aside className="fixed top-0 left-0 h-screen w-20 bg-midnight shadow-lg rounded-tr-2xl rounded-br-2xl z-50 border-r border-white/10 hidden md:block">
      {/* Render the shared sidebar content directly */}
      <SidebarContent isSheet={false} />
    </aside>
  );
};
