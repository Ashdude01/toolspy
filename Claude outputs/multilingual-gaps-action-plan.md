# Toolspy — Multilingual Gaps, Analysis & Action Plan

**Branch:** `toolspy_v2`  ·  **Date:** 18 Jul 2026
Ye document aapke do naye points ka **code review + analysis + phased action plan** hai. (Pichhla "test report + bug list" alag file me hai — ye uska extension hai.)

---

## Pehle: abhi kya translate hota hai vs kya nahi

| Layer | Kaha se aata hai | `/de/` pe translate hota hai? |
|---|---|---|
| **Below-tool content** (sections, FAQ, disclaimer) | CMS (ToolContent) per-locale | ✅ Haan (aapne test kiya) |
| Blog post body | CMS (Posts) per-locale | ✅ Haan |
| Homepage SEO block | CMS (Homepage global) per-locale | ✅ Haan |
| **Header / nav** | `components/layout/header.tsx` — hardcoded English | ❌ Nahi |
| **Footer** | `components/layout/footer.tsx` — hardcoded English | ❌ Nahi |
| **Above-tool hero** (label / heading / para) | Har tool ke `page.tsx` me hardcoded English | ❌ Nahi |
| **Related tools** (heading + card names) | `related-tools.tsx` default props + `tools-data` registry (English) | ❌ Nahi |

**Root cause (ek line me):** `app/(site)/(frontend)/layout.tsx` — jo `<html lang="en">` + `<Header/>` + `<Footer/>` render karta hai — wo `[locale]` route ke **upar** baithta hai, isliye usko pata hi nahi chalta ki kaunsi language active hai. Header/footer bilkul static English strings hain, aur unke andar ke links bhi English root paths (`/about`, `/privacy`) pe jaate hain — locale prefix (`/de/...`) carry nahi karte.

---

## ITEM 1 — Header, footer, before-tool text, related tools translate nahi hote

### Findings (code-verified)
1. **Header** (`layout/header.tsx`, 22 KB): "About", "Tools", "Contact", search placeholder — sab hardcoded English. Koi `locale` prop / dictionary / `t()` nahi. Language-switcher sirf isliye kaam karta hai kyunki wo client component hai jo `usePathname()` se locale nikaalta hai.
2. **Footer** (`layout/footer.tsx`): "Privacy Policy", "Terms of Service", "Tool Categories", "© Toolspy…" — hardcoded. Links bhi English paths.
3. **Nav links locale-blind:** `/de/ai-background-remover/` pe header me "About" click karo → `/about` (English) chala jaata hai, `/de/about` nahi. Ye alag se ek navigation bug hai.
4. **Related tools** (`tools/related-tools.tsx`): heading "More Helpful Tools You Might Like" + "Check out our other tools…" default props me hardcoded. Card ke tool **names + descriptions** `tools-data` registry se aate hain (English-only).

### Analysis — inko translate kaise karein? (industry standard)

Yaha do **alag** cheezein hain, aur dono ka best-practice solution alag hai:

**(A) "UI strings" — fixed interface labels** (nav items, footer headings, search placeholder, related-tools heading, buttons jaise "Download", "Copy").
Ye **content nahi hai** — ye interface hai. Inki 3 khaasiyat: (i) poori site pe same, (ii) count chhota (~40-60 strings), (iii) kabhi-kabhi hi change hote hain.
→ **Industry standard = static translation dictionary**, CMS nahi. Ek `messages/en.json`, `messages/de.json` … banao, aur `next-intl` (ya simple hand-rolled `useTranslations()` hook jo pathname se locale le) use karo. **CMS me daalna galat hoga** — content team ko har page ke liye same "About/Tools/Privacy" dobara likhne padte, error-prone aur bewajah mehnat.

**(B) "Content strings" — per-tool text** (related-tools card ke tool names/descriptions).
→ Yaha 3 options, ROI ke hisaab se:
  - **B1 (recommended, pragmatic):** Tool **names** English hi rehne do (brand/tool names aksar sab languages me English rehte hain — "PDF Compressor", "Background Remover" — normal hai). Sirf heading/description (UI strings) dictionary se translate karo. **Sabse kam effort, 90% visual benefit.**
  - **B2:** Card descriptions ke liye CMS ToolContent ke localized `metaDescription` ka reuse karo (jo tools already CMS pe hain unke liye auto-translated, baaki English fallback).
  - **B3 (over-engineering, abhi mat karo):** Poore tool-registry ko per-locale translate karna — 100+ tools × N languages. ROI kam, maintenance zyada.

### Recommended approach — Item 1
- **Chrome (header/footer/related-tools headings):** static dictionary (`next-intl` ya lightweight custom). Locale client-side `usePathname()` se (switcher jaisa hi pattern).
- **Nav links:** har `href` ko `localePath(locale, href)` se wrap karo (helper already `locales.ts` me maujood hai) taaki `/de/` pe links `/de/...` pe rahein.
- **Related-tools card names:** abhi English rakho (B1). Baad me chaho to B2.
- **Effort:** dictionary setup + header/footer/related-tools wire-up. Ek baar setup, phir har nayi language sirf ek JSON file.

---

## ITEM 2 — Above-tool hero (label / h1 / para): rakhein ya nahi? CMS me laayein?

### Pehle: kya ye text zaroori bhi hai? (UI/UX + SEO analysis)

**Haan, zaroori hai — hataana galat hoga.** Reasons:

- **SEO — ek critical finding mila:** Tool ke UI page (`page.tsx`) me abhi hero **`<h2>`** hai, aur us page me **koi `<h1>` hai hi nahi**. `<h1>` neeche `seo-content.tsx` (below-content) me hai (line 100). **Aur jab CMS content active hota hai** (jaise ab de/localized pages pe), to below-content `ToolSeoContentTemplate` render hota hai jo sirf **`<h2>` sections** banata hai — matlab **CMS-driven / localized tool page pe koi `<h1>` hota hi nahi**. Ye ek real on-page SEO bug hai (Google har page pe ek clear H1 expect karta hai).
- **UX:** Tool ke upar label + title + 1-line description user ko turant batata hai ki tool kya karta hai — ye standard tool-page pattern hai, remove karna UX downgrade hai.
- **Above-the-fold value:** Localized page pe below-content bahut neeche hota hai. Hero hi wo pehla (aur kabhi-kabhi ekmaatra above-the-fold) text hai jisme primary keyword aata hai. English rehne se `/de/` page top pe English dikhta hai — inconsistent.

### Recommendation — Item 2
**Rakho, lekin do improvements ke saath:**

1. **Hero heading ko `<h2>` se `<h1>` banao** (per page ek hi h1, primary keyword ke saath). Isse CMS/localized pages ka "no H1" wala SEO bug bhi fix ho jaata hai.
2. **Hero ko CMS me le aao** — bilkul wahi hybrid pattern jo below-content pe already chal raha hai. ToolContent collection me 3 localized fields add karo:
   - `heroLabel` (optional eyebrow, e.g. "AI TOOL")
   - `heroHeading` (→ `<h1>`)
   - `heroDescription` (→ `<p>`)
   Code fallback (abhi ka hardcoded hero) as-is default rahega jab CMS khaali ho — zero regression.

### Architectural catch (ise jaan lena zaroori hai)
Abhi hero har tool ke `page.tsx` (client component) ke **andar** hai. Localized route bhi wahi `<ToolPage/>` render karta hai. CMS hero feed karne ke liye hero ko page.tsx se bahar ek chhote **server component `ToolHero`** me nikaalna hoga (bilkul jaise `ToolContentSwitch` below-content ke liye alag hai), aur usko layout / localized-route me `<ToolPage/>` ke upar rakhna hoga.
- **Clean side-effect:** har tool ke page.tsx se duplicate hero JSX hat jaata hai (~84 files, but mechanical).
- **Phase kar sakte hain:** pehle `ToolHero` + CMS fields + localized route wiring (taaki `/de/` ko turant CMS/translated hero mile), phir tool-by-tool inline hero hataana.

---

## Combined Action Plan (phased, priority order)

### Phase A — Quick SEO fix (chhota, high-value, foundation)
- Har tool page pe exactly ek `<h1>` ensure karo. Hero heading ko `<h1>` bana do; below-content template ke andar `<h1>` mat rakho (wahan h2 sahi hai). **Ye akela hi CMS/localized pages ka missing-H1 bug fix kar deta hai.**
- **Risk:** low. **Impact:** direct SEO.

### Phase B — Chrome i18n (Item 1)
1. `next-intl` (ya lightweight custom `useTranslations`) set up + `messages/en.json` seed (English strings extract).
2. Header, footer, related-tools headings → dictionary se.
3. Nav/footer links → `localePath(locale, href)`.
4. Naya language add karna = ek naya `messages/<lang>.json`.
- **Risk:** medium (header/footer touch, par purely presentational). **Impact:** poori site multilingual dikhne lagti hai.

### Phase C — Hero → CMS hybrid (Item 2)
1. ToolContent me `heroLabel` / `heroHeading` / `heroDescription` (localized) add.
2. Server `ToolHero` component (CMS → fallback to code), English layout + `[locale]/[slug]` route me `<ToolPage/>` ke upar wire.
3. Tool-by-tool: inline hero page.tsx se hatao (incremental, no big-bang).
- **Risk:** medium (84-file mechanical cleanup, phased). **Impact:** hero fully translated + consistent hybrid model.

### Phase D (optional, baad me) — Related-tools card content
- B2: card descriptions ke liye CMS localized meta reuse. Tool names English hi. Low priority.

**Suggested order:** A → B → C → (D optional). A abhi turant karne layak hai (chhota + pure SEO win).

---

## Updated Issue List (ab tak sab, ek jagah)

| # | Issue | Type | Severity | Status / Plan |
|---|---|---|---|---|
| B-1 | Untranslated posts ke sidebar titles English fallback | Cosmetic | Minor | Expected (fallbackLocale) — no action |
| B-2 | RTL locales me root `<html dir>` set nahi | SEO/a11y | Minor | Known ("Phase 4") — noindex abhi |
| **N-1** | **Header/footer/nav translate nahi hote** | i18n | **Medium** | **Phase B** (dictionary) |
| **N-2** | **Nav/footer links locale prefix carry nahi karte** (`/de/` pe `/about` → English) | i18n/nav | **Medium** | **Phase B** (`localePath`) |
| **N-3** | **Above-tool hero (label/h1/p) hardcoded English** | i18n | **Medium** | **Phase C** (CMS hybrid) |
| **N-4** | **CMS/localized tool pages pe koi `<h1>` nahi** (hero h2, below-content h1 replace ho jaata) | **SEO** | **High** | **Phase A** (hero → h1) |
| N-5 | Related-tools heading + card names English | i18n | Low | Phase D (optional) |

> **N-4 sabse important hai** — chhota fix, direct SEO impact. Baaki teeno (N-1/2/3) ek hi root cause (shared English layout) ke alag-alag chehre hain.

---

## Aapse decision chahiye (implement karne se pehle)

1. **Chrome i18n library:** `next-intl` (recommended — Next 15 App Router ka de-facto standard, clean) ya bina library ke lightweight custom dictionary hook? (Main recommend karta hoon `next-intl`.)
2. **Related-tools card tool-names:** English hi rakhein (recommended) ya translate karna hai?
3. **Kaunsa phase pehle shuru karun?** Meri salah: **Phase A abhi** (chhota SEO fix), phir B, phir C.
