import { useTranslation } from 'react-i18next';
import { VENDOR_CATEGORIES, type VendorCategoryKey } from '../../config';
import { ClientOnlyLocalizedLink } from '../client-only-localized-link';
import { Button } from '../ui/button';
import {
  AudioVideoIcon,
  CateringIcon,
  DJServicesIcon,
  EquipmentSuppliesIcon,
  HotelsVenuesIcon,
  LeisureExperiencesIcon,
  MarketingDesignIcon,
  PhotographyVideoIcon,
  RestaurantsIcon,
  TrainingCoachingIcon,
  TransportationIcon,
  TravelToursIcon,
} from '../ui/category-icons';

const iconMap = {
  Building: HotelsVenuesIcon,
  Package: EquipmentSuppliesIcon,
  Utensils: CateringIcon,
  ChefHat: RestaurantsIcon,
  GraduationCap: TrainingCoachingIcon,
  Video: AudioVideoIcon,
  Music: DJServicesIcon,
  Palette: MarketingDesignIcon,
  Camera: PhotographyVideoIcon,
  Car: TransportationIcon,
  MapPin: TravelToursIcon,
  Zap: LeisureExperiencesIcon,
};

interface CategoryGridProps {
  selectedCategory?: VendorCategoryKey | null;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ selectedCategory }) => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 min-h-screen mx-auto from-theweb3ninja-light/10 via-theweb3ninja-light/5 to-theweb3ninja/5 bg-gradient-to-br flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 flex flex-col gap-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary uppercase">
            {t('categories.title', 'Esplora le Categorie')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('categories.subtitle', 'Trova i fornitori perfetti per il tuo evento in ogni categoria')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(VENDOR_CATEGORIES).map(([key, category]) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            const isSelected = selectedCategory === key;

            return (
              <ClientOnlyLocalizedLink
                to={`/vendors/${key}`}
                key={key}
                className={`
                  relative group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg
                  ${isSelected ? 'bg-white shadow-lg ring-2 ring-primary' : 'bg-white hover:shadow-md'}
                `}
              >
                <div className="text-center">
                  <div
                    className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors
                    ${category.color}
                  `}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  <h3 className="font-semibold text-sm leading-tight">{t(`categories.${key}`, key)}</h3>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </ClientOnlyLocalizedLink>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="inline-flex items-center px-6 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors text-white font-semibold"
          >
            <ClientOnlyLocalizedLink to="/vendors">
              {t('categories.viewAll', 'Visualizza Tutti i Fornitori')}
            </ClientOnlyLocalizedLink>
          </Button>
        </div>
      </div>
    </section>
  );
};
