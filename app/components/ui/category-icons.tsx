/** Marketplace Category Icons - React Components */

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

/**
 * Usage example:
 * import { HotelsVenuesIcon, EveoIcons } from './EveoIcons';
 *
 * <HotelsVenuesIcon size={32} className="text-blue-600" />
 * <EveoIcons.Catering size={24} color="#ff6b35" />
 */

// Hotels & Venues
export const HotelsVenuesIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 21V9L12 2L21 9V21H16V14H8V21H3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 21V17H15V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="8" r="1" fill={color} />
  </svg>
);

// Equipment & Supplies
export const EquipmentSuppliesIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
    <path d="M8 21H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 17V21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <rect x="6" y="7" width="3" height="2" rx="0.5" fill={color} />
    <rect x="10" y="7" width="3" height="2" rx="0.5" fill={color} />
    <rect x="15" y="7" width="3" height="2" rx="0.5" fill={color} />
    <rect x="6" y="11" width="6" height="2" rx="0.5" fill={color} />
    <rect x="14" y="11" width="4" height="2" rx="0.5" fill={color} />
  </svg>
);

// Catering
export const CateringIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M5 17H19L18 19H6L5 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 19V21H18V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="13" r="1" fill={color} />
    <circle cx="16" cy="13" r="1" fill={color} />
  </svg>
);

// Restaurants
export const RestaurantsIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 2V7C3 8.1 3.9 9 5 9H7V22H9V9H11C12.1 9 13 8.1 13 7V2H3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M16 2V7L18 9V22H20V9L22 7V2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 2V9M9 2V9M11 2V9" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Training & Coaching
export const TrainingCoachingIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M22 10V6C22 5.45 21.55 5 21 5H3C2.45 5 2 5.45 2 6V10C2 10.55 2.45 11 3 11H21C21.55 11 22 10.55 22 10Z"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M6 11V17L12 20L18 17V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="2" r="1" fill={color} />
    <path d="M12 3V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="7" cy="8" r="1" fill={color} />
    <circle cx="12" cy="8" r="1" fill={color} />
    <circle cx="17" cy="8" r="1" fill={color} />
  </svg>
);

// Audio & Video
export const AudioVideoIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="12" rx="2" stroke={color} strokeWidth="2" />
    <polygon points="10,8 10,14 16,11" fill={color} />
    <path d="M8 20H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 16V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="6" cy="6" r="1" fill={color} />
    <circle cx="18" cy="6" r="1" fill={color} />
  </svg>
);

// DJ Services
export const DJServicesIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill={color} />
    <path d="M6.34 6.34L8.46 8.46" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17.66 6.34L15.54 8.46" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17.66 17.66L15.54 15.54" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M6.34 17.66L8.46 15.54" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <rect x="1" y="8" width="2" height="8" rx="1" fill={color} />
    <rect x="21" y="8" width="2" height="8" rx="1" fill={color} />
  </svg>
);

// Marketing & Design
export const MarketingDesignIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2" fill={color} />
    <path d="M8 16L12 12L16 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="6" cy="18" r="1" fill={color} />
    <circle cx="18" cy="6" r="1" fill={color} />
  </svg>
);

// Photography & Video
export const PhotographyVideoIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill={color} />
    <path d="M7 3H9L10 6H14L15 3H17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="9" r="1" fill={color} />
    <path d="M16 15L19 18L16 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Transportation
export const TransportationIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 17H17L19 9H5L7 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="19" r="2" stroke={color} strokeWidth="2" />
    <circle cx="15" cy="19" r="2" stroke={color} strokeWidth="2" />
    <path d="M5 9V6C5 4.89 5.89 4 7 4H17C18.11 4 19 4.89 19 6V9" stroke={color} strokeWidth="2" />
    <rect x="8" y="6" width="8" height="2" rx="1" fill={color} />
    <path d="M2 9H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Travel & Tours
export const TravelToursIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
    <path d="M8 12C10 8 14 8 16 12C14 16 10 16 8 12Z" stroke={color} strokeWidth="2" />
    <path d="M12 4V8M12 16V20M4 12H8M16 12H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill={color} />
    <path
      d="M6.34 6.34L8.46 8.46M15.54 15.54L17.66 17.66M17.66 6.34L15.54 8.46M8.46 15.54L6.34 17.66"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Leisure & Experiences
export const LeisureExperiencesIcon: React.FC<IconProps> = ({ size = 24, className = '', color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2L13.5 7.5L19 9L13.5 10.5L12 16L10.5 10.5L5 9L10.5 7.5L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="19" r="3" stroke={color} strokeWidth="2" />
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth="2" />
    <path d="M6 16V19M18 16V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="6" cy="19" r="1" fill={color} />
    <circle cx="18" cy="19" r="1" fill={color} />
    <path d="M9 16C9 14 10 13 12 13C14 13 15 14 15 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
