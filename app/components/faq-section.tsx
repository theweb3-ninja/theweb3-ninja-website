import { Card, CardContent } from './ui/card';
import { useTranslation } from 'react-i18next';

export const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <section id="faq" className="container mx-auto px-6 py-8 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent uppercase">
          {t('faq.title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('faq.subtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-0">
            <h3 className="text-xl font-bold mb-3">{t('faq.q1')}</h3>
            <p className="text-gray-600">{t('faq.a1')}</p>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-0">
            <h3 className="text-xl font-bold mb-3">{t('faq.q2')}</h3>
            <p className="text-gray-600">{t('faq.a2')}</p>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-0">
            <h3 className="text-xl font-bold mb-3">{t('faq.q3')}</h3>
            <p className="text-gray-600">{t('faq.a3')}</p>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
          <CardContent className="p-0">
            <h3 className="text-xl font-bold mb-3">{t('faq.q4')}</h3>
            <p className="text-gray-600">{t('faq.a4')}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
