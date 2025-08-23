import React, { useEffect } from 'react';
import { isFeatureEnabled } from '../lib/features';
import { useThemeStore } from '../stores/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const initializeTheme = useThemeStore(state => state.initializeTheme);

  useEffect(() => {
    // Initialize theme on mount
    if (isFeatureEnabled('darkTheme')) {
      initializeTheme();
    }
  }, [initializeTheme]);

  return <>{children}</>;
}

// Script to prevent flash of unstyled content (FOUC)
// This should be injected in the HTML head before any other scripts
export const ThemeScript = () => {
  let script = '';

  if (isFeatureEnabled('darkTheme')) {
    script = `
    (function() {
      try {
        var stored = localStorage.getItem('eveo-theme-storage');
        var theme = stored ? JSON.parse(stored).state.theme : 'system';

        var resolvedTheme = theme;

        if (theme === 'system') {
          resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        if (resolvedTheme === 'dark') {
          document.documentElement.dataset.theme = 'dark';
        }
      } catch (e) {
        // Fallback to system preference if localStorage fails
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.dataset.theme = 'dark';
        }
      }
    })();
  `;
  }

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};
