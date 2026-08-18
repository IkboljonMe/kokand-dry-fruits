import Image from 'next/image';

/** Brend logotipi — header va footerda ishlatiladi. */
export default function Logo({
  href,
  className = '',
  priority = false,
}: {
  href: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <a href={href} className={`logo ${className}`.trim()} aria-label="Kokand Dry Fruits">
      <Image
        src="/assets/brand/logo-horizontal.png"
        alt="Kokand Dry Fruits"
        width={320}
        height={72}
        priority={priority}
        className="logo__img"
      />
    </a>
  );
}
