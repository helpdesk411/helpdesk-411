import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { PainPoints } from "@/sections/PainPoints";
import { Partner } from "@/sections/Partner";
import { Pricing } from "@/sections/Pricing";
import { AddOns } from "@/sections/AddOns";
import { FAQ } from "@/sections/FAQ";
import { CTAFinal } from "@/sections/CTAFinal";
import { Footer } from "@/sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background p-2 md:px-6 md:py-6">
      <Navbar />
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
  );
}

export default App;