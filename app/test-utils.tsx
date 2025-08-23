import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { vi, beforeEach } from 'vitest';

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Explicitly export what we need from @testing-library/react
export {
  render as baseRender,
  screen,
  fireEvent,
  waitFor,
  within,
  act,
  renderHook,
  cleanup,
} from '@testing-library/react';

type CustomRenderOptions = {
  route?: string;
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
} & Omit<RenderOptions, 'wrapper'>;

export const render = (
  ui: React.ReactElement,
  { route = '/', wrapper: Wrapper, ...renderOptions }: CustomRenderOptions = {}
) => {
  window.history.pushState({}, 'Test page', route);

  const TestWrapper = Wrapper || (({ children }) => <BrowserRouter>{children}</BrowserRouter>);

  return rtlRender(ui, {
    wrapper: TestWrapper,
    ...renderOptions,
  });
};

// Utility function to set up tests with a specific route
export const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/', ...renderOptions }: Omit<CustomRenderOptions, 'wrapper'> = {}
) => {
  window.history.pushState({}, 'Test page', route);
  return {
    ...rtlRender(ui, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
      ...renderOptions,
    }),
    history: window.history,
  };
};

// Utility to mock next/router
export const mockNextRouter = (overrides = {}) => {
  const mockRouter = {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    ...overrides,
  };

  vi.mock('next/router', () => ({
    useRouter: () => mockRouter,
  }));

  return mockRouter;
};

// Setup function to be called in test files
export const setupTests = () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset the URL before each test
    window.history.pushState({}, '', '/');
  });
};

export default {
  render,
  renderWithRouter,
  mockNextRouter,
  setupTests,
};
