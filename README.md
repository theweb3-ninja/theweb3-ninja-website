# Welcome to your The Web3 Ninja project

## Project info

**URL**: <https://theweb3.ninja/projects/8b760633-4914-4a17-b6b3-e08a15d2ca05>

## How can I edit this code?

There are several ways of editing your application.

### Use The Web3 Ninja

Simply visit the [The Web3 Ninja Project](https://theweb3.ninja/projects/8b760633-4914-4a17-b6b3-e08a15d2ca05) and start prompting.

Changes made via The Web3 Ninja will be committed automatically to this repo.

### Use your preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in The Web3 Ninja.

The only requirement is having Node.js & bun installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
bun i

# Step 4: Start the development server with auto-reloading and an instant preview.
bun run dev
```

### Edit a file directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [The Web3 Ninja](https://theweb3.ninja/projects/8b760633-4914-4a17-b6b3-e08a15d2ca05) and click on Share -> Publish.

## Can I connect a custom domain to my The Web3 Ninja project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.theweb3.ninja/tips-tricks/custom-domain#step-by-step-guide)

## SEO Hook Usage Examples

### How to use the `meta` function

The old `Seo` component has been transformed into React hooks that are compatible with React Router v7's `meta` export.

#### Advanced Usage with Custom Schema

```typescript
// app/routes/product.tsx
import { LoaderFunctionArgs } from 'react-router';

export function meta({ params }: LoaderFunctionArgs) {
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Example Product',
    description: 'Product description',
  };

  return (
    params,
    {
      title: 'Product Name - Your Store',
      description: 'Product description for SEO',
      image: 'https://example.com/product-image.jpg',
      schemaMarkup: productSchema,
    }
  );
}
```

#### SEO Hook Features

- ✅ Automatic i18n support with language detection
- ✅ Open Graph and Twitter Card meta tags
- ✅ Schema.org structured data
- ✅ Canonical URLs
- ✅ Theme color and language attributes
- ✅ Keywords support
- ✅ Custom schema markup support
- ✅ Fallback to localized defaults

#### Available Options

```typescript
interface SeoMetaOptions {
  title?: string; // Page title
  description?: string; // Meta description
  canonical?: string; // Canonical URL
  image?: string; // OG/Twitter image
  keywords?: string; // Meta keywords
  schemaMarkup?: Record<string, unknown>; // Custom JSON-LD
  language?: string; // Override language detection
}
```

## Internationalization (i18n) System

This project implements a comprehensive multilingual system supporting 10 languages with intelligent language detection and routing.

### Supported Languages

- **German (de)** - Deutsch
- **English (en)** - English (default)
- **Spanish (es)** - Español
- **French (fr)** - Français
- **Italian (it)** - Italiano
- **Dutch (nl)** - Nederlands
- **Polish (pl)** - Polski
- **Portuguese (pt)** - Português
- **Romanian (ro)** - Română
- **Swedish (sv)** - Svenska

### Language Detection Priority

The system uses a sophisticated 3-tier language detection system:

1. **Path Language (Highest Priority)**
   - Format: `/{language-code}/` (e.g., `/it/`, `/es/`)
   - Always takes precedence over domain or browser settings

2. **Browser Language Fallback**
   - Uses `Accept-Language` header or navigator language
   - Falls back to English if no match found

### Architecture Overview

#### Static Site Generation (SSG)

- Uses React Router v7's SSG capabilities
- Pre-renders all routes for all supported languages
- Generates language-specific HTML files (e.g., `/en.html`, `/it.html`)

#### Cloudflare Worker Routing

- Handles dynamic language detection and routing
- Serves appropriate pre-rendered HTML files
- Manages cache purging and security filtering
- Implements the same language detection logic as client-side

#### Client-Side Integration

- Uses `react-i18next` with synchronous initialization
- Respects language set by worker via HTML `lang` attribute
- Maintains single i18n instance to prevent hydration mismatches

### Key Implementation Files

- **Core Configuration**: `app/config/languages.ts`
- **Language Service**: `app/services/languageService.ts`
- **Worker Logic**: `worker/index.ts`
- **Layout Component**: `app/components/Layout.tsx`
- **Translation Files**: `app/i18n/translations/`

### Language Service Functions

#### Language Detection

```typescript
// Extract language from URL path
extractLanguageFromPath(pathname: string): string

// Get default language with caching
getDefaultLanguage(): string

// Extract from HTML lang attribute (preferred)
getDefaultLanguageFromHtmlTag(): string

// Validate language code
resolveLanguage(pathLang: string): string
```

#### Path Management

```typescript
// Get path for language switching
getNextLanguagePath(currentPath: string, languageCode: string): string
```

#### i18n Instance Management

```typescript
// Create/reuse i18n instance
createOrReturnI18nInstance(language: string, options?): i18n

// Update document language attributes
updateDocumentLanguageAttributes(language: string): void
```

### Testing Strategy

The i18n system includes comprehensive test coverage:

- Language detection from various sources
- Domain-specific behavior testing
- Path language priority validation
- HTML attribute processing
- Cache behavior verification
- i18n instance management

### Best Practices

1. **Always use centralized `supportedLanguages`** from `app/config/languages.ts`
2. **Respect HTML lang attribute** set by the worker script
3. **No client-side URL redirects** to prevent hydration mismatches
4. **Use synchronous i18n initialization** for SSR compatibility
5. **Test language switching** without full page reloads

### Development Commands

Language-related development is integrated into the standard workflow:

```bash
# Start development with language support
bun run dev

# Build with all language routes
bun run build

# Test language detection and routing
bun run test
```
