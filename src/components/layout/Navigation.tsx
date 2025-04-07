// src/components/layout/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Productos', href: '/productos' },
    { label: 'Bodas', href: '/bodas' },
    { label: 'Galería', href: '/galeria' },
    { label: 'Contacto', href: '/contacto' },
  ];
  
  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className="text-forest hover:text-peach transition-colors font-switzer"
          >
            {item.label}
          </Link>
        ))}
      </div>
      
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-forest"
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
          {/* We'd normally use an icon here */}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-cream p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-forest hover:text-peach transition-colors font-switzer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};