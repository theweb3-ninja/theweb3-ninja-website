import { useEffect } from 'react';
import { isProduction, isStaging, MEASUREMENT_ID } from '../config';

// This should be injected in the HTML head before any other scripts
export const AnalyticsScript = () => {
  // Inject scripts after mount to avoid interfering with React's DOM
  // reconciliation. Also provide cleanup on unmount.
  useEffect(() => {
    if (!isProduction || !isStaging) return; // only inject on non-production per current logic

    const head = document.head;

    if (!head) return;

    // Prevent duplicates if hot reloading
    const GA_SCRIPT_ID = 'ga-gtag-loader';
    const GA_INLINE_ID = 'ga-gtag-inline';
    const existingLoader = document.getElementById(GA_SCRIPT_ID);
    const existingInline = document.getElementById(GA_INLINE_ID);
    if (existingLoader || existingInline) return;

    const loader = document.createElement('script');
    loader.id = GA_SCRIPT_ID;
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

    const inline = document.createElement('script');
    inline.id = GA_INLINE_ID;
    inline.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${MEASUREMENT_ID}');
    `;

    head.appendChild(loader);
    head.appendChild(inline);

    return () => {
      // Cleanup on unmount to avoid orphan nodes across HMR
      const l = document.getElementById(GA_SCRIPT_ID);
      const s = document.getElementById(GA_INLINE_ID);
      if (l && l.parentNode) l.parentNode.removeChild(l);
      if (s && s.parentNode) s.parentNode.removeChild(s);
    };
  }, []);

  return null;
};
