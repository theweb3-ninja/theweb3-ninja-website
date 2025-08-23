import { useTranslation } from 'react-i18next';
import { BottomBar, ClientOnlyLocalizedLink, Footer, Header, SeoMeta } from '../components';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { companyInfo, EMAIL_GENERAL } from '../config/constants';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const lastUpdate = '03 July 2025';

  const pageMeta = {
    title: t('privacy.title'),
    description: t('privacy.description'),
  };

  return (
    <div className="min-h-screen">
      <SeoMeta {...pageMeta} />
      <Header />

      <div className="container px-6 py-12 md:py-16 lg:py-24 mx-auto">
        <h1 className="text-primary text-4xl font-bold text-center mb-8 text-ellipsis overflow-hidden">
          {t('privacy.title')}
        </h1>
        <p className="text-center text-gray-500 mb-8">{t('privacy.subtitle')}</p>

        <Card className="max-w-4xl mx-auto mb-8 rounded-lg border border-eveo/10 dark:border-eveo/10 bg-card text-card-foreground shadow-sm">
          <CardContent className="p-6 md:p-8">
            {/* Last update date */}
            <p className="text-sm text-gray-500 mb-6">
              {t('privacy.lastUpdate')}: {lastUpdate}
            </p>

            {/* Section 1: Controller */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. {t('privacy.controller.title')}</h2>
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: t('privacy.controller.content', { email: EMAIL_GENERAL, address: companyInfo.address.full }),
                }}
              />
            </section>

            {/* Section 2: Data Types */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. {t('privacy.dataTypes.title')}</h2>
              <p className="mb-2 font-medium">{t('privacy.dataTypes.voluntaryData.title')}:</p>
              <ul className="list-disc pl-8 mb-4">
                <li>{t('privacy.dataTypes.voluntaryData.name')}</li>
                <li>{t('privacy.dataTypes.voluntaryData.surname')}</li>
                <li>{t('privacy.dataTypes.voluntaryData.company')}</li>
                <li>{t('privacy.dataTypes.voluntaryData.email')}</li>
                <li>{t('privacy.dataTypes.voluntaryData.phone')}</li>
              </ul>

              <p className="mb-2 font-medium">{t('privacy.dataTypes.automaticData.title')}:</p>
              <ul className="list-disc pl-8 mb-4">
                <li>{t('privacy.dataTypes.automaticData.ip')}</li>
                <li>{t('privacy.dataTypes.automaticData.datetime')}</li>
                <li>{t('privacy.dataTypes.automaticData.cookies')}</li>
              </ul>
              <p>{t('privacy.dataTypes.automaticData.noProfileInfo')}</p>
            </section>

            {/* Section 3: Purposes and Legal Basis */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. {t('privacy.purposes.title')}</h2>
              <ul className="list-disc pl-8 mb-4">
                <li dangerouslySetInnerHTML={{ __html: t('privacy.purposes.waitingList') }} />
                <li dangerouslySetInnerHTML={{ __html: t('privacy.purposes.marketing') }} />
                <li dangerouslySetInnerHTML={{ __html: t('privacy.purposes.analytics') }} />
              </ul>
            </section>

            {/* Section 4: Nature of Data Provision */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. {t('privacy.dataProvision.title')}</h2>
              <p className="mb-4">{t('privacy.dataProvision.content')}</p>
            </section>

            {/* Section 5: Processing Methods */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. {t('privacy.processingMethods.title')}</h2>
              <p className="mb-4">{t('privacy.processingMethods.content')}</p>
            </section>

            {/* Section 6: Data Recipients */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. {t('privacy.dataRecipients.title')}</h2>
              <ul className="list-disc pl-8 mb-4">
                <li>{t('privacy.dataRecipients.employees')}</li>
                <li>{t('privacy.dataRecipients.providers')}</li>
                <li>{t('privacy.dataRecipients.authorities')}</li>
              </ul>
              <p>{t('privacy.dataRecipients.listAvailable')}</p>
            </section>

            {/* Section 7: Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. {t('privacy.dataRetention.title')}</h2>
              <ul className="list-disc pl-8 mb-4">
                <li>{t('privacy.dataRetention.contactData')}</li>
                <li>{t('privacy.dataRetention.consentData')}</li>
                <li>{t('privacy.dataRetention.navigationData')}</li>
              </ul>
            </section>

            {/* Section 8: User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. {t('privacy.userRights.title')}</h2>
              <p className="mb-4">{t('privacy.userRights.intro')}</p>
              <ul className="list-disc pl-8 mb-4">
                <li>{t('privacy.userRights.access')}</li>
                <li>{t('privacy.userRights.rectification')}</li>
                <li>{t('privacy.userRights.objection')}</li>
                <li>{t('privacy.userRights.portability')}</li>
                <li>{t('privacy.userRights.withdraw')}</li>
                <li>{t('privacy.userRights.complaint')}</li>
              </ul>
              <p dangerouslySetInnerHTML={{ __html: t('privacy.userRights.contact', { email: EMAIL_GENERAL }) }} />
            </section>

            {/* Section 9: International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. {t('privacy.transfers.title')}</h2>
              <p className="mb-4">{t('privacy.transfers.content')}</p>
            </section>

            {/* Cookie Policy Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title')}</h2>
              <p className="mb-4">{t('privacy.cookies.description')}</p>

              <h3 className="text-xl font-medium mb-3 mt-6">1. {t('privacy.cookies.whatAre.title')}</h3>
              <p className="mb-4">{t('privacy.cookies.whatAre.content')}</p>

              <h3 className="text-xl font-medium mb-3 mt-6">2. {t('privacy.cookies.typesUsed.title')}</h3>
              <p className="mb-4">{t('privacy.cookies.typesUsed.content')}</p>

              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left">{t('privacy.cookies.table.name')}</th>
                      <th className="border border-gray-300 p-2 text-left">{t('privacy.cookies.table.purpose')}</th>
                      <th className="border border-gray-300 p-2 text-left">{t('privacy.cookies.table.duration')}</th>
                      <th className="border border-gray-300 p-2 text-left">{t('privacy.cookies.table.type')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">CookieConsent</td>
                      <td className="border border-gray-300 p-2">{t('privacy.cookies.cookieConsent.purpose')}</td>
                      <td className="border border-gray-300 p-2">{t('privacy.cookies.cookieConsent.duration')}</td>
                      <td className="border border-gray-300 p-2">HTTP</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">_ga, _gid</td>
                      <td className="border border-gray-300 p-2">{t('privacy.cookies.analytics.purpose')}</td>
                      <td className="border border-gray-300 p-2">{t('privacy.cookies.analytics.duration')}</td>
                      <td className="border border-gray-300 p-2">HTTP</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">1.gif (Cookiebot)</td>
                      <td className="border border-gray-300 p-2">{t('privacy.cookies.cookiebot.purpose')}</td>
                      <td className="border border-gray-300 p-2">{t('privacy.cookies.cookiebot.duration')}</td>
                      <td className="border border-gray-300 p-2">Pixel</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mb-4">{t('privacy.cookies.noProfilingCookies')}</p>

              <h3 className="text-xl font-medium mb-3 mt-6">3. {t('privacy.cookies.purposes.title')}</h3>
              <ul className="list-disc pl-8 mb-4">
                <li>{t('privacy.cookies.purposes.technical')}</li>
                <li>{t('privacy.cookies.purposes.analytics')}</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">4. {t('privacy.cookies.legalBasis.title')}</h3>
              <p className="mb-4">{t('privacy.cookies.legalBasis.content')}</p>

              <h3 className="text-xl font-medium mb-3 mt-6">5. {t('privacy.cookies.consent.title')}</h3>
              <p className="mb-4">{t('privacy.cookies.consent.content')}</p>
            </section>

            {/* Contact Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('privacy.contact.title')}</h2>
              <p className="mb-4">
                {t('privacy.contact.content')}{' '}
                <a href={`mailto:${EMAIL_GENERAL}`} className="text-primary hover:underline">
                  {EMAIL_GENERAL}
                </a>
              </p>
            </section>

            <div className="mt-8 text-center">
              <Button asChild>
                <ClientOnlyLocalizedLink to="/">{t('privacy.backToHome')}</ClientOnlyLocalizedLink>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
      <BottomBar />
    </div>
  );
}
