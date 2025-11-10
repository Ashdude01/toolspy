// Standard FAQ interface for all tools
export interface FAQItem {
  question: string;
  answer: string;
}

// Function type for getting FAQ data from seo-content files
export type GetFAQDataFunction = () => FAQItem[];

// Registry to store FAQ data functions for each tool
export const toolFAQRegistry: Record<string, GetFAQDataFunction> = {};

// Helper function to register FAQ data for a tool
export function registerToolFAQ(
  toolSlug: string,
  getFAQData: GetFAQDataFunction
) {
  toolFAQRegistry[toolSlug] = getFAQData;
}

// Helper function to get FAQ data for a tool
export function getToolFAQData(toolSlug: string): FAQItem[] {
  // Try exact match first
  let getFAQData = toolFAQRegistry[toolSlug];
  
  // If not found, try with leading slash
  if (!getFAQData && toolSlug.startsWith('/')) {
    getFAQData = toolFAQRegistry[toolSlug.slice(1)];
  } else if (!getFAQData && !toolSlug.startsWith('/')) {
    getFAQData = toolFAQRegistry['/' + toolSlug];
  }
  
  if (getFAQData) {
    try {
      return getFAQData();
    } catch (error) {
      console.error(`Error getting FAQ data for ${toolSlug}:`, error);
      return [];
    }
  } else {
    // Fallback to default FAQs if no specific data found
    // return getDefaultFAQs(toolSlug);
    return [];
  }
}

// Default FAQs for tools that don't have specific FAQ data
function getDefaultFAQs(toolSlug: string): FAQItem[] {
  const toolName = toolSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return [
    {
      question: `Is the ${toolName} free to use?`,
      answer: `Yes, our ${toolName} is completely free to use. There are no hidden fees, subscriptions, or limitations on usage.`,
    },
    {
      question: `How does the ${toolName} work?`,
      answer: `The ${toolName} works entirely in your browser using advanced client-side technology. Your files are processed locally and never uploaded to our servers, ensuring complete privacy and security.`,
    },
    {
      question: `Is my data safe when using the ${toolName}?`,
      answer: `Absolutely. The ${toolName} processes all files locally in your browser. Your data never leaves your device, ensuring complete privacy and security.`,
    },
    {
      question: `Do I need to install any software to use the ${toolName}?`,
      answer: `No installation required! The ${toolName} works directly in your web browser. Simply visit our website and start using the tool immediately.`,
    },
  ];
}
