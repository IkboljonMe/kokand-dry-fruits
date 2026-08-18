'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Sahifa bo'ylab umumiy effektlar:
 *  - .reveal-up elementlari ko'rinishga kirganda .is-in oladi
 *  - Yangi sahifaga o'tganda (client-side navigation) dinamik qo'shilgan
 *    elementlar ham kuzatiladi (MutationObserver orqali)
 *  - autoplay videolar brauzer bloklaganda posterda qoladi
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll<HTMLElement>('.reveal-up')
        .forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    // Hozirgi elementlarni kuzatish
    const observe = (el: Element) => {
      if (!el.classList.contains('is-in')) {
        io.observe(el);
      }
    };

    document.querySelectorAll<HTMLElement>('.reveal-up').forEach(observe);

    // Yangi qo'shilgan elementlarni kuzatish (client-side navigation uchun)
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('reveal-up')) observe(node);
            node
              .querySelectorAll<HTMLElement>('.reveal-up')
              .forEach(observe);
          }
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    document.querySelectorAll<HTMLVideoElement>('video[autoplay]').forEach((v) => {
      v.play().catch(() => {});
    });
  }, [pathname]);

  return null;
}
