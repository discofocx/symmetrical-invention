// src/components/ui/WhatsAppButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { WhatsAppIcon } from '@/components/ui/icons/SocialIcons';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
  fixed?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = siteConfig.contact.whatsapp,
  message = siteConfig.whatsapp.defaultMessage,
  className = '',
  children,
  fixed = true
}) => {
  const [isVisible, setIsVisible] = useState(!fixed);

  // Show fixed button after a delay to avoid initial page layout shift
  useEffect(() => {
    if (fixed) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [fixed]);

  // Format the phone number for WhatsApp (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  if (!isVisible) return null;

  // If this is the fixed floating button
  if (fixed) {
    return (
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <div className="w-6 h-6">
          <WhatsAppIcon />
        </div>
      </a>
    );
  }

  // Otherwise, render an inline WhatsApp link with custom styling and content
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Contactar por WhatsApp"
    >
      {children || (
        <span className="flex items-center">
          <div className="w-5 h-5 mr-2">
            <WhatsAppIcon />
          </div>
          Contactar por WhatsApp
        </span>
      )}
    </a>
  );
};
