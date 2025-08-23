// Setup file for React 18 testing
import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type { Root } from 'react-dom/client';

// Configure test-id attribute
export const TEST_ID_ATTRIBUTE = 'data-testid';

// Configure test environment
const config = {
  testIdAttribute: TEST_ID_ATTRIBUTE,
  // Disable automatic cleanup to prevent issues with React 18
  // We'll handle cleanup manually in afterEach
  asyncUtilTimeout: 10000,
};

configure(config);

// Mock ReactDOM
let originalCreateRoot: typeof import('react-dom/client').createRoot;
let mockRoot: Root | null = null;

// Mock window.matchMedia
const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock window.scrollTo
const scrollToMock = vi.fn();

// Setup mocks before tests
beforeAll(async () => {
  // Import the actual react-dom/client module
  const actual = await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
  originalCreateRoot = actual.createRoot;

  // Setup window mocks
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
  });

  window.scrollTo = scrollToMock;

  // Mock react-dom/client
  vi.mock('react-dom/client', async () => {
    const actual = await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
    return {
      ...actual,
      createRoot: () => ({
        render: (element: React.ReactElement) => {
          if (!mockRoot) {
            mockRoot = originalCreateRoot(document.createElement('div'));
          }
          return mockRoot.render(element);
        },
        unmount: () => {
          if (mockRoot) {
            mockRoot.unmount();
            mockRoot = null;
          }
        },
      }),
    };
  });
});

// Cleanup after each test
afterEach(() => {
  if (mockRoot) {
    mockRoot.unmount();
    mockRoot = null;
  }
  vi.clearAllMocks();
});

// Reset all mocks after all tests
afterAll(() => {
  vi.restoreAllMocks();
});
