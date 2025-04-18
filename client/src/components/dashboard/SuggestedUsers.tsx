import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// TODO: Replace with dynamically fetched user suggestions from an API.
const suggestedUsers = [
    {
      id: 1,
      name: "Jordan Whiteoak",
      username: "@jordanW",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      profession: "Sales Manager at IBM",
      company: "IBM",
      skill: "Sales",
    },
    {
      id: 2,
      name: "Chloe Reiling",
      username: "@chloeRUX",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      profession: "Data Analyst at Google",
      company: "Google",
      skill: "Data",
    },
    {
      id: 3,
      name: "Mike Hudson",
      username: "@mikeH",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      profession: "Frontend Developer at Spotify",
      company: "Spotify",
      skill: "Web Dev",
    },
    {
      id: 4,
      name: "Amelia Taylor",
      username: "@ameliaT",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      profession: "UX Designer at Amazon",
      company: "Amazon",
      skill: "Design",
    },
    {
      id: 5,
      name: "Michael Bisping",
      username: "@michaelB",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      profession: "Product Manager at Apple",
      company: "Apple",
      skill: "Product",
  },
];

/**
 * SuggestedUsers component displays a horizontally scrollable list of user profiles
 * ('Talent Pods') suggested for connection or engagement.
 */
export const SuggestedUsers = () => {
  return (
    // Main container for the suggested users section
    <div className="rounded-2xl bg-[#222741] border border-[#3ABEFF]/20 overflow-hidden shadow-md">
      {/* Header section with title and 'See All' link */}
      <div className="flex justify-between items-center border-b border-[#3ABEFF]/20 px-8 py-7">
        <h2 className="text-xl font-extrabold text-[#3ABEFF] tracking-wide flex items-center gap-2.5">
          🧬 Talent Pods Detected
        </h2>
        {/* TODO: Implement navigation or modal for 'See All' functionality */}
        <button className="text-base font-semibold text-[#FFE066] hover:underline">
          See All
        </button>
      </div>

      {/* Horizontally scrollable container for user pods */}
      <div className="flex gap-8 px-8 py-8 overflow-x-auto hide-scrollbar">
        {suggestedUsers.map((user) => (
          // Individual user pod card
          <div
            key={user.id}
            className="relative flex-shrink-0 w-[280px] rounded-[28px] border border-[#3ABEFF]/30 bg-[#1B1F3B]/80 shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
          >
            {/* Company Tag overlay */}
            <div className="absolute -top-3.5 left-5 px-3.5 py-1.5 text-xs bg-[#3ABEFF] text-[#1B1F3B] font-bold rounded-full shadow uppercase tracking-wider z-10">
              {user.company}
            </div>

            {/* Pod content area */}
            <div className="flex flex-col items-center text-center px-6 pt-12 pb-7 space-y-5">
              {/* Avatar section with gradient border */}
              <div className="relative">
                <div className="rounded-full p-[3px] bg-gradient-to-br from-[#3ABEFF]/40 via-[#6EE7B7]/30 to-[#3ABEFF]/40 shadow-md">
                  <Avatar className="h-16 w-16 border border-[#3ABEFF]/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-[#3ABEFF]/10 text-[#F5F5F5] font-bold text-base">
                      {/* Display initials as fallback */}
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* User name, profession, and username */}
              <div className="space-y-1.5">
                <p className="text-base font-semibold text-[#F5F5F5]">
                  {user.name}
                </p>
                <p className="text-sm text-[#D3D3D3]/80">{user.profession}</p>
                <p className="text-xs text-[#3ABEFF]">{user.username}</p>
              </div>

              {/* Call-to-action button */}
              {/* TODO: Implement user engagement functionality (e.g., follow, connect, message) */}
              <button className="px-6 py-2 text-sm font-semibold rounded-full bg-[#3ABEFF] text-[#1B1F3B] hover:bg-[#66D9EF] hover:text-[#1B1F3B] hover:shadow-lg transition shadow-sm">
                + Engage
              </button>

              {/* Skill tag */}
              <div className="text-xs">
                <span className="px-2.5 py-1 rounded-full font-medium bg-[#3ABEFF]/10 text-[#3ABEFF] border border-[#3ABEFF]/30">
                  Skill: {user.skill}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};