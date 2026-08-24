import type { Dictionary } from '@/i18n/types';

export default function Production({ dict }: { dict: Dictionary }) {
  const { quality, fresh, delivery, privateLabel } = dict.strengths;

  return (
    <section className="production">
      <div className="container production__inner">
        <div className="production__media reveal-up">
          <video autoPlay muted loop playsInline poster="/assets/img/production-poster.jpg">
            <source src="/assets/video/production.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="production__text">
          <span className="eyebrow reveal-up">{dict.strengths.sectionTitle}</span>
          <h2 className="h2 reveal-up">{dict.strengths.sectionSubtitle}</h2>
          <ul className="ticks">
            {[quality, fresh, delivery, privateLabel].map((item) => (
              <li className="reveal-up" key={item.title}>
                <b>{item.title}</b> — {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
