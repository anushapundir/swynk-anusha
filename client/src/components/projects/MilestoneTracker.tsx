import * as React from "react";
const { useState, useRef, useEffect } = React;
import { Award, Star, Target, Trophy } from "lucide-react";

// 🎯 Milestone Data
const milestones = [
  {
    id: 1,
    title: "100 Projects Goal",
    icon: <Target className="text-[#3ABEFF]" size={16} />,
    current: 51,
    target: 100,
    message: "10 more to reach halfway!",
    color: "#3ABEFF",
  },
  {
    id: 2,
    title: "Hackathon Spotlight",
    icon: <Star className="text-[#FFE066]" size={16} />,
    current: 7,
    target: 10,
    message: "3 left for Hackathon Spotlight!",
    color: "#FFE066",
  },
  {
    id: 3,
    title: "Innovation Award",
    icon: <Trophy className="text-[#6EE7B7]" size={16} />,
    current: 25,
    target: 50,
    message: "Half way to Innovation Award!",
    color: "#6EE7B7",
  },
];

// 🎊 Confetti Animation
const Confetti = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(50)].map((_, i) => {
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        const color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        return (
          <div
            key={i}
            className="absolute top-0 rounded-sm opacity-0"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 0.4,
              backgroundColor: color,
              transform: "translateY(-100%)",
              animation: `confetti ${animationDuration}s ease ${delay}s forwards`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100%) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(1000%) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// 🔵 Circular Progress Ring
const ProgressCircle = ({
  progress,
  color,
  size = 100,
  strokeWidth = 8,
  children,
}: {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#2E2E2E"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// 🏆 Milestone Component
export const MilestoneTracker = () => {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const milestone = milestones[activeMilestone];
    const progress = (milestone.current / milestone.target) * 100;
    if (progress >= 80 && isVisible) {
      setShowConfetti(true);
      const timeout = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [activeMilestone, isVisible]);

  const milestone = milestones[activeMilestone];
  const progress = Math.round((milestone.current / milestone.target) * 100);

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl border border-[#3ABEFF]/20 shadow-lg bg-[#222741] overflow-hidden transition-all duration-300"
    >
      <Confetti isActive={showConfetti} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#F5F5F5]">
            Project Milestones
          </h2>
          <div className="bg-[#3ABEFF]/20 rounded-full p-1">
            <Award size={16} className="text-[#3ABEFF]" />
          </div>
        </div>

        {/* Graph & Progress */}
        <div className="flex flex-col items-center my-6">
          <ProgressCircle
            progress={isVisible ? progress : 0}
            color={milestone.color}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[#F5F5F5]">
                {milestone.current}
              </span>
              <span className="text-xs text-[#D3D3D3]">
                of {milestone.target}
              </span>
            </div>
          </ProgressCircle>

          <h3 className="mt-3 font-medium text-[#F5F5F5] flex items-center gap-1.5">
            {milestone.icon}
            <span>{milestone.title}</span>
          </h3>

          <p className="text-sm text-[#D3D3D3] mt-1 text-center">
            {milestone.message}
          </p>
        </div>

        {/* Milestone Tabs */}
        <div className="flex justify-between mt-4 border-t border-[#3ABEFF]/10 pt-3">
          {milestones.map((m, index) => (
            <button
              key={m.id}
              onClick={() => setActiveMilestone(index)}
              className={`relative rounded-lg px-2 py-1.5 text-sm font-medium transition-all ${
                index === activeMilestone
                  ? "text-[#3ABEFF] bg-[#3ABEFF]/10"
                  : "text-[#D3D3D3]/70 hover:text-[#FFE066]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {m.icon}
                <span className="hidden md:block">
                  {m.title.split(" ")[0]}
                </span>
              </div>

              {index === activeMilestone && (
                <div className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-8 bg-[#3ABEFF] rounded-full" />
              )}

              {m.current / m.target >= 1 && (
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-green-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
