import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function Register() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Register',
    description: 'Create your Eveo account as an organizer or supplier',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('register.title', 'Register')}</h1>
      <div className="prose max-w-none">
        <p>{t('register.content')}</p>
      </div>
    </div>
  );
}
