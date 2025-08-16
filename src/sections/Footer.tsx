import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { getFooter, getBrand } from "@/lib/design";
import { Github, Linkedin, Twitter } from "lucide-react";

const socialIconMap = {
  linkedin: Linkedin,
  x: Twitter,
  github: Github,
};

export function Footer() {
  const footerData = getFooter();
  const brandData = getBrand();

  return (
    <footer className="bg-primary text-primary-foreground">
      <Section padding="lg">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <span className="text-2xl font-bold">{brandData.logo.text}</span>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                {brandData.tagline}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {footerData.social.map((social) => {
                  const IconComponent = socialIconMap[social as keyof typeof socialIconMap];
                  if (!IconComponent) return null;
                  
                  return (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                      aria-label={`Follow us on ${social}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
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
            <p className="text-primary-foreground/60 text-sm">
              © 2025 {brandData.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
