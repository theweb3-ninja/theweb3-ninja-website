import { allowedPaths, suspiciousPaths } from './constants';

/**
 * Check if a URL contains suspicious paths
 * @param pathname - URL to check
 * @returns true if suspicious, false otherwise
 */
export function isSuspiciousUrl(pathname: string): boolean {
  const path = pathname.toLowerCase();

  if (!allowedPaths.some(allowedPath => path.includes(allowedPath))) {
    return suspiciousPaths.some(suspiciousPath => path.includes(suspiciousPath));
  }

  return false;
}
