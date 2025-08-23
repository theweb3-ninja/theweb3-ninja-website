/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { configDefaults } from 'vitest/config';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/test/setupTests.ts'],
    exclude: [...configDefaults.exclude, '**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/test/**',
        '**/__mocks__/**',
        '**/vite.config.*',
        '**/vitest.config.*',
      ],
    },
    testTimeout: 30000, // 30 seconds
    // Enable React 18 concurrent features
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000',
      },
    },
  },
  // Optimize dependencies for Vite
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', '@testing-library/react', '@testing-library/jest-dom'],
  },
});
