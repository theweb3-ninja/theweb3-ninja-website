import {
  ArrowLeftIcon,
  BadgeIcon,
  CameraIcon,
  ChatBubbleIcon,
  CheckCircledIcon,
  ClockIcon,
  DrawingPinIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
  ExternalLinkIcon,
  GlobeIcon,
  HeartIcon,
  LockClosedIcon,
  PersonIcon,
  Share2Icon,
  StarIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { SeoMetaOptions } from 'shared';
import { ClientOnlyLocalizedLink, SeoMeta } from '../components';
import { VENDOR_CATEGORIES } from '../config';
import { mockVendors } from '../test/data/mockVendors';
import { useFavorites, useRecentlyViewed } from '../stores/vendorStore';
import type { Vendor } from '../types/marketplace';

let pageMeta: Omit<SeoMetaOptions, 'hostname'> = {
  title: 'Vendor Profile',
  description: 'View vendor profile and details',
};

export default function VendorProfile() {
  const { t } = useTranslation();
  const { vendorSlug } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'reviews'>('overview');
  const [showContactForm, setShowContactForm] = useState(false);

  // Zustand stores
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Find vendor by ID
  const vendor = mockVendors.find(v => v.slug === vendorSlug) as Vendor;

  if (!vendor) {
    pageMeta = {
      title: 'Vendor Not Found',
      description: 'The vendor you are looking for could not be found.',
    };
  } else {
    pageMeta = {
      title: `${vendor.name} - ${vendor.category}`,
      description: vendor.description,
      image: vendor.images[0],
      keywords: `${vendor.category}, ${vendor.name}, ${vendor.location}, event vendor`,
    };
  }

  // Add to recently viewed when component mounts
  useEffect(() => {
    if (vendor) {
      addToRecentlyViewed(vendor);
    }
  }, [vendor, addToRecentlyViewed]);

  if (!vendor) {
    return (
      <>
        <SeoMeta {...pageMeta} />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('vendor.notFound', 'Fornitore non trovato')}</h1>
            <ClientOnlyLocalizedLink
              to={`/vendors/${(vendor as Vendor)?.category || ''}`}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
            >
              {t('vendor.backToCategory', 'Torna alla categoria')}
            </ClientOnlyLocalizedLink>
          </div>
        </div>
      </>
    );
  }

  const categoryInfo = VENDOR_CATEGORIES[vendor.category as keyof typeof VENDOR_CATEGORIES];

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

  const handleContactVendor = () => {
    setShowContactForm(true);
  };

  const handleRequestQuote = () => {
    // TODO: Implement quote request flow
    console.log('Request quote from:', vendor.name);
  };

  const mockReviews = [
    {
      id: '1',
      author: 'Marco R.',
      rating: 5,
      date: '2024-03-15',
      comment: 'Servizio eccellente, molto professionale e puntuale. Consigliato!',
      event: 'Matrimonio',
    },
    {
      id: '2',
      author: 'Laura S.',
      rating: 4,
      date: '2024-02-28',
      comment: 'Buona qualità del servizio, prezzi onesti. Torneremo sicuramente.',
      event: 'Evento Aziendale',
    },
    {
      id: '3',
      author: 'Giuseppe M.',
      rating: 5,
      date: '2024-01-20',
      comment: 'Fantastici! Hanno reso il nostro evento indimenticabile.',
      event: 'Compleanno',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <ClientOnlyLocalizedLink
              to="/vendors"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              {t('vendor.backToCatalog', 'Torna al catalogo')}
            </ClientOnlyLocalizedLink>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(vendor.id)}
                className={`p-2 rounded-lg border ${isFavorite(vendor.id) ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900'}`}
              >
                <HeartIcon className={`w-5 h-5 ${isFavorite(vendor.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg">
                <Share2Icon className="w-5 h-5" />
                {t('vendor.share', 'Condividi')}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <ExclamationTriangleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vendor Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-6">
                {/* Vendor Avatar */}
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="w-12 h-12 text-gray-400" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg text-gray-600">
                          {categoryInfo ? t(`categories.${vendor.category}`, vendor.category) : vendor.category}
                        </span>
                        {vendor.verified && (
                          <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            <LockClosedIcon className="w-4 h-4" />
                            {t('vendor.verified', 'Verificato')}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <DrawingPinIcon className="w-4 h-4" />
                          <span>{vendor.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>
                            {t('vendor.responseTime', 'Risponde in')}: {vendor.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-xl font-bold">{vendor.rating}</span>
                        <span className="text-gray-600">({vendor.reviewCount} recensioni)</span>
                      </div>
                      <div className="flex gap-2">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getPriceRangeColor(vendor.priceRange)}`}
                        >
                          {t(`vendor.priceRange.${vendor.priceRange}`, vendor.priceRange)}
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(vendor.availability)}`}
                        >
                          {t(`vendor.availability.${vendor.availability}`, vendor.availability)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{vendor.description}</p>

                  {/* Services */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">{t('vendor.services', 'Servizi Offerti')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          <CheckCircledIcon className="w-4 h-4" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">{t('vendor.languages', 'Lingue Parlate')}</h3>
                    <div className="flex gap-2">
                      {vendor.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          <GlobeIcon className="w-4 h-4" />
                          {lang.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <div className="space-y-4">
                  <button
                    onClick={handleRequestQuote}
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    {t('vendor.requestQuote', 'Richiedi Preventivo')}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={handleContactVendor}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ChatBubbleIcon className="w-5 h-5" />
                      {t('vendor.contact', 'Contatta')}
                    </button>

                    <button
                      onClick={() => toggleFavorite(vendor.id)}
                      className={`px-4 py-3 rounded-lg border transition-colors ${
                        isFavorite(vendor.id)
                          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                          : 'bg-white border-gray-300 text-gray-400 hover:text-red-600 hover:border-red-200'
                      }`}
                      title={isFavorite(vendor.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <HeartIcon className={`w-5 h-5 ${isFavorite(vendor.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-3">{t('vendor.contactInfo', 'Informazioni di Contatto')}</h4>
                    <div className="space-y-3 text-sm">
                      {vendor.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <ChatBubbleIcon className="w-4 h-4" />
                          <span>{vendor.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-600">
                        <EnvelopeClosedIcon className="w-4 h-4" />
                        <span>{vendor.email}</span>
                      </div>
                      {vendor.website && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <ExternalLinkIcon className="w-4 h-4" />
                          <a
                            href={vendor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary"
                          >
                            {t('vendor.website', 'Sito Web')}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coverage Area */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-2">{t('vendor.coverageArea', 'Area di Copertura')}</h4>
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                      {t(`vendor.coverageArea.${vendor.coverageArea}`, vendor.coverageArea)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: t('vendor.tabs.overview', 'Panoramica'), icon: BadgeIcon },
                { key: 'gallery', label: t('vendor.tabs.gallery', 'Galleria'), icon: CameraIcon },
                { key: 'reviews', label: t('vendor.tabs.reviews', 'Recensioni'), icon: StarIcon },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as 'overview' | 'gallery' | 'reviews')}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t('vendor.aboutUs', 'Chi Siamo')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {vendor.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">{t('vendor.whyChooseUs', 'Perché Sceglierci')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircledIcon className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Esperienza Pluriennale</h4>
                        <p className="text-sm text-gray-600">Oltre 10 anni nel settore eventi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircledIcon className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Servizio Personalizzato</h4>
                        <p className="text-sm text-gray-600">Ogni evento è unico per noi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircledIcon className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Qualità Garantita</h4>
                        <p className="text-sm text-gray-600">Standard elevati in ogni progetto</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircledIcon className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Supporto 24/7</h4>
                        <p className="text-sm text-gray-600">Assistenza completa durante l'evento</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">{t('vendor.gallery', 'Galleria Foto')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(index => (
                    <div
                      key={index}
                      className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center"
                    >
                      <div className="text-center text-gray-400">
                        <CameraIcon className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm">Foto {index}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">
                    {t('vendor.reviews', 'Recensioni')} ({mockReviews.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-gray-600">su 5</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {mockReviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{review.author}</h4>
                            <span className="text-sm text-gray-500">• {review.event}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                              <StarIcon
                                key={index}
                                className={`w-4 h-4 ${
                                  index < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {t('vendor.contactForm.title', 'Contatta')} {vendor.name}
              </h3>
              <button onClick={() => setShowContactForm(false)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('vendor.contactForm.name', 'Nome')}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder={t('vendor.contactForm.namePlaceholder', 'Il tuo nome')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('vendor.contactForm.email', 'Email')}
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder={t('vendor.contactForm.emailPlaceholder', 'La tua email')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('vendor.contactForm.message', 'Messaggio')}
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder={t('vendor.contactForm.messagePlaceholder', 'Descrivi il tuo evento...')}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  {t('vendor.contactForm.cancel', 'Annulla')}
                </button>
                <button type="submit" className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                  {t('vendor.contactForm.send', 'Invia')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
