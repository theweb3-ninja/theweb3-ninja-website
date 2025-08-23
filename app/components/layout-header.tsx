import { useTranslation } from 'react-i18next';
import { isFeatureEnabled } from '../lib/features';
import { ClientOnlyLanguageSelector } from './client-only-language-selector';
import { ClientOnlyLocalizedLink } from './client-only-localized-link';
import { ClientOnlyThemeToggle } from './client-only-theme-toggle';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className={`w-full flex justify-between items-center container mx-auto px-6 py-4 ${className}`}>
      <div className="flex justify-start">
        <ClientOnlyLocalizedLink to="/" title={t('header.logoTitle')}>
          <img
            src="/images/logo-removebg.png"
            alt={t('header.logoAlt')}
            width={160}
            height={45.59}
            className="w-[120px] h-auto md:w-[150px] border-0"
          />
        </ClientOnlyLocalizedLink>
      </div>

      {/* Top right controls */}
      <div className="flex items-center space-x-2">
        <ClientOnlyLanguageSelector />
        {isFeatureEnabled('darkTheme') && <ClientOnlyThemeToggle />}
      </div>

      {/* Navigation Menu */}
      {/* <nav className='flex justify-center'>
        <div className='flex space-x-6 text-sm text-gray-600'>
          <ClientOnlyLocalizedLink to='/#how-it-works' className='hover:text-purple-600 transition-colors'>
            {t('nav.howItWorks', 'How It Works')}
          </ClientOnlyLocalizedLink>
          <ClientOnlyLocalizedLink to='/#features' className='hover:text-purple-600 transition-colors'>
            {t('nav.features', 'Features')}
          </ClientOnlyLocalizedLink>
          <ClientOnlyLocalizedLink to='/#testimonials' className='hover:text-purple-600 transition-colors'>
            {t('nav.testimonials', 'Testimonials')}
          </ClientOnlyLocalizedLink>
          <ClientOnlyLocalizedLink to='/#faq' className='hover:text-purple-600 transition-colors'>
            {t('nav.faq', 'FAQ')}
          </ClientOnlyLocalizedLink>
        </div>
      </nav> */}
    </header>
  );
};
