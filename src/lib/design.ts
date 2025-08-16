import designData from '../../design.json';

// Type definitions based on design.json structure
export interface DesignTokens {
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    muted: string;
    foreground: string;
    secondary: string;
    card: string;
    border: string;
    ring: string;
    gradient: {
      start: string;
      mid: string;
      end: string;
    };
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadow: {
    card: string;
    soft: string;
  };
  spacing: {
    sectionY: string;
    container: string;
  };
  typography: {
    fontSans: string;
    displayTracking: string;
    headingWeight: number;
    bodyWeight: number;
  };
}

export interface TrustPill {
  text: string;
}

export interface NavbarData {
  type: string;
  left: string[];
  right: string[];
  style: {
    backdrop: boolean;
    blur: string;
    rounded: string;
    shadow: string;
  };
}

export interface HeroData {
  bg: {
    type: string;
    from: string;
    via: string;
    to: string;
  };
  headline: string;
  subheading: string;
  primaryAction: {
    label: string;
    href: string;
    variant: string;
  };
  secondaryAction: {
    label: string;
    href: string;
    variant: string;
  };
  embeds: {
    chatBubbles: boolean;
    trustPills: TrustPill[];
  };
}

export interface FeatureKicker {
  icon: string;
  title: string;
  desc: string;
}

export interface PainPointsData {
  title: string;
  kickers: FeatureKicker[];
}

export interface Bullet {
  icon: string;
  label: string;
}

export interface PartnerData {
  title: string;
  copy: string;
  image: string;
  bullets: Bullet[];
}

export interface PricingPlan {
  name: string;
  price: number;
  per: string;
  isFeatured?: boolean;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface PricingData {
  id: string;
  plans: PricingPlan[];
  notes: string;
}

export interface AddOnCard {
  title: string;
  desc: string;
  image: string;
  badge?: string;
}

export interface AddOnsData {
  title: string;
  cards: AddOnCard[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQData {
  items: FAQItem[];
}

export interface CTAFinalData {
  headline: string;
  subcopy: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  image: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface FooterData {
  columns: FooterColumn[];
  social: string[];
}

export interface BrandData {
  name: string;
  tagline: string;
  logo: {
    type: string;
    text: string;
    mark: string;
  };
}

// Main design data interface
export interface DesignData {
  brand: BrandData;
  tokens: DesignTokens;
  components: {
    Navbar: NavbarData;
    Hero: HeroData;
    PainPoints: PainPointsData;
    Partner: PartnerData;
    Pricing: PricingData;
    AddOns: AddOnsData;
    FAQ: FAQData;
    CTAFinal: CTAFinalData;
    Footer: FooterData;
  };
  layout: {
    container: {
      maxWidth: string;
      paddingX: string;
    };
    sections_order: string[];
  };
  page_structure: {
    "/": string[];
  };
}

// Export the design data with proper typing
export const design: DesignData = designData as DesignData;

// Utility functions to get specific sections
export const getTokens = (): DesignTokens => design.tokens;
export const getBrand = (): BrandData => design.brand;
export const getNavbar = (): NavbarData => design.components.Navbar;
export const getHero = (): HeroData => design.components.Hero;
export const getPainPoints = (): PainPointsData => design.components.PainPoints;
export const getPartner = (): PartnerData => design.components.Partner;
export const getPricing = (): PricingData => design.components.Pricing;
export const getAddOns = (): AddOnsData => design.components.AddOns;
export const getFAQ = (): FAQData => design.components.FAQ;
export const getCTAFinal = (): CTAFinalData => design.components.CTAFinal;
export const getFooter = (): FooterData => design.components.Footer;
export const getPageStructure = (path: string = "/"): string[] => design.page_structure[path as keyof typeof design.page_structure] || [];

// Helper to resolve token references in strings like "{tokens.colors.gradient.start}"
export const resolveTokenReference = (value: string): string => {
  if (!value.startsWith('{') || !value.endsWith('}')) {
    return value;
  }
  
  const path = value.slice(1, -1); // Remove { }
  const parts = path.split('.');
  
  if (parts[0] === 'tokens') {
    // Navigate through the tokens object
    let current: any = design.tokens;
    for (let i = 1; i < parts.length; i++) {
      current = current[parts[i]];
      if (current === undefined) {
        console.warn(`Token reference not found: ${path}`);
        return value;
      }
    }
    return current;
  }
  
  return value;
};

export default design;
