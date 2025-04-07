// src/lib/content/products.ts
import fs from 'fs';
import path from 'path';
import { Product, ProductCategory } from '@/types/product';

const productsDirectory = path.join(process.cwd(), 'src/content/products');

export function getProductCategories(): ProductCategory[] {
  const filePath = path.join(productsDirectory, 'categories.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  return data as ProductCategory[];
}

export function getProductsByCategory(category: string): Product[] {
  const filePath = path.join(productsDirectory, `${category.toLowerCase()}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data as Product[];
  } catch (error) {
    console.error(`Error loading products for category: ${category}`, error);
    return [];
  }
}

export function getProductById(id: string): Product | null {
  // This will need to search through all product files
  // For now, a simplified approach:
  const categories = getProductCategories();
  
  for (const category of categories) {
    const products = getProductsByCategory(category.id);
    const product = products.find(p => p.id === id);
    if (product) return product;
  }
  
  return null;
}