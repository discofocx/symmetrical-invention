// src/components/layout/Header.tsx
import Link from 'next/link';
import { Navigation } from './Navigation';

export const Header = () => {
  return (
    <header className="bg-cream border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-boska font-bold text-forest">ALTIVENTO</span>
            </Link>
          </div>
          
          <Navigation />
          
          <div className="hidden md:flex">
            <Link 
              href="/contacto" 
              className="bg-peach text-forest px-4 py-2 rounded-full font-medium transition-colors hover:bg-peach/90"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};