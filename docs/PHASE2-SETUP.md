# Toolspy v2 — Phase 2 Setup: Next 15 + Payload CMS

**Branch:** `toolspy_v2` (pehle verify: `git branch --show-current`)
**Kya milega:** Payload 3 admin panel `/admin` par, `tool-content` collection (16 languages), coast-fire-style content template, on-demand ISR

⚠️ **Order EXACTLY follow karo** — har step ka apna checkpoint hai. Kahin stuck ho to wahi rukna, aage mat badhna.

---

## STEP 0 — Pre-flight

```bash
git branch --show-current     # → toolspy_v2 hona chahiye
git status                    # → clean hona chahiye (Phase 1 committed)
node -v                       # → 18.18+ chahiye; 20 LTS best (nvm use 20)
```

Nayi files jo is batch me aayi hain (git status me dikhengi):
`payload.config.ts`, `collections/`, `lib/payload/`, `lib/i18n/tool-slugs.ts`,
`components/i18n/tool-seo-content-template.tsx`, `app/(payload)/`, `next.config.mjs`,
`scripts/seed-tool-content.ts`, `.env.example`, updated `tsconfig.json` + `app/[locale]/*`

**Pehla commit (upgrade se pehle, taaki rollback point rahe):**
```bash
git add -A
git commit -m "feat(cms): Phase 2 files - payload config, collections, template, next15-ready locale routes"
```

---

## STEP 1 — Next.js 14 → 15 Upgrade

```bash
# Official codemod — deps update + async params codemod sab karta hai
npx @next/codemod@canary upgrade 15.4

# Ya manually:
# npm i next@15.4 react@19 react-dom@19
# npm i -D eslint-config-next@15.4 @types/react@19 @types/react-dom@19
# npx @next/codemod@latest next-async-request-api .
```

**Codemod ke baad ye 3 cheezein check/karni hain:**

1. **Purani config file hatao** (nayi `next.config.mjs` already aa gayi hai):
   ```bash
   git rm next.config.js
   ```

2. **package.json engines** update: `"node": ">=18.18.0"`

3. **Build chalao aur errors fix karo:**
   ```bash
   npm run build
   ```
   Common Next-15 issues is codebase me:
   - `params`/`searchParams` sync access → codemod ne await me convert kiya hoga; jo chhoot jaye usme error message file+line dega — `const { x } = await params` pattern lagao
   - `useSearchParams()` pages already Suspense me wrapped hain (layouts me) — OK
   - Route handlers (`app/api/*`) — Next 15 me GET default uncached hai; aapke API routes waise bhi dynamic hain — OK
   - Agar `fetch` caching warnings aayen — ignore for now

**✅ CHECKPOINT 1:** `npm run build` green + `npm run dev` par English site normal chalti hai. Commit:
```bash
git add -A && git commit -m "chore: upgrade to Next 15.4 + React 19"
```

---

## STEP 2 — Payload Install

```bash
npm i payload@3.86.0 @payloadcms/next@3.86.0 @payloadcms/db-postgres@3.86.0 @payloadcms/richtext-lexical@3.86.0 @payloadcms/ui@3.86.0 graphql
```

(Versions pinned hain taaki sab match karein — Payload me sab @payloadcms/* packages ka same version zaroori hai.)

package.json scripts me add karo:
```json
"generate:importmap": "payload generate:importmap",
"generate:types": "payload generate:types",
"payload": "payload"
```

---

## STEP 3 — Database (Neon free)

1. https://neon.tech → sign up → new project (region: Singapore/Frankfurt — jo bhi paas ho)
2. Connection string copy karo
3. `.env` file banao repo root me (`.env.example` dekho):
   ```
   DATABASE_URL=postgresql://...neon.tech/neondb?sslmode=require
   PAYLOAD_SECRET=<node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
   ```
4. Vercel dashboard me bhi yehi 2 env vars add karo (Production + Preview)

> `.env` gitignored hai (`.gitignore` me `.env` already hai) — secrets kabhi commit nahi honge.

---

## STEP 4 — Import Map + Types Generate

```bash
npm run generate:importmap    # app/(payload)/admin/importMap.js regenerate hota hai
npm run generate:types        # payload-types.ts banta hai
```

---

## STEP 5 — First Run + Admin User

```bash
npm run dev
```

- `http://localhost:3000/admin` kholo → first-user create form aayega → apna email/password banao
- Login ke baad: **Tool Content, Posts, Pages, Users** collections dikhengi
- Pehli baar DB me tables auto-create hote hain (dev mode me push enabled hai)

**✅ CHECKPOINT 2:** Admin panel khul raha hai, login ho gaya.

---

## STEP 6 — Seed (90 tools ki entries)

```bash
npx payload run scripts/seed-tool-content.ts
```

- Har tool ki entry banegi `contentSource: 'code'` ke saath → **website par ZERO change**
- metaTitle/metaDescription English me tools-data.ts se seed hote hain
- Dobara chalana safe hai (existing skip hota hai)

**✅ CHECKPOINT 3:** Admin me Tool Content collection me 90 entries.

---

## STEP 7 — End-to-End CMS Test (1 tool par)

1. Admin → Tool Content → `age-calculator` kholo
2. Locale switcher (top right) → **German** select karo
3. 2-3 sections bharo (anchorId: `introduction`, heading: `Einführung`, body: kuch text) + 1-2 FAQs
4. **contentSource → 'cms'** karo → Save
5. `http://localhost:3000/de/age-calculator/` kholo:
   - Tool wahi English UI me chalega (expected — tool UI translation Phase 3)
   - Neeche SEO content **German me, coast-fire wale layout me** (left TOC, right article)
6. Wapas contentSource → 'code' karo → page wapas English content dikhayega
7. English page `http://localhost:3000/age-calculator/` — **bilkul unchanged**

**✅ CHECKPOINT 4:** Ye flow kaam kar raha hai = Phase 2 core complete.

```bash
npm run build   # final verification
git add -A && git commit -m "feat(cms): payload wired - admin, seed, cms-aware locale routes"
git push
```

---

## STEP 8 — Vercel Deploy Check

- `toolspy_v2` ka preview deployment already banta hai — env vars (STEP 3.4) ke baad redeploy karo
- Preview URL par `/admin` khol kar login test karo
- **Production (main) par ab bhi kuchh deploy nahi hua — main untouched hai**

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Module not found: @payload-config` | tsconfig.json me path hai — editor/TS server restart karo |
| Admin panel blank / component errors | `npm run generate:importmap` phir `rm -rf .next` phir dev |
| `PAYLOAD_SECRET missing` | `.env` repo root me hai? (`.env.local` nahi — payload `.env` padhta hai; dono rakh sakte ho) |
| DB connect error | Neon string me `?sslmode=require` hai? Neon project suspended to first request slow hota hai — retry |
| Build me `tool-content fetch failed` warnings | DATABASE_URL build env me nahi hai — Vercel env vars check karo. (Warning ke saath bhi build pass hota hai — code fallback) |
| React 19 peer-dep warnings (radix etc.) | `npm i --legacy-peer-deps` use karo agar install rukta hai |

---

## Kya NAHI badla (guarantees)

- English URLs + English pages — zero change
- Tool logic/scripts — zero change
- facebook-image-downloader — `contentSource: 'code'` par hai; layout/content untouched
- main branch — untouched
- Middleware ab bhi nahi hai — SSG + on-demand ISR only

## Agla (Phase 3, jab bolo)

German content pipeline (DeepL seed → review → publish), `PUBLISHED_LOCALES = ['de']`,
language switcher header me wire, localized sitemap, blog/pages frontend wiring.
