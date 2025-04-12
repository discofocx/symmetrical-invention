// src/app/faq/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { getFAQCategories, getAllFAQItems } from '@/lib/content/faq';
import { FAQTabs } from '@/components/ui/FAQTabs';
import { FAQSearch } from '@/components/ui/FAQSearch';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Altivento',
  description: 'Respuestas a las preguntas más comunes sobre nuestros servicios de carpas, pistas de baile y más para tu evento.',
};

interface PageProps {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ category?: string }>;
}

export default async function FAQPage({
  searchParams
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const categories = getFAQCategories();
  const allFaqs = getAllFAQItems();
  const defaultCategory = resolvedSearchParams?.category || 'general';

  return (
    <>
      {/* Page Header */}
      <section className="bg-forest text-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-boska font-bold mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg max-w-3xl">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-sand/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-boska font-bold text-forest mb-6 text-center">
            ¿Buscas información específica?
          </h2>
          <FAQSearch initialFaqs={allFaqs} />
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQTabs categories={categories} defaultCategory={defaultCategory} />

          {/* Still have questions */}
          <div className="mt-16 p-8 bg-sand/30 rounded-lg text-center">
            <h2 className="text-2xl font-boska font-bold text-forest mb-4">
              ¿No encontraste la respuesta que buscabas?
            </h2>
            <p className="mb-6">
              Nuestro equipo está listo para responder cualquier pregunta adicional que tengas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contacto">
                <Button variant="primary">Contactar Ahora</Button>
              </Link>
              <a
                href="https://wa.me/524421234567?text=Hola,%20tengo%20una%20pregunta%20sobre%20sus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">Mensaje por WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
