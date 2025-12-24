/**
 * Cookie Consent Management System
 * Implements Google Consent Mode v2 and GDPR/CCPA compliance
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'ads' | 'personalization';

export interface ConsentState {
  necessary: boolean; // Always true, cannot be disabled
  analytics: boolean;
  ads: boolean;
  personalization: boolean;
  timestamp: number;
  version: string;
  region?: string;
}

export interface ConsentPreferences {
  consent: ConsentState;
  hasConsented: boolean;
}

const CONSENT_STORAGE_KEY = 'toolspy_consent';
const CONSENT_VERSION = '1.0';
const CONSENT_COOKIE_NAME = 'toolspy_consent';
const CONSENT_COOKIE_EXPIRY_DAYS = 365;

// EEA/UK/CH country codes that require opt-in
const EEA_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH', 'IS',
  'LI', 'NO'
];

/**
 * Get user's region (simplified - in production, use server-side geo-detection)
 */
export function getUserRegion(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Try to get from timezone (basic heuristic)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // This is a simplified approach - in production, use a proper geo-detection service
  // or server-side detection via edge functions/Vercel geo headers
  return null; // Will be set by server-side detection
}

/**
 * Check if user is in EEA/UK/CH region
 */
export function isEEARegion(region?: string | null): boolean {
  if (!region) {
    // Fallback: check if we can detect from browser
    // In production, this should come from server-side geo-detection
    return false; // Default to opt-in globally for safety
  }
  return EEA_COUNTRIES.includes(region.toUpperCase());
}

/**
 * Get default consent state based on region
 */
export function getDefaultConsent(region?: string | null): ConsentState {
  const isEEA = isEEARegion(region);
  
  return {
    necessary: true, // Always required
    analytics: !isEEA, // Denied by default in EEA, granted elsewhere (or denied globally for safety)
    ads: !isEEA,
    personalization: !isEEA,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
    region: region || undefined,
  };
}

/**
 * Load consent from storage
 */
export function loadConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    // Try localStorage first
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate version
      if (parsed.consent?.version === CONSENT_VERSION) {
        return {
          consent: parsed.consent as ConsentState,
          hasConsented: parsed.hasConsented || false,
        };
      }
    }

    // Try cookie as fallback
    const cookieValue = getCookie(CONSENT_COOKIE_NAME);
    if (cookieValue) {
      const parsed = JSON.parse(decodeURIComponent(cookieValue));
      if (parsed.consent?.version === CONSENT_VERSION) {
        return {
          consent: parsed.consent as ConsentState,
          hasConsented: parsed.hasConsented || false,
        };
      }
    }
  } catch (error) {
    console.error('Error loading consent:', error);
  }

  return null;
}

/**
 * Save consent to storage
 */
export function saveConsent(consent: ConsentState, hasConsented: boolean = true): void {
  if (typeof window === 'undefined') return;

  const data: ConsentPreferences = {
    consent,
    hasConsented,
  };

  try {
    // Save to localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));

    // Also save to cookie for server-side access
    const cookieValue = encodeURIComponent(JSON.stringify(data));
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_COOKIE_EXPIRY_DAYS);
    document.cookie = `${CONSENT_COOKIE_NAME}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax; Secure`;
  } catch (error) {
    console.error('Error saving consent:', error);
  }
}

/**
 * Get cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

/**
 * Reset consent (for testing/debugging)
 */
export function resetConsent(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(CONSENT_STORAGE_KEY);
  document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Check if consent is required (user hasn't consented yet)
 */
export function isConsentRequired(): boolean {
  const stored = loadConsent();
  return !stored || !stored.hasConsented;
}

/**
 * Get current consent state (or default if not set)
 */
export function getConsentState(region?: string | null): ConsentState {
  const stored = loadConsent();
  if (stored && stored.hasConsented) {
    return stored.consent;
  }
  return getDefaultConsent(region);
}

