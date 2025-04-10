/**
 * Site metadata configuration
 * Central location for all SEO-related metadata
 */

import { Metadata } from 'next';
import { siteConfig } from './site';

// Base URL for the site (used for canonical URLs and OG images)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altivento.mx';

// Default metadata values used across the site
export const defaultMetadata: Metadata = {
  // Basic metadata
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  
  // Set metadataBase for absolute URLs
  metadataBase: new URL(baseUrl),
  
  // Viewport is now configured separately

  // Social/OpenGraph metadata
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    url: '/',
    locale: 'es_MX',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.description}`
      }
    ]
  },

  // Twitter card
  twitter: {
    card: 'summary_large_image',
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    images: ['/images/og-image.jpg'],
  },

  // Essential meta tags
  applicationName: siteConfig.name,
  keywords: [
    'carpas para eventos', 
    'estructuras para eventos', 
    'carpas para bodas', 
    'pistas de baile', 
    'templetes para eventos',
    'eventos Querétaro',
    'carpas para fiestas',
    'montaje de eventos',
    'renta de carpas',
    'equipo para eventos'
  ],
  authors: [{ name: siteConfig.name, url: baseUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  
  // Robots settings
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },

  // Canonical URL
  alternates: {
    canonical: baseUrl,
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  // Verification
  verification: {
    // Add your verification IDs here (if needed)
    // google: 'your-google-verification-id',
  },

  // Region and locale
  category: 'business',
};

// Helper function to create metadata for a specific page
export function createMetadata({
  title,
  description,
  keywords = [],
  image,
  path = '',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string; // Should be relative path starting with "/"
  path?: string;  // Should be relative path starting with "/"
  noIndex?: boolean;
}): Metadata {
  
  return {
    metadataBase: new URL(baseUrl),
    ...(title && { 
      title: title,
    }),
    ...(description && { 
      description: description,
    }),
    ...(keywords.length > 0 && { 
      keywords: [...defaultMetadata.keywords as string[], ...keywords],
    }),
    
    openGraph: {
      ...defaultMetadata.openGraph,
      ...(title && { 
        title: title,
      }),
      ...(description && { 
        description: description,
      }),
      url: path,
      images: [
        {
          url: image || (defaultMetadata.openGraph?.images?.[0] as { url: string })?.url || '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title || siteConfig.name
        }
      ]
    },
    
    twitter: {
      ...defaultMetadata.twitter,
      ...(title && { 
        title: title,
      }),
      ...(description && { 
        description: description,
      }),
      images: [image || (defaultMetadata.twitter?.images as string[])[0]],
    },
    
    alternates: {
      canonical: path,
    },
    
    robots: noIndex ? {
      index: false,
      follow: false,
    } : defaultMetadata.robots,
  };
}