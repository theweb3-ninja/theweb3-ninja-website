import React from 'react';

const team = [
  { name: 'Sean', img: '/assets/images/gallery01/01387170.jpg', href: 'https://www.linkedin.com/in/sean-p-mcgarry/' },
  { name: 'Tyler', img: '/assets/images/gallery01/120e05bf.jpg', href: 'https://www.northvanweb.com' },
  { name: 'Stephanie', img: '/assets/images/gallery01/35011e4e.jpg', href: 'https://www.linkedin.com/in/moloro-malepe/' },
  { name: 'Alexis', img: '/assets/images/gallery01/c0af3618.jpg', href: 'https://www.linkedin.com/in/alexis-vos/' },
  { name: 'Dmytro', img: '/assets/images/gallery01/fe30e027.jpg', href: 'https://linkedin.com/in/elwray' },
  { name: 'Alex', img: '/assets/images/gallery01/c8c654ba.jpg', href: 'https://www.linkedin.com/in/alexpetrosidis/' },
  { name: 'Théo', img: '/assets/images/gallery01/6d2fdebb.jpg', href: 'https://www.linkedin.com/in/theo-ri/' },
  { name: 'Rocco', img: '/assets/images/gallery01/b5088037.jpg', href: 'https://rocco.me' },
];

const AboutNinjas: React.FC = () => {
  return (
    <section id="section-about" className="bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-2 items-start">
        <div>
          <h3 className="text-xl font-extrabold sm:text-2xl">About the <u>Ninjas</u>?</h3>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            The Web3 Ninja isn't just a company but a pool of talented individuals operating without a traditional hierarchy.
          </p>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            We prioritize direct client involvement for most of our engineers, designers, and other specialists to achieve optimal results.
          </p>
          <div className="mt-6">
            <a href="#old-websites" className="rounded-full border px-5 py-2 font-semibold">Dated portfolio</a>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {team.map((m) => (
              <a key={m.name} href={m.href} target="_blank" rel="noreferrer" className="text-center">
                <img src={m.img} alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover shadow" />
                <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{m.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNinjas;
