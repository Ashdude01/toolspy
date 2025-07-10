# 📌 Project Requirements for Online Tools Website (Next.js) – Phase 1

## 🎯 Objective (Phase 1)

Build the **homepage** of a browser-based online tools web app using **Next.js** with an emphasis on **scalable structure, SEO, responsiveness, backend setup**, and **UI built using `shadcn/ui` + Tailwind CSS**. No user authentication features will be included at this stage. Deployment will be handled later manually.

---

## 🛠️ Cursor AI Prompt (Phase 1)

> Build a scalable, secure homepage for a browser-based online tools website using **Next.js (App Router)**. Focus on structure, SEO, performance, and responsiveness. Do **not** include any user login/signup features. Use **shadcn/ui** + **Tailwind CSS** for reusable components and styling. Include the following:

---

### 🧱 Project Architecture & Folder Structure

- Use **Next.js 14 App Router**
- Ensure **future scalability**
- Recommended folder structure:

```bash
/app
  /tools
    /[toolSlug]
    /layout.tsx
  /about
  /contact
  /api
/components
  /ui           ← shadcn/ui components
  /layout
  /cards
/lib
/utils
/hooks
/config
/public
/styles
/middleware

Use Tailwind CSS + PostCSS

Use shadcn/ui for accessible, customizable UI components

Enable dark mode using Tailwind’s dark variant (media-based toggle or class)

🌍 Homepage Functionality
Dynamically list tools grouped by category:

🖼️ Image Tools

📄 PDF Tools

🧮 Calculators

🔤 Base64 Converters

🧰 Misc Tools (placeholder)

Each category displays a responsive grid of tool cards using shadcn card component

Cards link to: /tools/[toolSlug] (placeholder pages)

Include a search bar (use shadcn/input and shadcn/command for enhanced UX)

Fully mobile-first and responsive

⚙️ Backend Setup
Create /api/tools endpoint or load from tools.json

Each tool includes:

name

slug

category

icon

description (optional)

Keep backend logic light but modular and extendable

🔐 Security (Base-Level)
Add CSP headers

Set up middleware for:

API rate limiting (placeholder)

Secure headers (Strict-Transport-Security, etc.)

No authentication or account management

🌐 SEO Foundations
Use Next.js Metadata API

Add:

title, description, og:image, twitter:card

Setup robots.txt, sitemap.xml, and manifest.json

Ensure semantic HTML and good accessibility

📱 UI/UX & Layout
Use shadcn/ui + Tailwind for:

Buttons

Cards

Inputs

Sections

Modals (if needed)

Build reusable layout components:

Header (site name + nav)

Search bar

Categorized sections

Footer (Company, Tools, Support)

Add dark mode toggle

Fully responsive design

🧪 Optional (Foundational Practices)
TypeScript interfaces for Tool, Category

ESLint + Prettier config

Modular utility and component design

Add PWA base shell (manifest + service worker)