import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { getAddOns, type AddOnCard } from "@/lib/design";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface AddOnCardComponentProps {
  card: AddOnCard;
  pathname?: string;
}

function AddOnCardComponent({ card, pathname = "/" }: AddOnCardComponentProps) {
  const isRouteB = pathname === "/b";
  
  return (
    <div 
      className={cn(
        "group relative p-5 md:p-10 transition-all duration-300 hover:shadow-lg",
        isRouteB ? "rounded-[20px] border-0" : "rounded-2xl border border-border"
      )}
      style={isRouteB ? {
        background: 'linear-gradient(180deg, rgba(140, 140, 140, 0.41) 0%, rgba(38, 38, 38, 0.30) 100%)'
      } : {}}
    >
      <Badge 
        variant="accent" 
        className={cn(
          "rounded-full font-light mb-4 md:mb-8 p-2 px-4 shadow-none",
          isRouteB 
            ? "bg-white text-black" 
            : "bg-white text-accent-foreground"
        )}
      >
        {card.badge}
      </Badge>

      <h3 className={cn(
        "md:w-2/4 text-xl md:text-2xl mb-4 md:mb-10 transition-colors",
        isRouteB 
          ? "text-white group-hover:text-red-400" 
          : "text-[#4d4d4d] group-hover:text-primary"
      )}>
        {card.title}
      </h3>

      
      {/* Image placeholder */}
      <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export function AddOns() {
  const location = useLocation();
  const pathname = location.pathname;
  const addOnsData = getAddOns();

  // Define colors for each route
  const routeStyles: Record<string, { sectionBg: string; titleColor: string; subtitleColor: string; bodyColor: string }> = {
    "/": {
      sectionBg: "bg-[#F5F5F5]",
      titleColor: "text-[#333]",
      subtitleColor: "text-[#4d4d4d]",
      bodyColor: "text-[#8c8c8c]",
    },
    "/b": {
      sectionBg: "bg-black",
      titleColor: "text-white",
      subtitleColor: "text-white",
      bodyColor: "text-white",
    },
    "/c": {
      sectionBg: "bg-green-50",
      titleColor: "text-green-900",
      subtitleColor: "text-green-700",
      bodyColor: "text-green-800",
    },
  };

  // fallback to home if route not in map
  const { sectionBg, titleColor, subtitleColor, bodyColor } = routeStyles[pathname] || routeStyles["/"];

  return (
    <Section className={cn(sectionBg, "px-8 py-12 md:py-24", pathname === "/" ? "rounded-2xl mt-4" : "")}>
        <div className="text-center mb-16">
          <h2 className={cn("text-3xl md:text-4xl lg:text-5xl mb-6", titleColor)}>
            Add What You Need. <span className={subtitleColor}>Only When You Need It.</span> 
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto", bodyColor)}>
            Available across all plans to enhance your IT support experience
          </p>
        </div>
        
          {/* First row - 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {addOnsData.cards.slice(0, 3).map((card, index) => (
              <AddOnCardComponent key={index} card={card} pathname={pathname} />
            ))}
          </div>
          
          {/* Second row - 2 cards taking 50% each */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 md:mb-20">
            {addOnsData.cards.slice(3, 5).map((card, index) => (
              <AddOnCardComponent key={index + 3} card={card} pathname={pathname} />
            ))}
          </div>

          <p className={cn("text-sm text-center", bodyColor)}>
            All add-ons are available with custom pricing based on your specific needs and usage requirements.
          </p>
    </Section>
  );
}
