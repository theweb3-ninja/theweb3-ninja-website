import { StrictMode } from 'react';
import { FORCE_STRICT_MODE } from '../config';

export const ConditionalStrictMode = ({ children }: { children: React.ReactNode }) => {
  return typeof window !== 'undefined' && FORCE_STRICT_MODE === 'true' ? (
    <StrictMode>{children}</StrictMode>
  ) : (
    <>{children}</>
  );
};
