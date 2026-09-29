/**
 * Ezoic ads.txt Update Script
 * Fetches the latest ads.txt from Ezoic and saves it to public/ads.txt
 * 
 * Run this script before building your Next.js app:
 * node scripts/update-ads-txt.js
 * 
 * Or add it to your package.json build script:
 * "build": "node scripts/update-ads-txt.js && next build"
 * 
 * Reference: https://docs.ezoic.com/docs/ezoicads/adstxt/
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration - Update these values
const EZOIC_PUBLISHER_ID = process.env.NEXT_PUBLIC_EZOIC_PUBLISHER_ID || '19390';
const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'toolspy.net';
const ADS_TXT_URL = `https://srv.adstxtmanager.com/${EZOIC_PUBLISHER_ID}/${DOMAIN}`;
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'ads.txt');

// Fallback ads.txt content (basic Ezoic entry)
const FALLBACK_ADS_TXT = `# ads.txt file for ${DOMAIN}
# This file is managed by Ezoic
# If you see this message, the Ezoic ads.txt manager is not yet configured for this domain
# Please ensure your domain is properly integrated with Ezoic
# Reference: https://docs.ezoic.com/docs/ezoicads/adstxt/

# Once Ezoic integration is complete, this file will be automatically updated
`;

console.log('🔄 Fetching ads.txt from Ezoic...');
console.log(`📍 URL: ${ADS_TXT_URL}`);

https.get(ADS_TXT_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      // Write the ads.txt content to public folder
      fs.writeFileSync(OUTPUT_FILE, data, 'utf8');
      console.log('✅ ads.txt updated successfully!');
      console.log(`📁 Saved to: ${OUTPUT_FILE}`);
      console.log(`📊 Content length: ${data.length} bytes`);
    } else if (res.statusCode === 404) {
      // Domain not yet registered with Ezoic - use fallback
      console.warn(`⚠️  Warning: Received 404 - Domain may not be registered with Ezoic yet`);
      console.warn(`⚠️  Using fallback ads.txt file`);
      console.warn(`⚠️  Please ensure your domain is properly integrated with Ezoic:`);
      console.warn(`⚠️  1. Complete Ezoic site integration`);
      console.warn(`⚠️  2. Verify publisher ID: ${EZOIC_PUBLISHER_ID}`);
      console.warn(`⚠️  3. Check domain: ${DOMAIN}`);
      console.warn(`⚠️  4. Visit: https://docs.ezoic.com/docs/ezoicads/adstxt/`);
      
      // Write fallback file
      fs.writeFileSync(OUTPUT_FILE, FALLBACK_ADS_TXT, 'utf8');
      console.log(`📁 Created fallback ads.txt at: ${OUTPUT_FILE}`);
      console.log(`✅ Build will continue with fallback file`);
      // Don't exit with error - allow build to continue
    } else {
      console.error(`❌ Error: Received status code ${res.statusCode}`);
      console.error(`❌ Using fallback ads.txt file`);
      fs.writeFileSync(OUTPUT_FILE, FALLBACK_ADS_TXT, 'utf8');
      console.log(`📁 Created fallback ads.txt at: ${OUTPUT_FILE}`);
      // Don't exit with error - allow build to continue
    }
  });
}).on('error', (err) => {
  console.error('❌ Error fetching ads.txt:', err.message);
  console.error('❌ Using fallback ads.txt file');
  fs.writeFileSync(OUTPUT_FILE, FALLBACK_ADS_TXT, 'utf8');
  console.log(`📁 Created fallback ads.txt at: ${OUTPUT_FILE}`);
  console.log(`✅ Build will continue with fallback file`);
  // Don't exit with error - allow build to continue
});

