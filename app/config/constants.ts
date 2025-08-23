const env = import.meta.env || process.env;

export const VITE_ENV = env.VITE_ENV;

export const isDev = env.MODE === 'development';
export const isStaging = env.MODE === 'staging';
export const isProduction = env.MODE === 'production';
export const isServer = typeof window === 'undefined' || String(env.SSR) === 'true';
export const isDebug = env.VITE_DEBUG === 'true';

// Base domains without protocol
export const DOMAIN_EVEO_GLOBAL = env.VITE_DOMAIN_EVEO_GLOBAL || 'geteveo.com';
export const DOMAIN_EVEO_ITALY = env.VITE_DOMAIN_EVEO_ITALY || 'eveo.it';
export const DOMAIN_EVEO_SPAIN = env.VITE_DOMAIN_EVEO_SPAIN || 'eveo.es';

// Full URLs with protocol
export const URL_EVEO_GLOBAL = `https://${DOMAIN_EVEO_GLOBAL}`;
export const URL_EVEO_ITALY = `https://${DOMAIN_EVEO_ITALY}`;
export const URL_EVEO_SPAIN = `https://${DOMAIN_EVEO_SPAIN}`;

// Email addresses
export const EMAIL_GENERAL = `info@${DOMAIN_EVEO_GLOBAL}`;
export const EMAIL_SALES = `sales@${DOMAIN_EVEO_GLOBAL}`;
export const EMAIL_SECURITY = `security@${DOMAIN_EVEO_GLOBAL}`;

// Company Information
export const companyInfo = {
  name: 'Eveo S.r.l.',
  shortName: 'Eveo',
  foundingYear: '2025',
  website: URL_EVEO_GLOBAL,
  address: {
    value: 'Bari, Italy',
    full: 'Viale J.F. Kennedy 75/H, 70124, Bari (BA)',
  },
};

// Domain configurations with their respective flags
export const DOMAIN_CONFIG = [
  {
    domain: DOMAIN_EVEO_GLOBAL,
    url: URL_EVEO_GLOBAL,
    icon: 'world', // world icon
    ariaLabel: `${companyInfo.shortName} Global`,
  },
  {
    domain: DOMAIN_EVEO_SPAIN,
    url: URL_EVEO_SPAIN,
    icon: 'es', // spanish flag
    ariaLabel: `${companyInfo.shortName} España`,
  },
  {
    domain: DOMAIN_EVEO_ITALY,
    url: URL_EVEO_ITALY,
    icon: 'it', // italian flag
    ariaLabel: `${companyInfo.shortName} Italia`,
  },
];

export const EVEO_FEATURES = env.VITE_EVEO_FEATURES || 'landing,bonusResources';

export const MEASUREMENT_ID = env.VITE_MEASUREMENT_ID || '';

export const FORCE_STRICT_MODE = env.VITE_FORCE_STRICT_MODE || false;
