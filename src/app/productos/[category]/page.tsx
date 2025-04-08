import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/content/products';

interface CategoryPageProps {
  params: {
    category: string;
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Categoría no encontrada - Altivento',
    };
  }
  
  return {
    title: `${category.name} - Altivento`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Use our resolver to find the category
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }
  
  // Use the category ID to get products
  const products = getProductsByCategory(category.id);
  
  return (
    <>
      {/* Page Header */}
      <section className="bg-forest text-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <a href="/productos" className="text-cream/80 hover:text-cream transition-colors">
              Productos
            </a>
            <span className="mx-2 text-cream/50">/</span>
            <span>{category.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-boska font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-lg max-w-3xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-boska font-bold text-forest mb-4">
                No se encontraron productos
              </h2>
              <p className="text-forest/80 mb-6">
                No hay productos disponibles en esta categoría en este momento.
              </p>
              <a 
                href="/productos"
                className="bg-peach text-forest px-4 py-2 rounded-full font-medium transition-colors hover:bg-peach/90"
              >
                Ver todas las categorías
              </a>
            </div>
          )}
        </div>
      </section>
     
     {/* Category Features */}
     {category.id === 'carpas' && (
       <section className="py-12 bg-sand/30">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-boska font-bold text-forest mb-8 text-center">
             Características de Nuestras Carpas
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="bg-cream p-6 rounded-lg">
               <div className="text-peach mb-4 text-4xl">
                 {/* Icon placeholder */}
                 <div className="w-12 h-12 bg-peach/20 rounded-lg flex items-center justify-center">
                   <span className="text-2xl">⛺</span>
                 </div>
               </div>
               <h3 className="font-boska text-xl mb-2">Variedad de Tamaños</h3>
               <p>Disponibles en anchos de 10, 15 y 20 metros, con largos en incrementos de 5 metros.</p>
             </div>
             <div className="bg-cream p-6 rounded-lg">
               <div className="text-peach mb-4 text-4xl">
                 <div className="w-12 h-12 bg-peach/20 rounded-lg flex items-center justify-center">
                   <span className="text-2xl">🏗️</span>
                 </div>
               </div>
               <h3 className="font-boska text-xl mb-2">Altura Flexible</h3>
               <p>Opciones de altura estándar de 4 o 5 metros, adaptables a sus necesidades.</p>
             </div>
             <div className="bg-cream p-6 rounded-lg">
               <div className="text-peach mb-4 text-4xl">
                 <div className="w-12 h-12 bg-peach/20 rounded-lg flex items-center justify-center">
                   <span className="text-2xl">🎨</span>
                 </div>
               </div>
               <h3 className="font-boska text-xl mb-2">Opciones de Plafón</h3>
               <p>Múltiples estilos de plafón: liso, en V plisado, en olas, de botón y transparente.</p>
             </div>
             <div className="bg-cream p-6 rounded-lg">
               <div className="text-peach mb-4 text-4xl">
                 <div className="w-12 h-12 bg-peach/20 rounded-lg flex items-center justify-center">
                   <span className="text-2xl">✨</span>
                 </div>
               </div>
               <h3 className="font-boska text-xl mb-2">Personalización</h3>
               <p>Posibilidad de integrar iluminación, decoración y otros elementos según su evento.</p>
             </div>
           </div>
         </div>
       </section>
     )}

     {/* CTA Section */}
     <section className="py-12 bg-peach/20">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         <h2 className="text-3xl font-boska font-bold text-forest mb-4">
           ¿Interesado en nuestros {category.name.toLowerCase()}?
         </h2>
         <p className="max-w-3xl mx-auto mb-8">
           Contáctanos para una cotización personalizada basada en tus necesidades específicas.
         </p>
         <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
           <a 
             href="/contacto"
             className="bg-forest text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/90"
           >
             Solicitar Cotización
           </a>
           <a 
             href="https://wa.me/524421234567?text=Hola,%20estoy%20interesado%20en%20sus%20productos%20de%20la%20categoría%20de%20carpas."
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