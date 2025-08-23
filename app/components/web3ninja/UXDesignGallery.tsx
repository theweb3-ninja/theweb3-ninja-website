import React from 'react';

const UXDesignGallery: React.FC = () => {
  return (
    <section id="ux-design" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">UX design</h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            <strong>User Experience</strong> is a significant hurdle in the crypto and Web3 industry. A key problem is the inherent complexity of the underlying technology.
          </p>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            By partnering with <strong>The Web3 Ninja</strong>, projects can bridge the gap between complex technology and mainstream accessibility of their Web3 products.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <img src="/assets/images/gallery02/28a8ff98.jpg" alt="Dashboard DeFi Pool Lending" className="rounded-md object-cover" />
            <img src="/assets/images/gallery02/a7d9b7ab.jpg" alt="Complex UI" className="rounded-md object-cover" />
            <img src="/assets/images/gallery02/04efbaba.jpg" alt="Dashboard DeFi Pool Lending" className="rounded-md object-cover" />
            <img src="/assets/images/gallery02/4e6a496c.jpg" alt="Wireframes" className="rounded-md object-cover" />
            <img src="/assets/images/gallery02/4e0cc82b.png" alt="User Interfaces" className="rounded-md object-cover" />
          </div>
          <div className="mt-6">
            <a
              href="https://calendly.com/theweb3-ninja/30min"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600"
            >
              Book Now
            </a>
          </div>
        </div>
        <div>
          <img src="/assets/images/image01.jpg" alt="Complex UI example" title="Complex UI" className="w-full rounded-lg shadow" />
        </div>
      </div>
    </section>
  );
};

export default UXDesignGallery;
