import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A3A34]">What our users say</h2>
          <p className="text-lg text-[#587E76] max-w-2xl mx-auto">
            Hear from professionals who have transformed their careers with Swynk
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <Card className="bg-[#F2E6D9] rounded-2xl p-6 shadow-md border-none">
            <CardContent className="p-0">
              <div className="text-[#935C31] mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-[#1A3A34] mb-6">
                "I found my co-founder through Swynk! The coffee meetings feature helped me connect with the perfect technical partner for my startup."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#DBE4DE] overflow-hidden flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1A3A34]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-[#1A3A34]">Jessica Chen</div>
                  <div className="text-sm text-[#587E76]">Startup Founder</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="bg-[#F2E6D9] rounded-2xl p-6 shadow-md border-none">
            <CardContent className="p-0">
              <div className="text-[#935C31] mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-[#1A3A34] mb-6">
                "The project showcase feature helped me land my dream job! A recruiter saw my work and reached out directly through the platform."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#DBE4DE] overflow-hidden flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1A3A34]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-[#1A3A34]">David Rodriguez</div>
                  <div className="text-sm text-[#587E76]">UX Designer</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 3 */}
          <Card className="bg-[#F2E6D9] rounded-2xl p-6 shadow-md border-none">
            <CardContent className="p-0">
              <div className="text-[#935C31] mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-[#1A3A34] mb-6">
                "As a mentor, I've been able to connect with amazing talent and generate additional income through coffee meetings. Win-win!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#DBE4DE] overflow-hidden flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1A3A34]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-[#1A3A34]">Sarah Johnson</div>
                  <div className="text-sm text-[#587E76]">UX Design Director</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
