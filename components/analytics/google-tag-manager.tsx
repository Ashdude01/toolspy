'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { siteConfig } from '@/lib/config'
import { loadConsent, getConsentState } from '@/lib/utils/consent'

interface GTMProps {
  gtmId?: string
}

export function GoogleTagManager({ gtmId }: GTMProps) {
  const gtmIdToUse = gtmId || siteConfig.analytics.gtmId
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Check consent before loading GTM
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      
      // Check if analytics consent is granted
      const stored = loadConsent()
      const consent = stored?.consent || getConsentState()
      
      // Only load GTM if analytics or ads consent is granted
      // (GTM may contain analytics/ads tags)
      if (consent.analytics || consent.ads) {
        setShouldLoad(true)
        
        // Push initial GTM config
        window.dataLayer.push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        })
      } else {
        // Consent not granted - don't load GTM
        console.log('GTM not loaded: Analytics/Ads consent not granted')
      }
    }
  }, [])

  // Don't render if no GTM ID is provided or consent not granted
  if (!gtmIdToUse || !siteConfig.analytics.enableAnalytics || !shouldLoad) {
    return null
  }

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmIdToUse}');
          `,
        }}
      />
    </>
  )
}

export function GoogleTagManagerNoScript({ gtmId }: GTMProps) {
  const gtmIdToUse = gtmId || siteConfig.analytics.gtmId

  // Don't render if no GTM ID is provided
  if (!gtmIdToUse || !siteConfig.analytics.enableAnalytics) {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmIdToUse}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    })
  }
}

// Helper function to track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_location: url,
      page_title: title || document.title
    })
  }
}

// Helper function to track tool usage
export const trackToolUsage = (toolName: string, action: string, additionalData?: Record<string, any>) => {
  trackEvent('tool_usage', {
    tool_name: toolName,
    action: action,
    ...additionalData
  })
}

// Helper function to track file operations
export const trackFileOperation = (operation: string, fileType?: string, fileSize?: number) => {
  trackEvent('file_operation', {
    operation: operation,
    file_type: fileType,
    file_size: fileSize
  })
}