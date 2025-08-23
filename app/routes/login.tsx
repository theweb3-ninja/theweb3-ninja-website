import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function Login() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Login',
    description: 'Sign in to your Eveo account',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('login.title', 'Login')}</h1>
      <div className="prose max-w-none">
        <p>{t('login.content')}</p>
      </div>
    </div>
  );
}
