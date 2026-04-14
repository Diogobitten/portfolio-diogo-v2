'use client';

import { useState, useCallback, useRef } from 'react';
import GeometricBackground from './GeometricBackground';
import ParticlesBackground from './ParticlesBackground';
import ParallaxPhoto from './ParallaxPhoto';
import FallingVaders from './FallingVaders';
import { useI18n } from '@/lib/i18n/context';

export default function HeroSection() {
  const [score, setScore] = useState(0);
  const [damageKey, setDamageKey] = useState(0);
  const photoRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const handleDamage = useCallback(() => {
    setDamageKey((k) => k + 1);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-57px)] flex items-center overflow-hidden bg-black">
      <GeometricBackground />
      <ParticlesBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 py-16 md:flex-row md:gap-16 md:py-0">
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          {score !== 0 && (
            <p className={`text-sm font-mono mb-12 ${score > 0 ? 'text-text-secondary' : 'text-red-400'}`}>
              🛸 {Math.abs(score)} invader{Math.abs(score) !== 1 ? 's' : ''} {score > 0 ? (Math.abs(score) !== 1 ? t.hero.invadersDestroyedPlural : t.hero.invadersDestroyed) : (Math.abs(score) !== 1 ? t.hero.invadersLostPlural : t.hero.invadersLost)}
            </p>
          )}

          <p className="text-sm tracking-widest text-text-secondary uppercase">
            Diogo Bittencourt
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            {t.hero.title}{' '}
            <span className="text-text-secondary">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <a
              href="#contato"
              className="rounded-md border border-text-secondary px-6 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-light"
            >
              {t.hero.cta}
            </a>
            <a
              href="#portfolio"
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {t.hero.viewProjects}
            </a>
          </div>
        </div>

        <ParallaxPhoto ref={photoRef} damageKey={damageKey} />
      </div>

      <FallingVaders onScore={setScore} onDamage={handleDamage} photoRef={photoRef} />
    </section>
  );
}
