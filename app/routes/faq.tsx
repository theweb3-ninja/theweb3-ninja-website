import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function FAQ() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about using Eveo',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('faq.title', 'Frequently Asked Questions')}</h1>
      <div className="prose max-w-none">
        <p>{t('faq.content')}</p>
      </div>
    </div>
  );
}
