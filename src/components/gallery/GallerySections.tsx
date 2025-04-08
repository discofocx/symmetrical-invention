'use client';
// src/components/gallery/GallerySections.tsx
import React from 'react';
import { GallerySection } from '@/types/gallery';

interface GallerySectionsProps {
  sections: GallerySection[];
  onSelectCategory?: (categoryId: string) => void;
}

export const GallerySections: React.FC<GallerySectionsProps> = ({
  sections,
  onSelectCategory
}) => {
  const handleCategoryClick = (categoryId: string) => {
    // Scroll to gallery section
    const galleryElement = document.getElementById('gallery-section');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Call the optional callback to filter by category
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {sections.map((section) => (
        <div key={section.id} className="bg-cream p-6 rounded-lg shadow-sm">
          <h2 className="font-boska text-2xl text-forest mb-3">{section.title}</h2>
          <p className="text-forest/80 mb-4">{section.description}</p>
          <button
            className="text-peach hover:text-peach/80 font-medium flex items-center transition-colors"
            onClick={() => handleCategoryClick(section.id)}
          >
            Ver {section.title.toLowerCase()}
            <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};