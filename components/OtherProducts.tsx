import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

export default function OtherProducts({
  currentSlug,
  dict,
  lang,
}: {
  currentSlug: string;
  dict: Dictionary;
  lang: Locale;
}) {
  const others = PRODUCTS.filter((p) => p.slug !== currentSlug);

  return (
    <section className="pother">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal-up">{dict.productPage.labels.otherProducts}</span>
        </div>
        <div className="pother__grid">
          {others.map((p) => (
            <Link
              href={`/${lang}/products/${p.slug}`}
              className="pother__card reveal-up"
              key={p.slug}
            >
              <span className="pother__img">
                <Image
                  src={p.image}
                  alt=""
                  width={320}
                  height={320}
                  sizes="200px"
                />
              </span>
              <span className="pother__name">{dict.products[p.key].name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
