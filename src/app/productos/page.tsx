// src/app/productos/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductCategories } from '@/lib/content/products';
import { CategoriesGrid } from '@/components/products/CategoriesGrid';

export const metadata: Metadata = {
  title: 'Productos y Servicios - Altivento',
  description: 'Explora nuestra amplia gama de productos para eventos, desde carpas hasta pistas de baile y servicios especiales.',
};

export default function ProductsPage() {
  const categories = getProductCategories();

  return (
    <>
      {/* Page Header */}
      <section className="bg-forest text-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-boska font-bold mb-4">
            Productos y Servicios
          </h1>
          <p className="text-lg max-w-3xl">
            Ofrecemos soluciones completas para todo tipo de eventos, con productos de alta calidad y servicio profesional.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoriesGrid categories={categories} columns={3} />
        </div>
      </section>

      {/* Service Guarantee */}
      <section className="py-12 bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-boska font-bold text-forest mb-4">
                Nuestro Compromiso de Calidad
              </h2>
              <p className="mb-4">
                En Altivento, cada producto y servicio está respaldado por más de 30 años de experiencia en el sector de eventos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Materiales de alta calidad y mantenimiento constante</span>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Instalación profesional por personal experimentado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Asesoría personalizada para cada tipo de evento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-peach mr-2">✓</span>
                  <span>Soluciones a medida para espacios y necesidades específicas</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              {/* Placeholder for quality image */}
              <div className="aspect-[4/3] bg-forest/10 rounded-lg relative">
                <div className="absolute inset-0 flex items-center justify-center text-forest/30 text-xl">
                  Imagen de Instalación
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-peach/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-boska font-bold text-forest mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="max-w-3xl mx-auto mb-8">
            Nuestro equipo está listo para asesorarte y encontrar las mejores opciones para tu evento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/contacto"
              className="bg-forest text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/90"
            >
              Contactar Ahora
            </Link>
            <Link
              href="/faq"
              className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5"
            >
              Ver Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}