'use client';

import Image, { ImageProps } from 'next/image';
import React, { useState, useEffect } from 'react';
import { getImageSrc, getPlaceholderForType, generateBlurPlaceholder } from '@/lib/utils/image-utils';

// Define image types for better type checking
export type ImageType = 'product' | 'category' | 'hero' | 'gallery' | 'about' | 'general';

// Define our custom props
type CustomProps = {
  fallbackSrc?: string;
  imageType?: ImageType;
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

// Combine with Next.js Image props, properly handling onLoad
export type OptimizedImageProps = Omit<ImageProps, 'onLoad'> & CustomProps;

export function OptimizedImage(props: OptimizedImageProps) {
  const {
    src,
    alt = '', // Provide default empty string for alt
    fallbackSrc,
    className = '',
    blurDataURL,
    priority = false,
    imageType = 'general',
    width,
    height,
    fill,
    onImageLoad, // Renamed from onLoad to avoid collision
    ...restProps
  } = props;

  const defaultFallback = getPlaceholderForType(imageType);
  const resolvedFallbackSrc = fallbackSrc || defaultFallback;
  
  // Handle src properly whether it's a string or StaticImageData
  const initialSrc = typeof src === 'string' ? src : (src as { default: { src: string } }).default.src;
  const processedSrc = getImageSrc(initialSrc, imageType);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(processedSrc);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    // Process src correctly based on its type
    const newSrc = typeof src === 'string' ? src : (src as { default: { src: string } }).default.src;
    setImgSrc(getImageSrc(newSrc, imageType));
  }, [src, imageType]);

  const finalBlurDataURL = blurDataURL || generateBlurPlaceholder();

  // Handle image load event
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    // Forward the event if provided
    if (onImageLoad) {
      onImageLoad(event);
    }
  };

  // Handle image error
  const handleImageError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Combine class names
  const imageClassName = `
    transition-opacity duration-500 
    ${isLoading ? 'opacity-0' : 'opacity-100'} 
    ${fill ? 'object-cover w-full h-full' : ''} 
    ${className}
  `.trim();

  // Common image props
  const imageProps: ImageProps = {
    src: error ? resolvedFallbackSrc : imgSrc,
    alt,
    width: !fill ? width : undefined,
    height: !fill ? height : undefined,
    fill,
    sizes: fill ? (restProps.sizes || "100vw") : restProps.sizes,
    className: imageClassName,
    onLoad: handleImageLoad,
    onError: handleImageError,
    placeholder: finalBlurDataURL ? "blur" : "empty",
    blurDataURL: finalBlurDataURL,
    loading: priority ? "eager" : "lazy",
    priority,
    ...restProps,
  };

  // Render with or without container for fill mode
  if (!fill) {
    return <Image {...imageProps} />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image {...imageProps} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-forest/5">
          <div className="w-10 h-10 border-4 border-forest/20 border-t-peach rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
