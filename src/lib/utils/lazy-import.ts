import dynamic from 'next/dynamic';
import { ComponentType, Suspense, ReactElement } from 'react';

/**
 * Creates a dynamically imported component with proper loading fallback
 * 
 * @param importFn - Function that imports the component
 * @param LoadingComponent - Component to show while loading
 * @param ssr - Whether to render on server-side
 * @returns Dynamically imported component
 */
export function createLazyComponent<T>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  LoadingComponent: React.ComponentType | null = null,
  ssr = true
) {
  // Create loading component function
  const loadingFn = LoadingComponent 
    ? () => {
        const Loading = LoadingComponent;
        return ReactElement.createElement(Loading);
      }
    : undefined;

  const DynamicComponent = dynamic(importFn, {
    loading: loadingFn,
    ssr,
  });

  // If no loading component is provided, wrap in Suspense with basic fallback
  if (!LoadingComponent) {
    return function LazyComponentWithSuspense(props: T) {
      return ReactElement.createElement(
        Suspense, 
        { 
          fallback: ReactElement.createElement(
            'div', 
            { 
              className: "animate-pulse bg-forest/5 rounded min-h-[100px] w-full" 
            }
          ) 
        },
        ReactElement.createElement(DynamicComponent, props)
      );
    };
  }

  return DynamicComponent;
}