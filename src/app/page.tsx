// src/app/page.tsx (expanded)
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { getProductCategories } from '@/lib/content/products';

export default function Home() {
  // This would typically be fetched from the backend
  const categories = getProductCategories();
  
  // Sample testimonials
  const testimonials = [
    {
      quote: "Altivento transformó nuestro jardín en un espacio mágico para nuestra boda. El equipo fue profesional y la carpa quedó perfecta.",
      author: "Ana y Roberto",
      company: "Boda en Quinta El Refugio"
    },
    {
      quote: "Hemos trabajado con Altivento en múltiples eventos corporativos y siempre entregan calidad y puntualidad.",
      author: "Miguel Hernández",
      company: "Director de Eventos, Empresa XYZ"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-45/oklch from-peach via-sand to-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-boska font-bold text-forest mb-4">
                Estructuras memorables para eventos inolvidables
              </h1>
              <p className="text-lg mb-6">
                Más de 30 años creando espacios perfectos para eventos sociales y corporativos.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/productos"
                  className="bg-peach text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-peach/90"
                >
                  Explorar Productos
                </Link>
                <Link 
                  href="/contacto"
                  className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5"
                >
                  Contactar
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              {/* Placeholder for hero image */}
              <div className="aspect-[4/3] bg-forest/10 rounded-lg relative">
                {/* We'd use a real image in production */}
                <div className="absolute inset-0 flex items-center justify-center text-forest/30 text-xl">
                  Imagen Hero
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-boska font-bold text-forest mb-4">
              Nuestros Productos y Servicios
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              Ofrecemos soluciones completas para todo tipo de eventos, desde carpas elegantes hasta pistas de baile personalizadas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((category) => (
              <Card
                key={category.id}
                title={category.name}
                content={category.description}
                image={{ 
                  src: category.featuredImage || '/images/placeholder.jpg', 
                  alt: category.name 
                }}
                cta={{ 
                  text: 'Ver opciones', 
                  href: `/productos/${category.slug}` 
                }}
                variant={category.featured ? 'featured' : 'default'}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/productos"
              className="bg-forest text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/90"
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
      
      {/* Wedding Packages Highlight */}
      <section className="py-16 bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl md:text-4xl font-boska font-bold text-forest mb-4">
                Paquetes Especiales para Bodas
              </h2>
              <p className="mb-6 text-lg">
                En colaboración con Quinta El Refugio, ofrecemos paquetes completos para hacer de tu día especial un evento mágico y sin complicaciones.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Carpas elegantes con diferentes opciones de plafón</span>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Pistas de baile personalizables</span>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Estrados para novios y DJ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Iluminación arquitectónica</span>
                </li>
              </ul>
              <Link 
                href="/bodas"
                className="bg-peach text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-peach/90"
              >
                Explorar Paquetes
              </Link>
            </div>
            <div className="lg:w-1/2">
              {/* Placeholder for wedding image */}
              <div className="aspect-[4/3] bg-forest/10 rounded-lg relative">
                <div className="absolute inset-0 flex items-center justify-center text-forest/30 text-xl">
                  Imagen de Boda
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-boska font-bold text-forest mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="max-w-3xl mx-auto text-lg">
              Hemos ayudado a crear eventos memorables para cientos de clientes satisfechos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-cream p-6 rounded-lg shadow-sm">
                <blockquote className="font-boska text-lg md:text-xl text-forest italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex flex-col">
                  <span className="font-medium text-teal">{testimonial.author}</span>
                  <span className="text-forest/70">{testimonial.company}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/galeria"
              className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5"
            >
              Ver Proyectos Realizados
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-boska font-bold mb-4">
            ¿Listo para crear tu evento perfecto?
          </h2>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Contáctanos hoy para una cotización personalizada y descubre cómo podemos transformar tu visión en realidad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contacto"
              className="bg-peach text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-peach/90"
            >
              Solicitar Cotización
            </Link>
            <a 
              href="https://wa.me/524421234567?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20para%20un%20evento."
              className="bg-transparent border-2 border-cream text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-cream/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}