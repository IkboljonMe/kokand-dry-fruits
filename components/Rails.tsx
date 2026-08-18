import { CONTACTS } from '@/lib/contacts';

export default function Rails({ scrollLabel }: { scrollLabel: string }) {
  return (
    <>
      <div className="rail rail--left">
        <a href={`mailto:${CONTACTS.email}`} className="rail__text">
          {CONTACTS.email}
        </a>
      </div>
      <div className="rail rail--right">
        <span className="rail__text">{scrollLabel}</span>
        <span className="rail__dot" />
        <span className="rail__line" />
      </div>
    </>
  );
}
