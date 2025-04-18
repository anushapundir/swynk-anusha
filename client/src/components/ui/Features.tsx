import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Users, Laptop } from "lucide-react";

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-[#F2F0EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A3A34]">How Swynk Works</h2>
          <p className="text-lg text-[#587E76] max-w-2xl mx-auto">
            Connect with professionals in your industry through our innovative platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1: Swynk */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#F2E6D9] rounded-full flex items-center justify-center mb-6 shadow-md">
              <Users className="text-[#935C31] h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#1A3A34]">Swynk & Match</h3>
            <p className="text-[#587E76]">
              Swipe right to connect with professionals who match your interests and career goals
            </p>
          </div>

          {/* Feature 2: Coffee Meet */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#F2E6D9] rounded-full flex items-center justify-center mb-6 shadow-md">
              <Coffee className="text-[#935C31] h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#1A3A34]">Coffee Meetings</h3>
            <p className="text-[#587E76]">
              Book 1-on-1 meetings with industry mentors at affordable per-minute rates
            </p>
          </div>

          {/* Feature 3: Project Showcase */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#F2E6D9] rounded-full flex items-center justify-center mb-6 shadow-md">
              <Laptop className="text-[#935C31] h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#1A3A34]">Project Showcase</h3>
            <p className="text-[#587E76]">
              Share your work with the community and get noticed by potential collaborators
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
