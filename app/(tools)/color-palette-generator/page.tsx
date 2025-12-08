"use client";

import { ColorPaletteGenerator } from '@/components/ColorPalette';
import { ColorPaletteGeneratorSEOContent } from './seo-content';
import { ToolPageWrapper } from '@/components/seo/tool-page-wrapper';
import { ToastProvider } from '@/components/tools/shared/toast-provider';

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolPageWrapper toolSlug="color-palette-generator">
      <ToastProvider>
        <ColorPaletteGenerator />
      </ToastProvider>
      <ColorPaletteGeneratorSEOContent />
    </ToolPageWrapper>
  );
}

