import React from 'react';

const Web3Ready: React.FC = () => {
  return (
    <section id="web3-ready" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Web3 Ready</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            The future of the internet is decentralized, and being "Web3 Ready" is no longer a luxury—it's a necessity. True Web3 readiness means seamlessly integrating blockchain into a user-friendly experience.
          </p>
          <div className="mt-6">
            <a href="https://calendly.com/theweb3-ninja/30min" target="_blank" rel="noreferrer" className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600">Book Now</a>
          </div>
        </div>
        <div>
          <img src="/assets/images/image04.jpg" alt="Web3 Ready" title="Web3 Ready" className="w-full rounded-lg shadow" />
        </div>
      </div>
    </section>
  );
};

export default Web3Ready;
