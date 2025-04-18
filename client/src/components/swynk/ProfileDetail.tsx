import * as React from "react";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Target,
  Coffee,
  MapPin,
  Briefcase,
  Sparkles,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProfileDetailProps {
  user: {
    id: number;
    name: string;
    image: string;
    verified: boolean;
    role: string;
    lookingFor: string;
    tagline: string;
    about: string;
    interests: string[];
    location?: string;
    company?: string;
    experience?: number;
    connections?: number;
    coffee?: number;
    matchPercentage?: number;
  };
  isVisible: boolean;
}

export const ProfileDetail: React.FC<ProfileDetailProps> = ({
  user,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-[#222741] p-6 rounded-2xl shadow-lg border border-[#3ABEFF]/20 space-y-6 text-[#F5F5F5]">
      {/* Header */}
          <div className="flex items-center gap-3 md:gap-5">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-[#1B1F3B] shadow-md">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {user.name}
            {user.verified && <span className="text-[#FFE066]">✓</span>}
          </h2>
          <p className="text-base text-[#D3D3D3]">{user.role}</p>
          <p className="italic text-sm text-[#D3D3D3]/70 mt-1">“{user.tagline}”</p>
        </div>
      </div>

      {/* Match Percentage */}
      {user.matchPercentage && (
        <div className="bg-[#1F243D] p-4 rounded-xl border border-[#3ABEFF]/30 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-base font-semibold flex items-center">
              <Sparkles className="text-[#3ABEFF] mr-2" size={18} />
              Personality Match
            </p>
            <div className="px-2 py-0.5 bg-[#222741] border border-[#3ABEFF]/30 rounded-full text-[#F5F5F5] font-bold text-sm shadow-sm">
              {user.matchPercentage}%
            </div>
          </div>
          <Progress
            value={user.matchPercentage}
            className="h-3 rounded-full bg-[#F5F5F5]/30"
          />
          <div className="mt-3 flex items-start gap-2 text-sm">
            <Zap size={16} className="text-[#3ABEFF] mt-0.5" />
            <span>
              <strong>Strong match</strong> in work style and professional goals
            </span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {user.connections !== undefined && (
          <div className="bg-[#3ABEFF]/10 p-4 rounded-xl text-center border border-[#3ABEFF]/20 shadow-sm">
            <div className="text-[#3ABEFF] mb-1">
              <Users size={22} />
            </div>
            <p className="text-lg font-bold">{user.connections}</p>
            <p className="text-xs text-[#3ABEFF]/90">Connections</p>
          </div>
        )}
        {user.coffee !== undefined && (
          <div className="bg-[#FFE066]/10 p-4 rounded-xl text-center border border-[#FFE066]/30 shadow-sm">
            <div className="text-[#FFE066] mb-1">
              <Coffee size={22} />
            </div>
            <p className="text-lg font-bold">{user.coffee}</p>
            <p className="text-xs text-[#FFE066]/90">Coffee Meets</p>
          </div>
        )}
        {user.experience !== undefined && (
          <div className="bg-[#6EE7B7]/10 p-4 rounded-xl text-center border border-[#6EE7B7]/30 shadow-sm">
            <div className="text-[#6EE7B7] mb-1">
              <Briefcase size={22} />
            </div>
            <p className="text-lg font-bold">{user.experience}+</p>
            <p className="text-xs text-[#6EE7B7]/80">Yrs Exp</p>
          </div>
        )}
      </div>

      {/* Location & Company */}
      <div className="flex flex-wrap gap-3 text-sm text-[#D3D3D3]">
        {user.location && (
          <div className="flex items-center gap-2 bg-[#3ABEFF]/10 px-3 py-1.5 rounded-md border border-[#3ABEFF]/20">
            <MapPin size={16} className="text-[#3ABEFF]" /> {user.location}
          </div>
        )}
        {user.company && (
          <div className="flex items-center gap-2 bg-[#6EE7B7]/10 px-3 py-1.5 rounded-md border border-[#6EE7B7]/20">
            <Briefcase size={16} className="text-[#6EE7B7]" /> {user.company}
          </div>
        )}
      </div>

      {/* About */}
      <div>
        <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#3ABEFF]">
          <User size={18} /> About
        </h3>
        <p className="text-sm text-[#D3D3D3] leading-relaxed">{user.about}</p>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#3ABEFF]">
          <Target size={18} /> Interests
        </h3>
        <div className="flex flex-wrap gap-3">
          {user.interests.map((interest, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-[#3ABEFF]/10 text-[#3ABEFF] border-[#3ABEFF]/20 hover:bg-[#3ABEFF]/20 text-sm px-4 py-1.5"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      {/* Looking For */}
      <div>
        <h3 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#6EE7B7]">
          <Target size={18} /> Looking For
        </h3>
        <div className="bg-gradient-to-r from-[#3ABEFF]/10 to-[#FFE066]/10 rounded-xl px-4 py-3 text-[#D3D3D3] text-sm">
          {user.lookingFor}
        </div>
      </div>

      {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <button className="flex-1 bg-[#3ABEFF] hover:bg-[#3ABEFF]/80 text-[#1B1F3B] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
          <Users size={18} /> Connect
        </button>
        <button className="flex-1 bg-gradient-to-r from-[#FFE066] to-[#FF6B6B]/60 hover:opacity-90 text-[#1B1F3B] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
          <Coffee size={18} /> Coffee Meet
        </button>
      </div>
    </div>
  );
};
