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
      <Section id="home" className="min-h-screen pt-44 md:pt-32 pb-0 md:pb-0 px-4 flex">
        <Container>
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
                variant="secondary"
                href={heroData.secondaryAction.href}
                className="text-sm md:text-base text-white bg-black rounded-full px-12 h-10"
              >
                See Plans
              </Button>
            </ScrollAnimation>

            <div className="hidden md:block mt-12 md:mt-8">
              <div className="flex items-start gap-2">
                <img className="mt-14 w-1/2" src="./images/chat_bubble_d_left.svg" alt="" />
                <img className="max-w-2/5" src="./images/chat_bubble_d_right.svg" alt="" />
              </div>
            </div>

            <div className="block md:hidden">
              <div className="flex flex-col items-start gap-2">
                <img className="mt-14" src="./images/chat_bubble_m_left.svg" alt="" />
                <img src="./images/chat_bubble_m_right.svg" alt="" />
              </div>
            </div>

            <div className="flex justify-center w-full mt-8">
              <img src="./images/new_hero_image_1.svg" alt="Hero Image" className="w-full max-w-md object-contain mx-auto" />
            </div>
          </div>
        </Container>
      </Section>
      </div>
    );
}
