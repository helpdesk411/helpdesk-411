import { Section } from "@/components/Section";
import { QuoteButton } from "@/components/QuoteButton";
import { Badge } from "@/components/Badge";
import { getPricing, type PricingPlan } from "@/lib/design";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { ScrollAnimation, StaggerAnimation, ScaleIn } from "@/components/ScrollAnimation";

interface PricingCardProps {
  plan: PricingPlan;
  pathname?: string;
}

function PricingCard({ plan, pathname = "/" }: PricingCardProps) {
  const isRouteB = pathname === "/b";
  const isRouteC = pathname === "/c";
  
  return (
    <div className={cn(
      "relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg",
      isRouteB ? "bg-white border-gray-200" : 
      isRouteC ? "bg-white border-gray-200 shadow-lg" :
      "bg-card"
    )}>
      {plan.isFeatured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge variant="default" className={cn(
            "px-4 py-1",
            isRouteC ? "bg-red-500 text-white" : "bg-[#ffd600] text-black"
          )}>
            Most Popular
          </Badge>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className={cn(
          "text-2xl font-bold mb-4", 
          isRouteB ? "text-black" : 
          isRouteC ? "text-[#333333]" :
          "text-foreground"
        )}>
          {plan.name}
        </h3>
        <div className="flex items-baseline mb-4">
          <span className={cn(
            "text-4xl font-normal", 
            isRouteB ? "text-black" : 
            isRouteC ? "text-[#333333]" :
            "text-foreground"
          )}>
            ${plan.price}
          </span>
          <span className={cn(
            "ml-1", 
            isRouteB ? "text-black/60" : 
            isRouteC ? "text-[#333333]/60" :
            "text-foreground/60"
          )}>
            /{plan.per}
          </span>
        </div>
        {plan.highlight && (
          <h4 className={cn(
            "text-lg font-semibold mb-2 leading-tight", 
            isRouteB ? "text-black" : 
            isRouteC ? "text-[#333333]" :
            "text-foreground"
          )}>
            {plan.highlight}
          </h4>
        )}
        {plan.subHighlight && (
          <p className={cn(
            "text-sm mb-4 leading-relaxed md:w-3/5", 
            isRouteB ? "text-black" : 
            isRouteC ? "text-[#666666]" :
            "text-[#8C8C8C]"
          )}>
            {plan.subHighlight}
          </p>
        )}
      </div>
      
      <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className={cn(
                "w-5 h-5 flex-shrink-0 mt-0.5", 
                isRouteB ? "text-black" : 
                isRouteC ? "text-[#333333]" :
                "text-foreground"
              )} />
              <span className={cn(
                "text-sm leading-relaxed", 
                isRouteB ? "text-black" : 
                isRouteC ? "text-[#333333]" :
                "text-[#8C8C8C]"
              )}>
                {feature}
              </span>
            </li>
          ))}
      </ul>
      
      <QuoteButton 
        variant={plan.isFeatured ? "default" : "outline"}
        className={cn(
          "w-full",
          isRouteB && plan.isFeatured ? "bg-black text-white hover:bg-gray-800" : "",
          isRouteB && !plan.isFeatured ? "bg-gray-200 text-black hover:bg-gray-300" : "",
          isRouteC && plan.isFeatured ? "bg-black text-white hover:bg-gray-800" : "",
          isRouteC && !plan.isFeatured ? "bg-white text-[#333333] border-gray-300 hover:bg-gray-100" : ""
        )}
        size="lg"
        planName={plan.name}
        planPrice={plan.price}
        planDescription={plan.highlight || plan.subHighlight || ""}
        isPopular={plan.isFeatured}
      >
        {plan.cta.label}
      </QuoteButton>
    </div>
  );
}

export function Pricing() {
  const location = useLocation();
  const pathname = location.pathname;
  const pricingData = getPricing();

  // Define colors for each route
  const routeStyles: Record<string, { titleColor: string; bodyColor: string }> = {
    "/": {
      titleColor: "text-white",
      bodyColor: "text-white",
    },
    "/b": {
      titleColor: "text-white",
      bodyColor: "text-white",
    },
    "/c": {
      titleColor: "text-[#333333]",
      bodyColor: "text-[#666666]",
    },
  };

  // fallback to home if route not in map
  const { titleColor, bodyColor } = routeStyles[pathname] || routeStyles["/"];

  return (
    <div 
      className={cn(
        "relative md:min-h-screen bg-cover bg-left md:bg-center-bottom bg-no-repeat overflow-hidden",
        pathname === "/" ? "rounded-3xl mt-4" : "",
        pathname === "/c" ? "bg-[#f5f5f5]" : ""
      )}
      style={{
        backgroundImage: pathname === "/b" ? "none" : pathname === "/c" ? "none" : 'url(/images/pricing_bg_main.svg)',
        backgroundColor: pathname === "/b" ? "#242424" : pathname === "/c" ? "transparent" : "black"
      }}
    >
        {pathname === "/b" ? (
      <div 
        id="pricing"
        className="px-8 py-20"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.40) 70.13%), #EA2427'
        }}
      >
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className={cn("text-3xl font-light md:text-4xl lg:text-5xl mb-6", titleColor)}>
              What's Included
            </h2>
            <p className={cn("text-lg font-light max-w-2xl mx-auto", bodyColor)}>
              Choose the right level of protection for your business. Every plan is designed to scale with your growth.
            </p>
          </div>
        </ScrollAnimation>
        
        <StaggerAnimation staggerDelay={0.2}>
          <div className="grid md:grid-cols-3 gap-8 md:mb-12">
            {pricingData.plans.map((plan, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <PricingCard plan={plan} pathname={pathname} />
              </ScaleIn>
            ))}
          </div>
        </StaggerAnimation>
      </div>
    ) : (
      <Section id="pricing" className="px-4 py-10 md:px-8 md:py-20">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className={cn("text-3xl font-light md:text-4xl lg:text-5xl mb-6", titleColor)}>
              What's Included
            </h2>
            <p className={cn("text-lg font-light max-w-2xl mx-auto", bodyColor)}>
              Choose the right level of protection for your business. Every plan is designed to scale with your growth.
            </p>
          </div>
        </ScrollAnimation>
        
        <StaggerAnimation staggerDelay={0.2}>
          <div className="grid md:grid-cols-3 gap-8 md:mb-12">
            {pricingData.plans.map((plan, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <PricingCard plan={plan} pathname={pathname} />
              </ScaleIn>
            ))}
          </div>
        </StaggerAnimation>
      </Section>
    )}
    </div>
  );
}
