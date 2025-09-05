import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getBrand } from "@/lib/design";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const brandData = getBrand();
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 8);
      
      // Only apply hide/show effect on main route "/"
      if (pathname === "/") {
        // Determine scroll direction
        const isScrollingDown = currentScrollY > lastScrollY;
        const isScrollingUp = currentScrollY < lastScrollY;
        
        // Hide navbar when scrolling down (after 100px to avoid immediate hiding)
        if (isScrollingDown && currentScrollY > 100) {
          setIsVisible(false);
        }
        
        // Show navbar when scrolling up
        if (isScrollingUp) {
          setIsVisible(true);
        }
        
        // Always show navbar at the top
        if (currentScrollY <= 100) {
          setIsVisible(true);
        }
      } else {
        // For other routes, always keep navbar visible
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, pathname]);

  // Route C specific navbar
  if (pathname === "/c") {
    return (
      <header className="sticky top-0 left-0 right-0 z-50 bg-transparent">
        <div className="relative flex items-center justify-between px-6">
          {/* Left side - Contact Button (Desktop only) */}
          <div className="flex-1 flex items-center">
            <button className="hidden md:block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Contact
            </button>
          </div>
          {/* Center - Logo (Both desktop and mobile) */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="">
                <div className="flex">
                  <img 
                    src="/images/shape_wave_logo.svg" 
                    alt="Logo" 
                    className="w-40 md:w-80"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Navigation Links (Desktop) and Mobile menu button */}
          <div className="flex-1 flex justify-end">
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-white hover:text-gray-200 text-sm font-medium">
                Home
              </a>
              <a href="#features" className="text-white hover:text-gray-200 text-sm font-medium">
                Features
              </a>
              <a href="#pricing" className="text-white hover:text-gray-200 text-sm font-medium">
                Plans
              </a>
              <a href="#addons" className="text-white hover:text-gray-200 text-sm font-medium">
                Add-Ons
              </a>
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white transition-all duration-200 ease-in-out transform hover:scale-110"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} className="transition-all duration-200 ease-in-out" /> : <Menu size={28} className="transition-all duration-200 ease-in-out" />}
            </button>
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

  // Route B specific navbar
  if (pathname === "/b") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="relative flex items-center justify-between px-6 py-4">
          {/* Left side - Contact link */}
          <div className="flex-1 flex items-center">
            <a href="#contact" className="hidden md:block text-black hover:text-gray-700 text-sm font-medium">
              Contact
            </a>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-6">
            <a href="#home" className="text-black hover:text-gray-700 text-sm font-medium">
              Home
            </a>
            <a href="#features" className="text-black hover:text-gray-700 text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-black hover:text-gray-700 text-sm font-medium">
              Plans
            </a>
            <a href="#addons" className="text-black hover:text-gray-700 text-sm font-medium">
              Add-Ons
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-black transition-all duration-200 ease-in-out transform hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} className="transition-all duration-200 ease-in-out" /> : <Menu size={28} className="transition-all duration-200 ease-in-out" />}
          </button>
        </div>

        {/* Circular cutout & logo */}
        <div className="absolute left-1/2 top-9 md:top-4 transform -translate-x-1/2">
          <div className="relative flex justify-center">
            <img
              src="/images/logo_b.svg"
              alt="Logo"
              className="w-40 md:w-60 object-contain"
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
                  href="#features" 
                  className="block text-black hover:text-gray-700 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Features
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

  // Original navbar for main route "/" with hide/show scroll effect
  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
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
                className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Plans
              </a>
              <a
                href="#addons"
                className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Add-Ons
              </a>
              <a
                href="#contact"
                className="text-white/90 hover:text-white text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-all duration-200 ease-in-out transform hover:scale-110"
              aria-label="Toggle navigation menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} className="transition-all duration-200 ease-in-out" /> : (
                <svg
                  className="h-5 w-5 transition-all duration-200 ease-in-out"
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
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300">
            <div className={`bg-white w-full shadow-lg fixed top-0 left-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`} style={{minHeight: '100vh'}}>
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
                  href="#features" 
                  className="block text-black hover:text-gray-700 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Features
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

      {/* Floating indicator when navbar is hidden */}
      {!isVisible && pathname === "/" && (
        <div className="fixed top-4 right-4 z-40 transition-all duration-300 ease-in-out">
          <div className="bg-black/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
}
