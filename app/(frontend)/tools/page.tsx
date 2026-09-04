import { Metadata } from 'next';
import { ToolsSection } from '@/components/tools/tools-section';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Suspense } from 'react';
import { limitTitle, limitDescription } from '@/lib/utils/seo';

export const metadata: Metadata = {
  title: limitTitle('All Tools - Professional Online Utilities | Toolspy'),
  description: limitDescription('Browse all free online tools available on Toolspy. Find image compression, PDF conversion, calculators, Base64 encoding, and more professional utilities.'),
  keywords: ['online tools', 'free utilities', 'web tools', 'image tools', 'pdf tools', 'calculators', 'converters'],
  openGraph: {
    title: limitTitle('All Tools - Professional Online Utilities | Toolspy'),
    description: limitDescription('Browse all free online tools available on Toolspy. Professional-grade utilities for every digital task.'),
    type: 'website',
    url: 'https://toolspy.net/tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: limitTitle('All Tools - Professional Online Utilities | Toolspy'),
    description: limitDescription('Browse all free online tools available on Toolspy. Professional-grade utilities for every digital task.'),
  },
  alternates: {
    canonical: 'https://toolspy.net/tools',
  },
};

function ToolsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export const dynamic = 'force-static';

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Tools</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/*
        Tools Section — NO searchQuery prop pass karo.
        Prop pass karne se (khali string bhi) ToolsSection ka `?search` URL-read
        effect skip ho jata tha. Prop chhodne par wo URL se `?search` padhega →
        /tools/?search=pdf par sirf related tools dikhenge (client-side filter).
      */}
      <Suspense fallback={<ToolsPageSkeleton />}>
        <ToolsSection />
      </Suspense>
    </div>
  );
}
