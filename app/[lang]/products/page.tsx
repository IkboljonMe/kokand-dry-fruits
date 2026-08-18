import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cta from '@/components/Cta';
import { getDictionary } from '@/i18n/get-dictionary';
import { isLocale, locales } from '@/i18n/config';
import { PRODUCTS } from '@/lib/products';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: `${dict.products.sectionTitle} — Kokand Dry Fruits`,
    description: dict.products.sectionSubtitle,
    alternates: {
      canonical: `/${lang}/products`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/products`])),
    },
  };
}

export default async function ProductsIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Header
        lang={lang}
        t={{
          products: dict.nav.products,
          about: dict.nav.about,
          delivery: dict.strengths.delivery.title,
          contact: dict.nav.contact,
          menu: dict.nav.home,
        }}
        homeHref={`/${lang}`}
        pathAfterLocale="/products"
        solid
      />

      <section className="pindex">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow reveal-up">{dict.products.sectionTitle}</span>
            <h1 className="h2 reveal-up">{dict.products.sectionSubtitle}</h1>
          </div>

          <div className="cards">
            {PRODUCTS.map(({ key, slug, image }) => {
              const product = dict.products[key];
              return (
                <Link
                  href={`/${lang}/products/${slug}`}
                  className="card reveal-up"
                  key={slug}
                >
                  <div className="card__img">
                    <Image
                      src={image}
                      alt={product.name}
                      width={600}
                      height={600}
                      sizes="(max-width: 720px) 90vw, 380px"
                    />
                  </div>
                  <h2 className="card__title">{product.name}</h2>
                  <p className="card__desc">{product.description}</p>
                  <span className="card__meta">{dict.products.priceNote}</span>
                  <span className="card__link">
                    {dict.products.viewAll}
                    <svg viewBox="0 0 20 10" aria-hidden="true">
                      <path
                        d="M0 5h18M14 1l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Cta dict={dict} lang={lang} />
      <Footer dict={dict} homeHref={`/${lang}`} />
    </>
  );
}
