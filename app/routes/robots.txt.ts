import { generateRobotsTxt } from '@forge42/seo-tools/robots';
import { LoaderFunctionArgs } from 'react-router';
import { isProduction } from '../config';

export async function loader({ request }: LoaderFunctionArgs) {
  const domain = new URL(request.url).origin;
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: '*',
      [isProduction ? 'allow' : 'disallow']: ['/'],
      sitemap: [`${domain}/sitemap.xml`],
    },
  ]);

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
