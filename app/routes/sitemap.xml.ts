import { generateSitemapIndex } from '@forge42/seo-tools/sitemap';
import { LoaderFunctionArgs } from 'react-router';
import { supportedLanguages } from '../config';

const rewriteRoutes = (hostname: string) => {
  return supportedLanguages.map(lng => {
    return {
      url: `https://${hostname}/sitemap/${lng}.xml`,
      lastmod: new Date().toISOString(),
    };
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { hostname } = new URL(request.url);

  const routeHostWithLangs = rewriteRoutes(hostname);

  const sitemapIndex = generateSitemapIndex(routeHostWithLangs);

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
