#!/usr/bin/env node

/**
 * PWA Icon Generator Script
 * 
 * This script helps generate the required PWA icons for Toolspy.
 * 
 * Usage:
 * - Place your source icon (preferably 512x512 or larger) in the public folder
 * - Run: node scripts/generate-pwa-icons.js
 * 
 * The script will create the following PWA icons:
 * - icon-192.png (192x192)
 * - icon-512.png (512x512)
 * - favicon-16x16.png (16x16)
 * - favicon-32x32.png (32x32)
 * - apple-touch-icon.png (180x180)
 */

const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const ICON_SIZES = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
];

function createPlaceholderIcons() {
  const publicDir = path.join(process.cwd(), 'public');
  
  console.log('Creating placeholder PWA icon files...');
  
  ICON_SIZES.forEach(({ name, size }) => {
    const iconPath = path.join(publicDir, name);
    
    // Create a simple SVG placeholder that can be converted to PNG
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.2}" font-weight="bold" 
        text-anchor="middle" dominant-baseline="middle" fill="white">T</text>
</svg>`;
    
    // Save as SVG first (since we can't easily generate PNG without additional dependencies)
    const svgPath = iconPath.replace('.png', '.svg');
    fs.writeFileSync(svgPath, svgContent);
    
    console.log(`Created placeholder: ${name.replace('.png', '.svg')}`);
  });
  
  console.log('\n✨ Placeholder icons created!');
  console.log('\n📝 Next steps:');
  console.log('1. Convert the SVG files to PNG using an online converter or image editor');
  console.log('2. Or replace them with your own PNG icons of the correct sizes');
  console.log('3. Make sure your icons are:');
  console.log('   - Square aspect ratio');
  console.log('   - High contrast');
  console.log('   - Clear at small sizes');
  console.log('   - Representative of your brand');
  console.log('\n🔧 Online conversion tools:');
  console.log('- https://cloudconvert.com/svg-to-png');
  console.log('- https://convertio.co/svg-png/');
  console.log('- https://www.iloveimg.com/svg-to-jpg');
}

function checkExistingIcons() {
  const publicDir = path.join(process.cwd(), 'public');
  const missingIcons = [];
  
  ICON_SIZES.forEach(({ name }) => {
    const iconPath = path.join(publicDir, name);
    if (!fs.existsSync(iconPath)) {
      missingIcons.push(name);
    }
  });
  
  return missingIcons;
}

function main() {
  console.log('🚀 Toolspy PWA Icon Generator\n');
  
  const missingIcons = checkExistingIcons();
  
  if (missingIcons.length === 0) {
    console.log('✅ All PWA icons already exist!');
    return;
  }
  
  console.log(`❌ Missing ${missingIcons.length} icon(s):`);
  missingIcons.forEach(icon => console.log(`   - ${icon}`));
  console.log('');
  
  createPlaceholderIcons();
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { createPlaceholderIcons, checkExistingIcons }; 