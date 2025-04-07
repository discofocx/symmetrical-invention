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
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
    productInterest: [],
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
    
    try {
      // In a real implementation, this would send data to an API endpoint
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
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
    } catch (error) {
      setSubmitError('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
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