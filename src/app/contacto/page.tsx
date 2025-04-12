// src/app/contacto/page.tsx
import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contacto - Altivento',
  description: 'Contáctanos para más información sobre nuestros productos y servicios para eventos.',
};

interface SearchParams {
  package?: string;
  guests?: string;
  addons?: string;
  budget?: string;
}

interface ContactPageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<SearchParams>;
}

export default async function ContactPage({
  searchParams
}: ContactPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      {/* Page Header */}
      <section className="bg-forest text-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-boska font-bold mb-4">
            Contacto
          </h1>
          <p className="text-lg max-w-3xl">
            Estamos aquí para ayudarte a crear el evento perfecto. Contáctanos para más información o para solicitar una cotización personalizada.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-cream rounded-lg shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-boska font-bold text-forest mb-6">Información de Contacto</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-boska text-lg mb-2">Dirección</h3>
                    <address className="not-italic">
                      <p>Salto de Tzararacua 112</p>
                      <p>Real de Juriquilla</p>
                      <p>Querétaro, Qro. CP 76226</p>
                      <p>México</p>
                    </address>
                  </div>

                  <div>
                    <h3 className="font-boska text-lg mb-2">Teléfono</h3>
                    <p><a href={`tel:${siteConfig.contact.phone}`} className="hover:text-peach transition-colors">{siteConfig.contact.phone}</a></p>
                  </div>

                  <div>
                    <h3 className="font-boska text-lg mb-2">Email</h3>
                    <p><a href={`mailto:${siteConfig.contact.email}`} className="hover:text-peach transition-colors">{siteConfig.contact.email}</a></p>
                  </div>

                  <div>
                    <h3 className="font-boska text-lg mb-2">Horario de Atención</h3>
                    <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    <p>Sábados: 10:00 AM - 2:00 PM</p>
                    <p>Domingos: Cerrado</p>
                  </div>

                  <div>
                    <h3 className="font-boska text-lg mb-2">Redes Sociales</h3>
                    <div className="flex space-x-4">
                      <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-forest hover:text-peach transition-colors">
                        <span className="sr-only">Facebook</span>
                        <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">F</div>
                      </a>
                      <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-forest hover:text-peach transition-colors">
                        <span className="sr-only">Instagram</span>
                        <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">I</div>
                      </a>
                      <WhatsAppButton fixed={false} className="text-forest hover:text-peach transition-colors">
                        <span className="sr-only">WhatsApp</span>
                        <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">W</div>
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm
                initialPackage={resolvedSearchParams?.package}
                initialGuests={resolvedSearchParams?.guests}
                initialAddons={resolvedSearchParams?.addons}
                initialBudget={resolvedSearchParams?.budget}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12 bg-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-boska font-bold text-forest mb-6 text-center">Nuestra Ubicación</h2>
          <div className="aspect-[21/9] bg-forest/10 rounded-lg relative">
            <div className="absolute inset-0 flex items-center justify-center text-forest/30 text-xl">
              Mapa de ubicación (Aquí iría un mapa interactivo)
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
