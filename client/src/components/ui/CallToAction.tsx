import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export const CallToAction = () => {
  return (
    <section className="py-20 bg-[#1A3A34] text-[#F2F0EA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to transform your professional network?
        </h2>
        <p className="text-xl text-[#9FB7AD] mb-10 max-w-3xl mx-auto">
          Join thousands of professionals who are finding meaningful connections, mentorship, and opportunities on Swynk.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/dashboard">
            <Button className="bg-[#F2E6D9] text-[#1A3A34] font-semibold px-8 py-7 rounded-full shadow-lg hover:shadow-xl transition-all">
              Start Swynking
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              className="bg-[#587E76]/10 text-[#F2F0EA] font-semibold px-8 py-7 rounded-full hover:bg-[#587E76]/20 transition-all border-[#9FB7AD]"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
