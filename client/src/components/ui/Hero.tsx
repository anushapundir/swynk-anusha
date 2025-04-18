import { motion } from "framer-motion";
import { Link } from "wouter";
import heroBackground from "@assets/Hero_Background.png";

// Add keyframes for the float animation if not defined globally
const keyframes = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;
// Inject keyframes (simple way for component scope, better in global CSS)
if (typeof window !== "undefined") {
  const styleSheet = document.styleSheets[0];
  try {
    // Check if rule already exists to avoid errors on hot-reload
    let ruleExists = false;
    if (styleSheet && styleSheet.cssRules) {
      // Check if stylesheet and rules exist
      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        // Using try-catch because accessing name on some rule types might throw an error
        try {
          // Check for keyframes rule by name - safer access
          const rule = styleSheet.cssRules[i];
          if (rule instanceof CSSKeyframesRule && rule.name === "float") {
            ruleExists = true;
            break;
          }
        } catch (e) {
          /* Ignore rules we can't access */
        }
      }
      if (!ruleExists && styleSheet.insertRule) {
        // Ensure insertRule exists
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      }
    }
  } catch (e) {
    console.warn("Could not insert float keyframes:", e);
  }
}

export const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[100vh] lg:max-h-[110vh] flex flex-col justify-start">
      {/* Background Image - full responsive cover */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-4 sm:pb-8 relative w-full">
        <div className="relative z-10">
          {/* Hero Text - unchanged */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8">
              <span className="block text-[#1A3A34]">Meet the</span>
              <span className="block text-[#1E1E1E]">Right Connection</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#1A3A34] mb-12">
              Swipe, Match, Build what's next.
            </p>
            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-[#F2E6D9] to-[#E6D268] hover:from-[#E6D268] hover:to-[#F2E6D9] text-[#1A3A34] font-semibold px-10 py-4 sm:py-8 text-lg sm:text-xl rounded-full shadow-md hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1">
                Start Swynking
              </button>
            </Link>
          </div>
        </div>
        {/* Hero Image and Floating Elements Container */}
        {/* Increased min-height slightly more for vertical spacing */}
        <div className="relative mx-auto -mt-8 md:-mt-12 lg:-mt-16 min-h-[70vh] sm:min-h-[75vh]">
          {/* Optional semi-transparent overlay - can be adjusted for better text contrast */}

          {/* --- Floating Elements --- ADJUSTED POSITIONS FOR MOBILE SPREAD --- */}

          {/* Floating profile card 1 - Moved slightly left and down */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // Mobile: Adjusted position. Desktop: Restored via sm: prefixes.
            className="absolute top-[50%] left-[2%] sm:left-4 md:left-0 lg:left-4 sm:top-1/4
                       rounded-2xl shadow-lg p-3 sm:p-5 w-44 sm:w-60 md:w-72 z-20
                       bg-white/40 backdrop-blur-md border border-white/30 block"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#F2E6D9] overflow-hidden flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-10 sm:w-10 text-[#935C31]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="ml-2 sm:ml-3">
                <div className="font-semibold text-sm sm:text-lg text-[#1A3A34]">
                  Robert Smith
                </div>
                <div className="text-xs sm:text-sm text-[#587E76]">
                  New York
                </div>
              </div>
            </div>
            <button className="mt-3 sm:mt-4 w-full py-1 sm:py-2 text-xs sm:text-sm bg-[#F2F0EA] text-[#1A3A34] font-medium hover:bg-[#F2E6D9] transition-colors rounded-full border border-[#E6D268]/30">
              Say Hello
            </button>
          </motion.div>

          {/* Floating coffee meeting card - Moved slightly right and up */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            // Mobile: Adjusted position. Desktop: Restored via sm: prefixes.
            className="absolute bottom-[30%] right-[2%] sm:right-4 md:right-0 lg:right-4 sm:bottom-1/4 /* Adjusted bottom position */
                       rounded-2xl shadow-lg p-3 sm:p-5 w-44 sm:w-60 md:w-72 z-20
                       bg-white/40 backdrop-blur-md border border-white/30 block"
            style={{ animation: "float 4s ease-in-out 1s infinite" }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F2E6D9] overflow-hidden flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-[#935C31]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="ml-2 sm:ml-3">
                <div className="font-medium text-sm sm:text-base text-[#1A3A34]">
                  Coffee Chat
                </div>
                <div className="text-xs sm:text-sm text-[#587E76]">
                  $20 / 5 mins
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating emojis - visible ONLY on mobile - SPREAD FURTHER OUT */}
          {/* Briefcase Emoji - Top Left, further out */}
          <motion.div
            className="absolute left-[5%] top-[20%] z-20 block sm:hidden" // Adjusted left/top
            style={{ animation: "float 5s ease-in-out 2s infinite" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#F2E6D9] flex items-center justify-center shadow-md">
              <span className="text-3xl">💼</span>
            </div>
          </motion.div>
          {/* Phone Emoji - Top Right, further out */}
          <motion.div
            className="absolute right-[-5%] top-[40%] z-20 block sm:hidden" // Adjusted right/top
            style={{ animation: "float 5s ease-in-out 1s infinite" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#F2E6D9] flex items-center justify-center shadow-md">
              <span className="text-3xl">📱</span>
            </div>
          </motion.div>
          {/* Handshake Emoji - Bottom Left, further out */}
          <motion.div
            className="absolute left-[0%] bottom-[20%] z-20 block sm:hidden" // Adjusted left/bottom
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#F2E6D9] flex items-center justify-center shadow-md">
              <span className="text-3xl">🤝</span>
            </div>
          </motion.div>

          {/* Floating elements visible ONLY on larger screens (sm and up) - unchanged */}
          <motion.div
            className="absolute right-1/4 top-[25%] z-20 hidden sm:block"
            style={{ animation: "float 7s ease-in-out 2s infinite" }}
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#F2E6D9] to-[#E6D268]/80 backdrop-blur-md ring-2 ring-[#E6D268]/50 shadow-2xl flex items-center justify-center">
              <span className="text-6xl">🤝</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute right-1/6 bottom-1/5 z-20 hidden sm:block"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div className="w-20 h-20 rounded-full bg-[#F2E6D9] flex items-center justify-center shadow-md">
              <span className="text-4xl">💡</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute left-[22%] bottom-20 z-20 hidden sm:block"
            style={{ animation: "float 8s ease-in-out 3s infinite" }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F2E6D9] to-[#E6D268]/80 backdrop-blur-md ring-2 ring-[#E6D268]/50 shadow-lg flex items-center justify-center">
              <span className="text-5xl">☕</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute left-[25%] top-[38%] z-20 hidden sm:block"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div className="w-20 h-20 rounded-full bg-[#F2E6D9] flex items-center justify-center shadow-md">
              <span className="text-4xl">🔍</span>
            </div>
          </motion.div>
        </div>{" "}
        {/* End Hero Image and Floating Elements Container */}
      </div>{" "}
      {/* End Main Content Container */}
    </section>
  );
};
