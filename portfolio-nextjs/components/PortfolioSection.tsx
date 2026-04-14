'use client';

import { useEffect, useState } from 'react';
import { GitHubRepo } from '@/lib/types';
import { filterRepos, getTopRepos } from '@/lib/utils';
import ProjectCard from './ProjectCard';
import { useI18n } from '@/lib/i18n/context';

interface PortfolioSectionProps {
  showAll?: boolean;
}

export default function PortfolioSection({ showAll = false }: PortfolioSectionProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 6;
  const { t } = useI18n();

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) throw new Error('Erro ao buscar repositórios');
        const data: GitHubRepo[] = await response.json();

        const filtered = filterRepos(data);
        const displayRepos = showAll ? filtered : getTopRepos(filtered);
        setRepos(displayRepos);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [showAll]);

  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-4 py-20">
      {/* Section header */}
      <div className="mb-12">
        <span className="text-sm font-medium uppercase tracking-widest text-text-muted">
          {t.portfolio.label}
        </span>
        <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          {t.portfolio.title}
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          {t.portfolio.description}
        </p>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-xl border border-border bg-surface"
            >
              <div className="h-48 bg-surface-light" />
              <div className="p-4">
                <div className="h-5 w-2/3 rounded bg-surface-light" />
                <div className="mt-2 h-4 w-full rounded bg-surface-light" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error fallback */}
      {error && !loading && (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <p className="text-text-secondary">
            Não foi possível carregar os projetos. Tente novamente mais tarde.
          </p>
        </div>
      )}

      {/* Repos grid */}
      {!loading && !error && (() => {
        const totalPages = showAll ? Math.ceil(repos.length / PER_PAGE) : 1;
        const displayRepos = showAll
          ? repos.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
          : repos;

        return (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayRepos.map((repo) => (
                <ProjectCard key={repo.name} repo={repo} staticMedia={showAll} />
              ))}
            </div>

            {showAll && totalPages > 1 && (
              <div className="mt-10 flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-text-primary text-background'
                        : 'border border-border text-text-secondary hover:bg-surface-light hover:text-text-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}

            {!showAll && (
              <div className="mt-10 flex justify-start">
                <a
                  href="/projetos"
                  className="rounded-md border border-text-secondary px-6 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-light"
                >
                  {t.portfolio.viewMore}
                </a>
              </div>
            )}
          </>
        );
      })()}
    </section>
  );
}
