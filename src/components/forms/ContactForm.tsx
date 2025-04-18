// src/components/forms/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message: string;
  productInterest: string[];
  weddingPackage?: string;
  estimatedBudget?: string;
  addons?: string;
}

interface ContactFormProps {
  initialPackage?: string;
  initialGuests?: string;
  initialAddons?: string;
  initialBudget?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialPackage,
  initialGuests,
  initialAddons,
  initialBudget
}) => {
  // Create initial message based on wedding calculator data if available
  const initialMessage = initialPackage 
    ? `Estoy interesado en el paquete de boda "${initialPackage}" para ${initialGuests || ''} invitados.\n` +
      (initialAddons ? `Adicionales seleccionados: ${initialAddons}\n` : '') +
      (initialBudget ? `Presupuesto estimado: $${Number(initialBudget).toLocaleString('es-MX')}\n\n` : '') +
      'Por favor, envíenme una cotización detallada.'
    : '';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: initialPackage ? 'Boda' : '',
    eventDate: '',
    guestCount: initialGuests || '',
    message: initialMessage,
    productInterest: initialPackage ? ['Carpas', 'Pistas de baile'] : [],
    weddingPackage: initialPackage || '',
    estimatedBudget: initialBudget || '',
    addons: initialAddons || '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return { ...prev, productInterest: [...prev.productInterest, value] };
      } else {
        return { ...prev, productInterest: prev.productInterest.filter(item => item !== value) };
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Create API submission data (including honeypot for spam protection)
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      productInterest: formData.productInterest.join(', '),
      guestCount: formData.guestCount,
      // Include wedding data if available
      ...(formData.weddingPackage && { weddingPackage: formData.weddingPackage }),
      ...(formData.estimatedBudget && { estimatedBudget: formData.estimatedBudget }),
      ...(formData.addons && { addons: formData.addons }),
      // Honeypot field for spam detection (should remain empty)
      honeypot: '',
    };
    
    try {
      // Send data to the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar el formulario');
      }
      
      console.log('Form submitted successfully:', result);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        message: '',
        productInterest: [],
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Hubo un error al enviar el formulario';
      setSubmitError(errorMessage || 'Por favor, intenta de nuevo.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-cream rounded-lg shadow-sm p-6 md:p-8">
      {submitSuccess ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-peach/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-peach text-2xl">✓</span>
          </div>
          <h3 className="text-2xl font-boska font-bold text-forest mb-2">¡Gracias por contactarnos!</h3>
          <p className="mb-6">Hemos recibido tu mensaje. Nos pondremos en contacto contigo lo antes posible.</p>
          <Button 
            variant="secondary"
            onClick={() => setSubmitSuccess(false)}
          >
            Enviar otro mensaje
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-boska font-bold text-forest mb-6">Solicita información o cotización</h2>
          
          {submitError && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
              {submitError}
            </div>
          )}
          
          {/* Wedding Package Info (if available) */}
          {initialPackage && (
            <div className="mb-6 bg-peach/10 p-4 rounded-lg border border-peach/20">
              <h3 className="font-boska text-lg font-bold text-forest mb-2">
                Información de tu paquete de boda
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-forest">Paquete seleccionado:</p>
                  <p className="text-forest/80">{initialPackage}</p>
                </div>
                {initialGuests && (
                  <div>
                    <p className="font-medium text-forest">Número de invitados:</p>
                    <p className="text-forest/80">{initialGuests}</p>
                  </div>
                )}
                {initialAddons && (
                  <div className="col-span-2">
                    <p className="font-medium text-forest">Adicionales seleccionados:</p>
                    <p className="text-forest/80">{initialAddons}</p>
                  </div>
                )}
                {initialBudget && (
                  <div className="col-span-2">
                    <p className="font-medium text-forest">Presupuesto estimado:</p>
                    <p className="text-forest/80">${initialBudget ? parseInt(initialBudget).toLocaleString('es-MX') : 0}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Nombre completo <span className="text-peach">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Correo electrónico <span className="text-peach">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-2 font-medium">
                Teléfono <span className="text-peach">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
              />
            </div>
            
            <div>
              <label htmlFor="eventType" className="block mb-2 font-medium">
                Tipo de evento <span className="text-peach">*</span>
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
              >
                <option value="">Selecciona una opción</option>
                <option value="Boda">Boda</option>
                <option value="Evento social">Evento social</option>
                <option value="Evento corporativo">Evento corporativo</option>
                <option value="Feria/Exposición">Feria/Exposición</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="eventDate" className="block mb-2 font-medium">
                Fecha del evento
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
              />
            </div>
            
            <div>
              <label htmlFor="guestCount" className="block mb-2 font-medium">
                Número de invitados
              </label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <p className="block mb-2 font-medium">Productos de interés</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="productInterest"
                  value="Carpas"
                  checked={formData.productInterest.includes('Carpas')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Carpas
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="productInterest"
                  value="Pistas de baile"
                  checked={formData.productInterest.includes('Pistas de baile')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Pistas de baile
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="productInterest"
                  value="Entarimados"
                  checked={formData.productInterest.includes('Entarimados')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Entarimados
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="productInterest"
                  value="Graderías"
                  checked={formData.productInterest.includes('Graderías')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Graderías
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="productInterest"
                  value="Plantas de luz"
                  checked={formData.productInterest.includes('Plantas de luz')}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Plantas de luz
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="productInterest"
                  value="Servicios especiales"
                  checked={formData.productInterest.includes('Servicios especiales')}
                 onChange={handleCheckboxChange}
                 className="mr-2"
               />
               Servicios especiales
             </label>
           </div>
         </div>
         
         <div className="mb-6">
           <label htmlFor="message" className="block mb-2 font-medium">
             Mensaje <span className="text-peach">*</span>
           </label>
           <textarea
             id="message"
             name="message"
             value={formData.message}
             onChange={handleChange}
             required
             rows={5}
             className="w-full px-4 py-2 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50"
             placeholder="Cuéntanos más detalles sobre tu evento y tus necesidades específicas"
           ></textarea>
         </div>
         
         <div className="text-center">
           <Button 
             type="submit"
             variant="primary"
             size="lg"
             disabled={isSubmitting}
           >
             {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
           </Button>
         </div>
       </form>
     )}
   </div>
 );
};