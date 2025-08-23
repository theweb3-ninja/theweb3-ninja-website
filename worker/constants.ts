import { companyInfo } from '../app/config';

/**
 * List of static file extensions
 */
export const staticFileExtensions = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
  'ico',
  'css',
  'js',
  'woff',
  'woff2',
  'ttf',
  'eot',
  'pdf',
  'webp',
];

/**
 * Honeypot for common exploit attempts
 */
export const suspiciousPaths = [
  '.env',
  '.git',
  'admin',
  'administrator',
  'api',
  'backup',
  'config',
  'home',
  'install.php',
  'main',
  'new',
  'old',
  'phpmyadmin',
  'setup.php',
  'setup',
  'test',
  'wordpress',
  'wp-admin',
  'wp-content',
  'wp-login',
  'xmlrpc.php',
  'well-known',
];

export const allowedPaths = ['.well-known/security.txt', '/eveo-api/purge-cache', '/eveo-api/contact'];

// Common extensions for different asset types
export const JS_EXTENSIONS = ['.js', '.mjs', '.jsx', '.json'];
export const CSS_EXTENSIONS = ['.css'];
export const FONT_EXTENSIONS = ['.woff', '.woff2', '.ttf', '.eot', '.otf'];
export const HTML_EXTENSIONS = ['.html', '.htm'];
export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
export const ZIP_EXTENSIONS = ['.zip'];

export const HTML_ERROR = (error: string) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Error - ${companyInfo.shortName}</title>
</head>
<body>
  <h1>Something went wrong</h1>
  <p>We're sorry, but something went wrong. Please try again later.</p>
  <p>SSR ERROR: ${error}</p>
</body>
</html>`;
};
