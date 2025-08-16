import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import { getHero } from "@/lib/design";

export function Hero() {
  const heroData = getHero();

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero_bg.svg)'
      }}
    >
      <Section className="pt-60 pb-20 min-h-screen flex ">
        <Container>
          <div className=" text-center max-w-4xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-12">
              Enterprise‑grade IT <span className="text-[#878787]">for small businesses</span> 
            </h1>
            
            {/* Subheading */}
            <p className="text-sm md:text-xl text-[#737373] mb-20 max-w-2xl mx-auto leading-relaxed font-light">
              Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused. Clear communication, fast response times, and a support setup you can trust.
            </p>
            
            {/* Chat Bubbles - SVG Images */}
            <div className="mb-16 max-w-3xl mx-auto">
              <div className="flex flex-col space-y-8">
                {/* First Bubble - Left aligned */}
                <div className="flex flex-col justify-start relative">
                  <p className="text-left absolute top-5 left-16 text-base text-gray-500 w-64">
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
                  <p className="text-left absolute top-6 right-10 text-base text-gray-500 w-64">
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
            <div className="bg-[#d1d1d1] w-2/4  mx-auto px-8 py-4 rounded-[46px]">
              <div className="flex flex-row gap-4 justify-center items-center mb-8">
                <img src="/images/user_1.svg" alt="User 1" className="w-12 h-auto" />
                <p className="text-white">HelpDesk 411</p>
              </div>
              <div className="flex flex-row gap-4 justify-between">
              <Button 
                size="lg" 
                href={heroData.primaryAction.href}
                className="text-base rounded-2xl flex-1"
              >
                Get a Quote
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                href={heroData.secondaryAction.href}
                className="text-base bg-[#878787] rounded-2xl flex-1"
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
