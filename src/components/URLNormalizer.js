import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const URLNormalizer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    
    // Remove trailing slash except for root
    if (pathname !== '/' && pathname.endsWith('/')) {
      const normalizedPath = pathname.slice(0, -1);
      navigate(normalizedPath + search + hash, { replace: true });
      return;
    }

    // Force lowercase URLs
    if (pathname !== pathname.toLowerCase()) {
      navigate(pathname.toLowerCase() + search + hash, { replace: true });
      return;
    }

    // Remove duplicate slashes
    if (pathname.includes('//')) {
      const normalizedPath = pathname.replace(/\/+/g, '/');
      navigate(normalizedPath + search + hash, { replace: true });
      return;
    }
  }, [location, navigate]);

  return null;
};

export default URLNormalizer;