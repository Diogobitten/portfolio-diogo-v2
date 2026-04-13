import type { Metadata } from 'next';
import PortfolioSection from '@/components/PortfolioSection';

export const metadata: Metadata = {
  title: 'Projetos | Diogo Bittencourt',
  description:
    'Todos os projetos de Diogo Bittencourt — Desenvolvedor Full-stack & Designer Gráfico. Explore repositórios, aplicações e experimentos.',
  openGraph: {
    title: 'Projetos | Diogo Bittencourt',
    description:
      'Todos os projetos de Diogo Bittencourt — Desenvolvedor Full-stack & Designer Gráfico.',
    images: ['/img/diogo.png'],
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function ProjetosPage() {
  return (
    <div className="min-h-screen">
      <PortfolioSection showAll />
    </div>
  );
}
