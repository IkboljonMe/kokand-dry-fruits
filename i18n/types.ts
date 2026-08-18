/**
 * Lug'at sxemasi en.json dan olingan — 12 ta til fayli bir xil tuzilishga ega
 * (i18n/dictionaries dagi barcha fayllar kalitlari tekshirilgan).
 */

export type NamedItem = { name: string; description: string };
export type TitledItem = { title: string; description: string };

export type ProductKey =
  | 'driedApricots'
  | 'raisins'
  | 'prunes'
  | 'walnuts'
  | 'peanuts'
  | 'mungBeans';

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { home: string; about: string; products: string; contact: string };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    slides: { title: string; subtitle: string }[];
    cta: string;
    ctaSecondary: string;
  };
  strengths: {
    sectionTitle: string;
    sectionSubtitle: string;
    quality: TitledItem;
    fresh: TitledItem;
    delivery: TitledItem;
    selection: TitledItem;
  };
  products: {
    sectionTitle: string;
    sectionSubtitle: string;
    priceNote: string;
    viewAll: string;
  } & Record<ProductKey, NamedItem>;
  stats: {
    products: string;
    clients: string;
    countries: string;
    certifications: string;
    productsValue: string;
    clientsValue: string;
    countriesValue: string;
    certificationsValue: string;
  };
  testimonials: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: { name: string; role: string; text: string }[];
  };
  cta: { title: string; subtitle: string; button: string };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    stats: {
      deliveredValue: string;
      deliveredLabel: string;
      customersValue: string;
      customersLabel: string;
      certificatesValue: string;
      certificatesLabel: string;
    };
    story: { title: string; p1: string; p2: string };
    principles: { title: string; items: TitledItem[] };
    partners: { title: string; subtitle: string };
  };
  contact: {
    heroTitle: string;
    heroSubtitle: string;
    form: {
      title: string;
      name: string;
      phone: string;
      phoneHint: string;
      country: string;
      countrySearch: string;
      countryNoResults: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      optional: string;
      emailRequired: string;
    };
    info: {
      title: string;
      address: string;
      addressLabel: string;
      phone: string;
      phoneLabel: string;
      email: string;
      emailLabel: string;
      hours: string;
      hoursLabel: string;
      viewOnMap: string;
    };
  };
  footer: {
    description: string;
    quickLinks: string;
    ourProducts: string;
    contactUs: string;
    followUs: string;
    rights: string;
  };
  common: { loading: string };
  landing: { scroll: string };
};
