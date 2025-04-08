import WeddingPackagesPage from '@/components/wedding/WeddingPackagesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paquetes para Bodas | Altivento + Quinta El Refugio',
  description: 'Descubre nuestros paquetes especiales para bodas: una colaboración exclusiva entre Altivento y Quinta El Refugio. Infraestructura completa y espacios inolvidables para tu boda.',
  openGraph: {
    title: 'Paquetes para Bodas | Altivento + Quinta El Refugio',
    description: 'Descubre nuestros paquetes especiales para bodas: una colaboración exclusiva entre Altivento y Quinta El Refugio.',
    images: ['/images/og-wedding-packages.jpg'],
  },
};

export default function WeddingPage() {
  return <WeddingPackagesPage />;
}