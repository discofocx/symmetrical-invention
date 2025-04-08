import React from 'react';
import type { WeddingPackageData } from '@/types/wedding-packages-types';
import { formatPrice } from '@/lib/utils/formatting';

interface WeddingPackageComparisonProps {
  packageData: WeddingPackageData;
  onSelectPackage: (packageId: string) => void;
}

export default function WeddingPackageComparison({ 
  packageData,
  onSelectPackage
}: WeddingPackageComparisonProps) {
  // Using the shared formatting utility for consistency

  // Get the base pricing for 150 guests to display in the comparison
  const getBasePrice = (packageId: string) => {
    const pkg = packageData.packages.find(p => p.id === packageId);
    return pkg ? pkg.basePrice["150"] : 0;
  };

  // Pre-process the feature data to ensure consistency
  const baseFeatureCount = packageData.packages[0].features.length;
  
  // Find the maximum number of features across all packages
  const maxFeatures = Math.max(...packageData.packages.map(pkg => pkg.features.length));
  
  // Create an array of feature indices to render
  const featureIndices = Array.from({ length: baseFeatureCount }, (_, i) => i);
  const extraFeatureIndices = maxFeatures > baseFeatureCount 
    ? Array.from({ length: Math.min(maxFeatures - baseFeatureCount, 5) }, (_, i) => i + baseFeatureCount)
    : [];

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-forest text-white text-left">
            <th className="py-4 px-6 font-semibold">Características</th>
            {packageData.packages.map(pkg => (
              <th key={pkg.id} className="py-4 px-6 font-semibold">{pkg.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Price row */}
          <tr className="border-b border-gray-200">
            <td className="py-4 px-6 font-medium text-forest">Precio base (150 invitados)</td>
            {packageData.packages.map(pkg => (
              <td key={pkg.id} className="py-4 px-6">
                <div className="font-bold text-lg text-forest">
                  {formatPrice(getBasePrice(pkg.id))}
                </div>
                <div className="text-sm text-forest/70">+ {formatPrice(packageData.venue.price)} del espacio</div>
              </td>
            ))}
          </tr>
          
          {/* Basic features - all packages have these */}
          {featureIndices.map((featureIndex) => (
            <tr key={`feature-${featureIndex}`} className="border-b border-gray-200">
              <td className="py-3 px-6 font-medium text-forest">
                {featureIndex === 0 ? 'Características' : ''}
              </td>
              {packageData.packages.map(pkg => (
                <td key={pkg.id} className="py-3 px-6 text-forest">
                  {pkg.features[featureIndex] || '-'}
                </td>
              ))}
            </tr>
          ))}
          
          {/* Extra features - only higher tier packages might have these */}
          {extraFeatureIndices.map((featureIndex) => (
            <tr key={`extra-feature-${featureIndex}`} className="border-b border-gray-200">
              <td className="py-3 px-6 font-medium text-forest">
                {featureIndex === baseFeatureCount ? 'Adicionales' : ''}
              </td>
              {packageData.packages.map(pkg => (
                <td key={pkg.id} className="py-3 px-6 text-forest">
                  {pkg.features.length > featureIndex ? pkg.features[featureIndex] : '-'}
                </td>
              ))}
            </tr>
          ))}
          
          {/* Action row */}
          <tr>
            <td className="py-6 px-6"></td>
            {packageData.packages.map((pkg) => {
              // Pre-determine the class name to ensure consistency
              const buttonClassName = pkg.id === 'premium' || pkg.id === 'lujo'
                ? 'px-4 py-2 rounded-full text-sm font-medium transition-colors bg-peach text-forest hover:bg-peach/90'
                : 'px-4 py-2 rounded-full text-sm font-medium transition-colors border border-forest text-forest hover:bg-forest/5';
                
              return (
                <td key={pkg.id} className="py-6 px-6">
                  <button 
                    onClick={() => onSelectPackage(pkg.id)}
                    className={buttonClassName}
                  >
                    Seleccionar
                  </button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}