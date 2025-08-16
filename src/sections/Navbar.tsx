import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { getNavbar, getBrand } from "@/lib/design";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarData = getNavbar();
  const brandData = getBrand();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" }
  ];

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
