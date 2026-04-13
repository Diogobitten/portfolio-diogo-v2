'use client';

import { useEffect, useState, useRef } from 'react';
import { TRANSLATION_API_URL } from '@/lib/constants';
import type { SupportedLanguage, TranslationResponse } from '@/lib/types';

const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

const LS_KEY = 'language';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<SupportedLanguage>('pt');
  const [isOpen, setIsOpen] = useState(false);
  const originalTexts = useRef<Map<Element, string>>(new Map());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY) as SupportedLanguage | null;
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      storeOriginalTexts();
      if (saved !== 'pt') {
        setLanguage(saved);
        translatePage(saved);
      } else {
        setLanguage('pt');
      }
    } else {
      storeOriginalTexts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function storeOriginalTexts() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach((el) => {
      if (!originalTexts.current.has(el)) {
        originalTexts.current.set(el, el.textContent || '');
      }
    });
  }

  async function translatePage(lang: SupportedLanguage) {
    const elements = document.querySelectorAll('[data-translate]');
    const promises = Array.from(elements).map(async (el) => {
      const original = originalTexts.current.get(el) || el.textContent || '';
      if (!original.trim()) return;
      try {
        const res = await fetch(
          `${TRANSLATION_API_URL}?q=${encodeURIComponent(original)}&langpair=pt|${lang}`
        );
        if (!res.ok) return;
        const data: TranslationResponse = await res.json();
        el.textContent = data.responseData.translatedText;
      } catch {
        console.error('Translation failed for:', original);
      }
    });
    await Promise.all(promises);
  }

  function restoreOriginalTexts() {
    originalTexts.current.forEach((text, el) => {
      el.textContent = text;
    });
  }

  async function handleLanguageChange(lang: SupportedLanguage) {
    setLanguage(lang);
    localStorage.setItem(LS_KEY, lang);
    setIsOpen(false);

    storeOriginalTexts();

    if (lang === 'pt') {
      restoreOriginalTexts();
    } else {
      translatePage(lang);
    }
  }

  const currentOption = LANGUAGE_OPTIONS.find((o) => o.code === language)!;

  return (
    <div className="relative" ref={dropdownRef} aria-label="language-switcher">
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
              onClick={() => handleLanguageChange(opt.code)}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
                opt.code === language
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
