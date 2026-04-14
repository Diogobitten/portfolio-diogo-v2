import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import GameEmbed from '@/components/GameEmbed';
import PodcastPlayer from '@/components/PodcastPlayer';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Diogo Bittencourt | Software Developer & Designer Gráfico',
  description:
    'Portfólio de Diogo Bittencourt — Software Developer & Designer Gráfico. Transformando ideias em realidade com código limpo, eficiente e escalável.',
  openGraph: {
    title: 'Diogo Bittencourt | Software Developer & Designer Gráfico',
    description:
      'Portfólio de Diogo Bittencourt — Software Developer & Designer Gráfico.',
    images: ['/img/diogo.png'],
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <PortfolioSection />

      <GameEmbed />

      <PodcastPlayer />

      <ContactSection />
    </>
  );
}
