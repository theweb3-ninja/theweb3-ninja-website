import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { ReactNode, useState } from 'react';
import { useTheme, type Theme } from '../stores/themeStore';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  className?: string;
}

export function ThemeToggle({ variant = 'button', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex items-center justify-center rounded-md p-2
          text-gray-500 hover:text-gray-900 hover:bg-gray-100
          dark:text-gray-900 dark:hover:text-gray-100 dark:hover:bg-gray-800
          transition-colors duration-200 cursor-pointer
          ${className}
        `}
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      </button>
    );
  }

  const themeOptions: { value: Theme; label: string; icon: ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <SunIcon className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon className="h-4 w-4" /> },
    { value: 'system', label: 'System', icon: <DesktopIcon className="h-4 w-4" /> },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          inline-flex items-center justify-center rounded-md p-2
          text-gray-500 hover:text-gray-900 hover:bg-gray-100
          dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800
          transition-colors duration-200 cursor-pointer
        "
        aria-label="Theme options"
        aria-expanded={isOpen}
      >
        {theme === 'system' ? (
          <DesktopIcon className="h-5 w-5" />
        ) : resolvedTheme === 'dark' ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div
            className="
            absolute right-0 top-full mt-2 z-50
            w-48 rounded-md border border-gray-200 bg-white shadow-lg
            dark:border-gray-700 dark:bg-gray-800
          "
          >
            <div className="py-1">
              {themeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-2 text-sm
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors duration-150
                    ${
                      theme === option.value
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <span className="mr-3">{option.icon}</span>
                  <span>{option.label}</span>
                  {theme === option.value && (
                    <span className="ml-auto">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Simple theme indicator component
export function ThemeIndicator() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <span>Theme:</span>
      <span className="font-medium">{theme === 'system' ? `System (${resolvedTheme})` : theme}</span>
      {theme === 'system' && <span className="text-xs opacity-75">(follows system preference)</span>}
    </div>
  );
}
