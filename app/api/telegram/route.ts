import { NextResponse } from 'next/server';
import {
  copyMessage,
  escapeHtml,
  isOwner as isOwnerChat,
  ownerIds,
  send,
  sendToOwners,
} from '@/lib/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Telegram webhook — @Kokand_Dry_Fruits_Bot.
 *
 * Buyruqlar:
 *   /id    — yozgan odamga chat_id sini qaytaradi (nusxa olinadigan formatda).
 *   /start — mijozga qisqa salom va savolini yozishga taklif.
 *
 * Relay:
 *   Mijoz botga yozgan har qanday xabar egasiga (TELEGRAM_CHAT_ID) uzatiladi.
 *   Sarlavhada mijozning ismi, @username va "#u<id>" belgisi bo'ladi.
 *   Egasi o'sha xabarga REPLY qilsa, javob mijozga qaytib boradi — id
 *   sarlavhadan o'qiladi, shuning uchun ma'lumotlar bazasi kerak emas.
 *
 * Xavfsizlik: Telegram har bir so'rovga setWebhook da berilgan secret_token ni
 * X-Telegram-Bot-Api-Secret-Token sarlavhasida qo'shadi. Mos kelmasa — 401.
 */

type TgChat = { id: number; type?: string; title?: string; username?: string };
type TgUser = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
};
type TgMessage = {
  message_id?: number;
  chat?: TgChat;
  from?: TgUser;
  text?: string;
  caption?: string;
  reply_to_message?: TgMessage;
};
type TgUpdate = { message?: TgMessage; edited_message?: TgMessage };

function displayName(u?: TgUser): string {
  if (!u) return 'Unknown';
  const name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim();
  return name || u.username || String(u.id);
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

  // Har qanday holatda Telegramga 200 qaytariladi — aks holda u qayta yuboraveradi.
  try {
    await handle(update);
  } catch (err) {
    console.error('[telegram] handler error', err);
  }
  return NextResponse.json({ ok: true });
}

async function handle(update: TgUpdate) {
  const msg = update.message ?? update.edited_message;
  const chatId = msg?.chat?.id;
  if (typeof chatId !== 'number') return;

  const owners = ownerIds();
  const isOwner = isOwnerChat(chatId);
  const isPrivate = msg?.chat?.type === 'private';
  const body = (msg?.text ?? msg?.caption ?? '').trim();
  // Guruhda buyruq "/id@BotNomi" ko'rinishida keladi.
  const command = body.split(/\s+/)[0].split('@')[0].toLowerCase();

  if (command === '/id') {
    const userId = msg?.from?.id;
    const isGroup = msg?.chat?.type && msg.chat.type !== 'private';
    const lines = [
      '<b>Chat ID</b>',
      `<code>${chatId}</code>`,
      '',
      'Nusxa olish uchun yuqoridagi raqamni bosing.',
      '',
      'Uni <code>TELEGRAM_CHAT_ID</code> ga qo’ying — arizalar shu chatga tushadi.',
    ];
    if (isGroup && typeof userId === 'number' && userId !== chatId) {
      lines.splice(
        2,
        0,
        '',
        '<b>Shaxsiy ID’ingiz</b>',
        `<code>${userId}</code>`,
        `(bu chat — ${escapeHtml(msg?.chat?.type ?? 'guruh')})`,
      );
    }
    await send(chatId, lines.join('\n'));
    return;
  }

  if (command === '/start') {
    if (isOwner) {
      await send(
        chatId,
        [
          '<b>Egasi chati</b>',
          '',
          'Saytdan kelgan arizalar va botga yozganlarning xabarlari shu yerga tushadi.',
          '',
          'Javob berish uchun o’sha xabarga <b>reply</b> qiling — matningiz to’g’ridan-to’g’ri mijozga boradi.',
        ].join('\n'),
      );
    } else {
      await send(
        chatId,
        [
          '<b>Kokand Dry Fruits</b>',
          'Farg’ona vodiysidan quruq meva, yong’oq va dukkakli mahsulotlar.',
          '',
          'Savolingizni shu yerga yozing: qaysi mahsulot, qancha hajm va qaysi davlatga kerak. Jamoamiz shu chatda javob beradi.',
        ].join('\n'),
      );
    }
    return;
  }

  // --- Egasining javobi mijozga qaytadi ---
  if (isOwner && msg?.reply_to_message) {
    const source = msg.reply_to_message.text ?? msg.reply_to_message.caption ?? '';
    // Belgi sarlavha oxirida turadi, shuning uchun oxirgi moslik olinadi.
    const marks = [...source.matchAll(/#u(\d+)/g)];
    const target = marks.length ? marks[marks.length - 1][1] : null;

    if (!target) {
      await send(
        chatId,
        'Bu javob kimga ekanini aniqlab bo’lmadi. <code>#u…</code> belgisi bor xabarga reply qiling.',
      );
      return;
    }

    const res = msg.text
      ? await send(target, escapeHtml(msg.text))
      : msg.message_id
        ? await copyMessage(target, chatId, msg.message_id)
        : null;

    await send(
      chatId,
      res?.ok
        ? '✅ Yuborildi.'
        : '⚠️ Yetkazib bo’lmadi — mijoz botni bloklagan bo’lishi mumkin.',
    );
    return;
  }

  // --- Mijozning xabari egasiga uzatiladi ---
  if (!isOwner && isPrivate) {
    if (owners.length === 0) {
      console.warn('[telegram] TELEGRAM_CHAT_ID not set — message not relayed', {
        from: msg?.from?.id,
        text: body.slice(0, 200),
      });
      await send(chatId, 'Rahmat — xabaringiz qabul qilindi.');
      return;
    }

    const from = msg?.from;
    const header = [
      '📩 <b>Bot orqali yangi xabar</b>',
      `<b>Kimdan:</b> ${escapeHtml(displayName(from))}` +
        (from?.username ? ` (@${escapeHtml(from.username)})` : ''),
      `<b>ID:</b> <code>${chatId}</code>`,
      '',
      body ? escapeHtml(body) : '<i>(quyida biriktirma)</i>',
      '',
      `<i>Javob berish uchun shu xabarga reply qiling.</i> #u${chatId}`,
    ].join('\n');

    await sendToOwners(header);
    // Matnsiz xabar bo'lsa — asl faylni ham har bir egaga yuboramiz.
    if (!msg?.text && msg?.message_id) {
      await Promise.allSettled(
        owners.map((id) => copyMessage(id, chatId, msg.message_id!)),
      );
    }

    await send(
      chatId,
      '✅ Rahmat — xabaringiz jamoamizga yetib bordi. Shu chatda javob beramiz.',
    );
  }
}
