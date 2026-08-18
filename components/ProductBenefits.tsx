import Image from 'next/image';
import type { Dictionary } from '@/i18n/types';
import type { Product } from '@/lib/products';

export default function ProductBenefits({
  product,
  dict,
}: {
  product: Product;
  dict: Dictionary;
}) {
  const item = dict.productPage.items[product.key];

  return (
    <section className="pben">
      <div className="container pben__inner">
        <div className="pben__media reveal-up">
          <Image
            src={product.image}
            alt={dict.products[product.key].name}
            width={900}
            height={900}
            sizes="(max-width: 900px) 90vw, 480px"
          />
        </div>
        <div className="pben__text">
          <span className="eyebrow reveal-up">{dict.productPage.labels.benefits}</span>
          <ul className="pben__list">
            {item.benefits.map((benefit) => (
              <li className="reveal-up" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
