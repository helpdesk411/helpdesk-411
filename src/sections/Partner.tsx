import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { getPartner } from "@/lib/design";
import { Clock, FileCheck, ShieldCheck } from "lucide-react";
import type { LucideProps } from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Clock,
  FileCheck,
  ShieldCheck,
};

export function Partner() {
  const partnerData = getPartner();

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {partnerData.title}
            </h2>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {partnerData.copy}
            </p>
            
            {/* Bullets */}
            <div className="space-y-4">
              {partnerData.bullets.map((bullet, index) => {
                const IconComponent = iconMap[bullet.icon] || Clock;
                
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className="text-foreground font-medium">
                      {bullet.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                {/* Placeholder for agent image */}
                <div className="w-full h-full rounded-2xl bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <p className="text-sm text-foreground/60">Professional Support Agent</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
