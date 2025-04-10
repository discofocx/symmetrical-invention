// src/components/ui/WhatsAppButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = siteConfig.contact.whatsapp,
  message = siteConfig.whatsapp.defaultMessage
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a delay to avoid initial page layout shift
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Format the phone number for WhatsApp (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  if (!isVisible) return null;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-6 h-6"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 22.5C5.647 22.5 1 17.12 1 10.5 1 3.891 5.647 0 12 0c6.352 0 11 3.89 11 10.5 0 6.61-4.648 12-11 12zm6.974-3.934c.971-.594 1.888-1.348 2.688-2.276C23.155 13.423 24 11.92 24 10.5c0-7.173-5.373-12-12-12S0 3.327 0 10.5c0 1.42.845 2.923 2.338 4.79.8.928 1.716 1.682 2.687 2.276L4.5 22.5l4.474-1.934z" />
      </svg>
    </a>
  );
};