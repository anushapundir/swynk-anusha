import { Link } from "wouter";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import logoImage from "@assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#1A3A34] text-[#F2F0EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-[#F2F0EA] p-2 rounded-xl mr-2">
                <span className="text-[#1A3A34] font-bold">S</span>
              </div>
              <span className="text-[#F2F0EA] text-2xl font-bold">Swynk</span>
            </div>
            <p className="text-[#9FB7AD] mb-6">
              Professional networking redefined. Connect, meet, and grow your career.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Download App
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#9FB7AD] hover:text-[#F2F0EA] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-[#587E76] my-8" />

        <div className="text-center text-[#9FB7AD] text-sm">
          <p>&copy; {new Date().getFullYear()} Swynk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
