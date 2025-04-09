// src/components/products/ProductCard.tsx (update)

import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/lib/content/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, description, images, category, pricing } = product;
  
  // Create proper slugs for routing with our utility function
  const productSlug = slugify(id);
  
  // For the category slug, use our utility function
  const categorySlug = slugify(category);

  return (
    <div className="bg-cream rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md group">
      <div className="aspect-[4/3] relative overflow-hidden">
        {images && images.length > 0 ? (
          <Image 
            src={images[0].startsWith('/images/placeholders/') ? images[0] : 
                 images[0].startsWith('/images/') ? '/images/placeholders/products/placeholder.svg' : images[0]}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-forest/5 flex items-center justify-center">
            <Image 
              src="/images/placeholders/products/placeholder.svg"
              alt={name || 'Producto'}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        )}
      </div>
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-boska text-xl text-forest">{name}</h3>
          {pricing && (
            <span className="bg-peach/20 text-forest px-2 py-1 rounded text-sm">
              {pricing.pricePerUnit ? `$${pricing.pricePerUnit}/${pricing.unit}` : 'Consultar precio'}
            </span>
          )}
        </div>
        <p className="text-forest/80 mb-4 line-clamp-3">{description}</p>
        <div className="mt-auto">
          <Link 
            href={`/productos/${categorySlug}/${productSlug}`}
            className="font-medium text-peach hover:text-peach/80 transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};