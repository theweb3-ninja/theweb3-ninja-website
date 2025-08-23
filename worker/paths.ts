import {
  CSS_EXTENSIONS,
  FONT_EXTENSIONS,
  HTML_EXTENSIONS,
  IMAGE_EXTENSIONS,
  JS_EXTENSIONS,
  ZIP_EXTENSIONS,
} from './constants';
import { getMimeType } from './utils';

/**
 * Check if a URL path refers to a static file
 */
export function isStaticFile(pathname: string): boolean {
  if (pathname.includes('robots.txt') || pathname.includes('sitemap')) {
    return false;
  }

  return (
    isPathnameXmlOrRss(pathname) ||
    isStaticImageResource(pathname) ||
    isJavaScriptResource(pathname) ||
    isCSSResource(pathname) ||
    isFontResource(pathname) ||
    isZipResource(pathname)
  );
}

/**
 * Check if a URL path refers to an XML or RSS file
 */
export function isPathnameXmlOrRss(pathname: string): boolean {
  return (
    pathname.includes('.xml') ||
    pathname.includes('.rss') ||
    pathname.includes('.atom') ||
    pathname.includes('.txt') ||
    pathname.includes('.xsl')
  );
}

/**
 * Check if a URL path refers to an image resource
 */
export function isStaticImageResource(path: string): boolean {
  const lowercasePath = path.toLowerCase();
  // Check file extension
  return (
    IMAGE_EXTENSIONS.some(ext => lowercasePath.endsWith(ext)) ||
    // Also check for image paths without extensions
    lowercasePath.includes('/wp-content/') ||
    lowercasePath.includes('/wp-includes/') ||
    lowercasePath.includes('/img/') ||
    lowercasePath.includes('/images/') ||
    lowercasePath.includes('/assets/img/') ||
    lowercasePath.includes('/assets/images/')
  );
}

/**
 * Check if a URL path refers to a JavaScript file
 */
export function isJavaScriptResource(path: string): boolean {
  const lowercasePath = path.toLowerCase();
  return JS_EXTENSIONS.some(ext => lowercasePath.endsWith(ext));
}

/**
 * Check if a URL path refers to a CSS file
 */
export function isCSSResource(path: string): boolean {
  const lowercasePath = path.toLowerCase();
  return CSS_EXTENSIONS.some(ext => lowercasePath.endsWith(ext));
}

/**
 * Check if a URL path refers to a font file
 */
export function isFontResource(path: string): boolean {
  const lowercasePath = path.toLowerCase();
  return FONT_EXTENSIONS.some(ext => lowercasePath.endsWith(ext));
}

/**
 * Check if a URL path refers to an HTML file
 */
export function isHtmlResource(path: string, headers: Headers): boolean {
  const isContentTypeHtml = headers.get('content-type')?.includes('text/html') || false;

  if (isContentTypeHtml) {
    return true;
  }

  return HTML_EXTENSIONS.some(ext => path.toLowerCase().endsWith(ext)) || path === '/' || !path.includes('.');
}

/**
 * Check if a URL path appears to be a versioned asset (contains hash or version number)
 * e.g., main.abc123.js, style.v2.css, etc.
 */
export function isVersionedAsset(path: string): boolean {
  const filenameParts = path.split('/');
  const filename = filenameParts[filenameParts.length - 1];

  // Check for common versioning patterns
  const hasVersionNumber = /\.(v\d+|\d+\.[\d.]+)\./i.test(filename);
  const hasHash = /\.[a-f0-9]{5,32}\./i.test(filename);

  return hasVersionNumber || hasHash;
}

/**
 * Check if a URL path refers to a zip file
 */
export function isZipResource(path: string): boolean {
  const lowercasePath = path.toLowerCase();
  return ZIP_EXTENSIONS.some(ext => lowercasePath.endsWith(ext));
}

export const handlerStaticFile = async (request: Request, env: Env) => {
  const isDevelopment = env.VITE_ENV === 'development';
  const { pathname } = new URL(request.url);

  // The wrangler.toml assets directory is "./dist/client", so paths should map directly
  const assetResponse = await env.ASSETS.fetch(request);

  if (assetResponse.status === 200) {
    // Clone the response body to avoid consumption issues
    const body = await assetResponse.arrayBuffer();

    const response = new Response(body, {
      status: 200,
      headers: {
        'Content-Type': getMimeType(pathname),
        'Cache-Control': isDevelopment ? 'no-cache' : 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });

    return response;
  } else {
    // Log the response body to see what's being returned
    const responseText = await assetResponse.text();

    console.log(
      `❌ Asset not found: ${pathname} (status: ${assetResponse.status}) - ${responseText.substring(0, 200)}`
    );
  }

  // Return 404 for missing assets
  return new Response(`Asset not found: ${pathname}`, {
    status: 404,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
