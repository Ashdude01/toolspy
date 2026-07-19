/**
 * Toolspy v2 — Minimal UI-string loader (zero dependencies)
 *
 * UI strings (buttons, labels, common headings) messages/{locale}.json me rehti hain.
 * Ye CODE ka hissa hain — page CONTENT (SEO text, descriptions) Phase 2 me
 * Payload CMS se aayega, yahan se nahi.
 *
 * Missing key ya missing locale → English fallback. Kabhi crash nahi hota.
 */

import { DEFAULT_LOCALE } from './locales'
import en from '@/messages/en.json'

export type Messages = Record<string, unknown>

// Har naye locale ki JSON file banao to yahan entry add karo.
const loaders: Record<string, () => Promise<{ default: Messages }>> = {
  en: () => import('@/messages/en.json') as Promise<{ default: Messages }>,
  de: () => import('@/messages/de.json') as Promise<{ default: Messages }>,
}

export async function getMessages(locale: string): Promise<Messages> {
  const load = loaders[locale] ?? loaders[DEFAULT_LOCALE]
  try {
    const mod = await load()
    return mod.default
  } catch {
    return en as Messages
  }
}

/** Dot-path lookup: t(messages, 'toolPage.howToUse') — missing par English, phir key. */
export function t(messages: Messages, key: string): string {
  const fromMessages = lookup(messages, key)
  if (fromMessages !== undefined) return fromMessages
  const fromEnglish = lookup(en as Messages, key)
  if (fromEnglish !== undefined) return fromEnglish
  return key
}

function lookup(obj: Messages, key: string): string | undefined {
  let current: unknown = obj
  for (const part of key.split('.')) {
    if (current && typeof current === 'object' && part in (current as object)) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return undefined
    }
  }
  return typeof current === 'string' ? current : undefined
}
