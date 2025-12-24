/**
 * Google Consent Mode v2 Integration
 * Maps our consent categories to Google Consent Mode parameters
 */

import type { ConsentState } from './consent';

declare global {
  interface Window {
    gtag?: (
      command: 'consent' | 'event' | 'config' | 'set' | 'get',
      action: 'default' | 'update' | string,
      params?: Record<string, any>
    ) => void;
    // dataLayer is already declared in types/gtm.d.ts
  }
}

/**
 * Map our consent categories to Google Consent Mode v2 parameters
 */
export function mapConsentToGoogleMode(consent: ConsentState): Record<string, string> {
  return {
    // Analytics storage
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    
    // Ad storage (cookies for advertising)
    ad_storage: consent.ads ? 'granted' : 'denied',
    
    // Ad user data (sending user data to Google for advertising)
    ad_user_data: consent.ads ? 'granted' : 'denied',
    
    // Ad personalization (personalized ads)
    ad_personalization: consent.personalization ? 'granted' : 'denied',
    
    // Personalization storage (cookies for personalization)
    personalization_storage: consent.personalization ? 'granted' : 'denied',
    
    // Functionality storage (cookies for functionality)
    functionality_storage: 'granted', // Usually always granted
    
    // Security storage (cookies for security)
    security_storage: 'granted', // Always granted
  };
}

/**
 * Set default consent mode (must be called before any Google tags load)
 */
export function setDefaultConsentMode(consent: ConsentState): void {
  if (typeof window === 'undefined' || !window.gtag) {
    // Initialize gtag if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer!.push(arguments);
    };
  }

  const consentParams = mapConsentToGoogleMode(consent);
  
  window.gtag('consent', 'default', {
    ...consentParams,
    wait_for_update: 500, // Wait 500ms for consent update
  });
}

/**
 * Update consent mode (call when user changes consent)
 */
export function updateConsentMode(consent: ConsentState): void {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('gtag not available for consent update');
    return;
  }

  const consentParams = mapConsentToGoogleMode(consent);
  
  window.gtag('consent', 'update', consentParams);
}

/**
 * Initialize consent mode on page load
 * This should be called in the <head> before any Google tags
 */
export function initializeConsentMode(consent: ConsentState): void {
  // Set default consent before any tags load
  setDefaultConsentMode(consent);
}

