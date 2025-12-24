"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Info, Lock } from "lucide-react";
import Link from "next/link";
import {
  saveConsent,
  type ConsentState,
  type ConsentCategory,
} from "@/lib/utils/consent";
import { updateConsentMode } from "@/lib/utils/consent-mode";

interface CookieConsentModalProps {
  onClose: (updatedConsent?: ConsentState) => void;
  initialConsent?: ConsentState;
}

const consentCategories: {
  key: ConsentCategory;
  title: string;
  description: string;
  required: boolean;
}[] = [
  {
    key: "necessary",
    title: "Necessary Cookies",
    description:
      "Essential cookies required for the website to function properly. These cannot be disabled.",
    required: true,
  },
  {
    key: "analytics",
    title: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    required: false,
  },
  {
    key: "ads",
    title: "Advertising Cookies",
    description:
      "Used to deliver personalized advertisements and track campaign performance. May be used to build a profile of your interests.",
    required: false,
  },
  {
    key: "personalization",
    title: "Personalization Cookies",
    description:
      "Allow the website to remember choices you make and provide enhanced, personalized features.",
    required: false,
  },
];

export function CookieConsentModal({
  onClose,
  initialConsent,
}: CookieConsentModalProps) {
  const [consent, setConsent] = useState<ConsentState>(
    initialConsent || {
      necessary: true,
      analytics: false,
      ads: false,
      personalization: false,
      timestamp: Date.now(),
      version: "1.0",
    }
  );

  const handleToggle = (category: ConsentCategory) => {
    if (category === "necessary") return; // Cannot disable necessary cookies

    setConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    saveConsent(consent, true);
    updateConsentMode(consent);
    onClose(consent);
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentState = {
      necessary: true,
      analytics: true,
      ads: true,
      personalization: true,
      timestamp: Date.now(),
      version: "1.0",
    };
    setConsent(allAccepted);
    saveConsent(allAccepted, true);
    updateConsentMode(allAccepted);
    onClose(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected: ConsentState = {
      necessary: true,
      analytics: false,
      ads: false,
      personalization: false,
      timestamp: Date.now(),
      version: "1.0",
    };
    setConsent(allRejected);
    saveConsent(allRejected, true);
    updateConsentMode(allRejected);
    onClose(allRejected);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        aria-describedby="cookie-modal-description"
      >
        <DialogHeader>
          <DialogTitle id="cookie-modal-title">
            Manage Cookie Preferences
          </DialogTitle>
          <DialogDescription id="cookie-modal-description">
            Choose which cookies you want to allow. You can change these
            settings at any time by clicking "Manage cookies" in the footer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {consentCategories.map((category) => (
            <div key={category.key} className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`consent-${category.key}`}
                      className="text-base font-semibold cursor-pointer"
                    >
                      {category.title}
                    </Label>
                    {category.required && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Lock className="h-3 w-3" aria-hidden="true" />
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <Switch
                  id={`consent-${category.key}`}
                  checked={consent[category.key]}
                  onCheckedChange={() => handleToggle(category.key)}
                  disabled={category.required}
                  aria-label={`${consent[category.key] ? "Disable" : "Enable"} ${category.title}`}
                />
              </div>
              {category.key !== "personalization" && <Separator />}
            </div>
          ))}
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">
                For more information about how we use cookies and your data,
                please read our{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy#cookies"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleRejectAll}
            className="flex-1"
          >
            Reject All
          </Button>
          <Button
            variant="outline"
            onClick={handleAcceptAll}
            className="flex-1"
          >
            Accept All
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

