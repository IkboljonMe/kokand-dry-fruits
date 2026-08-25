import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';
import { getDictionary } from '@/i18n/get-dictionary';
import {
  defaultLocale,
  htmlLang,
  isLocale,
  localeDir,
  locales,
} from '@/i18n/config';
import Preloader from '@/components/Preloader';
import ScrollEffects from '@/components/ScrollEffects';
import '../globals.css';

/**
 * Bo'yashdan oldin ishlaydi: bu sessiyada preloader ko'rsatilganmi, shuni hal qiladi.
 * Shu tufayli takroriy sahifalarda preloader umuman ko'rinmaydi (miltillamaydi).
 * Oxiridagi timeout — React yuklanmay qolsa ham sayt ochilishi uchun himoya.
 */
const PRELOADER_BOOT = `(function(){var d=document.documentElement;try{
if(sessionStorage.getItem('kdf:preloaded')==='1'){d.classList.add('kdf-ready');return}
}catch(e){}
d.classList.add('kdf-loading');
setTimeout(function(){d.classList.remove('kdf-loading');d.classList.add('kdf-ready')},8000);
})();`;

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kokanddryfruits.uz',
    ),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
        'x-default': `/${defaultLocale}`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: htmlLang[lang],
      type: 'website',
      images: ['/assets/brand/logo-emblem.png'],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = isLocale(raw) ? raw : defaultLocale;

  return (
    <html
      lang={htmlLang[lang]}
      dir={localeDir[lang]}
      className={`${poppins.variable} ${roboto.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/brand/logo-emblem.png"
          fetchPriority="high"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT }} />
        <noscript>
          <style>{`.preloader{display:none}`}</style>
        </noscript>
        <Preloader />
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
