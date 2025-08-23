import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { SeoMeta } from '../components';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const pageMeta = {
    title: t('notFound.heading', '404'),
    description: t('notFound.message', 'Oops! Page not found'),
    noIndex: true,
  };

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <SeoMeta {...pageMeta} />
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">{t('notFound.heading', '404')}</h1>
        <p className="text-2xl mb-4">{t('notFound.message', 'Oops! Page not found')}</p>
        <a href="/" className="text-primary hover:text-foreground underline hover:no-underline">
          {t('notFound.returnHome', 'Return to Home')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
