export const VENDOR_CATEGORIES = {
  'hotels-venues': {
    icon: 'Building',
    color: 'bg-blue-100 text-blue-700',
  },
  'equipment-supplies': {
    icon: 'Package',
    color: 'bg-green-100 text-green-700',
  },
  catering: {
    icon: 'Utensils',
    color: 'bg-orange-100 text-orange-700',
  },
  restaurants: {
    icon: 'ChefHat',
    color: 'bg-red-100 text-red-700',
  },
  'training-coaching': {
    icon: 'GraduationCap',
    color: 'bg-purple-100 text-purple-700',
  },
  'audio-video': {
    icon: 'Video',
    color: 'bg-indigo-100 text-indigo-700',
  },
  'dj-services': {
    icon: 'Music',
    color: 'bg-pink-100 text-pink-700',
  },
  'marketing-design': {
    icon: 'Palette',
    color: 'bg-yellow-100 text-yellow-700',
  },
  'photography-video': {
    icon: 'Camera',
    color: 'bg-cyan-100 text-cyan-700',
  },
  transportation: {
    icon: 'Car',
    color: 'bg-gray-100 text-gray-700',
  },
  'travel-tours': {
    icon: 'MapPin',
    color: 'bg-emerald-100 text-emerald-700',
  },
  'leisure-experiences': {
    icon: 'Zap',
    color: 'bg-rose-100 text-rose-700',
  },
} as const;

export type VendorCategoryKey = keyof typeof VENDOR_CATEGORIES;

export const getCategoryList = () => Object.values(VENDOR_CATEGORIES);

export const getCategoryByKey = (key: VendorCategoryKey) => VENDOR_CATEGORIES[key];
