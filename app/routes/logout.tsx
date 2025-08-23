import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function Logout() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Logout',
    description: 'You have been logged out successfully.',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('logout.title', 'Logout')}</h1>
      <div className="prose max-w-none">
        <p>{t('logout.content', 'You have been logged out successfully.')}</p>
      </div>
    </div>
  );
}
