'use client';
// src/components/gallery/GalleryModal.tsx
import React, { useEffect, useState } from 'react';
import { GalleryItem } from '@/types/gallery';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface GalleryModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  item,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by rendering modal only after component has mounted
  useEffect(() => {
    setIsMounted(true);

    // Add keydown event listener for navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Handle body scroll lock
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, hasNext, hasPrevious, onNext, onPrevious]);

  if (!isMounted || !isOpen || !item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-forest/90 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="text-cream hover:text-peach transition-colors p-2"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="w-full max-w-5xl">
        {/* Gallery content */}
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-2/3 relative">
            <div className="aspect-[4/3] relative overflow-hidden bg-forest/20 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
              <OptimizedImage
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-contain"
                imageType="gallery"
              />
            </div>

            {/* Navigation arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="bg-cream/20 hover:bg-cream/40 text-cream rounded-r-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-peach"
                  aria-label="Imagen anterior"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              {hasNext && (
                <button
                  onClick={onNext}
                  className="bg-cream/20 hover:bg-cream/40 text-cream rounded-l-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-peach"
                  aria-label="Siguiente imagen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/3 bg-cream p-6 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
            <h3 className="font-boska text-2xl text-forest mb-3">{item.title}</h3>
            <p className="text-forest/80 mb-4">{item.description}</p>

            <div className="space-y-3 border-t border-forest/10 pt-4">
              {item.category && (
                <div className="flex items-start">
                  <span className="text-forest/70 font-medium w-24">Categoría:</span>
                  <span className="text-forest">
                    {Array.isArray(item.category)
                      ? item.category.map(c => capitalizeFirstLetter(c)).join(', ')
                      : capitalizeFirstLetter(item.category)
                    }
                  </span>
                </div>
              )}

              {item.date && (
                <div className="flex items-start">
                  <span className="text-forest/70 font-medium w-24">Fecha:</span>
                  <span className="text-forest">{formatDate(item.date)}</span>
                </div>
              )}

              {item.location && (
                <div className="flex items-start">
                  <span className="text-forest/70 font-medium w-24">Ubicación:</span>
                  <span className="text-forest">{item.location}</span>
                </div>
              )}
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="mt-5">
                <h4 className="text-sm text-forest/70 font-medium mb-2">Elementos:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-peach/10 text-forest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}