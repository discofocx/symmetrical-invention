// src/app/galeria/page.tsx
import { Metadata } from 'next';
import { GalleryContainer } from '@/components/gallery/GalleryContainer';
import { getAllGalleryItems, getGallerySections } from '@/lib/content/gallery';

export const metadata: Metadata = {
  title: 'Galería de Proyectos - Altivento',
  description: 'Explora nuestros proyectos más destacados: bodas, eventos corporativos, sociales y más. Conoce cómo transformamos espacios para eventos inolvidables.',
};

export default function GalleryPageRoute() {
  const galleryItems = getAllGalleryItems();
  const gallerySections = getGallerySections();
  
  return (
    <>
      {/* Page Header */}
      <section className="bg-forest text-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-boska font-bold mb-4">
            Galería de Proyectos
          </h1>
          <p className="text-lg max-w-3xl">
            Explora nuestros proyectos más destacados y descubre cómo transformamos espacios para crear eventos memorables.
          </p>
        </div>
      </section>
      
      {/* Gallery Sections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryContainer 
            initialItems={galleryItems}
            initialSections={gallerySections}
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-peach/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-boska font-bold text-forest mb-4">
            ¿Buscas crear un evento memorable?
          </h2>
          <p className="max-w-3xl mx-auto mb-8">
            Nuestro equipo está listo para ayudarte a transformar tu visión en realidad. Contáctanos para una cotización personalizada.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="/contacto"
              className="bg-forest text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/90"
            >
              Contáctanos Ahora
            </a>
            <a 
              href="https://wa.me/524421234567?text=Hola,%20vi%20su%20galería%20de%20proyectos%20y%20estoy%20interesado%20en%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}