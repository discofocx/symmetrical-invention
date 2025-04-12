import dynamic from 'next/dynamic';
import { ComponentType, Suspense } from 'react';
import * as React from 'react';

/**
 * Creates a dynamically imported component with proper loading fallback
 * 
 * @param importFn - Function that imports the component
 * @param LoadingComponent - Component to show while loading
 * @param ssr - Whether to render on server-side
 * @returns Dynamically imported component
 */
export function createLazyComponent<T extends object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  LoadingComponent: React.ComponentType | null = null,
  ssr = true
): ComponentType<T> {
  // Create loading component function
  const loadingFn = LoadingComponent 
    ? () => {
        const Loading = LoadingComponent;
        return React.createElement(Loading);
      }
    : undefined;

  const DynamicComponent = dynamic(importFn, {
    loading: loadingFn,
    ssr,
  }) as ComponentType<T>; // Cast to ensure the type is preserved

  // If no loading component is provided, wrap in Suspense with basic fallback
  if (!LoadingComponent) {
    const LazyComponentWithSuspense: ComponentType<T> = (props: T) => {
      return React.createElement(
        Suspense, 
        { 
          fallback: React.createElement(
            'div', 
            { 
              className: "animate-pulse bg-forest/5 rounded min-h-[100px] w-full" 
            }
          ) 
        },
        React.createElement(DynamicComponent, props)
      );
    };
    return LazyComponentWithSuspense;
  }

  return DynamicComponent;
}