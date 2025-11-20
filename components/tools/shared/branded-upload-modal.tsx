'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';

interface BrandedUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // Duration in milliseconds
}

export function BrandedUploadModal({ 
  isOpen, 
  onClose, 
  duration = 2000 
}: BrandedUploadModalProps) {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const logoSrc = !mounted 
    ? '/logo/black.webp'
    : resolvedTheme === 'dark' 
    ? '/logo/white.webp' 
    : '/logo/black.webp';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-card border-2 border-primary/30 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300 ring-2 ring-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 animate-pulse">
            <Image
              src={logoSrc}
              alt="Toolspy"
              width={128}
              height={128}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Loading Spinner */}
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Uploading on Toolspy
              </h3>
              <p className="text-sm text-muted-foreground">
                Processing your images...
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
    </div>
  );
}

