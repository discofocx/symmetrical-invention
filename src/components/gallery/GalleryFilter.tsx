'use client';
// src/components/gallery/GalleryFilter.tsx
import React, { useState, useEffect } from 'react';
import { GalleryCategory, GalleryFilterState } from '@/types/gallery';

interface GalleryFilterProps {
  onFilterChange: (filters: GalleryFilterState) => void;
  categories: {
    id: GalleryCategory;
    title: string;
  }[];
  initialFilters?: GalleryFilterState;
}

export const GalleryFilter: React.FC<GalleryFilterProps> = ({
  onFilterChange,
  categories,
  initialFilters = { category: 'all', searchQuery: '', sortBy: 'newest' }
}) => {
  const [filters, setFilters] = useState<GalleryFilterState>(initialFilters);
  
  // Update local filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);
  
  const handleCategoryChange = (category: GalleryCategory) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    const newFilters = { ...filters, searchQuery };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value as 'newest' | 'oldest' | 'featured';
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <div className="bg-cream rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.category === 'all'
                ? 'bg-forest text-cream'
                : 'bg-forest/10 text-forest hover:bg-forest/20'
            }`}
            onClick={() => handleCategoryChange('all')}
          >
            Todos
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === category.id
                  ? 'bg-forest text-cream'
                  : 'bg-forest/10 text-forest hover:bg-forest/20'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
        
        {/* Search and sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-auto px-4 py-2 pl-9 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-forest/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50 bg-white text-forest"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="featured">Destacados</option>
          </select>
        </div>
      </div>
    </div>
  );
};