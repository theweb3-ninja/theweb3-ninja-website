import { LightningBoltIcon, LockClosedIcon, TargetIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

export const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="container-fluid mx-auto px-6 py-20 bg-white/50 backdrop-blur-sm">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 bg-linear-135 from-theweb3ninja to-theweb3ninja-dark bg-clip-text text-transparent uppercase">
          {t('features.title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('features.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100">
          <div className="w-20 h-20 bg-linear-135 from-theweb3ninja to-theweb3ninja-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <TargetIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{t('features.perfectMatch')}</h3>
          <p className="text-gray-600">{t('features.perfectMatchDesc')}</p>
        </div>

        <div className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100">
          <div className="w-20 h-20 bg-linear-135 from-theweb3ninja to-theweb3ninja-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <LightningBoltIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{t('features.lightning')}</h3>
          <p className="text-gray-600">{t('features.lightningDesc')}</p>
        </div>

        <div className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100">
          <div className="w-20 h-20 bg-linear-135 from-theweb3ninja to-theweb3ninja-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <LockClosedIcon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{t('features.verified')}</h3>
          <p className="text-gray-600">{t('features.verifiedDesc')}</p>
        </div>
      </div>
    </section>
  );
};
