import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { getFooter } from "@/lib/design";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Footer() {
  const footerData = getFooter();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <footer className={cn(
      "rounded-xl text-primary-foreground",
      pathname === "/b" 
        ? "rounded-b-2xl mx-4 mb-4" 
        : "bg-red-500"
    )} style={pathname === "/b" ? {
      borderRadius: "0 0 20px 20px",
      background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 36.98%, rgba(0, 0, 0, 0.52) 100%), #EA2427"
    } : undefined}>
      <Section padding="lg">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <img src="images/footer_logo.svg" alt="logo" className="w-20 h-full object-cover" />
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Proactive IT support that scales with your business. From essential coverage to enterprise-grade protection.
              </p>
            </div>
            
            {/* Footer Links */}
            {footerData.columns.map((column, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4 text-primary-foreground">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom */}
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="w-3/4 md:w-full text-center text-primary-foreground/60 text-sm">
              © 2024 help desk 411. All rights reserved. Professional IT support services.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
