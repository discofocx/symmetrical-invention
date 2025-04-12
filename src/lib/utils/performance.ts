'use client';

import { useEffect } from 'react';
import type { ReportHandler } from 'web-vitals';

/**
 * Log web vitals to the console in development or to an analytics endpoint in production
 * 
 * @param metric Web Vitals metric object
 */
export const reportWebVitals: ReportHandler = (metric) => {
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
};

/**
 * Next.js 14 App Router web vitals track helper
 * Used to track Core Web Vitals in your application
 */
export function useWebVitalsReport() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      // Dynamically import web-vitals
      import('web-vitals')
        .then(({ onCLS, onFID, onLCP, onTTFB, onINP }) => {
          // Register all the metrics
          onCLS(reportWebVitals);
          onFID(reportWebVitals);
          onLCP(reportWebVitals);
          onTTFB(reportWebVitals);
          onINP(reportWebVitals);
        })
        .catch((error) => {
          console.error('Error importing web-vitals:', error);
        });
    }
  }, []);
}