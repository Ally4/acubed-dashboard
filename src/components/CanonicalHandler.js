import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CanonicalHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://co-labhealth.com';
    const currentPath = location.pathname;
    const canonicalUrl = `${baseUrl}${currentPath === '/' ? '/' : currentPath}`;

    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = canonicalUrl;
    document.head.appendChild(canonicalLink);

    // Update Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.content = canonicalUrl;
    }

    // Update Twitter URL
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.content = canonicalUrl;
    }

  }, [location.pathname]);

  return null;
};

export default CanonicalHandler;