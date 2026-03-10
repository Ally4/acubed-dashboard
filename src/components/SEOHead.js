import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ 
  title, 
  description, 
  canonical, 
  ogImage = "https://co-labhealth.com/acubed-logo.jpeg",
  ogType = "website",
  noindex = false,
  structuredData = null
}) => {
  const location = useLocation();
  const baseUrl = "https://co-labhealth.com";
  
  // Generate canonical URL - ensure consistent format
  const generateCanonical = () => {
    if (canonical) return canonical;
    
    let path = location.pathname;
    // Remove trailing slash except for homepage
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    // Ensure homepage has trailing slash
    if (path === '') {
      path = '/';
    }
    
    return `${baseUrl}${path}`;
  };
  
  const fullCanonical = generateCanonical();
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="CO-LAB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={fullCanonical} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="ACUBED - CO-LAB" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;