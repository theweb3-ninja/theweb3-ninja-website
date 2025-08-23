import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function TermsOfService() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Terms of Service',
    description: 'Terms and conditions for using the Eveo platform',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('terms.title', 'Terms of Service')}</h1>
      <div className="prose max-w-none">
        <p>{t('terms.content')}</p>
      </div>
    </div>
  );
}
