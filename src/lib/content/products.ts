// src/lib/content/products.ts (update)

import fs from 'fs';
import path from 'path';
import { Product, ProductCategory } from '@/types/product';

const productsDirectory = path.join(process.cwd(), 'src/content/products');

// Map between URL slugs and content file names
const categoryFileMapping: Record<string, string> = {
  'carpas': 'carpas',
  'pistas-de-baile': 'pistas',
  'entarimados': 'entarimados',
  'templetes': 'templetes',
  'graderias': 'graderias',
  'plantas-de-luz': 'plantas',
  'servicios-especiales': 'especiales'
};

// Utilities for slug handling and normalization
function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

function slugify(str: string): string {
  return normalizeString(str).replace(/\s+/g, '-');
}

function deslugify(slug: string): string {
  return normalizeString(slug).replace(/-+/g, ' ');
}

// Category resolvers
export function getCategoryBySlug(slug: string): ProductCategory | null {
  try {
    const categories = getProductCategories();
    const normalizedSlug = normalizeString(slug);
    
    // Try to find by exact slug match first
    let category = categories.find(c => normalizeString(c.slug) === normalizedSlug);
    
    // If not found, try by ID
    if (!category) {
      category = categories.find(c => normalizeString(c.id) === normalizedSlug);
    }
    
    // If still not found, try by name
    if (!category) {
      const deslugifiedName = deslugify(normalizedSlug);
      category = categories.find(c => 
        normalizeString(c.name) === deslugifiedName
      );
    }
    
    return category || null;
  } catch (error) {
    console.error(`Error finding category by slug: ${slug}`, error);
    return null;
  }
}

export function getCategoryFileName(categoryIdentifier: string): string | null {
  // Check if we have a direct mapping first
  const directMatch = categoryFileMapping[normalizeString(categoryIdentifier)];
  if (directMatch) return directMatch;
  
  // Try to find category and get its ID
  const category = getCategoryBySlug(categoryIdentifier);
  if (category) {
    // Check if category ID is in the mapping
    const mappedFile = categoryFileMapping[normalizeString(category.id)];
    if (mappedFile) return mappedFile;
    
    // Fallback to category ID directly
    return normalizeString(category.id);
  }
  
  // Last resort, return the input itself
  return normalizeString(categoryIdentifier);
}

// Product resolver
export function getProductBySlug(slug: string): Product | null {
  try {
    // Normalize the slug
    const normalizedSlug = normalizeString(slug);
    const deslugifiedName = deslugify(normalizedSlug);
    
    // Get all products
    const allProducts = getAllProducts();
    
    // Try to find by ID first
    let product = allProducts.find(p => normalizeString(p.id) === normalizedSlug);
    
    // If not found, try by ID with spaces instead of hyphens
    if (!product) {
      product = allProducts.find(p => normalizeString(p.id) === deslugifiedName);
    }
    
    // If still not found, try by name
    if (!product) {
      product = allProducts.find(p => normalizeString(p.name) === deslugifiedName);
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