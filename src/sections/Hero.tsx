import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { getHero } from "@/lib/design";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { ScrollAnimation, FadeIn, ScaleIn } from "@/components/ScrollAnimation";

export function Hero() {
  const heroData = getHero();
  const location = useLocation();

  // Hero Version A (Path: "/")
  if (location.pathname === "/") {
    return (
      <div 
        className="relative md:min-h-screen bg-cover bg-left md:bg-center bg-no-repeat rounded-3xl overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero_bg_3.svg)'
        }}
      >
      <Section id="home" className="pt-44 md:pt-60 pb-8 md:pb-20 px-4 md:min-h-screen flex">
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
              <p className="text-base md:text-xl text-[#737373] mb-6 md:mb-20 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-light px-2">
                Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused.
              </p>
            </ScrollAnimation>

            <FadeIn delay={0.6}>
              <div className="flex justify-center w-full md:hidden mb-12">
                <img src="/images/hero_mobile_a.svg" alt="Hero Image" className="w-full h-auto" />
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="justify-center w-full hidden md:flex mb-12">
                <img src="/images/hero_desktop_a.svg" alt="Hero Image" className="w-full h-auto" />
              </div>
            </FadeIn>
            
            {/* CTA Buttons */}
            <ScaleIn delay={0.8}>
              <div className="w-full max-w-xs md:max-w-md mx-auto px-4 md:px-8 py-3 md:py-4 rounded-[36px] border border-white/40 backdrop-blur-[34px] bg-gradient-overlay">
              <div className="flex flex-row gap-3 md:gap-4 justify-center items-center mb-4 md:mb-8">
                <img src="/images/user_1.svg" alt="User 1" className="w-8 md:w-12 h-auto" />
                <p className="text-white text-xs md:text-base font-medium">HelpDesk 411</p>
              </div>
              <div className="flex flex-row gap-2 md:gap-4 justify-center">
                <Button 
                  size="sm" 
                  variant="secondary"
                  href={heroData.secondaryAction.href}
                  className="text-sm md:text-base text-white bg-[#878787] rounded-full px-6 h-10"
                >
                  See Plans
                </Button>
              </div>
            </div>
            </ScaleIn>
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
          <div className="w-full max-w-4xl mx-auto md:mb-0 mb-20">
            {/* Headline */}
            <ScrollAnimation delay={0.2}>
              <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-7xl font-normal tracking-tight text-white mb-4 md:mb-12 leading-tight">
                Enterprise‑grade IT for small businesses
              </h1>
            </ScrollAnimation>
            
            {/* Subheading */}
            <ScrollAnimation delay={0.4}>
              <p className="text-sm md:text-xl text-white mb-6 md:mb-20 max-w-xl md:max-w-xl leading-6 md:leading-relaxed font-light ">
               Scalable, always-on IT support for growing businesses. From essential coverage to full compliance and 24/7 protection, we keep your systems running, your data safe, and your team focused. <span className="text-white font-medium">Clear communication, fast response times, and a support setup you can trust.</span>
              </p>
            </ScrollAnimation>

            <ScaleIn delay={0.6}>
              <div className="flex flex-row gap-2 md:gap-4 max-w-sm justify-start">
                <Button 
                  size="sm" 
                  variant="secondary"
                  href={heroData.secondaryAction.href}
                  className="text-sm text-white border border-white/40 md:text-base bg-transparent rounded-full px-6 h-12 md:h-12"
                >
                  See Plans
                </Button>

              </div>
            </ScaleIn>
          </div>
          <div className="flex justify-center w-full md:w-5xl">
              <img src="/images/hero_c.svg" alt="Hero Image" className="h-full md:h-[500px] object-cover md:object-contain object-top" />
          </div>
        </Container>

      </Section>
    </div>
  );
}
