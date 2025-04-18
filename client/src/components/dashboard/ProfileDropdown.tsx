import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * ProfileDropdown component displays user information and provides
 * quick access to profile, settings, and logout actions via a dropdown menu.
 */
export const ProfileDropdown = () => {
  // TODO: Replace with dynamic user data fetched from context or API
  const user = {
    name: "Sasha Johnson",
    profession: "Product Designer at Swynk",
    avatar: "", // Currently unused, hardcoded URL below
    status: "online",
  };

  // Unused avatar generation logic removed.
  // A specific avatar URL is hardcoded in the AvatarImage component below.

  /**
   * Maps user status strings to Tailwind background color classes for the status indicator.
   */
  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    busy: "bg-red-500",
    offline: "bg-gray-400",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full bg-[#222741] border border-[#3ABEFF]/20 shadow-sm hover:shadow-md transition-all group">
          {/* Avatar + Status */}
          <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-[#3ABEFF]/40 group-hover:ring-[#FFE066]/40 transition-all duration-200">
                <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt={user.name} />
              <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-semibold text-sm">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[user.status as keyof typeof statusColors]} border-2 border-[#222741] rounded-full`}
            ></span>
          </div>

          {/* Name + Role */}
          <div className="text-left hidden md:block leading-snug">
            <p className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#3ABEFF] transition">
              {user.name}
            </p>
            <p className="text-xs text-[#D3D3D3]">{user.profession}</p>
          </div>

          {/* Chevron */}
          <ChevronDown className="h-4 w-4 text-[#3ABEFF] opacity-80 group-hover:opacity-100 transition" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 mt-2 rounded-xl border border-[#3ABEFF]/20 shadow-lg bg-[#222741] p-1 text-[#F5F5F5]"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#3ABEFF]/10">
          <p className="font-semibold text-[#F5F5F5]">{user.name}</p>
          <p className="text-xs text-[#D3D3D3]">{user.profession}</p>
        </div>

        {/* Menu Options */}
        <Link href="/dashboard/profile">
          <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-[#D3D3D3] hover:bg-[#3ABEFF]/10 hover:text-[#3ABEFF] rounded-md transition">
            <User size={16} />
            My Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/dashboard/settings">
          <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-[#D3D3D3] hover:bg-[#3ABEFF]/10 hover:text-[#3ABEFF] rounded-md transition">
            <Settings size={16} />
            Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="my-1 bg-[#3ABEFF]/10" />

        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-[#FF6B6B] hover:bg-[#FF6B6B]/10 rounded-md font-semibold transition">
          <LogOut size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
