import React from 'react';

const FollowSection: React.FC = () => {
  return (
    <section id="follow-section" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Follow the <u>ninjas</u></h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
          Want to stay ahead of the curve in the fast-paced world of Web3, blockchain, and DeFi?
          Then you need to connect with The Web3 Ninjas!
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <li>
            <a className="inline-flex items-center gap-2 rounded-full border px-4 py-2" href="https://theweb3.ninja/blog" role="button">
              <span>Feed</span>
            </a>
          </li>
          <li>
            <a className="inline-flex items-center gap-2 rounded-full border px-4 py-2" href="https://www.linkedin.com/company/theweb3-ninja" target="_blank" rel="noreferrer" role="button">
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a className="inline-flex items-center gap-2 rounded-full border px-4 py-2" href="https://x.com/xdemocle" target="_blank" rel="noreferrer" role="button">
              <span>X</span>
            </a>
          </li>
          <li>
            <a className="inline-flex items-center gap-2 rounded-full border px-4 py-2" href="https://bsky.app/profile/theweb3.ninja" target="_blank" rel="noreferrer" role="button">
              <span>Bluesky</span>
            </a>
          </li>
          <li>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
              onClick={() => navigator.clipboard.writeText('hello@theweb3.ninja')}
            >
              <span>Email</span>
            </button>
          </li>
        </ul>

        <p className="mt-6 text-sm text-neutral-500">© Rocco Russo - Italy's VAT Registered</p>
      </div>
    </section>
  );
};

export default FollowSection;
