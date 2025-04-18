import * as React from "react";
const { useState, useRef, useEffect } = React;
import { Folder, CheckCircle, Clock } from "lucide-react";

// Animated Counter Hook
const useCounter = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
    countRef.current = start;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);

      countRef.current = currentCount;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const handle = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(handle);
  }, [start, end, duration]);

  return count;
};

export const StatusCard = () => {
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalProjects = useCounter(isVisible ? 51 : 0, 2000);
  const completedProjects = useCounter(isVisible ? 40 : 0, 2000);
  const inProgressProjects = useCounter(isVisible ? 11 : 0, 2000);

  return (
    <div
      ref={cardRef}
      className="rounded-xl border border-[#3ABEFF]/20 bg-[#222741] shadow-md p-5 transition-all duration-300"
    >
      <div className="mb-1">
        <h2 className="text-lg font-semibold text-[#F5F5F5]">Current Status</h2>
        <p className="text-sm text-[#D3D3D3] mb-4">Project metrics overview</p>
      </div>

      <div className="space-y-5">
        {/* Total Projects */}
        <div className="flex items-center gap-3">
          <div className="bg-[#3ABEFF]/10 h-12 w-12 rounded-lg flex items-center justify-center text-[#3ABEFF]">
            <Folder size={24} />
          </div>
          <div>
            <p className="text-sm text-[#D3D3D3]">Total Projects</p>
            <div className="text-xl font-semibold text-[#F5F5F5]">{totalProjects}</div>
          </div>
        </div>

        {/* Completed */}
        <div className="flex items-center gap-3">
          <div className="bg-green-600/10 h-12 w-12 rounded-lg flex items-center justify-center text-green-400">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-[#D3D3D3]">Completed</p>
            <div className="text-xl font-semibold text-[#F5F5F5]">{completedProjects}</div>
          </div>
          <div className="ml-auto">
            <div className="bg-green-600/20 text-green-300 text-xs py-0.5 px-2 rounded-md font-medium">
              {totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400/10 h-12 w-12 rounded-lg flex items-center justify-center text-yellow-300">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-[#D3D3D3]">In Progress</p>
            <div className="text-xl font-semibold text-[#F5F5F5]">{inProgressProjects}</div>
          </div>
          <div className="ml-auto">
            <div className="bg-yellow-400/20 text-yellow-300 text-xs py-0.5 px-2 rounded-md font-medium">
              {totalProjects > 0 ? Math.round((inProgressProjects / totalProjects) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 mt-6 bg-[#3ABEFF]/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#6EE7B7] via-[#3ABEFF] to-[#FFE066] transition-all duration-1000"
          style={{ width: `${isVisible ? (completedProjects / totalProjects) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
};
