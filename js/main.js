/* ORIENT FRUITS — landing interaktivi */
(function () {
  'use strict';

  /* ---------- Sticky header ---------- */
  var header = document.getElementById('header');
  var onScroll = function () {
    header.classList.toggle('is-stuck', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobil menyu ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Til tanlash ---------- */
  var lang = document.querySelector('.lang');
  if (lang) {
    var langBtn = lang.querySelector('.lang__btn');
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = lang.classList.toggle('is-open');
      langBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function () {
      lang.classList.remove('is-open');
      langBtn.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------- Scroll reveal ---------- */
  var items = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* geo teglariga zinapoyali kechikish */
  document.querySelectorAll('.geo__list span').forEach(function (el, i) {
    el.style.setProperty('--i', i);
  });

  /* ---------- Raqam hisoblagich ---------- */
  var counters = document.querySelectorAll('[data-count]');
  var runCount = function (el) {
    var target = parseFloat(el.dataset.count);
    var dur = 1400, t0 = null;
    var tick = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Forma ---------- */
  var form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var old = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      setTimeout(function () {
        form.reset();
        btn.textContent = old;
        btn.disabled = false;
      }, 2600);
    });
  }

  /* ---------- Video autoplay fallback ---------- */
  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    var p = v.play();
    if (p && p.catch) { p.catch(function () { /* poster ko'rinadi */ }); }
  });
})();
