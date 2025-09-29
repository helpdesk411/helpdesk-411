import { useEffect } from 'react';

declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

export const ChatWidget = () => {
  useEffect(() => {
    // Load jQuery dynamically only when needed
    const loadJQuery = () => {
      return new Promise((resolve, reject) => {
        if (window.jQuery) {
          resolve(window.jQuery);
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
        script.integrity = 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=';
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve(window.jQuery);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load SocialIntents after jQuery
    const loadSocialIntents = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://www.socialintents.com/api/chat/socialintents.1.4.js#2c9fa6c39803cef10198191b7c462400';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Load both scripts
    loadJQuery()
      .then(() => loadSocialIntents())
      .catch(console.error);

    // Cleanup function
    return () => {
      // Remove scripts if component unmounts
      const scripts = document.querySelectorAll('script[src*="jquery"], script[src*="socialintents"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return null; // This component doesn't render anything
};
