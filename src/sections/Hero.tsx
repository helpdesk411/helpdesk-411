import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { GradientBg } from "@/components/GradientBg";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import { getHero } from "@/lib/design";

export function Hero() {
  const heroData = getHero();

  return (
    <GradientBg variant="hero">
      <Section className="pt-32 pb-20 min-h-screen flex items-center">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              {heroData.headline}
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {heroData.subheading}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                href={heroData.primaryAction.href}
                className="text-base"
              >
                {heroData.primaryAction.label}
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                href={heroData.secondaryAction.href}
                className="text-base"
              >
                {heroData.secondaryAction.label}
              </Button>
            </div>
            
            {/* Trust Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {heroData.embeds.trustPills.map((pill, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="bg-background/50 backdrop-blur-sm border-border/50 text-sm py-2 px-4"
                >
                  {pill.text}
                </Badge>
              ))}
            </div>
            
            {/* Chat Bubbles Placeholder - Visual decoration */}
            {heroData.embeds.chatBubbles && (
              <div className="absolute top-1/2 left-8 transform -translate-y-1/2 hidden lg:block">
                <div className="space-y-2">
                  <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg max-w-xs">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-xs font-medium">System Status</span>
                    </div>
                    <p className="text-xs text-foreground/70">All systems operational</p>
                  </div>
                </div>
              </div>
            )}
            
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
    </GradientBg>
  );
}
