'use client';

import { useEffect, useState } from 'react';
import { GitHubRepo, RepoMedia } from '@/lib/types';
import { extractMediaLinks } from '@/lib/utils';

interface ProjectCardProps {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  const [media, setMedia] = useState<RepoMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReadme() {
      try {
        const response = await fetch(
          `/api/github/readme?owner=${repo.owner.login}&repo=${repo.name}`
        );
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const { content } = await response.json();
        if (!content) {
          setLoading(false);
          return;
        }
        const links = extractMediaLinks(repo.owner.login, repo.name, content);
        setMedia(links);
      } catch {
        // Silently fail — will show placeholder
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, [repo.owner.login, repo.name]);

  const firstMedia = media[0] ?? null;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => window.open(repo.html_url, '_blank')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.open(repo.html_url, '_blank');
        }
      }}
      className="cursor-pointer overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:scale-[1.02] hover:border-text-secondary"
    >
      {/* Media area */}
      <div className="relative h-48 w-full bg-surface-light">
        {loading ? (
          <div className="flex h-full w-full animate-pulse items-center justify-center bg-surface-light">
            <div className="h-8 w-8 rounded-full border-2 border-text-muted border-t-transparent animate-spin" />
          </div>
        ) : firstMedia ? (
          firstMedia.type === 'video' ? (
            <video
              className="h-full w-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              onClick={(e) => e.stopPropagation()}
            >
              <source src={firstMedia.url} type={`video/${firstMedia.url.split('.').pop()}`} />
            </video>
          ) : (
            <img
              src={firstMedia.url}
              alt={`Imagem do projeto ${repo.name}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
            <span className="text-sm">Sem mídia</span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary">{repo.name}</h3>
        <p className="mt-1 text-sm text-text-secondary line-clamp-2">
          {repo.description || 'Sem descrição disponível'}
        </p>
      </div>
    </div>
  );
}
