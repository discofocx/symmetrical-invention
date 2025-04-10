/**
 * Schema.org structured data helpers
 * These functions generate JSON-LD structured data for SEO
 */

import { siteConfig } from '@/config/site';

// Base URL for the site
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altivento.mx';

/**
 * Creates Organization schema for the company
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
        email: siteConfig.contact.email,
        areaServed: 'MX',
        availableLanguage: 'Spanish',
      },
    ],
  };
}

/**
 * Creates LocalBusiness schema for local SEO
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#organization`,
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/images/og-image.jpg`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Querétaro',
      addressRegion: 'Querétaro',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.588793, // Example coordinates for Querétaro
      longitude: -100.389885,
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    currenciesAccepted: 'MXN',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 20.588793,
        longitude: -100.389885,
      },
      geoRadius: '50000',
    },
  };
}

/**
 * Creates WebSite schema for the website
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Creates BreadcrumbList schema for navigation
 */
export function breadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: `${baseUrl}${breadcrumb.url}`,
    })),
  };
}

/**
 * Creates Product schema for product details
 */
export function productSchema({
  name,
  description,
  image,
  url,
  category,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${baseUrl}${image}`,
    url: `${baseUrl}${url}`,
    category,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      highPrice: '50000',
      lowPrice: '5000',
      offerCount: '10',
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}${url}`,
        priceCurrency: 'MXN',
        availability: 'https://schema.org/InStock',
        priceValidUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
      },
    },
  };
}

/**
 * Creates ProductCollection schema for category pages
 */
export function productCollectionSchema({
  name,
  description,
  url,
  products,
}: {
  name: string;
  description: string;
  url: string;
  products: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${baseUrl}${url}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}${product.url}`,
        name: product.name,
      })),
    },
  };
}

/**
 * Creates Event schema for weddings and events
 */
export function eventServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Event Planning',
    name: 'Servicios para Eventos y Bodas',
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
    },
    description: 'Servicios completos para bodas y eventos sociales y corporativos, incluyendo carpas, pistas de baile, templetes y más.',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 20.588793,
        longitude: -100.389885,
      },
      geoRadius: '50000',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Wedding Planners, Event Planners, Corporate Event Organizers',
    },
  };
}