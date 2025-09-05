import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { ScrollAnimation, FadeIn } from "@/components/ScrollAnimation";
import { FloatingRotating, HoverLift } from "@/components/AnimatedElements";

export function CTAFinal() {
  const location = useLocation();
  const pathname = location.pathname;

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
      sectionBg: "bg-white",
      titleColor: "text-[#333333]",
      subtitleColor: "text-[#666666]",
      bodyColor: "text-[#666666]",
      primaryButtonBg: "bg-red-500",
      secondaryButtonBg: "bg-white border border-black text-black",
    },
  };

  // fallback to home if route not in map
  const { sectionBg, titleColor, bodyColor } = routeStyles[pathname] || routeStyles["/"];

  return (
    <Section id="contact" className={cn("py-12 md:py-20", sectionBg, pathname === "/b" ? "mx-4 rounded-t-2xl" : "")}>
      <Container>
          {/* Content */}
          <ScrollAnimation delay={0.2}>
            <h2 className={cn("md:w-3/4 mx-auto text-center text-3xl md:text-4xl lg:text-5xl font-bold md:mb-6", titleColor)}>
              If your IT setup is built on hope, <span className="text-[#bababa]">it's only a matter of time.</span>
            </h2>
          </ScrollAnimation>
          
          {/* Image */}
          <FadeIn delay={0.4}>
            <div className="relative">
              <div className="aspect-square max-w-2xl mx-auto">
                {/* Headphones illustration placeholder */}
                <div className="w-full h-full flex items-center justify-center">
                  <HoverLift className="relative cursor-pointer">
                    <FloatingRotating>
                      {/* Headphones SVG */}
                      <img src="images/cta_image.svg" alt="CTA Final" className="w-full h-full object-cover" />
                    </FloatingRotating>
                  </HoverLift>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col items-center">
            <ScrollAnimation delay={0.6}>
              <p className={cn("md:w-2/3 text-center text-lg mb-8 leading-relaxed mx-auto", bodyColor)}>
                Let's take this off your plate, lock down your infrastructure, and help your business move faster with fewer risks.
              </p>
            </ScrollAnimation>
            
          </div>
        
      </Container>
    </Section>
  );
}
