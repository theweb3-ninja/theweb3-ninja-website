import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

export default function About() {
  const { t } = useTranslation();

  const pageMeta = {
    title: t('about.title'),
    description: t('about.description'),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>
      <div className="prose max-w-none">
        <p>{t('about.content')}</p>
      </div>
    </div>
  );
}
