// src/components/gallery/FeaturedGallery.tsx
import React from 'react';
import Link from 'next/link';
import { GalleryItem } from '@/types/gallery';

interface FeaturedGalleryProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
  maxItems?: number;
}

export const FeaturedGallery: React.FC<FeaturedGalleryProps> = ({
  items,
  title = "Proyectos Destacados",
  description = "Explora algunos de nuestros eventos más recientes y emblemáticos.",
  maxItems = 4
}) => {
  const displayItems = items.slice(0, maxItems);
  
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-boska font-bold text-forest mb-4">
            {title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-forest/80">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square bg-forest/10 overflow-hidden">
                {/* Placeholder or actual image */}
                <div className="w-full h-full flex items-center justify-center group-hover:bg-forest/20 transition-colors">
                  <span className="text-forest/30 text-lg">{item.title}</span>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-cream font-boska text-lg">{item.title}</h3>
                <p className="text-cream/80 text-sm truncate">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/galeria"
            className="bg-peach text-forest px-6 py-3 rounded-full font-medium hover:bg-peach/90 transition-colors inline-block"
          >
            Ver Galería Completa
          </Link>
        </div>
      </div>
    </section>
  );
};