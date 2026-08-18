import type { ProductKey } from '@/i18n/types';

/**
 * Mahsulotlar ro'yxati.
 *
 * Bu yerdagi qiymatlar tilga bog'liq emas (raqamlar, kalibrlar, HS kodlar),
 * shuning uchun lug'atlarda takrorlanmaydi — faqat yorliqlari tarjima qilinadi.
 *
 * DIQQAT: spetsifikatsiya qiymatlari soha uchun odatiy ko'rsatkichlar asosida
 * kiritilgan. Ishlab chiqarish ma'lumotlari bilan solishtirib tasdiqlash kerak.
 */
export type ProductSpec = {
  /** Lug'atdagi yorliq kaliti */
  label: SpecKey;
  value: string;
};

export type SpecKey =
  | 'calibre'
  | 'moisture'
  | 'packaging'
  | 'shelfLife'
  | 'storage'
  | 'hsCode'
  | 'origin';

export type Product = {
  key: ProductKey;
  slug: string;
  image: string;
  video: string;
  poster: string;
  /** Navlar — nomlari lug'atdan, texnik izohi shu yerdan */
  varieties: { key: string; note: string }[];
  specs: ProductSpec[];
};

export const PRODUCTS: Product[] = [
  {
    key: 'driedApricots',
    slug: 'dried-apricots',
    image: '/assets/img/products-kdf/dried-apricots.jpg',
    video: '/assets/video/products/dried-apricots',
    poster: '/assets/img/products-video/dried-apricots.jpg',
    varieties: [
      { key: 'natural', note: '80–100 pcs/kg' },
      { key: 'yellow', note: '60–80 pcs/kg' },
      { key: 'cut', note: 'halved' },
      { key: 'amber', note: 'extra light' },
    ],
    specs: [
      { label: 'calibre', value: '60–80 · 80–100 · 100–120 pcs/kg' },
      { label: 'moisture', value: '≤ 20%' },
      { label: 'packaging', value: '5 / 10 / 12.5 kg carton' },
      { label: 'shelfLife', value: '12 months' },
      { label: 'storage', value: '0–15 °C · ≤ 65% RH' },
      { label: 'hsCode', value: '0813 10' },
    ],
  },
  {
    key: 'raisins',
    slug: 'raisins',
    image: '/assets/img/products-kdf/raisins.jpg',
    video: '/assets/video/products/raisins',
    poster: '/assets/img/products-video/raisins.jpg',
    varieties: [
      { key: 'sultana', note: 'golden' },
      { key: 'jumbo', note: 'extra large' },
      { key: 'crimson', note: 'seedless' },
      { key: 'shade', note: 'shade-dried' },
    ],
    specs: [
      { label: 'calibre', value: 'Jumbo · Standard · Midget' },
      { label: 'moisture', value: '≤ 17%' },
      { label: 'packaging', value: '12.5 kg carton · 20 kg bag' },
      { label: 'shelfLife', value: '12 months' },
      { label: 'storage', value: '0–15 °C · ≤ 65% RH' },
      { label: 'hsCode', value: '0806 20' },
    ],
  },
  {
    key: 'prunes',
    slug: 'prunes',
    image: '/assets/img/products-kdf/prunes.jpg',
    video: '/assets/video/products/prunes',
    poster: '/assets/img/products-video/prunes.jpg',
    varieties: [
      { key: 'pitted', note: 'without stone' },
      { key: 'unpitted', note: 'with stone' },
      { key: 'softened', note: 'ready to eat' },
    ],
    specs: [
      { label: 'calibre', value: '70/80 · 80/90 · 90/100 pcs/kg' },
      { label: 'moisture', value: '≤ 25%' },
      { label: 'packaging', value: '5 / 10 kg carton' },
      { label: 'shelfLife', value: '12 months' },
      { label: 'storage', value: '0–15 °C · ≤ 65% RH' },
      { label: 'hsCode', value: '0813 20' },
    ],
  },
  {
    key: 'walnuts',
    slug: 'walnuts',
    image: '/assets/img/products-kdf/walnuts.jpg',
    video: '/assets/video/products/walnuts',
    poster: '/assets/img/products-video/walnuts.jpg',
    varieties: [
      { key: 'halves', note: 'light halves' },
      { key: 'quarters', note: 'quarters' },
      { key: 'pieces', note: '8 mm pieces' },
      { key: 'inShell', note: '30–34 mm' },
    ],
    specs: [
      { label: 'calibre', value: 'Halves · Quarters · Pieces · In shell' },
      { label: 'moisture', value: '≤ 8%' },
      { label: 'packaging', value: '10 / 25 kg carton · vacuum' },
      { label: 'shelfLife', value: '12 months' },
      { label: 'storage', value: '0–10 °C · ≤ 60% RH' },
      { label: 'hsCode', value: '0802 32' },
    ],
  },
  {
    key: 'peanuts',
    slug: 'peanuts',
    image: '/assets/img/products-kdf/peanuts.jpg',
    video: '/assets/video/products/peanuts',
    poster: '/assets/img/products-video/peanuts.jpg',
    varieties: [
      { key: 'blanched', note: 'skin removed' },
      { key: 'raw', note: 'kernels' },
      { key: 'roasted', note: 'roasted' },
      { key: 'inShell', note: 'in shell' },
    ],
    specs: [
      { label: 'calibre', value: '50/60 · 60/70 · 70/80 pcs/oz' },
      { label: 'moisture', value: '≤ 8%' },
      { label: 'packaging', value: '25 kg bag · 10 kg carton' },
      { label: 'shelfLife', value: '12 months' },
      { label: 'storage', value: '0–15 °C · ≤ 65% RH' },
      { label: 'hsCode', value: '1202 42' },
    ],
  },
  {
    key: 'mungBeans',
    slug: 'mung-beans',
    image: '/assets/img/products-kdf/mung-beans.jpg',
    video: '/assets/video/products/mung-beans',
    poster: '/assets/img/products-video/mung-beans.jpg',
    varieties: [
      { key: 'standard', note: '3.0–3.2 mm' },
      { key: 'large', note: '3.4–3.6 mm' },
      { key: 'sprouting', note: 'sprouting grade' },
    ],
    specs: [
      { label: 'calibre', value: '3.0–3.6 mm' },
      { label: 'moisture', value: '≤ 12%' },
      { label: 'packaging', value: '25 / 50 kg bag' },
      { label: 'shelfLife', value: '24 months' },
      { label: 'storage', value: '5–20 °C · ≤ 65% RH' },
      { label: 'hsCode', value: '0713 31' },
    ],
  },
];

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);
