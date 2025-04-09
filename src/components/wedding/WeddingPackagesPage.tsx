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
  const contentWrapperRef = React.useRef<HTMLDivElement>(null);
  const tabsSectionRef = React.useRef<HTMLDivElement>(null);
  const testimonialsRef = React.useRef<HTMLDivElement>(null);
  
  // Set initial state values for server rendering
  const [activeSection, setActiveSection] = useState<'comparison' | 'calculator'>('comparison');
  const [, setSelectedPackage] = useState(weddingPackageData.packages[0].id);
  const [isTabsVisible, setIsTabsVisible] = useState(true);
  
  // Set the mounted flag after initial render on client
  useEffect(() => {
    hasMounted.current = true;
    
    // Set up intersection observer to detect when user scrolls past the relevant sections
    if (typeof window !== 'undefined' && contentWrapperRef.current && testimonialsRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // If testimonials section is visible, hide the tabs
          if (entry.target === testimonialsRef.current) {
            setIsTabsVisible(!entry.isIntersecting);
          }
          
          // If content wrapper becomes not visible (scrolled out of view), hide tabs
          if (entry.target === contentWrapperRef.current) {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              setIsTabsVisible(false);
            }
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(testimonialsRef.current);
      observer.observe(contentWrapperRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
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
            <p className="text-lg text-forest/80 mb-4">
              Hemos diseñado paquetes integrales para tu boda, combinando la infraestructura de Altivento con el hermoso espacio de Quinta El Refugio.
            </p>
            <p className="text-base text-forest/70 mb-4">
              Descubre nuestras opciones de paquetes y calcula un presupuesto personalizado para tu evento.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Fixed navigation indicator for packages sections */}
          <div className={`fixed bottom-6 right-6 z-20 transition-opacity duration-300 ${isTabsVisible ? 'opacity-0' : 'opacity-100'}`}>
            <button
              onClick={() => {
                if (contentWrapperRef.current) {
                  contentWrapperRef.current.scrollIntoView({ behavior: 'smooth' });
                  // Make sure we re-enable the tabs when manually scrolling to the section
                  setIsTabsVisible(true);
                }
              }}
              className="bg-peach text-forest p-4 rounded-full shadow-lg hover:bg-peach/90 transition-colors"
              aria-label="Volver a paquetes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
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

          {/* Tabs for Wedding Packages Content */}
          <div 
            ref={tabsSectionRef}
            className={`transition-all duration-300 mb-8 bg-sand/20 p-4 rounded-lg sticky top-0 z-10 ${
              isTabsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-full pointer-events-none'
            }`}
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                  setActiveSection('comparison');
                  // Scroll to content wrapper
                  if (contentWrapperRef.current) {
                    contentWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`px-6 py-3 rounded-full text-forest font-medium transition-colors ${
                  activeSection === 'comparison' 
                    ? 'bg-white shadow-md border-2 border-peach' 
                    : 'bg-white hover:bg-peach/20'
                }`}
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                  </svg>
                  Ver Comparativa de Paquetes
                </span>
              </button>
              <button 
                onClick={() => {
                  setActiveSection('calculator');
                  // Scroll to content wrapper
                  if (contentWrapperRef.current) {
                    contentWrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`px-6 py-3 rounded-full text-forest font-medium transition-colors ${
                  activeSection === 'calculator' 
                    ? 'bg-white shadow-md border-2 border-peach' 
                    : 'bg-white hover:bg-peach/20'
                }`}
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                  </svg>
                  Calcular Presupuesto
                </span>
              </button>
            </div>
          </div>

          {/* Content container with smooth height transition */}
          <div ref={contentWrapperRef} className="relative">
            {/* Comparison section */}
            <section 
              className={`transition-opacity duration-300 ${
                activeSection === 'comparison' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
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
              className={`transition-opacity duration-300 ${
                activeSection === 'calculator' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              <h2 className="text-3xl font-boska font-bold text-forest mb-6">
                Calculadora de Presupuesto
              </h2>
              <p className="text-forest/80 mb-8">
                Personaliza tu paquete seleccionando el número de invitados y adicionales opcionales.
              </p>
              <WeddingCalculator packageData={weddingPackageData} />
            </section>
          </div>

          <section className="mt-16" ref={testimonialsRef}>
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