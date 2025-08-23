import type { VendorCategoryKey } from '../config';

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  category: VendorCategoryKey;
  description: string;
  location: string;
  city: string;
  region: string;
  coverageArea: 'local' | 'regional' | 'national';
  rating: number;
  reviewCount: number;
  verified: boolean;
  priceRange: 'budget' | 'mid-range' | 'premium';
  website?: string;
  phone?: string;
  email: string;
  images: string[];
  services: string[];
  languages: string[];
  responseTime: string; // e.g., "2 hours", "same day"
  availability: 'available' | 'busy' | 'unavailable';
  createdAt: string;
}

export interface VendorFilters {
  category?: VendorCategoryKey | null;
  location?: string;
  priceRange?: Vendor['priceRange'][];
  rating?: number;
  verified?: boolean;
  availability?: Vendor['availability'];
  coverageArea?: Vendor['coverageArea'];
}

export interface VendorSearchParams {
  query?: string;
  filters?: VendorFilters;
  sortBy?: 'rating' | 'reviews' | 'name' | 'location' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface VendorSearchResult {
  vendors: Vendor[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
