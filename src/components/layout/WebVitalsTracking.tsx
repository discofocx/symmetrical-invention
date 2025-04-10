'use client';

import { useWebVitalsReport } from '@/lib/utils/performance';

export function WebVitalsTracking() {
  // Initialize web vitals tracking
  useWebVitalsReport();
  
  // This component doesn't render anything visible
  return null;
}