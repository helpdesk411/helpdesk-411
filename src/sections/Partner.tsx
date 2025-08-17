import { Container } from "@/components/Container";
import { Section } from "@/components/Section";


export function Partner() {

  return (
    <div 
      className="relative md:min-h-screen bg-cover bg-left md:bg-center bg-no-repeat rounded-3xl overflow-hidden mt-4"
      style={{
        backgroundImage: 'url(/images/partners_bg.svg)'
      }}
    >
    <Section className="bg-muted/30">
      <Container>
        <div className="flex flex-col md:items-center gap-20">
          
          {/* Content */}
          <div className="flex flex-col gap-6 md:items-center md:text-center md:w-3/4"> 
            <h2 className="w-[10ch] md:w-full text-5xl md:text-4xl lg:text-5xl font-light text-foreground">
              A proactive IT partner, not just another support ticket system.
            </h2>
            
            <p className="w-[28ch] md:w-3/4 text-base text-[#8C8C8C] leading-relaxed">
              We designed our tiered packages to meet the real-world needs of modern teams—from lean operations to multi-site organizations that need rock-solid security and accountability.
            </p>

            <p className="text-[#333] text-base md:text-sm">Our team plugs in fast, operates clearly, and scales as you grow.</p>  
          </div>
          
          {/* Image */}
          <div className="flex flex-col gap-32 md:mb-32">
            <img src="/images/partners_image.svg" alt="Partner" className="hidden md:block w-full h-96 md:h-full md:object-cover object-center rounded-2xl" />

            <img src="/images/partners_image_mobile.svg" alt="Partner" className="block md:hidden w-full object-cover rounded-2xl" />

            <div className="flex flex-col md:grid md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-3 items-center">
                <img className="mb-4" src="/images/proactive_support.svg" alt="Proactive Support" />
                <h3 className="text-xl">Proactive Support</h3>
                <p className="text-sm md:text-base text-[#8C8C8C]">We fix issues before they become problems</p>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <img className="mb-4" src="/images/dedicated_team.svg" alt="Dedicated Team" />
                <h3 className="text-xl">Dedicated Team</h3>
                <p className="text-sm md:text-base text-[#8C8C8C]">Your own IT department, without the overhead</p>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <img className="mb-4" src="/images/fast_response.svg" alt="Fast Response" />
                <h3 className="text-xl">Fast Response</h3>
                <p className="text-sm md:text-base text-[#8C8C8C]">Quick resolution times that keep you productive</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    </div>
  );
}
