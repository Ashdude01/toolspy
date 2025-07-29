import { Metadata } from 'next';
import { toolCategories, ToolCategory, getToolsByCategory } from '@/lib/tools-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CategoryToolsClient } from '@/components/tools/category-tools-client';

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Generate static paths for all categories
export async function generateStaticParams() {
  return Object.keys(toolCategories).map((category) => ({
    category: category,
  }));
}

// Generate metadata for category pages
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = params;
  
  // Check if category exists
  if (!toolCategories[category as ToolCategory]) {
    return {
      title: 'Category Not Found | Toolspy',
      description: 'The requested tool category was not found.'
    };
  }
  
  const categoryInfo = toolCategories[category as ToolCategory];
  const tools = getToolsByCategory()[category as ToolCategory] || [];
  
  return {
    title: `${categoryInfo.name} - Professional Tools | Toolspy`,
    description: `${categoryInfo.description}. Browse ${tools.length} free ${categoryInfo.name.toLowerCase()} on Toolspy.`,
    keywords: [categoryInfo.name.toLowerCase(), 'free tools', 'online utilities', 'professional tools'],
    openGraph: {
      title: `${categoryInfo.name} - Professional Tools | Toolspy`,
      description: `${categoryInfo.description}. Browse ${tools.length} free tools.`,
      type: 'website',
      url: `https://toolspy.com/tools/${category}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryInfo.name} - Professional Tools | Toolspy`,
      description: `${categoryInfo.description}. Browse ${tools.length} free tools.`,
    }
  };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = params;
  const searchQuery = typeof searchParams.search === 'string' ? searchParams.search : '';
  
  // Check if category exists
  if (!toolCategories[category as ToolCategory]) {
    notFound();
  }
  
  const categoryInfo = toolCategories[category as ToolCategory];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
              <li className="inline-flex items-center gap-1.5">
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Link href="/tools" className="transition-colors hover:text-foreground">
                  Tools
                </Link>
              </li>
              <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span role="link" aria-disabled="true" aria-current="page" className="font-normal text-foreground">
                  {categoryInfo.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Category Tools Section */}
      <CategoryToolsClient 
        category={category as ToolCategory} 
        initialSearchQuery={searchQuery}
      />
    </div>
  );
} 