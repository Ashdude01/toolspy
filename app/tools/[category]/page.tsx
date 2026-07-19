import { Metadata } from 'next';
import { toolCategories, ToolCategory, getToolsByCategory } from '@/lib/tools-data';
import { limitTitle, limitDescription } from '@/lib/utils/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CategoryToolsClient } from '@/components/tools/category-tools-client';
import StaticPageSchema from '@/components/seo/StaticPageSchema';
import { CategorySEOContent } from '@/components/seo/category-seo-content';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  // Get categories directly from toolCategories to ensure consistency
  const categories = Object.keys(toolCategories) as ToolCategory[];
  
  // Generate params for each category
  const params = categories.map((category) => ({
    category: category,
  }));
  
  return params;
}

// For static export, we need to handle all possible routes
// This tells Next.js to only generate the routes we specify
export const dynamicParams = false;

// Generate metadata for category pages
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  
  try {
    // Check if category exists and is valid
    const validCategories = Object.keys(toolCategories) as ToolCategory[];
    const isValidCategory = validCategories.includes(category as ToolCategory);
    
    if (!isValidCategory) {
      return {
        title: '404 - Page Not Found | Toolspy',
        description: 'The page you are looking for does not exist.',
        robots: {
          index: false,
          follow: false,
        }
      };
    }
    
    const categoryInfo = toolCategories[category as ToolCategory];
    const tools = getToolsByCategory()[category as ToolCategory] || [];
    
  return {
    title: limitTitle(`${categoryInfo.name} - Professional Tools | Toolspy`),
    description: limitDescription(`${categoryInfo.description}. Browse ${tools.length} free ${categoryInfo.name.toLowerCase()} on Toolspy.`),
      keywords: [categoryInfo.name.toLowerCase(), 'free tools', 'online utilities', 'professional tools'],
    openGraph: {
      title: limitTitle(`${categoryInfo.name} - Professional Tools | Toolspy`),
      description: limitDescription(`${categoryInfo.description}. Browse ${tools.length} free tools.`),
        type: 'website',
        url: `https://toolspy.net/tools/${category}`,
      },
    twitter: {
        card: 'summary_large_image',
      title: limitTitle(`${categoryInfo.name} - Professional Tools | Toolspy`),
      description: limitDescription(`${categoryInfo.description}. Browse ${tools.length} free tools.`),
      },
    alternates: {
      canonical: `https://toolspy.net/tools/${category}`,
    },
    };
  } catch (error) {
    console.error('Error generating metadata for category:', category, error);
    
    return {
      title: 'Error | Toolspy',
      description: 'An error occurred while loading this page. Please try again.',
      robots: {
        index: false,
        follow: false,
      }
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  try {
    // Check if category exists and is valid
    const validCategories = Object.keys(toolCategories) as ToolCategory[];
    const isValidCategory = validCategories.includes(category as ToolCategory);
    
    // If category is not valid, redirect to 404 page
    if (!isValidCategory) {
      notFound();
    }
    
    const categoryInfo = toolCategories[category as ToolCategory];
  
      return (
      <>
        <StaticPageSchema 
          pageType="category" 
          pageData={{ category: category as ToolCategory }}
        />
       
            <div className="container max-w-7xl mx-auto px-4 py-4">
              <nav aria-label="breadcrumb">
                <ol className="flex flex-wrap items-center justify-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
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
                    <span aria-current="page" className="font-normal text-foreground">
                      {categoryInfo.name}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>

          {/* Category Tools Section */}
          <CategoryToolsClient 
            category={category as ToolCategory}
          />

          {/* Category SEO Content */}
          <CategorySEOContent 
            category={category as ToolCategory}
          />
      </>
    );
  } catch (error) {
    // Handle any unexpected errors gracefully
    console.error('Error in CategoryPage:', error);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg shadow-2xl p-8 border">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="h-16 w-16 bg-red-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 h-16 w-16 bg-red-500/10 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Something Went Wrong
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                We encountered an unexpected error while loading this category. 
                Please try again or browse our available categories.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/tools"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Browse All Tools
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}