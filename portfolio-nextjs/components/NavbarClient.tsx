'use client';

import { useState } from 'react';
import Link from 'next/link';
import WeatherWidget from './WeatherWidget';
import CurrencyWidget from './CurrencyWidget';
import LanguageSwitcher from './LanguageSwitcher';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  navLinks: NavLink[];
}

export default function NavbarClient({ navLinks }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center gap-1.5 p-2 text-text-secondary hover:text-text-primary transition-colors"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-5 bg-current transition-transform ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-opacity ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-transform ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[57px] z-40 bg-background/95 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Widgets */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <LanguageSwitcher />
              <WeatherWidget />
              <CurrencyWidget />
            </div>

            <Link
              href="#contato"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-text-secondary px-6 py-2 text-lg text-text-primary hover:bg-surface-light transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
