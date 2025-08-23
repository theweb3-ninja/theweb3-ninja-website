import React from 'react';

const thumbs = [
  '783eaae8.png','f20473d8.jpg','2b327322.jpg','1ce4dc72.jpg','af9f1ebd.jpg','3f3e53ea.jpg','fa8f0b31.jpg','10d07ac2.jpg','f6824b22.jpg','a4d51e04.jpg','6ad5c649.jpg','5952e506.jpg','9f72cf5f.jpg','737c76e1.jpg','b7fcab9c.jpg','30c49d93.jpg','50d708a5.jpg','41990686.jpg','a4345d11.jpg','3a0b93c6.jpg'
];

const OldWebsitesGallery: React.FC = () => {
  return (
    <section id="old-websites" className="bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-center text-lg font-semibold">Old Websites Portfolio</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {thumbs.map((t) => (
            <a key={t} href={`/assets/images/gallery-old-websites/${t.replace('.jpg','_original.jpg').replace('.png','_original.png')}`} className="block overflow-hidden rounded-md border">
              <img src={`/assets/images/gallery-old-websites/${t}`} alt={t} className="h-32 w-full object-cover" />
            </a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="#section-about" className="inline-flex items-center rounded-full border px-4 py-2">Go Up</a>
        </div>
      </div>
    </section>
  );
};

export default OldWebsitesGallery;
