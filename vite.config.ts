import { cloudflare } from '@cloudflare/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine if we're in development mode
  const isDev = mode === 'development';
  const isStaging = mode === 'staging';
  const env = loadEnv(isStaging ? 'staging' : mode, process.cwd());

  // Expose VITE_ vars to process.env for SSR and middleware
  Object.assign(process.env, env);

  // Determine if we're using Cloudflare (cf-dev, cf-build, cf-deploy commands)
  const isCloudflare = process.env.CLOUDFLARE_WRANGLER === 'true';

  return {
    mode,
    plugins: [
      // Only include cloudflare plugin when using Cloudflare commands
      isCloudflare ? cloudflare() : null,
      tailwindcss(),
      reactRouter(),
      ViteImageOptimizer({
        // Image optimization settings
        png: {
          // https://sharp.pixelplumbing.com/api-output#png
          quality: 90,
        },
        jpeg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 70,
        },
        jpg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 70,
        },
        webp: {
          // https://sharp.pixelplumbing.com/api-output#webp
          lossless: true,
        },
        avif: {
          // https://sharp.pixelplumbing.com/api-output#avif
          lossless: true,
        },
      }),
    ],

    optimizeDeps: {
      include: ['react-router', 'i18next', 'react-i18next', 'zustand'],
      exclude: [],
    },

    ssr: {
      noExternal: ['react-router', 'i18next', 'react-i18next', 'zustand'],
    },

    css: {
      // Disable CSS sourcemaps in dev
      devSourcemap: isDev ? true : false,
    },

    build: {
      outDir: 'dist',
      // Disable sourcemaps in production build
      sourcemap: isDev ? true : false,
      rollupOptions: {
        output: {
          // Control the order of chunks for proper dependency loading
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          // Ignore all sourcemaps in build outputs to avoid noisy warnings from non-JS assets
          sourcemapIgnoreList: () => true,
          manualChunks: {
            vendor: ['react-router', 'i18next', 'react-i18next', 'zustand'],
          },
        },
        // Increase the number of parallel file operations
        maxParallelFileOps: 10,
      },
      emptyOutDir: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isDev ? false : true,
          drop_debugger: isDev ? false : true,
          dead_code: false,
        },
      },
      // Generate static HTML for each route
      ssrManifest: true,
    },

    define: {
      'process.env.VITE_ENV': JSON.stringify(isDev ? 'development' : isStaging ? 'staging' : 'production'),
      'process.env.VITE_DEBUG': JSON.stringify(env.VITE_DEBUG),
      'process.env.VITE_DOMAIN_GLOBAL': JSON.stringify(env.VITE_DOMAIN_GLOBAL),
      'process.env.VITE_FEATURES': JSON.stringify(env.VITE_FEATURES),
      'process.env.VITE_FORCE_STRICT_MODE': JSON.stringify(env.VITE_FORCE_STRICT_MODE),
      'process.env.VITE_MEASUREMENT_ID': JSON.stringify(env.VITE_MEASUREMENT_ID),
      // Add global polyfill for packages that expect Node.js environment
      global: 'globalThis',
    },
  };
});
