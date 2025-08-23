import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, type LinkProps } from 'react-router';
import { supportedLanguages } from '../config';
import { domainDefaultLanguage } from '../services';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: ReactNode;
}

/**
 * A wrapper around React Router's Link component that automatically
 * adds the current language prefix to the URL.
 */
export const LocalizedLink = ({ to, children, ...rest }: LocalizedLinkProps) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Don't add language prefix for external links or anchors
  if (to.startsWith('http') || to.startsWith('#') || to.startsWith('mailto:')) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }

  // Don't add language prefix for default language
  if (currentLanguage === domainDefaultLanguage) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }

  // Add language prefix for supported languages
  if (supportedLanguages.includes(currentLanguage)) {
    // Handle root path
    if (to === '/') {
      return (
        <Link to={`/${currentLanguage === domainDefaultLanguage ? '' : currentLanguage}`} {...rest}>
          {children}
        </Link>
      );
    }

    // Handle other paths
    const localizedTo = to.startsWith('/')
      ? `/${currentLanguage === domainDefaultLanguage ? '' : currentLanguage}${to}`
      : `/${currentLanguage === domainDefaultLanguage ? '' : currentLanguage}/${to}`;

    return (
      <Link to={localizedTo} {...rest}>
        {children}
      </Link>
    );
  }

  // Fallback to regular Link
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};
