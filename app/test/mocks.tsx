// Import required libraries

// Mock Layout component
export const MockLayout: React.FC<{ language: string }> = ({ language }) => (
  <div data-testid="layout" data-language={language}>
    Layout with language: {language}
  </div>
);

// Mock the page components
export const MockIndexPage: React.FC = () => <div data-testid="index-page">Index Page</div>;
export const MockNotFoundPage: React.FC = () => <div data-testid="not-found-page">Not Found Page</div>;

// Mock outlet component for React Router
export const MockOutlet: React.FC = () => <div data-testid="outlet">Outlet Content</div>;
export const MockScrollRestoration: React.FC = () => <div data-testid="scroll-restoration">Scroll Restoration</div>;
