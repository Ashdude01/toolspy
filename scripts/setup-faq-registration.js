const fs = require('fs');
const path = require('path');

// List of tools that need FAQ registration setup
const toolsWithFAQ = [
  'image-compressor', // Already done
  'pdf-converter',
  'image-converter', 
  'bmi-calculator',
  'currency-converter',
  'base64-to-image',
  'pdf-to-word',
  'merge-pdf',
  'jfif-to-jpg',
  'jfif-to-pdf'
];

// Function to add FAQ export and registration to seo-content files
function addFAQRegistration(toolSlug) {
  const seoContentPath = path.join(__dirname, `../app/(site)/(frontend)/(tools)/${toolSlug}/seo-content.tsx`);
  
  if (!fs.existsSync(seoContentPath)) {
    console.log(`❌ SEO content file not found for ${toolSlug}`);
    return;
  }
  
  const content = fs.readFileSync(seoContentPath, 'utf8');
  
  // Check if already has FAQ registration
  if (content.includes('registerToolFAQ')) {
    console.log(`✓ ${toolSlug} already has FAQ registration`);
    return;
  }
  
  // Get the function name from the export
  const exportMatch = content.match(/export function (\w+SEOContent)/);
  if (!exportMatch) {
    console.log(`❌ Could not find export function in ${toolSlug}`);
    return;
  }
  
  const functionName = exportMatch[1];
  const toolNamePascal = toolSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
  
  // Add import
  let updatedContent = content.replace(
    /import { getToolBySlug.*} from "@\/lib\/tools-data";/,
    `import { getToolBySlug } from "@/lib/tools-data";\nimport { registerToolFAQ } from "@/components/seo/faq-types";`
  );
  
  // Find faqData array and extract it
  const faqDataMatch = content.match(/const faqData = \[([\s\S]*?)\];/);
  if (!faqDataMatch) {
    console.log(`❌ Could not find faqData in ${toolSlug}`);
    return;
  }
  
  const faqDataContent = faqDataMatch[1];
  
  // Add export function and registration at the end
  const exportFunction = `

// Export FAQ data for schema generation
export function get${toolNamePascal}FAQs() {
  return [${faqDataContent}
  ];
}

// Register FAQ data for this tool
registerToolFAQ('${toolSlug}', get${toolNamePascal}FAQs);`;
  
  // Add before the last closing brace
  updatedContent = updatedContent.replace(/(\s*}\s*)$/, `${exportFunction}$1`);
  
  fs.writeFileSync(seoContentPath, updatedContent, 'utf8');
  console.log(`✅ Added FAQ registration to ${toolSlug}`);
}

// Process all tools
toolsWithFAQ.forEach(addFAQRegistration);

console.log('\\nFAQ registration setup completed!');