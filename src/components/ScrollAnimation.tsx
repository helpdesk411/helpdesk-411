import type { ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
}

export function ScrollAnimation({ 
  children, 
  className = "", 
  duration = 0.6
}: ScrollAnimationProps) {
  return (
    <div className={`opacity-100 transition-all duration-${Math.round(duration * 1000)} ease-out ${className}`}>
      {children}
    </div>
  );
}

// Stagger animation for lists
export function StaggerAnimation({ 
  children, 
  className = ""
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <div className={`opacity-100 transition-all duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
}

// Fade in animation
export function FadeIn({ 
  children, 
  className = "", 
  duration = 0.6 
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <div className={`opacity-100 transition-all duration-${Math.round(duration * 1000)} ease-out ${className}`}>
      {children}
    </div>
  );
}

// Scale animation
export function ScaleIn({ 
  children, 
  className = "", 
  duration = 0.6 
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <div className={`opacity-100 scale-100 transition-all duration-${Math.round(duration * 1000)} ease-out ${className}`}>
      {children}
    </div>
  );
}
