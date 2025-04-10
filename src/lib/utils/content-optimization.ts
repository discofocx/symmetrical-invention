/**
 * Content optimization utilities
 * These functions help optimize content delivery for better performance
 */

/**
 * Breaks down large content into smaller chunks for progressive loading
 * @param content Array of content items
 * @param chunkSize Optimal chunk size
 * @returns Array of content chunks
 */
export function chunkContent<T>(content: T[], chunkSize: number = 10): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Prioritizes content based on visibility and importance
 * @param items Content items with metrics
 * @returns Sorted array by priority
 */
export function prioritizeContent<T extends { importance?: number }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const importanceA = a.importance ?? 0;
    const importanceB = b.importance ?? 0;
    return importanceB - importanceA;
  });
}

/**
 * Generates low-quality image placeholders for blurDataURL
 * @param width Image width
 * @param height Image height
 * @param color Base color in hex (without #)
 * @returns SVG image encoded as base64 data URL
 */
export function generateImagePlaceholder(
  width: number = 100, 
  height: number = 100,
  color: string = 'EF9C82'
): string {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${color}" opacity="0.2" />
      <rect x="10%" y="10%" width="80%" height="80%" fill="#${color}" opacity="0.1" />
    </svg>
  `;
  
  // Convert to base64
  const base64 = btoa(svg.trim());
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Creates image dimensions object for responsive images
 * @param baseWidth Base image width
 * @param baseHeight Base image height
 * @returns Dimensions for different breakpoints
 */
export function createResponsiveDimensions(baseWidth: number, baseHeight: number) {
  const aspectRatio = baseHeight / baseWidth;
  
  return {
    sm: { width: Math.round(baseWidth * 0.5), height: Math.round(baseWidth * 0.5 * aspectRatio) },
    md: { width: Math.round(baseWidth * 0.75), height: Math.round(baseWidth * 0.75 * aspectRatio) },
    lg: { width: baseWidth, height: baseHeight },
    xl: { width: Math.round(baseWidth * 1.25), height: Math.round(baseWidth * 1.25 * aspectRatio) },
  };
}