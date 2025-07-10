/**
 * SEO Static Site Generator
 * Converts templates with placeholders into SEO-friendly static HTML
 */

class SEOGenerator {
    constructor(config = {}) {
        this.config = config;
        this.templates = new Map();
        this.outputs = new Map();
    }

    /**
     * Load template from string or file
     * @param {string} name - Template name
     * @param {string} content - Template content with placeholders
     */
    addTemplate(name, content) {
        this.templates.set(name, content);
    }

    /**
     * Generate static HTML from template
     * @param {string} templateName - Template name
     * @param {Object} data - Data to replace placeholders
     * @returns {string} Generated HTML
     */
    generate(templateName, data) {
        const template = this.templates.get(templateName);
        if (!template) {
            throw new Error(`Template "${templateName}" not found`);
        }

        let html = template;

        // Replace all placeholders
        for (const [key, value] of Object.entries(data)) {
            const placeholder = `{{${key}}}`;
            
            if (Array.isArray(value)) {
                // Handle arrays (for lists, features, etc.)
                html = html.replace(new RegExp(placeholder, 'g'), this.formatArray(key, value));
            } else if (typeof value === 'object' && value !== null) {
                // Handle objects (for structured data, etc.)
                html = html.replace(new RegExp(placeholder, 'g'), JSON.stringify(value));
            } else {
                // Handle strings and primitives
                html = html.replace(new RegExp(placeholder, 'g'), this.escapeHtml(String(value)));
            }
        }

        // Clean up any remaining placeholders
        html = html.replace(/\{\{[^}]+\}\}/g, '');

        this.outputs.set(templateName, html);
        return html;
    }

    /**
     * Format array values based on context
     * @param {string} key - Placeholder key
     * @param {Array} array - Array to format
     * @returns {string} Formatted HTML
     */
    formatArray(key, array) {
        switch (key) {
            case 'KEYWORDS_ARRAY':
                return array.map(k => `"${k}"`).join(', ');
            
            case 'FEATURE_LIST':
                return JSON.stringify(array);
            
            case 'FEATURE_BADGES':
                return array.map(feature => `
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        ${this.escapeHtml(feature)}
                    </span>
                `).join('');
            
            case 'NAVIGATION_ITEMS':
                return array.map(item => `
                    <a href="${item.url}" class="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                        ${this.escapeHtml(item.text)}
                    </a>
                `).join('');
            
            case 'FOOTER_LINKS':
                return array.map(link => `
                    <a href="${link.url}" class="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                        ${this.escapeHtml(link.text)}
                    </a>
                `).join('');
            
            case 'FEATURE_ITEMS':
                return array.map(feature => `
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">${this.escapeHtml(feature.title)}</h4>
                            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">${this.escapeHtml(feature.description)}</p>
                        </div>
                    </div>
                `).join('');
            
            case 'FAQ_ITEMS':
                return array.map(faq => `
                    <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">${this.escapeHtml(faq.question)}</h4>
                        <p class="text-gray-600 dark:text-gray-400">${this.escapeHtml(faq.answer)}</p>
                    </div>
                `).join('');
            
            default:
                return array.join(', ');
        }
    }

    /**
     * Escape HTML characters
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeHtml(str) {
        if (typeof str !== 'string') return str;
        
        const htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        
        return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
    }

    /**
     * Generate complete site
     * @param {Object} siteConfig - Site configuration
     * @returns {Map} Generated pages
     */
    generateSite(siteConfig) {
        const pages = new Map();
        
        for (const [pageName, pageConfig] of Object.entries(siteConfig.pages)) {
            const html = this.generate(pageConfig.template, {
                ...siteConfig.global,
                ...pageConfig.data
            });
            
            pages.set(pageName, {
                html: html,
                filename: pageConfig.filename || `${pageName}.html`,
                path: pageConfig.path || '/'
            });
        }
        
        return pages;
    }

    /**
     * Save generated HTML to file (Node.js environment)
     * @param {string} templateName - Template name
     * @param {string} filename - Output filename
     */
    saveToFile(templateName, filename) {
        if (typeof require === 'undefined') {
            throw new Error('saveToFile is only available in Node.js environment');
        }
        
        const fs = require('fs');
        const html = this.outputs.get(templateName);
        
        if (!html) {
            throw new Error(`No generated content found for template "${templateName}"`);
        }
        
        fs.writeFileSync(filename, html, 'utf8');
    }

    /**
     * Download generated HTML (Browser environment)
     * @param {string} templateName - Template name
     * @param {string} filename - Download filename
     */
    downloadHTML(templateName, filename = 'index.html') {
        const html = this.outputs.get(templateName);
        
        if (!html) {
            throw new Error(`No generated content found for template "${templateName}"`);
        }
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    /**
     * Generate sitemap.xml
     * @param {Array} pages - Array of page objects
     * @param {string} baseUrl - Base URL of the site
     * @returns {string} Sitemap XML
     */
    generateSitemap(pages, baseUrl) {
        const urls = pages.map(page => `
    <url>
        <loc>${baseUrl}${page.path}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page.priority || '0.8'}</priority>
    </url>`).join('');

        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
    }

    /**
     * Generate robots.txt
     * @param {string} sitemapUrl - URL to sitemap
     * @returns {string} Robots.txt content
     */
    generateRobots(sitemapUrl) {
        return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}`;
    }

    /**
     * Validate generated HTML
     * @param {string} html - HTML to validate
     * @returns {Object} Validation result
     */
    validateHTML(html) {
        const issues = [];
        
        // Check for missing title
        if (!html.includes('<title>') || html.includes('<title></title>')) {
            issues.push('Missing or empty title tag');
        }
        
        // Check for missing meta description
        if (!html.includes('name="description"')) {
            issues.push('Missing meta description');
        }
        
        // Check for missing h1
        if (!html.includes('<h1')) {
            issues.push('Missing h1 tag');
        }
        
        // Check for alt attributes on images
        const imgMatches = html.match(/<img[^>]*>/g);
        if (imgMatches) {
            imgMatches.forEach(img => {
                if (!img.includes('alt=')) {
                    issues.push('Image missing alt attribute');
                }
            });
        }
        
        return {
            valid: issues.length === 0,
            issues: issues
        };
    }

    /**
     * Get SEO analysis
     * @param {string} html - HTML to analyze
     * @returns {Object} SEO analysis
     */
    analyzeSEO(html) {
        const analysis = {
            score: 0,
            recommendations: [],
            details: {}
        };

        // Title analysis
        const titleMatch = html.match(/<title>([^<]*)<\/title>/);
        if (titleMatch) {
            const title = titleMatch[1];
            analysis.details.title = title;
            if (title.length >= 30 && title.length <= 60) {
                analysis.score += 10;
            } else {
                analysis.recommendations.push('Title should be 30-60 characters long');
            }
        } else {
            analysis.recommendations.push('Missing title tag');
        }

        // Meta description analysis
        const descMatch = html.match(/name="description"[^>]*content="([^"]*)"/);
        if (descMatch) {
            const description = descMatch[1];
            analysis.details.description = description;
            if (description.length >= 120 && description.length <= 160) {
                analysis.score += 10;
            } else {
                analysis.recommendations.push('Meta description should be 120-160 characters long');
            }
        } else {
            analysis.recommendations.push('Missing meta description');
        }

        // Heading structure
        const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
        const h2Count = (html.match(/<h2[^>]*>/g) || []).length;
        
        if (h1Count === 1) {
            analysis.score += 10;
        } else {
            analysis.recommendations.push('Should have exactly one h1 tag');
        }

        if (h2Count > 0) {
            analysis.score += 5;
        }

        // Open Graph tags
        const ogTags = html.match(/property="og:[^"]*"/g);
        if (ogTags && ogTags.length >= 4) {
            analysis.score += 10;
        } else {
            analysis.recommendations.push('Add more Open Graph tags');
        }

        // Structured data
        if (html.includes('application/ld+json')) {
            analysis.score += 15;
        } else {
            analysis.recommendations.push('Add structured data (JSON-LD)');
        }

        analysis.score = Math.min(100, analysis.score);
        
        return analysis;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOGenerator;
}

// Global export
if (typeof window !== 'undefined') {
    window.SEOGenerator = SEOGenerator;
} 