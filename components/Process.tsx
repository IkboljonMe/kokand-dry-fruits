import type { Dictionary } from '@/i18n/types';

export default function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal-up">{dict.about.heroTitle}</span>
          <h2 className="h2 reveal-up">{dict.about.principles.title}</h2>
        </div>
        <div className="steps">
          {dict.about.principles.items.map((item, i) => (
            <article className="step reveal-up" key={item.title}>
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="step__title">{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
