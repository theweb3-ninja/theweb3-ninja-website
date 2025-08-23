const env = import.meta.env || process.env;

export const VITE_ENV = env.VITE_ENV;

export const isDev = env.MODE === 'development';
export const isStaging = env.MODE === 'staging';
export const isProduction = env.MODE === 'production';
export const isServer = typeof window === 'undefined' || String(env.SSR) === 'true';
export const isDebug = env.VITE_DEBUG === 'true';

// Base domains without protocol
export const DOMAIN_GLOBAL = env.VITE_DOMAIN_GLOBAL || 'theweb3.ninja';

// Full URLs with protocol
export const URL_GLOBAL = `https://${DOMAIN_GLOBAL}`;

// Email addresses
export const EMAIL_GENERAL = `info@${DOMAIN_GLOBAL}`;
export const EMAIL_SALES = `sales@${DOMAIN_GLOBAL}`;
export const EMAIL_SECURITY = `security@${DOMAIN_GLOBAL}`;

// Company Information
export const companyInfo = {
  name: 'The Web3 Ninja',
  shortName: 'The Web3 Ninja',
  foundingYear: '2025',
  website: URL_GLOBAL,
  address: {
    value: 'Ordona, Italy',
    full: 'Via Giovine,74, Ordona, FG, Italy',
  },
};

// Domain configurations with their respective flags
export const DOMAIN_CONFIG = [
  {
    domain: DOMAIN_GLOBAL,
    url: URL_GLOBAL,
    icon: 'world', // world icon
    ariaLabel: `${companyInfo.shortName} Global`,
  },
];

export const FEATURES = env.VITE_FEATURES || 'landing,bonusResources';

export const MEASUREMENT_ID = env.VITE_MEASUREMENT_ID || '';

export const FORCE_STRICT_MODE = env.VITE_FORCE_STRICT_MODE || false;
