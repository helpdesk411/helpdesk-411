// src/components/SEO.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

interface RouteMetadata {
  title: string;
  description: string;
  keywords: string;
  image?: string;
}

const routeMetadata: Record<string, RouteMetadata> = {
  '/': {
    title: 'HelpDesk 411 - Enterprise IT Support for Small Businesses | Managed Services',
    description: 'Professional IT support and managed services for small businesses. 24/7 helpdesk, proactive monitoring, cybersecurity, and dedicated technical support starting at $75/device. Get enterprise-grade IT without the enterprise cost.',
    keywords: 'IT support, managed services, small business IT, helpdesk, technical support, cybersecurity, network monitoring, 24/7 support, enterprise IT, business technology',
    image: '/images/hero_desktop_a.svg'
  },
  '/b': {
    title: 'Business IT Solutions | Professional Managed Services | HelpDesk 411',
    description: 'Comprehensive IT solutions for growing businesses. Professional managed services, network security, cloud solutions, and 24/7 technical support. Scalable IT infrastructure tailored to your business needs.',
    keywords: 'business IT solutions, managed IT services, network security, cloud solutions, IT infrastructure, business technology support, enterprise solutions',
    image: '/images/hero_b.svg'
  },
  '/c': {
    title: 'Corporate IT Services | Enterprise Support Solutions | HelpDesk 411',
    description: 'Enterprise-grade IT services for corporations. Advanced cybersecurity, compliance solutions, dedicated account management, and premium 24/7 support. Scale your business with confidence.',
    keywords: 'corporate IT services, enterprise support, cybersecurity, compliance solutions, dedicated support, business continuity, IT consulting',
    image: '/images/hero_c.svg'
  }
};

export function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  noIndex = false 
}: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Get route-specific metadata or use defaults
  const routeData = routeMetadata[currentPath] || routeMetadata['/'];
  const finalTitle = title || routeData.title;
  const finalDescription = description || routeData.description;
  const finalKeywords = keywords || routeData.keywords;
  const finalImage = image || routeData.image || '/images/logo.svg';
  const finalUrl = url || `https://helpdesk411.com${currentPath}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, content: string, property?: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute(property, selector.replace(`[${property}="`, '').replace('"]', ''));
        } else {
          element.setAttribute('name', selector.replace('[name="', '').replace('"]', ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('[name="description"]', finalDescription);
    updateMetaTag('[name="keywords"]', finalKeywords);
    updateMetaTag('[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMetaTag('[property="og:title"]', finalTitle, 'property');
    updateMetaTag('[property="og:description"]', finalDescription, 'property');
    updateMetaTag('[property="og:image"]', `https://helpdesk411.com${finalImage}`, 'property');
    updateMetaTag('[property="og:url"]', finalUrl, 'property');
    updateMetaTag('[property="og:type"]', type, 'property');

    // Update Twitter Card tags
    updateMetaTag('[name="twitter:title"]', finalTitle);
    updateMetaTag('[name="twitter:description"]', finalDescription);
    updateMetaTag('[name="twitter:image"]', `https://helpdesk411.com${finalImage}`);
    updateMetaTag('[name="twitter:url"]', finalUrl);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalUrl);

  }, [finalTitle, finalDescription, finalKeywords, finalImage, finalUrl, type, noIndex]);

  return null; // This component doesn't render anything
}

export default SEO;
