import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import { getPricing, type PricingPlan } from "@/lib/design";
import { Check } from "lucide-react";

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className={cn(
      "relative rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-lg",
      plan.isFeatured 
        ? "border-primary shadow-xl scale-105 bg-primary/5" 
        : "border-border hover:border-primary/50"
    )}>
      {plan.isFeatured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="default" className="bg-primary text-primary-foreground px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-4xl font-bold text-foreground">${plan.price}</span>
          <span className="text-foreground/60 ml-1">/{plan.per}</span>
        </div>
      </div>
      
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5">
              <Check className="h-3 w-3" />
            </div>
            <span className="text-foreground/80 text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        href={plan.cta.href}
        variant={plan.isFeatured ? "default" : "outline"}
        className="w-full"
        size="lg"
      >
        {plan.cta.label}
      </Button>
    </div>
  );
}

export function Pricing() {
  const pricingData = getPricing();

  return (
    <Section id="pricing" className="bg-background">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What's Included
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Simple, transparent pricing that scales with your business. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingData.plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-foreground/60">{pricingData.notes}</p>
        </div>
      </Container>
    </Section>
  );
}
