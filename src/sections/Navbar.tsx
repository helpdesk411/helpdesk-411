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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Navbar container */}
      <div className="relative flex items-center justify-between px-6 py-4">
        {/* Left side empty for balance */}
        <div className="flex-1"></div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-end space-x-6">
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

        {/* Mobile Burger */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Wave shape */}
      <div className="relative w-full">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-24 text-white"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96 L480,96 C600,96 640,160 720,160 C800,160 840,96 960,96 L1440,96 L1440,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>

        {/* Centered Logo */}
        <div className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
          <img
            src="/images/logo_black.svg"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <a href="#home" className="block text-black hover:text-gray-700">
            Home
          </a>
          <a href="#pricing" className="block text-black hover:text-gray-700">
            Plans
          </a>
          <a href="#addons" className="block text-black hover:text-gray-700">
            Add-Ons
          </a>
          <a href="#contact" className="block text-black hover:text-gray-700">
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
