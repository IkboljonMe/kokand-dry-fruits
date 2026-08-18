import type { Dictionary } from '@/i18n/types';

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/img/hero-poster.jpg"
        >
          <source src="/assets/video/hero.webm" type="video/webm" />
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__scrim" />
      </div>

      <div className="hero__content container">
        <span className="hero__tagline reveal-fade">{dict.hero.tagline}</span>
        <h1 className="hero__title">
          <span className="reveal">
            <span>{dict.hero.title}</span>
          </span>
        </h1>
        <p className="hero__sub reveal-fade">{dict.hero.subtitle}</p>
        <div className="hero__actions reveal-fade">
          <a href="#catalog" className="btn btn--primary">{dict.hero.cta}</a>
          <a href="#about" className="btn btn--ghost">{dict.hero.ctaSecondary}</a>
        </div>
      </div>
    </section>
  );
}
