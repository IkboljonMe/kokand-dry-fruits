'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Birinchi tashrifda ko'rinadigan brend preloader.
 *
 *  - Emblema pastdan yuqoriga qarab kulrangdan rangga to'ladi —
 *    qancha yuklanganini shundan ko'rish mumkin, atrofidagi halqa ham shuni takrorlaydi
 *  - Kamida MIN_MS, ko'pi bilan MAX_MS turadi
 *  - Bir sessiyada faqat bir marta (sessionStorage)
 *
 * Progress ikki manbadan yig'iladi: brend/hero rasmlari va sahifadagi
 * birinchi video. Video uchun qo'shimcha so'rov yuborilmaydi — <video>
 * elementining o'z `buffered` holati o'qiladi.
 */

/*
 * Barcha vaqtlar sahifa ochilganidan (navigation start) hisoblanadi, React
 * hidratsiyasidan emas — `performance.now()` va rAF timestamp'i o'sha nuqtadan
 * boshlanadi. Aks holda sekin internetda hisoblagich JS yuklanguncha
 * qimirlamay turadi va byudjet ham kech boshlanadi.
 */

/** Preloader shu vaqtga qadar butunlay yo'qolishi kerak. */
const TOTAL_MS = 5000;
/** So'nish animatsiyasi (globals.css dagi transition bilan bir xil). */
const FADE_MS = 440;
/** 100% ni ko'rsatib turish vaqti. */
const HOLD_MS = 160;
/** Yuklanishga ajratilgan vaqt — qolgani chiqib ketishga. */
const MAX_MS = TOTAL_MS - FADE_MS - HOLD_MS;
/** Ekranda ko'rinadigan eng qisqa vaqt. */
const MIN_MS = 500;
/** Sessiya kaliti — qayta ko'rsatmaslik uchun. */
const FLAG = 'kdf:preloaded';

/**
 * Kutiladigan rasmlar. Faqat sahifa aynan shu manzildan oladigan fayllar —
 * next/image orqali o'tadiganlari (masalan header logotipi) bu yerga yaramaydi,
 * chunki ular /_next/image?url=... deb boshqa manzildan yuklanadi.
 */
const IMAGES = [
  '/assets/brand/logo-emblem.png',
  '/assets/img/hero-poster.jpg',
];

/** Videoning umumiy progressdagi ulushi (qolgani rasmlarga). */
const VIDEO_WEIGHT = 0.6;

export default function Preloader() {
  /** Effekt ishga tushdi — CSS failsafe o'chadi. */
  const [live, setLive] = useState(false);
  /** So'nish boshlandi. */
  const [leaving, setLeaving] = useState(false);
  /** DOM'dan butunlay olib tashlandi. */
  const [gone, setGone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;

    // Bu sessiyada allaqachon ko'rsatilgan — umuman chizmaymiz.
    let seen = false;
    try {
      seen = sessionStorage.getItem(FLAG) === '1';
    } catch {
      seen = false;
    }
    if (seen) {
      root.classList.remove('kdf-loading');
      root.classList.add('kdf-ready');
      setGone(true);
      return;
    }

    root.classList.add('kdf-loading');

    // JS yetib kelguncha to'lishni CSS animatsiyasi yuritgan bo'ladi.
    // O'sha yerdan davom etamiz — sakrab ketmasligi uchun.
    let shown = 0;
    if (rootRef.current) {
      const css = parseFloat(
        getComputedStyle(rootRef.current).getPropertyValue('--p'),
      );
      if (Number.isFinite(css)) shown = Math.min(0.9, Math.max(0, css));
    }
    // data-live CSS animatsiyasini o'chiradi va boshqaruvni JS'ga beradi
    setLive(true);

    // ---- Rasmlar ----------------------------------------------------------
    let loaded = 0;
    let imgProgress = 0;
    const imgs: HTMLImageElement[] = [];

    IMAGES.forEach((src) => {
      const img = new Image();
      const tick = () => {
        loaded += 1;
        imgProgress = loaded / IMAGES.length;
      };
      img.onload = tick;
      img.onerror = tick; // yetib kelmasa ham progressni to'xtatmaymiz
      img.src = src;
      imgs.push(img);
    });

    // ---- Video ------------------------------------------------------------
    const video = document.querySelector<HTMLVideoElement>('video');
    const videoWeight = video ? VIDEO_WEIGHT : 0;
    let videoProgress = video ? 0 : 1;

    const readVideo = () => {
      if (!video) return;
      // Barcha <source>'lar yaroqsiz chiqdi — kutishning ma'nosi yo'q.
      // Bu holatni alohida tekshirish kerak, chunki <source> ishlatilganda
      // 'error' hodisasi <video>'da emas, <source>'larda ishlaydi.
      if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        videoProgress = 1;
        return;
      }
      // HAVE_FUTURE_DATA va undan yuqorisi — oxirigacha o'ynasa bo'ladi
      if (video.readyState >= 3) {
        videoProgress = 1;
        return;
      }
      const { buffered, duration } = video;
      if (buffered.length > 0 && duration > 0) {
        videoProgress = Math.min(
          1,
          buffered.end(buffered.length - 1) / duration,
        );
      }
    };
    const failVideo = () => {
      videoProgress = 1; // video ochilmadi — kutib turishning ma'nosi yo'q
    };

    // 'stalled' bu yerda ishlatilmaydi — sekin internetda bekordan bekorga
    // ishlab, videoni "tayyor" deb ko'rsatib qo'yadi. Kechikish MAX_MS bilan
    // baribir cheklangan.
    const VIDEO_EVENTS = [
      'progress',
      'loadeddata',
      'canplaythrough',
      'suspend',
    ] as const;
    const sources = video
      ? Array.from(video.querySelectorAll('source'))
      : [];

    if (video) {
      VIDEO_EVENTS.forEach((e) => video.addEventListener(e, readVideo));
      video.addEventListener('error', failVideo);
      video.addEventListener('abort', failVideo);
      // <source> xatolari qalqib chiqmaydi — har biriga alohida ulanamiz
      sources.forEach((s) => s.addEventListener('error', readVideo));
      readVideo(); // kesh'dan kelgan bo'lishi mumkin
    }

    const realProgress = () =>
      imgProgress * (1 - videoWeight) + videoProgress * videoWeight;

    // ---- Animatsiya -------------------------------------------------------
    let announced = -1;
    let raf = 0;
    let holdTimer = 0;
    let fadeTimer = 0;
    let finished = false;

    const paint = (p: number) => {
      const el = rootRef.current;
      if (el) el.style.setProperty('--p', p.toFixed(4));
      const whole = Math.round(p * 100);
      if (pctRef.current) pctRef.current.textContent = String(whole);
      // Skrinriderni har kadrda bezovta qilmaymiz
      if (el && Math.abs(whole - announced) >= 5) {
        announced = whole;
        el.setAttribute('aria-valuenow', String(whole));
      }
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      paint(1);
      if (rootRef.current) rootRef.current.setAttribute('aria-valuenow', '100');
      try {
        sessionStorage.setItem(FLAG, '1');
      } catch {
        /* private mode — keyingi safar yana ko'rsatiladi */
      }
      holdTimer = window.setTimeout(() => {
        setLeaving(true);
        root.classList.remove('kdf-loading');
        fadeTimer = window.setTimeout(() => setGone(true), FADE_MS + 20);
      }, HOLD_MS);
    };

    // rAF timestamp'i sahifa ochilishidan hisoblanadi — shuning uchun
    // `now` ning o'zi elapsed bo'lib xizmat qiladi.
    const frame = (elapsed: number) => {
      // Vaqtga bog'liq "pol" — progress hech qachon qotib qolmasin
      const floor = Math.min(0.9, (elapsed / MAX_MS) * 0.9);
      const target = Math.max(realProgress(), floor);
      shown += (target - shown) * 0.12; // silliq yaqinlashish
      paint(Math.min(1, shown));

      if ((realProgress() >= 1 && elapsed >= MIN_MS) || elapsed >= MAX_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
      if (video) {
        VIDEO_EVENTS.forEach((e) => video.removeEventListener(e, readVideo));
        video.removeEventListener('error', failVideo);
        video.removeEventListener('abort', failVideo);
        sources.forEach((s) => s.removeEventListener('error', readVideo));
      }
      root.classList.remove('kdf-loading');
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className={`preloader${leaving ? ' is-leaving' : ''}`}
      style={{ '--p': 0 } as React.CSSProperties}
      role="progressbar"
      aria-label="Kokand Dry Fruits"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      {...(live ? { 'data-live': '' } : {})}
    >
      <div className="preloader__stage">
        <svg className="preloader__ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="preloader__track" cx="50" cy="50" r="48.2" />
          <circle
            className="preloader__bar"
            cx="50"
            cy="50"
            r="48.2"
            pathLength={1}
          />
        </svg>

        <div className="preloader__mark">
          {/* Kulrang asos — hali yuklanmagan qismi */}
          <img
            className="preloader__base"
            src="/assets/brand/logo-emblem.png"
            alt=""
            width={500}
            height={500}
            fetchPriority="high"
            decoding="async"
          />
          {/* Rangli qatlam — pastdan yuqoriga to'ladi */}
          <img
            className="preloader__fill"
            src="/assets/brand/logo-emblem.png"
            alt=""
            width={500}
            height={500}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      <p className="preloader__pct">
        <span ref={pctRef}>0</span>
        <i>%</i>
      </p>
    </div>
  );
}
