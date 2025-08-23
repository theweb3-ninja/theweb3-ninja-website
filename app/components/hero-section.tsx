import { PersonIcon, RocketIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { UserType } from '../../shared';
import { Header } from './layout-header';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface HeroSectionProps {
  onCTAClick: (userType: UserType) => void;
}

export const HeroSection = ({ onCTAClick }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col container-fluid mx-auto px-6 bg-gradient-to-br from-eveo-light/5 via-purple-50/50 to-purple-300/20">
      <Header className="absolute top-0 left-0 -right-0" />

      <div className="text-center max-w-6xl mx-auto pt-30 min-h-screen flex flex-col justify-center gap-2 md:gap-5">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight">
          <span className="bg-linear-135 from-eveo to-eveo-dark bg-clip-text text-transparent uppercase">
            {t('hero.title')}
          </span>
          <br />
          <span className="text-gray-800 uppercase">{t('hero.titleHighlight')}</span>
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">{t('hero.subtitle')}</p>

        {/* Dual CTA Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Event Organizer CTA */}
          <Card className="p-8 backdrop-blur-sm border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-linear-135 from-eveo to-eveo-dark rounded-2xl flex items-center text-white justify-center mx-auto mb-6">
                <PersonIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('hero.organizerTitle')}</h3>
              <p className="text-gray-600 mb-6">{t('hero.organizerSubtitle')}</p>
              <Button
                onClick={() => onCTAClick(UserType.Organizer)}
                className="w-full rounded-2xl h-12 bg-linear-135 from-eveo to-eveo-dark hover:from-eveo-light hover:to-eveo text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('hero.organizerCta')}
              </Button>
            </CardContent>
          </Card>

          {/* Supplier CTA */}
          <Card className="p-8 backdrop-blur-sm border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-linear-135 from-eveo to-eveo-dark rounded-2xl flex items-center text-white justify-center mx-auto mb-6">
                <RocketIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('hero.supplierTitle')}</h3>
              <p className="text-gray-600 mb-6">{t('hero.supplierSubtitle')}</p>
              <Button
                onClick={() => onCTAClick(UserType.Supplier)}
                className="w-full rounded-2xl h-12 bg-linear-135 from-eveo to-eveo-dark hover:from-eveo-light hover:to-eveo text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('hero.supplierCta')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
