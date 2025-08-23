import type { Vendor, VendorFilters } from '../../types/marketplace';

export const mockVendors: Vendor[] = [
  // Hotels & Accommodation
  {
    id: '1',
    name: 'Villa Romantica',
    slug: 'villa-romantica',
    category: 'hotels-venues',
    description: 'Elegante villa storica con giardini panoramici, perfetta per matrimoni e eventi esclusivi.',
    location: 'Firenze, Toscana',
    city: 'Firenze',
    region: 'Toscana',
    coverageArea: 'regional',
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    priceRange: 'premium',
    website: 'https://villaromantica.it',
    phone: '+39 055 123456',
    email: 'info@villaromantica.it',
    images: ['/images/vendors/villa-romantica-1.jpg'],
    services: ['Matrimoni', 'Eventi Aziendali', 'Conferenze'],
    languages: ['it', 'en', 'fr'],
    responseTime: '2 hours',
    availability: 'available',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Grand Hotel Milano',
    slug: 'grand-hotel-milano',
    category: 'hotels-venues',
    description: 'Hotel 5 stelle nel cuore di Milano con sale conferenze moderne e servizi di lusso.',
    location: 'Milano, Lombardia',
    city: 'Milano',
    region: 'Lombardia',
    coverageArea: 'local',
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    priceRange: 'premium',
    website: 'https://grandhotelmilano.it',
    phone: '+39 02 987654',
    email: 'events@grandhotelmilano.it',
    images: ['/images/vendors/grand-hotel-1.jpg'],
    services: ['Conferenze', 'Gala', 'Matrimoni'],
    languages: ['it', 'en', 'de'],
    responseTime: '1 hour',
    availability: 'available',
    createdAt: '2024-02-10T14:30:00Z',
  },

  // Catering
  {
    id: '3',
    name: 'Sapori di Sicilia',
    slug: 'sapori-di-sicilia',
    category: 'catering',
    description: 'Catering tradizionale siciliano con ingredienti freschi e ricette autentiche.',
    location: 'Palermo, Sicilia',
    city: 'Palermo',
    region: 'Sicilia',
    coverageArea: 'regional',
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    priceRange: 'mid-range',
    phone: '+39 091 555123',
    email: 'info@saporidisicilia.it',
    images: ['/images/vendors/sapori-sicilia-1.jpg'],
    services: ['Matrimoni', 'Eventi Privati', 'Buffet'],
    languages: ['it', 'en'],
    responseTime: '4 hours',
    availability: 'available',
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    id: '4',
    name: 'Elite Catering Roma',
    slug: 'elite-catering-roma',
    category: 'catering',
    description: 'Catering di alta gamma per eventi esclusivi nella capitale.',
    location: 'Roma, Lazio',
    city: 'Roma',
    region: 'Lazio',
    coverageArea: 'local',
    rating: 4.7,
    reviewCount: 203,
    verified: true,
    priceRange: 'premium',
    website: 'https://elitecateringroma.it',
    phone: '+39 06 777888',
    email: 'booking@elitecateringroma.it',
    images: ['/images/vendors/elite-catering-1.jpg'],
    services: ['Gala', 'Matrimoni VIP', 'Eventi Aziendali'],
    languages: ['it', 'en', 'fr', 'es'],
    responseTime: '2 hours',
    availability: 'busy',
    createdAt: '2024-03-05T16:45:00Z',
  },

  // DJ
  {
    id: '5',
    name: 'DJ Marco Beats',
    slug: 'dj-marco-beats',
    category: 'dj-services',
    description: 'DJ professionista specializzato in matrimoni e feste private con oltre 10 anni di esperienza.',
    location: 'Napoli, Campania',
    city: 'Napoli',
    region: 'Campania',
    coverageArea: 'national',
    rating: 4.5,
    reviewCount: 78,
    verified: true,
    priceRange: 'mid-range',
    phone: '+39 081 333444',
    email: 'marco@djmarcobeats.it',
    images: ['/images/vendors/dj-marco-1.jpg'],
    services: ['Matrimoni', 'Feste Private', 'Eventi Aziendali'],
    languages: ['it', 'en'],
    responseTime: '6 hours',
    availability: 'available',
    createdAt: '2024-02-28T11:20:00Z',
  },

  // Photo & Video
  {
    id: '6',
    name: 'Foto Memories Studio',
    slug: 'foto-memories-studio',
    category: 'photography-video',
    description: 'Studio fotografico specializzato in matrimoni e eventi con stile cinematografico.',
    location: 'Venezia, Veneto',
    city: 'Venezia',
    region: 'Veneto',
    coverageArea: 'regional',
    rating: 4.8,
    reviewCount: 94,
    verified: true,
    priceRange: 'premium',
    website: 'https://fotomemories.it',
    phone: '+39 041 666777',
    email: 'info@fotomemories.it',
    images: ['/images/vendors/foto-memories-1.jpg'],
    services: ['Matrimoni', 'Video Drone', 'Servizi Fotografici'],
    languages: ['it', 'en', 'de'],
    responseTime: '3 hours',
    availability: 'available',
    createdAt: '2024-01-08T13:10:00Z',
  },

  // Transportation
  {
    id: '7',
    name: 'Luxury Transfer Service',
    slug: 'luxury-transfer-service',
    category: 'transportation',
    description: "Servizio di trasporto di lusso con auto d'epoca e moderne per eventi speciali.",
    location: 'Torino, Piemonte',
    city: 'Torino',
    region: 'Piemonte',
    coverageArea: 'regional',
    rating: 4.4,
    reviewCount: 62,
    verified: false,
    priceRange: 'premium',
    phone: '+39 011 888999',
    email: 'booking@luxurytransfer.it',
    images: ['/images/vendors/luxury-transfer-1.jpg'],
    services: ['Matrimoni', 'Transfer Aeroporto', 'Tour Privati'],
    languages: ['it', 'en', 'fr'],
    responseTime: '1 hour',
    availability: 'available',
    createdAt: '2024-03-12T08:30:00Z',
  },

  // Marketing & Design
  {
    id: '8',
    name: 'Creative Events Agency',
    slug: 'creative-events-agency',
    category: 'marketing-design',
    description: 'Agenzia creativa specializzata in branding e comunicazione per eventi corporate.',
    location: 'Bologna, Emilia-Romagna',
    city: 'Bologna',
    region: 'Emilia-Romagna',
    coverageArea: 'national',
    rating: 4.6,
    reviewCount: 45,
    verified: true,
    priceRange: 'mid-range',
    website: 'https://creativeevents.it',
    phone: '+39 051 111222',
    email: 'hello@creativeevents.it',
    images: ['/images/vendors/creative-events-1.jpg'],
    services: ['Branding Eventi', 'Grafica', 'Social Media'],
    languages: ['it', 'en'],
    responseTime: '4 hours',
    availability: 'available',
    createdAt: '2024-02-18T15:45:00Z',
  },
];

// Helper functions for filtering and searching
export const filterVendors = (vendors: Vendor[], filters: Partial<VendorFilters> = {}) => {
  return vendors.filter(vendor => {
    if (filters.category && vendor.category !== filters.category) return false;
    if (filters.location && !vendor.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.priceRange && filters.priceRange.length > 0 && !filters.priceRange.includes(vendor.priceRange))
      return false;
    if (filters.rating && vendor.rating < filters.rating) return false;
    if (filters.verified !== undefined && vendor.verified !== filters.verified) return false;
    if (filters.availability && vendor.availability !== filters.availability) return false;
    if (filters.coverageArea && vendor.coverageArea !== filters.coverageArea) return false;
    return true;
  });
};

export const searchVendors = (vendors: Vendor[], query: string) => {
  if (!query) return vendors;

  const searchTerm = query.toLowerCase();
  return vendors.filter(
    vendor =>
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.description.toLowerCase().includes(searchTerm) ||
      vendor.location.toLowerCase().includes(searchTerm) ||
      vendor.services.some(service => service.toLowerCase().includes(searchTerm))
  );
};

export const sortVendors = (vendors: Vendor[], sortBy: string = 'rating', sortOrder: 'asc' | 'desc' = 'desc') => {
  return [...vendors].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'reviews':
        comparison = a.reviewCount - b.reviewCount;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'location':
        comparison = a.location.localeCompare(b.location);
        break;
      case 'newest':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });
};
