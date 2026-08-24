'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/** Serverdan tayyor holda keladi — klientga butun lug'at uzatilmaydi. */
export type CatalogItem = {
  slug: string;
  image: string;
  name: string;
  description: string;
};

export type CatalogText = {
  searchPlaceholder: string;
  searchLabel: string;
  noResults: string;
  learnMore: string;
  clear: string;
};

function Arrow() {
  return (
    <svg viewBox="0 0 20 10" aria-hidden="true">
      <path d="M0 5h18M14 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Diakritikani olib tashlaydi — "kuragá" ham "kuraga" ni topsin. */
const fold = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export default function ProductCatalog({
  items,
  lang,
  t,
}: {
  items: CatalogItem[];
  lang: string;
  t: CatalogText;
}) {
  const [query, setQuery] = useState('');

  const indexed = useMemo(
    () => items.map((item) => ({ item, haystack: fold(`${item.name} ${item.description}`) })),
    [items],
  );

  const results = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return items;
    // Har bir so'z alohida qidiriladi — tartibi muhim emas.
    const words = q.split(/\s+/);
    return indexed
      .filter(({ haystack }) => words.every((w) => haystack.includes(w)))
      .map(({ item }) => item);
  }, [query, indexed, items]);

  return (
    <>
      <div className="psearch reveal-up">
        <label className="psearch__label" htmlFor="product-search">
          {t.searchLabel}
        </label>
        <div className="psearch__field">
          <svg className="psearch__icon" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.5 13.5 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              className="psearch__clear"
              onClick={() => setQuery('')}
              aria-label={t.clear}
            >
              ×
            </button>
          ) : null}
        </div>
      </div>

      <p className="psearch__status" role="status" aria-live="polite">
        {results.length === 0 ? t.noResults : null}
      </p>

      {results.length > 0 ? (
        <div className="cards">
          {results.map((p) => (
            <Link href={`/${lang}/products/${p.slug}`} className="card reveal-up" key={p.slug}>
              <div className="card__img">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={600}
                  height={600}
                  sizes="(max-width: 720px) 90vw, 380px"
                />
              </div>
              <h2 className="card__title">{p.name}</h2>
              <p className="card__desc">{p.description}</p>
              <span className="card__link">
                {t.learnMore} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
