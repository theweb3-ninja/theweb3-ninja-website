# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Eveo is an Italian B2B2C marketplace connecting event organizers with verified service providers. The platform facilitates event planning through smart matching, quote management, and streamlined booking processes. The project combines a multilingual landing page with a comprehensive vendor marketplace system.

## Development Commands

### Basic Development

- **Start development server**: `bun run dev` (uses React Router v7)
- **Build for production**: `bun run build` (builds static site + updates security.txt)
- **Start production server**: `bun run start` (serves the built application)
- **Preview production build**: `bun run preview`

### Code Quality

- **Lint code**: `bun run lint`
- **Type checking**: `bun run typecheck`
- **Format code**: `bun run format`
- **Check formatting**: `bun run check-format`

### Testing

- **Run all tests**: `bun run test`
- **Run tests in watch mode**: `bun run test:watch`
- **Run tests with coverage**: `bun run test:coverage`
- **Run a single test file**: `npx vitest run app/__tests__/routes.test.tsx`

### Cloudflare Workers Deployment

- **Local development**: `bun run cf-dev`
- **Generate types**: `bun run cf-typegen`
- **Build worker**: `bun run cf-build`
- **Deploy to production**: `bun run cf-deploy:prod`
- **Deploy to preview**: `bun run cf-deploy:preview`
- **Deploy (no env)**: `bun run cf-deploy`

### Cloudflare Secrets Management

- **Set dev secrets**: `bun run cf-secret:set`
- **Set production secrets**: `bun run cf-secret:set:prod`
- **Set preview secrets**: `bun run cf-secret:set:preview`
- **Delete dev secrets**: `bun run cf-secret:delete`
- **Delete production secrets**: `bun run cf-secret:delete:prod`
- **Delete preview secrets**: `bun run cf-secret:delete:preview`

### Database Commands (Future Extension)

```bash
# Database migrations
bun run db:generate     # Generate migration files
bun run db:migrate:prod # Apply to production
bun run db:migrate:dev  # Apply to local/preview
bun run db:seed         # Seed with sample data

# New development commands
bun run dev:db          # Start with local D1
bun run test:db         # Run database tests
```

## Architecture Overview

This is a **multilingual React marketplace application** built with **React Router v7** (with SSG capabilities) and deployed on **Cloudflare Workers**. The architecture combines static generation with dynamic worker-based routing for optimal performance and SEO.

### Tech Stack

- **Framework**: React 19 with React Router v7 (SSR enabled)
- **Styling**: Tailwind CSS v4 with custom UI component library
- **Internationalization**: i18next with 10 language support
- **State Management**: Zustand with persistence middleware
- **Deployment**: Cloudflare Workers/Pages
- **Build Tool**: Vite
- **Type Safety**: TypeScript
- **Testing**: Vitest with React Testing Library
- **UI Components**: Radix UI with shadcn/ui styling

### Key Architecture Components

1. **Static Site Generation (SSG)**
   - Uses React Router v7's SSG capabilities to pre-render pages for all supported languages
   - Routes are defined in `app/routes.ts` and individual route files in `app/routes/`
   - Each language gets its own set of pre-rendered HTML files (e.g., `/en.html`, `/it.html`)

2. **Cloudflare Worker (`worker/index.ts`)**
   - Handles dynamic routing and language detection
   - Serves pre-rendered SSG files when available
   - Provides language-based routing logic:
     - Path language code takes highest priority (e.g., `/it/privacy-policy`)
     - Domain-based language detection for `eveo.it` → Italian, `eveo.es` → Spanish
     - Fallback to English for global domain
   - Handles endpoints API and cache purging

3. **Internationalization (i18n)**
   - Uses `react-i18next` for translations
   - Supports 10 languages: en, es, it, de, fr, nl, pl, pt, ro, sv
   - Language configurations in `app/config/languages.ts`
   - Translation files in `app/i18n/` (JSON format)

4. **Component Structure**
   - Route components in `app/routes/` (index, privacy-policy, vendor pages, etc.)
   - UI components in `app/components/ui/` (shadcn/ui components)
   - Main sections: Hero, Features, HowItWorks, Stats, Testimonials, FAQ, FinalCTA
   - Vendor system: VendorCard, CategoryGrid, SearchFilters
   - Theme system: ThemeProvider, ThemeToggle with light/dark/system modes

5. **State Management**
   - **Theme Store**: Zustand store with localStorage persistence for theme preferences
   - **Vendor Store**: Recently viewed vendors, favorites, and saved filters
   - All stores use zustand/persist middleware for data persistence

### Project Structure

The application follows a feature-based organization with clear separation of concerns:

```text
app/
├── components/          # Reusable React components
│   ├── ui/             # Base UI components (Button, Card, Dialog, etc.)
│   ├── sections/       # Landing page sections (Hero, Features, CategoryGrid)
│   ├── vendor/         # Vendor-specific components (VendorCard)
│   ├── forms/          # Form components
│   └── providers/      # Context providers (ThemeProvider)
├── config/             # Configuration modules
│   ├── languages.ts    # Language configurations and mappings
│   ├── links.ts        # External and internal link configurations
│   ├── seo-metadata.ts # SEO metadata for different languages
│   └── categories.ts   # Vendor categories configuration
├── hooks/              # Custom React hooks (use-seo.tsx)
├── i18n/               # Internationalization setup (JSON format)
├── routes/             # Page components (React Router v7 file-based routing)
│   ├── _index.tsx      # Homepage with CategoryGrid
│   ├── vendors/        # Vendor marketplace routes
│   ├── privacy-policy.tsx # Legal pages
│   └── vendor.$vendorSlug.tsx # Dynamic vendor profiles
├── services/           # Business logic and API integrations
│   └── languageService.ts # Language detection and i18n management
├── stores/             # Zustand state stores
│   ├── themeStore.ts   # Theme management with persistence
│   └── vendorStore.ts  # Vendor favorites and recently viewed
├── types/              # TypeScript type definitions
└── data/               # Mock data and configurations
    └── mockVendors.ts  # Vendor sample data
```

### Language Routing Strategy

The app uses a sophisticated language routing system:

1. **URL Structure**: `/{language-code}/route` (e.g., `/it/privacy-policy`)
2. **Language Detection Priority**:
   - Path language code (highest priority)
   - Domain-specific language (eveo.it → Italian, eveo.es → Spanish)
   - Browser language detection
   - Fallback to English

3. **SSG Pre-rendering**: All routes are pre-rendered for each language during build

### SEO System

The application uses a modern SEO hook system for React Router v7:

- **Meta Generation**: Automatic generation of Open Graph, Twitter Cards, structured data
- **Language-aware**: SEO metadata adapts to current language

### Configuration Files

- **React Router config**: `react-router.config.ts` - Framework configuration
- **Vite config**: `vite.config.ts` - Build configuration, language routing, image optimization
- **Wrangler config**: `wrangler.toml` - Cloudflare Workers deployment settings
- **Languages**: `app/config/languages.ts` - Language definitions and i18n settings
- **Links**: `app/config/links.ts` - External links and navigation
- **SEO**: `app/config/seo-metadata.ts` - Meta tags and SEO configuration
- **Categories**: `app/config/categories.ts` - Vendor categories with icons and colors

### Vendor Marketplace Features

The application includes a comprehensive vendor marketplace system:

1. **Vendor Catalog**
   - Advanced filtering by category, location, price range, rating
   - Search functionality across vendor names and descriptions
   - Grid and list view modes
   - Sorting options (rating, reviews, name, newest, price)

2. **Vendor Profiles**
   - Dynamic vendor pages with SEO optimization
   - Contact forms and quote request functionality
   - Image galleries and service descriptions
   - Rating and review display
   - Favorite/unfavorite functionality

3. **Category System**
   - 12 vendor categories with custom icons and colors
   - Category-specific landing pages
   - Homepage category grid for easy navigation

4. **State Management**
   - Recently viewed vendors tracking
   - Favorite vendors with persistence
   - Saved search filters for power users

### Testing Setup

- **Framework**: Vitest with jsdom environment
- **Test utilities**: `app/test-utils.tsx` provides custom render with i18n support
- **Mock services**: `app/test/mockServices.ts` for service mocking
- **Setup files**: `app/test/setupTests.ts` and `app/setupTests.ts` for global test configuration

### Development Patterns

- **Styling**: Tailwind CSS with custom component variants
- **State management**: Zustand stores for client state, React Query for server state
- **Form handling**: React Hook Form with Zod validation
- **UI library**: Radix UI components via shadcn/ui
- **Theme system**: Light/dark/system themes with SSR support

## Critical Implementation Details

### Language Routing

- Languages are determined by URL path segment (e.g., `/en/contact`)
- Domain-based defaults: eveo.it → Italian, eveo.es → Spanish
- Browser language detection as fallback
- All content must be translated in `app/i18n/`
- Language service includes caching to optimize performance

### SEO Considerations

- Meta tags are dynamically generated based on route and language
- Structured data is included for rich snippets
- Each language has specific SEO metadata

### Form Handling

- Contact forms use React Hook Form with Zod validation
- Submissions are processed through Cloudflare Workers
- Email notifications are sent via worker integration

### Theme System

- **ThemeProvider**: Client-side theme management with SSR support
- **ThemeScript**: Prevents FOUC by setting theme before hydration
- **ThemeToggle**: Button and dropdown variants for theme switching
- **Persistence**: Theme preferences saved in localStorage

### Performance Optimizations

- Images are optimized during build with vite-plugin-image-optimizer
- Assets are cached with appropriate headers
- Critical CSS is inlined for faster initial render
- Language detection is cached to prevent excessive recalculation
- i18n instances are reused to prevent memory leaks

### Security

- Built-in protection against suspicious URLs in worker
- Bot detection and blocking
- Form submissions are rate-limited
- No sensitive data should be committed to the repository

## Future Extensions (Planned)

### Database Integration (Cloudflare D1)

- User authentication and management
- Vendor registration and profiles
- Event creation and management
- Quote request system
- Review and rating system

### Additional Features

- Payment integration (Stripe) for vendor subscriptions
- File upload system (Cloudflare R2)
- Real-time chat (Durable Objects)
- Advanced analytics and reporting
- AI-powered quote assistance

## Development Workflow

1. **Adding New Features**: Create components in appropriate directories, ensure i18n support
2. **Adding Languages**: Add translation files in `app/i18n/`, update `app/config/languages.ts`
3. **Testing**: Write tests alongside components, run full test suite before commits
4. **Themes**: Ensure new components support light/dark themes
5. **State**: Use Zustand stores for persistent client state
6. **Deployment**: Use preview deployments for testing, production deployments require explicit commands

## Important Notes

- The project uses both static generation AND dynamic worker routing
- Always test language switching and routing when making changes
- SSG files are served directly when available, falling back to dynamic routing
- The worker handles security filtering and suspicious URL blocking
- Cache purging is automatic on deployment and available via API endpoint
- All new components must support the theme system
- Vendor features should integrate with the existing state management system
- Translation files use JSON format (not TypeScript) for better tooling support

## Migration Status

The project has successfully completed Phase 4 of the migration plan:

✅ **Phase 1**: Dependencies & Configuration (React Router v7, Vite config)
✅ **Phase 2**: Structure Migration (/app directory, import paths)
✅ **Phase 3**: Translation System (JSON format, missing translations added)
✅ **Phase 4**: Component & Feature Migration (Theme system, vendor marketplace, state management)

Current status: **Production-ready marketplace application with comprehensive vendor system**

## Feature Implementation Priorities

### Phase 1 - MVP (Extend Current Landing Page)

#### 1. Authentication System

**New Routes to Add:**

- `app/routes/auth/login.tsx`
- `app/routes/auth/register.tsx`
- `app/routes/auth/register/vendor.tsx`

**Components to Create:**

```typescript
// app/components/auth/LoginForm.tsx
// app/components/auth/RegisterClientForm.tsx
// app/components/auth/RegisterVendorForm.tsx (2-step process)
// app/components/auth/ProtectedRoute.tsx
```

#### 2. Homepage Enhancement (Modify Existing)

**Update `app/routes/_index.tsx`:**

- Add category dropdown to existing header
- Replace hero CTA with "Esplora i fornitori"
- Add CategoryGrid component below hero (✅ COMPLETED)
- Add VendorCatalog section with filters

**New Components:**

```typescript
// app/components/sections/CategoryGrid.tsx (✅ COMPLETED)
// app/components/sections/VendorCatalog.tsx
// app/components/vendor/VendorCard.tsx (✅ COMPLETED)
// app/components/vendor/SearchFilters.tsx
```

#### 3. Vendor Management

**New Routes:**

- `app/routes/vendors/_index.tsx` (catalog)
- `app/routes/vendors/$vendorId.tsx` (profile) (✅ COMPLETED)
- `app/routes/dashboard/vendor.tsx`

#### 4. Event Creation

**New Routes:**

- `app/routes/events/create.tsx`
- `app/routes/dashboard/client.tsx`

### Phase 2 - Enhanced Features

#### 1. Review System

**Database Tables:**

```sql
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  client_id TEXT REFERENCES users(id),
  vendor_id TEXT REFERENCES vendors(id),
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  vendor_response TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Quote Management Dashboard

**New Routes:**

- `app/routes/dashboard/quotes.tsx`
- `app/routes/quotes/$quoteId.tsx`

#### 3. File Upload (R2 Integration)

**Create `app/lib/storage.ts`:**

```typescript
export async function uploadFile(file: File, key: string, env: Env): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  await env.EVEO_BUCKET.put(key, file.stream());
  return `https://eveo-files.domain.com/${key}`;
}
```

### Phase 3 - Advanced Features

#### 1. AI Quote Assistant

**New Dependencies:**

```bash
bun install @ai-sdk/anthropic ai
```

#### 2. Payment Integration

**New Dependencies:**

```bash
bun install stripe @stripe/stripe-js
```

## Database Schema (D1 Integration)

### Database Setup Commands

```bash
# Create D1 database
npx wrangler d1 create eveo-production
npx wrangler d1 create eveo-preview

# Apply migrations
npx wrangler d1 migrations apply eveo-production
npx wrangler d1 migrations apply eveo-preview --local
```

### Core Tables

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  user_type TEXT CHECK(user_type IN ('client', 'vendor')) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  language TEXT DEFAULT 'it',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vendors table
CREATE TABLE vendors (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  company_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  coverage_area TEXT NOT NULL,
  website TEXT,
  subscription_type TEXT CHECK(subscription_type IN ('monthly', 'annual')),
  subscription_status TEXT CHECK(subscription_status IN ('active', 'trial', 'expired')),
  trial_end_date DATETIME,
  verified BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  client_id TEXT REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT NOT NULL,
  guest_count INTEGER,
  budget_total DECIMAL,
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Quote requests table
CREATE TABLE quote_requests (
  id TEXT PRIMARY KEY,
  client_id TEXT REFERENCES users(id),
  vendor_id TEXT REFERENCES vendors(id),
  event_id TEXT REFERENCES events(id),
  message TEXT NOT NULL,
  budget_range TEXT,
  status TEXT DEFAULT 'sent',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Layer Integration

### Extend Worker Configuration

**Update `worker-configuration.ts`:**

```typescript
export interface Env {
  // Existing environment variables
  EVEO_DB: D1Database;
  EVEO_KV: KVNamespace;
  EVEO_BUCKET: R2Bucket;
  JWT_SECRET: string;
  STRIPE_SECRET_KEY: string;
  EMAIL_API_KEY: string;
}
```

### API Services

**Create `app/services/api/` directory:**

```typescript
// app/services/api/auth.ts
export async function login(email: string, password: string) {
  // Implementation
}

// app/services/api/vendors.ts
export async function getVendors(filters?: VendorFilters) {
  // Implementation
}

// app/services/api/events.ts
export async function createEvent(eventData: EventData) {
  // Implementation
}
```

## Form Validation (Zod Schemas)

### Create `app/lib/validation.ts`

```typescript
import { z } from 'zod';

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  userType: z.enum(['client', 'vendor']),
});

export const vendorRegistrationSchema = z.object({
  companyName: z.string().min(2),
  category: z.string(),
  description: z.string().optional(),
  coverageArea: z.string(),
  subscriptionType: z.enum(['monthly', 'annual']),
});

export const eventCreationSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  eventDate: z.date(),
  location: z.string().min(3),
  guestCount: z.number().positive(),
  selectedCategories: z.array(z.string()),
});
```

## Security Implementation

### Authentication Middleware

**Create `app/lib/auth.ts`:**

```typescript
import jwt from 'jsonwebtoken';

export async function verifyToken(request: Request, env: Env) {
  const token = getCookie(request, 'auth-token');
  if (!token) return null;

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    return payload as { userId: string; userType: string };
  } catch {
    return null;
  }
}

export async function requireAuth(request: Request, env: Env) {
  const user = await verifyToken(request, env);
  if (!user) {
    throw redirect('/auth/login');
  }
  return user;
}
```

## Business Logic Rules

### Vendor Registration Flow

1. Step 1: Basic info (name, email, category)
2. Step 2: Category-specific details + coverage area
3. Payment processing (€69.99/month or €699.99/year)
4. 3-month trial with payment method required
5. Email verification and manual approval

### Quote Request Logic

- **Venues**: Filter by exact geographic location
- **Services**: Filter by coverage area (regional or national)
- **Email Templates**: Personalized by vendor category and language
- **Required Fields**: Client email, phone, event details
- **Optional Fields**: Budget range (to be added in Phase 2)

## Extended Tech Stack for Marketplace Features

### Cloudflare Infrastructure (To Be Added)

- **Database**: Cloudflare D1 (SQLite at edge)
- **Key-Value Store**: Cloudflare KV (sessions, config, cache)
- **File Storage**: Cloudflare R2 (documents, media, proposals)
- **Real-time**: Durable Objects (chat, live quotes, availability)
- **Auth**: JWT tokens with KV storage

### Additional Dependencies to Install

```bash
bun install zod @hookform/resolvers react-hook-form
bun install @radix-ui/react-icons @radix-ui/react-dialog @radix-ui/react-dropdown-menu
bun install @radix-ui/react-select @radix-ui/react-tabs
bun install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
```

## Extending Current Architecture

### Directory Structure (Building on Existing)

```plain
app/
├── components/           # (Existing) Reusable React components
│   ├── ui/              # (Existing) Base UI components
│   ├── sections/        # (Existing) Landing page sections
│   ├── forms/           # NEW: Form components for marketplace
│   ├── vendor/          # NEW: Vendor-specific components
│   ├── events/          # NEW: Event management components
│   └── auth/            # NEW: Authentication components
├── config/              # (Existing) Configuration modules
│   ├── languages.ts     # (Existing) Language configurations
│   ├── links.ts         # (Existing) Link configurations
│   ├── seo-metadata.ts  # (Existing) SEO metadata
│   └── categories.ts    # NEW: Vendor categories config
├── i18n/                # (Existing) Internationalization
│   └── translations/    # (Existing) JSON files per language
├── routes/              # (Existing) Page components
│   ├── _index.tsx       # (Existing) Homepage
│   ├── auth/            # NEW: Authentication routes
│   ├── vendors/         # NEW: Vendor management routes
│   ├── events/          # NEW: Event creation routes
│   └── dashboard/       # NEW: User dashboard routes
├── services/            # (Existing) Business logic
│   ├── api/             # NEW: API service layer
│   ├── auth.ts          # NEW: Authentication services
│   └── email.ts         # NEW: Email notification services
├── lib/                 # NEW: Utility libraries
│   ├── db.ts            # NEW: D1 database utilities
│   ├── storage.ts       # NEW: R2 storage utilities
│   └── validation.ts    # NEW: Zod schemas
└── types/               # (Existing) TypeScript definitions
    ├── auth.ts          # NEW: Authentication types
    ├── vendor.ts        # NEW: Vendor types
    └── event.ts         # NEW: Event types
```

## Vendor Categories Configuration

### Add to `app/config/categories.ts`

```typescript
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
```

## Internationalization Extensions

### Add Marketplace Translations

**Extend existing `app/i18n/translations/` files:**

```json
// app/i18n/translations/it.json (add to existing)
{
  "vendor": {
    "categories": {
      "hotel-strutture": "Hotel e Strutture Ricettive",
      "catering": "Catering",
      "dj": "DJ"
    },
    "subscription": {
      "monthly": "Mensile - €69.99/mese",
      "annual": "Annuale - €699.99/anno",
      "trial": "Prova gratuita 3 mesi"
    }
  },
  "auth": {
    "login": "Accedi",
    "register": "Registrati",
    "userType": {
      "client": "Cliente",
      "vendor": "Fornitore"
    }
  }
}
```

## Email Integration

### Extend Existing Email Service

**Update `app/services/email.ts`:**

```typescript
// Add to existing email service
export async function sendQuoteRequest(
  vendorEmail: string,
  clientInfo: ClientInfo,
  eventDetails: EventDetails,
  env: Env
) {
  const template = getEmailTemplate('quote-request', clientInfo.language);
  // Implementation
}

export async function sendWelcomeEmail(userEmail: string, userType: 'client' | 'vendor', language: string, env: Env) {
  const template = getEmailTemplate(`welcome-${userType}`, language);
  // Implementation
}
```

## Development Commands (Extend Existing)

### Database Commands

```bash
# Database migrations
bun run db:generate     # Generate migration files
bun run db:migrate:prod # Apply to production
bun run db:migrate:dev  # Apply to local/preview
bun run db:seed         # Seed with sample data

# New development commands
bun run dev:db          # Start with local D1
bun run test:db         # Run database tests
```

### New bun Scripts to Add

```json
{
  "scripts": {
    "db:generate": "wrangler d1 migrations create",
    "db:migrate:prod": "wrangler d1 migrations apply eveo-production",
    "db:migrate:dev": "wrangler d1 migrations apply eveo-preview --local",
    "db:console": "wrangler d1 execute eveo-preview --local --command",
    "vendor:seed": "tsx scripts/seed-vendors.ts"
  }
}
```

## Testing Strategy (Extend Existing)

### Additional Test Files

```typescript
// app/__tests__/auth.test.tsx
// app/__tests__/vendor-registration.test.tsx
// app/__tests__/event-creation.test.tsx
// app/__tests__/api/vendors.test.ts
```

### Integration Tests

```bash
# Test database operations
bun run test:integration

# Test email functionality
bun run test:email

# Test payment flows
bun run test:payments
```

## Performance Optimizations (Marketplace Extension)

### Caching Strategy (Extend Existing)

```typescript
// Add to existing caching
const CACHE_KEYS = {
  VENDORS_BY_CATEGORY: 'vendors:category:',
  VENDOR_PROFILE: 'vendor:profile:',
  EVENT_TEMPLATES: 'events:templates',
};

// Cache vendor listings for 30 minutes
// Cache individual profiles for 1 hour
// Cache category metadata for 24 hours
```

### Image Optimization

**Extend existing `vite.config.ts`:**

```typescript
// Add R2 integration for vendor images
// Optimize uploaded files automatically
// Generate responsive image variants
```

## Deployment Strategy

### Environment Variables

**Add to `.prod.vars` and `.preview.vars`:**

```env
EVEO_DB_ID=your-d1-database-id
EVEO_KV_ID=your-kv-namespace-id
EVEO_BUCKET_NAME=your-r2-bucket-name
JWT_SECRET=your-jwt-secret
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
EMAIL_API_KEY=your-email-api-key
```

### Deployment Commands (Extend Existing)

```bash
# Deploy with database
bun run deploy:full     # Deploy app + run migrations

# Deploy specific features
bun run deploy:vendor   # Deploy vendor features only
bun run deploy:payments # Deploy payment features only
```

## Key Integration Points

### With Existing Codebase

1. **Extend existing header** with vendor category dropdown
2. **Enhance hero section** with marketplace-specific CTA
3. **Reuse existing UI components** (Button, Card, Dialog, etc.)
4. **Extend i18n system** with marketplace translations
5. **Build on existing Cloudflare Workers** setup
6. **Leverage existing form handling** patterns

### With External Services

1. **Payment Processing**: Stripe integration for subscriptions
2. **Email Service**: Extend existing email service for notifications
3. **File Storage**: R2 for vendor documents and proposals
4. **Analytics**: Extend existing tracking for marketplace events

## Notes for AI Assistant

- **Preserve existing architecture**: Build on the solid foundation already established
- **Maintain code quality**: Follow existing patterns for components, forms, and services
- **Respect i18n setup**: All new features must support multiple languages
- **Extend, don't replace**: Enhance existing components rather than rebuilding
- **Test thoroughly**: Write tests for all new marketplace functionality
- **Mobile-first**: Ensure all new UI components work well on mobile devices
- **SEO-conscious**: Maintain existing SEO patterns for new pages
- **Performance-aware**: Leverage existing caching and optimization strategies
