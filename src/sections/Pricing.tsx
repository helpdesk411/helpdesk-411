import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { getPricing, type PricingPlan } from "@/lib/design";
import { Check } from "lucide-react";

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="relative rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-lg">
      {plan.isFeatured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="default" className="bg-[#ffd600] text-black px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-normal text-foreground">${plan.price}</span>
          <span className="text-foreground/60 ml-1">/{plan.per}</span>
        </div>
        {plan.highlight && (
          <h4 className="text-lg font-semibold text-foreground mb-2 leading-tight">
            {plan.highlight}
          </h4>
        )}
        {plan.subHighlight && (
          <p className="text-sm text-[#8C8C8C] mb-4 leading-relaxed md:w-3/5">
            {plan.subHighlight}
          </p>
        )}
      </div>
      
      <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-[#8C8C8C] text-sm leading-relaxed">{feature}</span>
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
    <div 
      className="relative md:min-h-screen bg-black bg-cover bg-left md:bg-center-bottom bg-no-repeat rounded-3xl overflow-hidden mt-4"
      style={{
        backgroundImage: 'url(/images/partners_bg.svg)'
      }}
    >
    <Section id="pricing" className="px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-white md:text-4xl lg:text-5xl mb-6">
            What's Included
          </h2>
          <p className="text-lg font-light text-white max-w-2xl mx-auto">
            Choose the right level of protection for your business. Every plan is designed to scale with your growth.
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
    </Section>
    </div>
  );
}
