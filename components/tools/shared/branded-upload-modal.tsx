'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export interface BrandedUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // Duration in milliseconds (default: 2000)
  /** When false, modal stays open until `isOpen` becomes false (e.g. long URL imports). */
  autoClose?: boolean;
  /** When false, clicking the backdrop does not close the modal. */
  allowBackdropClose?: boolean;
  message?: string; // Custom message (default: "Uploading on Toolspy")
  subMessage?: string; // Custom sub-message (default: "Processing your files...")
  // Ad placement zones (for future use)
  adSlotTop?: React.ReactNode;
  adSlotBottom?: React.ReactNode;
  adSlotLeft?: React.ReactNode;
  adSlotRight?: React.ReactNode;
}

export function BrandedUploadModal({
  isOpen,
  onClose,
  duration = 2000,
  autoClose = true,
  allowBackdropClose = true,
  message = 'Uploading on Toolspy',
  subMessage = 'Processing your files...',
  adSlotTop,
  adSlotBottom,
  adSlotLeft,
  adSlotRight
}: BrandedUploadModalProps) {
  // Auto-close modal after duration (skipped when autoClose is false)
  useEffect(() => {
    if (!isOpen || !autoClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose, autoClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={() => allowBackdropClose && onClose()}
    >
      {/* Ad Slot - Top */}
      {adSlotTop && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          {/* <div className="a_ads_container">
                <div
                  id="frame"
                  style={{
                    width: "100%",
                    margin: "auto",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <iframe
                    data-aa="2419400"
                    src="//acceptable.a-ads.com/2419400/?size=Adaptive"
                    style={{
                      border: 0,
                      padding: 0,
                      width: "70%",
                      height: "auto",
                      overflow: "hidden",
                      display: "block",
                      margin: "auto",
                    }}
                  ></iframe>
                </div>
              </div> */}
        </div>
      )}

      {/* Ad Slot - Left */}
      {adSlotLeft && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
          {adSlotLeft}
        </div>
      )}

      {/* Ad Slot - Right */}
      {adSlotRight && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
          {adSlotRight}
        </div>
      )}

      {/* Main Modal Content */}
      <div 
        className="bg-card border-2 border-primary/30 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300 ring-2 ring-primary/10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Logo — Tailwind dark: matches html.dark (next-themes); avoids wrong asset on first paint */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 animate-pulse">
            <Image
              src="/logo/black.webp"
              alt="Toolspy"
              width={128}
              height={128}
              className="h-full w-full object-contain dark:hidden"
              priority
            />
            <Image
              src="/logo/white.webp"
              alt="Toolspy"
              width={128}
              height={128}
              className="hidden h-full w-full object-contain dark:block"
              priority
            />
          </div>

          {/* Loading Spinner */}
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {message}
              </h3>
              <p className="text-sm text-muted-foreground">
                {subMessage}
              </p>
            </div>
          </div>

          {/* Branding Text */}
          <div className="pt-4 border-t border-border w-full text-center">
            <p className="text-xs text-muted-foreground">
              Powered by <span className="font-semibold text-primary">Toolspy</span>
            </p>
          </div>
        </div>
      </div>

      {/* Ad Slot - Bottom */}
      {adSlotBottom && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          {/* <div className="a_ads_container">
                <div
                  id="frame"
                  style={{
                    width: "100%",
                    margin: "auto",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <iframe
                    data-aa="2419400"
                    src="//acceptable.a-ads.com/2419400/?size=Adaptive"
                    style={{
                      border: 0,
                      padding: 0,
                      width: "70%",
                      height: "auto",
                      overflow: "hidden",
                      display: "block",
                      margin: "auto",
                    }}
                  ></iframe>
                </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
