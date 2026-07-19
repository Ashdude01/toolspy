# Toolspy v2 — Multilingual Implementation (Phase 1 Complete)

**Branch:** `toolspy_v2` (main untouched)
**Phase 1 delivered:** i18n foundation — parallel locale routes, tool registry, locale config, UI messages, language switcher
**Date:** 18 July 2026

---

## ⚡ SABSE PEHLE — Git Branch (ye commands chalao)

Ye naye files aapke working tree me aa chuki hain. **Commit sirf `toolspy_v2` par karna:**

```bash
cd C:\Users\HP\Documents\Ashish\Toolspy

# 1. Naya branch banao (uncommitted files apne aap saath aati hain)
git checkout -b toolspy_v2

# 2. Sirf nayi files add karo
git add lib/i18n messages app/[locale] components/i18n docs

# 3. Commit
git commit -m "feat(i18n): Phase 1 - parallel locale routes + tool registry + locale config"

# 4. Push (naya branch, main untouched)
git push -u origin toolspy_v2

# 5. (Recommended) GitHub par main ki branch protection on karo:
#    Settings → Branches → Add rule → main → Require pull request
```

> ⚠️ `git checkout main` par wapas jaane se pehle commit zaroor kar lena, warna
> ye files main ke working tree me dikhengi (commit nahi hongi to koi nuksan
> nahi, bas confusion hogi).

---

## Kya add hua (10 nayi files — EXISTING KISI FILE ME KOI CHANGE NAHI)

| File | Kya karti hai |
|---|---|
| `lib/i18n/locales.ts` | Locale config — 16 languages (en/de/fr/es/ja/nl/sv/da/no/it/ru/id/ko/tr/ar/hi), ROUTABLE vs PUBLISHED ka 2-tier system |
| `lib/i18n/tool-registry.ts` | 90 tools ka registry — slug → existing layout/page dynamic imports (hybrid model ki join key) |
| `lib/i18n/messages.ts` | UI-string loader, zero dependencies, English fallback |
| `messages/en.json`, `messages/de.json` | Common UI strings (buttons, labels) |
| `app/[locale]/layout.tsx` | Locale segment layout + lang/dir handling (Arabic RTL ready) |
| `app/[locale]/[slug]/page.tsx` | **Core route** — /de/image-compressor/ waghera. Existing tool layout+page reuse, SSG, noindex jab tak publish na ho |
| `app/[locale]/page.tsx` | Localized homepage (/de/) |
| `components/i18n/language-switcher.tsx` | Manual switcher (middleware/auto-redirect nahi) — abhi kahin wired nahi |
| `docs/V2-IMPLEMENTATION.md` | Ye file |

### Design guarantees
- **English URLs 100% unchanged** — koi `/en/` prefix nahi, koi redirect nahi, existing files untouched
- **Tool logic untouched** — [locale] route existing `app/(tools)/<slug>/layout.tsx + page.tsx` ko import karke reuse karta hai
- **Zero naya dependency** — `npm install` ki zaroorat nahi, Next 14.0.4 pe as-is chalta hai
- **Zero runtime compute** — saare locale pages SSG (`dynamicParams=false`), koi middleware nahi
- **SEO safety** — jab tak locale `PUBLISHED_LOCALES` me nahi: pages **noindex**, sitemap/hreflang me nahi. Duplicate content ka zero risk
- **RTL ready** — Arabic ke liye `dir="rtl"` automatic

---

## Test kaise kare

```bash
git checkout toolspy_v2
npm run dev
```

- `http://localhost:3000/de/` → German homepage (abhi English content — expected, Phase 2)
- `http://localhost:3000/de/image-compressor/` → tool chalta hua
- `http://localhost:3000/de/gst-calculator/` → tool chalta hua
- `http://localhost:3000/fr/image-compressor/` → **404** (fr abhi ROUTABLE nahi — correct behaviour)
- `http://localhost:3000/image-compressor/` → English, bilkul pehle jaisa
- View-source par `/de/` pages me `<meta name="robots" content="noindex, follow"/>` dikhna chahiye

Phir production build verify:

```bash
npm run build
```

Build output me `/[locale]/[slug]` ke 90 pages `● SSG` dikhne chahiye.

---

## Naya language kaise on hoga (jab content aaye)

`lib/i18n/locales.ts` me sirf 2 lists:

1. **Test karna hai:** `ROUTABLE_LOCALES` me code daalo → pages build honge (noindex)
2. **Live karna hai:** `PUBLISHED_LOCALES` me bhi daalo → sitemap + hreflang + indexable + switcher me dikhega

Abhi: `ROUTABLE = ['de']` (testing), `PUBLISHED = []` (kuchh live nahi).

---

## Registry se bahar kya raha (dhyan dena)

In 8 folders me `page.tsx` nahi mila, isliye registry me nahi hain (inka English route bhi abhi exist nahi karta):
`emi-calculator, hash-generator, image-to-text, image-upscaler, image-watermark-remover, lorem-ipsum-generator, password-generator, uuid-generator`
— ye `lib/tools-data.ts` me 'active' hain lekin folder incomplete hai. Jab page.tsx banao, registry me ek entry add kar dena.

`instagram-private-viewer` bhi excluded (redirect → instagram-dp-viewer).

---

## Known Phase-1 limitations (sab planned, sab Phase 2/3 me fix)

1. **`<html lang>`** root layout me "en" hai; locale pages inline script se turant set karte hain. hreflang tags (primary signal) server-rendered hain. Phase 2 restructure me proper fix.
2. **Tool UI English me hai** locale pages par — tool components ke internal strings Phase 3 me `messages/` se translate honge (high-traffic tools pehle).
3. **Header/Footer English me** — switcher wire hone ke saath localize honge.
4. **Static pages (/about waghera) ke locale versions nahi hain** — Phase 2 me Payload `pages` collection se aayenge.
5. **Content abhi English fallback hai** — yahi to Payload ka kaam hai (Phase 2).

---

## Roadmap (report ke hisaab se)

- **Phase 2 — Payload CMS:** Next 14 → 15 upgrade (Payload 3 requirement), Payload install (same app), `tool-content` collection (registry-validated slugs, localized fields, English mandatory + baaki optional), seed script se existing seo-content migrate, on-demand revalidation hooks
- **Phase 3 — German launch:** DeepL seed → human review → publish top-20 tools → `PUBLISHED = ['de']` → switcher header me wire → Search Console monitor
- **Phase 4+:** fr → es → ja → nl → sv/da/no → it → ru → id → ko → tr → ar (RTL) — har language ka apna gate. Hindi jab chaho (optional)
- **Hosting shift (AdSense ke time):** Hostinger KVM 2 + Coolify + Cloudflare — full details report me

**Language priority (final, high-CPC order):**
de → fr → es → ja → nl → sv/da/no → it → **ru → id → ko → tr → ar** → hi (optional)
