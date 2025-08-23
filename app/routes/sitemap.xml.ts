import { generateSitemapIndex } from '@forge42/seo-tools/sitemap';
import { LoaderFunctionArgs } from 'react-router';
import { supportedLanguages } from '../config';

const rewriteRoutes = (host: string) => {
  return supportedLanguages.map(lng => {
    return {
      url: `https://${host}/sitemap/${lng}.xml`,
      lastmod: new Date().toISOString(),
    };
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { host } = new URL(request.url);
  const routeHostWithLangs = rewriteRoutes(host);
  const sitemapIndex = generateSitemapIndex(routeHostWithLangs);

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
