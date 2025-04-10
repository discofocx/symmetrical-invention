# Core Web Vitals & Performance Optimization

This document outlines the strategies implemented to optimize the Altivento website for performance, especially focusing on Core Web Vitals.

## Core Web Vitals Metrics

Core Web Vitals are Google's metrics for measuring web performance that directly impact user experience:

1. **Largest Contentful Paint (LCP)** - Measures loading performance
   - Good: ≤ 2.5 seconds
   - Target implemented: Optimized image loading, font loading, and key content

2. **First Input Delay (FID)** / **Interaction to Next Paint (INP)** - Measures interactivity
   - Good: ≤ 100 milliseconds
   - Target implemented: Reduced JavaScript execution time, optimized event handlers

3. **Cumulative Layout Shift (CLS)** - Measures visual stability
   - Good: ≤ 0.1
   - Target implemented: Proper image dimensions, font display strategies, stable layouts

## Implemented Optimizations

### Font Optimization

- Used Next.js font optimization via `next/font`
- Applied appropriate display strategies (swap, block) to prevent FOIT/FOUT
- Preloaded critical fonts

```tsx
// src/lib/utils/fonts.ts
import localFont from 'next/font/local';

export const boska = localFont({
  src: [
    {
      path: '../../fonts/Boska-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Boska-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-boska',
  display: 'block',
});
```

### Image Optimization

- Implemented next/image with proper configurations
- Created OptimizedImage component with loading states
- Used priority flag for above-the-fold images
- Implemented responsive sizing with proper aspect ratios
- Added blur placeholders for improved perceived performance

```tsx
// src/components/ui/OptimizedImage.tsx
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholders/placeholder.svg',
  className,
  blurDataURL,
  priority = false,
  ...props
}: OptimizedImageProps) {
  // Implementation details
}
```

### JavaScript Optimization

- Used dynamic imports for non-critical components
- Implemented code splitting via the createLazyComponent utility
- Added proper loading states for async components
- Optimized event handlers in interactive components
- Removed unnecessary client-side JavaScript

### Resource Loading

- Implemented preloading of critical resources
- Added preconnects for external domains
- Used next/script with appropriate loading strategies
- Applied responsive loading for different viewport sizes

```tsx
// Preload critical resources
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
    // Implementation details
  }, []);
}
```

### Content Optimization

- Implemented content chunking for large datasets
- Created utility functions for content prioritization
- Used progressive loading patterns
- Applied responsive content strategies

```typescript
// src/lib/utils/content-optimization.ts
export function chunkContent<T>(content: T[], chunkSize: number = 10): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.slice(i, i + chunkSize));
  }
  return chunks;
}
```

### Next.js Configuration

- Configured image optimization in next.config.ts
- Applied appropriate caching strategies
- Enabled compression
- Set up static optimization where possible

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    quality: 80
  },
  // Additional configurations
}
```

### Performance Monitoring

- Implemented Web Vitals tracking
- Created utility for reporting metrics
- Added performance observer for custom metrics

```typescript
// src/lib/utils/performance.ts
export function reportWebVitals(metric: {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}) {
  // Implementation details for reporting
}
```

## Testing and Validation

To validate the performance optimizations:

1. Run Lighthouse audits in Chrome DevTools
2. Check Core Web Vitals using PageSpeed Insights
3. Monitor real user metrics with Web Vitals tracking
4. Test on various devices and connection speeds
5. Use Chrome DevTools Performance tab to identify bottlenecks

## Future Optimizations

- Implement route-based code splitting
- Add service worker for offline support
- Enhance image responsive strategies
- Implement resource hints for additional performance gains