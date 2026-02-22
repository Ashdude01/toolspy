/**
 * Migrate tool pages to server-rendered SEO content for static export.
 */

const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'app', '(tools)');

function extractSeoImport(pagePath) {
  const content = fs.readFileSync(pagePath, 'utf8');
  const match = content.match(/import\s*\{\s*(\w+)\s*\}\s*from\s*["']\.\/seo-content["']/);
  return match ? match[1] : null;
}

function getToolDirs() {
  return fs.readdirSync(TOOLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

function updateLayout(toolDir, componentName) {
  const layoutPath = path.join(TOOLS_DIR, toolDir, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) return false;
  let content = fs.readFileSync(layoutPath, 'utf8');
  if (content.includes('<' + componentName + ' />') || content.includes('<' + componentName + '/>')) return true;

  if (!content.includes("from './seo-content'") && !content.includes('from "./seo-content"')) {
    content = content.replace(
      /(import \{ generateToolMetadata, DynamicToolLayout \} from ['"]@\/components\/layout\/dynamic-tool-layout['"])\n/,
      "$1\nimport { " + componentName + " } from './seo-content'\n"
    );
    const faqMatch = content.match(/(import \.\/faq-loader[\s\S]*?\n)/);
    if (faqMatch && !content.includes("from './seo-content'")) {
      content = content.replace(/(import \.\/faq-loader[^\n]*\n)/, "$1import { " + componentName + " } from './seo-content'\n");
    }
  }
  if (!content.includes("from './seo-content'") && !content.includes('from "./seo-content"')) {
    const lastImport = content.lastIndexOf("from '");
    const insertAt = content.indexOf('\n', lastImport) + 1;
    content = content.slice(0, insertAt) + "import { " + componentName + " } from './seo-content'\n" + content.slice(insertAt);
  }
  if (!content.includes('<' + componentName)) {
    content = content.replace(
      /(\s*\{children\}\s*\n)(\s*<\/DynamicToolLayout>)/,
      "$1      <div className=\"container mx-auto px-4 py-6 sm:py-8 max-w-7xl\">\n        <" + componentName + " />\n      </div>\n$2"
    );
  }
  fs.writeFileSync(layoutPath, content);
  return true;
}

function updatePage(toolDir, componentName) {
  const pagePath = path.join(TOOLS_DIR, toolDir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return false;
  let content = fs.readFileSync(pagePath, 'utf8');
  if (!content.includes(componentName)) return true;
  content = content.replace(/\nimport\s*\{\s*\w+\s*\}\s*from\s*["']\.\/seo-content["'];\s*\n?/g, '\n');
  content = content.replace(/\s*\{\/\* SEO Content Section \*\/\}\s*\n\s*<\w+\s*\/>\s*\n?/g, '\n');
  content = content.replace(/\s*<\w+SEOContent\s*\/>\s*\n?/g, '\n');
  content = content.replace(/\s*<\w+RankPredictorSEOContent\s*\/>\s*\n?/g, '\n');
  content = content.replace(/\s*<\w+CalculatorSEOContent\s*\/>\s*\n?/g, '\n');
  content = content.replace(/\s*<\w+ConverterSEOContent\s*\/>\s*\n?/g, '\n');
  content = content.replace(/\s*<\w+GeneratorSEOContent\s*\/>\s*\n?/g, '\n');
  content = content.replace(/\s*<\w+ToolsSEOContent\s*\/>\s*\n?/g, '\n');
  const re = new RegExp('\\s*<' + componentName + '\\s*\\/>\\s*\\n?', 'g');
  content = content.replace(re, '\n');
  fs.writeFileSync(pagePath, content);
  return true;
}

function updateSeoContent(toolDir) {
  const seoPath = path.join(TOOLS_DIR, toolDir, 'seo-content.tsx');
  if (!fs.existsSync(seoPath)) return false;
  let content = fs.readFileSync(seoPath, 'utf8');
  if (!content.includes('"use client"')) return true;

  content = content.replace(/^"use client";\s*\n\n?/m, '');

  if (content.includes('window.scrollTo') && !content.includes('ScrollToTopButton')) {
    if (content.includes('import { Button } from "@/components/ui/button"')) {
      content = content.replace(
        /import\s*\{\s*Button\s*\}\s*from\s*["']@\/components\/ui\/button["'];/,
        'import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";'
      );
    } else {
      content = content.replace(
        /(import \{[^}]+\} from ["']@\/components\/ui\/card["'];)/,
        "$1\nimport { ScrollToTopButton } from \"@/components/ui/scroll-to-top-button\";"
      );
    }
  }
  content = content.replace(
    /<Button\s+size="lg"\s+onClick=\{\s*\(\)\s*=>\s*window\.scrollTo\(\{\s*top:\s*0,\s*behavior:\s*["']smooth["']\s*\}\)\s*\}\s*(?:className="[^"]*"\s*)?>\s*\n\s*([^<]+)\s*\n\s*<\/Button>/g,
    '<ScrollToTopButton>\n            $1\n          </ScrollToTopButton>'
  );
  content = content.replace(
    /<Button\s+size="lg"\s+className="mt-4"\s+onClick=\{\s*\(\)\s*=>\s*window\.scrollTo\(\{\s*top:\s*0,\s*behavior:\s*["']smooth["']\s*\}\)\s*\}\s*>\s*\n\s*([^<]+)\s*\n\s*<\/Button>/g,
    '<ScrollToTopButton className="mt-4">\n            $1\n          </ScrollToTopButton>'
  );
  content = content.replace(
    /<Button\s+size="lg"\s+onClick=\{\s*\(\)\s*=>\s*window\.scrollTo\(\{\s*top:\s*0,\s*behavior:\s*["']smooth["']\s*\}\)\s*\}\s*>\s*\n\s*([^<]+)\s*\n\s*<\/Button>/g,
    '<ScrollToTopButton>\n            $1\n          </ScrollToTopButton>'
  );
  if (content.includes('onClick={() => window.scrollTo')) {
    content = content.replace(
      /<Button([^>]*)\s+onClick=\{\s*\(\)\s*=>\s*window\.scrollTo\(\{\s*top:\s*0,\s*behavior:\s*["']smooth["']\s*\}\)\s*\}\s*([^>]*)>\s*([\s\S]*?)<\/Button>/g,
      '<ScrollToTopButton$1$2>$3</ScrollToTopButton>'
    );
  }
  fs.writeFileSync(seoPath, content);
  return true;
}

const toolDirs = getToolDirs();
let done = 0;
for (const toolDir of toolDirs) {
  const pagePath = path.join(TOOLS_DIR, toolDir, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;
  const componentName = extractSeoImport(pagePath);
  if (!componentName) continue;
  const hasSeo = fs.existsSync(path.join(TOOLS_DIR, toolDir, 'seo-content.tsx'));
  if (!hasSeo) continue;
  const hasLayout = fs.existsSync(path.join(TOOLS_DIR, toolDir, 'layout.tsx'));
  if (hasLayout) updateLayout(toolDir, componentName);
  updatePage(toolDir, componentName);
  updateSeoContent(toolDir);
  done++;
  console.log('Migrated:', toolDir);
}
console.log('Done. Migrated', done, 'tools.');
