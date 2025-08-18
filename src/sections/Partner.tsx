import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";


export function Partner() {
  const location = useLocation();
  const pathname = location.pathname;

  // Define colors for each route
  const routeStyles: Record<string, { sectionBg: string; titleColor: string; bodyColor: string; accentColor: string; featureTitleColor: string }> = {
    "/": {
      sectionBg: "bg-muted/30",
      titleColor: "text-foreground",
      bodyColor: "text-[#8C8C8C]",
      accentColor: "text-[#333]",
      featureTitleColor: "text-xl",
    },
    "/b": {
      sectionBg: "bg-black",
      titleColor: "text-white",
      bodyColor: "text-[#C8C8C8]",
      accentColor: "text-red-500",
      featureTitleColor: "text-xl text-red-500",
    },
    "/c": {
      sectionBg: "bg-green-50",
      titleColor: "text-green-900",
      bodyColor: "text-[#8C8C8C]",
      accentColor: "text-green-400",
      featureTitleColor: "text-xl text-green-400",
    },
  };

  // fallback to home if route not in map
  const { sectionBg, titleColor, bodyColor, accentColor, featureTitleColor } = routeStyles[pathname] || routeStyles["/"];

  return (
    <div 
      className={cn(
        "relative md:min-h-screen bg-cover bg-left md:bg-center bg-no-repeat overflow-hidden",
        pathname === "/" ? "rounded-3xl mt-4" : ""
      )}
      style={{
        backgroundImage: pathname === "/b" ? "none" : 'url(/images/partners_bg.svg)',
        backgroundColor: pathname === "/b" ? "black" : "transparent"
      }}
    >
    <Section className={sectionBg}>
      <Container>
        <div className="flex flex-col md:items-center gap-20">
          
          {/* Content */}
          <div className="flex flex-col gap-6 md:items-center md:text-center md:w-3/4"> 
            <h2 className={cn("w-[10ch] md:w-full text-5xl md:text-4xl lg:text-5xl font-light", titleColor)}>
              A proactive IT partner, not just another support ticket system.
            </h2>
            
            <p className={cn("w-[28ch] md:w-3/4 text-base leading-relaxed", bodyColor)}>
              We designed our tiered packages to meet the real-world needs of modern teams—from lean operations to multi-site organizations that need rock-solid security and accountability.
            </p>

            <p className={cn("text-base md:text-sm", accentColor)}>Our team plugs in fast, operates clearly, and scales as you grow.</p>  
          </div>
          
          {/* Image */}
          <div className="flex flex-col gap-32 md:mb-32">
            <img src="/images/partners_image.svg" alt="Partner" className="hidden md:block w-full h-96 md:h-full md:object-cover object-center rounded-2xl" />

            <img src="/images/partners_image_mobile.svg" alt="Partner" className="block md:hidden w-full object-cover rounded-2xl" />

            <div className="flex flex-col md:grid md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-3 items-center">
                <img 
                  className="mb-4" 
                  src={pathname === "/b" ? "/images/proactive_support_red.svg" : "/images/proactive_support.svg"} 
                  alt="Proactive Support" 
                />
                <h3 className={featureTitleColor}>Proactive Support</h3>
                <p className={cn("text-sm md:text-base", bodyColor)}>We fix issues before they become problems</p>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <img 
                  className="mb-4" 
                  src={pathname === "/b" ? "/images/dedicated_team_red.svg" : "/images/dedicated_team.svg"} 
                  alt="Dedicated Team" 
                />
                <h3 className={featureTitleColor}>Dedicated Team</h3>
                <p className={cn("text-sm md:text-base", bodyColor)}>Your own IT department, without the overhead</p>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <img 
                  className="mb-4" 
                  src={pathname === "/b" ? "/images/fast_response_red.svg" : "/images/fast_response.svg"} 
                  alt="Fast Response" 
                />
                <h3 className={featureTitleColor}>Fast Response</h3>
                <p className={cn("text-sm md:text-base", bodyColor)}>Quick resolution times that keep you productive</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    </div>
  );
}
