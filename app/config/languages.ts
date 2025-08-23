import { de, en, es, fr, it, nl, pl, pt, ro, sv } from '../i18n';
import type { LanguageConfig } from '../types';

/**
 * Default language code for the application
 */
export const defaultLanguage = 'en';

/**
 * Translation resources for all supported languages
 * Each language has its own translation namespace
 */
// Only include default languages in the initial resources
// Other languages will be loaded dynamically
export const resources = {
  de: { translation: de },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  nl: { translation: nl },
  pl: { translation: pl },
  pt: { translation: pt },
  ro: { translation: ro },
  sv: { translation: sv },
};

/**
 * Get i18n common settings with specified language
 * @param language - The language to use as primary language
 * @returns i18n configuration object
 */
export const commonSettings = {
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage, // Always keep defaultLanguage as fallback
  // Configure detection options for language detection
  detection: {
    order: ['path', 'navigator', 'htmlTag'],
    lookupFromPathIndex: 0,
    caches: [],
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

/**
 * Available languages in the application
 * These match the translation files in app/i18n/translations/
 */
export const languages: Record<string, LanguageConfig> = {
  de: {
    code: 'de',
    locale: 'de-DE',
    nativeName: 'Deutsch',
    englishName: 'German',
    dir: 'ltr',
  },
  en: {
    code: 'en',
    locale: 'en-GB',
    nativeName: 'English',
    englishName: 'English',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    locale: 'es-ES',
    nativeName: 'Español',
    englishName: 'Spanish',
    dir: 'ltr',
  },
  fr: {
    code: 'fr',
    locale: 'fr-FR',
    nativeName: 'Français',
    englishName: 'French',
    dir: 'ltr',
  },
  it: {
    code: 'it',
    locale: 'it-IT',
    nativeName: 'Italiano',
    englishName: 'Italian',
    dir: 'ltr',
  },
  nl: {
    code: 'nl',
    locale: 'nl-NL',
    nativeName: 'Nederlands',
    englishName: 'Dutch',
    dir: 'ltr',
  },
  pl: {
    code: 'pl',
    locale: 'pl-PL',
    nativeName: 'Polski',
    englishName: 'Polish',
    dir: 'ltr',
  },
  pt: {
    code: 'pt',
    locale: 'pt-PT',
    nativeName: 'Português',
    englishName: 'Portuguese',
    dir: 'ltr',
  },
  ro: {
    code: 'ro',
    locale: 'ro-RO',
    nativeName: 'Română',
    englishName: 'Romanian',
    dir: 'ltr',
  },
  sv: {
    code: 'sv',
    locale: 'sv-SE',
    nativeName: 'Svenska',
    englishName: 'Swedish',
    dir: 'ltr',
  },
};

/**
 * Supported languages for the application
 */
export const supportedLanguages = Object.keys(languages).sort((a, b) => a.localeCompare(b));

/**
 * Language configs for the application
 */
export const languageConfigs = Object.values(languages).sort((a, b) => a.code.localeCompare(b.code));
