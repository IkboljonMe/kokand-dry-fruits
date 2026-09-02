import { CONTACTS } from '@/lib/contacts';

export default function Rails({
  phone,
  scrollLabel,
}: {
  phone: string;
  scrollLabel: string;
}) {
  return (
    <>
      <div className="rail rail--left">
        <a href={`tel:${CONTACTS.phoneHref}`} className="rail__text" dir="ltr">
          {phone}
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
