import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function Dashboard() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Dashboard',
    description: 'Manage your Eveo account and bookings',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('dashboard.title', 'Dashboard')}</h1>
      <div className="prose max-w-none">
        <p>{t('dashboard.content')}</p>
      </div>
    </div>
  );
}
