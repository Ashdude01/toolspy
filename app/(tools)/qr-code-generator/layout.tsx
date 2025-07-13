import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('qr-code-generator');
  if (!tool) {
    return {
      title: 'QR Code Generator - Toolspy',
      description: 'Generate QR codes for text, URLs, and more',
    };
  }
  return generateToolMetadata(tool);
}

export default function QrCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 