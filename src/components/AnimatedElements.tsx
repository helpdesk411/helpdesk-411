import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
}

// Floating animation - gentle up and down movement
export function FloatingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Gentle rotation animation
export function RotatingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Pulsing glow effect
export function PulsingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Scale on hover
export function HoverScale({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
}

// Lift on hover with shadow
export function HoverLift({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -10,
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ y: -5, scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}

// Gentle breathing animation
export function BreathingElement({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Complex floating with rotation
export function FloatingRotating({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 3, -3, 0],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Smooth infinite slide
export function SlidingElement({ children, className = "", direction = "horizontal" }: AnimatedElementProps & { direction?: "horizontal" | "vertical" }) {
  const animationProps = direction === "horizontal" 
    ? { x: [0, 10, -10, 0] }
    : { y: [0, 10, -10, 0] };

  return (
    <motion.div
      className={className}
      animate={animationProps}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Glow effect on hover
export function GlowOnHover({ children, className = "" }: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        filter: "drop-shadow(0 0 20px rgba(234, 36, 39, 0.5))",
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}
