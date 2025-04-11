// src/components/products/CategoriesGrid.tsx
import React from 'react';
import Link from 'next/link';
import { ProductCategory } from '@/types/product';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface CategoriesGridProps {
  categories: ProductCategory[];
  columns?: 2 | 3 | 4;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  categories,
  columns = 3
}) => {
  // Define grid columns based on the columns prop
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-boska text-forest">No hay categorías disponibles</h3>
        <p className="text-forest/70 mt-2">Intenta más tarde</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {categories.map((category) => (
        <Link 
          key={category.id}
          href={`/productos/${category.slug}`}
          className="group"
        >
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
            <div className="aspect-[16/9] relative overflow-hidden">
              <OptimizedImage
                src={category.featuredImage}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                imageType="category"
              />
            </div>
            <div className="p-6">
              <h2 className="font-boska text-2xl text-forest mb-2">{category.name}</h2>
              <p className="text-forest/80 mb-4">{category.description}</p>
              <span className="font-medium text-peach group-hover:text-peach/80 transition-colors flex items-center">
                Explorar opciones
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
