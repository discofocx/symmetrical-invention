/**
 * Base product interface with common properties across all product types
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: ProductCategoryType;
  specifications: BaseSpecifications;
  pricing?: PricingInfo;
  features?: string[];
  availableOptions?: ProductOption[];
  relatedProducts?: string[]; // IDs of related products
}

/**
 * All possible product category identifiers
 */
export type ProductCategoryType = 
  | 'Carpas' 
  | 'Pistas de Baile' 
  | 'Templetes' 
  | 'Entarimados' 
  | 'Graderías' 
  | 'Plantas de Luz' 
  | 'Servicios Especiales';

/**
 * Specific pricing information that may vary by product
 */
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

/**
 * Optional customizations available for a product
 */
export interface ProductOption {
  id: string;
  name: string;
  description?: string;
  /**
   * Price adjustment can be either a fixed amount or a function to calculate based on base price
   * Note: Using functions here may cause issues with serialization
   */
  priceAdjustment: number | ((basePrice: number) => number);
  imageUrl?: string;
}

/**
 * Product category with metadata
 */
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  featuredImage: string;
  slug: string;
  count?: number; // Number of products in this category
  featured?: boolean; // Whether to highlight this category
}

/**
 * Base specifications interface with common measurement properties
 */
export interface BaseSpecifications {
  material?: string;
  color?: string;
  setupTime?: string;
}

/**
 * Tent-specific product interface
 */
export interface TentProduct extends Product {
  category: 'Carpas';
  specifications: TentSpecifications;
}

/**
 * Specifications specific to tents
 */
export interface TentSpecifications extends BaseSpecifications {
  width: number | string; // Width in meters or range
  length?: number | string; // Length in meters (may be variable)
  height: number | string; // Height in meters
  plafondType: string; // Type of ceiling
  color: string; // Main color
  minArea?: number; // Minimum area in square meters
  maxArea?: number; // Maximum recommended area
  setupTime?: string; // Approximate setup time
}

/**
 * Dance floor specific product interface
 */
export interface DanceFloorProduct extends Product {
  category: 'Pistas de Baile';
  specifications: DanceFloorSpecifications;
}

/**
 * Specifications specific to dance floors
 */
export interface DanceFloorSpecifications extends BaseSpecifications {
  material: string; // Floor material
  color: string; // Color or finish
  moduleSize?: string; // Size of individual modules
  minSize?: string; // Minimum installation size
  maxSize?: string; // Maximum recommended size
  thickness?: string | number; // Floor thickness
  supportsCustomDesign?: boolean; // Whether custom designs are available
}

/**
 * Stage-specific product interface
 */
export interface StageProduct extends Product {
  category: 'Templetes' | 'Entarimados';
  specifications: StageSpecifications;
}

/**
 * Specifications specific to stages and platforms
 */
export interface StageSpecifications extends BaseSpecifications {
  height?: number | string; // Height (translated from altura)
  material: string; // Construction material
  capacity?: number | string; // Weight capacity (translated from capacidad)
  finish: string; // Finish type (translated from acabado)
  size?: string; // Size information (translated from tamaño)
}

/**
 * Bleachers-specific product interface
 */
export interface BleachersProduct extends Product {
  category: 'Graderías';
  specifications: BleachersSpecifications;
}

/**
 * Specifications specific to bleachers
 */
export interface BleachersSpecifications extends BaseSpecifications {
  capacity: number | string; // Capacity (people)
  levels: number | string; // Number of levels
  material: string; // Construction material
  dimensions: string; // Dimensions information
}

/**
 * Power generator specific product interface
 */
export interface PowerGeneratorProduct extends Product {
  category: 'Plantas de Luz';
  specifications: PowerGeneratorSpecifications;
}

/**
 * Specifications specific to power generators
 */
export interface PowerGeneratorSpecifications extends BaseSpecifications {
  power: string; // Power output (translated from potencia)
  fuelType: string; // Fuel type (translated from combustible)
  operationalTime: string; // Operational time (translated from autonomía)
  noiseLevel?: string; // Noise level
  includes: string; // Included accessories (translated from incluye)
}

/**
 * Special services product interface
 */
export interface SpecialServiceProduct extends Product {
  category: 'Servicios Especiales';
  specifications: SpecialServiceSpecifications;
}

/**
 * Specifications specific to special services
 */
export interface SpecialServiceSpecifications extends BaseSpecifications {
  material: string; // Construction material
  finish: string; // Finish type (translated from acabado)
  capacity?: number | string; // Weight capacity
  installation: string; // Installation information (translated from instalación)
  setupTime: string; // Setup time
}

/**
 * Product filter parameters for search and filtering
 */
export interface ProductFilterParams {
  category?: ProductCategoryType;
  priceMin?: number;
  priceMax?: number;
  features?: string[];
  search?: string;
  sortBy?: 'price' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
}