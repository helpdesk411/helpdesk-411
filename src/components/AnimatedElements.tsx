import type { ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
}

// Floating animation - gentle up and down movement
export function FloatingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`animate-bounce ${className}`}
      style={{
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Gentle rotation animation
export function RotatingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        animationDuration: '4s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Pulsing glow effect
export function PulsingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Scale on hover
export function HoverScale({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`transition-transform duration-300 ease-out hover:scale-110 active:scale-95 ${className}`}
    >
      {children}
    </div>
  );
}

// Lift on hover with shadow
export function HoverLift({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 active:-translate-y-1 active:scale-102 ${className}`}
    >
      {children}
    </div>
  );
}

// Gentle breathing animation
export function BreathingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Complex floating with rotation
export function FloatingRotating({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`animate-bounce ${className}`}
      style={{
        animationDuration: '4s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Smooth infinite slide
export function SlidingElement({ children, className = "", direction = "horizontal" }: AnimatedElementProps & { direction?: "horizontal" | "vertical" }) {
  const animationClass = direction === "horizontal" ? "animate-pulse" : "animate-bounce";
  
  return (
    <div
      className={`${animationClass} ${className}`}
      style={{
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Glow effect on hover
export function GlowOnHover({ children, className = "" }: AnimatedElementProps) {
  return (
    <div
      className={`transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(234,36,39,0.5)] ${className}`}
    >
      {children}
    </div>
  );
}
