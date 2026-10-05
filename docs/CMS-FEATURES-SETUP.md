# CMS Features Setup — Issue 1 (frontend updates) + Issue 2 (rich text)

## Kya aaya

**Issue 1 — Admin update main website par dikhega:**
Pehle English tool pages hardcoded `seo-content.tsx` render karte the — CMS se link hi nahi tha, isliye admin me update karne par main site par nahi dikhta tha. Ab har tool page CMS-aware hai: `contentSource='cms'` karo → CMS content dikhega (English + saari languages), warna existing hardcoded (default). Save karte hi `afterChange` hook revalidate karta hai → agli request par updated.

**Issue 2 — Rich text editor me full features:**
Sections ke body editor me ab: **Table, Image (upload), Video embed (YouTube/Vimeo)**, headings, lists, links, horizontal rule, alignment, fixed toolbar. Discuss kiye structure ke hisaab se images/tables/videos ab daal sakte ho.

---

## STEP 1 — Ek codemod chalao (89 tool layouts CMS-aware banata hai)

```bash
node scripts/make-tools-cms-aware.cjs
```

Ye saare `app/(site)/(frontend)/(tools)/*/layout.tsx` me 2-line change karta hai (idempotent — dobara chalana safe). Output me "changed: 89" dikhega. facebook-image-downloader + instagram-private-viewer skip honge (wo code par hi rahenge — sahi hai).

## STEP 2 — Schema sync + importMap (naye Media collection + editor features ke liye)

```bash
# .env me DATABASE_URL + PAYLOAD_SECRET hone chahiye
npx payload generate:importmap   # (main ne generate karke bhej diya hai, phir bhi safe)
npx payload generate:types
```

Dev mode me DB schema auto-push hota hai (Media table, customSchema column banenge). Agar migrations use karte ho: `npx payload migrate:create && npx payload migrate`.

## STEP 3 — Cache clear + test

```bash
rm -rf .next
yarn dev
```

**Test karo:**
1. Admin → Tool Content → koi tool → contentSource `cms` → sections me content daalo (Table/Image/Video try karo) → Save.
2. Main English page (e.g. `/gst-calculator/`) kholo → CMS content dikhega. Update karke Save karo → refresh → updated dikhega. ✅
3. `contentSource` wapas `code` → hardcoded content wapas.

---

## Images ke liye zaroori note (Vercel)

Media uploads abhi `public/media/` (local disk) me jaati hain — **local dev aur self-host (Hostinger VPS) par kaam karega**. Vercel serverless par local disk persist nahi hota, isliye Vercel deploy se pehle **Cloudflare R2 ya Vercel Blob** storage adapter add karna hoga. Bolna, main wire kar dunga (`@payloadcms/storage-s3` R2 ke liye — pehle discuss kiya tha).

Filhaal images ke liye Cloudinary URLs bhi richtext me daal sakte ho (jaisa existing content me hai).

---

## Issue 3 (blogs/posts CMS) — AGLA STEP

Blog articles ko CMS par lana bada kaam hai (11 existing articles migrate + tables/sections convert + blog frontend rewrite). Ye alag focused step me karunga taaki aap 1 & 2 pehle test kar sako. Posts collection already bana hua hai — usme content structure enhance karke, existing articles seed karke, aur blog pages ko CMS se padhne ke liye rewire karunga.
