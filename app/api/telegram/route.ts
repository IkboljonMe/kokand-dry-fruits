import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Telegram webhook.
 *
 * Botga yozilgan buyruqlarni qabul qiladi. Hozircha bitta buyruq bor:
 *   /id — yozgan odamga o'z chat_id sini qaytaradi (nusxa olsa bo'ladigan
 *         monospace formatda). Egasining id sini bilib olish uchun kerak:
 *         u TELEGRAM_CHAT_ID ga qo'yiladi va arizalar o'sha chatga tushadi.
 *
 * Xavfsizlik: Telegram har bir so'rovga setWebhook da berilgan
 * secret_token ni X-Telegram-Bot-Api-Secret-Token sarlavhasida qo'shadi.
 * Mos kelmasa — 401. Shunda endpoint'ni begona odam chaqira olmaydi.
 */

type TgChat = { id: number; type?: string; title?: string; username?: string };
type TgUser = { id: number; username?: string; first_name?: string };
type TgMessage = { chat?: TgChat; from?: TgUser; text?: string };
type TgUpdate = { message?: TgMessage; edited_message?: TgMessage };

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function reply(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(8000),
  });
}

export async function POST(request: Request) {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  const got = request.headers.get('x-telegram-bot-api-secret-token');
  if (!expected || got !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let update: TgUpdate;
  try {
    update = (await request.json()) as TgUpdate;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const msg = update.message ?? update.edited_message;
  const chatId = msg?.chat?.id;
  // Buyruq guruhda "/id@BotNomi" ko'rinishida keladi.
  const command = (msg?.text ?? '').trim().split(/\s+/)[0].split('@')[0].toLowerCase();

  if (typeof chatId === 'number') {
    if (command === '/id') {
      const userId = msg?.from?.id;
      const isGroup = msg?.chat?.type && msg.chat.type !== 'private';

      const lines = [
        '<b>Chat ID</b>',
        `<code>${chatId}</code>`,
        '',
        'Tap the number above to copy it.',
        '',
        'Put it in <code>TELEGRAM_CHAT_ID</code> and enquiries from the website will arrive here.',
      ];

      if (isGroup && typeof userId === 'number' && userId !== chatId) {
        lines.splice(
          2,
          0,
          '',
          `<b>Your personal ID</b>`,
          `<code>${userId}</code>`,
          `(this chat is a ${escapeHtml(msg?.chat?.type ?? 'group')})`,
        );
      }

      await reply(chatId, lines.join('\n'));
    } else if (command === '/start') {
      await reply(
        chatId,
        [
          '<b>Kokand Dry Fruits</b>',
          '',
          'This bot receives enquiries from the website.',
          '',
          'Send /id to get this chat’s ID.',
        ].join('\n'),
      );
    }
  }

  // Telegramga har doim 200 qaytariladi — aks holda u so'rovni qayta yuboraveradi.
  return NextResponse.json({ ok: true });
}
