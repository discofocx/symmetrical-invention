'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Component that handles preloading critical resources for better performance
 */
export function PreloadResources() {
  // Preloads critical assets after the page has loaded
  useEffect(() => {
    const preloadAssets = () => {
      // Define critical images to preload
      const criticalImages = [
        '/images/placeholders/hero/placeholder.svg',
        // Add other critical images here
      ];
      
      // Preload images
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Only run after the page has fully loaded
    if (document.readyState === 'complete') {
      preloadAssets();
    } else {
      window.addEventListener('load', preloadAssets);
      return () => window.removeEventListener('load', preloadAssets);
    }
  }, []);

  return (
    <>
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Optional: Add Google Tag Manager or Analytics */}
      {process.env.NODE_ENV === 'production' && (
        <Script
          id="performance-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals enhanced tracking (uncomment when ready)
              /*
              window.addEventListener('DOMContentLoaded', function() {
                // Create a performance observer
                const perfObserver = new PerformanceObserver((entries) => {
                  entries.getEntries().forEach((entry) => {
                    // Log LCP, FID, CLS metrics when available
                    console.log('[Performance]', entry.name, entry.startTime, entry.value);
                  });
                });
                
                // Observe paint timing events
                perfObserver.observe({ 
                  type: 'paint', 
                  buffered: true 
                });
              });
              */
            `
          }}
        />
      )}
    </>
  );
}