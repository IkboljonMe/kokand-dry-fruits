'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import { localeFlag, localeNames, locales, type Locale } from '@/i18n/config';

/** Klientga faqat navigatsiya matnlari uzatiladi. */
export type HeaderText = {
  products: string;
  about: string;
  delivery: string;
  contact: string;
  menu: string;
};

export default function Header({
  lang,
  t,
  homeHref = '',
  pathAfterLocale = '',
  solid = false,
}: {
  lang: Locale;
  t: HeaderText;
  /** Ichki sahifalarda anchorlar bosh sahifaga ishora qilishi uchun. */
  homeHref?: string;
  /** Til almashtirilganda shu sahifada qolish uchun: "/products/raisins". */
  pathAfterLocale?: string;
  /** Yorug' fonli sahifalarda header doim quyuq bo'lsin. */
  solid?: boolean;
}) {
  const [stuck, setStuck] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setLangOpen(false);
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [langOpen]);

  const closeNav = () => setNavOpen(false);

  return (
    <header className={`header${stuck || solid ? ' is-stuck' : ''}`} id="header">
      <div className="header__inner">
        <Logo href={homeHref || '#top'} priority />

        <nav className={`nav${navOpen ? ' is-open' : ''}`} id="nav">
          <a href={`${homeHref}#catalog`} onClick={closeNav}>{t.products}</a>
          <a href={`${homeHref}#about`} onClick={closeNav}>{t.about}</a>
          <a href={`${homeHref}#geo`} onClick={closeNav}>{t.delivery}</a>
          <a href={`${homeHref}#contacts`} onClick={closeNav}>{t.contact}</a>

          <div className={`lang${langOpen ? ' is-open' : ''}`} ref={langRef}>
            <button
              className="lang__btn"
              type="button"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((open) => !open);
              }}
            >
              <span className="lang__flag">
                <Image
                  src={`/assets/flags/${localeFlag[lang]}.svg`}
                  alt=""
                  width={24}
                  height={16}
                />
              </span>
              <span>{localeNames[lang]}</span>
              <svg className="lang__caret" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div className="lang__menu">
              {locales
                .filter((locale) => locale !== lang)
                .map((locale) => (
                  <Link
                    key={locale}
                    href={`/${locale}${pathAfterLocale}`}
                    onClick={closeNav}
                    hrefLang={locale}
                  >
                    <Image
                      src={`/assets/flags/${localeFlag[locale]}.svg`}
                      alt=""
                      width={20}
                      height={14}
                    />
                    {localeNames[locale]}
                  </Link>
                ))}
            </div>
          </div>
        </nav>

        <button
          className={`burger${navOpen ? ' is-open' : ''}`}
          id="burger"
          type="button"
          aria-label={t.menu}
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
