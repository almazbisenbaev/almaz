'use client';

import { useState, useEffect } from 'react';

export default function PageLoader({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fontsPromise = document.fonts.ready;
    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });

    Promise.all([fontsPromise, windowLoadPromise]).then(() => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <div 
      className="page-loader"
      style={{ 
        opacity: isLoaded ? 1 : 0, 
        transition: 'opacity 0.5s ease-in-out' 
      }}
    >
      {children}
    </div>
  );
}
