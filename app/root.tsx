/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import {
  isRouteErrorResponse,
  Links,
  LinksFunction,
  LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from 'react-router';
import { RootLoaderData } from 'shared';
import tailwindcss from './app.css?url';
import { AnalyticsScript, ConditionalStrictMode, OrganizationSchemaScript } from './components';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { defaultLanguage } from './config';
import { ThemeProvider, ThemeScript } from './providers';
import { createOrReturnI18nInstance, getDefaultLanguageFromHtmlTag, getLanguageFromAcceptLanguage } from './services';

const queryClient = new QueryClient();

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindcss },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
];

export function loader({ params, request }: LoaderFunctionArgs): RootLoaderData {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const pathname = url.pathname;

  // Extract optional language parameter from URL or fallback to default
  return { detectedLanguage: params.lng || getLanguageFromAcceptLanguage(request), hostname, pathname };
}

export function clientLoader({ params, request }: LoaderFunctionArgs): RootLoaderData {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const pathname = url.pathname;

  // Extract optional language parameter from URL or fallback to default
  return {
    detectedLanguage: params.lng || getDefaultLanguageFromHtmlTag() || getLanguageFromAcceptLanguage(request),
    hostname,
    pathname,
  };
}

export function Layout({ children }: { children: ReactNode }) {
  const loaderData = useRouteLoaderData<RootLoaderData>('root');
  const detectedLanguage = loaderData?.detectedLanguage || defaultLanguage;
  const i18nInstance = createOrReturnI18nInstance(detectedLanguage);

  return (
    <html lang={detectedLanguage} data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
        <Meta />
        <ThemeScript />
        <AnalyticsScript />
        <OrganizationSchemaScript language={detectedLanguage} />
      </head>
      <body>
        <I18nextProvider i18n={i18nInstance}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>{children}</ThemeProvider>
          </QueryClientProvider>
        </I18nextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ConditionalStrictMode>
      <Outlet />
      <TooltipProvider>
        <Toaster />
      </TooltipProvider>
    </ConditionalStrictMode>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  // Constrain the generic type so we don't provide a non-existent key
  const statusCode = () => {
    if (!isRouteErrorResponse(error)) {
      return '500';
    }

    // Supported error code messages
    switch (error.status) {
      case 200:
        return '200';
      case 403:
        return '403';
      case 404:
        return '404';
      default:
        return '500';
    }
  };

  const errorStatusCode = statusCode();

  return (
    <div className="relative flex h-full min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 placeholder-index sm:pt-8 sm:pb-16 dark:bg-white dark:from-blue-950 dark:to-blue-900">
      <div className="relative mx-auto max-w-[90rem] sm:px-6 lg:px-8">
        <div className="relative flex min-h-72 flex-col justify-center p-1 sm:overflow-hidden sm:rounded-2xl md:p-4 lg:p-6">
          <h1 className="w-full pb-2 text-center text-2xl text-red-600">{t(`error.${errorStatusCode}.title`)}</h1>
          <p className="w-full text-center text-lg dark:text-white">{t(`error.${errorStatusCode}.description`)}</p>
        </div>
      </div>
    </div>
  );
};
