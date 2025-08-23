import React from 'react';

const DeFiShowcase: React.FC = () => {
  return (
    <section id="defi-showcase" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">DeFi</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            DeFi lending protocol that allows permissionless lending and borrowing of cryptocurrency.
            It eliminates intermediaries and enables users to interact directly with one another.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://ajna.finance"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-5 py-2 font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Visit Ajna
            </a>
            <a
              href="https://calendly.com/theweb3-ninja/30min"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-current px-5 py-2 font-semibold"
            >
              Book
            </a>
          </div>
        </div>
        <div>
          <img
            src="/assets/images/image03.jpg"
            alt="DeFi Dashboard"
            title="DeFi Dashboard"
            className="w-full rounded-lg shadow"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </section>
  );
};

export default DeFiShowcase;
