import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { getAddOns, type AddOnCard } from "@/lib/design";

interface AddOnCardComponentProps {
  card: AddOnCard;
}

function AddOnCardComponent({ card }: AddOnCardComponentProps) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {card.badge && (
        <div className="absolute -top-2 -right-2">
          <Badge variant="accent" className="bg-accent text-accent-foreground">
            {card.badge}
          </Badge>
        </div>
      )}
      
      {/* Image placeholder */}
      <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <svg className="w-12 h-12 text-primary/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {card.title}
      </h3>
      
      <p className="text-foreground/70 text-sm leading-relaxed">
        {card.desc}
      </p>
    </div>
  );
}

export function AddOns() {
  const addOnsData = getAddOns();

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {addOnsData.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOnsData.cards.map((card, index) => (
            <AddOnCardComponent key={index} card={card} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
