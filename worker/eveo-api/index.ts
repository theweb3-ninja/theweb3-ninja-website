import { handleContactSubmission } from './contact';
import { purgeCache } from './purge-cache';

export async function handleApiRequest(request: Request, env: Env) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Special endpoint to manually purge cache
  if (pathname === '/eveo-api/purge-cache') {
    const response = await purgeCache(env, [env.VITE_ENV]);

    console.log('Manual cache purge response:', await response.clone().text());

    return response;
  }

  // Handle contact submissions
  if (pathname === '/eveo-api/contact' && request.method === 'POST') {
    return handleContactSubmission(env, request);
  }

  return new Response('Not found', { status: 404 });
}

export { purgeCache };
