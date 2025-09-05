import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { getAddOns, type AddOnCard } from "@/lib/design";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import { ScrollAnimation, StaggerAnimation, ScaleIn } from "@/components/ScrollAnimation";

interface AddOnCardComponentProps {
  card: AddOnCard;
  pathname?: string;
}

function AddOnCardComponent({ card, pathname = "/" }: AddOnCardComponentProps) {
  const isRouteB = pathname === "/b";
  const isRouteC = pathname === "/c";
  
  // Map card badges to their corresponding new icons for route C
  const getIconForRouteC = (badge: string) => {
    switch (badge) {
      case "Onsite Visits":
        return "images/onsite_visits.svg";
      case "Emergency Response":
        return "images/emergency_response.svg";
      case "After-Hours Support":
        return "images/after_hour_support.svg";
      case "Hardware Procurement":
        return "images/hardware_procurement.svg";
      case "Compliance Support":
        return "images/compliance_support.svg";
      default:
        return card.image;
    }
  };
  
  return (
    <div 
      className={cn(
        "group bg-[#E8E8E8] relative p-5 md:p-10 transition-all duration-300 hover:shadow-lg flex flex-col h-full min-h-[300px]",
        isRouteB ? "rounded-[20px] border-0" : 
        isRouteC ? "rounded-2xl bg-[#F5F5F5]" :
        "rounded-2xl border border-border"
      )}
      style={isRouteB ? {
        background: 'linear-gradient(180deg, rgba(140, 140, 140, 0.41) 0%, rgba(38, 38, 38, 0.30) 100%)'
      } : {}}
    >
      {isRouteC ? (
        // Route C layout: Icon at top-left, title below, description at bottom
        <div className="flex flex-col">
          {/* Red icon at top-left */}
          <div className="mb-8">
            <img 
              src={getIconForRouteC(card.badge || "")} 
              alt={card.badge} 
              className="w-12 h-12"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-[#333333] font-medium text-2xl mb-4">
            {card.badge}
          </h3>
          
          {/* Description */}
          <p className="text-[#666666] text-xl leading-relaxed">
            {card.title}
          </p>
        </div>
      ) : (
        // Original layout for routes A and B
        <>
          <Badge 
            variant="accent" 
            className={cn(
              "rounded-full font-light mb-4 md:mb-8 p-2 px-4 shadow-none flex items-center gap-2 w-fit",
              isRouteB 
                ? "bg-white text-black" 
                : "bg-white text-accent-foreground"
            )}
          >
            <MapPin 
              size={16} 
              className={cn(
                isRouteB ? "text-black" : "text-red-500"
              )}
            />
            {card.badge}
          </Badge>

          <h3 className={cn(
            "md:w-2/4 text-xl md:text-2xl mb-4 md:mb-10 transition-colors flex-grow",
            isRouteB 
              ? "text-white group-hover:text-red-400" 
              : "text-[#4d4d4d] group-hover:text-primary"
          )}>
            {card.title}
          </h3>

          {/* Image placeholder */}
          <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 flex items-center justify-center overflow-hidden mt-auto">
            <div className="w-full h-full bg-muted/30 flex items-center justify-center">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </>
      )}
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
      sectionBg: "bg-white",
      titleColor: "text-[#333333]",
      subtitleColor: "text-[#666666] italic",
      bodyColor: "text-[#666666]",
    },
  };

  // fallback to home if route not in map
  const { sectionBg, titleColor, subtitleColor, bodyColor } = routeStyles[pathname] || routeStyles["/"];

  return (
    <Section id="addons" className={cn(sectionBg, "px-8 py-12 md:py-24", pathname === "/" ? "rounded-2xl mt-4" : "")}>
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className={cn("text-3xl md:text-4xl lg:text-5xl mb-6", titleColor)}>
              Add What You Need. <span className={subtitleColor}>Only When You Need It.</span> 
            </h2>
            <p className={cn("text-lg max-w-2xl mx-auto", bodyColor)}>
              Available across all plans to enhance your IT support experience
            </p>
          </div>
        </ScrollAnimation>
        
        <StaggerAnimation staggerDelay={0.15}>
          {/* First row - 3 cards */}
          <div className={cn("grid md:grid-cols-3 gap-6 mb-6", pathname === "/c" ? "md:px-40" : "")}>
            {addOnsData.cards.slice(0, 3).map((card, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <AddOnCardComponent card={card} pathname={pathname} />
              </ScaleIn>
            ))}
          </div>
        </StaggerAnimation>
          
        <StaggerAnimation staggerDelay={0.15}>
          {/* Second row - 2 cards taking 50% each */}
          <div className={cn("grid md:grid-cols-2 gap-6 mb-10 md:mb-20", pathname === "/c" ? "md:px-40" : "")}>
            {addOnsData.cards.slice(3, 5).map((card, index) => (
              <ScaleIn key={index + 3} delay={index * 0.1}>
                <AddOnCardComponent card={card} pathname={pathname} />
              </ScaleIn>
            ))}
          </div>
        </StaggerAnimation>

        <ScrollAnimation delay={0.5}>
          <p className={cn("text-sm text-center", bodyColor)}>
            All add-ons are available with custom pricing based on your specific needs and usage requirements.
          </p>
        </ScrollAnimation>
    </Section>
  );
}
