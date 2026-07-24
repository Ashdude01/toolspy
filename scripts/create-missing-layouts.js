const fs = require('fs');
const path = require('path');

// Template for layout.tsx file
const layoutTemplate = (toolSlug, componentName) => `import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('${toolSlug}')

export default function ${componentName}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="${toolSlug}">
      {children}
    </DynamicToolLayout>
  )
}
`;

// Function to convert kebab-case to PascalCase
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Get all tool directories
const toolsDir = path.join(__dirname, '../app/(frontend)/(tools)');
const toolDirs = fs.readdirSync(toolsDir).filter(dir => {
  const fullPath = path.join(toolsDir, dir);
  return fs.statSync(fullPath).isDirectory() && dir !== 'layout.tsx';
});

// Check which tools don't have layout.tsx
const missingLayouts = [];
toolDirs.forEach(toolDir => {
  const layoutPath = path.join(toolsDir, toolDir, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    missingLayouts.push(toolDir);
  }
});

console.log('Tools missing layout.tsx:', missingLayouts);

// Create missing layout files
missingLayouts.forEach(toolSlug => {
  const componentName = kebabToPascal(toolSlug);
  const layoutPath = path.join(toolsDir, toolSlug, 'layout.tsx');
  const content = layoutTemplate(toolSlug, componentName);
  
  try {
    fs.writeFileSync(layoutPath, content, 'utf8');
    console.log(`✅ Created layout.tsx for ${toolSlug}`);
  } catch (error) {
    console.error(`❌ Failed to create layout.tsx for ${toolSlug}:`, error.message);
  }
});

console.log('\\nLayout creation completed!');