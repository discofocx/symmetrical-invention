// src/components/forms/ContactForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  validateName,
  validateEmail,
  validateMexicanPhone,
  validateMessage,
  validateContactForm,
} from '@/lib/validation/contact-form';

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

interface HoneypotFields {
  website: string;
  company: string;
  faxNumber: string;
}

// Rate limiting constants
const RATE_LIMIT_KEY = 'altivento_contact_last_submit';
const RATE_LIMIT_DURATION = 60000; // 60 seconds

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

  // Validation state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Honeypot fields (spam prevention)
  const [honeypotFields, setHoneypotFields] = useState<HoneypotFields>({
    website: '',
    company: '',
    faxNumber: '',
  });

  // Timing-based spam detection
  const [formLoadTime] = useState<number>(Date.now());

  // Rate limiting state
  const [rateLimited, setRateLimited] = useState(false);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0);

  // Check rate limit on mount and update countdown
  useEffect(() => {
    const checkRateLimit = () => {
      try {
        const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
        if (lastSubmit) {
          const elapsed = Date.now() - parseInt(lastSubmit, 10);
          if (elapsed < RATE_LIMIT_DURATION) {
            setRateLimited(true);
            setRateLimitCountdown(Math.ceil((RATE_LIMIT_DURATION - elapsed) / 1000));
            return true;
          }
        }
        setRateLimited(false);
        setRateLimitCountdown(0);
        return false;
      } catch {
        // localStorage not available (private browsing)
        return false;
      }
    };

    checkRateLimit();

    const interval = setInterval(() => {
      if (rateLimited) {
        checkRateLimit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimited]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate field on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let error: string | null = null;

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validateMexicanPhone(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
    }

    if (error) {
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }
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

    // Check rate limit
    if (rateLimited) {
      setSubmitError(`Por favor espera ${rateLimitCountdown} segundos antes de enviar otro mensaje.`);
      return;
    }

    // Validate all fields before submission
    const errors = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError('Por favor, corrige los errores en el formulario.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Calculate time spent filling the form
    const fillTime = Date.now() - formLoadTime;

    // Create API submission data (including honeypot and timing for spam protection)
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
      // Honeypot fields for spam detection (should remain empty)
      honeypot: '',
      website: honeypotFields.website,
      company: honeypotFields.company,
      faxNumber: honeypotFields.faxNumber,
      // Timing data for spam detection
      _timing: fillTime,
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

      // Set rate limit
      try {
        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
        setRateLimited(true);
        setRateLimitCountdown(60);
      } catch {
        // localStorage not available
      }

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
      setFieldErrors({});
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
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50 ${
                  fieldErrors.name ? 'border-red-500' : 'border-forest/20'
                }`}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
              )}
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
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50 ${
                  fieldErrors.email ? 'border-red-500' : 'border-forest/20'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              )}
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
                onBlur={handleBlur}
                required
                placeholder="10 dígitos"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50 ${
                  fieldErrors.phone ? 'border-red-500' : 'border-forest/20'
                }`}
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
              )}
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
             onBlur={handleBlur}
             required
             rows={5}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/50 ${
               fieldErrors.message ? 'border-red-500' : 'border-forest/20'
             }`}
             placeholder="Cuéntanos más detalles sobre tu evento y tus necesidades específicas"
           ></textarea>
           {fieldErrors.message && (
             <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
           )}
         </div>

         {/* Honeypot fields - hidden from users, visible to bots */}
         <div style={{ display: 'none' }} aria-hidden="true">
           <label htmlFor="website">Website</label>
           <input
             type="text"
             id="website"
             name="website"
             value={honeypotFields.website}
             onChange={(e) => setHoneypotFields(prev => ({ ...prev, website: e.target.value }))}
             tabIndex={-1}
             autoComplete="off"
           />
         </div>
         <div
           style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
           aria-hidden="true"
         >
           <label htmlFor="company">Company</label>
           <input
             type="text"
             id="company"
             name="company"
             value={honeypotFields.company}
             onChange={(e) => setHoneypotFields(prev => ({ ...prev, company: e.target.value }))}
             tabIndex={-1}
             autoComplete="off"
           />
         </div>
         <div
           style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute' }}
           aria-hidden="true"
         >
           <input
             type="text"
             name="fax_number"
             value={honeypotFields.faxNumber}
             onChange={(e) => setHoneypotFields(prev => ({ ...prev, faxNumber: e.target.value }))}
             tabIndex={-1}
             autoComplete="off"
           />
         </div>

         <div className="text-center">
           <Button
             type="submit"
             variant="primary"
             size="lg"
             disabled={isSubmitting || rateLimited}
           >
             {isSubmitting
               ? 'Enviando...'
               : rateLimited
                 ? `Espera ${rateLimitCountdown}s`
                 : 'Enviar Solicitud'}
           </Button>
           {rateLimited && (
             <p className="mt-2 text-sm text-forest/60">
               Por favor espera antes de enviar otro mensaje
             </p>
           )}
         </div>
       </form>
     )}
   </div>
 );
};