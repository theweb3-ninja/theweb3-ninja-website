import React, { useState } from 'react';

const NewsletterForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // TODO: integrate with service. For now, show success.
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl"><u>Newsletter</u></h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">Want to stay up-to-date with the latest news, insights, and exclusive content from The Web3 Ninjas? Subscribe to our newsletter!</p>

        {status !== 'success' ? (
          <form onSubmit={onSubmit} className="mx-auto mt-6 grid gap-3 sm:grid-cols-3">
            <input required name="fname" placeholder="Name" className="rounded border px-3 py-2" />
            <input name="company" placeholder="Company (optional)" className="rounded border px-3 py-2" />
            <input required type="email" name="email" placeholder="Email" className="rounded border px-3 py-2 sm:col-span-2" />
            <button type="submit" disabled={status==='submitting'} className="rounded bg-black px-4 py-2 font-semibold text-white hover:bg-neutral-800 disabled:opacity-60 sm:col-span-1">Subscribe</button>
          </form>
        ) : (
          <p className="mt-4 text-green-600">Thanks! Please confirm via the email we just sent.</p>
        )}
        {status === 'error' && <p className="mt-2 text-red-600">Something went wrong. Try again later.</p>}
      </div>
    </section>
  );
};

export default NewsletterForm;
