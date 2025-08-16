import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";
import { getPainPoints } from "@/lib/design";
import { Shield, Activity, Server } from "lucide-react";
import type { LucideProps } from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Shield,
  Activity,
  Server,
};

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  const IconComponent = iconMap[icon] || Shield;
  
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        <IconComponent className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {title}
      </h3>
      <p className="text-foreground/70 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export function PainPoints() {
  const painPointsData = getPainPoints();

  return (
    <Section id="features" className="bg-background">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {painPointsData.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {painPointsData.kickers.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
