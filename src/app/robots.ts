/**
 * Robots.txt generation
 * This file generates the robots.txt file for the site
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Base URL for the site (for sitemap URL)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altivento.mx';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Uncomment the line below if needed to disallow specific paths
      // disallow: ['/admin/', '/internal/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}