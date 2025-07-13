import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('color-picker');
  if (!tool) {
    return {
      title: 'Color Picker - Toolspy',
      description: 'Pick colors and get hex, RGB, HSL values',
    };
  }
  return generateToolMetadata(tool);
}

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 