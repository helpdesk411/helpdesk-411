import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { getFooter } from "@/lib/design";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Footer() {
  const footerData = getFooter();
  const location = useLocation();
  const pathname = location.pathname;

  // Map footer link text to actual section IDs or external URLs
  const getLinkHref = (linkText: string) => {
    const linkMap: Record<string, string> = {
      "Home": "#home",
      "Plans": "#pricing",
      "Add-ons": "#addons",
      "Contact": "#contact",
      "Features": "#features",
      "FAQ": "#faq"
    };

    // Check if it's a mapped internal link
    if (linkMap[linkText]) {
      return linkMap[linkText];
    }

    // Check if it's an email
    if (linkText.includes("@")) {
      return `mailto:${linkText}`;
    }

    // Check if it's a phone number
    if (linkText.includes("1-800-")) {
      return `tel:${linkText.replace(/-/g, "")}`;
    }

    // For industry links, don't create anchor links since they don't have sections
    return "#";
  };

  // Check if link should be clickable
  const isClickableLink = (linkText: string) => {
    const clickableLinks = ["Home", "Plans", "Add-ons", "Contact", "Features", "FAQ"];
    return clickableLinks.includes(linkText) || linkText.includes("@") || linkText.includes("1-800-");
  };

  return (
    <footer className={cn(
      "rounded-xl text-primary-foreground",
      pathname === "/b" 
        ? "rounded-b-2xl mx-4 mb-4" 
        : pathname === "/c"
        ? "bg-gray-100"
        : "bg-red-500"
    )} style={pathname === "/b" ? {
      borderRadius: "0 0 20px 20px",
      background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 36.98%, rgba(0, 0, 0, 0.52) 100%), #EA2427"
    } : pathname === "/c" ? {
      backgroundImage: "url(/images/footer_bg.svg)",
      backgroundSize: "contain",
      backgroundPosition: "top center",
      backgroundRepeat: "no-repeat"
    } : undefined}>
      <Section padding="lg">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                {pathname === "/c" ? (
                  <div className="flex items-center space-x-2">
                    <img src="images/logo_black_footer.svg" alt="logo" className="" />
                  </div>
                ) : (
                  <img src="images/footer_logo.svg" alt="logo" className="w-20 h-full object-cover" />
                )}
              </div>
              <p className={cn(
                "text-sm leading-relaxed mb-6",
                pathname === "/c" 
                  ? "text-[#333333]" 
                  : "text-primary-foreground/80"
              )}>
                Proactive IT support that scales with your business. From essential coverage to enterprise-grade protection.
              </p>
            </div>
            
            {/* Footer Links */}
            {footerData.columns.map((column, index) => (
              <div key={index}>
                <h3 className={cn(
                  "font-semibold mb-4",
                  pathname === "/c" 
                    ? "text-[#333333]" 
                    : "text-primary-foreground"
                )}>
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => {
                    const href = getLinkHref(link);
                    const isClickable = isClickableLink(link);
                    
                    return (
                      <li key={linkIndex}>
                        {isClickable ? (
                          <a
                            href={href}
                            className={cn(
                              "text-sm transition-colors",
                              pathname === "/c"
                                ? "text-[#333333] hover:text-[#666666]"
                                : "text-primary-foreground/80 hover:text-primary-foreground"
                            )}
                          >
                            {link}
                          </a>
                        ) : (
                          <span
                            className={cn(
                              "text-sm",
                              pathname === "/c"
                                ? "text-[#333333]/60"
                                : "text-primary-foreground/60"
                            )}
                          >
                            {link}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom */}
          <div className={cn(
            "border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center",
            pathname === "/c"
              ? "border-[#333333]/20"
              : "border-primary-foreground/20"
          )}>
            <p className={cn(
              "w-3/4 md:w-full text-center text-sm",
              pathname === "/c"
                ? "text-[#333333]"
                : "text-primary-foreground/60"
            )}>
              © 2024 help desk 411. All rights reserved. Professional IT support services.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
