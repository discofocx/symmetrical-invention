// src/app/contacto/page.tsx
import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto - Altivento',
  description: 'Contáctanos para más información sobre nuestros productos y servicios para eventos.',
};

export default function ContactPage() {
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
                      <p>Avenida Principal #123</p>
                      <p>Col. Centro</p>
                      <p>Querétaro, Qro. CP 76000</p>
                      <p>México</p>
                    </address>
                  </div>
                  
                  <div>
                    <h3 className="font-boska text-lg mb-2">Teléfono</h3>
                    <p><a href="tel:+524421234567" className="hover:text-peach transition-colors">(442) 123-4567</a></p>
                    <p><a href="tel:+524429876543" className="hover:text-peach transition-colors">(442) 987-6543</a></p>
                  </div>
                  
                  <div>
                    <h3 className="font-boska text-lg mb-2">Email</h3>
                    <p><a href="mailto:info@altivento.com" className="hover:text-peach transition-colors">info@altivento.com</a></p>
                    <p><a href="mailto:ventas@altivento.com" className="hover:text-peach transition-colors">ventas@altivento.com</a></p>
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
                      <a href="#" className="text-forest hover:text-peach transition-colors">
                        <span className="sr-only">Facebook</span>
                        <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">F</div>
                      </a>
                      <a href="#" className="text-forest hover:text-peach transition-colors">
                        <span className="sr-only">Instagram</span>
                        <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">I</div>
                      </a>
                      <a href="#" className="text-forest hover:text-peach transition-colors">
                        <span className="sr-only">WhatsApp</span>
                        <div className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">W</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
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