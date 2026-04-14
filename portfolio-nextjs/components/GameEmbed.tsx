'use client';

import { GAME_URL } from '@/lib/constants';
import { useI18n } from '@/lib/i18n/context';

export default function GameEmbed() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 hidden md:block">
      <div className="mb-8">
        <span className="text-sm font-medium uppercase tracking-widest text-text-muted">
          {t.game.label}
        </span>
        <h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          {t.game.title}
        </h2>
        <p className="mt-3 max-w-2xl text-text-secondary">
          {t.game.description} <b>{t.game.playHere}</b>
        </p>
      </div>
      <div className="flex justify-center">
        <iframe
          src={GAME_URL}
          className="rounded-xl border border-border w-full max-w-[620px] aspect-610/440"
          title="Pong Invaders Game"
          style={{ background: '#0a0a0a' }}
          allowFullScreen
        />
      </div>
    </section>
  );
}
