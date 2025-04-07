import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';



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
      <body className="min-h-screen bg-cream text-forest font-switzer">
        <Header />
        <main>{children}</main>
        {/* Footer would go here */}
      </body>
    </html>
  );
}