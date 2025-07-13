import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('pdf-converter');
  if (!tool) {
    return {
      title: 'PDF Converter - Toolspy',
      description: 'Convert PDFs to various formats and vice versa',
    };
  }
  return generateToolMetadata(tool);
}

export default function PdfConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 