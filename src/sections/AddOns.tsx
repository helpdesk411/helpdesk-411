import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { getAddOns, type AddOnCard } from "@/lib/design";

interface AddOnCardComponentProps {
  card: AddOnCard;
}

function AddOnCardComponent({ card }: AddOnCardComponentProps) {
  return (
    <div className="group relative rounded-2xl border border-border bg-[#E8E8E8] p-5 md:p-10 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <Badge variant="accent" className="bg-white rounded-full font-light text-accent-foreground mb-4 md:mb-8 p-2 px-4 shadow-none">
        {card.badge}
      </Badge>

      <h3 className="md:w-2/4 text-xl md:text-2xl text-[#4d4d4d] mb-4 md:mb-10 group-hover:text-primary transition-colors">
        {card.title}
      </h3>

      
      {/* Image placeholder */}
      <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export function AddOns() {
  const addOnsData = getAddOns();

  return (
    <Section className="bg-[#F5F5F5] mt-4 rounded-2xl px-8 py-12 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl  text-[#333] mb-6">
            Add What You Need. <span className="text-[#4d4d4d]">Only When You Need It.</span> 
          </h2>
          <p className="text-lg text-[#8c8c8c] max-w-2xl mx-auto">Available across all plans to enhance your IT support experience</p>
        </div>
        
          {/* First row - 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {addOnsData.cards.slice(0, 3).map((card, index) => (
              <AddOnCardComponent key={index} card={card} />
            ))}
          </div>
          
          {/* Second row - 2 cards taking 50% each */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 md:mb-20">
            {addOnsData.cards.slice(3, 5).map((card, index) => (
              <AddOnCardComponent key={index + 3} card={card} />
            ))}
          </div>

          <p className="text-sm text-[#8c8c8c] text-center">All add-ons are available with custom pricing based on your specific needs and usage requirements.</p>
    </Section>
  );
}
