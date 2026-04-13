import type { Metadata } from 'next';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sobre Mim | Diogo Bittencourt',
  description:
    'Conheça Diogo Bittencourt — Desenvolvedor Full-stack & Designer Gráfico. Formação, experiência profissional e habilidades.',
  openGraph: {
    title: 'Sobre Mim | Diogo Bittencourt',
    description:
      'Conheça Diogo Bittencourt — Desenvolvedor Full-stack & Designer Gráfico.',
    images: ['/img/diogo.png'],
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function SobreMimPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      {/* Profile photo + name */}
      <div className="flex flex-col items-center text-center">
        <Image
          src="/img/diogo.png"
          alt="Diogo Bittencourt"
          width={160}
          height={160}
          className="rounded-full object-cover grayscale"
          priority
        />

        <h1 className="mt-6 text-3xl font-bold text-text-primary sm:text-4xl">
          Diogo Bittencourt
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          Desenvolvedor Full-stack &amp; Designer Gráfico
        </p>
      </div>

      {/* Download CV + Social links */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="/docs/cv_diogo_bittencourt_dev_brasil.pdf"
          download="Curriculo_Diogo_Bittencourt.pdf"
          className="flex items-center gap-2 rounded-md border border-text-secondary px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-light"
        >
          <span>Baixar CV</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>

        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </a>

        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>

      {/* Description */}
      <div className="mt-16 space-y-6 text-base leading-relaxed text-text-secondary">
        <p>
          <strong className="text-text-primary">
            Sou estudante de Análise e Desenvolvimento de Sistemas
          </strong>
          , com foco em me tornar um{' '}
          <strong className="text-text-primary">Desenvolvedor Full Stack</strong>.
          Atualmente, estou estudando{' '}
          <strong className="text-text-primary">
            JavaScript, Java, Python e HTML/CSS
          </strong>
          , sempre buscando novas oportunidades para aprimorar minhas habilidades e
          trabalhar em projetos desafiadores.
        </p>

        <p>
          <strong className="text-text-primary">
            Com 10 anos de experiência em design
          </strong>
          , sou especializado em Design Gráfico, Web Design, UX/UI, Branding e Gestão
          de Projetos.{' '}
          <a
            href={SOCIAL_LINKS.designPortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary underline underline-offset-4 transition-colors hover:text-white"
          >
            Confira os trabalhos de design aqui
          </a>
          .
        </p>

        <p>
          Meu objetivo é criar{' '}
          <strong className="text-text-primary">
            soluções criativas e centradas no usuário
          </strong>
          , que atendam às necessidades dos clientes e proporcionem experiências
          incríveis. Sou{' '}
          <strong className="text-text-primary">colaborativo</strong>,{' '}
          <strong className="text-text-primary">comunicativo</strong> e estou
          constantemente me atualizando com as tendências do mercado e tecnologias
          emergentes. Empolgado e preparado para encarar novos desafios que combinem
          tecnologia e criatividade!
        </p>
      </div>

      {/* FIAP + Contact */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-16">
        {/* FIAP */}
        <div className="flex flex-col items-center">
          <p className="mb-2 text-xs text-text-muted">Cursando:</p>
          <Image
            src="/img/fiap.png"
            alt="Logo da FIAP"
            width={96}
            height={96}
            className="rounded-full"
          />
          <p className="mt-2 text-sm text-text-secondary">
            FIAP — Análise e Desenvolvimento de Sistemas
          </p>
        </div>
      </div>
    </section>
  );
}
