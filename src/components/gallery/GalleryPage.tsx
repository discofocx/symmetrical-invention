'use client';
// src/components/gallery/GalleryPage.tsx
import React, { useState, useEffect } from 'react';
import { GalleryGrid } from './GalleryGrid';
import { GalleryModal } from './GalleryModal';
import { GalleryFilter } from './GalleryFilter';
import { GalleryItem, GalleryCategory, GalleryFilterState, GallerySection } from '@/types/gallery';

interface GalleryPageProps {
  items: GalleryItem[];
  sections: GallerySection[];
  initialCategory?: GalleryCategory;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ 
  items, 
  sections,
  initialCategory = 'all'
}) => {
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(items);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentFilters, setCurrentFilters] = useState<GalleryFilterState>({
    category: initialCategory,
    searchQuery: '',
    sortBy: 'newest'
  });
  
  // Set up categories for filter
  const categories = sections.map(section => ({
    id: section.category,
    title: section.title
  }));
  
  // Apply filtering effect when initialCategory or items change
  useEffect(() => {
    if (initialCategory !== 'all') {
      setCurrentFilters(prev => ({ ...prev, category: initialCategory }));
      applyFilters({ ...currentFilters, category: initialCategory });
    } else {
      applyFilters(currentFilters);
    }
  }, [initialCategory, items]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const applyFilters = (filters: GalleryFilterState) => {
    let filtered = [...items];
    
    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => {
        if (Array.isArray(item.category)) {
          return item.category.includes(filters.category);
        }
        return item.category === filters.category;
      });
    }
    
    // Apply search filter if there is a search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const locationMatch = item.location?.toLowerCase().includes(query) || false;
        const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(query)) || false;
        
        return titleMatch || descMatch || locationMatch || tagsMatch;
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
      } else if (filters.sortBy === 'oldest') {
        return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
      } else if (filters.sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return 0;
    });
    
    setFilteredItems(filtered);
  };
  
  const handleFilterChange = (filters: GalleryFilterState) => {
    setCurrentFilters(filters);
    applyFilters(filters);
  };
  
  const handleItemClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setSelectedItem(item);
    setCurrentIndex(index);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      const nextIndex = currentIndex + 1;
      setSelectedItem(filteredItems[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setSelectedItem(filteredItems[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };
  
  return (
    <div>
      <GalleryFilter 
        categories={categories}
        onFilterChange={handleFilterChange}
        initialFilters={currentFilters}
      />
      
      <GalleryGrid 
        items={filteredItems}
        columns={3}
        onImageClick={handleItemClick}
      />
      
      <GalleryModal 
        item={selectedItem}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={currentIndex < filteredItems.length - 1}
        hasPrevious={currentIndex > 0}
      />
    </div>
  );
};