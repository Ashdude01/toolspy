import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('heic-to-pdf');
  if (!tool) {
    return {
      title: 'HEIC to PDF Converter - Toolspy',
      description: 'Convert HEIC images to PDF documents with high quality',
    };
  }
  return generateToolMetadata(tool);
}

export default function HeicToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 