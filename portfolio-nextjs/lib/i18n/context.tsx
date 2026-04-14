'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { getTranslations, type Locale, type Translations } from './index';

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'pt',
  t: getTranslations('pt'),
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Locale | null;
      if (saved && ['pt', 'en', 'es'].includes(saved)) return saved;
    }
    return 'pt';
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('language', newLocale);
  }, []);

  const t = getTranslations(locale);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
