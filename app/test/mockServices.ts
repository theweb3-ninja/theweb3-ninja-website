/* eslint-disable @typescript-eslint/no-explicit-any */
// Centralized service mocks for testing
import { vi } from 'vitest';

// Helper function to create a properly chainable mock function
const createChainableMock = (implementation: any) => {
  // Create a simple mock function without trying to modify read-only properties
  return vi.fn(implementation);
};

export const mockLanguageService = {
  getLanguageConfig: createChainableMock((lang: string) => {
    if (lang === 'ar') return { dir: 'rtl' };
    return { dir: 'ltr' };
  }),

  getDefaultLanguage: createChainableMock(() => {
    // First check if we can get language from path
    const pathname = window?.location?.pathname || '/';
    const pathLang = mockLanguageService.extractLanguageFromPath(pathname);
    if (pathLang) return pathLang;

    // Next check if we have a language from the HTML tag
    const htmlLang = mockLanguageService.getDefaultLanguageFromHtmlTag();
    if (htmlLang && mockConfig.supportedLanguages.includes(htmlLang)) {
      return htmlLang;
    }

    // Fall back to domain-based language
    const host = window?.location?.host || '';
    const domainLang = mockLanguageService.extractLanguageFromDomain(host);
    if (domainLang) return domainLang;

    // Default to English if no language is detected
    return 'en';
  }),

  detectLanguage: createChainableMock((pathname: unknown, htmlLang: string) => {
    // First check if we can get language from path
    const pathLang = mockLanguageService.extractLanguageFromPath(pathname);
    if (pathLang) return pathLang;

    // Next check if we have a language from the HTML tag
    if (htmlLang && mockConfig.supportedLanguages.includes(htmlLang)) {
      return htmlLang;
    }

    // Fall back to domain-based language
    const host = window?.location?.host || '';
    const domainLang = mockLanguageService.extractLanguageFromDomain(host);
    if (domainLang) return domainLang;

    // Default to English if no language is detected
    return 'en';
  }),

  getDefaultLanguageFromHtmlTag: createChainableMock(() => {
    // Get language from HTML tag
    const htmlLang = document?.documentElement?.lang;
    if (!htmlLang) return undefined;
    if (mockConfig.supportedLanguages.includes(htmlLang)) return htmlLang;
    return undefined;
  }),

  extractLanguageFromPath: createChainableMock((path: string) => {
    if (!path) return '';

    // Normalize the path and extract first segment
    const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
    const segments = normalizedPath.split('/').filter(Boolean);
    if (segments.length === 0) return '';

    const firstSegment = segments[0];

    // Check if it's a supported language code
    if (mockConfig.supportedLanguages.includes(firstSegment)) {
      return firstSegment;
    }

    // Special cases for tests
    if (path === '/es' || path === 'es') return 'es';
    if (path === '/es/products' || path === 'es/products') return 'es';
    if (path.includes('/es/')) return 'es';

    return '';
  }),
  createI18nInstance: createChainableMock((lang: any) => ({
    language: lang,
    t: vi.fn(key => key),
    use: vi.fn().mockReturnThis(),
    init: vi.fn(),
  })),
  updateDocumentLanguageAttributes: createChainableMock((lang: string) => {
    if (!document || !document.documentElement) return;

    document.documentElement.lang = lang;

    // Set direction based on language
    const rtlLanguages = ['ar', 'he'];
    document.documentElement.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';

    // Update meta tag if it exists
    const metaTag = document.querySelector('meta[http-equiv="content-language"]');
    if (metaTag) {
      metaTag.setAttribute('content', lang);
    }
  }),

  extractLanguageFromDomain: createChainableMock((host: string) => {
    if (!host) return '';

    // Check TLD for language hint
    if (host.endsWith('.it')) return 'it';
    if (host.endsWith('.es')) return 'es';
    if (host.endsWith('.fr')) return 'fr';
    if (host.endsWith('.de')) return 'de';

    // No language detected from domain
    return '';
  }),
};

// Mock config
export const mockConfig = {
  supportedLanguages: ['en', 'it', 'es', 'fr', 'de', 'ar'],
  languageConfig: {
    en: { dir: 'ltr' },
    it: { dir: 'ltr' },
    es: { dir: 'ltr' },
    fr: { dir: 'ltr' },
    de: { dir: 'ltr' },
    ar: { dir: 'rtl' },
  },
  getLanguageConfig: function (lang: string) {
    return this.languageConfig[lang as keyof typeof this.languageConfig] || { dir: 'ltr' };
  },
};
