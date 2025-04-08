// src/components/gallery/GalleryGrid.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryItem } from '@/types/gallery';

interface GalleryGridProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  showDetails?: boolean;
  onImageClick?: (item: GalleryItem) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  columns = 3,
  showDetails = true,
  onImageClick
}) => {
  // Define grid columns based on the columns prop
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-boska text-forest">No hay imágenes que mostrar</h3>
        <p className="text-forest/70 mt-2">Intenta con otros filtros o categorías</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 md:gap-8`}>
      {items.map((item) => (
        <div 
          key={item.id} 
          className="group bg-cream rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="aspect-square relative overflow-hidden cursor-pointer">
            {/* Use placeholder until real images are available */}
            <div 
              className="w-full h-full bg-forest/10 flex items-center justify-center hover:bg-forest/20 transition-colors"
              onClick={() => onImageClick && onImageClick(item)}
            >
              {/* If we have an actual image URL */}
              {item.imageSrc.startsWith('/images/') ? (
                <div className="absolute inset-0 bg-forest/5 flex items-center justify-center">
                  <span className="text-forest/30 text-lg">{item.title}</span>
                </div>
              ) : (
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
          </div>
          
          {showDetails && (
            <div className="p-4">
              <h3 className="font-boska text-xl text-forest mb-2">{item.title}</h3>
              <p className="text-forest/80 text-sm line-clamp-2 mb-2">{item.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-forest/60">
                  {item.location && (
                    <div className="flex items-center">
                      <span className="text-peach mr-1">•</span>
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  className="text-peach hover:text-peach/80 font-medium text-sm transition-colors"
                  onClick={() => onImageClick && onImageClick(item)}
                >
                  Ver detalles
                </button>
              </div>
              
              {item.tags && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-peach/10 text-forest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};