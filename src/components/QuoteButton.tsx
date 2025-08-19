import { Button } from "./Button";
import { useQuoteModal } from "@/contexts/QuoteModalContext";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface QuoteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  planName: string;
  planPrice: number;
  planDescription: string;
  isPopular?: boolean;
  children: React.ReactNode;
}

const QuoteButton = forwardRef<HTMLButtonElement, QuoteButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    planName, 
    planPrice, 
    planDescription, 
    isPopular = false, 
    children, 
    ...props 
  }, ref) => {
    const { openModal } = useQuoteModal();

    const handleClick = () => {
      openModal(planName, planPrice, planDescription, isPopular);
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

QuoteButton.displayName = "QuoteButton";

export { QuoteButton };
