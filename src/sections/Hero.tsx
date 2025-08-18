import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { getHero } from "@/lib/design";
import { useLocation } from "react-router-dom";

export function Hero() {
  const heroData = getHero();
  const location = useLocation();

  // Hero Version A (Path: "/")
  if (location.pathname === "/") {
    return (
      <div 
        className="relative md:min-h-screen bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero_bg.svg)'
        }}
      >
      <Section className="pt-44 md:pt-60 pb-8 md:pb-20 px-4 md:min-h-screen flex">
        <Container>
          <div className="text-center w-full max-w-4xl mx-auto">
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4 md:mb-12 px-2 leading-tight">
              Enterprise‑grade IT <span className="text-[#878787]">for small businesses</span> 
            </h1>
            
            {/* Subheading */}
            <p className="text-sm md:text-xl text-[#737373] mb-6 md:mb-20 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light px-2">
              Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused.
            </p>
            
            {/* Chat Bubbles - SVG Images */}
            <div className="hidden md:block mb-8 md:mb-16 max-w-3xl mx-auto px-2">
              <div className="flex flex-col space-y-6 md:space-y-8">
                {/* First Bubble - Left aligned */}
                <div className="flex flex-col justify-start relative">
                  <p className="text-left absolute top-4 md:top-5 left-6 md:left-16 text-sm md:text-base text-gray-500 w-64">
                    Hi there! Welcome to Helpdesk 411. How can we help you keep your business running smoothly today?
                  </p>
                  <img 
                    src="/images/first_bubble.svg" 
                    alt="Hi there! Welcome to Helpdesk 411" 
                    className="max-w-sm w-full h-auto"
                  />
                  <img src="/images/user_1.svg" alt="User 1" className="max-w-xs w-12 h-auto absolute top-10 -left-16" />
                </div>
                
                {/* Second Bubble - Right aligned */}
                <div className="flex flex-col items-end relative">
                  <p className="text-left absolute top-6 right-0 md:right-10 text-sm  md:text-base text-gray-500 w-64">
                    I need help with a technical issue.
                  </p>
                  <img 
                    src="/images/second_bubble.svg" 
                    alt="I need help with a technical issue" 
                    className="max-w-xs w-full h-auto"
                  />

                  <img src="/images/user_2.png" alt="User 2" className="max-w-xs w-12 h-auto absolute top-4 -right-12" />
                </div>
                
                {/* Third Bubble - Left aligned */}
                <div className="flex flex-col justify-start relative">
                  <p className="text-left absolute top-6 left-8 text-base text-gray-500 w-64">
                    Here are our flexible support options designed for businesses of any size.
                  </p>
                  <img 
                    src="/images/third_bubble.svg" 
                    alt="Here are our flexible support options" 
                    className="max-w-xs w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="bg-[#d1d1d1] w-full max-w-xs md:max-w-md mx-auto px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-[46px]">
              <div className="flex flex-row gap-3 md:gap-4 justify-center items-center mb-4 md:mb-8">
                <img src="/images/user_1.svg" alt="User 1" className="w-8 md:w-12 h-auto" />
                <p className="text-white text-xs md:text-base font-medium">HelpDesk 411</p>
              </div>
              <div className="flex flex-row gap-2 md:gap-4">
                <Button 
                  size="sm" 
                  href={heroData.primaryAction.href}
                  className="text-sm md:text-base rounded-2xl flex-1 h-8 md:h-10"
                >
                  Get a Quote
                </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    href={heroData.secondaryAction.href}
                    className="text-sm md:text-base bg-[#878787] rounded-2xl flex-1 h-8 md:h-10"
                  >
                  See Plans
                </Button>
              </div>
            </div>
            
            
            {/* Right side chat bubble */}
            {heroData.embeds.chatBubbles && (
              <div className="absolute top-1/3 right-8 transform -translate-y-1/2 hidden lg:block">
                <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg max-w-xs">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">Support Team</span>
                  </div>
                  <p className="text-xs text-foreground/70">Ready to help 24/7</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
      </div>
    );
  }

  // Hero Version B (Path: "/b")
  if (location.pathname === "/b") {
    return (
      <div 
        className="relative md:min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #911618 8.58%, rgba(234, 36, 39, 0.71) 118.62%, rgba(234, 36, 39, 0.00) 151.19%), linear-gradient(0deg, #EA2427 0%, #EA2427 100%), #F9BEBF'
        }}
      >
      <Section className="pt-44 md:pt-60 px-4 pb-0 md:min-h-screen flex flex-col items-stretch">
        <Container>
          <div className="text-center w-full max-w-4xl mx-auto">
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-4 md:mb-12 px-2 leading-tight">
              Enterprise‑grade IT for small businesses
            </h1>
            
            {/* Subheading */}
            <p className="text-sm md:text-xl text-white mb-6 md:mb-20 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light px-2">
              Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused.
            </p>

            <div className="flex flex-row gap-2 md:gap-4 max-w-sm mx-auto">
                <Button 
                  size="sm" 
                  href={heroData.primaryAction.href}
                  className="text-sm md:text-base rounded-2xl flex-1 h-8 md:h-12"
                >
                  Get a Quote
                </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    href={heroData.secondaryAction.href}
                    className="text-sm md:text-base bg-white rounded-2xl flex-1 h-8 md:h-12"
                  >
                  See Plans
                </Button>
              </div>
          </div>
        </Container>

        <div className="flex justify-center w-full md:w-5xl mx-auto">
            <img src="/images/hero_b.png" alt="Hero Image" className="w-full h-[190px] md:h-[500px] object-cover object-top" />
          </div>
      </Section>
      </div>
    );
  }

  // Hero Version C (Path: "/c") - Default fallback
  return (
    <div 
      className="relative md:min-h-screen bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero_bg.svg)'
      }}
    >
      <Section className="pt-44 md:pt-60 pb-8 md:pb-20 px-4 md:min-h-screen flex">
        <Container>
          <div className="text-center w-full max-w-4xl mx-auto">
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4 md:mb-12 px-2 leading-tight">
              Enterprise‑grade IT <span className="text-[#878787]">for small businesses</span> 
            </h1>
            
            {/* Subheading */}
            <p className="text-sm md:text-xl text-[#737373] mb-6 md:mb-20 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light px-2">
              Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused.
            </p>
            
            {/* Chat Bubbles - SVG Images */}
            <div className="hidden md:block mb-8 md:mb-16 max-w-3xl mx-auto px-2">
              <div className="flex flex-col space-y-6 md:space-y-8">
                {/* First Bubble - Left aligned */}
                <div className="flex flex-col justify-start relative">
                  <p className="text-left absolute top-4 md:top-5 left-6 md:left-16 text-sm md:text-base text-gray-500 w-64">
                    Hi there! Welcome to Helpdesk 411. How can we help you keep your business running smoothly today?
                  </p>
                  <img 
                    src="/images/first_bubble.svg" 
                    alt="Hi there! Welcome to Helpdesk 411" 
                    className="max-w-sm w-full h-auto"
                  />
                  <img src="/images/user_1.svg" alt="User 1" className="max-w-xs w-12 h-auto absolute top-10 -left-16" />
                </div>
                
                {/* Second Bubble - Right aligned */}
                <div className="flex flex-col items-end relative">
                  <p className="text-left absolute top-6 right-0 md:right-10 text-sm  md:text-base text-gray-500 w-64">
                    I need help with a technical issue.
                  </p>
                  <img 
                    src="/images/second_bubble.svg" 
                    alt="I need help with a technical issue" 
                    className="max-w-xs w-full h-auto"
                  />

                  <img src="/images/user_2.png" alt="User 2" className="max-w-xs w-12 h-auto absolute top-4 -right-12" />
                </div>
                
                {/* Third Bubble - Left aligned */}
                <div className="flex flex-col justify-start relative">
                  <p className="text-left absolute top-6 left-8 text-base text-gray-500 w-64">
                    Here are our flexible support options designed for businesses of any size.
                  </p>
                  <img 
                    src="/images/third_bubble.svg" 
                    alt="Here are our flexible support options" 
                    className="max-w-xs w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="bg-[#d1d1d1] w-full max-w-xs md:max-w-md mx-auto px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-[46px]">
              <div className="flex flex-row gap-3 md:gap-4 justify-center items-center mb-4 md:mb-8">
                <img src="/images/user_1.svg" alt="User 1" className="w-8 md:w-12 h-auto" />
                <p className="text-white text-xs md:text-base font-medium">HelpDesk 411</p>
              </div>
              <div className="flex flex-row gap-2 md:gap-4">
                <Button 
                  size="sm" 
                  href={heroData.primaryAction.href}
                  className="text-sm md:text-base rounded-2xl flex-1 h-8 md:h-10"
                >
                  Get a Quote
                </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    href={heroData.secondaryAction.href}
                    className="text-sm md:text-base bg-[#878787] rounded-2xl flex-1 h-8 md:h-10"
                  >
                  See Plans
                </Button>
              </div>
            </div>
            
            
            {/* Right side chat bubble */}
            {heroData.embeds.chatBubbles && (
              <div className="absolute top-1/3 right-8 transform -translate-y-1/2 hidden lg:block">
                <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg max-w-xs">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">Support Team</span>
                  </div>
                  <p className="text-xs text-foreground/70">Ready to help 24/7</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
