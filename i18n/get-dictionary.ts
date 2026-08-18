import 'server-only';
import type { Locale } from './config';
import type { Dictionary } from './types';

/**
 * Har bir til alohida JSON chunk sifatida yuklanadi — faqat so'ralgan til
 * serverda o'qiladi, klient bundle ga hech biri tushmaydi.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default as Dictionary),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default as Dictionary),
  uz: () => import('./dictionaries/uz.json').then((m) => m.default as Dictionary),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default as Dictionary),
  tr: () => import('./dictionaries/tr.json').then((m) => m.default as Dictionary),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default as Dictionary),
  hi: () => import('./dictionaries/hi.json').then((m) => m.default as Dictionary),
  ko: () => import('./dictionaries/ko.json').then((m) => m.default as Dictionary),
  ja: () => import('./dictionaries/ja.json').then((m) => m.default as Dictionary),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default as Dictionary),
  de: () => import('./dictionaries/de.json').then((m) => m.default as Dictionary),
  es: () => import('./dictionaries/es.json').then((m) => m.default as Dictionary),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
