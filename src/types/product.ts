// src/types/product.ts

/**
 * Base product interface with common properties across all product types
 */
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
 * Tent-specific product interface
 */
export interface TentProduct extends Product {
  category: 'Carpas';
  specifications: TentSpecifications;
}

/**
 * Specifications specific to tents
 */
export interface TentSpecifications extends Record<string, string | number> {
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
export interface DanceFloorSpecifications extends Record<string, string | number> {
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
export interface StageSpecifications extends Record<string, string | number> {
  altura?: string | number; // Height
  material: string; // Construction material
  capacidad?: string | number; // Weight capacity
  acabado: string; // Finish type
  tamaño?: string; // Size information
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
export interface BleachersSpecifications extends Record<string, string | number> {
  capacidad: string | number; // Capacity (people)
  niveles: string | number; // Number of levels
  material: string; // Construction material
  dimensiones: string; // Dimensions information
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
export interface PowerGeneratorSpecifications extends Record<string, string | number> {
  potencia: string; // Power output
  combustible: string; // Fuel type
  autonomía: string; // Operational time
  'nivel de ruido'?: string; // Noise level
  incluye: string; // Included accessories
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
export interface SpecialServiceSpecifications extends Record<string, string | number> {
  material: string; // Construction material
  acabado: string; // Finish type
  capacidad?: string | number; // Weight capacity
  instalación: string; // Installation information
  setupTime: string; // Setup time
}

/**
 * Product filter parameters for search and filtering
 */
export interface ProductFilterParams {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  features?: string[];
  search?: string;
  sortBy?: 'price' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
}