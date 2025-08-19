import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getBrand } from "@/lib/design";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const brandData = getBrand();
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Route B specific navbar
  if (pathname === "/b") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="relative flex items-center justify-between px-6 py-4">
          {/* Left spacer */}
          <div className="flex-1"></div>

          {/* Desktop nav links */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-6">
            <a href="#home" className="text-black hover:text-gray-700 text-sm font-medium">
              Home
            </a>
            <a href="#pricing" className="text-black hover:text-gray-700 text-sm font-medium">
              Plans
            </a>
            <a href="#addons" className="text-black hover:text-gray-700 text-sm font-medium">
              Add-Ons
            </a>
            <a href="#contact" className="text-black hover:text-gray-700 text-sm font-medium">
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Circular cutout & logo */}
        <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2">
          {/* White circle that overlaps navbar to create cutout */}
          <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <img
              src="/images/logo_black.svg"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
            <div className={`bg-white h-full w-64 shadow-lg absolute right-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex justify-between items-center p-6 border-b">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <a 
                  href="#home" 
                  className="block text-black hover:text-gray-700 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#pricing" 
                  className="block text-black hover:text-gray-700 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Plans
                </a>
                <a 
                  href="#addons" 
                  className="block text-black hover:text-gray-700 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Add-Ons
                </a>
                <a 
                  href="#contact" 
                  className="block text-black hover:text-gray-700 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Original navbar for other routes
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav 
        className={cn(
          "mx-8 rounded-full transition-all duration-300",
          isScrolled 
            ? "mt-6 bg-black/95 backdrop-blur-md shadow-2xl" 
            : "mt-8 md:mt-12 bg-black/90 backdrop-blur-sm"
        )}
      >
        <div className="flex h-16 items-center justify-between px-12">
          {/* Brand */}
          <a 
            href="/" 
            className="flex items-center"
            aria-label={brandData.name}
          >
            <img 
              src="/images/logo.svg" 
              alt="Logo" 
            />
          </a>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <span>Home</span>
              <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#pricing"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <span>Plans</span>
              <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#addons"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              Add-Ons
            </a>
            <a
              href="#contact"
              className="text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
