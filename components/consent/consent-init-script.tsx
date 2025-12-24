/**
 * Consent Mode Initialization Script
 * This must be loaded in the <head> BEFORE any Google tags
 * It sets default consent mode to prevent non-consented tracking
 */

import Script from "next/script";
import { getConsentState, getUserRegion } from "@/lib/utils/consent";
import { mapConsentToGoogleMode } from "@/lib/utils/consent-mode";

export function ConsentInitScript() {
  // Default: denied for non-essential (safe default for SSR)
  // The script will check localStorage on the client side
  const defaultConsent = {
    necessary: true,
    analytics: false,
    ads: false,
    personalization: false,
    timestamp: Date.now(),
    version: "1.0",
  };

  const consentParams = mapConsentToGoogleMode(defaultConsent);

  return (
    <Script
      id="consent-mode-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Initialize dataLayer and gtag if they don't exist
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            // Try to load stored consent
            var storedConsent = null;
            try {
              var stored = localStorage.getItem('toolspy_consent');
              if (stored) {
                var parsed = JSON.parse(stored);
                if (parsed.consent && parsed.consent.version === '1.0' && parsed.hasConsented) {
                  storedConsent = parsed.consent;
                }
              }
            } catch (e) {
              // Fallback to default
            }
            
            // Use stored consent if available, otherwise use default (denied)
            var consentParams = storedConsent ? {
              analytics_storage: storedConsent.analytics ? 'granted' : 'denied',
              ad_storage: storedConsent.ads ? 'granted' : 'denied',
              ad_user_data: storedConsent.ads ? 'granted' : 'denied',
              ad_personalization: storedConsent.personalization ? 'granted' : 'denied',
              personalization_storage: storedConsent.personalization ? 'granted' : 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted'
            } : {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              personalization_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted'
            };
            
            // Set default consent mode BEFORE any tags load
            gtag('consent', 'default', Object.assign({}, consentParams, {
              wait_for_update: 500
            }));
          })();
        `,
      }}
    />
  );
}

