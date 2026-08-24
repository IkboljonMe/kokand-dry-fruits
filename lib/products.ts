import type { ProductKey } from '@/i18n/types';

/**
 * Mahsulotlar ro'yxati.
 *
 * Bu yerdagi qiymatlar tilga bog'liq emas (raqamlar, kalibrlar, HS kodlar),
 * shuning uchun lug'atlarda takrorlanmaydi — faqat yorliqlari tarjima qilinadi.
 *
 * Navlar (`varieties`) kompaniya profilidan (2026-08-23) olingan — 6 ta asosiy
 * yo'nalish uchun. Eng ko'p sotiladigan qolgan mahsulotlar uchun nav ro'yxati
 * hali berilmagan, shuning uchun ular bo'sh — nav bo'limi umuman chiqmaydi.
 *
 * DIQQAT: 6 ta asosiy yo'nalishning spetsifikatsiya qiymatlari soha uchun
 * odatiy ko'rsatkichlar asosida kiritilgan va tasdiqlanishi kerak. Qolgan
 * mahsulotlarga faqat HS kod va qadoqlash ko'rsatilgan.
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
  /** Video hali faqat 6 ta asosiy mahsulotda bor — qolganlarida rasm ko'rsatiladi */
  video?: string;
  poster?: string;
  /** Navlar — nomlari lug'atdan, texnik izohi shu yerdan */
  varieties: { key: string; note: string }[];
  specs: ProductSpec[];
};

const IMG = '/assets/img/products-kdf';
const VID = '/assets/video/products';
const POSTER = '/assets/img/products-video';

export const PRODUCTS: Product[] = [
  {
    key: 'driedApricots',
    slug: 'dried-apricots',
    image: `${IMG}/dried-apricots.jpg`,
    video: `${VID}/dried-apricots`,
    poster: `${POSTER}/dried-apricots.jpg`,
    varieties: [
      { key: 'red', note: 'deep orange-red' },
      { key: 'yellow', note: 'light golden' },
      { key: 'sugar', note: 'high-sugar grade' },
      { key: 'lemon', note: 'pale lemon shade' },
      { key: 'natural', note: 'sun-dried' },
      { key: 'cut', note: 'halved, pitted' },
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
    image: `${IMG}/raisins.jpg`,
    video: `${VID}/raisins`,
    poster: `${POSTER}/raisins.jpg`,
    varieties: [
      { key: 'malayar', note: 'large, dark' },
      { key: 'sultana', note: 'golden, seedless' },
      { key: 'natural', note: 'sun-dried' },
      { key: 'crimson', note: 'seedless' },
      { key: 'jumboGolden', note: 'extra large' },
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
    image: `${IMG}/prunes.jpg`,
    video: `${VID}/prunes`,
    poster: `${POSTER}/prunes.jpg`,
    varieties: [
      { key: 'unpitted', note: 'with stone' },
      { key: 'pitted', note: 'without stone' },
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
    image: `${IMG}/walnuts.jpg`,
    video: `${VID}/walnuts`,
    poster: `${POSTER}/walnuts.jpg`,
    varieties: [
      { key: 'halves', note: '1/2 kernels' },
      { key: 'quarters', note: '1/4 kernels' },
      { key: 'largePieces', note: 'coarse pieces' },
      { key: 'smallPieces', note: 'fine pieces' },
      { key: 'granules', note: 'granulate' },
    ],
    specs: [
      { label: 'calibre', value: 'Halves · Quarters · Pieces · Granulate' },
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
    image: `${IMG}/peanuts.jpg`,
    video: `${VID}/peanuts`,
    poster: `${POSTER}/peanuts.jpg`,
    varieties: [
      { key: 'inShell', note: 'in shell' },
      { key: 'shelled', note: 'cleaned kernels' },
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
    image: `${IMG}/mung-beans.jpg`,
    video: `${VID}/mung-beans`,
    poster: `${POSTER}/mung-beans.jpg`,
    varieties: [{ key: 'standard', note: 'single grade' }],
    specs: [
      { label: 'calibre', value: '3.0–3.6 mm' },
      { label: 'moisture', value: '≤ 12%' },
      { label: 'packaging', value: '25 / 50 kg bag' },
      { label: 'shelfLife', value: '24 months' },
      { label: 'storage', value: '5–20 °C · ≤ 65% RH' },
      { label: 'hsCode', value: '0713 31' },
    ],
  },

  // Eng ko'p sotiladigan qolgan mahsulotlar — nav va to'liq spetsifikatsiya
  // hali tasdiqlanmagan, shuning uchun faqat HS kod va qadoqlash ko'rsatilgan.
  {
    key: 'beans',
    slug: 'beans',
    image: `${IMG}/beans.jpg`,
    varieties: [],
    specs: [
      { label: 'packaging', value: 'to buyer specification' },
      { label: 'hsCode', value: '0713 33' },
    ],
  },
  {
    key: 'apricotKernels',
    slug: 'apricot-kernels',
    image: `${IMG}/apricot-kernels.jpg`,
    varieties: [],
    specs: [
      { label: 'packaging', value: 'to buyer specification' },
      { label: 'hsCode', value: '1212 99' },
    ],
  },
  {
    key: 'driedPeppers',
    slug: 'dried-peppers',
    image: `${IMG}/dried-peppers.jpg`,
    varieties: [],
    specs: [
      { label: 'packaging', value: 'to buyer specification' },
      { label: 'hsCode', value: '0904 21' },
    ],
  },
  {
    key: 'driedMelon',
    slug: 'dried-melon',
    image: `${IMG}/dried-melon.jpg`,
    varieties: [],
    specs: [
      { label: 'packaging', value: 'to buyer specification' },
      { label: 'hsCode', value: '0813 40' },
    ],
  },
  {
    key: 'compoteMix',
    slug: 'compote-mix',
    image: `${IMG}/compote-mix.jpg`,
    varieties: [],
    specs: [
      { label: 'packaging', value: 'to buyer specification' },
      { label: 'hsCode', value: '0813 50' },
    ],
  },
  {
    key: 'sourCherries',
    slug: 'sour-cherries',
    image: `${IMG}/sour-cherries.jpg`,
    varieties: [],
    specs: [
      { label: 'packaging', value: 'to buyer specification' },
      { label: 'hsCode', value: '0813 40' },
    ],
  },
  {
    key: 'driedApples',
    slug: 'dried-apples',
    image: `${IMG}/dried-apples.jpg`,
    varieties: [],
    specs: [
      { label: 'packaging', value: 'to buyer specification' },
      { label: 'hsCode', value: '0813 30' },
    ],
  },
];

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

/**
 * Bosh sahifada ko'rsatiladigan mahsulotlar — eng ko'p sotiladiganlari.
 * Tartib mijoz bergan ro'yxat bo'yicha: Mayiz, Mosh, Lo'ya, Bargak, Sliva,
 * O'rik mag'izi. Qolganlari /products sahifasida.
 */
export const FEATURED_KEYS: ProductKey[] = [
  'raisins',
  'mungBeans',
  'beans',
  'driedApricots',
  'prunes',
  'apricotKernels',
];

export const FEATURED_PRODUCTS: Product[] = FEATURED_KEYS.map(
  (key) => PRODUCTS.find((p) => p.key === key)!,
);
