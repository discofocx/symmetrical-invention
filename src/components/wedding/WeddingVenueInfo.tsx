import React from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { VenueInfo } from '@/types/wedding-packages-types';
import { formatPrice } from '@/lib/utils/formatting';

interface WeddingVenueInfoProps {
  venue: VenueInfo;
}

export default function WeddingVenueInfo({ venue }: WeddingVenueInfoProps) {
  // Using the shared formatting utility

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          {venue.image ? (
            <OptimizedImage 
              src={venue.image} 
              alt={venue.name} 
              fill
              className="w-full h-full object-cover"
              imageType="general"
            />
          ) : (
            <div className="bg-teal/20 w-full h-full min-h-60 flex items-center justify-center">
              <span className="text-teal font-medium">Imagen de {venue.name}</span>
            </div>
          )}
        </div>
        <div className="p-6 md:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-forest">{venue.name}</h2>
            <div className="bg-peach/10 px-3 py-1 rounded text-forest font-medium">
              Desde {formatPrice(venue.basePrice)}
            </div>
          </div>
          
          <p className="text-forest/80 mb-4">{venue.description}</p>
          
          <h3 className="font-medium text-forest mb-2">Incluye:</h3>
          <ul className="list-disc list-inside text-forest/80 space-y-1">
            {venue.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <div className="mt-6">
            <p className="text-sm text-forest/70 italic">
              Precio base para 150 invitados. ${venue.pricePerExtraPax} MXN por cada invitado adicional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}