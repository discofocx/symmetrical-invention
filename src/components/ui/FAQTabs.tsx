'use client';
// src/components/ui/FAQTabs.tsx

import { useState } from 'react';
import { FAQCategory } from '@/lib/content/faq';
import { FAQAccordion } from './FAQAccordion';

interface FAQTabsProps {
  categories: FAQCategory[];
  defaultCategory?: string;
}

export const FAQTabs: React.FC<FAQTabsProps> = ({ 
  categories,
  defaultCategory 
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultCategory || (categories.length > 0 ? categories[0].category : '')
  );
  
  const activeCategory = categories.find(cat => cat.category === activeTab);
  
  return (
    <div>
      {/* Category Tabs */}
      <div className="border-b border-forest/10 mb-8">
        <div className="flex flex-wrap -mb-px">
          {categories.map((category) => (
            <button
              key={category.category}
              className={`inline-block py-4 px-6 text-sm font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach/40 ${
                activeTab === category.category
                  ? 'border-b-2 border-peach text-forest'
                  : 'text-forest/70 hover:text-forest hover:border-b-2 hover:border-forest/20'
              }`}
              onClick={() => setActiveTab(category.category)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Active Category Content */}
      {activeCategory && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-boska font-bold text-forest mb-2">
              {activeCategory.title}
            </h2>
            <p className="text-forest/80">
              {activeCategory.description}
            </p>
          </div>
          
          <FAQAccordion items={activeCategory.items} />
        </div>
      )}
    </div>
  );
};