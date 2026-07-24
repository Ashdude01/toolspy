#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Template for the new dynamic layout
const layoutTemplate = (toolSlug) => `import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('${toolSlug}')

export default function ${toPascalCase(toolSlug)}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="${toolSlug}">
      {children}
    </DynamicToolLayout>
  )
}`;

// Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Get all tool directories
function getToolDirectories() {
  const toolsDir = path.join(__dirname, '../app/(frontend)/(tools)');
  const entries = fs.readdirSync(toolsDir, { withFileTypes: true });
  
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

// Convert a single layout file
function convertLayout(toolSlug) {
  const layoutPath = path.join(__dirname, `../app/(frontend)/(tools)/${toolSlug}/layout.tsx`);
  
  if (fs.existsSync(layoutPath)) {
    const newContent = layoutTemplate(toolSlug);
    fs.writeFileSync(layoutPath, newContent);
    console.log(`✅ Converted layout for: ${toolSlug}`);
  } else {
    console.log(`⚠️  No layout found for: ${toolSlug}`);
  }
}

// Main conversion function
function convertAllLayouts() {
  console.log('🚀 Starting layout conversion...\n');
  
  const toolDirectories = getToolDirectories();
  
  toolDirectories.forEach(toolSlug => {
    // Skip if it's already converted (like image-compressor)
    if (toolSlug === 'image-compressor') {
      console.log(`⏭️  Skipping already converted: ${toolSlug}`);
      return;
    }
    
    convertLayout(toolSlug);
  });
  
  console.log('\n✨ Layout conversion completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the converted layouts');
  console.log('2. Test a few tools to ensure metadata is working correctly');
  console.log('3. Remove any unused assets (like hardcoded preview images)');
}

// Run the conversion
if (require.main === module) {
  convertAllLayouts();
}

module.exports = { layoutTemplate, convertLayout }; 