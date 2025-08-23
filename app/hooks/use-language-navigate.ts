import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { getNextLanguagePath, updateDocumentLanguageAttributes } from '../services';

/**
 * Custom hook for language-based navigation
 * Uses React Router's useNavigate for smoother transitions
 */
export const useLanguageNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  /**
   * Navigate to the same page but with a different language
   * @param languageCode - Target language code
   */
  const navigateToLanguage = (languageCode: string, preventScrollReset?: boolean) => {
    // Ensure UI updates immediately regardless of URL changes
    if (i18n.language !== languageCode) {
      i18n.changeLanguage(languageCode);
    }
    updateDocumentLanguageAttributes(languageCode);

    const newPath = getNextLanguagePath(location.pathname, languageCode);

    if (newPath !== location.pathname) {
      navigate(newPath, { preventScrollReset });
    }
  };

  return navigateToLanguage;
};
