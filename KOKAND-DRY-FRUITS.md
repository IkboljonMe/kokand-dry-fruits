# Kokand Dry Fruits

> Qo'qondan dunyoga — tabiiy quritilgan meva, yong'oq va dukkakli mahsulotlar eksporti.

*Ma'lumot manbasi: kompaniya profili (2026-yil 23-avgust). Saytdagi barcha raqam va
da'volar shu hujjatga moslashtirilgan.*

## Kompaniya

| | |
|---|---|
| **Brend** | Kokand Dry Fruits |
| **Yuridik shaxs** | "KOKAND DRY FRUITS" LLC |
| **Asoschi** | Sodiqov Qahramonjon |
| **Jamoa** | Sodiqov Hojiakbar, Sodiqov Shuhratjon |
| **Manzil** | Farg'ona viloyati, Qo'qon tumani, Kichik Oqmasjid MFY, Mustaqillik ko'chasi, 36 |
| **Faoliyat turi** | Quruq meva va yong'oq ishlab chiqarish va eksport |
| **Faoliyat boshlangan** | 2020-yil |
| **Aloqa** | Saytdagi forma orqali — Telegramga ulangan |

## Raqamlarda

| Ko'rsatkich | Qiymat |
|---|---|
| Katalogdagi mahsulot | 13 |
| Yillik quvvat | 250 tonna |
| Eksport bozori | 3 (Xitoy, Turkiya, Rossiya) |
| Tajriba | 6 yil (2026-yil holatiga) |

Asosiy hajm uchta mahsulotga to'g'ri keladi: **qora olxo'ri, mosh, kuraga**.
Mayiz, grek yong'og'i va yeryong'oq kichikroq hajmda — aniq tonnaj taqsimlanmagan.

## Mahsulotlar

### 6 ta asosiy yo'nalish (nav ro'yxati tasdiqlangan)

| Mahsulot | Navlari |
|---|---|
| **Kuraga** | Qizil, Sariq, Shakarli, Limonka, Natural, Kesilgan |
| **Mayiz** | Malayar, Sultana, Natural, Crimson, Jumbo Golden |
| **Grek yong'og'i** | Yarim (1/2), Chorak (1/4), Yirik bo'lak, Mayda bo'lak, Granula |
| **Qora olxo'ri** | Danakli, Danaksiz |
| **Yeryong'oq** | Po'stli, Po'stsiz (tozalangan) |
| **Mosh** | Standart (nav ajratilmagan) |

### Eng ko'p sotiladigan qolgan mahsulotlar

Lo'ya, O'rik mag'izi, Quritilgan qalampir, Qovun qoqi, Kampot aralashmasi, Olcha, Olma qoqi.

Bularga nav ro'yxati hali berilmagan — sayt ularda nav bo'limini umuman ko'rsatmaydi.
Spetsifikatsiyada faqat HS kod va qadoqlash bor.

> **Tekshirilishi kerak:** 6 ta asosiy yo'nalishning kalibr, namlik, saqlash muddati va
> qadoqlash qiymatlari soha uchun odatiy ko'rsatkichlar asosida kiritilgan
> (`lib/products.ts`). Sayt buni ochiq aytadi ("Parameters are indicative and confirmed
> per contract"), lekin real ishlab chiqarish ma'lumoti bilan almashtirilishi kerak.

## Sertifikatlar

**GACC (Xitoy Bojxona Bosh Boshqarmasi) ro'yxatidan o'tgan:**

| | |
|---|---|
| Xitoy reg. № | CUZB13012509280167 |
| Chet el reg. № | 2837474 |
| Qamrov | HS 0813 10 (kuraga) · HS 0813 20 (olxo'ri va olcha) |

ISO 22000, HACCP, Kosher, Halal — **hali yo'q**, saytda ham ko'rsatilmaydi.
GACC ro'yxati mayiz, yong'oq, yeryong'oq va moshni qamrab olmaydi.

## B2B

- **Private label** — xaridorning o'z brendi ostida ishlab chiqarish taklif qilinadi.
- Mijozlar fikri (testimonial) mavjud, lekin matnlari hali berilmagan —
  saytdan olib tashlangan.

## Tillar

Sayt **12 tilda** ishlaydi (profildagi "13 ta til" bilan farq qiladi — aniqlashtirish kerak):

| Kod | Til | Kod | Til |
|---|---|---|---|
| `en` | English | `zh` | 中文 |
| `ru` | Русский | `hi` | हिन्दी |
| `uz` | O'zbekcha | `ko` | 한국어 |
| `ar` | العربية (RTL) | `ja` | 日本語 |
| `tr` | Türkçe | `fr` | Français |
| `de` | Deutsch | `es` | Español |

## Texnik

| | |
|---|---|
| **Framework** | Next.js 15 (App Router, SSG) |
| **Lug'atlar** | `i18n/dictionaries/*.json` — 12 ta fayl, bir xil kalit tuzilishi |
| **Sxema** | `i18n/types.ts` |
| **Mahsulot katalogi** | `lib/products.ts` |
| **Kompaniya rekvizitlari** | `lib/contacts.ts` (`COMPANY`, `GACC`, `EXPORT_REGIONS`) |

### Brend assetlari

| Fayl | Tavsif |
|---|---|
| `assets/brand/logo-horizontal.png` | Asosiy gorizontal logotip |
| `assets/brand/logo-emblem.png` | Emblema (500×500) |
| `assets/img/products-kdf/` | 13 ta mahsulot fotosi (1536×1024) |
| `assets/video/products/` | 6 ta asosiy mahsulot videosi |
| `assets/flags/` | 12 ta til bayrog'i (SVG) |

> **Video:** profilda "video kontent hali yo'q" deyilgan, lekin saytda 6 ta asosiy
> mahsulot uchun umumiy video bor. Yangi 7 ta mahsulotda video yo'q — ularda rasm
> ko'rsatiladi (`Product.video` ixtiyoriy).
