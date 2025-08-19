import { useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { cn } from "@/lib/utils";
import { getFAQ } from "@/lib/design";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  pathname?: string;
}

function FAQItem({ question, answer, isOpen, onToggle, pathname = "/" }: FAQItemProps) {
  const isRouteC = pathname === "/c";
  
  return (
    <div className={cn(
      "rounded-2xl overflow-hidden",
      isRouteC ? "bg-[#f0f0f0]" : "bg-[#f5f5f5]"
    )}>
      <button
        className={cn(
          "w-full px-6 py-4 text-left flex items-center justify-between transition-colors",
          isRouteC 
            ? "hover:bg-[#f0f0f0] text-[#333333]" 
            : "hover:bg-muted/50 text-foreground"
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={cn(
          "font-light",
          isRouteC ? "text-[#333333]" : "text-foreground"
        )}>{question}</span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isRouteC 
              ? "text-[#333333]/60" 
              : "text-foreground/60",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-4">
          <p className={cn(
            "leading-relaxed font-light",
            isRouteC ? "text-[#666666]" : "text-foreground/80"
          )}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const faqData = getFAQ();
  const location = useLocation();
  const pathname = location.pathname;
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
    <Section id="faq" className={cn(
      "bg-background",
      pathname === "/c" ? "bg-[#f5f5f5]" : ""
    )}>
      <Container size="md">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
            pathname === "/c" ? "text-[#333333]" : "text-foreground"
          )}>
            Frequently Asked Questions
          </h2>
          <p className={cn(
            "text-lg w-3/4 mx-auto",
            pathname === "/c" ? "text-[#666666]" : "text-[#8c8c8c]"
          )}>
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
              pathname={pathname}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
