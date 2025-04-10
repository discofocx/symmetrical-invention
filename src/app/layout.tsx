// src/app/layout.tsx (update)
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { WebVitalsTracking } from '@/components/layout/WebVitalsTracking';
import { PreloadResources } from '@/components/layout/PreloadResources';
import { defaultMetadata } from '@/config/metadata';
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema } from '@/components/structured-data';
import { boska, switzer } from '@/lib/utils/fonts';
import './globals.css';

// Export site metadata
export const metadata = defaultMetadata;

// Set viewport metadata separately
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  themeColor: '#EF9C82' // Peach color from the site's color scheme
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${boska.variable} ${switzer.variable}`}>
      <body className="min-h-screen bg-cream text-forest font-switzer flex flex-col">
        {/* Structured data for rich search results */}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebsiteSchema />
        <WebVitalsTracking />
        <PreloadResources />
        
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}