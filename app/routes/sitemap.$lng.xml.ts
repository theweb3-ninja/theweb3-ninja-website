import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap';
import { LoaderFunctionArgs, type ServerBuild } from 'react-router';
import { getDefaultLanguage } from '../services';

const replacePath = (lng?: string, path?: string, defaultLng?: string): string => {
  if (!path) return path || '';

  return path.replace(':lng?', `/${lng}`).replace(`/${defaultLng}`, '');
};

const rewriteRoutes = (routes: ServerBuild['routes'], lng?: string, defaultLng?: string) => {
  if (!routes) {
    return [];
  }

  return Object.values(routes)
    .map(route => {
      const path = replacePath(lng, route?.path, defaultLng);

      if (route && route.path) {
        route.path = path === '' ? '/' : path;
      }

      return route;
    })
    .filter(route => route?.path && !route?.path.match(/[*:]/));
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const serverBuild = await import('virtual:react-router/server-build');
  const { routes } = serverBuild;
  const { host } = new URL(request.url);
  const lng = params.lng;

  const routeEntries = rewriteRoutes(routes, lng);

  if (lng === getDefaultLanguage()) {
    const routeBaseEntries = rewriteRoutes(routes, lng, getDefaultLanguage());

    const sitemap = await generateRemixSitemap({
      domain: host,
      routes: [...routeBaseEntries, ...routeEntries] as unknown as ServerBuild['routes'],
    });

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }

  const sitemap = await generateRemixSitemap({
    domain: host,
    routes: routeEntries as unknown as ServerBuild['routes'],
  });

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
