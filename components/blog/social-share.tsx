'use client'

import { useState } from 'react'
import { Facebook, Linkedin, Link2, Check, Mail } from 'lucide-react'
import { useT } from '@/lib/i18n/use-t'

/** X (Twitter) glyph — lucide dropped the branded bird, so inline the current logo. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

interface SocialShareProps {
  url: string
  title: string
  className?: string
}

export function SocialShare({ url, title, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const t = useT()

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      name: t('blog.shareOnX'),
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon className="h-4 w-4" />,
    },
    {
      name: t('blog.shareOnFacebook'),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      name: t('blog.shareOnLinkedIn'),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      name: t('blog.shareByEmail'),
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground mr-1">{t('blog.share')}</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          title={link.name}
          className="inline-flex h-9 w-9  bg-muted items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label={t('blog.copyLink')}
        title={copied ? t('blog.copied') : t('blog.copyLink')}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
