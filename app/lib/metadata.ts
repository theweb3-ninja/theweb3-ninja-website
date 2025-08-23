import { TFunction } from 'i18next';
import { MetaTagConfig, PageMetadata, SeoMetaOptions } from 'shared';
import {
  companyInfo,
  contactInfo,
  DOMAIN_ITALY,
  DOMAIN_SPAIN,
  supportedLanguages,
  URL_GLOBAL,
  URL_ITALY,
  URL_SPAIN,
} from '../config';
import { getDefaultLanguage, getDefaultLanguageByDomain, getLanguageConfig } from '../services';

/**
 * Get the current language metadata from i18n translations
 * @param language - The language code to get metadata for
 */
const getMetadataForLanguage = (t: TFunction<'translation', undefined>) => {
  return {
    slogan: t('metadata.slogan'),
    description: t('metadata.description'),
    keywords: t('metadata.keywords'),
    tagline: t('metadata.tagline'),
  };
};

/**
 * Get site metadata for the current language
 * This function can be called with the current language to get localized metadata
 */
const getSiteMetadata = (t: TFunction<'translation', undefined>, language: string) => {
  const metadata = getMetadataForLanguage(t);
  const langConfig = getLanguageConfig(language);

  return {
    siteUrl: companyInfo.website,
    siteName: companyInfo.name,
    defaultTitle: metadata.slogan,
    defaultDescription: metadata.description,
    defaultKeywords: metadata.keywords,
    defaultImage: '/images/og-image.png',
    locale: langConfig.locale,
    language: langConfig.code,
    themeColor: '#8929ff',
  };
};

/**
 * Get organization schema for the current language
 * This function can be called with the current language to get localized schema
 */
export const getOrganizationSchema = (t: TFunction<'translation', undefined>, language: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name,
    description: t('metadata.description'),
    url: companyInfo.website,
    logo: `${companyInfo.website}/images/logo.png`,
    sameAs: `${companyInfo.website}/${language}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactInfo.email.value,
      contactType: 'customer service',
    },
  };
};

/**
 * Helper function to generate page metadata
 * @param options - Metadata options
 * @param language - Optional language code to get language-specific metadata
 */
const getPageMetadata = (
  { title, description, image }: PageMetadata,
  t: TFunction<'translation', undefined>,
  language?: string
) => {
  // Get language-specific metadata if a language is provided
  // Ensure we're using a string language code
  const languageCode = language || getDefaultLanguage();
  const localizedMetadata = getSiteMetadata(t, languageCode);

  // Use provided values or fallback to localized defaults
  const finalTitle = title || localizedMetadata.defaultTitle;
  const finalDescription = description || localizedMetadata.defaultDescription;
  const finalImage = image || localizedMetadata.defaultImage;

  // Format page title with site name if it's not the default title and doesn't already contain the site name
  const pageTitle =
    finalTitle === localizedMetadata.defaultTitle || finalTitle.includes(localizedMetadata.siteName)
      ? finalTitle
      : `${finalTitle} | ${localizedMetadata.siteName}`;

  return {
    title: pageTitle,
    description: finalDescription,
    image: finalImage.startsWith('http') ? finalImage : `${localizedMetadata.siteUrl}${finalImage}`,
  };
};

/**
 * Get meta tag configuration for a specific domain
 * @param hostname - The hostname to get meta tags for
 * @returns MetaTagConfig object with appropriate meta tag settings
 */
const getMetaCanonical = (hostname: string, language?: string, pathname?: string): MetaTagConfig => {
  // Default canonical URL
  let canonical = `${URL_GLOBAL}${language === getDefaultLanguageByDomain(hostname) ? pathname : `${pathname?.substring(3)}`}`;

  // Common alternate links for all domains
  let commonAlternates = [
    { href: `${URL_GLOBAL}${pathname}`, hreflang: 'en-gb' },
    { href: `${URL_ITALY}${pathname}`, hreflang: 'it-it' },
    { href: `${URL_SPAIN}${pathname}`, hreflang: 'es-es' },
    { href: `${URL_GLOBAL}${pathname}`, hreflang: 'x-default' },
  ];

  const otherAlternates = supportedLanguages.map(lang => ({
    href: `${URL_GLOBAL}/${lang}${pathname?.substring(3)}`,
    hreflang: `${lang}-${lang === 'en' ? 'gb' : lang}`,
  }));

  // Check for specific domains
  if (hostname.includes(DOMAIN_ITALY) || hostname === DOMAIN_ITALY) {
    canonical = `${URL_ITALY}${language === getDefaultLanguageByDomain(hostname) ? pathname : `${pathname?.substring(3)}`}`;
    commonAlternates = [...commonAlternates, { href: `${URL_ITALY}${pathname}`, hreflang: 'it-it' }];
  } else if (hostname.includes(DOMAIN_SPAIN) || hostname === DOMAIN_SPAIN) {
    canonical = `${URL_SPAIN}${language === getDefaultLanguageByDomain(hostname) ? pathname : `${pathname?.substring(3)}`}`;
    commonAlternates = [...commonAlternates, { href: `${URL_SPAIN}${pathname}`, hreflang: 'es-es' }];
  }

  return {
    canonical,
    alternates: [...commonAlternates, ...otherAlternates],
  };
};

/**
 * Internal function to generate meta tags - shared logic for both hook and utility
 */
export const generateMetaTags = (
  t: TFunction<'translation', undefined>,
  options: SeoMetaOptions,
  pathname?: string
) => {
  const { title, description, image, keywords, language, noIndex, hostname } = options;
  const { canonical, alternates } = getMetaCanonical(hostname, language, pathname);
  const currentLanguage = language || getDefaultLanguageByDomain(options.hostname) || getDefaultLanguage();
  const currentLangConfig = getLanguageConfig(currentLanguage);

  // Get localized metadata for the current language
  const localizedMetadata = getSiteMetadata(t, currentLanguage);

  // Get metadata translations directly from i18n
  const metadataSlogan = t('metadata.slogan', { defaultValue: localizedMetadata.defaultTitle });
  const metadataDescription = t('metadata.description', { defaultValue: localizedMetadata.defaultDescription });
  const metadataKeywords = t('metadata.keywords', { defaultValue: localizedMetadata.defaultKeywords });

  // Use provided values or fallback to localized defaults
  const finalTitle = title || metadataSlogan;
  const finalDescription = description || metadataDescription;
  const finalImage = image || localizedMetadata.defaultImage;
  const finalKeywords = keywords || metadataKeywords;

  const metadata = getPageMetadata(
    {
      title: finalTitle,
      description: finalDescription,
      image: finalImage,
    },
    t,
    currentLanguage
  );

  // Return meta array compatible with React Router v7
  return [
    // Basic meta tags
    { title: metadata.title },
    { name: 'description', content: metadata.description },
    { name: 'keywords', content: finalKeywords },

    // Standard meta tags
    { httpEquiv: 'content-language', content: currentLangConfig.code },
    { name: 'lang', content: currentLangConfig.code },
    { name: 'language', content: currentLangConfig.code },
    { name: 'theme-color', content: localizedMetadata.themeColor },
    { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' },

    // Open Graph for Facebook, LinkedIn
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: localizedMetadata.siteName },
    { property: 'og:title', content: metadata.title },
    { property: 'og:description', content: metadata.description },
    { property: 'og:image', content: metadata.image },
    { property: 'og:url', content: canonical },
    { property: 'og:locale', content: currentLangConfig.locale },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: metadata.title },
    { name: 'twitter:description', content: metadata.description },
    { name: 'twitter:image', content: metadata.image },

    // Canonical link
    { tagName: 'link', rel: 'canonical', href: canonical },
    ...alternates.map(alternate => ({
      tagName: 'link',
      rel: 'alternate',
      href: alternate.href,
      hreflang: alternate.hreflang,
    })),
    ...(noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ];
};
