'use client';

import { GAME_URL } from '@/lib/constants';

export default function GameEmbed() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 hidden md:block">
      <div className="mb-8">
        <span className="text-sm font-medium uppercase tracking-widest text-text-muted">
          Game
        </span>
        <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          Pong Invaders
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Um jogo criado com p5.js. Jogue diretamente aqui!
        </p>
      </div>

      <div className="flex justify-center">
        <iframe
          src={GAME_URL}
          className="rounded-xl border border-border w-full max-w-[620px] aspect-[620/460]"
          title="Pong Invaders Game"
          style={{ background: '#0a0a0a' }}
          allowFullScreen
        />
      </div>
    </section>
  );
}
