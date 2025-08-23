import { createInstance, i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { commonSettings, defaultLanguage, isDev, isServer, languages, resources, supportedLanguages } from '../config';
import { LangKey, LanguageConfig } from '../types';

export let i18nInstance: i18n;

/**
 * Determine the language to use based on path and supported languages
 */
const resolveLanguage = (pathLang?: string) => {
  return pathLang && supportedLanguages.includes(pathLang) ? pathLang : defaultLanguage;
};

/**
 * Get or create the singleton i18n instance
 * This is the ONLY way to access the i18n instance throughout the app
 */
const createI18nInstance = (language?: string): i18n => {
  // For SSR hydration consistency, we need to support the requested language
  // but limit resources to prevent server-side errors
  const requestedLanguage = language || domainDefaultLanguage || getDefaultLanguage();
  const serverLanguages: LangKey[] = ['en']; // Always include English fallback

  // Add the requested language for SSR if it's different from English
  if (
    isServer &&
    requestedLanguage !== defaultLanguage &&
    (Object.prototype.hasOwnProperty.call(resources, requestedLanguage) as boolean)
  ) {
    serverLanguages.push(requestedLanguage as LangKey);
  }

  // Minimal resources for SSR | All languages for client
  const initialResources = ((): typeof resources => {
    if (!isServer) return resources;

    const entries = serverLanguages.map(lang => [lang, resources[lang]] as const);

    return Object.fromEntries(entries) as typeof resources;
  })();

  const instance = createInstance({
    ...commonSettings,
    lng: requestedLanguage, // Use the requested language for hydration consistency
    fallbackLng: domainDefaultLanguage,
    preload: isServer ? serverLanguages : supportedLanguages,
    supportedLngs: isServer ? serverLanguages : supportedLanguages,
    // Critical: initialize synchronously to prevent race conditions
    initImmediate: false,
    load: 'languageOnly',
    debug: false,
    saveMissing: isDev ? true : false,
    // Provide resources directly in config for proper initialization
    resources: initialResources,
  });

  // Add plugins before initialization
  instance.use(initReactI18next);

  if (!isServer) {
    instance.use(LanguageDetector);
  }

  try {
    // Initialize synchronously
    instance.init();

    console.log(
      `✅ ${isServer ? 'Server' : 'Client'}: i18n initialized with ${Object.keys(initialResources).length} language(s), default: ${requestedLanguage} for ${isDev ? 'development' : 'production'} env.`
    );
  } catch (error) {
    console.error('❌ Failed to initialize i18n:', error);
  }

  return instance;
};

/**
 * Get the browser language (without region code)
 * @returns Browser language code
 */
const getLanguageFromAcceptLanguage = (request?: Request) => {
  let language = undefined;

  // Client-side: navigator.languages is supported
  if (typeof navigator !== 'undefined' && typeof navigator.languages !== 'undefined') {
    language = (navigator.language || navigator.languages?.[0] || '').split('-')[0];
  }
  // Server-side: Cloudflare worker script compatibility
  else if (typeof request !== 'undefined') {
    const { headers } = request;

    if (headers.get('accept-language')) {
      language = (headers.get('accept-language') || '').split('-')[0];
    }
  }

  return language;
};

/**
 * Get language configuration by language code
 */
export const getLanguageConfig = (code: string): LanguageConfig => {
  // Handle undefined or invalid language codes by falling back to default
  if (!code || !languages[code]) {
    return languages[defaultLanguage];
  }

  return languages[code];
};

/**
 * Extract language code from URL path
 */
export const extractLanguageFromPath = (pathname: string): string => {
  // Handle all possible formats:
  // 1. "/it" or "/it/" (with leading slash)
  // 2. "it" or "it/" (without leading slash, as from ViteReactSSG)
  // 3. Empty string or "/"

  // Ignore well-known paths, root path and empty path
  if (
    !pathname ||
    !pathname.length ||
    pathname === '/' ||
    pathname.search('.well-known') !== -1 ||
    pathname.length !== 2
  ) {
    return '';
  }

  // Remove leading slash if present
  const cleanPath = pathname.startsWith('/') ? pathname.substring(1) : pathname;

  let lang = '';

  // Match /xx/ or /xx
  const match = cleanPath.match(/^\/([\w]{2})(\/|$)/);

  if (match && match[1]) {
    const possibleLang = match[1].toLowerCase();

    if (supportedLanguages.includes(possibleLang)) {
      lang = possibleLang;
    }
  }

  return lang;
};

/**
 * Update HTML document attributes for language
 */
export const updateDocumentLanguageAttributes = (language: string): void => {
  if (typeof document === 'undefined') return;

  const langConfig = getLanguageConfig(language);
  document.documentElement.lang = language;
  document.documentElement.dir = langConfig.dir || 'ltr';

  // Update meta tags if they exist
  const metaLang = document.querySelector('meta[http-equiv="content-language"]');

  if (metaLang) {
    metaLang.setAttribute('content', language);
  }

  // Additional Open Graph locale update (not included in the language service)
  const metaOgLocale = document.querySelector('meta[property="og:locale"]');

  if (metaOgLocale) {
    metaOgLocale.setAttribute('content', langConfig.locale);
  }
};

/**
 * Get the new path for a language change
 */
export const getNextLanguagePath = (currentPath: string, languageCode: string): string => {
  // If we're already on a language path, extract the rest of the path
  const langPathMatch = currentPath.match(/^\/([\w]{2})(\/|$)/);
  const currentLang = langPathMatch && langPathMatch[1];

  // For non-language paths like /privacy-policy
  if (!currentLang && !currentPath.startsWith(`/${languageCode}`)) {
    if (currentPath === '/' || currentPath === '') {
      // If we're on the root path, just add the language code
      return languageCode === domainDefaultLanguage ? '/' : `/${languageCode}`;
    } else {
      // For paths like /privacy-policy, add the language prefix
      const prefix = languageCode === domainDefaultLanguage ? '/' : `/${languageCode}`;

      return `${prefix}${currentPath}`;
    }
  } else if (currentLang && supportedLanguages.includes(languageCode)) {
    // Already has a language prefix, replace it
    const pathWithoutLang = currentPath.substring(3);

    // Handle root path case
    if (!pathWithoutLang || pathWithoutLang === '/') {
      return languageCode === domainDefaultLanguage ? '/' : `/${languageCode}`;
    }

    // Normalize the path to ensure no double slashes
    const normalizedPath = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;

    return languageCode === domainDefaultLanguage ? normalizedPath : `/${languageCode}${normalizedPath}`;
  }

  return currentPath;
};

/**
 * Get the default language based on browser or domain
 */
export const getDefaultLanguage = (request?: Request) => {
  // Start with browser language as the lowest priority default
  let language = undefined;

  // Client-side: location.hostname is supported
  if (typeof location !== 'undefined' && typeof location.hostname !== 'undefined') {
    // PRIORITY 1: Path-based detection - highest priority per specs
    const pathLang = extractLanguageFromPath(location.pathname);

    if (pathLang) {
      language = pathLang;
      console.log(`🌍 Client getDefaultLanguage: Path language detected '/${pathLang}', using ${pathLang}`);
    }
  }
  // Server-side: Use passed request or fallback to globalThis.request
  else if (request) {
    const serverRequest = request;
    const url = new URL(serverRequest.url);
    const pathLang = extractLanguageFromPath(url.pathname);

    // PRIORITY 1: Path-based detection
    if (pathLang && pathLang.length === 2 && supportedLanguages.includes(pathLang)) {
      language = pathLang;
      console.log(`🌍 Server getDefaultLanguage: Path language detected '/${pathLang}', using ${pathLang}`);
    }
  }

  // PRIORITY 3: Accept-Language header detection
  if (!language) {
    language = getLanguageFromAcceptLanguage(request);
  }

  // PRIORITY 4: Default app language
  return resolveLanguage(language);
};

/**
 * Extract language from HTML lang attribute
 * This is the preferred method for client-side detection as it respects
 * the language already set by the Cloudflare Worker
 */
export const getDefaultLanguageFromHtmlTag = (): string | undefined => {
  // Only run in browser environment
  if (typeof document === 'undefined') {
    return undefined;
  }

  try {
    // Get language from HTML tag
    const htmlLang = document.documentElement.lang;

    // Only return if it's a valid language code in our supported list
    if (htmlLang && supportedLanguages.includes(htmlLang)) {
      console.log(`🌍 Found language in HTML tag: ${htmlLang}`);
      return htmlLang;
    }
  } catch (e) {
    console.error('Error extracting language from HTML tag:', e);
  }

  console.log('🌍 No valid language found in HTML tag');

  return undefined;
};

/**
 * Create or return an existing i18n instance
 */
export const createOrReturnI18nInstance = (lng: string) => {
  // If we're on the server, create a new instance
  if (isServer) {
    return createI18nInstance(lng);
  }

  // If we're on the client, return the existing instance or create a new one
  if (!i18nInstance) {
    i18nInstance = createI18nInstance(lng);
  }

  return i18nInstance;
};

/**
 * Default language code for the application
 */
export const domainDefaultLanguage = getDefaultLanguage();
