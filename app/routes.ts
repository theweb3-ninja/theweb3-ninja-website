import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

// Define core routes for the landing page default module
const routes = [
  index('routes/_index.tsx'),
  route('about', 'routes/about.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('faq', 'routes/faq.tsx'),
  route('privacy-policy', 'routes/privacy-policy.tsx'),
];

// Export routes with language prefix support and catch-all route
export default [
  ...prefix(':lng?', routes),
  route('*', 'routes/not-found.tsx'), // 404 Not Found page
  route('robots.txt', 'routes/robots.txt.ts'),
  route('sitemap.xml', 'routes/sitemap.xml.ts'),
  route('sitemap/:lng.xml', 'routes/sitemap.$lng.xml.ts'),
] satisfies RouteConfig;
