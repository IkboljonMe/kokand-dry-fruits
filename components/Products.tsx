import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

function Arrow() {
  return (
    <svg viewBox="0 0 20 10" aria-hidden="true">
      <path d="M0 5h18M14 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function Products({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="products" id="catalog">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow reveal-up">{dict.products.sectionTitle}</span>
          <h2 className="h2 reveal-up">{dict.products.sectionSubtitle}</h2>
        </div>

        <div className="cards">
          {PRODUCTS.map(({ key, slug, image }) => {
            const product = dict.products[key];
            return (
              <article className="card reveal-up" key={key}>
                <div className="card__img">
                  <Image
                    src={image}
                    alt={product.name}
                    width={600}
                    height={600}
                    sizes="(max-width: 720px) 90vw, 380px"
                  />
                </div>
                <h3 className="card__title">{product.name}</h3>
                <p className="card__desc">{product.description}</p>
                <span className="card__meta">{dict.products.priceNote}</span>
                <Link href={`/${lang}/products/${slug}`} className="card__link">
                  {dict.products.viewAll} <Arrow />
                </Link>
              </article>
            );
          })}

          <article className="card card--cta reveal-up">
            <h3 className="card__title">{dict.cta.title}</h3>
            <p className="card__desc">{dict.cta.subtitle}</p>
            <a href="#contacts" className="btn btn--primary">{dict.cta.button}</a>
          </article>
        </div>
      </div>
    </section>
  );
}
