import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { getCTAFinal } from "@/lib/design";

export function CTAFinal() {
  const ctaData = getCTAFinal();

  return (
    <Section className="py-12 md:py-20">
      <Container>
          {/* Content */}
            <h2 className="md:w-3/4 mx-auto text-center text-3xl md:text-4xl lg:text-5xl font-bold text-foreground md:mb-6">
              If your IT setup is built on hope, <span className="text-[#bababa]">it’s only a matter of time.</span>
            </h2>
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-square max-w-2xl mx-auto">
              {/* Headphones illustration placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  {/* Headphones SVG */}
                  <img src="images/cta_image.svg" alt="CTA Final" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="md:w-2/3 text-center text-lg text-[#bababa] mb-8 leading-relaxed">
              Let's take this off your plate, lock down your infrastructure, and help your business move faster with fewer risks.
            </p>
            
            <div className="flex sm:flex-row gap-4">
              <Button 
                size="lg" 
                href={ctaData.primaryAction.href}
                className="text-base text-white bg-red-500"
              >
                {ctaData.primaryAction.label}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                href={ctaData.secondaryAction.href}
                className="text-base"
              >
                {ctaData.secondaryAction.label}
              </Button>
            </div>
          </div>
        
      </Container>
    </Section>
  );
}
