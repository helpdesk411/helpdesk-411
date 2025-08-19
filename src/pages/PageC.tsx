import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { PainPoints } from "@/sections/PainPoints";
import { Partner } from "@/sections/Partner";
import { Pricing } from "@/sections/Pricing";
import { AddOns } from "@/sections/AddOns";
import { FAQ } from "@/sections/FAQ";
import { CTAFinal } from "@/sections/CTAFinal";
import { Footer } from "@/sections/Footer";
import { PageSwitcher } from "@/components/PageSwitcher";

export default function PageC() {
  return (
    <div className="min-h-screen bg-white">
      <PageSwitcher />
      <Navbar />
      <main className="bg-white">
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
  );
}
