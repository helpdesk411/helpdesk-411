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
        sectionBg: "bg-white md:pb-40",
        titleColor: "text-[#333333]",
        bodyColor: "text-[#333333]",
        accentColor: "text-[#333333]",
        featureTitleColor: "text-xl text-[#333333]",
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
          backgroundImage: pathname === "/b" ? "none" : pathname === "/c" ? "none" : 'url(/images/partners_bg.svg)',
          backgroundColor: pathname === "/b" ? "black" : "transparent"
        }}
      >
      <Section className={sectionBg}>
        <Container>
          {pathname === "/c" ? (
            // Route C layout: Person image on left, cards on right
            <div>
              {/* Text content */}
              <div className="flex flex-col gap-6 items-center mb-12">
                <h2 className={cn("md:w-3/4 md:text-center text-4xl lg:text-5xl font-light", titleColor)}>
                  A proactive IT partner, not just another support ticket system.
                </h2>
                
                <p className={cn("md:w-3/5 text-gray-400 md:text-center text-base leading-relaxed")}>
                  We designed our tiered packages to meet the real-world needs of modern teams—from lean operations to multi-site organizations that need rock-solid security and accountability.
                </p>

                <p className={cn("md:text-center text-base leading-relaxed", bodyColor)}>Our team plugs in fast, operates clearly, and scales as you grow.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-stretch"> 
                {/* Left side - Person image */}
                <div className="flex-1">
                  <img 
                    src="/images/partners_image_mobile.svg" 
                    alt="IT Professional" 
                    className="w-full object-cover"
                  />
                </div>

                {/* Three cards in vertical layout */}
                <div className="flex-1 grid grid-rows-3 gap-6">
                  {/* Proactive Support Card */}
                  <div className={cn(
                    "py-20 md:p-6 rounded-2xl flex flex-col justify-center items-center gap-4 text-center",
                    pathname === "/c" ? "bg-gray-100" : ""
                  )}>
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/proactive_support_red.svg" 
                        alt="Proactive Support" 
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className={cn("text-lg font-semibold mb-2", featureTitleColor)}>Proactive Support</h3>
                      <p className={cn("text-sm", bodyColor)}>We fix issues before they become problems</p>
                    </div>
                  </div>

                  {/* Dedicated Team Card */}
                  <div className={cn(
                    "p-6 rounded-2xl flex flex-col justify-center items-center gap-4 text-center",
                    pathname === "/c" ? "bg-gray-100" : ""
                  )}>
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/dedicated_team_red.svg" 
                        alt="Dedicated Team" 
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className={cn("text-lg font-semibold mb-2", featureTitleColor)}>Dedicated Team</h3>
                      <p className={cn("text-sm", bodyColor)}>Your own IT department, without the overhead</p>
                    </div>
                  </div>

                  {/* Fast Response Card */}
                  <div className={cn(
                    "p-6 rounded-2xl flex flex-col justify-center items-center gap-4 text-center",
                    pathname === "/c" ? "bg-gray-100" : ""
                  )}>
                    <div className="flex-shrink-0">
                      <img 
                        src="/images/fast_response_red.svg" 
                        alt="Fast Response" 
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className={cn("text-lg font-semibold mb-2", featureTitleColor)}>Fast Response</h3>
                      <p className={cn("text-sm", bodyColor)}>Quick resolution times that keep you productive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Original layout for other routes
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
              <div className="flex flex-col gap-16 md:gap-32 md:mb-32">
                <img src="/images/partners_img.png" alt="Partner" className="md:w-3/4 mx-auto md:object-contain object-center rounded-2xl" />
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
          )}
        </Container>
      </Section>
      </div>
    );
  }
