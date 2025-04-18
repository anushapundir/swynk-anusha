import * as React from "react";
const { useState, useRef, useEffect } = React;
import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
  AnimatePresence,
} from "framer-motion";
import { X, Check, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwipeCardProps {
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
    matchPercentage?: number;
  };
  onSwipe: (direction: "left" | "right", userId: number) => void;
  onShowDetails: (userId: number) => void;
}

// --- Animation Logic (Unchanged) ---
export const SwipeCard: React.FC<SwipeCardProps> = ({
  user,
  onSwipe,
  onShowDetails,
}) => {
  const [exitX, setExitX] = useState<number | null>(null);
  const [showDirectionHint, setShowDirectionHint] = useState<"left" | "right" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  const rightGradient = useTransform(
    x,
    [-100, 0, 100],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(110,231,183,0.3)"]
  );
  const leftGradient = useTransform(
    x,
    [-100, 0, 100],
    ["rgba(255,107,107,0.3)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]
  );

  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      if (latest > 50) setShowDirectionHint("right");
      else if (latest < -50) setShowDirectionHint("left");
      else setShowDirectionHint(null);
    });

    return () => unsubscribe();
  }, [x]);

  const handleDragEnd = (_e: PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? "right" : "left";
      setExitX(direction === "right" ? 1000 : -1000);
      onSwipe(direction, user.id);
    }
  };

  const handleButtonClick = (direction: "left" | "right") => {
    setExitX(direction === "right" ? 1000 : -1000);
    onSwipe(direction, user.id);
  };
  // --- End Animation Logic ---


  return (
      <motion.div
        ref={cardRef}
        // Outer container: Changed aspect ratio for more height
        className="relative w-full max-w-lg aspect-[2/3] cursor-grab active:cursor-grabbing mx-auto" // Changed from aspect-[3/4]
        style={{ x, rotate, opacity, scale, y: 0, zIndex: exitX ? 50 : 60 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ x: exitX || 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >

      {/* Inner container: Takes full size of parent, responsive rounding */}
      {/* Added flex flex-col */}
      <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#1B1F3B] shadow-xl relative select-none border border-[#3ABEFF]/20 flex flex-col">
        <div className="w-full h-full relative flex-grow"> {/* Image container, added flex-grow */}
          <img
            src={user.image}
            alt={user.name}
            className="absolute inset-0 w-full h-full object-cover object-center" // Use absolute positioning for image within flex container
            draggable="false"
            loading="lazy"
          />

          {/* Motion gradients */}
          <motion.div className="absolute inset-0" style={{ background: rightGradient }} aria-hidden="true"/>
          <motion.div className="absolute inset-0" style={{ background: leftGradient }} aria-hidden="true"/>

          {/* Score badge: Responsive positioning and sizing */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#1B1F3B]/90 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-lg flex items-center gap-1 z-10"> {/* Added z-10 */}
            <Star size={16} md:size={18} className="text-[#FFE066] fill-[#FFE066]" />
            <span className="text-sm md:text-base font-bold">{user.matchPercentage ?? 92}%</span>
          </div>

          {/* Swipe direction hints: Responsive positioning, padding, icon size */}
          <AnimatePresence>
            {showDirectionHint && (
              <motion.div
                key={showDirectionHint}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`absolute top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full shadow-lg pointer-events-none z-20 ${ // Added z-20
                  showDirectionHint === "right"
                    ? "right-4 md:right-8 bg-[#6EE7B7] text-[#1B1F3B]"
                    : "left-4 md:left-8 bg-[#FF6B6B] text-white"
                }`}
                aria-hidden="true"
              >
                {showDirectionHint === 'right'
                    ? <ThumbsUp size={28} md:size={32} />
                    : <ThumbsDown size={28} md:size={32} />
                }
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom overlay with details: Adjusted padding slightly */}
          {/* Gradient height might adjust automatically, or use h-2/5, h-3/5 etc. */}
          <div className="absolute bottom-0 inset-x-0 pt-10 pb-20 md:pt-12 md:pb-24 px-4 md:px-6 bg-gradient-to-t from-[#1B1F3B] via-[#1B1F3B]/80 to-transparent text-white z-10"> {/* Adjusted gradient, added z-10 */}
            {/* Responsive text sizes */}
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl md:text-2xl font-bold truncate">{user.name}</h2>
              {user.verified && <span className="text-[#FFE066] text-lg md:text-xl">✓</span>}
            </div>
            <p className="text-sm md:text-base text-[#D3D3D3] truncate">{user.role}</p>
            <p className="mt-2 md:mt-3 text-xs md:text-sm text-[#D3D3D3]/90 leading-relaxed line-clamp-2 md:line-clamp-3">
              {user.about}
            </p>
            {/* Responsive tag sizing */}
            <div className="mt-3 md:mt-4"> {/* Increased margin slightly */}
              <span className="text-[10px] leading-none px-2 py-1 md:text-xs md:px-3 md:py-1.5 bg-[#3ABEFF]/10 text-[#3ABEFF] rounded-full backdrop-blur-sm border border-[#3ABEFF]/30 font-medium">
                {user.lookingFor}
              </span>
            </div>
          </div>
        </div> {/* End Image container */}

        {/* Swipe buttons: Adjusted bottom positioning */}
        <div className="absolute bottom-4 inset-x-0 px-4 md:bottom-5 md:px-6 flex justify-center md:justify-between items-center gap-4 z-20"> {/* Added z-20 */}
          <Button
            onClick={() => handleButtonClick("left")}
            aria-label="Skip user"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#FF6B6B] text-white shadow-lg border border-white/20 hover:bg-[#FF4C4C] transition-colors duration-200"
          >
            <X size={22} md:size={26} strokeWidth={2.5}/>
          </Button>
          <Button
            onClick={() => handleButtonClick("right")}
            aria-label="Connect with user"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#6EE7B7] text-[#1B1F3B] shadow-lg border border-white/20 hover:bg-[#5FE0AC] transition-colors duration-200"
          >
            <Check size={22} md:size={26} strokeWidth={2.5}/>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};