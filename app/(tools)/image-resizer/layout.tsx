import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('image-resizer');
  if (!tool) {
    return {
      title: 'Image Resizer - Toolspy',
      description: 'Resize images to specific dimensions or percentages',
    };
  }
  return generateToolMetadata(tool);
}

export default function ImageResizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 