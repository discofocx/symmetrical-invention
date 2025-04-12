# Image Management Guide for Altivento Site

This document provides instructions for adding and managing images on the Altivento website.

## Folder Structure

```
images/
├── gallery/             # Images for the gallery section
│   ├── categories/      # Category thumbnail images
│   └── placeholders/    # Placeholder images for gallery items
├── placeholders/        # General placeholder images
│   ├── about/           # About page placeholder SVGs
│   ├── categories/      # Category placeholder SVGs
│   ├── hero/            # Hero section placeholder SVGs
│   └── products/        # Product placeholder SVGs
└── products/            # Product images (to be created)
    ├── carpas/          # Tent products
    ├── entarimados/     # Platform products
    ├── especiales/      # Special products
    ├── graderias/       # Bleacher products
    ├── pistas/          # Dance floor products
    ├── plantas/         # Plant products
    └── templetes/       # Stage products
```

## Image Requirements

### General Guidelines
- Use optimal formats: WebP for photos, SVG for logos and icons
- Compress all images before adding to reduce page load time
- Follow consistent naming conventions (kebab-case)
- Include appropriate alt text in component usage

### Size Requirements
- Hero images: 1920×1080px (16:9 aspect ratio)
- Product thumbnails: 800×600px
- Gallery images: 1200×800px
- Team member photos: 400×400px (1:1 aspect ratio)

### Expected Images

1. **Hero Section**
   - homepage-hero-1.webp, homepage-hero-2.webp, etc.
   - about-hero.webp
   - products-hero.webp
   - gallery-hero.webp
   - wedding-hero.webp
   - contact-hero.webp

2. **Product Categories**
   - carpas-category.webp
   - entarimados-category.webp
   - especiales-category.webp
   - graderias-category.webp
   - pistas-category.webp
   - plantas-category.webp
   - templetes-category.webp

3. **Gallery**
   - Multiple images organized by event type/category

4. **About Section**
   - team-member-1.webp, team-member-2.webp, etc.
   - company-history.webp
   - facilities.webp

## How to Add New Images

1. Place the image in the appropriate directory based on its purpose
2. Ensure the image follows naming conventions and size requirements
3. Update the corresponding data file if needed (for gallery or products)
4. Use the OptimizedImage component for rendering:

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

<OptimizedImage 
  src="/images/path/to/image.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={false}
/>
```

## Image Optimization Tips

- Use tools like Squoosh (https://squoosh.app/) for image compression
- Convert photos to WebP format for better compression with quality
- Keep SVGs optimized and clean using tools like SVGOMG
- Consider implementing responsive images with different sizes for different devices