# Phase 3 — German Launch Guide

**Pre-req:** Phase 2 complete (admin chalta hai, seed ho chuka: `npx payload run scripts/seed-tool-content.ts`)

---

## Is batch me kya aaya (sab auto-safe — publish hone tak site par koi change nahi)

| File | Kya karta hai |
|---|---|
| `app/sitemap.ts` | PUBLISHED locales ke /de/ URLs automatically sitemap me aayenge |
| `components/layout/dynamic-tool-layout.tsx` | English tool pages par hreflang tags — sirf jab locale publish ho (pairing dono taraf zaroori hai) |
| `app/page.tsx` | Homepage hreflang — same auto-logic |
| `components/layout/header.tsx` | Language switcher wired — jab tak publish nahi, render hi nahi hota |
| `messages/de.json` | German UI strings (expanded) |
| `scripts/seed-de-content.ts` | **3 pilot tools ka poora German content** (image-compressor, merge-pdf, qr-code-generator) |

**Trigger ek hi jagah hai:** `lib/i18n/locales.ts` → `PUBLISHED_LOCALES`. Jab tak `[]` hai — sitemap, hreflang, switcher, indexing sab off. `['de']` karte hi sab ek saath on.

---

## Step 1 — German pilot content seed karo

```bash
npx payload run scripts/seed-de-content.ts
```

3 tools ka professional German content (sections + FAQs + meta) Payload me chala jayega. Website par zero change (contentSource abhi 'code' hai).

## Step 2 — Ek tool par live dekho

1. Admin → Tool Content → `image-compressor` → **contentSource: 'cms'** → Save
2. `http://localhost:3000/de/image-compressor/` kholo
3. German content, coast-fire layout (left TOC) me dikhega. English page (`/image-compressor/`) bilkul unchanged
4. Aise hi `merge-pdf` aur `qr-code-generator` flip karo

## Step 3 — Baaki top tools ka German content

Priority: Search Console me top-traffic **Germany-relevant** tools (image/pdf/qr/calculators — GST/exam predictors NAHI, wo India-specific hain).

Har tool ke liye admin me: locale switcher → Deutsch → sections bharo (anchorId lowercase-hyphens, heading German, body text) + FAQs + metaTitle/metaDescription → contentSource 'cms' → Save. Ya mujhse bolo — main aur tools ka German content seed-script me add kar dunga.

## Step 4 — PUBLISH (jab 15-20 tools ready hon)

`lib/i18n/locales.ts` me ek line:

```ts
export const PUBLISHED_LOCALES: string[] = ['de']
```

Deploy karo. Isse automatically: /de/ pages **indexable** (noindex hat jayega), sitemap me /de/ URLs, English+German pages par hreflang pairs, header me language switcher visible.

## Step 5 — Post-launch (pehle 2-4 hafte)

- Search Console → Sitemaps → resubmit
- Coverage report me /de/ indexing dekho (2-4 hafte patience)
- English rankings par nazar — koi drop nahi aana chahiye (hreflang sahi hai to nahi aayega)
- Jo German pages traffic laayen, unke jaise aur content banao

## Aage (Phase 4+)

fr → es → ja → ru → id → ko → tr → ar — same playbook, har language:
1. `ROUTABLE_LOCALES` me code add karo (pages banne lagenge, noindex)
2. Content bharo (admin ya seed script)
3. `PUBLISHED_LOCALES` me add karo (live)
