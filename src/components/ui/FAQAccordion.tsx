'use client';
// src/components/ui/FAQAccordion.tsx

import { useState } from 'react';
import { FAQItem } from '@/lib/content/faq';

interface FAQAccordionProps {
  items: FAQItem[];
  initialOpenIndex?: number;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  items,
  initialOpenIndex = -1
}) => {
  const [openIndex, setOpenIndex] = useState<number>(initialOpenIndex);
  
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="border border-forest/10 rounded-lg overflow-hidden"
        >
          <button
            className={`flex justify-between items-center w-full p-5 text-left font-medium focus:outline-none focus:ring-2 focus:ring-peach/40 transition-colors ${
              openIndex === index ? 'bg-peach/10 text-forest' : 'bg-cream hover:bg-sand/40 text-forest'
            }`}
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-lg font-boska">{item.question}</span>
            <span className="ml-6 flex-shrink-0 text-2xl">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-5 bg-cream">
              <p className="text-forest/90 whitespace-pre-line">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};