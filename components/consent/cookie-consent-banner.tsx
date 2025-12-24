"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings } from "lucide-react";
import Link from "next/link";
import {
  isConsentRequired,
  getDefaultConsent,
  saveConsent,
  type ConsentState,
} from "@/lib/utils/consent";
import { updateConsentMode } from "@/lib/utils/consent-mode";
import { CookieConsentModal } from "./cookie-consent-modal";

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if consent is required
    if (isConsentRequired()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: true,
      ads: true,
      personalization: true,
      timestamp: Date.now(),
      version: "1.0",
    };
    
    saveConsent(consent, true);
    updateConsentMode(consent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: false,
      ads: false,
      personalization: false,
      timestamp: Date.now(),
      version: "1.0",
    };
    
    saveConsent(consent, true);
    updateConsentMode(consent);
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleModalClose = (updatedConsent?: ConsentState) => {
    setShowModal(false);
    if (updatedConsent) {
      setShowBanner(false);
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg p-4 md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 id="cookie-consent-title" className="text-lg font-semibold">
                  Cookie Preferences
                </h3>
              </div>
              <p
                id="cookie-consent-description"
                className="text-sm text-muted-foreground"
              >
                We use cookies to enhance your browsing experience, analyze site
                traffic, and personalize content. By clicking "Accept All", you
                consent to our use of cookies. You can also customize your
                preferences or reject non-essential cookies.{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="flex-1 md:flex-initial"
              >
                Reject All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCustomize}
                className="flex-1 md:flex-initial"
              >
                <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                Customize
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 md:flex-initial"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <CookieConsentModal
          onClose={handleModalClose}
          initialConsent={getDefaultConsent()}
        />
      )}
    </>
  );
}

