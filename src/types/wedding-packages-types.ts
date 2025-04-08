// Types for Wedding Packages

export interface WeddingPackage {
    id: string;
    name: string;
    description: string;
    features: string[];
    basePrice: Record<string, number>; // Key is guest count (e.g., "150", "200")
  }
  
  export interface WeddingAddOn {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  }
  
  export interface VenueInfo {
    name: string;
    price: number;
    description: string;
    features: string[];
    image?: string;
  }
  
  export interface WeddingPackageData {
    venue: VenueInfo;
    packages: WeddingPackage[];
    addOns: WeddingAddOn[];
    guestCountOptions: number[];
  }
  
  // Calculator types
  export interface CalculatorState {
    selectedPackage: string;
    guestCount: number;
    selectedAddOns: string[];
  }
  
  export interface CalculationResult {
    packagePrice: number;
    venuePrice: number;
    addOnsPrice: number;
    totalPrice: number;
  }