// src/components/layout/Footer.tsx
import Link from 'next/link';
import { slugify } from '@/lib/content/products';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-boska font-bold text-xl mb-4">ALTIVENTO</h3>
            <p className="mb-4">
              Más de 30 años creando estructuras memorables para eventos sociales y corporativos.
            </p>
            <div className="flex space-x-4">
              {/* Social media links would go here */}
              <span className="w-8 h-8 bg-peach rounded-full"></span>
              <span className="w-8 h-8 bg-peach rounded-full"></span>
              <span className="w-8 h-8 bg-peach rounded-full"></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-boska text-xl mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/nosotros" className="hover:text-peach transition-colors">Nosotros</Link></li>
              <li><Link href="/productos" className="hover:text-peach transition-colors">Productos</Link></li>
              <li><Link href="/bodas" className="hover:text-peach transition-colors">Bodas</Link></li>
              <li><Link href="/galeria" className="hover:text-peach transition-colors">Galería</Link></li>
              <li><Link href="/faq" className="hover:text-peach transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-boska text-xl mb-4">Productos</h3>
            <ul className="space-y-2">
              <li><Link href={`/productos/${slugify('Carpas')}`} className="hover:text-peach transition-colors">Carpas</Link></li>
              <li><Link href={`/productos/${slugify('Pistas de Baile')}`} className="hover:text-peach transition-colors">Pistas de Baile</Link></li>
              <li><Link href={`/productos/${slugify('Graderías')}`} className="hover:text-peach transition-colors">Graderías</Link></li>
              <li><Link href={`/productos/${slugify('Plantas de Luz')}`} className="hover:text-peach transition-colors">Plantas de Luz</Link></li>
              <li><Link href={`/productos/${slugify('Servicios Especiales')}`} className="hover:text-peach transition-colors">Servicios Especiales</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-boska text-xl mb-4">Contacto</h3>
            <address className="not-italic">
              <p className="mb-2">Querétaro, México</p>
              <p className="mb-2">Tel: (442) 123-4567</p>
              <p className="mb-2">Email: hola@altivento.mx</p>
            </address>
            <Link 
              href="/contacto" 
              className="bg-peach text-forest mt-4 inline-block px-4 py-2 rounded-full font-medium transition-colors hover:bg-peach/90"
            >
              Contactar
            </Link>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Altivento. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};