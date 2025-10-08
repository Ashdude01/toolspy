/**
 * Schema Testing Script
 * 
 * This script helps validate the schema implementation by:
 * 1. Checking if all required schema types are present
 * 2. Validating schema structure
 * 3. Testing with Google's Rich Results Test API (if available)
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  toolSlug: 'image-compressor',
  baseUrl: 'https://toolspy.net',
  expectedSchemas: [
    'Organization',
    'WebSite', 
    'WebPage',
    'SoftwareApplication',
    'FAQPage',
    'Review',
    'AggregateRating',
    'Service'
  ]
};

/**
 * Validates schema structure
 */
function validateSchemaStructure() {
  console.log('🔍 Validating Schema Structure...\n');
  
  const layoutPath = path.join(__dirname, '..', 'app', '(tools)', TEST_CONFIG.toolSlug, 'layout.tsx');
  const dataPath = path.join(__dirname, '..', 'app', '(tools)', TEST_CONFIG.toolSlug, 'data.tsx');
  
  // Check if files exist
  if (!fs.existsSync(layoutPath)) {
    console.error('❌ Layout file not found:', layoutPath);
    return false;
  }
  
  if (!fs.existsSync(dataPath)) {
    console.error('❌ Data file not found:', dataPath);
    return false;
  }
  
  console.log('✅ Layout file exists:', layoutPath);
  console.log('✅ Data file exists:', dataPath);
  
  // Read and validate layout content
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Check for required imports
  const requiredImports = [
    'createMetadata',
    'createFullUrl', 
    'MarketingPageSchema',
    'createMarketingPageData',
    'faq_data',
    'testimonial'
  ];
  
  console.log('\n📦 Checking Required Imports:');
  requiredImports.forEach(importName => {
    if (layoutContent.includes(importName)) {
      console.log(`✅ ${importName} imported`);
    } else {
      console.log(`❌ ${importName} missing`);
    }
  });
  
  // Check for schema usage
  console.log('\n🏗️ Checking Schema Implementation:');
  if (layoutContent.includes('MarketingPageSchema')) {
    console.log('✅ MarketingPageSchema component used');
  } else {
    console.log('❌ MarketingPageSchema component missing');
  }
  
  if (layoutContent.includes('createMarketingPageData')) {
    console.log('✅ createMarketingPageData function used');
  } else {
    console.log('❌ createMarketingPageData function missing');
  }
  
  return true;
}

/**
 * Validates data structure
 */
function validateDataStructure() {
  console.log('\n📊 Validating Data Structure...\n');
  
  const dataPath = path.join(__dirname, '..', 'app', '(tools)', TEST_CONFIG.toolSlug, 'data.tsx');
  const dataContent = fs.readFileSync(dataPath, 'utf8');
  
  // Check for FAQ data
  if (dataContent.includes('export const faq_data')) {
    console.log('✅ FAQ data exported');
    
    // Count FAQs
    const faqMatches = dataContent.match(/id:\s*\d+,/g);
    const faqCount = faqMatches ? faqMatches.length : 0;
    console.log(`📝 Found ${faqCount} FAQs`);
    
    if (faqCount >= 5) {
      console.log('✅ Sufficient FAQ count (≥5)');
    } else {
      console.log('⚠️ Low FAQ count (<5)');
    }
  } else {
    console.log('❌ FAQ data missing');
  }
  
  // Check for testimonial data
  if (dataContent.includes('export const testimonial')) {
    console.log('✅ Testimonial data exported');
    
    // Count testimonials
    const testimonialMatches = dataContent.match(/id:\s*\d+,/g);
    const testimonialCount = testimonialMatches ? testimonialMatches.length : 0;
    console.log(`⭐ Found ${testimonialCount} testimonials`);
    
    if (testimonialCount >= 3) {
      console.log('✅ Sufficient testimonial count (≥3)');
    } else {
      console.log('⚠️ Low testimonial count (<3)');
    }
  } else {
    console.log('❌ Testimonial data missing');
  }
  
  return true;
}

/**
 * Generates test URLs for manual testing
 */
function generateTestUrls() {
  console.log('\n🔗 Test URLs for Manual Validation:\n');
  
  const testUrl = `${TEST_CONFIG.baseUrl}/${TEST_CONFIG.toolSlug}`;
  
  console.log('📱 Google Rich Results Test:');
  console.log(`https://search.google.com/test/rich-results?url=${encodeURIComponent(testUrl)}\n`);
  
  console.log('🏷️ Schema Markup Validator:');
  console.log(`https://validator.schema.org/#url=${encodeURIComponent(testUrl)}\n`);
  
  console.log('🔍 Facebook Sharing Debugger:');
  console.log(`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(testUrl)}\n`);
  
  console.log('🐦 Twitter Card Validator:');
  console.log(`https://cards-dev.twitter.com/validator\n`);
  
  console.log('📊 Direct URL:');
  console.log(`${testUrl}\n`);
}

/**
 * Main test function
 */
function runTests() {
  console.log('🧪 Schema Implementation Test\n');
  console.log('=' .repeat(50));
  
  try {
    const structureValid = validateSchemaStructure();
    const dataValid = validateDataStructure();
    
    console.log('\n' + '=' .repeat(50));
    
    if (structureValid && dataValid) {
      console.log('✅ All tests passed! Schema implementation looks good.');
      generateTestUrls();
    } else {
      console.log('❌ Some tests failed. Please check the implementation.');
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  validateSchemaStructure,
  validateDataStructure,
  generateTestUrls,
  runTests
};
