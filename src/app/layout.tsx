// src/app/layout.tsx (update)
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'Altivento - Estructuras para Eventos',
  description: 'Renta e instalación de carpas, pistas de baile, entarimados y más para eventos sociales y corporativos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-cream text-forest font-switzer flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton phoneNumber="524421234567" />
      </body>
    </html>
  );
}