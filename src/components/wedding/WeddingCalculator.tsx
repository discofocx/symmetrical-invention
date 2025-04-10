'use client';
import React, { useState, useEffect } from 'react';
import type { WeddingPackageData, CalculatorState, CalculationResult } from '@/types/wedding-packages-types';
import { formatPrice } from '@/lib/utils/formatting';
import Link from 'next/link';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

interface WeddingCalculatorProps {
  packageData: WeddingPackageData;
}

export default function WeddingCalculator({ packageData }: WeddingCalculatorProps) {
  // For client-side hydration, use a ref to track if component is mounted
  const isMounted = React.useRef(false);
  
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    selectedPackage: packageData.packages[0].id,
    guestCount: packageData.guestCountOptions[0],
    selectedAddOns: []
  });
  
  // Initialize with zeros to ensure server and client render the same thing initially
  const [calculationResult, setCalculationResult] = useState<CalculationResult>({
    packagePrice: 0,
    venuePrice: 0,
    addOnsPrice: 0,
    totalPrice: 0
  });

  // Add animation state for price changes
  const [isAnimating, setIsAnimating] = useState(false);

  // Set the mounted flag on client side and initialize calculation
  useEffect(() => {
    // Use a separate initialization effect that only runs once on mount
    if (typeof window !== 'undefined') {
      isMounted.current = true;
      
      // Initialize the calculation once on the client side
      const selectedPackage = packageData.packages.find(pkg => pkg.id === calculatorState.selectedPackage);
      const guestCountKey = calculatorState.guestCount.toString();
      
      const packagePrice = selectedPackage 
        ? selectedPackage.basePrice[guestCountKey] || 0 
        : 0;
      
      const addOnsPrice = calculatorState.selectedAddOns.reduce((total, addOnId) => {
        const addOn = packageData.addOns.find(item => item.id === addOnId);
        return total + (addOn ? addOn.price : 0);
      }, 0);
      
      const totalPrice = packagePrice + packageData.venue.price + addOnsPrice;
      
      // Delay the update slightly to avoid hydration mismatch
      setTimeout(() => {
        setCalculationResult({
          packagePrice,
          venuePrice: packageData.venue.price,
          addOnsPrice,
          totalPrice
        });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate totals whenever the calculator state changes
  useEffect(() => {
    // Skip calculation during server-side rendering or first client render
    if (typeof window === 'undefined' || !isMounted.current) {
      return;
    }

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    const selectedPackage = packageData.packages.find(pkg => pkg.id === calculatorState.selectedPackage);
    const guestCountKey = calculatorState.guestCount.toString();
    
    const packagePrice = selectedPackage 
      ? selectedPackage.basePrice[guestCountKey] || 0 
      : 0;
    
    const addOnsPrice = calculatorState.selectedAddOns.reduce((total, addOnId) => {
      const addOn = packageData.addOns.find(item => item.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    
    const totalPrice = packagePrice + packageData.venue.price + addOnsPrice;
    
    setCalculationResult({
      packagePrice,
      venuePrice: packageData.venue.price,
      addOnsPrice,
      totalPrice
    });
  }, [calculatorState, packageData]);

  // Handle package selection
  const handlePackageChange = (packageId: string) => {
    setCalculatorState({
      ...calculatorState,
      selectedPackage: packageId
    });
  };

  // Handle guest count change
  const handleGuestCountChange = (count: number) => {
    setCalculatorState({
      ...calculatorState,
      guestCount: count
    });
  };

  // Handle add-on toggle
  const handleAddOnToggle = (addOnId: string) => {
    setCalculatorState(prevState => {
      const isSelected = prevState.selectedAddOns.includes(addOnId);
      const selectedAddOns = isSelected
        ? prevState.selectedAddOns.filter(id => id !== addOnId)
        : [...prevState.selectedAddOns, addOnId];
        
      return {
        ...prevState,
        selectedAddOns
      };
    });
  };

  // Find the selected package
  const selectedPackage = packageData.packages.find(
    pkg => pkg.id === calculatorState.selectedPackage
  );

  // Generate query parameters for contact form
  const getContactLinkWithParams = () => {
    const params = new URLSearchParams();
    
    // Add selected package
    if (selectedPackage) {
      params.append('package', selectedPackage.name);
    }
    
    // Add guest count
    params.append('guests', calculatorState.guestCount.toString());
    
    // Add selected add-ons
    if (calculatorState.selectedAddOns.length > 0) {
      const addOnNames = calculatorState.selectedAddOns
        .map(id => packageData.addOns.find(addon => addon.id === id)?.name)
        .filter(Boolean)
        .join(', ');
      
      params.append('addons', addOnNames);
    }
    
    // Add estimated budget
    params.append('budget', calculationResult.totalPrice.toString());
    
    return `/contacto?${params.toString()}`;
  };

  // Function to get icons for package tiers
  const getPackageIcon = (packageId: string) => {
    switch(packageId) {
      case 'esencial':
        return '✦';
      case 'plus':
        return '✦✦';
      case 'premium':
        return '✦✦✦';
      case 'lujo':
        return '✦✦✦✦';
      default:
        return '✦';
    }
  };

  return (
    <div className="rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto bg-cream">
      <div className="bg-forest p-4 text-cream">
        <h2 className="text-2xl font-boska font-bold mb-1 text-center">Calcula el presupuesto para tu boda</h2>
        <p className="text-center text-cream/80 text-sm">Personaliza tu paquete y recibe una cotización detallada</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            {/* Step 1: Package Selection */}
            <div className="mb-8 bg-sand/20 p-5 rounded-lg">
              <h3 className="text-xl font-boska font-bold text-forest mb-4 flex items-center">
                <span className="bg-peach/30 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-forest font-bold">1</span>
                Selecciona tu paquete
              </h3>
              <div className="space-y-4">
                {packageData.packages.map(pkg => (
                  <div 
                    key={pkg.id} 
                    className={`flex items-start p-4 rounded-lg transition-colors border ${
                      calculatorState.selectedPackage === pkg.id 
                        ? 'border-peach bg-peach/10' 
                        : 'border-forest/10 hover:bg-sand/30'
                    }`}
                  >
                    <input
                      type="radio"
                      id={`package-${pkg.id}`}
                      name="package"
                      checked={calculatorState.selectedPackage === pkg.id}
                      onChange={() => handlePackageChange(pkg.id)}
                      className="mt-1"
                    />
                    <label 
                      htmlFor={`package-${pkg.id}`}
                      className="ml-3 cursor-pointer flex-1"
                    >
                      <div className="flex items-center">
                        <span className="font-boska font-bold text-forest text-lg">{pkg.name}</span>
                        <span className="ml-2 text-peach">{getPackageIcon(pkg.id)}</span>
                      </div>
                      <div className="text-forest/80 text-sm mt-1">{pkg.description}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Step 2: Guest Count */}
            <div className="mb-8 bg-sand/20 p-5 rounded-lg">
              <h3 className="text-xl font-boska font-bold text-forest mb-4 flex items-center">
                <span className="bg-peach/30 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-forest font-bold">2</span>
                Número de invitados
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {packageData.guestCountOptions.map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleGuestCountChange(count)}
                    className={`py-3 rounded-lg transition-colors border ${
                      calculatorState.guestCount === count
                        ? 'bg-peach text-forest font-medium border-peach'
                        : 'bg-white text-forest hover:bg-sand/30 border-forest/10'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Step 3: Add-ons */}
            <div className="bg-sand/20 p-5 rounded-lg">
              <h3 className="text-xl font-boska font-bold text-forest mb-4 flex items-center">
                <span className="bg-peach/30 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-forest font-bold">3</span>
                Adicionales opcionales
              </h3>
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                {packageData.addOns.map(addOn => (
                  <div 
                    key={addOn.id} 
                    className={`flex items-start p-3 rounded-lg transition-colors border ${
                      calculatorState.selectedAddOns.includes(addOn.id)
                        ? 'border-peach bg-peach/5'
                        : 'border-forest/10 hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`addon-${addOn.id}`}
                      checked={calculatorState.selectedAddOns.includes(addOn.id)}
                      onChange={() => handleAddOnToggle(addOn.id)}
                      className="mt-1"
                    />
                    <label 
                      htmlFor={`addon-${addOn.id}`}
                      className="ml-3 cursor-pointer flex-1"
                    >
                      <div className="font-medium text-forest">{addOn.name}</div>
                      <div className="text-forest/80 text-sm">{addOn.description}</div>
                      <div className="text-peach font-medium mt-1">{formatPrice(addOn.price)}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Summary Panel */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-forest/5 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-boska font-bold text-forest mb-2">Tu Selección</h3>
              
              {selectedPackage && (
                <div>
                  <div className="flex items-center text-lg font-medium text-forest mb-2">
                    <span>{selectedPackage.name}</span>
                    <span className="ml-2 text-peach">{getPackageIcon(selectedPackage.id)}</span>
                  </div>
                  <p className="text-forest/80 text-sm mb-4">{selectedPackage.description}</p>
                  <ul className="space-y-1 text-forest/80 mb-3">
                    {selectedPackage.features.filter(feature => feature !== '-').map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-peach mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-forest/80 text-sm">
                    <span>Para {calculatorState.guestCount} invitados</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Selected Add-ons */}
            {calculatorState.selectedAddOns.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-forest mb-2">Adicionales seleccionados:</h4>
                <ul className="space-y-1">
                  {calculatorState.selectedAddOns.map(addOnId => {
                    const addOn = packageData.addOns.find(a => a.id === addOnId);
                    return addOn ? (
                      <li key={addOn.id} className="flex justify-between text-sm">
                        <span className="text-forest/80">{addOn.name}</span>
                        <span className="text-forest">{formatPrice(addOn.price)}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
            
            {/* Price Breakdown */}
            <div className="border-t border-sand pt-4 mt-6">
              <div className="flex justify-between text-forest mb-2">
                <span>Infraestructura del evento:</span>
                <span className={`font-medium ${isAnimating ? 'text-peach transition-colors duration-500' : 'text-forest'}`}>
                  {formatPrice(calculationResult.packagePrice)}
                </span>
              </div>
              <div className="flex justify-between text-forest mb-2">
                <span>Quinta El Refugio:</span>
                <span className="font-medium">{formatPrice(calculationResult.venuePrice)}</span>
              </div>
              {calculationResult.addOnsPrice > 0 && (
                <div className="flex justify-between text-forest mb-2">
                  <span>Adicionales:</span>
                  <span className={`font-medium ${isAnimating ? 'text-peach transition-colors duration-500' : 'text-forest'}`}>
                    {formatPrice(calculationResult.addOnsPrice)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-forest text-lg font-bold mt-4 border-t border-sand pt-4">
                <span>Total Estimado:</span>
                <span className={isAnimating ? 'text-peach transition-colors duration-500' : ''}>
                  {formatPrice(calculationResult.totalPrice)}
                </span>
              </div>
              <p className="text-xs text-forest/60 mt-2 italic">*Precios sujetos a confirmación final</p>
            </div>
            
            {/* CTA */}
            <div className="mt-8 space-y-4">
              <Link 
                href={getContactLinkWithParams()}
                className="bg-forest text-cream px-6 py-3 rounded-full font-medium hover:bg-forest/90 transition-colors block w-full text-center"
              >
                Solicitar Cotización Personalizada
              </Link>
              <WhatsAppButton
                fixed={false}
                message={`Hola, estoy interesado en el paquete ${selectedPackage?.name} para ${calculatorState.guestCount} invitados. El presupuesto estimado es de ${formatPrice(calculationResult.totalPrice)}`}
                className="bg-transparent border border-forest text-forest px-6 py-3 rounded-full font-medium hover:bg-forest/5 transition-colors block w-full text-center"
              >
                Contactar por WhatsApp
              </WhatsAppButton>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-forest/70">Te enviaremos una cotización detallada en menos de 24 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}