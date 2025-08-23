import { HTML_ERROR } from './constants';
import { handleApiRequest, purgeCache } from './eveo-api';
import { handlerStaticFile, isStaticFile } from './paths';
import { isSuspiciousUrl } from './security';
import { getBuild, reactRouterRequestHandler } from './utils';

/**
 * Worker for React Router v7 SSR application with Cloudflare deployment
 *
 * This worker is compatible with:
 * - React Router v7 SSR (Server-Side Rendering)
 * - Client-only components (ClientOnlyLanguageSelector, ClientOnlyLocalizedLink)
 * - Multi-language routing with domain-specific defaults
 * - Security filtering for suspicious URLs and bot protection
 *
 * The worker imports and executes the React Router server build to provide
 * proper SSR for all routes. Client-only components render placeholders
 * during SSR and hydrate properly on the client side.
 */

// Main fetch handler
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    let finalError: Error | unknown | null = null;
    let skipCache = false;
    const build = await getBuild();
    const buildVersion = build.assets.version;
    const { VITE_ENV } = env;
    const isDevelopment = VITE_ENV === 'development';
    const storedVersion = await env.KV_EVEO.get(VITE_ENV);
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Simple test to see if worker responds at all
    if (pathname.includes('test-worker')) {
      const message = `Worker is responding - VITE_ENV: ${VITE_ENV} - Build/Cached Version: ${buildVersion} | ${storedVersion}`;

      return new Response(message, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Check if the URL contains any suspicious paths
    if (!isDevelopment && isSuspiciousUrl(pathname)) {
      console.log(`🔒 Blocking suspicious request: ${url}`);

      // Block the request
      return new Response('Forbidden', { status: 403 });
    }

    if (pathname.startsWith('/eveo-api/')) {
      return handleApiRequest(request, env);
    }

    // Serve static files from dist client directory
    if (isStaticFile(pathname)) {
      return await handlerStaticFile(request, env);
    }

    // Automatically purge cache on first execution after deployment
    if (storedVersion !== buildVersion) {
      await env.KV_EVEO.put(VITE_ENV, buildVersion);

      ctx.waitUntil(purgeCache(env, [VITE_ENV]));

      skipCache = true;
    }

    const cache = await caches.open(`${VITE_ENV}:cache`);

    if (!skipCache && buildVersion === storedVersion) {
      try {
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          // Create a new response with the same body and status
          const responseFromCache = new Response(cachedResponse.clone().body, {
            status: cachedResponse.status,
            statusText: cachedResponse.statusText,
            headers: new Headers(cachedResponse.headers),
          });

          // Add charset to content-type if it's text
          const contentType = responseFromCache.headers.get('content-type') || '';

          if (contentType.startsWith('text/') && !contentType.includes('charset=')) {
            responseFromCache.headers.set('Content-Type', `${contentType}; charset=utf-8`);
          }

          // Add cache tag
          responseFromCache.headers.set('Cache-Tag', `${VITE_ENV},${buildVersion}`);

          return responseFromCache;
        }
      } catch (error) {
        console.error('Cache Error:', error);
        finalError = error;
      }
    }

    // For HTML requests, attempt React Router v7 SSR
    if (!finalError) {
      try {
        // const cfContext = unstable_createContext<CloudflareContext>();
        // const contextProvider = new unstable_RouterContextProvider();
        // contextProvider.set(cfContext, { env, ctx });

        const response = await reactRouterRequestHandler(VITE_ENV)(request, {
          cloudflare: { env, ctx },
        });

        if (request.method === 'GET') {
          // Create a new response with the same body and status
          const responseToCache = new Response(response.clone().body, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers(response.headers),
          });

          // Clone the response for returning to the client
          const responseForClient = new Response(response.clone().body, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers(response.headers),
          });

          // Add charset to content-type if it's text
          const contentType = responseToCache.headers.get('content-type') || '';

          if (contentType.startsWith('text/') && !contentType.includes('charset=')) {
            responseToCache.headers.set('Content-Type', `${contentType}; charset=utf-8`);
            responseForClient.headers.set('Content-Type', `${contentType}; charset=utf-8`);
          }

          // Add cache tag
          responseToCache.headers.set('Cache-Tag', `${VITE_ENV},${buildVersion}`);
          responseForClient.headers.set('Cache-Tag', `${VITE_ENV},${buildVersion}`);

          // Cache the response
          ctx.waitUntil(cache.put(request, responseToCache));

          return responseForClient;
        }

        return response;
      } catch (error: unknown) {
        console.error('SSR Error:', error);
        finalError = error;
      }
    }

    // Return a basic error page
    return new Response(HTML_ERROR(finalError instanceof Error ? finalError.message : JSON.stringify(finalError)), {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Rendered-By': 'Client-Side-Shell',
      },
    });
  },
} satisfies ExportedHandler<Env>;
