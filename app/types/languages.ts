/**
 * Language configuration for the application
 * Maps language codes to their respective locales and display names
 */
export interface LanguageConfig {
  /** Language code (e.g., 'en', 'it') */
  code: string;
  /** BCP 47 locale code (e.g., 'en-GB', 'it-IT') */
  locale: string;
  /** Human-readable language name in its native language */
  nativeName: string;
  /** Human-readable language name in English */
  englishName: string;
  /** Direction of text (ltr or rtl) */
  dir?: 'ltr' | 'rtl';
}
