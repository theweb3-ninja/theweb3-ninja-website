import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import i18n from 'i18next';
import { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createMemoryRouter, RouterProvider } from 'react-router';

// Initialize i18n for tests
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: [],
  defaultNS: 'translation',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: { en: { translation: {} } },
});

type CustomRenderOptions = RenderOptions & {
  route?: string;
  initialEntries?: string[];
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0, // Use gcTime instead of cacheTime in newer versions
    },
  },
});

const customRender = (
  ui: ReactElement,
  { route = '/', initialEntries = ['/'], ...renderOptions }: CustomRenderOptions = {}
) => {
  // Create a test router with the UI
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: ui,
      },
    ],
    {
      initialEntries: [route, ...initialEntries],
      initialIndex: 0,
    }
  );

  const Wrapper = () => (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </QueryClientProvider>
  );

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
};

// Override render method
export { customRender as render };
