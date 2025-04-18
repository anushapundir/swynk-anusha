import React from "react";
import { Video, Phone, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationHeaderProps {
  name: string;
  avatar: string;
  designation?: string;
}

export const ConversationHeader = ({
  name,
  avatar,
  designation = "Product Designer at Swynk",
}: ConversationHeaderProps) => {
  return (
    <div className="w-full px-6 py-4 bg-[#222741] border-b border-[#3ABEFF]/10 flex items-center justify-between">
      {/* Left: Avatar + Name + Designation */}
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 ring-2 ring-[#3ABEFF]/40">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-[#3ABEFF]/20 text-[#F5F5F5] font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-[#F5F5F5]">{name}</h2>
          <p className="text-sm text-[#D3D3D3]">{designation}</p>
        </div>
      </div>

      {/* Right: Call, Video, Info Icons */}
      {/* Right: Call, Video, Info Icons */}
      <div className="flex items-center gap-3 text-[#F5F5F5]">
        <button
          className="p-2 rounded-full hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/10 transition"
          title="Voice Call"
        >
          <Phone size={22} className="text-sky-400" />
        </button>
        <button
          className="p-2 rounded-full hover:text-[#3ABEFF] hover:bg-[#3ABEFF]/10 transition"
          title="Video Call"
        >
          <Video size={22} className="text-mint-400" />
        </button>
        <button
          className="p-2 rounded-full hover:text-[#FFE066] hover:bg-[#FFE066]/10 transition"
          title="Info"
        >
          <Info size={22} className="text-yellow-400" />
        </button>
      </div>

    </div>
  );
};
