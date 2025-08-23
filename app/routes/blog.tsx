import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

const pageMeta = {
  title: 'Blog',
  description: 'Latest news and insights about event organization and planning',
};

export default function Blog() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('blog.title', 'Blog')}</h1>
      <div className="prose max-w-none">
        <p>{t('blog.content', 'Blog posts will be added here.')}</p>
      </div>
    </div>
  );
}
