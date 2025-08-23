import { useEffect, useState } from 'react';
import { LanguageSelector } from './language-selector';

/**
 * Client-only wrapper for LanguageSelector to avoid SSR issues with Router hooks
 */
interface ClientOnlyLanguageSelectorProps {
  className?: string;
  full?: boolean;
}

export const ClientOnlyLanguageSelector = ({ className, full }: ClientOnlyLanguageSelectorProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR that matches the expected structure
    return (
      <div className={className}>
        <div className="h-10 w-10 md:w-32 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return <LanguageSelector className={className} full={full} />;
};
