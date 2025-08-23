import { Cloudflare } from 'cloudflare';

/**
 * Create a Cloudflare client instance with environment variables
 * @param env - Environment variables from the worker
 * @returns Cloudflare client instance
 */
export function createCloudflareClient(env: Env): Cloudflare {
  return new Cloudflare({
    apiEmail: env.CLOUDFLARE_EMAIL,
    apiToken: env.CLOUDFLARE_API_TOKEN,
  });
}

/**
 * Function to purge cache
 * @param env - Environment variables from the worker
 * @param tags - Optional tags to purge
 * @returns HTTP response
 */
export async function purgeCache(env: Env, tags?: string[]): Promise<Response> {
  try {
    // Check if required environment variables are available
    if (!env.CLOUDFLARE_EMAIL || !env.CLOUDFLARE_API_TOKEN || !env.ZONE_ID) {
      const missingEnvs = [
        !env.CLOUDFLARE_EMAIL && 'CLOUDFLARE_EMAIL',
        !env.CLOUDFLARE_API_TOKEN && 'CLOUDFLARE_API_TOKEN',
        !env.ZONE_ID && 'ZONE_ID',
      ].filter(Boolean) as string[];
      console.error('Missing required environment variables for cache purge', JSON.stringify(missingEnvs));

      return new Response(
        `Cache purge failed: Missing required environment variables: ${JSON.stringify(missingEnvs)}`,
        { status: 500 }
      );
    }

    // Create client with environment variables from the worker
    const client = createCloudflareClient(env);

    // Purge cache with the zone ID from environment variables
    const response = await client.cache.purge({
      zone_id: env.ZONE_ID,
      tags,
    });

    const message = `Cache purge with tags: ${JSON.stringify(tags)} triggered successfully: ${response?.id} | Env: ${env.VITE_ENV}`;

    console.log(message);

    return new Response(message, { status: 200 });
  } catch (error) {
    console.error('Cache purge failed:', error);

    return new Response(`Cache purge failed: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
    });
  }
}
