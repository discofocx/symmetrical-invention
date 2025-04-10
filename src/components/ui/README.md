# UI Components

This directory contains reusable UI components for the Altivento site.

## OptimizedImage Component

The `OptimizedImage` component is a wrapper around Next.js's `Image` component that provides additional features for consistent image handling across the site.

### Features

- **Consistent fallback handling**: Automatically uses appropriate placeholder images when images fail to load
- **Loading states**: Shows a loading spinner while images are loading
- **Error handling**: Falls back to placeholder images when the original source fails to load
- **Blur placeholders**: Generates blur placeholders for improved perceived performance
- **Type-based optimization**: Handles different types of images (product, category, hero, etc.) consistently
- **Local image support**: Properly handles local images from the `/images/` directory

### Usage

There are two main ways to use the OptimizedImage component:

#### 1. With explicit dimensions (width and height)

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Image description"
  width={400}
  height={300}
/>
```

#### 2. With fill (to fill a parent container)

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<div className="aspect-[4/3] relative overflow-hidden">
  <OptimizedImage
    src="/path/to/image.jpg"
    alt="Image description"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>
```

> **Note:** When using `fill`, the parent container must have `position: relative`, defined dimensions, and `overflow-hidden` to prevent image overflow. Also, always include the `sizes` prop for better performance.

### Common Use Cases

#### With image type (for automatic fallbacks)

```tsx
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Image description"
  width={400}
  height={300}
  imageType="product"
/>
```

#### With priority (for above-the-fold images)

```tsx
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Image description"
  width={400}
  height={300}
  priority={true}
/>
```

#### With custom fallback

```tsx
<OptimizedImage
  src="/path/to/image.jpg"
  alt="Image description"
  width={400}
  height={300}
  fallbackSrc="/path/to/fallback.jpg"
/>
```

### Props

The OptimizedImage component accepts all props from Next.js's `Image` component, plus the following additional props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageType` | string | 'general' | Type of image (product, category, hero, gallery, about, general) |
| `fallbackSrc` | string | Based on imageType | Custom fallback image source |

## Image Utilities

The image utilities are located in `src/lib/utils/image-utils.ts` and provide helper functions for image handling:

### getImageSrc

Determines the appropriate image source based on the provided path and handles fallbacks for different image types.

```tsx
import { getImageSrc } from '@/lib/utils/image-utils';

const src = getImageSrc('/path/to/image.jpg', 'product');
```

### getPlaceholderForType

Gets the appropriate placeholder image for a given type.

```tsx
import { getPlaceholderForType } from '@/lib/utils/image-utils';

const placeholder = getPlaceholderForType('product');
```

### generateBlurPlaceholder

Generates a blur data URL for an image.

```tsx
import { generateBlurPlaceholder } from '@/lib/utils/image-utils';

const blurDataURL = generateBlurPlaceholder(100, 100, 'EF9C82');
```
