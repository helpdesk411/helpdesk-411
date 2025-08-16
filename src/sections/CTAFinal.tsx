import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { getCTAFinal } from "@/lib/design";

export function CTAFinal() {
  const ctaData = getCTAFinal();

  return (
    <Section className="bg-gradient-to-br from-primary/5 to-accent/5">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {ctaData.headline}
            </h2>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {ctaData.subcopy}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                href={ctaData.primaryAction.href}
                className="text-base"
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
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto">
              {/* Headphones illustration placeholder */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <div className="relative">
                  {/* Headphones SVG */}
                  <svg 
                    className="w-48 h-48 text-accent" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.14 2 5 5.14 5 9v4c0 1.1.9 2 2 2h1v-2H7V9c0-2.76 2.24-5 5-5s5 2.24 5 5v4h-1v2h1c1.1 0 2-.9 2-2V9c0-3.86-3.14-7-7-7zm-4 13v4c0 1.1.9 2 2 2h1v-6H8zm8 0v6h1c1.1 0 2-.9 2-2v-4h-3z"/>
                  </svg>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/30 rounded-full"></div>
                  <div className="absolute top-1/2 -left-8 w-6 h-6 bg-accent/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
