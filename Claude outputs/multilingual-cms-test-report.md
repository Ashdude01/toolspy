# Toolspy — Multilingual CMS Test Report & Bug List

**Branch:** `toolspy_v2`  ·  **Environment:** `dev.toolspy.net`  ·  **Date:** 18 Jul 2026
**Scope:** Hybrid (Code/CMS) multilingual content — **Tool-content**, **Homepage**, **Posts**
**Test method:** Live round-trip — CMS me content likha (API + Admin UI) → frontend pe render verify → English fallback verify → locale isolation verify → ISR revalidation verify.

---

## TL;DR (Verdict)

**Sab kuch PASS. Koi bhi functional / blocking bug nahi mila.** ✅

Teeno CMS areas (tool-content, homepage, posts) me multilingual round-trip 100% kaam kar raha hai — content per-language save hota hai, sahi language pe dikhta hai, dusri language ko affect nahi karta, aur English fallback theek chalta hai. Sirf **2 minor observations** hain (dono expected/known — niche detail me).

**Deploy:** Ready hai, bas deploy se pehle ek `yarn build` local pe chala lena (niche "Deploy" section).

---

## Test Results — Detail

### 1. Tool-content  (`/admin/collections/tool-content/2/` — ai-background-remover)

| Check | Result |
|---|---|
| German (`de`) CMS content likha → `/de/ai-background-remover/` pe German dikha | ✅ PASS |
| English (`en`) same page pe unchanged raha (locale isolation) | ✅ PASS |
| `contentSource` per-language toggle (Code/CMS) — de=CMS, en=Code alag-alag chala | ✅ PASS |
| ISR — save ke turant baad frontend update hua (revalidateTag/Path hook) | ✅ PASS (instant) |
| Admin editor — German section full rich-text toolbar ke saath render hua (koi skeleton nahi) | ✅ PASS |
| Cleanup — TEST-DE content revert, ab page pe TEST-DE nahi dikh raha | ✅ Done |

### 2. Homepage  (`/admin/globals/homepage/` — Homepage global)

| Check | Result |
|---|---|
| German CMS SEO content likha → `/de/` pe German CMS block dikha | ✅ PASS |
| `/` (English) pe code-based content dikha (per-language toggle) | ✅ PASS |
| Hero + Popular Tools cards + testimonials hamesha code se aaye (layout intact) | ✅ PASS |
| Rich text editor wahi full-featured (posts/tool-content jaisa) | ✅ PASS |
| ISR revalidation (`homepage` tag + `/` + `/{locale}` paths) | ✅ PASS |
| Cleanup — German TEST content revert | ✅ Done |

### 3. Posts / Blog  (`/admin/collections/posts/9/` — uses-of-love-calculator)

| Check | Result |
|---|---|
| German content likha → `/de/blog/...` pe German dikha | ✅ PASS |
| `/blog/...` (English) unchanged raha | ✅ PASS |
| Locale switch pe 404 nahi aaya (Phase 1 routing kaam kar raha hai) | ✅ PASS |
| Admin — locale switcher + "[UI-EDIT]" + Publish button persist hua | ✅ PASS |
| Cleanup — German TEST-DE revert | ✅ Done |

---

## Bug List

> **Blocking / functional bugs: 0**

### Minor observations (non-blocking — dono known/expected)

**OBS-1 — Localized blog sidebar me untranslated posts ke English titles dikhte hain**
- **Kya:** `/de/blog/...` pe "Related posts" / "Recent posts" sidebar me un posts ke titles English me aate hain jinka German translation nahi hai.
- **Severity:** Minor (cosmetic).
- **Kyun expected:** Ye Payload ka `fallbackLocale: 'en'` behaviour hai — jab kisi post ka German title nahi hota to English fallback dikhta hai. Ye galat nahi hai; iska alternative (khaali title dikhana) isse bura hoga.
- **Action:** Koi fix zaroori nahi. Jab actual translations add honge, apne aap sahi ho jayega.

**OBS-2 — RTL locales (jaise Arabic) me root `<html dir="rtl">` set nahi hota**
- **Kya:** Arabic (`/ar/...`) pe content sahi render hota hai aur `dir="rtl"` **inner `[locale]` div** pe lagta hai (via `<div lang={locale} dir={info.dir}>`), lekin root `<html>` tag `lang="en"` (fixed) rehta hai — usme `dir` attribute nahi aata.
- **Severity:** Minor (SEO/accessibility — visually RTL theek dikhta hai).
- **Kyun known:** Ye pehle se code me documented hai (`app/(frontend)/[locale]/layout.tsx` comment: "Phase 4 me fix hoga"). Root layout minimal Payload-pattern hai isliye `<html>` static hai.
- **Action:** Sirf tab priority jab aap actually RTL languages (Arabic/Hebrew/Urdu) production me publish karna chaho. Abhi `PUBLISHED_LOCALES = []` hai to sab noindex hai — koi SEO nuksan nahi.

---

## Deploy Recommendation

`toolspy_v2` branch pe accumulate hue changes (admin dashboard crash fix, homepage hybrid CMS, sitemap split, tools query-param search, 404 redesign, Phase 1 routing) — sab dev pe live-verified hain.

**Deploy se pehle:**
1. Local pe `yarn build` chala lo — cloud me `node_modules` wipe ho gaya tha isliye main `next build` / `tsc` cloud me nahi chala paya; ye final type/build safety check hai.
2. Build clean pass ho jaye to `toolspy_v2` → production deploy safe hai.

---

## Pending (aapke action ka wait)

- **Arabic test field cleanup:** `tool-content/2` pe abhi bhi ek Arabic (`ar`) test field bacha hai — `metaTitle: "TEST-AR"` (content empty). Ise revert karna baaki hai (German cleanup ki tarah). Admin session expire ho gaya hai, isliye aap dobara login kar do to main ye ek field clean kar dunga. (Ye noindex Arabic locale pe hai — koi production impact nahi, bas tidiness ke liye.)
