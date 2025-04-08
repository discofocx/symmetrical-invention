// src/lib/content/products.ts (update)

import fs from 'fs';
import path from 'path';
import { Product, ProductCategory } from '@/types/product';

const productsDirectory = path.join(process.cwd(), 'src/content/products');

// Map between URL slugs and content file names (all normalized)
const categoryFileMapping: Record<string, string> = {
  // Direct mappings by ID and slug
  'carpas': 'carpas',
  'pistas-de-baile': 'pistas',
  'pistas': 'pistas',
  'entarimados': 'entarimados',
  'templetes': 'templetes',
  // Graderías variations (with and without accents)
  'graderias': 'graderias',
  'graderías': 'graderias',
  // These handle both form of the URL
  'plantas-de-luz': 'plantas',
  'plantas': 'plantas',
  'servicios-especiales': 'especiales',
  'especiales': 'especiales'
};

// Enhanced utilities for slug handling and normalization
export function normalizeString(str: string): string {
  return str.toLowerCase()
    .trim()
    // Remove accents/diacritics
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function slugify(str: string): string {
  return str.toLowerCase()
    .trim()
    // Remove accents/diacritics
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove any remaining non-alphanumeric characters (except hyphens)
    .replace(/[^a-z0-9\-]/g, '')
    // Remove repeated hyphens
    .replace(/-+/g, '-');
}

export function deslugify(slug: string): string {
  return slug.toLowerCase()
    .trim()
    // Remove accents/diacritics if any
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // Replace hyphens with spaces
    .replace(/-+/g, ' ');
}

// Category resolvers
export function getCategoryBySlug(slug: string): ProductCategory | null {
  try {
    const categories = getProductCategories();
    
    // First try direct match with the original slug
    let category = categories.find(c => c.slug === slug);
    
    if (!category) {
      const normalizedSlug = normalizeString(slug);
      
      // Try to find by normalized slug match
      category = categories.find(c => normalizeString(c.slug) === normalizedSlug);
      
      // If not found, try by normalized ID
      if (!category) {
        category = categories.find(c => normalizeString(c.id) === normalizedSlug);
      }
      
      // If still not found, try by normalized name
      if (!category) {
        const deslugifiedName = deslugify(normalizedSlug);
        category = categories.find(c => 
          normalizeString(c.name) === deslugifiedName
        );
      }
      
      // Last attempt: try slugified category name
      if (!category) {
        categories.forEach(c => {
          const slugifiedName = slugify(c.name);
          if (normalizeString(slugifiedName) === normalizedSlug) {
            category = c;
          }
        });
      }
    }
    
    return category || null;
  } catch (error) {
    console.error(`Error finding category by slug: ${slug}`, error);
    return null;
  }
}

export function getCategoryFileName(categoryIdentifier: string): string | null {
  // First, try with the original string (for explicit accented entries)
  if (categoryFileMapping[categoryIdentifier]) {
    return categoryFileMapping[categoryIdentifier];
  }
  
  // Then check if we have a direct mapping with normalized string
  const normalizedIdentifier = normalizeString(categoryIdentifier);
  const directMatch = categoryFileMapping[normalizedIdentifier];
  if (directMatch) return directMatch;
  
  // Try to find category and get its ID
  const category = getCategoryBySlug(categoryIdentifier);
  if (category) {
    // Try the category ID directly first
    if (categoryFileMapping[category.id]) {
      return categoryFileMapping[category.id];
    }
    
    // Check if normalized category ID is in the mapping
    const mappedFile = categoryFileMapping[normalizeString(category.id)];
    if (mappedFile) return mappedFile;
    
    // Fallback to category ID directly
    return normalizeString(category.id);
  }
  
  // Last resort, return the normalized input
  return normalizedIdentifier;
}

// Product resolver
export function getProductBySlug(slug: string): Product | null {
  try {
    // First try with the original slug (exact match)
    const allProducts = getAllProducts();
    let product = allProducts.find(p => p.id === slug);
    
    if (!product) {
      // Normalize the slug
      const normalizedSlug = normalizeString(slug);
      const deslugifiedName = deslugify(normalizedSlug);
      
      // Try to find by normalized ID
      product = allProducts.find(p => normalizeString(p.id) === normalizedSlug);
      
      // If not found, try by ID with spaces instead of hyphens
      if (!product) {
        product = allProducts.find(p => normalizeString(p.id) === deslugifiedName);
      }
      
      // If still not found, try by normalized name
      if (!product) {
        product = allProducts.find(p => normalizeString(p.name) === deslugifiedName);
      }
      
      // Last attempt: try by slugified name
      if (!product) {
        for (const p of allProducts) {
          const slugifiedName = slugify(p.name);
          if (normalizeString(slugifiedName) === normalizedSlug) {
            product = p;
            break;
          }
        }
      }
    }
    
    return product || null;
  } catch (error) {
    console.error(`Error finding product by slug: ${slug}`, error);
    return null;
  }
}

// Update existing function to use the mapping
export function getProductCategories(): ProductCategory[] {
  try {
    const filePath = path.join(productsDirectory, 'categories.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return data as ProductCategory[];
  } catch (error) {
    console.error('Error loading product categories:', error);
    return [];
  }
}

export function getProductsByCategory(categoryIdentifier: string): Product[] {
  try {
    // Get the correct file name using our resolver
    const fileName = getCategoryFileName(categoryIdentifier);
    if (!fileName) return [];
    
    const filePath = path.join(productsDirectory, `${fileName}.json`);
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data as Product[];
  } catch (error) {
    console.error(`Error loading products for category: ${categoryIdentifier}`, error);
    return [];
  }
}

// Other existing functions can remain mostly the same
export function getAllProducts(): Product[] {
  try {
    const categories = getProductCategories();
    let allProducts: Product[] = [];
    
    categories.forEach(category => {
      const categoryProducts = getProductsByCategory(category.id);
      allProducts = [...allProducts, ...categoryProducts];
    });
    
    return allProducts;
  } catch (error) {
    console.error('Error loading all products:', error);
    return [];
  }
}

// Update to use our new resolver
export function getProductById(id: string): Product | null {
  return getProductBySlug(id);
}

export function getFeaturedProducts(limit: number = 6): Product[] {
  try {
    const allProducts = getAllProducts();
    // Sort by some criteria (could be random, newer first, etc.)
    // For now, just return the first 'limit' products
    return allProducts.slice(0, limit);
  } catch (error) {
    console.error('Error loading featured products:', error);
    return [];
  }
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  try {
    const product = getProductById(productId);
    if (!product) return [];
    
    // Get products from the same category
    const categoryProducts = getProductsByCategory(product.category)
      .filter(p => p.id !== productId); // Exclude the current product
    
    // If the product has related products specified, use those
    if (product.relatedProducts && product.relatedProducts.length > 0) {
      const relatedProducts = product.relatedProducts
        .map(id => getProductById(id))
        .filter((p): p is Product => p !== null);
      
      // If we have enough related products, return them
      if (relatedProducts.length >= limit) {
        return relatedProducts.slice(0, limit);
      }
      
      // Otherwise, combine with category products
      const otherCategoryProducts = categoryProducts
        .filter(p => !product.relatedProducts?.includes(p.id));
      
      return [...relatedProducts, ...otherCategoryProducts].slice(0, limit);
    }
    
    // If no related products specified, just return products from the same category
    return categoryProducts.slice(0, limit);
  } catch (error) {
    console.error(`Error loading related products for: ${productId}`, error);
    return [];
  }
}