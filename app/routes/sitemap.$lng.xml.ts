import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap';
import { LoaderFunctionArgs, type ServerBuild } from 'react-router';
import { defaultLanguage } from '../config';

const replacePath = (lng: string, path: string, defaultLng?: string): string => {
  const pathWithLng = path.replace(':lng?', `/${lng}`);

  if (defaultLng && pathWithLng.startsWith(`/${defaultLng}`)) {
    return pathWithLng.replace(`/${defaultLng}`, '');
  }

  return pathWithLng;
};

const rewriteRoutes = (routes: ServerBuild['routes'], lng: string, defaultLng?: string) => {
  if (!routes) {
    return [];
  }

  return Object.values(routes)
    .map(route => {
      if (!route?.path) return route;

      const path = replacePath(lng, route.path, defaultLng);

      return { ...route, path: route.path === '' ? '/' : path };
    })
    .filter(route => route?.path && !route?.path.match(/[*:]/));
};

export const loader = async ({ request, params: { lng } }: LoaderFunctionArgs) => {
  const serverBuild = await import('virtual:react-router/server-build');
  const { routes } = serverBuild;
  const { host } = new URL(request.url);

  const routeEntries = rewriteRoutes(routes, lng);

  if (lng === defaultLanguage) {
    const routeBaseEntries = rewriteRoutes(routes, lng, defaultLanguage);

    const sitemap = await generateRemixSitemap({
      domain: host,
      routes: [...routeBaseEntries, ...routeEntries],
    });

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }

  const sitemap = await generateRemixSitemap({
    domain: host,
    routes: routeEntries,
  });

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
