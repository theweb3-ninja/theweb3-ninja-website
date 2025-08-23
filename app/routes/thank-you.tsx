import React from 'react';
import { SeoMeta } from '../components';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <SeoMeta />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Thank you</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">Double opt-in enabled. You will need to confirm this in your mailbox.</p>
        <div className="mt-6">
          <a href="#top" className="rounded-full border px-5 py-2 font-semibold">Go Up</a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
