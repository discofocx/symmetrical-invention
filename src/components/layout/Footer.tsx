// src/components/layout/Footer.tsx
import Link from "next/link";
import { slugify } from "@/lib/content/products";
import { siteConfig } from "@/config/site";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/icons/SocialIcons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-boska font-bold text-xl mb-4">ALTIVENTO</h3>
            <p className="mb-4">{siteConfig.description}</p>
            <div className="flex space-x-4">
              {/* Social media links */}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-peach rounded-full flex items-center justify-center p-2 hover:bg-peach/90 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <FacebookIcon />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-peach rounded-full flex items-center justify-center p-2 hover:bg-peach/90 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon />
                </a>
              )}
              {siteConfig.contact.whatsapp && (
                <WhatsAppButton
                  fixed={false}
                  className="w-8 h-8 bg-peach rounded-full flex items-center justify-center p-2 hover:bg-peach/90 transition-colors"
                >
                  <span className="sr-only">WhatsApp</span>
                  <WhatsAppIcon />
                </WhatsAppButton>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-boska text-xl mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-peach transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="hover:text-peach transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/bodas"
                  className="hover:text-peach transition-colors"
                >
                  Bodas
                </Link>
              </li>
              <li>
                <Link
                  href="/galeria"
                  className="hover:text-peach transition-colors"
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-peach transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-boska text-xl mb-4">Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/productos/${slugify("Carpas")}`}
                  className="hover:text-peach transition-colors"
                >
                  Carpas
                </Link>
              </li>
              <li>
                <Link
                  href={`/productos/${slugify("Pistas de Baile")}`}
                  className="hover:text-peach transition-colors"
                >
                  Pistas de Baile
                </Link>
              </li>
              <li>
                <Link
                  href={`/productos/${slugify("Graderías")}`}
                  className="hover:text-peach transition-colors"
                >
                  Graderías
                </Link>
              </li>
              <li>
                <Link
                  href={`/productos/${slugify("Plantas de Luz")}`}
                  className="hover:text-peach transition-colors"
                >
                  Plantas de Luz
                </Link>
              </li>
              <li>
                <Link
                  href={`/productos/${slugify("Servicios Especiales")}`}
                  className="hover:text-peach transition-colors"
                >
                  Servicios Especiales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-boska text-xl mb-4">Contacto</h3>
            <address className="not-italic">
              <p className="mb-2">{siteConfig.contact.address}</p>
              <p className="mb-2">Tel: {siteConfig.contact.phone}</p>
              <p className="mb-2">Email: {siteConfig.contact.email}</p>
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
          <p>
            &copy; {currentYear} {siteConfig.name}. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
