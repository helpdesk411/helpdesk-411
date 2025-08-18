import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { getCTAFinal } from "@/lib/design";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function CTAFinal() {
  const location = useLocation();
  const pathname = location.pathname;
  const ctaData = getCTAFinal();

  // Define colors for each route
  const routeStyles: Record<string, { sectionBg: string; titleColor: string; subtitleColor: string; bodyColor: string; primaryButtonBg: string; secondaryButtonBg: string }> = {
    "/": {
      sectionBg: "bg-white",
      titleColor: "text-foreground",
      subtitleColor: "text-[#bababa]",
      bodyColor: "text-[#bababa]",
      primaryButtonBg: "bg-red-500",
      secondaryButtonBg: "bg-white border border-gray-300",
    },
    "/b": {
      sectionBg: "bg-black",
      titleColor: "text-white",
      subtitleColor: "text-white",
      bodyColor: "text-white",
      primaryButtonBg: "bg-red-500",
      secondaryButtonBg: "bg-white",
    },
    "/c": {
      sectionBg: "bg-green-50",
      titleColor: "text-green-900",
      subtitleColor: "text-green-700",
      bodyColor: "text-green-800",
      primaryButtonBg: "bg-green-500",
      secondaryButtonBg: "bg-white border border-green-300",
    },
  };

  // fallback to home if route not in map
  const { sectionBg, titleColor, bodyColor, primaryButtonBg, secondaryButtonBg } = routeStyles[pathname] || routeStyles["/"];

  return (
    <Section className={cn("py-12 md:py-20", sectionBg, pathname === "/b" ? "mx-4 rounded-t-2xl" : "")}>
      <Container>
          {/* Content */}
            <h2 className={cn("md:w-3/4 mx-auto text-center text-3xl md:text-4xl lg:text-5xl font-bold md:mb-6", titleColor)}>
              If your IT setup is built on hope, <span className="text-[#bababa]">it’s only a matter of time.</span>
            </h2>
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-square max-w-2xl mx-auto">
              {/* Headphones illustration placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  {/* Headphones SVG */}
                  <img src="images/cta_image.svg" alt="CTA Final" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className={cn("md:w-2/3 text-center text-lg mb-8 leading-relaxed", bodyColor)}>
              Let's take this off your plate, lock down your infrastructure, and help your business move faster with fewer risks.
            </p>
            
            <div className="flex sm:flex-row gap-4">
              <Button 
                size="lg" 
                href={ctaData.primaryAction.href}
                className={cn("text-base text-white", primaryButtonBg)}
              >
                {ctaData.primaryAction.label}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                href={ctaData.secondaryAction.href}
                className={cn("text-base", pathname === "/b" ? "bg-white text-black hover:bg-gray-100" : secondaryButtonBg)}
              >
                {ctaData.secondaryAction.label}
              </Button>
            </div>
          </div>
        
      </Container>
    </Section>
  );
}
