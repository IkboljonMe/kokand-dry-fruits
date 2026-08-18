import Counter from './Counter';
import type { Dictionary } from '@/i18n/types';

/** "100+", "20+", "14" kabi qiymatlarni son va qo'shimchaga ajratadi. */
function splitStat(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(\D*)$/);
  return m ? { count: Number(m[1]), suffix: m[2] } : null;
}

export default function Intro({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: dict.stats.productsValue, label: dict.stats.products },
    { value: dict.stats.clientsValue, label: dict.stats.clients },
    { value: dict.stats.countriesValue, label: dict.stats.countries },
    { value: dict.stats.certificationsValue, label: dict.stats.certifications },
  ];

  return (
    <section className="intro" id="about">
      <div className="container">
        <span className="eyebrow reveal-up">{dict.about.story.title}</span>
        <p className="intro__lead reveal-up">
          <b>Kokand Dry Fruits</b> — {dict.about.story.p1}
        </p>
        <p className="intro__text reveal-up">{dict.about.story.p2}</p>

        <div className="intro__grid">
          {stats.map((stat) => {
            const parsed = splitStat(stat.value);
            return (
              <div className="intro__item reveal-up" key={stat.label}>
                {parsed ? (
                  <Counter to={parsed.count} suffix={parsed.suffix} />
                ) : (
                  <span className="intro__num">{stat.value}</span>
                )}
                <span className="intro__label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
