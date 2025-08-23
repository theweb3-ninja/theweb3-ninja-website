import { ArrowUpIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from './ui/button';

export const FinalCTASection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleCTAClick = () => {
    const top = !isMobile ? 0 : 580;
    // Just scroll to top with smooth effect - don't open modal automatically
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="container mx-auto px-6 py-20 bg-white">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-primary uppercase">{t('finalCta.title')}</h2>
        <p className="text-xl mb-12">{t('finalCta.subtitle')}</p>

        <div className="flex justify-center">
          <Button
            onClick={handleCTAClick}
            className="rounded-2xl px-8 py-2 text-lg bg-linear-135 from-eveo to-eveo-dark hover:from-eveo-light hover:to-eveo text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowUpIcon className="w-5 h-5 mr-2" />
            {t('finalCta.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};
