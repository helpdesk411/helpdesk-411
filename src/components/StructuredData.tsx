// src/components/StructuredData.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface StructuredDataProps {
  type?: 'business' | 'service' | 'faq';
}

export function StructuredData({ type = 'business' }: StructuredDataProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Business Organization Schema
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HelpDesk 411",
      "alternateName": "HelpDesk411",
      "description": "Professional IT support and managed services for small businesses. 24/7 helpdesk, proactive monitoring, cybersecurity, and dedicated technical support.",
      "url": "https://helpdesk411.com",
      "logo": "https://helpdesk411.com/images/logo.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/company/helpdesk411",
        "https://twitter.com/helpdesk411"
      ],
      "foundingDate": "2024",
      "numberOfEmployees": "10-50",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "IT Support Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Managed IT Services",
              "description": "Comprehensive IT support and management for small businesses"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "24/7 Help Desk Support",
              "description": "Round-the-clock technical support and assistance"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cybersecurity Services",
              "description": "Advanced security solutions and threat protection"
            }
          }
        ]
      }
    };

    // Service Schema for specific routes
    const serviceSchemas: Record<string, any> = {
      '/': {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Managed IT Services for Small Business",
        "description": "Comprehensive IT support and managed services for small businesses including 24/7 helpdesk, proactive monitoring, and cybersecurity.",
        "provider": {
          "@type": "Organization",
          "name": "HelpDesk 411",
          "url": "https://helpdesk411.com"
        },
        "areaServed": "United States",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "IT Support Plans",
          "itemListElement": [
            {
              "@type": "Offer",
              "price": "75",
              "priceCurrency": "USD",
              "priceValidUntil": "2024-12-31",
              "itemOffered": {
                "@type": "Service",
                "name": "Starter Plan",
                "description": "Essential IT support for small businesses"
              }
            },
            {
              "@type": "Offer",
              "price": "125",
              "priceCurrency": "USD",
              "priceValidUntil": "2024-12-31",
              "itemOffered": {
                "@type": "Service",
                "name": "Business Plan",
                "description": "Comprehensive IT support with advanced features"
              }
            },
            {
              "@type": "Offer",
              "price": "200",
              "priceCurrency": "USD",
              "priceValidUntil": "2024-12-31",
              "itemOffered": {
                "@type": "Service",
                "name": "Enterprise Plan",
                "description": "Premium IT support with dedicated account manager"
              }
            }
          ]
        },
        "serviceType": "IT Support",
        "category": "Technology Services"
      },
      '/b': {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Business IT Solutions",
        "description": "Professional managed IT services for growing businesses with advanced security and cloud solutions.",
        "provider": {
          "@type": "Organization",
          "name": "HelpDesk 411",
          "url": "https://helpdesk411.com"
        },
        "areaServed": "United States",
        "serviceType": "Business IT Solutions",
        "category": "Technology Services"
      },
      '/c': {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Corporate IT Services",
        "description": "Enterprise-grade IT services with advanced cybersecurity, compliance solutions, and dedicated support.",
        "provider": {
          "@type": "Organization",
          "name": "HelpDesk 411",
          "url": "https://helpdesk411.com"
        },
        "areaServed": "United States",
        "serviceType": "Corporate IT Services",
        "category": "Technology Services"
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What IT services do you provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide comprehensive IT support including 24/7 helpdesk, proactive monitoring, cybersecurity, network management, cloud solutions, and dedicated technical support for small and medium businesses."
          }
        },
        {
          "@type": "Question",
          "name": "How much does your IT support cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our IT support plans start at $75 per device per month for our Starter plan, $125 for Business plan, and $200 for Enterprise plan. All plans include 24/7 support and proactive monitoring."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide 24/7 support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide 24/7 technical support and monitoring for all our managed IT service plans. Our team is always available to help when you need it most."
          }
        },
        {
          "@type": "Question",
          "name": "What industries do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve small and medium businesses across all industries including healthcare, finance, retail, manufacturing, professional services, and more. Our solutions are tailored to meet industry-specific compliance and security requirements."
          }
        }
      ]
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "HelpDesk 411",
      "url": "https://helpdesk411.com",
      "description": "Professional IT support and managed services for small businesses",
      "publisher": {
        "@type": "Organization",
        "name": "HelpDesk 411"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://helpdesk411.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Determine which schemas to include
    let schemas: any[] = [businessSchema, websiteSchema];
    
    if (type === 'service' && serviceSchemas[currentPath]) {
      schemas.push(serviceSchemas[currentPath]);
    }
    
    if (type === 'faq') {
      schemas.push(faqSchema);
    }

    // Create and insert the structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    document.head.appendChild(script);

  }, [currentPath, type]);

  return null;
}

export default StructuredData;
