import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage SEO metadata dynamically.
 * @param {Object} options
 * @param {string} options.title - The page title
 * @param {string} options.description - The page meta description
 * @param {string} [options.canonical] - The canonical URL (optional, defaults to current location)
 */
const useSEO = ({ title, description, canonical }) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // 2. Update Description
    const descriptionElement = document.querySelector('meta[name="description"]');
    if (descriptionElement && description) {
      descriptionElement.setAttribute('content', description);
    }

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    // Construct canonical URL properly
    const baseUrl = 'https://co-labhealth.com';
    let currentUrl;
    
    if (canonical) {
      currentUrl = canonical;
    } else {
      // Clean up the pathname - remove trailing slashes except for root
      let cleanPath = location.pathname;
      if (cleanPath !== '/' && cleanPath.endsWith('/')) {
        cleanPath = cleanPath.slice(0, -1);
      }
      currentUrl = `${baseUrl}${cleanPath}${location.search}`;
    }
    
    canonicalLink.setAttribute('href', currentUrl);

    // 4. Update Open Graph URL
    const ogUrlElement = document.querySelector('meta[property="og:url"]');
    if (ogUrlElement) {
      ogUrlElement.setAttribute('content', currentUrl);
    }

    // 5. Update Twitter URL
    const twitterUrlElement = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrlElement) {
      twitterUrlElement.setAttribute('content', currentUrl);
    }

    // 6. Update Open Graph title and description if provided
    if (title) {
      const ogTitleElement = document.querySelector('meta[property="og:title"]');
      if (ogTitleElement) {
        ogTitleElement.setAttribute('content', title);
      }
      
      const twitterTitleElement = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitleElement) {
        twitterTitleElement.setAttribute('content', title);
      }
    }

    if (description) {
      const ogDescElement = document.querySelector('meta[property="og:description"]');
      if (ogDescElement) {
        ogDescElement.setAttribute('content', description);
      }
      
      const twitterDescElement = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescElement) {
        twitterDescElement.setAttribute('content', description);
      }
    }

  }, [title, description, canonical, location]);
};

export default useSEO;
