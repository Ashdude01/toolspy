/**
 * Toolspy v2 — UI STRINGS dictionary (chrome/widgets ki multilingual strings).
 *
 * Ye "content" nahi hai — ye fixed interface labels hain (nav, footer, widget
 * headings). Isliye inhe CMS me nahi, yahan static dictionary me rakhte hain.
 *
 * Kaise kaam karta hai:
 *   - `en` = source of truth (saari keys yahan honi chahiye).
 *   - Baaki locales PARTIAL ho sakte hain — jo key missing hai wo apne aap
 *     English pe fall back kar jaati hai. Isliye nayi language add karna =
 *     bas ek naya locale object (jitna translate kiya utna), kuchh toota nahi.
 *
 * Naya language: niche `messages` me `xx: { ... }` add karo (DeepPartial allowed).
 *
 * NOTE: specific tool/product NAMES (e.g. "Image Compressor", "PDF Converter")
 * yahan translate NAHI karte — wo brand/product names hain, har bhasha me English
 * rehna standard hai. Sirf generic UI labels translate hote hain.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dict = { [key: string]: string | Dict }

/**
 * Partial locale overlay. Leaf strings must be `string` (not `as const` literals),
 * otherwise translations like "Über uns" fail assignability to "About".
 */
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string
    ? string
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K]
}

/** English — source of truth. Saari keys yahan present honi chahiye. */
export const en = {
  nav: {
    about: 'About',
    extensions: 'Extensions',
    tools: 'Tools',
    careers: 'Careers',
    contact: 'Contact',
    blog: 'Blog',
    digitalMarketing: 'Digital Marketing',
  },
  header: {
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    toggleTheme: 'Toggle theme',
  },
  common: {
    beta: 'Beta',
    comingSoon: 'Coming soon',
  },
  footer: {
    tagline:
      'Professional online tools for all your digital needs. Free, secure, and privacy-focused. Trusted by millions of users worldwide.',
    sections: {
      popularTools: 'Popular Tools',
      company: 'Company',
      legal: 'Legal',
      toolCategories: 'Tool Categories',
      moreCategories: 'More Categories',
    },
    links: {
      aboutUs: 'About Us',
      blog: 'Blog',
      digitalMarketing: 'Digital Marketing',
      contact: 'Contact',
      help: 'Help Center',
      feedback: 'Feedback',
      manageCookies: 'Manage Cookies',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer',
      dmca: 'DMCA Policy',
      cookiePolicy: 'Cookie Policy',
      gdpr: 'GDPR & CCPA',
    },
    badges: {
      privacyFirst: 'Privacy First',
      lightningFast: 'Lightning Fast',
      universalAccess: 'Universal Access',
    },
    copyright: 'All rights reserved.',
    systemsOperational: 'All systems operational',
    scrollToTop: 'Scroll to top',
  },
  relatedTools: {
    heading: 'More Helpful Tools You Might Like',
    description: 'Check out our other tools that work great together.',
  },
  blog: {
    latestArticles: 'Latest Articles',
    latestArticlesSubtitle:
      'Practical, data-backed guides for exams, GST, and everyday file tasks - each one paired with a free tool that does the work for you.',
    writtenByPrefix: 'Written by the',
    editorialTeam: 'Toolspy editorial team',
    recentArticles: 'Recent articles',
    featuredTools: 'Featured tools',
    browseAllTools: 'Browse all tools',
    tableOfContents: 'Table of Contents',
    share: 'Share',
    copyLink: 'Copy link',
    copied: 'Copied!',
    relatedReads: 'Related Reads',
    faqHeading: 'Frequently Asked Questions',
    home: 'Home',
    open: 'Open {name}',
    aboutPrefix: 'About',
  },
} as const

export type Messages = typeof en

/**
 * Locale → messages. `en` complete; baaki DeepPartial (missing keys → en fallback).
 * Priority order me German pehle — iske baad fr/es/etc. add karte jaana.
 */
export const messages: Record<string, DeepPartial<Messages>> = {
  en,
  de: {
    nav: {
      about: 'Über uns',
      extensions: 'Erweiterungen',
      tools: 'Tools',
      careers: 'Karriere',
      contact: 'Kontakt',
      blog: 'Blog',
      digitalMarketing: 'Digitales Marketing',
    },
    header: {
      menu: 'Menü',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      switchToLight: 'Zum hellen Modus wechseln',
      switchToDark: 'Zum dunklen Modus wechseln',
      toggleTheme: 'Design umschalten',
    },
    common: {
      beta: 'Beta',
      comingSoon: 'Demnächst',
    },
    footer: {
      tagline:
        'Professionelle Online-Tools für all deine digitalen Aufgaben. Kostenlos, sicher und datenschutzfreundlich. Von Millionen Nutzern weltweit genutzt.',
      sections: {
        popularTools: 'Beliebte Tools',
        company: 'Unternehmen',
        legal: 'Rechtliches',
        toolCategories: 'Tool-Kategorien',
        moreCategories: 'Weitere Kategorien',
      },
      links: {
        aboutUs: 'Über uns',
        blog: 'Blog',
        digitalMarketing: 'Digitales Marketing',
        contact: 'Kontakt',
        help: 'Hilfe-Center',
        feedback: 'Feedback',
        manageCookies: 'Cookies verwalten',
        privacy: 'Datenschutzerklärung',
        terms: 'Nutzungsbedingungen',
        disclaimer: 'Haftungsausschluss',
        dmca: 'DMCA-Richtlinie',
        cookiePolicy: 'Cookie-Richtlinie',
        gdpr: 'DSGVO & CCPA',
      },
      badges: {
        privacyFirst: 'Datenschutz zuerst',
        lightningFast: 'Blitzschnell',
        universalAccess: 'Universeller Zugriff',
      },
      copyright: 'Alle Rechte vorbehalten.',
      systemsOperational: 'Alle Systeme betriebsbereit',
      scrollToTop: 'Nach oben scrollen',
    },
    relatedTools: {
      heading: 'Weitere hilfreiche Tools, die dir gefallen könnten',
      description: 'Sieh dir unsere anderen Tools an, die super zusammenarbeiten.',
    },
    blog: {
      latestArticles: 'Neueste Artikel',
      latestArticlesSubtitle:
        'Praktische, datenbasierte Anleitungen für Prüfungen, GST und alltägliche Datei-Aufgaben – jede mit einem kostenlosen Tool, das die Arbeit für dich erledigt.',
      writtenByPrefix: 'Geschrieben vom',
      editorialTeam: 'Toolspy-Redaktionsteam',
      recentArticles: 'Neueste Artikel',
      featuredTools: 'Empfohlene Tools',
      browseAllTools: 'Alle Tools ansehen',
      tableOfContents: 'Inhaltsverzeichnis',
      share: 'Teilen',
      copyLink: 'Link kopieren',
      copied: 'Kopiert!',
      relatedReads: 'Weitere Beiträge',
      faqHeading: 'Häufig gestellte Fragen',
      home: 'Startseite',
      open: '{name} öffnen',
      aboutPrefix: 'Über',
    },
  },
}

function getPath(dict: Dict | DeepPartial<Messages> | undefined, key: string): string | undefined {
  if (!dict) return undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = dict
  for (const part of key.split('.')) {
    if (cur && typeof cur === 'object' && part in cur) {
      cur = cur[part]
    } else {
      return undefined
    }
  }
  return typeof cur === 'string' ? cur : undefined
}

/**
 * Ek key ko diye gaye locale me translate karo.
 * Missing locale ya missing key → English fallback → (last resort) key khud.
 * `vars` optional: "{name}" jaisi placeholders replace karta hai.
 */
export function translate(
  locale: string,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const localized = getPath(messages[locale], key)
  const fallback = getPath(en as unknown as Dict, key)
  let out = localized ?? fallback ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      out = out.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return out
}

/**
 * Server components ke liye: locale ek prop se aata hai (usePathname nahi chalta).
 *   const t = getT(locale)
 *   <h3>{t('relatedTools.heading')}</h3>
 */
export function getT(locale: string) {
  return (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars)
}
