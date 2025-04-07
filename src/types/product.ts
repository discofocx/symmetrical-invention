// This matches the provided product.ts type definitions from the documentation
export interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    category: string;
    specifications: Record<string, string | number>;
    pricing?: PricingInfo;
    features?: string[];
    availableOptions?: ProductOption[];
    relatedProducts?: string[]; // IDs of related products
  }
  
  export interface PricingInfo {
    basePrice?: number;
    unit?: 'm²' | 'unidad' | 'módulo' | 'hora';
    pricePerUnit?: number;
    minUnits?: number;
    discountThresholds?: {
      units: number;
      discountPercentage: number;
    }[];
  }
  
  // Other type definitions follow...