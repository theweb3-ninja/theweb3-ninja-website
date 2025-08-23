import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { ConditionalStrictMode } from './components';

async function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <ConditionalStrictMode>
        <HydratedRouter />
      </ConditionalStrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
