'use client';

import React from 'react';
import Image from 'next/image';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export default function TestImagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Image Component Test Page</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Fixed Size Images (Explicit Width/Height)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Next.js Image */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Next.js Image (Original)</h3>
            <div className="flex justify-center">
              <Image
                src="https://picsum.photos/400/300"
                alt="Next.js Image example"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* OptimizedImage */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">OptimizedImage</h3>
            <div className="flex justify-center">
              <OptimizedImage
                src="https://picsum.photos/400/300"
                alt="OptimizedImage example"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Responsive Images (Fill Parent Container)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Next.js Image with Fill */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Next.js Image with Fill</h3>
            <div className="aspect-[4/3] relative bg-forest/5 rounded-lg overflow-hidden">
              <Image
                src="https://picsum.photos/800/600"
                alt="Next.js Image with fill example"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* OptimizedImage with Fill */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">OptimizedImage with Fill</h3>
            <div className="aspect-[4/3] relative bg-forest/5 rounded-lg overflow-hidden">
              <OptimizedImage
                src="/images/products/carpas/plafon-liso-blanco-1.jpg"
                alt="OptimizedImage with fill example"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. Fallback Behavior</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Non-existent image */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Non-existent Image</h3>
            <div className="aspect-[4/3] relative bg-forest/5 rounded-lg overflow-hidden">
              <OptimizedImage
                src="/non-existent-image.jpg"
                alt="Non-existent image example"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                imageType="product"
              />
            </div>
          </div>

          {/* Custom fallback */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Custom Fallback</h3>
            <div className="aspect-[4/3] relative bg-forest/5 rounded-lg overflow-hidden">
              <OptimizedImage
                src="/non-existent-image.jpg"
                alt="Custom fallback example"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                fallbackSrc="/images/products/carpas/plafon-liso-blanco-1.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Local Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Product Image</h3>
            <div className="aspect-[4/3] relative bg-forest/5 rounded-lg overflow-hidden">
              <OptimizedImage
                src="/images/products/product1.jpg"
                alt="Product image example"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                imageType="product"
              />
            </div>
          </div>

          {/* Category */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Category Image</h3>
            <div className="aspect-[4/3] relative bg-forest/5 rounded-lg overflow-hidden">
              <OptimizedImage
                src="/images/categories/category1.jpg"
                alt="Category image example"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                imageType="category"
              />
            </div>
          </div>

          {/* Placeholder Fallback */}
          <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Missing Image (Fallback)</h3>
            <div className="aspect-[4/3] relative bg-forest/5 rounded-lg overflow-hidden">
              <OptimizedImage
                src="/images/hero/missing.jpg"
                alt="Missing image example"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                imageType="hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Documentation</h2>
        <div className="bg-cream rounded-lg overflow-hidden shadow-sm p-6 prose max-w-none">
          <h3>OptimizedImage Component</h3>
          <p>
            The <code>OptimizedImage</code> component is a wrapper around Next.js's <code>Image</code> component that provides additional features:
          </p>
          <ul>
            <li>Consistent fallback handling for different image types</li>
            <li>Loading spinner during image load</li>
            <li>Automatic blur placeholders</li>
            <li>Error handling with fallback images</li>
          </ul>

          <h4>Usage</h4>
          <p>There are two main ways to use the OptimizedImage component:</p>

          <h5>1. With explicit dimensions (width and height)</h5>
          <pre className="text-sm bg-forest/5 p-2 rounded">
{`<OptimizedImage
  src="/path/to/image.jpg"
  alt="Image description"
  width={400}
  height={300}
/>`}
          </pre>

          <h5>2. With fill (to fill a parent container)</h5>
          <pre className="text-sm bg-forest/5 p-2 rounded">
{`<div className="aspect-[4/3] relative overflow-hidden">
  <OptimizedImage
    src="/path/to/image.jpg"
    alt="Image description"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>`}
          </pre>
          <p className="text-sm text-forest/70">Note: When using <code>fill</code>, the parent container must have <code>position: relative</code> and defined dimensions.</p>

          <h4>Additional Props</h4>
          <p>In addition to all the props from Next.js's Image component, OptimizedImage accepts:</p>
          <table className="w-full">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>imageType</code></td>
                <td>string</td>
                <td>'general'</td>
                <td>Type of image (product, category, hero, gallery, about, general)</td>
              </tr>
              <tr>
                <td><code>fallbackSrc</code></td>
                <td>string</td>
                <td>Based on imageType</td>
                <td>Custom fallback image source</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
