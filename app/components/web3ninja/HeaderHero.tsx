import React from 'react';
 
const HeaderHero: React.FC = () => {
  return (
    <section id="home-section" className="relative bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-col items-center gap-6">
          <a href="https://theweb3.ninja" className="select-none" onContextMenu={(e) => e.preventDefault()} draggable={false}>
            <img
              src="/assets/images/image05.png"
              alt="Logo The Web3 Ninja"
              title="Logo The Web3 Ninja"
              className="h-20 w-auto sm:h-24"
            />
          </a>

          <ul className="flex items-center gap-3">
            <li>
              <a
                href="https://theweb3.ninja/blog"
                className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <span>Our Blog</span>
              </a>
            </li>
          </ul>

          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              The Web3 <u>Ninja</u> | Blockchain's Partner
            </h1>
            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
              Your one-stop for your <u>Blockchain</u> and <u>Web3</u> integration.
              <br />Custom development, enterprise solutions, decentralized infrastructures.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <a href="#start" className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600">
                More
              </a>
              <a href="#follow-section" className="rounded-full border border-current px-5 py-2 font-semibold">
                Follow
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
