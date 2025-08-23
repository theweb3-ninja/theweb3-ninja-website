import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

/**
 * Client-only wrapper for ThemeToggle to avoid SSR issues with Router hooks
 */
interface ClientOnlyThemeToggleProps {
  className?: string;
}

export const ClientOnlyThemeToggle = ({ className }: ClientOnlyThemeToggleProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR that matches the expected structure
    return (
      <div className={className}>
        <div className="h-10 w-10 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return <ThemeToggle className={className} />;
};
