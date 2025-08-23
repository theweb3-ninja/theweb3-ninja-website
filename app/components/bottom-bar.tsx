import { CookieConsent } from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import { companyInfo, DOMAIN_CONFIG } from '../config';
import AppInfo from './app-info';
import { ClientOnlyLocalizedLink } from './client-only-localized-link';
import { Flag } from './flag';

export const BottomBar = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative w-full p-4 border-t border-gray-200">
        <div className="block w-full lg:flex lg:justify-between">
          {/* Domain links */}
          <div className="flex justify-center items-center order-2 gap-4 mb-4 lg:mb-0">
            {DOMAIN_CONFIG.map(link => (
              <a
                key={link.domain}
                href={link.icon === 'world' ? link.url + '/en' : link.url}
                target="_blank"
                rel="follow"
                aria-label={link.ariaLabel}
                className="lg:flex items-center text-gray-600 hover:text-gray-900 transition-colors text-ellipsis overflow-hidden whitespace-nowrap"
              >
                <span role="img" aria-label={`${link.ariaLabel} Flag`} className="flex items-center">
                  <Flag languageCode={link.icon} className="!w-5 !h-3.5 mr-1" />
                  {link.domain}
                </span>
              </a>
            ))}
          </div>

          <div className="flex justify-center items-center order-1">
            <p className="text-sm text-gray-500 text-ellipsis overflow-hidden text-center md:text-left">
              © {currentYear} {companyInfo.shortName}. {t('footer.copyright')} -{' '}
              <ClientOnlyLocalizedLink to="/privacy-policy" className="text-primary hover:underline">
                {t('footer.privacyPolicy')}
              </ClientOnlyLocalizedLink>
            </p>
          </div>
        </div>
      </footer>

      <AppInfo />

      <CookieConsent
        location="bottom"
        buttonText={t('cookieConsent.accept')}
        cookieName="EveoGdprCookie"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        {t('cookieConsent.message')}
        <ClientOnlyLocalizedLink to="/privacy-policy" className="text-white underline ml-2">
          {t('footer.privacyPolicy', 'Privacy Policy')}
        </ClientOnlyLocalizedLink>
      </CookieConsent>
    </>
  );
};
