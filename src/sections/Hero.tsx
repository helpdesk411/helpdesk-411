import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { getHero } from "@/lib/design";
import { ScrollAnimation} from "@/components/ScrollAnimation";

export function Hero() {
  const heroData = getHero();

    return (
      <div 
        className="min-h-screen relative bg-cover bg-left md:bg-center bg-no-repeat rounded-4xl overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero_bg_3.svg)'
        }}
      >
      <Section id="home" className="md:min-h-screen pt-36 md:pt-48 pb-0 md:pb-0 px-4 flex">
        <Container className="px-0">
          <div className="text-center w-full max-w-4xl mx-auto">
            {/* Headline */}
            <ScrollAnimation delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4 md:mb-8 px-2 leading-tight">
                Enterprise‑grade IT <span className="font-serif italic">for small businesses</span> 
              </h1>
            </ScrollAnimation>
            
            {/* Subheading */}
            <ScrollAnimation delay={0.4}>
              <p className="text-base md:text-xl text-[#737373] mb-6 md:mb-6 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light px-2">
                Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused.
              </p>
              <Button 
                size="sm" 
                variant="default"
                href={heroData.secondaryAction.href}
                className="text-sm md:text-base text-white bg-black rounded-full px-8 h-10 md:px-16 md:h-12 mb-4 md:0 hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
              >
                See Plans
              </Button>
            </ScrollAnimation>

            <div className="md:flex items-start justify-center max-w-2xl mx-auto mt-8 h-[400px] relative">
              
              <img src="./images/hero_cover_2.png" alt="Hero Image" className="hidden md:block object-cover mx-auto" />

              <img src="./images/hero_cover_mobile_2.png" alt="Hero Image" className="block md:hidden w-full object-cover mx-auto" />
            </div>
          </div>
        </Container>
      </Section>
      </div>
    );
}
