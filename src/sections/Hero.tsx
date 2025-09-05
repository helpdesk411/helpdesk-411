import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { getHero } from "@/lib/design";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { ScrollAnimation, ScaleIn } from "@/components/ScrollAnimation";

export function Hero() {
  const heroData = getHero();
  const location = useLocation();

  // Hero Version A (Path: "/")
  if (location.pathname === "/") {
    return (
      <div 
        className="relative bg-cover bg-left md:bg-center bg-no-repeat rounded-3xl overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero_bg_3.svg)'
        }}
      >
      <Section id="home" className="pt-44 md:pt-48 pb-0 md:pb-0 px-4 flex">
        <Container>
          <div className="text-center w-full max-w-4xl mx-auto">
            {/* Headline */}
            <ScrollAnimation delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4 md:mb-12 px-2 leading-tight">
                Enterprise‑grade IT <span className="text-[#878787]">for small businesses</span> 
              </h1>
            </ScrollAnimation>
            
            {/* Subheading */}
            <ScrollAnimation delay={0.4}>
              <p className="text-base md:text-xl text-[#737373] mb-6 md:mb-12 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light px-2">
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

            <div className="hidden md:block mt-12">
              <div className="flex items-start gap-2">
                <img className="mt-14" src="./images/chat_bubble_d_left.svg" alt="" />
                <img src="./images/chat_bubble_d_right.svg" alt="" />
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

  // Hero Version B (Path: "/b")
  if (location.pathname === "/b") {
    return (
      <div 
        className="relative md:min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #911618 8.58%, rgba(234, 36, 39, 0.71) 118.62%, rgba(234, 36, 39, 0.00) 151.19%), linear-gradient(0deg, #EA2427 0%, #EA2427 100%), #F9BEBF'
        }}
      >
      <Section id="home" className="pt-44 md:pt-60 px-4 pb-0 md:min-h-screen flex flex-col items-stretch">
        <Container>
          <div className="text-center w-full max-w-4xl mx-auto">
            {/* Headline */}
            <ScrollAnimation delay={0.2}>
              <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-4 md:mb-12 px-2 leading-tight">
                Enterprise‑grade IT for small businesses
              </h1>
            </ScrollAnimation>
            
            {/* Subheading */}
            <ScrollAnimation delay={0.4}>
              <p className="text-sm md:text-xl text-white mb-6 md:mb-20 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light px-2">
                Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused.
              </p>
            </ScrollAnimation>

            <ScaleIn delay={0.6}>
              <div className="flex flex-row gap-2 md:gap-4 max-w-sm mx-auto justify-center">
                <Button 
                  size="sm" 
                  variant="secondary"
                  href={heroData.secondaryAction.href}
                  className="text-sm md:text-base bg-white rounded-2xl px-6 h-8 md:h-12"
                >
                  See Plans
                </Button>

              </div>
            </ScaleIn>
          </div>
        </Container>

        <div className="flex justify-center w-full md:w-5xl mx-auto">
            <img src="/images/hero_b.png" alt="Hero Image" className="w-full h-[190px] md:h-[500px] object-cover object-top" />
          </div>
      </Section>
      </div>
    );
  }

  // Hero Version C (Path: "/c") - Default fallback
  return (
    <div 
      className="relative md:min-h-fit md:pb-20 pb-16 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
          background: 'linear-gradient(181deg, #AB1A1C 1.04%, rgba(234, 36, 39, 0.71) 41.47%, rgba(234, 36, 39, 0.00) 70.75%), #EA2427'
        }}
    >
      <Section id="home" className="pt-0 md:pt-0 px-4 pb-0 md:pb-40 flex flex-col items-stretch">
        <Navbar />
        <Container className="max-w-7xl flex flex-col md:flex-row justify-between items-center px-0 pt-20 md:pt-40">
          <div className="w-full md:w-2/5 mx-auto md:mb-0 mb-20">
            {/* Headline */}
            <ScrollAnimation delay={0.2}>
              <h1 className="text-3xl sm:text-2xl md:text-2xl lg:text-5xl font-normal tracking-tight text-white mb-4 md:mb-8 leading-tight">
                Enterprise‑grade IT for small businesses
              </h1>
            </ScrollAnimation>
            
            {/* Subheading */}
            <ScrollAnimation delay={0.4}>
              <p className="text-sm md:text-base text-white mb-6 md:mb-12 max-w-xl leading-6 font-light ">
               Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused. <span className="text-white font-medium">Clear communication, fast response times, and a support setup you can trust.</span>
              </p>
            </ScrollAnimation>

            <ScaleIn delay={0.6}>
              <div className="flex flex-row gap-2 md:gap-4 max-w-sm justify-start">
                <Button 
                  size="sm" 
                  variant="secondary"
                  href={heroData.secondaryAction.href}
                  className="text-sm text-black border border-white/40 md:text-base bg-white rounded-full px-8 h-12 md:h-12"
                >
                  See Plans
                </Button>

              </div>
            </ScaleIn>
          </div>
          <div className="flex justify-center w-full md:w-3/5">
              <img src="/images/hero_c.svg" alt="Hero Image" className="h-full md:h-[600px] object-cover md:object-contain object-top" />
          </div>
        </Container>

      </Section>
    </div>
  );
}
