import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function Pricing() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Pricing',
    description: 'Transparent pricing for event organizers and suppliers on Eveo',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('pricing.title', 'Pricing')}</h1>
      <div className="prose max-w-none">
        <p>{t('pricing.content')}</p>
      </div>
    </div>
  );
}
