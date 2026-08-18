import { Fragment } from 'react';
import { PRODUCTS } from '@/lib/products';
import type { Dictionary } from '@/i18n/types';

export default function Marquee({ dict }: { dict: Dictionary }) {
  const names = PRODUCTS.map(({ key }) => dict.products[key].name);
  // Uzluksiz aylanish uchun ro'yxat ikki marta chiqariladi.
  const items = [...names, ...names];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((name, i) => (
          <Fragment key={`${name}-${i}`}>
            <span>{name}</span>
            <i />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
