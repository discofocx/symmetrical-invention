'use client';
// src/components/ui/FAQSearch.tsx

import { useState } from 'react';
import { FAQItem } from '@/lib/content/faq';
import { FAQAccordion } from './FAQAccordion';

interface FAQSearchProps {
  initialFaqs: FAQItem[];
}

export const FAQSearch: React.FC<FAQSearchProps> = ({ initialFaqs }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FAQItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      // Client-side search implementation
      const normalizedQuery = query.toLowerCase().trim();
      const searchResults = initialFaqs.filter(item => 
        item.question.toLowerCase().includes(normalizedQuery) || 
        item.answer.toLowerCase().includes(normalizedQuery)
      );
      
      setResults(searchResults);
      setHasSearched(true);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar preguntas o palabras clave..."
              className="w-full px-4 py-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach/40"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-forest text-cream px-6 py-3 rounded-lg font-medium transition-colors hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest"
          >
            Buscar
          </button>
        </div>
      </form>
      
      {hasSearched && (
        <div>
          {results.length > 0 ? (
            <div>
              <h3 className="text-xl font-boska font-medium text-forest mb-4">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{query}"
              </h3>
              <FAQAccordion items={results} initialOpenIndex={0} />
            </div>
          ) : (
            <div className="text-center py-8 bg-sand/20 rounded-lg">
              <h3 className="text-xl font-boska font-medium text-forest mb-2">
                No se encontraron resultados para "{query}"
              </h3>
              <p className="text-forest/70">
                Intenta con diferentes palabras o contacta con nosotros para preguntas específicas.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};