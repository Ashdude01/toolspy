"use client";

import { useEffect, useState } from "react";
import { CookieConsentBanner } from "./cookie-consent-banner";
import {
  getConsentState,
  loadConsent,
  getUserRegion,
  isEEARegion,
  type ConsentState,
} from "@/lib/utils/consent";
import { initializeConsentMode, updateConsentMode } from "@/lib/utils/consent-mode";

interface ConsentProviderProps {
  children: React.ReactNode;
  region?: string | null; // Passed from server-side geo-detection
}

/**
 * Consent Provider Component
 * Initializes consent mode and manages consent state
 * Should wrap the app in layout.tsx
 */
export function ConsentProvider({
  children,
  region,
}: ConsentProviderProps) {
  const [consentInitialized, setConsentInitialized] = useState(false);

  useEffect(() => {
    // Initialize consent mode before any Google tags load
    const stored = loadConsent();
    let initialConsent: ConsentState;

    if (stored && stored.hasConsented) {
      initialConsent = stored.consent;
    } else {
      // Use region from props or try to detect
      const userRegion = region || getUserRegion();
      initialConsent = getConsentState(userRegion);
    }

    // Initialize Google Consent Mode v2
    initializeConsentMode(initialConsent);

    // Update consent mode if it was already set
    if (stored && stored.hasConsented) {
      updateConsentMode(initialConsent);
    }

    setConsentInitialized(true);
  }, [region]);

  // Don't render children until consent is initialized
  // This ensures consent mode is set before any scripts load
  if (!consentInitialized) {
    return null;
  }

  return (
    <>
      {children}
      <CookieConsentBanner />
    </>
  );
}

