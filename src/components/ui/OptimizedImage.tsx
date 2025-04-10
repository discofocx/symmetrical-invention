'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

export interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string;
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholders/placeholder.svg',
  className,
  blurDataURL,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  
  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setImgSrc(src);
  }, [src]);
  
  return (
    <div className={`relative ${className || ''}`}>
      <Image
        {...props}
        src={error ? fallbackSrc : imgSrc}
        alt={alt}
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} ${props.className || ''}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-forest/5">
          <div className="w-10 h-10 border-4 border-forest/20 border-t-peach rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}