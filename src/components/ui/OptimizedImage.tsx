'use client';

import Image, { ImageProps } from 'next/image';
import React, { useState, useEffect } from 'react';
import { getImageSrc, getPlaceholderForType, generateBlurPlaceholder } from '@/lib/utils/image-utils';

// Define our custom props
type CustomProps = {
  fallbackSrc?: string;
  imageType?: 'product' | 'category' | 'hero' | 'gallery' | 'about' | 'general';
};

// Combine with Next.js Image props, but omit onLoadingComplete
export type OptimizedImageProps = Omit<ImageProps, 'onLoadingComplete'> & CustomProps;

export function OptimizedImage(props: OptimizedImageProps) {
  // Destructure props with defaults
  const {
    src,
    alt,
    fallbackSrc,
    className,
    blurDataURL,
    priority = false,
    imageType = 'general',
    width,
    height,
    fill,
    ...restProps
  } = props;

  // Use our utility to get the appropriate image source
  const defaultFallback = getPlaceholderForType(imageType);
  const resolvedFallbackSrc = fallbackSrc || defaultFallback;

  // Process the source to handle placeholders consistently
  const processedSrc = getImageSrc(src as string, imageType);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(processedSrc);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setImgSrc(getImageSrc(src as string, imageType));
  }, [src, imageType]);

  // Generate a blur placeholder if one isn't provided
  const finalBlurDataURL = blurDataURL || generateBlurPlaceholder();

  // Create the base image element with common props
  const imageProps: ImageProps = {
    src: error ? resolvedFallbackSrc : imgSrc,
    alt,
    width: !fill ? width : undefined,
    height: !fill ? height : undefined,
    fill,
    sizes: fill ? (restProps.sizes as string || "100vw") : undefined,
    className: `transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${fill ? 'object-cover w-full h-full' : ''} ${className || ''}`,
    onLoadingComplete: () => setIsLoading(false),
    onError: () => {
      setError(true);
      setIsLoading(false);
    },
    placeholder: finalBlurDataURL ? "blur" : "empty",
    blurDataURL: finalBlurDataURL,
    loading: priority ? "eager" : "lazy",
    priority,
  };

  // Add any remaining props that are safe for the Image component
  // We need to be careful with TypeScript here
  const safeProps = { ...restProps } as Record<string, unknown>;
  // Remove our custom props that aren't part of the Image component
  if ('imageType' in safeProps) delete safeProps.imageType;
  if ('fallbackSrc' in safeProps) delete safeProps.fallbackSrc;

  // Safely merge the remaining props
  Object.keys(safeProps).forEach(key => {
    (imageProps as Record<string, unknown>)[key] = safeProps[key];
  });

  // If not using fill, just return the Image component directly
  if (!fill) {
    return <Image {...imageProps} alt={alt || ''} />;
  }

  // If using fill, wrap it in a container with position relative
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image {...imageProps} alt={alt || ''} />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-forest/5">
          <div className="w-10 h-10 border-4 border-forest/20 border-t-peach rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );

}