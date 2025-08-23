import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap';
import { LoaderFunctionArgs, type ServerBuild } from 'react-router';
import { getDefaultLanguage } from '../services';

const replacePath = (lng?: string, path?: string, defaultLng?: string): string => {
  if (!path) return path || '';

  return path.replace(':lng?', `/${lng}`).replace(`/${defaultLng}`, '');
};

const rewriteRoutes = (routes: ServerBuild['routes'], lng?: string, defaultLng?: string) => {
  if (!routes) return [];

  return Object.values(routes)
    .map(route => {
      const path = replacePath(lng, route?.path, defaultLng);

      return {
        id: route?.id,
        path: path === '' ? '/' : path,
        lng,
      };
    })
    .filter(route => route.path && !route.path.match(/[*:]/));
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const serverBuild = await import('virtual:react-router/server-build');
  const { routes } = serverBuild;
  const { origin } = new URL(request.url);
  const lng = params.lng;
  let routeBaseEntries: { id: string | undefined; path: string; lng: string | undefined }[] = [];

  if (lng === getDefaultLanguage()) {
    routeBaseEntries = rewriteRoutes(routes, lng, getDefaultLanguage());
  }

  const routeEntries = rewriteRoutes(routes, lng);

  const sitemap = await generateRemixSitemap({
    domain: origin,
    routes: [...routeBaseEntries, ...routeEntries],
  });

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
