import { cn } from "@/lib/utils";
import { type ElementType } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export function Section({ 
  children, 
  className, 
  id, 
  as: Component = "section",
  padding = "lg" 
}: SectionProps) {
  const paddingClasses = {
    none: "",
    sm: "py-12",
    md: "py-16", 
    lg: "py-20",
    xl: "py-24"
  };

  return (
    <Component 
      id={id}
      className={cn(
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}
