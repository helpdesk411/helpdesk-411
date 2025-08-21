import { Hero } from "@/sections/Hero";
import { PainPoints } from "@/sections/PainPoints";
import { Partner } from "@/sections/Partner";
import { Pricing } from "@/sections/Pricing";
import { AddOns } from "@/sections/AddOns";
import { FAQ } from "@/sections/FAQ";
import { CTAFinal } from "@/sections/CTAFinal";
import { Footer } from "@/sections/Footer";
import { PageSwitcher } from "@/components/PageSwitcher";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";

export default function PageC() {
  return (
    <>
      <SEO />
      <StructuredData type="service" />
      <div className="min-h-screen bg-background">
        <PageSwitcher />
        <main>
          <Hero />
          <PainPoints />
          <Partner />
          <Pricing />
          <AddOns />
          <FAQ />
          <CTAFinal />
        </main>
        <Footer />
      </div>
    </>
  );
}
