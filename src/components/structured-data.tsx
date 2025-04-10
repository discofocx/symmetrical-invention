/**
 * Components for adding structured data to pages
 */

import Script from 'next/script';
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbSchema,
  productSchema,
  productCollectionSchema,
  eventServiceSchema,
} from '@/lib/schema';

// Component to add Organization schema to layout
export function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
    />
  );
}

// Component to add LocalBusiness schema to layout
export function LocalBusinessSchema() {
  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
    />
  );
}

// Component to add Website schema to layout
export function WebsiteSchema() {
  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
    />
  );
}

// Component to add Breadcrumb schema to pages
export function BreadcrumbSchema({
  breadcrumbs,
}: {
  breadcrumbs: { name: string; url: string }[];
}) {
  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema(breadcrumbs)),
      }}
    />
  );
}

// Component to add Product schema to product pages
export function ProductSchema({
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
  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          productSchema({ name, description, image, url, category })
        ),
      }}
    />
  );
}

// Component to add ProductCollection schema to category pages
export function ProductCollectionSchema({
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
  return (
    <Script
      id="product-collection-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          productCollectionSchema({ name, description, url, products })
        ),
      }}
    />
  );
}

// Component to add Event schema to wedding and event pages
export function EventServiceSchema() {
  return (
    <Script
      id="event-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventServiceSchema()),
      }}
    />
  );
}