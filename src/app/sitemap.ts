/**
 * Sitemap generation
 * This file generates the XML sitemap for the site
 */

import { MetadataRoute } from 'next';
import { getProductCategories, getAllProducts } from '@/lib/content/products';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for the site
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://altivento.mx';
  
  // Last modified date for static pages
  const lastModified = new Date();
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bodas`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/productos`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];
  
  // Get product categories for dynamic routes
  const categories = getProductCategories();
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/productos/${category.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // Get all products for dynamic routes
  const products = getAllProducts();
  const productPages = products.map((product) => {
    const category = categories.find((cat) => cat.id === product.categoryId);
    return {
      url: `${baseUrl}/productos/${category?.slug}/${product.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });
  
  // Combine all pages
  return [...staticPages, ...categoryPages, ...productPages];
}