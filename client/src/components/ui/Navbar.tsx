import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImg from "@assets/logorbg.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? "bg-[#DBE4DE]/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <img
                src={logoImg}
                alt="Swynk Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-10">
              <a
                href="#features"
                className="text-[#1A3A34] hover:text-[#935C31] font-semibold text-xl transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-[#1A3A34] hover:text-[#935C31] font-semibold text-xl transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-[#1A3A34] hover:text-[#935C31] font-semibold text-xl transition-colors"
              >
                About
              </a>
              <a
                href="#app"
                className="text-[#1A3A34] hover:text-[#935C31] font-semibold text-xl transition-colors"
              >
                App
              </a>
            </div>
          </div>

          {/* Get Started Button */}
          <div className="hidden md:block">
            <Link href="/dashboard">
              <Button className="bg-[#F2F0EA] text-[#1A3A34] rounded-full hover:bg-[#F2F0EA]/80 px-6 text-lg">
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#1A3A34]" />
              ) : (
                <Menu className="h-6 w-6 text-[#1A3A34]" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#DBE4DE]/95 backdrop-blur-sm pb-6 pt-3 px-4 rounded-b-xl shadow-lg">
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-[#1A3A34] hover:text-[#935C31] py-2 font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-[#1A3A34] hover:text-[#935C31] py-2 font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-[#1A3A34] hover:text-[#935C31] py-2 font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#app"
              className="text-[#1A3A34] hover:text-[#935C31] py-2 font-semibold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              App
            </a>
            <Link href="/dashboard">
              <Button
                className="w-full bg-[#F2F0EA] text-[#1A3A34] rounded-full hover:bg-[#F2F0EA]/80 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
