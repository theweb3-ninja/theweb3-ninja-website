import {
  ChatBubbleIcon,
  ClockIcon,
  DrawingPinIcon,
  ExternalLinkIcon,
  LockClosedIcon,
  PersonIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router';
import type { Vendor } from '../../types/marketplace';
import { LocalizedLink } from '../localized-link';

interface VendorCardProps {
  vendor: Vendor;
  onContactClick?: (vendor: Vendor) => void;
  // onViewProfile?: (vendor: Vendor) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, onContactClick }) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  // const handleViewProfile = () => {
  //   if (onViewProfile) {
  //     onViewProfile(vendor);
  //   } else {
  //     navigate(`/vendor/${vendor.id}`);
  //   }
  // };

  const getPriceRangeColor = (priceRange: Vendor['priceRange']) => {
    switch (priceRange) {
      case 'budget':
        return 'text-green-600 bg-green-50';
      case 'mid-range':
        return 'text-orange-600 bg-orange-50';
      case 'premium':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityColor = (availability: Vendor['availability']) => {
    switch (availability) {
      case 'available':
        return 'text-green-600 bg-green-50';
      case 'busy':
        return 'text-orange-600 bg-orange-50';
      case 'unavailable':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <PersonIcon className="w-12 h-12 mx-auto mb-2" />
            <span className="text-sm">Foto non disponibile</span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {vendor.verified && (
            <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              <LockClosedIcon className="w-3 h-3" />
              {t('vendor.verified', 'Verificato')}
            </div>
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceRangeColor(vendor.priceRange)}`}>
            {t(`vendor.priceRange.${vendor.priceRange}`, vendor.priceRange)}
          </div>
        </div>

        {/* Availability */}
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(vendor.availability)}`}>
            {t(`vendor.availability.${vendor.availability}`, vendor.availability)}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{vendor.name}</h3>
            <div className="flex items-center gap-1 text-sm">
              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{vendor.rating}</span>
              <span className="text-gray-500">({vendor.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <DrawingPinIcon className="w-4 h-4" />
            <span>{vendor.location}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4" />
            <span>
              {t('vendor.responseTime', 'Risponde in')}: {vendor.responseTime}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>

        {/* Services */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {vendor.services.slice(0, 3).map((service, index) => (
              <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {service}
              </span>
            ))}
            {vendor.services.length > 3 && (
              <span className="inline-block text-gray-500 px-2 py-1 text-xs">+{vendor.services.length - 3} altri</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <LocalizedLink
            to={`/vendor/${vendor.slug}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {t('vendor.viewProfile', 'Vedi Profilo')}
          </LocalizedLink>
          <button
            onClick={() => onContactClick?.(vendor)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {t('vendor.contact', 'Contatta')}
          </button>
        </div>

        {/* Contact info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              {vendor.phone && (
                <div className="flex items-center gap-1">
                  <ChatBubbleIcon className="w-3 h-3" />
                  <span>{vendor.phone}</span>
                </div>
              )}
              {vendor.website && (
                <div className="flex items-center gap-1">
                  <ExternalLinkIcon className="w-3 h-3" />
                  <span>Sito web</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="capitalize">{t(`vendor.coverageArea.${vendor.coverageArea}`, vendor.coverageArea)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
