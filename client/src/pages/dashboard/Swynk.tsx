// Swynk.tsx
import * as React from "react";
const { useState } = React;
import { Sidebar } from "../../components/dashboard/Sidebar";
import { SwipeCard } from "../../components/swynk/SwipeCard";
import { ProfileDetail } from "../../components/swynk/ProfileDetail";
import { Coffee, Calendar, Star, Users, Award, Zap, ThumbsDown, ThumbsUp } from "lucide-react";

// TODO: Define a proper User type/interface instead of relying on the dummy data structure implicitly.
// TODO: Replace with dynamic user data fetched from an API, potentially based on matching algorithms.
const dummyUsers = [
  {
    id: 1,
    name: "Prannay Rai Sharma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    role: "AI Engineer | Hackathon Winner",
    lookingFor: "Looking to Collab",
    tagline: "Let's build something that makes a difference",
    about: "Passionate about building AI-powered apps that make life better. I specialize in computer vision and NLP applications with a focus on practical use cases.",
    interests: ["Frontend", "AI", "Hackathons", "Mentorship"],
    location: "Mumbai, India",
    company: "AI Innovations",
    experience: 4,
    connections: 328,
    coffee: 17,
    matchPercentage: 92,
  },
  {
    id: 2,
    name: "Maya Patel",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
    role: "UX Designer | Product Strategist",
    lookingFor: "Seeking Design Partner",
    tagline: "Creating experiences that delight and inspire",
    about: "I transform complex problems into intuitive design solutions. My approach combines research, empathy, and creativity to craft user-centered experiences.",
    interests: ["UX Research", "Design Systems", "Accessibility", "Mobile UI"],
    location: "Bangalore, India",
    company: "DesignLabs",
    experience: 6,
    connections: 412,
    coffee: 23,
    matchPercentage: 88,
  },
  {
    id: 3,
    name: "Rajan Mehta",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    verified: false,
    role: "Backend Developer | Cloud Expert",
    lookingFor: "Project Opportunities",
    tagline: "Building robust, scalable backend systems",
    about: "Backend engineer with expertise in distributed systems and cloud architecture. I enjoy solving complex technical challenges and optimizing for scale.",
    interests: ["Microservices", "AWS", "Kubernetes", "System Design"],
    location: "Delhi, India",
    company: "CloudScale",
    experience: 5,
    connections: 276,
    coffee: 8,
    matchPercentage: 78,
  },
  {
    id: 4,
    name: "Ananya Iyer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    verified: true,
    role: "ML Researcher | Open Source Contributor",
    lookingFor: "Looking for Research Partners",
    tagline: "Pushing the boundaries of what's possible with ML",
    about: "I'm deeply involved in machine learning research, contributing to open-source projects and mentoring students interested in AI ethics and interpretability.",
    interests: ["ML Research", "Open Source", "AI Ethics", "Mentorship"],
    location: "Pune, India",
    company: "AI ThinkTank",
    experience: 3,
    connections: 194,
    coffee: 9,
    matchPercentage: 81,
  },
  {
    id: 5,
    name: "Kabir Sharma",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    verified: false,
    role: "Mobile App Developer | Indie Hacker",
    lookingFor: "Looking to Launch a Startup",
    tagline: "Apps that solve real-world problems",
    about: "Built and launched 3 mobile apps independently. I enjoy collaborating with designers and marketers to bring app ideas to life.",
    interests: ["React Native", "Flutter", "Startups", "Side Projects"],
    location: "Jaipur, India",
    company: "Solo Dev Studio",
    experience: 4,
    connections: 134,
    coffee: 19,
    matchPercentage: 76,
  },
  {
    id: 6,
    name: "Saanvi Deshmukh",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    verified: true,
    role: "Product Manager | No-Code Advocate",
    lookingFor: "Looking to Join AI Startups",
    tagline: "Product thinking meets no-code execution",
    about: "I bring tech and users together through clear product roadmaps, user journeys, and rapid prototyping using no-code tools.",
    interests: ["No-Code", "Product Thinking", "Prototyping", "User Testing"],
    location: "Hyderabad, India",
    company: "FlowPro",
    experience: 5,
    connections: 301,
    coffee: 14,
    matchPercentage: 85,
  },
  {
    id: 7,
    name: "Ayaan Qureshi",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    verified: false,
    role: "DevOps Engineer | Automation Enthusiast",
    lookingFor: "Looking for Freelance Gigs",
    tagline: "Automate. Optimize. Repeat.",
    about: "I help teams automate their CI/CD pipelines and manage infrastructure with IaC tools. Always exploring ways to reduce deployment friction.",
    interests: ["DevOps", "Terraform", "Docker", "GitHub Actions"],
    location: "Lucknow, India",
    company: "DevCycle",
    experience: 4,
    connections: 165,
    coffee: 11,
    matchPercentage: 79,
  },
  {
    id: 8,
    name: "Rhea Kapoor",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    verified: true,
    role: "AI Artist | Creative Technologist",
    lookingFor: "Looking for Visual AI Collaborators",
    tagline: "Blending code and creativity",
    about: "I create generative art using AI models like GANs and diffusion. Collaborated on digital art exhibitions and NFT projects.",
    interests: ["GANs", "AI Art", "Web3", "Creative Coding"],
    location: "Goa, India",
    company: "NeuralMuse",
    experience: 2,
    connections: 229,
    coffee: 20,
    matchPercentage: 84,
  },
  {
    id: 9,
    name: "Dev Mehra",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    verified: false,
    role: "Data Scientist | Visualization Nerd",
    lookingFor: "Looking for Data Projects",
    tagline: "Data-driven storytelling for impactful decisions",
    about: "My work focuses on transforming messy datasets into beautiful, insightful dashboards and predictive models.",
    interests: ["Data Viz", "Power BI", "Python", "Storytelling"],
    location: "Chandigarh, India",
    company: "VizCraft",
    experience: 3,
    connections: 187,
    coffee: 13,
    matchPercentage: 82,
  },
  {
    id: 10,
    name: "Tara Malhotra",
    image: "https://randomuser.me/api/portraits/women/73.jpg",
    verified: true,
    role: "AI for Healthcare | TEDx Speaker",
    lookingFor: "Open to Speaking & Research Collabs",
    tagline: "Shaping healthcare with responsible AI",
    about: "Combining my background in medicine with AI, I work on diagnostics, patient triaging systems, and spreading awareness about ethical AI.",
    interests: ["Healthcare AI", "Public Speaking", "Ethics", "AI for Good"],
    location: "New Delhi, India",
    company: "MediAI",
    experience: 7,
    connections: 478,
    coffee: 27,
    matchPercentage: 90,
  },
];

/**
 * Swynk page component.
 * Implements a swipe-based interface (similar to Tinder) for users to discover and connect
 * with potential collaborators or contacts within the platform.
 * Displays profiles in swipeable cards and provides detailed views and connection insights.
 */
export const Swynk = () => {
  // State to track the index of the currently visible user profile card.
  const [currentIndex, setCurrentIndex] = useState(0);
  // Get the user object for the currently displayed card.
  const currentUser = dummyUsers[currentIndex];

  /**
   * Handles the swipe action (left or right) on a user card.
   * Advances to the next user in the list after a short delay for animation.
   * Wraps around to the beginning if the end of the list is reached.
   *
   * @param {"left" | "right"} direction - The direction of the swipe.
   * @param {number} userId - The ID of the user whose card was swiped.
   */
  const handleSwipe = (direction: "left" | "right", userId: number) => {
    // TODO: Implement actual backend logic for skip (left) or connect (right) actions.
    console.log(`Swiped ${direction} on user ${userId}`);

    // Advance to the next card after a delay
    setTimeout(() => {
      setCurrentIndex(prevIndex =>
        prevIndex < dummyUsers.length - 1 ? prevIndex + 1 : 0 // Loop back to start
      );
    }, 300); // Delay matches typical swipe animation duration
  };

  return (
    // Base container using flex for Sidebar + Main layout
    <div className="min-h-screen bg-[#1B1F3B] text-[#F5F5F5] flex relative">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area (adjusts for sidebar) */}
      {/* Using flex-row on desktop for three columns, stacks on mobile (handled by inner divs) */}
      <div className="pl-4 md:pl-24 flex flex-col md:flex-row w-full p-3 md:p-6 gap-3 md:gap-8 max-w-[1800px] mx-auto relative z-10 items-center md:items-start">

        {/* --- Left Column: Swipe Instructions and Cards --- */}
        <div className="w-full md:w-[30%] flex flex-col items-center md:items-start space-y-4">
          {/* Swipe Instruction Banner */}
          <div className="mb-4 bg-[#2E2E2E] px-4 py-2 rounded-full text-sm shadow-md border border-[#3ABEFF]/30 text-[#F5F5F5] font-medium flex items-center gap-2">
            <ThumbsDown className="text-[#FF6B6B] h-4 w-4" />
            <span>Swipe Left to Skip</span> ·
            <ThumbsUp className="text-[#6EE7B7] h-4 w-4" />
            <span>Swipe Right to Connect</span>
          </div>

          {/* Container for Swipe Cards */}
          {/* Only the card at `currentIndex` is displayed using inline style */}
          {/* TODO: Consider a more performant approach for large numbers of users (e.g., virtualizing or only rendering a few cards) */} 
          <div className="relative w-full">
            {dummyUsers.map((user, index) => (
              <div
                key={user.id}
                // Conditionally display based on currentIndex
                style={{ display: index === currentIndex ? "block" : "none" }}
                // Add transition for potential future animations if cards overlap
                className="transform hover:scale-[1.02] transition-all duration-300"
              >
                <SwipeCard
                  user={user}
                  onSwipe={handleSwipe} // Pass swipe handler
                  // TODO: Implement onShowDetails if needed (e.g., expand details in place)
                  onShowDetails={() => { console.log("Show details clicked for", user.id)}}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Middle Column: Detailed Profile View --- */}
        {/* Scrolls independently on desktop */}
        <div className="w-full md:w-[40%] h-auto md:h-[calc(100vh-50px)] overflow-auto pr-0 md:pr-4 custom-scrollbar mt-4 md:mt-0">
          {/* ProfileDetail displays the info for the `currentUser` */}
          <ProfileDetail user={currentUser} isVisible={true} />
        </div>

        {/* --- Right Column: Connection & Match Insights --- */}
        {/* Scrolls independently on desktop */}
        <div className="w-full md:w-[30%] flex flex-col gap-4 md:gap-6 h-auto md:h-[calc(100vh-64px)] overflow-y-auto mt-3 md:mt-0 px-2 md:px-0 custom-scrollbar">
          {/* Connection Insights Card */}
          {/* TODO: Populate with dynamic data based on `currentUser` and logged-in user */}
          <div className="bg-[#222741] p-4 md:p-6 rounded-2xl shadow-md border border-[#3ABEFF]/30">
            <h3 className="text-lg font-semibold text-[#3ABEFF] mb-4 flex items-center">
              <Users className="text-[#3ABEFF] mr-2 h-5 w-5" />
              Connection Insights
            </h3>
            <div className="space-y-4 text-sm">
              {/* Placeholder insights */}
              <div className="flex items-start gap-3">
                <Users className="text-[#3ABEFF] mt-1" />
                <div>
                  <p className="font-medium text-[#F5F5F5]">Mutual Connections</p>
                  <p className="text-[#D3D3D3]">You have 4 connections in common</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-[#6EE7B7] mt-1" />
                <div>
                  <p className="font-medium text-[#F5F5F5]">Same Workplace</p>
                  <p className="text-[#D3D3D3]">Both work at Interrects</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Coffee className="text-[#FFE066] mt-1" />
                <div>
                  <p className="font-medium text-[#F5F5F5]">Location Match</p>
                  <p className="text-[#D3D3D3]">Both based in India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Match Insights Card */}
          {/* TODO: Populate with dynamic match data */}
          <div className="bg-[#222741] p-6 rounded-2xl shadow-md border border-[#FF6B6B]/40">
            <h3 className="text-lg font-semibold text-[#FF6B6B] mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Match Insights
            </h3>
            {/* Match Percentage Bar */}
            <div className="mb-4">
              <p className="font-medium text-[#F5F5F5] mb-1">Personality Match</p>
              <div className="w-full bg-[#D3D3D3]/30 rounded-full h-2.5">
                {/* Width driven by currentUser.matchPercentage */}
                <div className="bg-[#3ABEFF] h-2.5 rounded-full" style={{ width: `${currentUser.matchPercentage}%` }}></div>
              </div>
              <p className="text-right text-xs text-[#3ABEFF] mt-1 font-medium">{currentUser.matchPercentage}%</p>
            </div>
            {/* Placeholder textual insights */}
            <div className="text-sm text-[#D3D3D3] space-y-2">
              <p>
                <Star className="inline-block text-[#FFE066] mr-1" />
                <strong className="text-[#F5F5F5]">High match rate</strong> – Users with 90%+ match had 3x higher collaboration success rate
              </p>
              <p>
                <Star className="inline-block text-[#FFE066] mr-1" />
                <strong className="text-[#F5F5F5]">Similar work style</strong> – You both prefer structured approach with creative freedom
              </p>
            </div>
          </div>

          {/* Coffee Chat Availability Card */}
          {/* TODO: Populate with dynamic availability data for `currentUser` */}
          <div className="bg-[#222741] p-6 rounded-2xl shadow-md border border-[#FFE066]/30">
            <h3 className="text-lg font-semibold text-[#FFE066] mb-4 flex items-center">
              <Coffee className="mr-2 h-5 w-5" />
              Coffee Chat Availability
            </h3>
            {/* Placeholder availability slots */}
            <div className="space-y-3 text-sm text-[#D3D3D3] mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-[#FFE066]" />
                <div>
                  <p className="font-medium text-[#F5F5F5]">Tuesday</p>
                  <p className="text-[#D3D3D3]">1:00 PM – 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-[#FFE066]" />
                <div>
                  <p className="font-medium text-[#F5F5F5]">Friday</p>
                  <p className="text-[#D3D3D3]">1:00 AM</p> { /* Likely placeholder error? 1:00 AM */}
                </div>
              </div>
            </div>
            {/* TODO: Implement scheduling logic onClick */}
            <button className="w-full bg-[#FFE066] text-[#1B1F3B] py-3 font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-md">
              Schedule Coffee Chat
            </button>
          </div>
        </div> {/* End Right Column */}
      </div> {/* End Main Content Area */}
    </div> // End Base Container
  );
};

export default Swynk;