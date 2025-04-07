// src/components/ui/Card.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  content: string;
  image?: {
    src: string;
    alt: string;
  };
  cta?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'featured' | 'minimal';
}

export const Card: React.FC<CardProps> = ({
  title,
  content,
  image,
  cta,
  variant = 'default'
}) => {
  const cardClasses = {
    default: "bg-cream rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md",
    featured: "bg-cream rounded-lg overflow-hidden shadow-sm border-2 border-peach transition-shadow duration-300 hover:shadow-md",
    minimal: "bg-cream rounded-lg overflow-hidden"
  };

  return (
    <div className={cardClasses[variant]}>
      {image && (
        <div className="aspect-[4/3] relative">
          <Image 
            src={image.src} 
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4 md:p-6">
        <h3 className="font-boska text-xl text-forest mb-2">{title}</h3>
        <p className="text-forest/80 mb-4 line-clamp-3">{content}</p>
        {cta && (
          <div className="mt-auto">
            <Link 
              href={cta.href}
              className="font-medium text-peach hover:text-peach/80 transition-colors"
            >
              {cta.text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};