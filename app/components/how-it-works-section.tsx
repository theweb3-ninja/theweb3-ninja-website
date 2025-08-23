import { CalendarIcon, ChatBubbleIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

export const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="how-it-works"
      className="container-fluid mx-auto px-6 py-20 bg-gradient-to-br from-purple-50/30 to-indigo-50/30"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 bg-linear-to-r from-eveo to-eveo-dark bg-clip-text text-transparent uppercase">
          {t('howItWorks.title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('howItWorks.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center relative">
          <div className="w-20 h-20 bg-linear-135 from-eveo to-eveo-dark rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
            <MagnifyingGlassIcon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 to-purple-300 transform -translate-x-1/2 hidden md:block"></div>
          <h3 className="text-2xl font-bold mb-4">{t('howItWorks.step1Title')}</h3>
          <p className="text-gray-600">{t('howItWorks.step1Desc')}</p>
        </div>

        <div className="text-center relative">
          <div className="w-20 h-20 bg-linear-135 from-eveo to-eveo-dark rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
            <ChatBubbleIcon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 to-purple-300 transform -translate-x-1/2 hidden md:block"></div>
          <h3 className="text-2xl font-bold mb-4">{t('howItWorks.step2Title')}</h3>
          <p className="text-gray-600">{t('howItWorks.step2Desc')}</p>
        </div>

        <div className="text-center relative">
          <div className="w-20 h-20 bg-linear-135 from-eveo to-eveo-dark rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
            <CalendarIcon className="w-10 h-10 text-white" />
          </div>
          <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 to-purple-300 transform -translate-x-1/2 hidden md:block"></div>
          <h3 className="text-2xl font-bold mb-4">{t('howItWorks.step3Title')}</h3>
          <p className="text-gray-600">{t('howItWorks.step3Desc')}</p>
        </div>
      </div>
    </section>
  );
};
