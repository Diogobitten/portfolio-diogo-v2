'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n';

const LANGUAGE_OPTIONS: { code: Locale; label: string; flag: string }[] = [
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = LANGUAGE_OPTIONS.find((o) => o.code === locale)!;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <path strokeWidth="1.5" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
        </svg>
        <span>{currentOption.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 rounded-md border border-border bg-surface py-1 shadow-lg z-50 min-w-[100px]">
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => { setLocale(opt.code); setIsOpen(false); }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
                opt.code === locale
                  ? 'text-text-primary bg-surface-light'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
              }`}
            >
              <span>{opt.flag}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
