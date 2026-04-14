import pt from './pt.json';
import en from './en.json';
import es from './es.json';

export type Locale = 'pt' | 'en' | 'es';

const translations = { pt, en, es } as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export type Translations = typeof pt;
