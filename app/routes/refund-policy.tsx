import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function RefundPolicy() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Refund Policy',
    description: 'Our refund policy and terms for Eveo services',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('refund.title', 'Refund Policy')}</h1>
      <div className="prose max-w-none">
        <p>{t('refund.content')}</p>
      </div>
    </div>
  );
}
