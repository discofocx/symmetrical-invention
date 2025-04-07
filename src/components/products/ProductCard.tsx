// src/components/products/ProductCard.tsx
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, description, images, category, pricing } = product;
  const slug = id.toLowerCase().replace(/ /g, '-');
  const categorySlug = category.toLowerCase().replace(/ /g, '-');

  return (
    <div className="bg-cream rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md group">
      {images && images.length > 0 && (
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image 
            src={images[0]} 
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
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
            href={`/productos/${categorySlug}/${slug}`}
            className="font-medium text-peach hover:text-peach/80 transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};