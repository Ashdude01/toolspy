import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('base64-encoder-decoder');
  if (!tool) {
    return {
      title: 'Base64 Encoder/Decoder - Toolspy',
      description: 'Encode and decode text to/from Base64 format',
    };
  }
  return generateToolMetadata(tool);
}

export default function Base64EncoderDecoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 