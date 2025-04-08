'use client';
// src/components/gallery/GalleryContainer.tsx
import React, { useState, useEffect } from 'react';
import { GallerySections } from './GallerySections';
import { GalleryPage } from './GalleryPage';
import { GalleryItem, GallerySection, GalleryCategory } from '@/types/gallery';

interface GalleryContainerProps {
  initialItems: GalleryItem[];
  initialSections: GallerySection[];
}

export const GalleryContainer: React.FC<GalleryContainerProps> = ({
  initialItems,
  initialSections
}) => {
  // Reference to the GalleryPage component to change the category filter
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [galleryPageKey, setGalleryPageKey] = useState(0);
  
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId as GalleryCategory);
    // Force remount the GalleryPage to reset its filters
    setGalleryPageKey(prev => prev + 1);
  };
  
  return (
    <>
      <GallerySections 
        sections={initialSections}
        onSelectCategory={handleSelectCategory}
      />
      
      <div id="gallery-section">
        <GalleryPage 
          key={galleryPageKey} 
          items={initialItems} 
          sections={initialSections}
          initialCategory={selectedCategory}
        />
      </div>
    </>
  );
};