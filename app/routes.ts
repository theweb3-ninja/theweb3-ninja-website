import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';
import { isFeatureEnabled } from './lib/features';

// Define core routes for the landing page default module
const routes = [index('routes/_index.tsx'), route('privacy-policy', 'routes/privacy-policy.tsx')];

// Add marketplace routes when feature is enabled
if (isFeatureEnabled('marketplace')) {
  routes.push(
    route('about', 'routes/about.tsx'),
    route('blog', 'routes/blog.tsx'),
    route('contact', 'routes/contact.tsx'),
    route('dashboard', 'routes/dashboard.tsx'),
    route('faq', 'routes/faq.tsx'),
    route('login', 'routes/login.tsx'),
    route('logout', 'routes/logout.tsx'),
    route('pricing', 'routes/pricing.tsx'),
    route('profile', 'routes/profile.tsx'),
    route('refund-policy', 'routes/refund-policy.tsx'),
    route('register', 'routes/register.tsx'),
    route('settings', 'routes/settings.tsx'),
    route('terms-of-service', 'routes/terms-of-service.tsx'),
    route('vendors', 'routes/vendors._index.tsx'),
    route('vendors/:category', 'routes/vendors.$category._index.tsx'),
    route('vendor/:vendorSlug', 'routes/vendor.$vendorSlug.tsx')
  );
}

// Export routes with language prefix support and catch-all route
export default [
  ...prefix(':lng?', routes),
  route('*', 'routes/not-found.tsx'), // 404 Not Found page
  route('sitemap/:lng.xml', 'routes/sitemap.$lng.xml.ts'),
  route('sitemap.xml', 'routes/sitemap.xml.ts'),
  route('robots.txt', 'routes/robots.txt.ts'),
] satisfies RouteConfig;
