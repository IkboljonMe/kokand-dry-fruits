import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import type { Product } from '@/lib/products';

export default function ProductHero({
  product,
  dict,
  lang,
}: {
  product: Product;
  dict: Dictionary;
  lang: Locale;
}) {
  const item = dict.productPage.items[product.key];
  const name = dict.products[product.key].name;

  return (
    <section className="phero" id="top">
      <div className="phero__media">
        <video autoPlay muted loop playsInline poster={product.poster}>
          <source src={`${product.video}.webm`} type="video/webm" />
          <source src={`${product.video}.mp4`} type="video/mp4" />
        </video>
        <div className="phero__scrim" />
      </div>

      <div className="container phero__content">
        <nav className="crumbs" aria-label={dict.productPage.labels.catalog}>
          <Link href={`/${lang}`}>{dict.nav.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/products`}>{dict.productPage.labels.catalog}</Link>
        </nav>

        <span className="phero__eyebrow reveal-fade">{item.tagline}</span>
        <h1 className="phero__title">
          <span className="reveal">
            <span>{name}</span>
          </span>
        </h1>
        <p className="phero__intro reveal-fade">{item.intro}</p>
        <div className="phero__actions reveal-fade">
          <Link href={`/${lang}#contacts`} className="btn btn--primary">
            {dict.productPage.labels.requestQuote}
          </Link>
          <Link href={`/${lang}/products`} className="btn btn--ghost">
            {dict.productPage.labels.allProducts}
          </Link>
        </div>
      </div>
    </section>
  );
}
