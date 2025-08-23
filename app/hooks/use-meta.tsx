import { useRouteLoaderData } from 'react-router';
import { RootLoaderData, SeoMetaOptions } from 'shared';
import { generateMetaTags } from '../lib';
import { useTranslation } from 'react-i18next';

export const useMeta = (options?: Omit<SeoMetaOptions, 'language' | 'hostname'>) => {
  const loaderData = useRouteLoaderData<RootLoaderData>('root');
  const { t } = useTranslation();

  return generateMetaTags(
    t,
    {
      ...options,
      language: loaderData?.detectedLanguage,
      hostname: loaderData?.hostname || '',
    },
    loaderData?.pathname
  );
};
