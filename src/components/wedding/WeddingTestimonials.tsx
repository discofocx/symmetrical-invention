import React from 'react';
import Image from 'next/image';

// Testimonial data type
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image?: string;
  packageUsed?: string;
}

// Sample testimonial data
const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'La carpa transparente de noche fue mágica. Todos nuestros invitados quedaron impresionados con lo hermoso que se veía el cielo estrellado.',
    author: 'Ana y Carlos',
    role: 'Novios',
    packageUsed: 'Boda Premium'
  },
  {
    id: '2',
    quote: 'El equipo de Altivento fue increíblemente profesional. La instalación fue perfecta y todo estuvo listo incluso antes de lo prometido.',
    author: 'Mariana Rodríguez',
    role: 'Wedding Planner',
    packageUsed: 'Boda de Lujo'
  },
  {
    id: '3',
    quote: 'La relación calidad-precio es excelente. El paquete Plus nos dio todo lo que necesitábamos para nuestra boda íntima sin exceder nuestro presupuesto.',
    author: 'Roberto y Claudia',
    role: 'Novios',
    packageUsed: 'Boda Plus'
  }
];

export default function WeddingTestimonials() {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="bg-cream rounded-lg shadow-sm p-6 flex flex-col"
          >
            <div className="mb-4">
              <svg className="w-8 h-8 text-peach" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-forest italic mb-6 flex-grow font-boska">{testimonial.quote}</p>
            <div className="mt-auto">
              <div className="flex items-center">
                {testimonial.image ? (
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-peach/20 flex items-center justify-center mr-4">
                    <span className="text-peach font-medium">
                      {testimonial.author.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium text-forest">{testimonial.author}</div>
                  <div className="text-sm text-forest/70 flex flex-col sm:flex-row sm:items-center">
                    <span>{testimonial.role}</span>
                    {testimonial.packageUsed && (
                      <>
                        <span className="hidden sm:inline mx-1">•</span>
                        <span className="text-peach">{testimonial.packageUsed}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}