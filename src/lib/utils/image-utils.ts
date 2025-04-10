/**
 * Utility functions for handling images throughout the site
 */

/**
 * Determines the appropriate image source based on the provided path
 * Handles fallbacks for different image types
 *
 * @param src The original image source path
 * @param type The type of image (product, category, hero, etc.)
 * @returns The appropriate image source path
 */
export function getImageSrc(
  src: string | undefined,
  type: 'product' | 'category' | 'hero' | 'gallery' | 'about' | 'general' = 'general'
): string {
  // If no source is provided or empty string, return the appropriate placeholder
  if (!src || src === '') {
    return getPlaceholderForType(type);
  }

  // If it's already a placeholder, use it
  if (src.startsWith('/images/placeholders/')) {
    return src;
  }

  // If it's a path in our images directory
  if (src.startsWith('/images/')) {
    // Only use placeholder for non-existent images in error handling
    // We'll let the actual image load and only use placeholder on error
    return src;
  }

  // Otherwise, it's an external URL or valid image path
  return src;
}

/**
 * Gets the appropriate placeholder image for a given type
 *
 * @param type The type of image
 * @returns The path to the appropriate placeholder
 */
export function getPlaceholderForType(
  type: 'product' | 'category' | 'hero' | 'gallery' | 'about' | 'general'
): string {
  switch (type) {
    case 'product':
      return '/images/placeholders/products/placeholder.svg';
    case 'category':
      return '/images/placeholders/categories/placeholder.svg';
    case 'hero':
      return '/images/placeholders/hero/placeholder.svg';
    case 'gallery':
      return '/images/placeholders/gallery/placeholder.svg';
    case 'about':
      return '/images/placeholders/about/placeholder.svg';
    case 'general':
    default:
      return '/images/placeholders/placeholder.svg';
  }
}

/**
 * Generates a blur data URL for an image
 *
 * @param width Image width
 * @param height Image height
 * @param color Base color in hex (without #)
 * @returns SVG image encoded as base64 data URL
 */
export function generateBlurPlaceholder(
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
