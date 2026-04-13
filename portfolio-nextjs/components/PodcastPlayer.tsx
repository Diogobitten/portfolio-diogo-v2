'use client';

import { SPOTIFY_SHOW_ID } from '@/lib/constants';

export default function PodcastPlayer() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-8">
        <span className="text-sm font-medium uppercase tracking-widest text-text-muted">
          Podcast
        </span>
        <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          Ouça meu podcast
        </h2>
      </div>

      <iframe
        src={`https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator&theme=0`}
        width="100%"
        height={152}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
        title="Spotify Podcast Player"
      />
    </section>
  );
}
