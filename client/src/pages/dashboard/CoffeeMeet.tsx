import React, { useState } from "react";
import { Search, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Sidebar } from "@/components/dashboard/Sidebar"; // Assumed to be responsive
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown"; // Assumed to be okay or needs separate handling

// Types (assuming these are defined correctly)
interface Mentor {
  id: number;
  name: string;
  title: string;
  bio: string;
  price: string;
  availability: string;
  avatar: string;
  skills: string[];
}

interface Booking {
  id: number;
  mentorId: number;
  mentorName: string;
  date: string;
  time: string;
  month: string;
  day: number;
}

// Mock data (assuming this is defined correctly)
const mentors: Mentor[] = [
  // ... (mentor data remains the same)
  { id: 1, name: "Prannay Rai Sharma", title: "LLM Expert", bio: "Building large-scale language models...", price: "50₹/hour", availability: "M-F, 4pm-10pm", avatar: "https://randomuser.me/api/portraits/men/32.jpg", skills: ["LLM", "NLP", "AI"] },
  { id: 2, name: "Vikram Patel", title: "AI/ML Expert", bio: "Specializing in deep learning...", price: "50₹/hour", availability: "M-F, 2pm-8pm", avatar: "https://randomuser.me/api/portraits/men/45.jpg", skills: ["AI", "ML", "Computer Vision"] },
  { id: 3, name: "Anjali Desai", title: "Cloud Architect", bio: "Expert in cloud infrastructure...", price: "65₹/hour", availability: "T-S, 6pm-9pm", avatar: "https://randomuser.me/api/portraits/women/67.jpg", skills: ["Cloud", "AWS", "DevOps"] },
  { id: 4, name: "Rahul Mehra", title: "Full Stack Developer", bio: "Full stack developer...", price: "45₹/hour", availability: "Weekends, 9am-6pm", avatar: "https://randomuser.me/api/portraits/men/22.jpg", skills: ["React", "Node.js", "MongoDB"] }
];

const bookings: Booking[] = [
  // ... (upcoming bookings data remains the same)
  { id: 1, mentorId: 1, mentorName: "Prannay Rai Sharma", date: "April 25", time: "3:00pm", month: "APR", day: 25 },
  { id: 2, mentorId: 2, mentorName: "AI/ML Expert", date: "April 26", time: "12:00pm", month: "APR", day: 26 },
  { id: 3, mentorId: 1, mentorName: "Prannay Rai Sharma", date: "April 28", time: "11:00am", month: "APR", day: 28 }
];

const pastBookings: Booking[] = [
    // ... (past bookings data remains the same)
    { id: 4, mentorId: 3, mentorName: "Anjali Desai", date: "April 10", time: "2:00pm", month: "APR", day: 10 },
    { id: 5, mentorId: 4, mentorName: "Rahul Mehra", date: "April 5", time: "4:30pm", month: "APR", day: 5 },
];

// --- CoffeeMeet Component ---
export const CoffeeMeet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["AI"]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookingView, setBookingView] = useState<"upcoming" | "past" | "all">("upcoming");
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(mentors);
  // const [isProfileOpen, setIsProfileOpen] = useState(false); // Not used in the provided JSX structure

  // --- Handlers and Helper Functions ---
  // (Keep the existing functions: getFilteredBookings, handleSearch, toggleSkill, getAvatarContent)

  const getFilteredBookings = () => {
    switch (bookingView) {
      case "past": return pastBookings;
      case "upcoming": return bookings;
      case "all": return [...bookings, ...pastBookings];
      default: return bookings;
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    const hasSelectedSkills = selectedSkills.length > 0;

    if (!query && !hasSelectedSkills) {
      setFilteredMentors(mentors);
      return;
    }

    const filtered = mentors.filter(mentor => {
      const matchesQuery = query === "" ||
        mentor.name.toLowerCase().includes(lowerQuery) ||
        mentor.title.toLowerCase().includes(lowerQuery) ||
        mentor.bio.toLowerCase().includes(lowerQuery);

      const matchesSkills = !hasSelectedSkills ||
        mentor.skills.some(skill => selectedSkills.includes(skill));

      return matchesQuery && matchesSkills;
    });
    setFilteredMentors(filtered);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => {
      const updatedSkills = prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill];

      // Refilter mentors after skill change
      const lowerQuery = searchQuery.toLowerCase();
      const hasSelectedSkills = updatedSkills.length > 0;

      if (!searchQuery && !hasSelectedSkills) {
        setFilteredMentors(mentors);
      } else {
        const filtered = mentors.filter(mentor => {
          const matchesQuery = searchQuery === "" ||
            mentor.name.toLowerCase().includes(lowerQuery) ||
            mentor.title.toLowerCase().includes(lowerQuery) ||
            mentor.bio.toLowerCase().includes(lowerQuery);

          const matchesSkills = !hasSelectedSkills ||
            mentor.skills.some(s => updatedSkills.includes(s));

          return matchesQuery && matchesSkills;
        });
        setFilteredMentors(filtered);
      }
      return updatedSkills; // Return the new state for selectedSkills
    });
  };


  const getAvatarContent = (mentor: Mentor) => {
    return <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover rounded-lg" />;
  };

  // --- Render ---
  return (
    // Use flex for overall layout with Sidebar
    <div className="flex min-h-screen bg-[#1B1F3B] text-[#F5F5F5]">
      {/* Sidebar - Assumed Responsive (might use fixed width on desktop, hidden/drawer on mobile) */}
      <Sidebar />

      {/* Main Content Area - Takes remaining space and handles its own padding */}
      {/* Added overflow-x-hidden to prevent horizontal scroll issues */}
      <main className="flex-1 overflow-x-hidden">
        {/*
           Adjust padding:
           - px-4 py-6: Base padding for mobile
           - md:pl-24: Add left padding ONLY on medium screens and up to account for the desktop sidebar (adjust '24' if sidebar width changes)
           - md:pr-6: Right padding for medium screens and up
         */}
        <div className="px-4 py-6 md:pl-24 md:pr-6"> {/* <-- Adjusted Padding */}
          {/* Profile Dropdown remains at the top right */}
          <div className="flex justify-end mb-4 md:mb-6"> {/* Slightly more margin bottom on larger screens */}
            <ProfileDropdown />
          </div>

          {/* Main Layout: Stacks vertically on mobile, side-by-side on md+ */}
          {/* Reduced gap on mobile, kept larger gap for md+ */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative z-10"> {/* <-- Adjusted Gap */}

            {/* Left Panel - Mentor Listings */}
            {/* Width adjustments remain: md:w-1/2 lg:w-3/5 */}
            {/* Added max-h-[calc(100vh-someOffset)] if needed for better scrolling, but overflow-y-auto might suffice */}
            <div className="md:w-1/2 lg:w-3/5 overflow-y-auto no-scrollbar"> {/* Consider adding max-height if needed */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F5] mb-4 px-1"> {/* Slightly adjusted text size steps */}
                ☕ Start Your Coffee Chat Journey
              </h1>

              {/* Search & Filters Section */}
              {/* Padding adjusted slightly for smaller screens if needed */}
              <div className="bg-[#222741] rounded-xl shadow-sm p-3 sm:p-4 mb-4 border border-[#3ABEFF]/10">
                <div className="relative mb-3 sm:mb-4">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="text-[#D3D3D3]" size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search mentors or skills" // Slightly shorter placeholder
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full py-2 sm:py-2.5 pl-10 pr-4 rounded-full bg-[#1B1F3B] border border-[#3ABEFF]/20 text-sm text-[#F5F5F5] placeholder-[#D3D3D3]/60 focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]/30"
                  />
                </div>

                {/* Skill Filters - flex-wrap handles responsiveness */}
                <div className="flex flex-wrap gap-2">
                  {["AI", "LLM", "Cloud", "Frontend", "Backend", "DevOps"].map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      // Adjusted padding slightly for better touch targets
                      className={`py-1.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-[#3ABEFF] text-[#1B1F3B]"
                          : "bg-[#3ABEFF]/10 text-[#D3D3D3] hover:bg-[#3ABEFF]/20"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* ☕ Coffee Incentive Banner */}
              <div className="bg-gradient-to-r from-[#7B5D36] to-[#A87F53] rounded-xl p-3 mb-4 text-white shadow-sm">
                <div className="flex items-center">
                  <div className="mr-2 sm:mr-3"> {/* Adjusted margin */}
                    <Coffee size={20} sm:size={24} className="text-[#FFCE35]" /> {/* Responsive icon size */}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold">Book 3 meetings, get 1 free!</h3>
                    <p className="text-xs opacity-80">Earn Coffee Points with each session</p>
                  </div>
                </div>
              </div>

              {/* Mentor Cards */}
              {/* Reduced space-y slightly on mobile */}
              <div className="space-y-3 sm:space-y-4 pb-4 mr-1">
                {filteredMentors.map(mentor => (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -3 }} // Keep hover effect
                    className="bg-[#222741] rounded-xl shadow-sm overflow-hidden border border-[#3ABEFF]/10"
                  >
                    {/* Use flex-col on small screens, flex-row on sm+ */}
                    <div className="p-3 sm:p-4 flex flex-col sm:flex-row">
                      {/* Avatar - Slightly smaller on smallest screens */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#3ABEFF]/10 rounded-lg overflow-hidden flex-shrink-0 mr-0 mb-3 sm:mr-4 sm:mb-0"> {/* Adjusted margin/size */}
                        {getAvatarContent(mentor)}
                      </div>

                      {/* Mentor Info */}
                      <div className="flex-1 flex flex-col justify-between"> {/* Ensure vertical fill */}
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-semibold text-[#F5F5F5]">{mentor.title}</h3>
                            <div className="hidden sm:flex items-center"> {/* Hide brewer tag on smallest screens */}
                              <Coffee size={14} className="text-[#FFCE35] mr-1" />
                              <span className="text-xs font-medium text-[#FFCE35]">Top Brewer</span>
                            </div>
                          </div>
                          <h4 className="text-sm sm:text-md font-medium text-[#D3D3D3]">{mentor.name}</h4>
                          <p className="text-xs sm:text-sm text-[#D3D3D3]/80 mt-1 line-clamp-2">{mentor.bio}</p>
                        </div>

                        {/* Bottom section: Price, Availability, Button */}
                        <div className="mt-2 sm:mt-3"> {/* Adjusted margin */}
                          {/* Use flex-col on small screens for price/button stack */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0">
                            <div>
                              <p className="text-sm sm:text-md font-semibold text-[#3ABEFF]">{mentor.price}</p>
                              <p className="text-xs text-[#D3D3D3]">{mentor.availability}</p>
                            </div>
                            <button className="bg-[#FFCE35] hover:bg-[#FFCE35]/90 text-[#1B1F3B] font-medium py-1.5 px-4 rounded-full text-sm transition-all shadow-sm w-full sm:w-auto"> {/* Full width button on mobile */}
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                 {/* No Mentors Found Message */}
                 {filteredMentors.length === 0 && (
                  <div className="text-center py-10 px-4 text-[#D3D3D3]/80">
                    <p>No mentors found matching your criteria.</p>
                    <p className="text-sm mt-1">Try adjusting your search or skill filters.</p>
                  </div>
                 )}
              </div>
            </div> {/* End Left Panel */}

            {/* Right Panel - Calendar & Bookings */}
            {/* Width adjustments remain: md:w-1/2 lg:w-2/5 */}
            <div className="md:w-1/2 lg:w-2/5 overflow-y-auto no-scrollbar"> {/* Consider adding max-height if needed */}
              {/* Availability Section */}
              <div className="bg-[#222741] border border-[#3ABEFF]/10 rounded-xl shadow-sm p-3 sm:p-4 mb-4 md:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-[#F5F5F5] mb-3">Coffee Chat Availability</h2>

                {/* Calendar and Available Times - Stack vertically by default, row on md+ */}
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4"> {/* Changed md:flex-row to lg:flex-row for better spacing on medium tablets */}
                  {/* Calendar */}
                  {/* Ensure calendar itself is responsive if needed via its own props/styling */}
                  <div className="bg-[#1B1F3B] rounded-xl p-2 sm:p-3 flex-1">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border-0 max-w-full text-white [&_button]:text-xs sm:[&_button]:text-sm" // Added button size adjustments
                      // Add props here if needed to control calendar size/layout further
                    />
                  </div>

                  {/* Available Times */}
                  {/* Adjust grid columns for different sizes */}
                  <div className="bg-[#1B1F3B] rounded-xl p-3 flex-1 border border-[#3ABEFF]/10">
                    <h3 className="text-sm sm:text-md font-semibold text-[#F5F5F5] mb-2">Available Times</h3>
                    {/* More columns on larger screens */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                      {['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'].map((time, i) => (
                        <button
                          key={i}
                          // Adjusted padding/text size
                          className={`p-1.5 sm:p-2 text-center text-xs sm:text-sm rounded-lg transition-colors ${
                            i === 0 // Example active state - adjust logic as needed
                              ? 'bg-[#FFCE35]/20 border border-[#FFCE35] text-[#FFCE35] font-medium' // Made border thinner, text yellow
                              : 'bg-[#3ABEFF]/10 text-[#D3D3D3] hover:bg-[#3ABEFF]/20'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bookings Section with Tabs */}
              <div className="bg-[#222741] border border-[#3ABEFF]/10 rounded-xl shadow-sm p-3 sm:p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base sm:text-lg font-semibold text-[#F5F5F5]">Coffee Sessions</h2>
                  <div className="flex items-center space-x-1">
                    <Coffee size={14} sm:size={16} className="text-[#FFCE35]" />
                    <span className="text-xs sm:text-sm font-medium text-[#FFCE35]">250 points</span> {/* Adjusted text size */}
                  </div>
                </div>

                {/* Booking Tabs - flex-wrap allows wrapping if needed */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {["upcoming", "past", "all"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setBookingView(view as any)}
                      // Adjusted padding/text size
                      className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                        bookingView === view
                          ? "bg-[#3ABEFF] text-[#1B1F3B]"
                          : "bg-[#3ABEFF]/10 text-[#D3D3D3] hover:bg-[#3ABEFF]/20"
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Booking Cards */}
                {/* Reduced space-y on mobile */}
                <div className="space-y-2 sm:space-y-3">
                  {getFilteredBookings().map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center bg-[#1B1F3B] rounded-lg p-2 sm:p-3 border border-[#3ABEFF]/10"
                    >
                      {/* Date Indicator */}
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#3ABEFF]/10 rounded-lg flex flex-col items-center justify-center mr-2 sm:mr-3 relative">
                        <span className="text-[10px] sm:text-xs font-semibold text-[#D3D3D3]">{booking.month}</span>
                        <span className="text-base sm:text-lg font-bold text-white">{booking.day}</span>
                        {/* Coffee Icon Badge */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#FFCE35] rounded-full flex items-center justify-center">
                          <Coffee size={8} sm:size={10} className="text-[#1B1F3B]" />
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1">
                        {/* Adjusted text sizes */}
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm sm:text-base font-medium text-[#F5F5F5]">{booking.date}</p>
                            <p className="text-xs sm:text-sm text-[#D3D3D3]">{booking.mentorName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm sm:text-base font-medium text-[#3ABEFF]">{booking.time}</p>
                            <p className="text-xs text-[#FFCE35]">+25 pts</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* No Bookings Message */}
                    {getFilteredBookings().length === 0 && (
                     <div className="text-center py-6 px-4 text-sm text-[#D3D3D3]/80">
                         <p>You have no {bookingView} bookings.</p>
                     </div>
                    )}
                </div>

                {/* Coffee Points Note */}
                <div className="mt-4 bg-[#FFCE35]/10 rounded-lg p-2 sm:p-3 text-xs text-[#D3D3D3]">
                  <p className="flex items-center">
                    <Coffee size={12} sm:size={14} className="text-[#FFCE35] mr-1" />
                    <span>Earn Coffee Points with each session. Collect 100 points for a free session!</span>
                  </p>
                </div>
              </div>
            </div> {/* End Right Panel */}

          </div> {/* End Main Layout Flex Container */}
        </div> {/* End Padding Container */}
      </main> {/* End Main Content Area */}
    </div> // End Overall Flex Container
  );
};