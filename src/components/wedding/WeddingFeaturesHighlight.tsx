import React from 'react';

// Feature data type
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Sample feature data with SVG icons
const features: Feature[] = [
  {
    id: '1',
    title: 'Colaboración Exclusiva',
    description: 'Nuestro partnership con Quinta El Refugio te asegura precios especiales y una coordinación perfecta entre espacio e infraestructura.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: '2',
    title: 'Diseño Personalizado',
    description: 'Adaptamos cada elemento a tu estilo personal, desde carpas transparentes hasta pistas de baile con diseños únicos.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: '3',
    title: 'Experiencia Comprobada',
    description: 'Con más de 30 años en el mercado, nuestro equipo garantiza un montaje perfecto y atención a cada detalle de tu evento.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  {
    id: '4',
    title: 'Solución Integral',
    description: 'Desde la carpa hasta la iluminación, ofrecemos todos los elementos estructurales para que tu boda sea perfecta.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
];

// Highlight images type
interface HighlightImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

// Sample highlight images (placeholders)
const highlightImages: HighlightImage[] = [
  {
    id: '1',
    src: '/images/wedding-highlight-1.jpg', // These would be actual image paths in a real implementation
    alt: 'Carpa transparente al atardecer',
    caption: 'Carpa transparente con iluminación'
  },
  {
    id: '2',
    src: '/images/wedding-highlight-2.jpg',
    alt: 'Montaje de boda con iluminación especial',
    caption: 'Iluminación arquitectónica'
  },
  {
    id: '3',
    src: '/images/wedding-highlight-3.jpg',
    alt: 'Pista de baile personalizada',
    caption: 'Pista de baile con diseño'
  }
];

export default function WeddingFeaturesHighlight() {
  return (
    <div>
      {/* Features section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="text-peach mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-medium text-forest mb-2">{feature.title}</h3>
            <p className="text-forest/80">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Highlighted images section */}
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlightImages.map((image) => (
            <div 
              key={image.id}
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              {/* In a real implementation, use Next.js Image component for optimized images */}
              <div className="aspect-[4/3] bg-teal/20 flex items-center justify-center">
                <span className="text-teal">{image.alt}</span>
                {/* This would be the actual image: */}
                {/* <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                /> */}
              </div>
              
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest/70 to-transparent p-4">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}