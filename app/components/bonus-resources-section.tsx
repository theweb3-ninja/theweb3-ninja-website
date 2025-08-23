import { ClockIcon, DownloadIcon, FileIcon, FileTextIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { UserType } from '../../shared';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export const BonusResourcesSection = ({ onCTAClick }: { onCTAClick: (userType: UserType) => void }) => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-6 container-fluid mx-auto px-6 py-20 bg-gradient-to-br from-eveo/5 via-white to-eveo/10">
      <div className="w-full text-center max-w-5xl mx-auto mb-0">
        <Badge className="mb-6 bg-eveo/10 text-eveo border-eveo/20 hover:bg-eveo/15 px-4 py-2 text-sm font-medium">
          <ClockIcon className="w-4 h-4 mr-2" />
          {t('bonusResources.limitedTime')}
        </Badge>

        <h2 className="inline-block text-eveo-dark w-full leading-tight text-4xl md:text-5xl font-bold mb-6 text-ellipsis overflow-hidden uppercase">
          {t('bonusResources.title')}
        </h2>

        <p className="text-xl mb-12 leading-relaxed">{t('bonusResources.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {/* Guide PDF */}
        <Card className="p-8 backdrop-blur-sm border-2 border-eveo/10 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-eveo/20">
          <CardContent className="p-0">
            <div className="w-20 h-20 bg-gradient-to-br from-eveo to-eveo/80 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileTextIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">{t('bonusResources.guide.title')}</h3>
            <p className="text-gray-600 mb-6 text-center leading-relaxed">{t('bonusResources.guide.description')}</p>
            <div className="flex justify-center">
              <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
                PDF • {t('bonusResources.free')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Excel Spreadsheet */}
        <Card className="p-8 backdrop-blur-sm border-2 border-eveo/10 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-eveo/20">
          <CardContent className="p-0">
            <div className="w-20 h-20 bg-gradient-to-br from-eveo to-eveo/80 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">{t('bonusResources.spreadsheet.title')}</h3>
            <p className="text-gray-600 mb-6 text-center leading-relaxed">
              {t('bonusResources.spreadsheet.description')}
            </p>
            <div className="flex justify-center">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                Excel • {t('bonusResources.free')}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button
          onClick={() => onCTAClick(UserType.Organizer)}
          className="rounded-2xl px-6 sm:px-12 text-lg bg-gradient-to-r from-eveo to-eveo/80 hover:from-eveo/90 hover:to-eveo/70 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <DownloadIcon className="w-12 h-12 mr-3" />
          {t('bonusResources.downloadButton')}
        </Button>
      </div>
    </section>
  );
};
