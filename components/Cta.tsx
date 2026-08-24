import ContactForm from './ContactForm';
import { CONTACTS } from '@/lib/contacts';
import { PRODUCTS } from '@/lib/products';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

export default function Cta({
  dict,
  lang,
  defaultProduct,
}: {
  dict: Dictionary;
  lang: Locale;
  /** Mahsulot sahifasida shu mahsulot formada oldindan tanlanadi. */
  defaultProduct?: string;
}) {
  const info = dict.contact.info;
  const products = PRODUCTS.map((p) => ({
    slug: p.slug,
    name: dict.products[p.key].name,
  }));

  return (
    <section className="cta" id="contacts">
      <div className="container cta__inner">
        <div className="cta__text">
          <span className="eyebrow reveal-up">{dict.contact.heroTitle}</span>
          <h2 className="h2 reveal-up">{dict.cta.title}</h2>
          <p className="reveal-up">{dict.contact.heroSubtitle}</p>

          <p className="cta__price reveal-up">{dict.products.priceNote}</p>

          <div className="cta__contacts reveal-up">
            <a href={`tel:${CONTACTS.phoneHref}`}>{info.phone}</a>
            <a href={`mailto:${CONTACTS.email}`}>{info.email}</a>
          </div>

          <dl className="cta__info reveal-up">
            <dt>{info.addressLabel}</dt>
            <dd>
              <a href={CONTACTS.mapsUrl} target="_blank" rel="noopener noreferrer">
                {info.address}
              </a>
            </dd>
            <dt>{info.hoursLabel}</dt>
            <dd>{info.hours}</dd>
          </dl>
        </div>
        <ContactForm
          lang={lang}
          products={products}
          defaultProduct={defaultProduct}
          t={{
            title: dict.contact.form.title,
            name: dict.contact.form.name,
            phone: dict.contact.form.phone,
            email: dict.contact.form.email,
            message: dict.contact.form.message,
            send: dict.contact.form.send,
            optional: dict.contact.form.optional,
            error: dict.contact.form.emailRequired,
            loading: dict.common.loading,
            product: dict.contact.form.product,
            productAny: dict.contact.form.productAny,
            sent: dict.contact.form.sent,
          }}
        />
      </div>
    </section>
  );
}
