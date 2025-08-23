import React from 'react';

const MetaverseShowcase: React.FC = () => {
  return (
    <section id="metaverse" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <img src="/assets/images/image02.png" alt="Metaverse media" title="Metaverse Avatar" className="w-full rounded-lg shadow" />
        </div>
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Metaverse</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            Build Your Immersive Future with <strong>The Web3 Ninja</strong>.
            The Metaverse is the next evolution of the internet.
          </p>
          <div className="mt-6">
            <a href="https://calendly.com/theweb3-ninja/30min" target="_blank" rel="noreferrer" className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600">Talk Now</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetaverseShowcase;
