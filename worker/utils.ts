import { createRequestHandler, ServerBuild } from 'react-router';

/**
 * Get MIME type based on file extension
 */
export const getMimeType = (pathname: string): string => {
  const ext = pathname.toLowerCase().split('.').pop();

  switch (ext) {
    case 'js':
    case 'mjs':
      return 'application/javascript';
    case 'css':
      return 'text/css';
    case 'html':
    case 'htm':
      return 'text/html';
    case 'json':
      return 'application/json';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'ico':
      return 'image/x-icon';
    case 'woff':
      return 'font/woff';
    case 'woff2':
      return 'font/woff2';
    case 'ttf':
      return 'font/ttf';
    case 'webp':
      return 'image/webp';
    case 'mp4':
      return 'video/mp4';
    case 'txt':
      return 'text/plain';
    case 'xml':
      return 'application/xml';
    case 'zip':
      return 'application/zip';
    default:
      return 'application/octet-stream';
  }
};

// @ts-expect-error if not built
export const getBuild = () => import('../dist/server/index.js') as Promise<ServerBuild>;

/**
 * React Router SSR with runtime error handling
 */
export const reactRouterRequestHandler = (mode: string) => createRequestHandler(() => getBuild(), mode);
