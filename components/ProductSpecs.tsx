import type { Dictionary } from '@/i18n/types';
import type { Product } from '@/lib/products';

export default function ProductSpecs({
  product,
  dict,
}: {
  product: Product;
  dict: Dictionary;
}) {
  const L = dict.productPage.labels;

  return (
    <section className="pspecs">
      <div className="container">
        <div className="section-head">
          <h2 className="h2 reveal-up">{L.specifications}</h2>
        </div>
        <p className="section-lead reveal-up">{L.specificationsSub}</p>

        <dl className="spectable reveal-up">
          {product.specs.map((spec) => (
            <div className="spectable__row" key={spec.label}>
              <dt>{L[spec.label]}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
          <div className="spectable__row">
            <dt>{L.origin}</dt>
            <dd>{L.originValue}</dd>
          </div>
        </dl>

        <p className="pspecs__note reveal-up">{L.specNote}</p>
      </div>
    </section>
  );
}
