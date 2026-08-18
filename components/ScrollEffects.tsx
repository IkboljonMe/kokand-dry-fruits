'use client';

import { useEffect } from 'react';

/**
 * Sahifa bo'ylab umumiy effektlar:
 *  - .reveal-up elementlari ko'rinishga kirganda .is-in oladi
 *  - autoplay videolar brauzer bloklaganda posterda qoladi
 */
export default function ScrollEffects() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal-up');

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
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

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLVideoElement>('video[autoplay]').forEach((v) => {
      // Bloklansa poster ko'rinib turadi — xatoni yutamiz.
      v.play().catch(() => {});
    });
  }, []);

  return null;
}
