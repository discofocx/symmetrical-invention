// src/types/gallery.ts
/**
 * Gallery event categories
 */
export type GalleryCategory = 
  | 'bodas' 
  | 'corporativos'
  | 'sociales'
  | 'especiales'
  | 'all';

/**
 * Interface for gallery items
 */
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory | GalleryCategory[];
  imageSrc: string;
  thumbnailSrc?: string; // Optional smaller version of the image
  date?: string; // Date of the event
  location?: string; // Location of the event
  featured?: boolean; // Whether to highlight this item
  tags?: string[]; // Additional tags for filtering
}

/**
 * Interface for gallery filter state
 */
export interface GalleryFilterState {
  category: GalleryCategory;
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'featured';
}

/**
 * Interface for gallery section metadata
 */
export interface GallerySection {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  featured?: boolean;
}