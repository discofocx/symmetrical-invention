import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { getCategoryBySlug, getProductBySlug, getRelatedProducts } from '@/lib/content/products';

interface ProductPageProps {
  params: {
    category: string;
    product: string;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.product);
  
  if (!product) {
    return {
      title: 'Producto no encontrado - Altivento',
    };
  }
  
  return {
    title: `${product.name} - Altivento`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Use our resolver to find the product
  const product = getProductBySlug(params.product);
  
  if (!product) {
    console.error(`Product not found: ${params.product}`);
    notFound();
  }
  
  // Ensure we have the correct category
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    console.error(`Category not found: ${params.category}`);
    notFound();
  }
  
  // Get the related products
  const relatedProducts = getRelatedProducts(product.id, 4);
  
  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-cream border-b border-forest/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm">
            <Link href="/productos" className="text-forest/70 hover:text-forest transition-colors">
              Productos
            </Link>
            <span className="mx-2 text-forest/50">/</span>
            <Link href={`/productos/${category.slug}`} className="text-forest/70 hover:text-forest transition-colors">
              {category.name}
            </Link>
            <span className="mx-2 text-forest/50">/</span>
            <span className="text-forest">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-[4/3] relative bg-forest/5 rounded-lg mb-4">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0].startsWith('/images/placeholders/') ? product.images[0] : 
                         product.images[0].startsWith('/images/') ? '/images/placeholders/products/placeholder.svg' : product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-forest/30 bg-forest/5 rounded-lg">
                    <Image 
                      src="/images/placeholders/products/placeholder.svg"
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square relative bg-forest/5 rounded-lg"
                    >
                      <Image
                        src={image.startsWith('/images/placeholders/') ? image : 
                             image.startsWith('/images/') ? '/images/placeholders/products/placeholder.svg' : image}
                        alt={`${product.name} - Vista ${index + 2}`}
                        fill
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-boska font-bold text-forest mb-4">
                {product.name}
              </h1>

              {product.pricing && (
                <div className="mb-6">
                  <span className="bg-peach/20 text-forest px-3 py-1.5 rounded-full text-lg">
                    {product.pricing.pricePerUnit
                      ? `$${product.pricing.pricePerUnit}/${product.pricing.unit}`
                      : "Consultar precio"}
                  </span>
                </div>
              )}

              <div className="prose prose-forest mb-8">
                <p className="text-lg">{product.description}</p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-xl font-boska font-bold text-forest mb-4">
                  Especificaciones
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key}>
                        <dt className="text-forest/70 mb-1 capitalize">
                          {key}
                        </dt>
                        <dd className="text-forest font-medium">{value}</dd>
                      </div>
                    )
                  )}
                </dl>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-boska font-bold text-forest mb-4">
                    Características
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-peach mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <Link
                  href="/contacto?product=carpa-plafon-liso-blanco"
                  className="bg-forest text-cream px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/90 text-center"
                >
                  Solicitar Cotización
                </Link>
                <a
                  href={`https://wa.me/524421234567?text=Hola,%20estoy%20interesado%20en%20${encodeURIComponent(
                    product.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5 text-center"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Renting Conditions */}
      <section className="py-12 bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-boska font-bold text-forest mb-6 text-center">
            Condiciones de Renta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-boska text-xl mb-3">Reservación</h3>
              <p>
                La reservación se confirma con un anticipo del 30%. El saldo
                total debe cubrirse dos días antes del evento.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-boska text-xl mb-3">Instalación</h3>
              <p>
                La instalación suele realizarse 1 o 2 días antes del evento. La
                desinstalación normalmente ocurre el día siguiente.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-boska text-xl mb-3">Fletes</h3>
              <p>
                Se cobra flete adicional para instalaciones fuera de un radio de
                25 km desde la ciudad de Querétaro.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-forest font-medium hover:text-peach transition-colors"
            >
              Ver todas las condiciones y preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-boska font-bold text-forest mb-6">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
