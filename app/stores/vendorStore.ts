import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Vendor, VendorFilters } from '../types/marketplace';

interface VendorState {
  // Recently viewed vendors
  recentlyViewed: Vendor[];
  addToRecentlyViewed: (vendor: Vendor) => void;
  clearRecentlyViewed: () => void;

  // Saved filters for quick access
  savedFilters: VendorFilters[];
  saveFilter: (filter: VendorFilters, name: string) => void;
  removeSavedFilter: (index: number) => void;

  // Favorites
  favorites: string[]; // vendor IDs
  toggleFavorite: (vendorId: string) => void;
  isFavorite: (vendorId: string) => boolean;
}

export const useVendorStore = create<VendorState>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      savedFilters: [],
      favorites: [],

      addToRecentlyViewed: (vendor: Vendor) => {
        set(state => {
          const filtered = state.recentlyViewed.filter(v => v.id !== vendor.id);
          return {
            recentlyViewed: [vendor, ...filtered].slice(0, 10), // Keep last 10
          };
        });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },

      saveFilter: (filter: VendorFilters, name: string) => {
        set(state => ({
          savedFilters: [...state.savedFilters, { ...filter, name }].slice(0, 5), // Keep last 5
        }));
      },

      removeSavedFilter: (index: number) => {
        set(state => ({
          savedFilters: state.savedFilters.filter((_, i) => i !== index),
        }));
      },

      toggleFavorite: (vendorId: string) => {
        set(state => ({
          favorites: state.favorites.includes(vendorId)
            ? state.favorites.filter(id => id !== vendorId)
            : [...state.favorites, vendorId],
        }));
      },

      isFavorite: (vendorId: string) => {
        return get().favorites.includes(vendorId);
      },
    }),
    {
      name: 'eveo-vendor-storage',
      partialize: state => ({
        recentlyViewed: state.recentlyViewed,
        savedFilters: state.savedFilters,
        favorites: state.favorites,
      }),
    }
  )
);

// Convenience hooks
export const useRecentlyViewed = () => {
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useVendorStore();
  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
};

export const useFavorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useVendorStore();
  return { favorites, toggleFavorite, isFavorite };
};

export const useSavedFilters = () => {
  const { savedFilters, saveFilter, removeSavedFilter } = useVendorStore();
  return { savedFilters, saveFilter, removeSavedFilter };
};
