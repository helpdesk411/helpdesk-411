import { useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";
import { getFAQ } from "@/lib/design";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="bg-[#f5f5f5] rounded-2xl overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-foreground font-light">{question}</span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 text-foreground/60 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-4">
          <p className="text-foreground/80 leading-relaxed font-light">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const faqData = getFAQ();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <Section id="faq" className="bg-background">
      <Container size="md">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#8c8c8c] w-3/4 mx-auto">
           Get answers to the most common questions about our IT support services
          </p>
        </div>
        
        <div className="space-y-4">
          {faqData.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.q}
              answer={item.a}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
