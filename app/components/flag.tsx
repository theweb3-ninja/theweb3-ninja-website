import * as countryFlagIcons from 'country-flag-icons';
import 'country-flag-icons/3x2/flags.css';

const languageToCountryMap: Record<string, string> = {
  de: 'DE',
  en: 'GB',
  es: 'ES',
  fr: 'FR',
  it: 'IT',
  nl: 'NL',
  pl: 'PL',
  pt: 'PT',
  ro: 'RO',
  sv: 'SE',
};

interface FlagProps {
  languageCode: string;
  className?: string;
}

export const Flag = ({ languageCode, className }: FlagProps) => {
  const countryCode = languageToCountryMap[languageCode];
  const cn = (className?: string) => `inline-block rounded shadow-sm opacity-70 mr-1 ${className || 'w-4 h-3'}`;

  if (!countryFlagIcons.hasFlag(countryCode)) {
    return (
      <span className={cn(`align-middle text-md -mt-2 ${className}`)} role="img" aria-label="World">
        🌐
      </span>
    );
  }

  return (
    <span
      className={cn(`${className} flag:${countryCode.toUpperCase()}`)}
      style={{ '--CountryFlagIcon-height': '0.9rem' } as React.CSSProperties}
    />
  );
};
