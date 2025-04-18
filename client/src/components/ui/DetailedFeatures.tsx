import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Coffee, Award, Laptop } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const DetailedFeatures = () => {
  return (
    <section className="py-20 bg-[#F2F0EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Swynk Feature */}
        <div className="flex flex-col md:flex-row items-center mb-24">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-6 text-[#1A3A34]">Find your professional match</h2>
            <p className="text-lg text-[#587E76] mb-6">
              Our advanced matching algorithm connects you with professionals who share your interests, goals, and expertise level.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#935C31] rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1A3A34]">Swipe through curated professional profiles</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#935C31] rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1A3A34]">Get notified when someone wants to connect</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#935C31] rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1A3A34]">Build your network with meaningful connections</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Card className="rounded-2xl overflow-hidden shadow-xl p-6 max-w-md mx-auto bg-white/90 backdrop-blur-sm border border-[#DBE4DE]">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#1A3A34] rounded-full flex items-center justify-center text-[#F2F0EA] font-bold">
                      S
                    </div>
                    <span className="ml-2 font-semibold text-[#1A3A34]">Swynk</span>
                  </div>
                  <div className="text-[#587E76] text-sm">12:30 PM</div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#DBE4DE] overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#1A3A34]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A3A34]">Michael Chen</div>
                    <div className="text-sm text-[#587E76]">Software Engineer at Google</div>
                    <div className="text-xs text-[#935C31]">1.2 miles away</div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center border-none"
                  >
                    <X className="text-red-500 h-8 w-8" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-16 h-16 bg-[#F2E6D9] rounded-full flex items-center justify-center border-none"
                  >
                    <Check className="text-[#935C31] h-8 w-8" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Coffee Meet Feature */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-24">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
            <h2 className="text-3xl font-bold mb-6 text-[#1A3A34]">Book meaningful coffee meetings</h2>
            <p className="text-lg text-[#587E76] mb-6">
              Connect with industry experts and mentors through our affordable 1-on-1 meeting platform.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#935C31] rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1A3A34]">Pay per minute for expert advice and mentorship</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#935C31] rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1A3A34]">Schedule virtual meetings at your convenience</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#935C31] rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1A3A34]">Get guidance from leaders in your industry</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Card className="rounded-2xl overflow-hidden shadow-xl p-6 max-w-md mx-auto bg-white/90 backdrop-blur-sm border border-[#DBE4DE]">
              <CardContent className="p-0">
                <h3 className="font-semibold text-xl mb-6 text-[#1A3A34]">Coffee Meet</h3>

                <div className="bg-[#F2E6D9] rounded-xl p-4 mb-6">
                  <div className="flex items-center mb-4">
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
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium text-[#1A3A34]">Rate</div>
                      <div className="text-[#935C31] font-semibold">$20 / 15 min</div>
                    </div>
                    <div>
                      <div className="font-medium text-[#1A3A34]">Availability</div>
                      <div className="text-[#587E76]">Next 3 days</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#1A3A34] text-[#F2F0EA] font-semibold py-3 px-6 rounded-lg hover:bg-[#1A3A34]/90">
                  Book a Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Showcase Feature */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-6">Showcase your work</h2>
            <p className="text-lg text-gray-600 mb-6">
              Display your projects and get discovered by potential clients, employers, and collaborators.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span>Create beautiful project portfolios</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span>Receive feedback from industry professionals</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span>Connect with collaborators for future projects</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <Card className="rounded-2xl overflow-hidden shadow-xl p-6 max-w-md mx-auto bg-white/70 backdrop-blur-sm border border-white/20">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">James Wilson</div>
                    <div className="text-xs text-gray-500">Posted 2 days ago</div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden mb-4 h-48 bg-gray-100 flex items-center justify-center">
                  <Laptop className="h-16 w-16 text-gray-400" />
                </div>

                <h3 className="font-semibold text-lg mb-2">AI-Powered Portfolio Generator</h3>
                <p className="text-gray-600 text-sm mb-4">
                  A web application that helps users create professional portfolios using AI technology.
                </p>

                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-[#004E89]/10 text-[#004E89] border-none">React</Badge>
                  <Badge variant="outline" className="bg-[#004E89]/10 text-[#004E89] border-none">Node.js</Badge>
                  <Badge variant="outline" className="bg-[#004E89]/10 text-[#004E89] border-none">AI</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
