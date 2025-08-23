import { DrawingPinIcon, GridIcon, ListBulletIcon, MagnifyingGlassIcon, StarIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Header } from '../components';
import { SeoMeta } from '../components';
import { VendorCard } from '../components';
import { VENDOR_CATEGORIES } from '../config';
import { filterVendors, mockVendors, searchVendors, sortVendors } from '../test/data/mockVendors';
import type { VendorFilters } from '../types';

const pageMeta = {
  title: 'Category Vendors',
  description: 'Find specialized vendors in your category',
};

export default function VendorsByCategory() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'rating');

  // Filter state
  const [filters, setFilters] = useState<VendorFilters>({
    category: (category as keyof typeof VENDOR_CATEGORIES) || undefined,
    location: searchParams.get('location') || undefined,
    priceRange: searchParams.get('price')
      ? [searchParams.get('price') as 'budget' | 'mid-range' | 'premium']
      : undefined,
    rating: searchParams.get('rating') ? parseInt(searchParams.get('rating') || '0') : undefined,
    verified: searchParams.get('verified') === 'true' ? true : undefined,
  });

  // Get category info
  const categoryInfo = category ? VENDOR_CATEGORIES[category as keyof typeof VENDOR_CATEGORIES] : null;

  // Filter and search vendors
  const filteredVendors = useMemo(() => {
    let result = mockVendors;

    // Apply category filter from URL
    if (category) {
      result = result.filter(vendor => vendor.category === category);
    }

    // Apply other filters
    result = filterVendors(result, filters);

    // Apply search
    if (searchQuery) {
      result = searchVendors(result, searchQuery);
    }

    // Apply sorting
    result = sortVendors(result, sortBy);

    return result;
  }, [category, filters, searchQuery, sortBy]);

  // Update URL params when filters change
  const updateSearchParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handleFilterChange = (newFilters: Partial<VendorFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Update URL params
    updateSearchParams({
      location: updatedFilters.location,
      price: updatedFilters.priceRange?.[0],
      rating: updatedFilters.rating?.toString(),
      verified: updatedFilters.verified ? 'true' : undefined,
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateSearchParams({ q: query });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateSearchParams({ sort });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoMeta {...pageMeta} />
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/vendors')} className="hover:text-gray-900">
            {t('vendors.allVendors', 'Tutti i Fornitori')}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {categoryInfo && category ? t(`categories.${category}`, category) : category || 'All'}
          </span>
        </nav>

        {/* Category Header */}
        {categoryInfo && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {category ? t(`categories.${category}`, category) : t('vendors.allVendors', 'All Vendors')}
            </h1>
            <p className="text-lg text-gray-600">
              {category
                ? t(`categories.${category}-desc`, `Find the best ${category} for your event`)
                : t('vendors.subtitle', 'Discover verified vendors for your perfect event')}
            </p>
          </div>
        )}

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('vendors.searchPlaceholder', 'Cerca fornitori, servizi, località...')}
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">{t('vendors.filters', 'Filtri')}</h3>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('vendors.location', 'Località')}
                </label>
                <div className="relative">
                  <DrawingPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={t('vendors.locationPlaceholder', 'Città o regione')}
                    value={filters.location || ''}
                    onChange={e => handleFilterChange({ location: e.target.value || undefined })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('vendors.priceRange', 'Fascia di prezzo')}
                </label>
                <select
                  value={filters.priceRange?.[0] || ''}
                  onChange={e =>
                    handleFilterChange({ priceRange: [e.target.value as 'budget' | 'mid-range' | 'premium'] })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{t('vendors.allPrices', 'Tutti i prezzi')}</option>
                  <option value="budget">€ - Economico</option>
                  <option value="mid-range">€€ - Medio</option>
                  <option value="premium">€€€ - Premium</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('vendors.rating', 'Valutazione minima')}
                </label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={e => handleFilterChange({ rating: parseInt(e.target.value) })}
                        className="border-gray-300 text-primary focus:ring-primary"
                      />
                      <div className="ml-2 flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-700">{rating}+</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verified Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={e => handleFilterChange({ verified: e.target.checked })}
                    className="border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {t('vendors.verifiedOnly', 'Solo fornitori verificati')}
                  </span>
                </label>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setFilters({ category: category as keyof typeof VENDOR_CATEGORIES });
                  setSearchParams({});
                }}
                className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t('vendors.clearFilters', 'Cancella filtri')}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-600">
                  {t('vendors.resultsCount', '{{count}} fornitori trovati', { count: filteredVendors.length })}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="rating">{t('vendors.sortByRating', 'Valutazione')}</option>
                  <option value="name">{t('vendors.sortByName', 'Nome')}</option>
                  <option value="price">{t('vendors.sortByPrice', 'Prezzo')}</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <GridIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <ListBulletIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Vendors Grid/List */}
            {filteredVendors.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredVendors.map(vendor => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    onContactClick={v => console.log('Contact vendor:', v.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t('vendors.noResults', 'Nessun fornitore trovato')}</h3>
                <p className="text-gray-600">
                  {t('vendors.noResultsDesc', 'Prova a modificare i filtri o la ricerca')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
