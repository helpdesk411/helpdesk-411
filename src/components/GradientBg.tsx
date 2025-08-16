import { cn } from "@/lib/utils";
import { resolveTokenReference } from "@/lib/design";

interface GradientBgProps {
  children: React.ReactNode;
  className?: string;
  variant?: "hero" | "subtle" | "none";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export function GradientBg({ children, className, variant = "hero", rounded = "3xl" }: GradientBgProps) {
  const gradientVariants = {
    hero: {
      background: `radial-gradient(ellipse at top, ${resolveTokenReference('{tokens.colors.gradient.start}')} 0%, ${resolveTokenReference('{tokens.colors.gradient.mid}')} 45%, ${resolveTokenReference('{tokens.colors.gradient.end}')} 100%)`
    },
    subtle: {
      background: `linear-gradient(135deg, ${resolveTokenReference('{tokens.colors.gradient.start}')}20 0%, ${resolveTokenReference('{tokens.colors.gradient.end}')}20 100%)`
    },
    none: {}
  };

  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md", 
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full"
  };

  return (
    <div 
      className={cn("relative overflow-hidden", roundedClasses[rounded], className)}
      style={gradientVariants[variant]}
    >
      {children}
    </div>
  );
}
