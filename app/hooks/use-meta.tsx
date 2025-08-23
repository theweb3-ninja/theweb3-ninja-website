import { useTranslation } from 'react-i18next';
import { useRouteLoaderData } from 'react-router';
import { RootLoaderData, SeoMetaOptions } from 'shared';
import { defaultLanguage } from '../config';
import { generateMetaTags } from '../lib';

export const useMeta = (options?: Omit<SeoMetaOptions, 'language' | 'hostname'>) => {
  const loaderData = useRouteLoaderData<RootLoaderData>('root');
  const detectedLanguage = loaderData?.detectedLanguage || defaultLanguage;
  const { t } = useTranslation();

  return generateMetaTags(
    t,
    {
      ...options,
      language: detectedLanguage,
      hostname: loaderData?.hostname || '',
    },
    loaderData?.pathname
  );
};
