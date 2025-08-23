import { DrawingPinIcon, GridIcon, ListBulletIcon, MagnifyingGlassIcon, StarIcon } from '@radix-ui/react-icons';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { Header } from '../components';
import { SeoMeta } from '../components';
import { VendorCard } from '../components';
import { VENDOR_CATEGORIES } from '../config';
import { filterVendors, mockVendors, searchVendors, sortVendors } from '../test/data/mockVendors';
import type { Vendor, VendorFilters } from '../types/marketplace';

export default function VendorsIndex() {
  const { t } = useTranslation();

  const pageMeta = {
    title: 'Find Vendors',
    description: 'Browse verified event vendors and suppliers on Eveo',
  };

  const [searchParams, setSearchParams] = useSearchParams();

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'rating');

  // Filter state
  const [filters, setFilters] = useState<VendorFilters>({
    category: (searchParams.get('category') as VendorFilters['category']) || null,
    location: searchParams.get('location') || undefined,
    priceRange: (searchParams.getAll('priceRange') as Vendor['priceRange'][]) || [],
    rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
    verified: searchParams.get('verified') === 'true' ? true : undefined,
    availability: (searchParams.get('availability') as Vendor['availability']) || undefined,
    coverageArea: (searchParams.get('coverageArea') as Vendor['coverageArea']) || undefined,
  });

  // Process vendors with search, filter, and sort
  const processedVendors = useMemo(() => {
    let result = mockVendors;

    // Apply search
    if (searchQuery) {
      result = searchVendors(result, searchQuery);
    }

    // Apply filters
    result = filterVendors(result, filters);

    // Apply sorting
    result = sortVendors(result, sortBy, 'desc');

    return result;
  }, [searchQuery, filters, sortBy]);

  // Update URL params when filters change
  const updateSearchParams = (newFilters: Partial<VendorFilters>, query?: string) => {
    const params = new URLSearchParams();

    if (query) params.set('q', query);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.priceRange?.length) {
      newFilters.priceRange.forEach(range => params.append('priceRange', range));
    }
    if (newFilters.rating) params.set('rating', newFilters.rating.toString());
    if (newFilters.verified !== undefined) params.set('verified', newFilters.verified.toString());
    if (newFilters.availability) params.set('availability', newFilters.availability);
    if (newFilters.coverageArea) params.set('coverageArea', newFilters.coverageArea);
    if (sortBy !== 'rating') params.set('sort', sortBy);

    setSearchParams(params);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateSearchParams(filters, query);
  };

  const handleFilterChange = (newFilters: Partial<VendorFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    updateSearchParams(updatedFilters, searchQuery);
  };

  const clearFilters = () => {
    const clearedFilters: VendorFilters = {
      category: null,
      location: undefined,
      priceRange: [],
      rating: undefined,
      verified: undefined,
      availability: undefined,
      coverageArea: undefined,
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  const handleContactVendor = (vendor: Vendor) => {
    // TODO: Implement contact modal or redirect to contact form
    console.log('Contact vendor:', vendor.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SeoMeta {...pageMeta} />
      {/* Header */}
      <Header />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">{t('vendors.title', 'Trova i Migliori Fornitori')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('vendors.subtitle', 'Scopri fornitori verificati per il tuo evento perfetto')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('vendors.searchPlaceholder', 'Cerca fornitori, servizi, località...')}
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t('vendors.filters', 'Filtri')}</h3>
                <button onClick={clearFilters} className="text-sm text-primary hover:text-primary/80">
                  {t('vendors.clearFilters', 'Cancella')}
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('vendors.category', 'Categoria')}
                </label>
                <select
                  value={filters.category || ''}
                  onChange={e =>
                    handleFilterChange({
                      category: (e.target.value as VendorFilters['category']) || null,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">{t('vendors.allCategories', 'Tutte le categorie')}</option>
                  {Object.entries(VENDOR_CATEGORIES).map(([key]) => (
                    <option key={key} value={key}>
                      {t(`categories.${key}`, key)}
                    </option>
                  ))}
                </select>
              </div>

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
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('vendors.priceRange', 'Fascia di prezzo')}
                </label>
                <div className="space-y-2">
                  {(['budget', 'mid-range', 'premium'] as const).map(range => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.priceRange?.includes(range) || false}
                        onChange={e => {
                          const current = filters.priceRange || [];
                          const updated = e.target.checked ? [...current, range] : current.filter(r => r !== range);
                          handleFilterChange({ priceRange: updated });
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{t(`vendor.priceRange.${range}`, range)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('vendors.minRating', 'Valutazione minima')}
                </label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange({ rating })}
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
                    checked={filters.verified || false}
                    onChange={e =>
                      handleFilterChange({
                        verified: e.target.checked ? true : undefined,
                      })
                    }
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {t('vendors.verifiedOnly', 'Solo fornitori verificati')}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  {t('vendors.resultsCount', `${processedVendors.length} fornitori trovati`)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="rating">{t('vendors.sortByRating', 'Valutazione')}</option>
                  <option value="reviews">{t('vendors.sortByReviews', 'Recensioni')}</option>
                  <option value="name">{t('vendors.sortByName', 'Nome')}</option>
                  <option value="newest">{t('vendors.sortByNewest', 'Più recenti')}</option>
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

            {/* Results Grid */}
            {processedVendors.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {processedVendors.map(vendor => (
                  <VendorCard key={vendor.slug} vendor={vendor} onContactClick={handleContactVendor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t('vendors.noResults', 'Nessun fornitore trovato')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('vendors.noResultsDescription', 'Prova a modificare i filtri o la ricerca')}
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  {t('vendors.clearFilters', 'Cancella filtri')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
