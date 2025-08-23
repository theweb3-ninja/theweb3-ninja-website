export interface CloudflareContext {
  cloudflare: { env: Env; ctx: ExecutionContext };
}

export interface ValidationError {
  field: string;
  message: string;
}

export enum UserType {
  Organizer = 'organizer',
  Supplier = 'supplier',
}

export enum EventType {
  Personal = 'personal',
  Business = 'business',
}

export enum ServiceType {
  Hotel = 'hotel',
  PhotoVideo = 'photo-video',
  Catering = 'catering',
  Merchandise = 'merchandise',
  AudioVideo = 'audio-video',
  Deejay = 'deejay',
  Transport = 'transport',
  Leisure = 'leisure',
  Consulting = 'consulting',
  Other = 'other',
}

// Define the shape of the contact form data
export interface ContactFormReactState {
  CompanyName: string;
  EmailAddress: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  UserType: UserType;
  EventType: EventType;
  ServiceTypes: ServiceType[];
}

// Define EmailOctopus API response type
export interface EmailOctopusResponse {
  status: number | string;
  id?: string;
  detail?: string;
  type?: string; // Link to doc error
  level?: string;
  // success: boolean;
  // id?: string;
  // error?: {
  //   code: string;
  //   message: string;
  // };
}

// Define EmailOctopus data structure with proper typing
export interface EmailOctopusData {
  email_address: string;
  fields: Record<string, string>;
  status: string;
  tags: string[];
}

export interface SeoMetaOptions {
  hostname: string;
  alternates?: { href: string; hreflang: string }[];
  description?: string;
  image?: string;
  keywords?: string;
  language?: string;
  noIndex?: boolean;
  title?: string;
}

/**
 * Domain-specific meta tag configurations
 */
export interface MetaTagConfig {
  canonical: string;
  alternates: { href: string; hreflang: string }[];
  noIndex?: boolean;
}

export interface SocialLinks {
  name: string;
  url: string;
  ariaLabel: string;
  description: string;
  color: string;
}

export interface RootLoaderData {
  detectedLanguage: string;
  hostname: string;
  pathname?: string;
}

export interface PageMetadata extends Omit<SeoMetaOptions, 'hostname'> {
  url?: string;
}
