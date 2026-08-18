export const locales = [
  'en', 'ru', 'uz', 'ar', 'tr', 'zh',
  'hi', 'ko', 'ja', 'fr', 'de', 'es',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Til menyusidagi nomlar — har biri o'z tilida. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  uz: 'O‘zbekcha',
  ar: 'العربية',
  tr: 'Türkçe',
  zh: '中文',
  hi: 'हिन्दी',
  ko: '한국어',
  ja: '日本語',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
};

/** <html lang> uchun to'liq BCP-47 teglari. */
export const htmlLang: Record<Locale, string> = {
  en: 'en', ru: 'ru', uz: 'uz', ar: 'ar', tr: 'tr', zh: 'zh-Hans',
  hi: 'hi', ko: 'ko', ja: 'ja', fr: 'fr', de: 'de', es: 'es',
};

/** Arab tili o'ngdan chapga yoziladi. */
export const localeDir: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr', ru: 'ltr', uz: 'ltr', ar: 'rtl', tr: 'ltr', zh: 'ltr',
  hi: 'ltr', ko: 'ltr', ja: 'ltr', fr: 'ltr', de: 'ltr', es: 'ltr',
};

/** public/assets/flags/ ichidagi bayroq fayllari. */
export const localeFlag: Record<Locale, string> = {
  en: 'gb', ru: 'ru', uz: 'uz', ar: 'sa', tr: 'tr', zh: 'cn',
  hi: 'in', ko: 'kr', ja: 'jp', fr: 'fr', de: 'de', es: 'es',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
