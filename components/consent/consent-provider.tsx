"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    // Initialize consent mode (ConsentInitScript sets default; here we apply stored/region)
    const stored = loadConsent();
    let initialConsent: ConsentState;

    if (stored && stored.hasConsented) {
      initialConsent = stored.consent;
    } else {
      const userRegion = region || getUserRegion();
      initialConsent = getConsentState(userRegion);
    }

    initializeConsentMode(initialConsent);
    if (stored && stored.hasConsented) {
      updateConsentMode(initialConsent);
    }
  }, [region]);

  // Always render children so the server can emit full HTML (SEO / View Source).
  // ConsentInitScript runs beforeInteractive in layout; consent mode is updated in useEffect.
  return (
    <>
      {children}
      <CookieConsentBanner />
    </>
  );
}

