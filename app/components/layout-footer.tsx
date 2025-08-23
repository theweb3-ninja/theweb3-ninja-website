import { useTranslation } from 'react-i18next';
import { ClientOnlyLanguageSelector } from './client-only-language-selector';
import { ClientOnlyLocalizedLink } from './client-only-localized-link';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative container mx-auto px-6 py-12 border-t border-gray-200">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <ClientOnlyLocalizedLink to="/" title={t('header.logoTitle')}>
            <img
              src="/images/logo-removebg.png"
              alt={t('header.logoAlt')}
              width={224.63}
              height={64}
              className="w-[120px] h-auto md:w-[200px]"
            />
          </ClientOnlyLocalizedLink>
        </div>
        {/* Language Selector centered above domain links */}
        <div className="flex justify-center mb-6">
          <ClientOnlyLanguageSelector full={true} />
        </div>

        <p className="text-gray-600">{t('footer.tagline')}</p>
      </div>
    </footer>
  );
};
