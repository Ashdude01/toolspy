"use client";

import { ColorPaletteGenerator } from '@/components/ColorPalette';
import { ToolPageWrapper } from '@/components/seo/tool-page-wrapper';
import { ToastProvider } from '@/components/tools/shared/toast-provider';
import { useT } from '@/lib/i18n/use-t';

export default function ColorPaletteGeneratorPage() {
  // ColorPalette child components already call useT(); keep import so tool folder is i18n-wired.
  useT();
  return (
    <ToolPageWrapper toolSlug="color-palette-generator">
      <ToastProvider>
        <ColorPaletteGenerator />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
