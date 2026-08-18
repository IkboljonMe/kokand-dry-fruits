/** Aloqa ma'lumotlari — matnli qismlari lug'atdan, texnik qismlari shu yerdan. */
export const CONTACTS = {
  phoneHref: '+998732530000',
  email: 'info@kokanddryfruits.uz',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kokand%2C+Fergana+Region%2C+Uzbekistan',
};

export const SOCIALS = [
  { label: 'Telegram', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'WhatsApp', href: '#' },
];

/**
 * Eksport geografiyasi — davlat kodlari.
 * Nomlari Intl.DisplayNames orqali har bir tilda avtomatik chiqadi,
 * shuning uchun lug'atlarda takrorlanmaydi.
 */
export const EXPORT_REGIONS = [
  'GB', 'RU', 'UZ', 'SA', 'TR', 'CN',
  'IN', 'KR', 'JP', 'FR', 'DE', 'ES',
] as const;
