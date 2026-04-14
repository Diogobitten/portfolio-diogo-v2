import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'Sobre Mim | Diogo Bittencourt',
  description:
    'Conheça Diogo Bittencourt — Software Developer & Designer Gráfico.',
  openGraph: {
    title: 'Sobre Mim | Diogo Bittencourt',
    description:
      'Conheça Diogo Bittencourt — Software Developer & Designer Gráfico.',
    images: ['/img/diogo.png'],
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function SobreMimPage() {
  return <AboutContent />;
}
