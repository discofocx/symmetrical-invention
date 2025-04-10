'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { OptimizedImage } from './OptimizedImage';
import Link from 'next/link';

export interface HeroSlide {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplayInterval?: number;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ 
  slides,
  autoplayInterval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slideCount = slides.length;
  
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);
  
  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Restart autoplay after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left, go to next slide
      goToNextSlide();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right, go to previous slide
      goToPrevSlide();
    }
    
    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Autoplay functionality
  useEffect(() => {
    let autoplayTimer: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      autoplayTimer = setInterval(goToNextSlide, autoplayInterval);
    }
    
    return () => {
      clearInterval(autoplayTimer);
    };
  }, [goToNextSlide, autoplayInterval, isAutoPlaying]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextSlide, goToPrevSlide]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-none w-full">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-boska font-bold text-forest mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg mb-6">
                    {slide.description}
                  </p>
                  <div className="flex space-x-4">
                    {slide.ctaPrimary && (
                      <Link 
                        href={slide.ctaPrimary.href}
                        className="bg-peach text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-peach/90"
                      >
                        {slide.ctaPrimary.text}
                      </Link>
                    )}
                    {slide.ctaSecondary && (
                      <Link 
                        href={slide.ctaSecondary.href}
                        className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5"
                      >
                        {slide.ctaSecondary.text}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="aspect-[4/3] bg-forest/10 rounded-lg relative overflow-hidden">
                    <OptimizedImage 
                      src={slide.image.src}
                      alt={slide.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                      fallbackSrc="/images/placeholders/hero/placeholder.svg"
                      priority={index === 0} // Only prioritize the first slide
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={goToPrevSlide}
          className="bg-cream/20 hover:bg-cream/40 text-forest p-2 rounded-r-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-peach"
          aria-label="Slide anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={goToNextSlide}
          className="bg-cream/20 hover:bg-cream/40 text-forest p-2 rounded-l-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-peach"
          aria-label="Siguiente slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-peach' : 'bg-cream/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};