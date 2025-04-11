# Image Naming Convention

This document outlines the standardized naming convention for all images used in the Altivento site. Following these guidelines ensures consistency, improves maintainability, and makes it easier to manage assets as the site grows.

## Directory Structure

```
public/images/
  ├── products/
  │   ├── [category-slug]/
  │   │   ├── [product-id]/
  │   │   │   ├── 01.jpg
  │   │   │   ├── 02.jpg
  │   │   │   └── ...
  ├── categories/
  │   ├── [category-slug].jpg
  ├── hero/
  │   ├── [page-name].jpg
  │   ├── [page-name]-mobile.jpg
  ├── gallery/
  │   ├── [gallery-id]/
  │   │   ├── 01.jpg
  │   │   ├── 02.jpg
  │   │   └── ...
  ├── about/
  │   ├── team/
  │   │   ├── [person-name].jpg
  │   ├── facility/
  │   │   ├── 01.jpg
  │   │   └── ...
  └── placeholders/
      ├── products/
      ├── categories/
      ├── hero/
      └── ...
```

## General Rules

1. **Use lowercase for all filenames and directories**
   - Good: `carpa-plafon-liso.jpg`
   - Bad: `Carpa_Plafon_Liso.jpg`

2. **Use hyphens (-) instead of spaces or underscores**
   - Good: `carpa-plafon-liso.jpg`
   - Bad: `carpa_plafon_liso.jpg` or `carpa plafon liso.jpg`

3. **Use descriptive, but concise names**
   - Good: `carpa-plafon-liso-blanco-4m`
   - Bad: `c1.jpg` or `carpa-con-plafon-liso-de-color-blanco-con-altura-de-4-metros.jpg`

4. **For multiple images of the same item, use sequential numbering with leading zeros**
   - Good: `01.jpg`, `02.jpg`, `03.jpg`
   - Bad: `1.jpg`, `2.jpg`, `3.jpg`

5. **Include dimensions in the filename for images that have specific size requirements**
   - Good: `logo-200x100.png`
   - Only when the exact dimensions are critical

6. **For responsive images, include the breakpoint or device type**
   - Good: `hero-home-mobile.jpg`, `hero-home-desktop.jpg`

7. **Use standard file extensions**
   - Preferred: `.jpg` for photos, `.png` for transparency, `.svg` for icons, `.webp` for optimized images

## Specific Conventions by Image Type

### Product Images

Format: `/images/products/[category-slug]/[product-id]/[sequence-number].jpg`

Examples:
```
/images/products/carpas/carpa-plafon-liso-blanco-4m/01.jpg
/images/products/carpas/carpa-plafon-liso-blanco-4m/02.jpg
/images/products/entarimados/entarimado-madera-clara/01.jpg
```

### Category Images

Format: `/images/categories/[category-slug].jpg`

Examples:
```
/images/categories/carpas.jpg
/images/categories/entarimados.jpg
/images/categories/pistas.jpg
```

### Hero Images

Format: `/images/hero/[page-name].jpg` and `/images/hero/[page-name]-mobile.jpg`

Examples:
```
/images/hero/home.jpg
/images/hero/home-mobile.jpg
/images/hero/about.jpg
/images/hero/products.jpg
```

### Gallery Images

Format: `/images/gallery/[gallery-id]/[sequence-number].jpg`

Examples:
```
/images/gallery/wedding-2023/01.jpg
/images/gallery/wedding-2023/02.jpg
/images/gallery/corporate-event-2023/01.jpg
```

### About Page Images

Format: `/images/about/[section]/[name-or-sequence].jpg`

Examples:
```
/images/about/team/juan-perez.jpg
/images/about/facility/01.jpg
/images/about/history/founding-2010.jpg
```

### Placeholder Images

Format: `/images/placeholders/[type]/placeholder.svg`

Examples:
```
/images/placeholders/products/placeholder.svg
/images/placeholders/categories/placeholder.svg
/images/placeholders/hero/placeholder.svg
```

## Image Optimization Guidelines

1. **Compress all images** before adding them to the repository
   - Use tools like ImageOptim, TinyPNG, or Squoosh

2. **Use appropriate formats**
   - JPEG: For photographs and images with many colors
   - PNG: For images requiring transparency
   - SVG: For icons, logos, and simple illustrations
   - WebP: For better compression (with JPEG/PNG fallbacks)

3. **Responsive images**
   - Provide different sizes for different viewports
   - Use the `sizes` attribute with the `srcset` attribute or Next.js Image component

4. **Keep original high-resolution versions** in a separate archive (not in the public directory)

## Implementation

When updating existing images to follow this convention:

1. Create the new directory structure
2. Rename and move images according to the convention
3. Update all references in the codebase
4. Test thoroughly to ensure all images load correctly

## Examples of Updating Image Paths

### Before:

```json
"images": ["/images/carpas/plafon-liso-blanco-1.jpg", "/images/carpas/plafon-liso-blanco-2.jpg"]
```

### After:

```json
"images": [
  "/images/products/carpas/carpa-plafon-liso-blanco-4m/01.jpg", 
  "/images/products/carpas/carpa-plafon-liso-blanco-4m/02.jpg"
]
```

## Using with OptimizedImage Component

The `OptimizedImage` component should be used with these paths:

```jsx
<OptimizedImage
  src="/images/products/carpas/carpa-plafon-liso-blanco-4m/01.jpg"
  alt="Carpa con plafón liso blanco"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
  imageType="product"
/>
```

This naming convention works seamlessly with our image handling utilities and components.
