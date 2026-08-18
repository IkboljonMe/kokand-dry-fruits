import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Lead = {
  name: string;
  phone: string;
  email?: string;
  msg?: string;
  lang?: string;
};

function parse(body: unknown): Lead | null {
  if (typeof body !== 'object' || body === null) return null;
  const b = body as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(b.name);
  const phone = str(b.phone);
  if (!name || !phone) return null;

  // Uzun kiritmalarni kesamiz — forma maydonlari uchun yetarli.
  return {
    name: name.slice(0, 120),
    phone: phone.slice(0, 60),
    email: str(b.email).slice(0, 160) || undefined,
    msg: str(b.msg).slice(0, 2000) || undefined,
    lang: str(b.lang).slice(0, 8) || undefined,
  };
}

/**
 * Formadan kelgan arizani qabul qiladi.
 *
 * Hozircha ariza serverda loglanadi. Haqiqiy yetkazish uchun quyidagi
 * TODO joyiga e-mail/CRM/Telegram integratsiyasi qo'shiladi — kalitlar
 * .env.local dan olinadi va hech qachon klientga tushmaydi.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const lead = parse(body);
  if (!lead) {
    return NextResponse.json(
      { error: 'Fields "name" and "phone" are required' },
      { status: 422 },
    );
  }

  // TODO: bu yerga haqiqiy yetkazish qo'shilsin (SMTP, CRM yoki Telegram bot).
  console.info('[contact] new lead', {
    ...lead,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
