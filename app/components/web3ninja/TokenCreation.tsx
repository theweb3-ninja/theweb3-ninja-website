import React from 'react';

const TokenCreation: React.FC = () => {
  return (
    <section id="token-creation" className="bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Token creations on <u>Solana</u> or <u>Ethereum</u></h2>
        <p className="mx-auto mt-3 max-w-3xl text-neutral-600 dark:text-neutral-300">
          <strong>Launch Your Token on Solana or Ethereum:</strong> Powering the Future of Decentralization!
          Creating a token is a powerful way to fuel your project, incentivize your community, and unlock new possibilities in the Web3 space.
        </p>
        <div className="mt-6">
          <a href="https://calendly.com/theweb3-ninja/30min" target="_blank" rel="noreferrer" className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600">Book Now</a>
        </div>
      </div>
    </section>
  );
};

export default TokenCreation;
