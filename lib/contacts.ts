/** Aloqa ma'lumotlari — matnli qismlari lug'atdan, texnik qismlari shu yerdan. */
export const CONTACTS = {
  phoneHref: '+998732530000',
  email: 'info@kokanddryfruits.uz',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Mustaqillik+36%2C+Kichik+Oqmasjid+MFY%2C+Qo%27qon%2C+Farg%27ona%2C+Uzbekistan',
};

export const SOCIALS = [
  { label: 'Telegram', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'WhatsApp', href: '#' },
];

/**
 * Kompaniya rekvizitlari — kompaniya profilidan (2026-08-23) olingan.
 * Tilga bog'liq bo'lmagan qiymatlar, shuning uchun lug'atlarda takrorlanmaydi.
 */
export const COMPANY = {
  legalName: '“KOKAND DRY FRUITS” LLC',
  founder: 'Sodiqov Qahramonjon',
  team: ['Sodiqov Hojiakbar', 'Sodiqov Shuhratjon'],
  /** Yillik ishlab chiqarish quvvati, tonna */
  capacityTonnes: 250,
  /** Asosiy hajm shu uch mahsulotga to'g'ri keladi */
  mainVolume: ['prunes', 'mungBeans', 'driedApricots'] as const,
} as const;

/**
 * GACC (Xitoy Bojxona Bosh Boshqarmasi) ro'yxati.
 * Qamrov faqat quyidagi HS kodlar bilan cheklangan — boshqa mahsulotlar
 * uchun alohida ro'yxatga olish talab qilinadi.
 */
export const GACC = {
  chinaRegNo: 'CUZB13012509280167',
  foreignRegNo: '2837474',
  coveredHsCodes: ['0813 10', '0813 20'],
  /** Ro'yxat qamrab olgan mahsulot kalitlari */
  coveredProducts: ['driedApricots', 'prunes', 'sourCherries'] as const,
} as const;

/**
 * Eksport bozorlari — davlat kodlari.
 * Nomlari Intl.DisplayNames orqali har bir tilda avtomatik chiqadi,
 * shuning uchun lug'atlarda takrorlanmaydi.
 */
export const EXPORT_REGIONS = ['CN', 'TR', 'RU'] as const;
