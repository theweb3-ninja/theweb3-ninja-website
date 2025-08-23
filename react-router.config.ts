import type { Config } from '@react-router/dev/config';

export default {
  // Enable SSR for better SEO and initial load performance
  ssr: true,

  // Build directory for SSR output
  buildDirectory: 'dist',

  appDirectory: 'app',

  // Future flags for experimental features
  future: {
    /**
     * Enable route middleware
     */
    // unstable_middleware: true,
    unstable_optimizeDeps: true, // https://remix.run/docs/en/main/guides/dependency-optimization
    /**
     * Automatically split route modules into multiple chunks when possible.
     */
    unstable_splitRouteModules: true, // https://remix.run/blog/split-route-modules
    // unstable_subResourceIntegrity: true, // https://nextjs.org/docs/app/guides/content-security-policy
    /**
     * Use Vite Environment API (experimental)
     */
    unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
