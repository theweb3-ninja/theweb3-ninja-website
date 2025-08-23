import { ReactNode, useEffect, useState } from 'react';
import { LocalizedLink } from './localized-link';

interface ClientOnlyLocalizedLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  title?: string;
}

/**
 * Client-only wrapper for LocalizedLink to avoid SSR issues with Router hooks
 */
export const ClientOnlyLocalizedLink = ({ to, children, ...rest }: ClientOnlyLocalizedLinkProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a regular anchor tag during SSR that matches the expected structure
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink to={to} {...rest}>
      {children}
    </LocalizedLink>
  );
};
