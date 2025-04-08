'use client';
import React, { useState, useEffect } from 'react';
import type { WeddingPackageData, CalculatorState, CalculationResult, WeddingAddOn } from '@/types/wedding-packages-types';
import { formatPrice } from '@/lib/utils/formatting';

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

  return (
    <div className="rounded-lg shadow-sm p-6 max-w-4xl mx-auto bg-cream">
      <h2 className="text-2xl font-boska font-bold text-forest mb-6 text-center">Calcula el presupuesto para tu boda</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-boska font-bold text-forest mb-4">Selecciona tu paquete</h3>
          <div className="space-y-4">
            {packageData.packages.map(pkg => (
              <div key={pkg.id} className="flex items-start p-3 rounded-lg hover:bg-sand/20 transition-colors">
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
                  <div className="font-boska font-bold text-forest">{pkg.name}</div>
                  <div className="text-forest/80">{pkg.description}</div>
                </label>
              </div>
            ))}
          </div>
          
          <h3 className="text-xl font-boska font-bold text-forest mt-8 mb-4">Número de invitados</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {packageData.guestCountOptions.map(count => (
              <button
                key={count}
                type="button"
                onClick={() => handleGuestCountChange(count)}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  calculatorState.guestCount === count
                    ? 'bg-peach text-forest font-medium'
                    : 'bg-sand/30 text-forest hover:bg-sand/50'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
          
          <h3 className="text-xl font-boska font-bold text-forest mt-8 mb-4">Adicionales opcionales</h3>
          <div className="space-y-3">
            {packageData.addOns.map(addOn => (
              <div key={addOn.id} className="flex items-start p-3 rounded-lg hover:bg-sand/20 transition-colors">
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
                  <div className="font-medium text-forest">{addOn.name} <span className="text-forest/80 text-sm">({formatPrice(addOn.price)})</span></div>
                  <div className="text-forest/80">{addOn.description}</div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-boska font-bold text-forest mb-4">Resumen de tu presupuesto</h3>
          
          {selectedPackage && (
            <div className="mb-6">
              <div className="text-lg font-medium text-forest mb-2">{selectedPackage.name}</div>
              <ul className="space-y-1 text-forest/80">
                {selectedPackage.features.filter(feature => feature !== '-').map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-peach mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="border-t border-sand pt-4 mt-6">
            <div className="flex justify-between text-forest mb-2">
              <span>Infraestructura del evento:</span>
              <span className="font-medium">{formatPrice(calculationResult.packagePrice)}</span>
            </div>
            <div className="flex justify-between text-forest mb-2">
              <span>Quinta El Refugio:</span>
              <span className="font-medium">{formatPrice(calculationResult.venuePrice)}</span>
            </div>
            {calculationResult.addOnsPrice > 0 && (
              <div className="flex justify-between text-forest mb-2">
                <span>Adicionales:</span>
                <span className="font-medium">{formatPrice(calculationResult.addOnsPrice)}</span>
              </div>
            )}
            <div className="flex justify-between text-forest text-lg font-bold mt-4 border-t border-sand pt-4">
              <span>Total:</span>
              <span>{formatPrice(calculationResult.totalPrice)}</span>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              className="bg-forest text-cream px-6 py-3 rounded-full font-medium hover:bg-forest/90 transition-colors"
            >
              Solicitar Cotización
            </button>
            <p className="text-sm text-forest/70 mt-2">Te enviaremos una cotización personalizada</p>
          </div>
        </div>
      </div>
    </div>
  );
}