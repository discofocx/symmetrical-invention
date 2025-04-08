'use client';
import React, { useState, useEffect } from 'react';
import WeddingCalculator from '@/components/wedding/WeddingCalculator';
import WeddingPackageComparison from '@/components/wedding/WeddingPackageComparison';
import WeddingVenueInfo from '@/components/wedding/WeddingVenueInfo';
import WeddingTestimonials from '@/components/wedding/WeddingTestimonials';
import WeddingFeaturesHighlight from '@/components/wedding/WeddingFeaturesHighlight';
import { weddingPackageData } from '@/data/wedding-packages-data';

export default function WeddingPackagesPage() {
  // Using a ref to track if we're in the initial hydration phase
  const hasMounted = React.useRef(false);
  
  // Set initial state values for server rendering
  const [activeSection, setActiveSection] = useState<'comparison' | 'calculator'>('comparison');
  const [selectedPackage, setSelectedPackage] = useState(weddingPackageData.packages[0].id);
  
  // Set the mounted flag after initial render on client
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    setActiveSection('calculator');
    
    // Scroll to calculator section
    setTimeout(() => {
      const calculatorElement = document.getElementById('calculator-section');
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Using consistent styling with the home page */}
      <div className="bg-linear-45/oklch from-peach via-sand to-cream py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-boska font-bold text-forest mb-6">
              Paquetes para Bodas
            </h1>
            <p className="text-lg text-forest/80 mb-8">
              Hemos diseñado paquetes integrales para tu boda, combinando la infraestructura de Altivento con el hermoso espacio de Quinta El Refugio.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setActiveSection('comparison')}
                className={`px-6 py-3 rounded-full text-forest font-medium transition-colors ${
                  activeSection === 'comparison' 
                    ? 'bg-white shadow-md' 
                    : 'bg-peach hover:bg-peach/90'
                }`}
              >
                Ver Comparativa
              </button>
              <button 
                onClick={() => setActiveSection('calculator')}
                className={`px-6 py-3 rounded-full text-forest font-medium transition-colors ${
                  activeSection === 'calculator' 
                    ? 'bg-white shadow-md' 
                    : 'bg-peach hover:bg-peach/90'
                }`}
              >
                Calcular Presupuesto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-boska font-bold text-forest mb-6">
              Colaboración con Quinta El Refugio
            </h2>
            <WeddingVenueInfo venue={weddingPackageData.venue} />
            
            <div className="mt-12">
              <h3 className="text-2xl font-boska font-bold text-forest mb-6">
                ¿Por qué elegir nuestros paquetes de boda?
              </h3>
              <WeddingFeaturesHighlight />
            </div>
          </section>

          {/* Comparison section */}
          <section 
            className="mb-16"
            style={{ display: activeSection === 'comparison' ? 'block' : 'none' }}
          >
            <h2 className="text-3xl font-boska font-bold text-forest mb-6">
              Comparativa de Paquetes
            </h2>
            <p className="text-forest/80 mb-8">
              Selecciona el paquete que mejor se adapte a tus necesidades. Todos incluyen el espacio de Quinta El Refugio y la infraestructura necesaria para tu evento.
            </p>
            <WeddingPackageComparison 
              packageData={weddingPackageData} 
              onSelectPackage={handleSelectPackage}
            />
          </section>

          {/* Calculator section */}
          <section 
            id="calculator-section"
            style={{ display: activeSection === 'calculator' ? 'block' : 'none' }}
          >
            <h2 className="text-3xl font-boska font-bold text-forest mb-6">
              Calculadora de Presupuesto
            </h2>
            <p className="text-forest/80 mb-8">
              Personaliza tu paquete seleccionando el número de invitados y adicionales opcionales.
            </p>
            <WeddingCalculator packageData={weddingPackageData} />
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-boska font-bold text-forest mb-6">
              Lo que dicen nuestros clientes
            </h2>
            <WeddingTestimonials />
          </section>
          
          <section className="py-16 bg-sand/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-boska font-bold text-forest mb-6 text-center">
                Galería de Bodas
              </h2>
              <p className="text-forest/80 mb-8 text-center max-w-3xl mx-auto">
                Inspírate con algunas de nuestras bodas más destacadas realizadas en Quinta El Refugio.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Placeholder images - would be replaced with actual wedding photos */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="aspect-square bg-forest/10 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-forest/30">Foto de boda {item}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button className="bg-transparent border-2 border-forest text-forest px-6 py-3 rounded-full font-medium transition-colors hover:bg-forest/5">
                  Ver Galería Completa
                </button>
              </div>
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl font-boska font-bold text-forest mb-6 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-cream rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-boska font-bold text-forest mb-2">¿Cuáles son las condiciones de reservación?</h3>
                    <p className="text-forest/80">Para confirmar tu reservación, requerimos un anticipo del 30%. El saldo total debe cubrirse dos días antes del evento.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-boska font-bold text-forest mb-2">¿Cuándo se realiza el montaje?</h3>
                    <p className="text-forest/80">La instalación generalmente se realiza 1 o 2 días antes del evento, y la desinstalación normalmente ocurre el día siguiente. Si el evento es en sábado, se retira el lunes.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-boska font-bold text-forest mb-2">¿Los paquetes incluyen mobiliario?</h3>
                    <p className="text-forest/80">Los paquetes incluyen las estructuras y elementos mencionados. El mobiliario como mesas y sillas no está incluido, pero podemos recomendarte proveedores de confianza.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-boska font-bold text-forest mb-2">¿Qué sucede en caso de cancelación?</h3>
                    <p className="text-forest/80">En caso de cancelación, el anticipo del 30% no es reembolsable. Recomendamos estar seguros de la fecha antes de realizar la reservación.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-boska font-bold text-forest mb-2">¿Se pueden personalizar los paquetes?</h3>
                    <p className="text-forest/80">Sí, los paquetes son flexibles y se pueden adaptar según tus necesidades específicas. Contáctanos para solicitar una cotización personalizada.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-forest text-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-boska font-bold mb-6">
                Solicita una Cotización Personalizada
              </h2>
              <p className="max-w-3xl mx-auto text-lg mb-8">
                ¿Tienes dudas o necesitas una cotización específica para tu evento? Completa el formulario y nos pondremos en contacto contigo a la brevedad.
              </p>
              
              <div className="max-w-3xl mx-auto bg-cream rounded-lg shadow-md p-6 text-left">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-medium text-forest mb-2">
                      Nombre completo <span className="text-peach">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-medium text-forest mb-2">
                      Correo electrónico <span className="text-peach">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block font-medium text-forest mb-2">
                      Teléfono <span className="text-peach">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block font-medium text-forest mb-2">
                      Fecha tentativa del evento
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block font-medium text-forest mb-2">
                      Número aproximado de invitados
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="menos-100">Menos de 100</option>
                      <option value="100-150">100-150</option>
                      <option value="150-200">150-200</option>
                      <option value="200-250">200-250</option>
                      <option value="250-300">250-300</option>
                      <option value="300-350">300-350</option>
                      <option value="350-400">350-400</option>
                      <option value="mas-400">Más de 400</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="package" className="block font-medium text-forest mb-2">
                      Paquete de interés
                    </label>
                    <select
                      id="package"
                      name="package"
                      className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="esencial">Boda Esencial</option>
                      <option value="plus">Boda Plus</option>
                      <option value="premium">Boda Premium</option>
                      <option value="lujo">Boda de Lujo</option>
                      <option value="personalizado">Personalizado</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block font-medium text-forest mb-2">
                      Mensaje o requerimientos especiales <span className="text-peach">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2 flex justify-center mt-4">
                    <button
                      type="submit"
                      className="bg-peach text-forest px-8 py-3 rounded-full font-medium hover:bg-peach/90 transition-colors"
                    >
                      Enviar Solicitud
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}