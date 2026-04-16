'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';
import WeatherWidget from './WeatherWidget';
import CurrencyWidget from './CurrencyWidget';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/lib/i18n/context';

export default function Navbar() {
  const { t } = useI18n();

  const navLinks = [
    { href: '/', label: t.nav.portfolio },
    { href: '/sobre-mim', label: t.nav.about },
    { href: '/projetos', label: t.nav.projects },
  ];

  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-text-primary">
          <Image src="/img/db.png" alt="DB Logo" width={28} height={28} />
          <span className="text-lg font-semibold">Diogo Bittencourt</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <WeatherWidget />
            <CurrencyWidget />
          </div>

          <Link
            href="/#contato"
            className="rounded-md border border-text-secondary px-4 py-1.5 text-sm text-text-primary hover:bg-surface-light transition-colors"
          >
            {t.nav.contact}
          </Link>
        </div>

        <NavbarClient navLinks={navLinks} />
      </nav>
    </header>
  );
}
