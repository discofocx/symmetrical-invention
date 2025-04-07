// src/lib/content/products.ts (update)
import fs from 'fs';
import path from 'path';
import { Product, ProductCategory } from '@/types/product';

const productsDirectory = path.join(process.cwd(), 'src/content/products');

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

export function getProductsByCategory(category: string): Product[] {
  try {
    // Convert category to lowercase filename format (e.g. 'Carpas' -> 'carpas.json')
    const categoryLower = category.toLowerCase().replace(/ /g, '');
    const filePath = path.join(productsDirectory, `${categoryLower}.json`);
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data as Product[];
  } catch (error) {
    console.error(`Error loading products for category: ${category}`, error);
    return [];
  }
}

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

export function getProductById(id: string): Product | null {
  try {
    // Normalize the ID by replacing hyphens with spaces
    const normalizedId = id.replace(/-/g, ' ').toLowerCase();
    
    // Try to find the product by ID in all categories
    const allProducts = getAllProducts();
    
    // First, try to find an exact match on the ID
    let product = allProducts.find(product => 
      product.id.toLowerCase() === normalizedId
    );
    
    // If no exact match on ID, try matching on name (for backward compatibility)
    if (!product) {
      product = allProducts.find(product => 
        product.name.toLowerCase() === normalizedId
      );
    }
    
    return product || null;
  } catch (error) {
    console.error(`Error loading product with ID: ${id}`, error);
    return null;
  }
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