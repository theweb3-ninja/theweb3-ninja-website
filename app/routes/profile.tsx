import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function Profile() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Profile',
    description: 'Manage your profile and account settings',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('profile.title', 'Profile')}</h1>
      <div className="prose max-w-none">
        <p>{t('profile.content', 'Profile content will be added here.')}</p>
      </div>
    </div>
  );
}
