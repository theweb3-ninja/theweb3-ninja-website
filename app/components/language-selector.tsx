import { GlobeIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { languageConfigs } from '../config';
import { useIsMobile, useLanguageNavigate } from '../hooks';
import { Flag } from './flag';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface LanguageSelectorProps {
  className?: string;
  full?: boolean;
}

const PreloadFlags = () => (
  <div className="opacity-0 overflow-hidden w-0 h-0">
    {languageConfigs.map(lang => {
      return <Flag languageCode={lang.code} key={lang.code} />;
    })}
  </div>
);

export const LanguageSelector = ({ className = '', full }: LanguageSelectorProps) => {
  const navigateToLanguage = useLanguageNavigate();
  const { i18n } = useTranslation();
  const onlyIcon = useIsMobile();

  const handleLanguageChange = (languageCode: string) => {
    // Delegate to hook, which updates i18n, document attrs, and URL
    navigateToLanguage(languageCode, true);
  };

  if (!full && onlyIcon) {
    return (
      <div className={`flex items-center ${className}`}>
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-10 h-10 border-0 bg-transparent shadow-none p-0 justify-center cursor-pointer">
            <GlobeIcon className="w-4 h-4 text-gray-600" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
            {languageConfigs.map(lang => {
              return (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center gap-2">
                    <Flag languageCode={lang.code} />
                    <span>{lang.nativeName}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <PreloadFlags />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-40 border border-gray-200 bg-transparent shadow-none cursor-pointer">
          <div className="flex items-center gap-2">
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
          {languageConfigs.map(lang => {
            return (
              <SelectItem key={lang.code} value={lang.code}>
                <div className="flex items-center gap-2">
                  <Flag languageCode={lang.code} className="w-4 h-4" />
                  <span>{lang.nativeName}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <PreloadFlags />
    </div>
  );
};
