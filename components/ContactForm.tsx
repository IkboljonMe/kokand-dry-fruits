'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/config';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Klientga faqat shu maydonlar uzatiladi — butun lug'at emas. */
export type ContactFormText = {
  title: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  send: string;
  optional: string;
  error: string;
  loading: string;
  product: string;
  productAny: string;
  sent: string;
};

export type ProductOption = { slug: string; name: string };

export default function ContactForm({
  t,
  lang,
  products,
  defaultProduct,
}: {
  t: ContactFormText;
  lang: Locale;
  products: ProductOption[];
  /** Mahsulot sahifasida forma o'sha mahsulotni oldindan tanlab turadi. */
  defaultProduct?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  const label =
    status === 'sending' ? `${t.loading}…`
    : status === 'sent' ? `${t.send} ✓`
    : t.send;

  return (
    <form className="form reveal-up" id="form" onSubmit={onSubmit}>
      <p className="form__title">{t.title}</p>
      <div className="form__row">
        <input type="text" name="name" placeholder={t.name} required />
      </div>
      <div className="form__row">
        <input type="tel" name="phone" placeholder={t.phone} required />
      </div>
      <div className="form__row">
        <input type="email" name="email" placeholder={`${t.email} (${t.optional})`} />
      </div>
      <div className="form__row">
        <label className="form__label" htmlFor="product">
          {t.product}
        </label>
        <select
          id="product"
          name="product"
          className="form__select"
          defaultValue={defaultProduct ?? ''}
        >
          <option value="">{t.productAny}</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form__row">
        <textarea name="msg" rows={3} placeholder={t.message} />
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--full"
        disabled={status === 'sending' || status === 'sent'}
      >
        {label}
      </button>
      {status === 'sent' ? (
        <p className="form__note form__note--ok" role="status">
          {t.sent}
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="form__note form__note--error" role="alert">
          {t.error}
        </p>
      ) : null}
    </form>
  );
}
