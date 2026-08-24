import type { Dictionary } from '@/i18n/types';
import type { Product } from '@/lib/products';

export default function ProductVarieties({
  product,
  dict,
}: {
  product: Product;
  dict: Dictionary;
}) {
  const item = dict.productPage.items[product.key];
  const L = dict.productPage.labels;
  const name = dict.products[product.key].name;

  if (product.varieties.length === 0) return null;

  return (
    <section className="pvar">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal-up">{name}</span>
          <h2 className="h2 reveal-up">{L.varieties}</h2>
        </div>
        <p className="section-lead reveal-up">{L.varietiesSub}</p>

        <div className="pvar__grid">
          {product.varieties.map((variety, i) => (
            <article className="pvar__card reveal-up" key={variety.key}>
              <span className="pvar__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="pvar__name">
                {item.varieties[variety.key] ?? variety.key}
              </h3>
              <span className="pvar__note">{variety.note}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
