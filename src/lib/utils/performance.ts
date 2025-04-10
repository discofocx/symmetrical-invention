'use client';

import { useEffect } from 'react';

/**
 * Log web vitals to the console in development or to an analytics endpoint in production
 * 
 * @param metric Web Vitals metric object
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
    return;
  }

  // In production, send to your analytics service
  // This example doesn't actually send the data but you could implement
  // your analytics reporting here
  
  // Uncomment to enable analytics reporting
  /*
  const body = JSON.stringify(metric);
  fetch('/api/analytics', {
    body,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  */
}

/**
 * Next.js 14 App Router web vitals track helper
 * Used to track Core Web Vitals in your application
 */
export function useWebVitalsReport() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      // Check for web vitals support
      if ('onCLS' in window) {
        import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onINP }) => {
          onCLS(reportWebVitals);
          onFID(reportWebVitals);
          onLCP(reportWebVitals);
          onTTFB(reportWebVitals);
          onINP(reportWebVitals);
        });
      }
    }
  }, []);
}