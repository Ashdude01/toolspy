#!/usr/bin/env node
/**
 * Prerender HTML for SEO: after `next build` (static export), this script
 * loads each page in a headless browser and overwrites the HTML file with
 * the fully-rendered DOM. That puts real content in <body> for View Source
 * and non-JS crawlers.
 *
 * Run after build: npm run build && node scripts/prerender-html.js
 * Requires: npm install puppeteer --save-dev
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const OUT_DIR = path.join(__dirname, '..', 'out');
const PORT = 37542;
const BASE = `http://127.0.0.1:${PORT}`;

function findRoutes(dir, base = '') {
  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      routes.push(...findRoutes(path.join(dir, e.name), rel));
    } else if (e.name === 'index.html') {
      const urlPath = base ? `/${base}/` : '/';
      routes.push({ urlPath, filePath: path.join(dir, 'index.html') });
    }
  }
  return routes;
}

function serveStatic(outDir) {
  const mimes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
  };
  return http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0] || '/';
    if (urlPath === '/') urlPath = '/index.html';
    else if (!path.extname(urlPath)) urlPath = urlPath.replace(/\/?$/, '/index.html');
    const filePath = path.join(outDir, urlPath);
    if (!filePath.startsWith(outDir)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      const ext = path.extname(filePath);
      res.setHeader('Content-Type', mimes[ext] || 'application/octet-stream');
      res.end(data);
    });
  });
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error('out/ not found. Run: npm run build');
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.error('puppeteer not found. Install: npm install puppeteer --save-dev');
    process.exit(1);
  }

  let routes = findRoutes(OUT_DIR);
  if (process.argv.includes('--home-only')) routes = routes.filter((r) => r.urlPath === '/');
  console.log(`Found ${routes.length} routes to prerender.`);

  const server = serveStatic(OUT_DIR);
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`Serving out/ at ${BASE}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const timeout = 15000;
  let done = 0;
  let failed = 0;

  for (const { urlPath, filePath } of routes) {
    const url = BASE + (urlPath === '/' ? '/' : urlPath);
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0', timeout });
      // Wait for React to hydrate and render main content into the DOM (not just RSC payload)
      await page.waitForFunction(
        () => {
          const main = document.querySelector('main');
          return main && main.innerText && main.innerText.length > 80;
        },
        { timeout: 12000 }
      ).catch(() => {});
      const html = await page.content();
      await page.close();
      fs.writeFileSync(filePath, html, 'utf8');
      done++;
      if (done % 20 === 0) console.log(`  ${done}/${routes.length}`);
    } catch (err) {
      failed++;
      console.warn(`  Skip ${urlPath}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`Done. Prerendered ${done}, skipped ${failed}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
