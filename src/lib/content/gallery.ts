// src/lib/content/gallery.ts
import fs from 'fs';
import path from 'path';
import { GalleryItem, GalleryCategory, GallerySection } from '@/types/gallery';

const galleryDirectory = path.join(process.cwd(), 'src/content/gallery');

/**
 * Get all gallery items
 */
export function getAllGalleryItems(): GalleryItem[] {
  try {
    const filePath = path.join(galleryDirectory, 'gallery-items.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return data as GalleryItem[];
  } catch (error) {
    console.error('Error loading gallery items:', error);
    return [];
  }
}

/**
 * Get gallery items by category
 */
export function getGalleryItemsByCategory(category: GalleryCategory): GalleryItem[] {
  const allItems = getAllGalleryItems();
  
  if (category === 'all') {
    return allItems;
  }
  
  return allItems.filter(item => {
    if (Array.isArray(item.category)) {
      return item.category.includes(category);
    }
    return item.category === category;
  });
}

/**
 * Get featured gallery items
 */
export function getFeaturedGalleryItems(limit: number = 6): GalleryItem[] {
  const allItems = getAllGalleryItems();
  
  // First get items marked as featured
  const featuredItems = allItems.filter(item => item.featured);
  
  // If we don't have enough featured items, add other items until we reach the limit
  if (featuredItems.length < limit) {
    const nonFeaturedItems = allItems
      .filter(item => !item.featured)
      .slice(0, limit - featuredItems.length);
      
    return [...featuredItems, ...nonFeaturedItems];
  }
  
  return featuredItems.slice(0, limit);
}

/**
 * Get gallery item by ID
 */
export function getGalleryItemById(id: string): GalleryItem | null {
  const allItems = getAllGalleryItems();
  const item = allItems.find(item => item.id === id);
  
  return item || null;
}

/**
 * Get gallery sections (category groupings)
 */
export function getGallerySections(): GallerySection[] {
  return [
    {
      id: 'bodas',
      title: 'Bodas',
      description: 'Carpas, pistas y montajes especiales para bodas y ceremonias.',
      category: 'bodas',
      featured: true
    },
    {
      id: 'corporativos',
      title: 'Eventos Corporativos',
      description: 'Estructuras para conferencias, exposiciones y eventos empresariales.',
      category: 'corporativos',
      featured: true
    },
    {
      id: 'sociales',
      title: 'Eventos Sociales',
      description: 'Soluciones para fiestas, graduaciones y celebraciones especiales.',
      category: 'sociales'
    },
    {
      id: 'especiales',
      title: 'Proyectos Especiales',
      description: 'Adaptaciones únicas y soluciones a medida para desafíos específicos.',
      category: 'especiales'
    }
  ];
}

/**
 * Search gallery items by query
 */
export function searchGalleryItems(query: string): GalleryItem[] {
  if (!query) return [];
  
  const allItems = getAllGalleryItems();
  const lowerQuery = query.toLowerCase();
  
  return allItems.filter(item => {
    // Search in title, description, location, and tags
    const titleMatch = item.title.toLowerCase().includes(lowerQuery);
    const descMatch = item.description.toLowerCase().includes(lowerQuery);
    const locMatch = item.location?.toLowerCase().includes(lowerQuery) || false;
    const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false;
    
    return titleMatch || descMatch || locMatch || tagMatch;
  });
}