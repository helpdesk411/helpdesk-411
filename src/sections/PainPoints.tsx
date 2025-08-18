import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";
import { Shield, Activity, Server, Clock, AlertTriangle } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useLocation } from "react-router-dom";



// Pain points data matching the screenshot
const painPointsData = [
  {
    id: 1,
    icon: Clock,
    title: "Time Wasted",
    description: "Your team spends hours dealing with broken systems instead of productive work"
  },
  {
    id: 2,
    icon: Shield,
    title: "Security Gaps", 
    description: "You're vulnerable to threats you don't even see coming"
  },
  {
    id: 3,
    icon: AlertTriangle,
    title: "Damage Control",
    description: "When something breaks, panic mode begins - that's not IT support"
  },
  {
    id: 4,
    icon: Server,
    title: "System Failures",
    description: "Critical business systems go down without warning or backup plans"
  },
  {
    id: 5,
    icon: Activity,
    title: "Poor Monitoring",
    description: "Issues pile up undetected until they become business-critical emergencies"
  },
  {
    id: 6,
    icon: Shield,
    title: "Compliance Risks",
    description: "Regulatory requirements slip through the cracks, putting your business at risk"
  }
];

interface PainPointCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  isCentered?: boolean;
  pathname?: string;
}

function PainPointCard({ icon: IconComponent, title, description, isCentered = false, pathname = "/" }: PainPointCardProps) {
  const isRouteB = pathname === "/b";
  
  return (
    <div className={cn(
      "p-5 rounded-3xl transition-all duration-300",
      isRouteB 
        ? (isCentered 
            ? "bg-white text-black shadow-2xl" 
            : "bg-[#242424] text-[#C8C8C8] shadow-lg")
        : (isCentered 
            ? "bg-black text-white shadow-2xl" 
            : "bg-gray-100 text-gray-800 shadow-lg")
    )}>
      <div className={cn("mb-6", isRouteB ? "text-black" : "text-orange-400")}>
        <IconComponent className="h-8 w-8" />
      </div>
      <h3 className={cn(
        "text-xl mb-4",
        isRouteB 
          ? (isCentered ? "text-black" : "text-[#C8C8C8]")
          : (isCentered ? "text-white" : "text-gray-800")
      )}>
        {title}
      </h3>
      <p className={cn(
        "text-base leading-relaxed",
        isRouteB 
          ? (isCentered ? "text-black" : "text-[#969696]")
          : (isCentered ? "text-white" : "text-gray-600")
      )}>
        {description}
      </p>
    </div>
  );
}

export function PainPoints() {
  const location = useLocation();
  const pathname = location.pathname;

  // Define colors for each route
  const routeStyles: Record<string, { sectionBg: string; titleColor: string; highlightColor: string, subTintColor: string }> = {
    "/": {
      sectionBg: "bg-[#F5F5F5]",
      titleColor: "text-[#333]",
      highlightColor: "text-[#bababa]",
      subTintColor: "text-[#8C8C8C]"
    },
    "/b": {
      sectionBg: "bg-black",
      titleColor: "text-red-500",
      highlightColor: "text-[#bababa]",
      subTintColor: "text-red-500"
    },
    "/c": {
      sectionBg: "bg-green-50",
      titleColor: "text-green-900",
      highlightColor: "text-green-400",
      subTintColor: "text-red-500"
    },
  };

  // fallback to home if route not in map
  const { sectionBg, titleColor, highlightColor, subTintColor } = routeStyles[pathname] || routeStyles["/"];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Section id="features" className={cn(sectionBg, "py-20", pathname === "/" ? "mt-4 rounded-3xl" : "")}>
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 relative overflow-visible">
        <div className="">
          <h2 className={cn(titleColor, "text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto font-light mb-6")}>
            Tech issues don't fix themselves. <span className={highlightColor}>And ignoring them costs more than you think.</span>
          </h2>

          <p className={cn(highlightColor, "mb-6")}>
            Your team wastes hours dealing with broken systems, missing backups, and unclear responsibilities. You're vulnerable to threats you don't even see coming. And when something breaks, the panic begins.
          </p>

          <p className={cn(subTintColor)}>That's not IT support. That's damage control.</p>
        </div>
        
        {/* Vertical Carousel for Desktop */}
        <div className="hidden md:block relative pl-12">
          {/* Dot Navigation - Only 3 dots for visible cards */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
            {Array.from({ length: 3 }).map((_, index) => {
              // Calculate which card is currently in each visible position
              const cardIndex = (current - 1 + index + count) % count;
              const isCenter = index === 1; // Middle position (index 1) is the center
              
              return (
                <button
                  key={index}
                  className={cn(
                    "w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 border-2",
                    isCenter
                      ? (pathname === "/b" ? "bg-red-500 border-red-500" : "bg-orange-300 border-orange-300")
                      : "bg-transparent border-gray-300 hover:border-gray-400"
                  )}
                  onClick={() => api?.scrollTo(cardIndex)}
                />
              );
            })}
          </div>

          <Carousel
            setApi={setApi}
            orientation="vertical"
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-mt-1 h-[700px]">
              {painPointsData.map((painPoint, index) => {
                // Calculate which card is in the center position (middle of 3 visible cards)
                // The center card is the one at position (current + count) % count
                const centerIndex = current % count;
                const isCentered = index === centerIndex;
                
                return (
                  <CarouselItem key={painPoint.id} className="pt-1 basis-1/3">
                    <div className="p-1">
                      <PainPointCard
                        icon={painPoint.icon}
                        title={painPoint.title}
                        description={painPoint.description}
                        isCentered={isCentered}
                        pathname={pathname}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        
        {/* Mobile Grid */}
        <div className="md:hidden grid gap-6 max-w-lg mx-auto">
          {painPointsData.map((painPoint, index) => (
            <PainPointCard
              key={painPoint.id}
              icon={painPoint.icon}
              title={painPoint.title}
              description={painPoint.description}
              isCentered={index === 1} // Make the second card featured on mobile
              pathname={pathname}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
