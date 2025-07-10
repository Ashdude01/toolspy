/**
 * SEO Configuration
 * SEO optimization and meta tag management
 */

class SEOConfig {
    constructor(config = {}) {
        this.config = this.mergeWithDefaults(config);
    }

    /**
     * Default SEO configuration
     */
    getDefaults() {
        return {
            // Basic Meta Tags
            title: 'Tool Application - Free Online Tool',
            description: 'A powerful and easy-to-use online tool. Fast, secure, and works in your browser.',
            keywords: ['online tool', 'converter', 'utility', 'free', 'web app'],
            author: 'Your Name',
            
            // Site Configuration
            siteName: 'Tool Application',
            siteUrl: 'https://yourdomain.com',
            locale: 'en_US',
            language: 'en',
            
            // Open Graph
            openGraph: {
                type: 'website',
                title: 'Tool Application - Free Online Tool',
                description: 'A powerful and easy-to-use online tool. Fast, secure, and works in your browser.',
                image: 'https://yourdomain.com/og-image.jpg',
                imageAlt: 'Tool Application Screenshot',
                imageWidth: 1200,
                imageHeight: 630,
                url: 'https://yourdomain.com'
            },

            // Twitter Card
            twitter: {
                card: 'summary_large_image',
                site: '@yourusername',
                creator: '@yourusername',
                title: 'Tool Application - Free Online Tool',
                description: 'A powerful and easy-to-use online tool. Fast, secure, and works in your browser.',
                image: 'https://yourdomain.com/twitter-image.jpg',
                imageAlt: 'Tool Application Screenshot'
            },

            // Structured Data
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Tool Application',
                description: 'A powerful and easy-to-use online tool. Fast, secure, and works in your browser.',
                url: 'https://yourdomain.com',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Web Browser',
                permissions: 'No special permissions required',
                softwareVersion: '1.0',
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    ratingCount: '1250',
                    bestRating: '5',
                    worstRating: '1'
                },
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD'
                },
                creator: {
                    '@type': 'Organization',
                    name: 'Your Company Name',
                    url: 'https://yourdomain.com'
                },
                featureList: [
                    'Fast and efficient processing',
                    'Secure and private',
                    'No registration required',
                    'Works offline',
                    'Mobile responsive',
                    'Free to use'
                ]
            },

            // Additional Meta Tags
            robots: 'index, follow',
            canonical: null, // Will use current URL if null
            themeColor: '#3B82F6',
            msapplicationTileColor: '#3B82F6',
            
            // PWA Configuration
            manifest: '/manifest.json',
            appleTouchIcon: '/apple-touch-icon.png',
            favicon: '/favicon.ico',
            
            // Verification
            googleSiteVerification: null,
            bingSiteVerification: null,
            facebookDomainVerification: null,
            
            // Analytics
            googleAnalytics: null,
            googleTagManager: null
        };
    }

    /**
     * Merge user config with defaults
     * @param {Object} userConfig - User configuration
     * @returns {Object} Merged configuration
     */
    mergeWithDefaults(userConfig) {
        const defaults = this.getDefaults();
        return this.deepMerge(defaults, userConfig);
    }

    /**
     * Deep merge two objects
     * @param {Object} target - Target object
     * @param {Object} source - Source object
     * @returns {Object} Merged object
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (this.isObject(source[key]) && this.isObject(target[key])) {
                    result[key] = this.deepMerge(target[key], source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }

    /**
     * Check if value is an object
     * @param {any} item - Item to check
     * @returns {boolean} True if object
     */
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    /**
     * Generate HTML meta tags
     * @returns {string} HTML meta tags
     */
    generateMetaTags() {
        const tags = [];
        
        // Basic meta tags
        tags.push(`<title>${this.escapeHtml(this.config.title)}</title>`);
        tags.push(`<meta name="description" content="${this.escapeHtml(this.config.description)}">`);
        
        if (this.config.keywords && this.config.keywords.length > 0) {
            const keywords = Array.isArray(this.config.keywords) 
                ? this.config.keywords.join(', ') 
                : this.config.keywords;
            tags.push(`<meta name="keywords" content="${this.escapeHtml(keywords)}">`);
        }
        
        if (this.config.author) {
            tags.push(`<meta name="author" content="${this.escapeHtml(this.config.author)}">`);
        }

        // Robots
        tags.push(`<meta name="robots" content="${this.config.robots}">`);

        // Language
        tags.push(`<meta name="language" content="${this.config.language}">`);
        
        // Canonical URL
        const canonical = this.config.canonical || (typeof window !== 'undefined' ? window.location.href : '');
        if (canonical) {
            tags.push(`<link rel="canonical" href="${canonical}">`);
        }

        // Theme color
        tags.push(`<meta name="theme-color" content="${this.config.themeColor}">`);
        tags.push(`<meta name="msapplication-TileColor" content="${this.config.msapplicationTileColor}">`);

        // Viewport
        tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);

        // Character set
        tags.push(`<meta charset="UTF-8">`);

        // Open Graph tags
        tags.push(...this.generateOpenGraphTags());

        // Twitter Card tags
        tags.push(...this.generateTwitterCardTags());

        // Icons and manifest
        if (this.config.favicon) {
            tags.push(`<link rel="icon" href="${this.config.favicon}">`);
        }
        if (this.config.appleTouchIcon) {
            tags.push(`<link rel="apple-touch-icon" href="${this.config.appleTouchIcon}">`);
        }
        if (this.config.manifest) {
            tags.push(`<link rel="manifest" href="${this.config.manifest}">`);
        }

        // Verification tags
        if (this.config.googleSiteVerification) {
            tags.push(`<meta name="google-site-verification" content="${this.config.googleSiteVerification}">`);
        }
        if (this.config.bingSiteVerification) {
            tags.push(`<meta name="msvalidate.01" content="${this.config.bingSiteVerification}">`);
        }
        if (this.config.facebookDomainVerification) {
            tags.push(`<meta name="facebook-domain-verification" content="${this.config.facebookDomainVerification}">`);
        }

        return tags.join('\n    ');
    }

    /**
     * Generate Open Graph meta tags
     * @returns {Array} Array of meta tag strings
     */
    generateOpenGraphTags() {
        const tags = [];
        const og = this.config.openGraph;

        if (og.type) tags.push(`<meta property="og:type" content="${og.type}">`);
        if (og.title) tags.push(`<meta property="og:title" content="${this.escapeHtml(og.title)}">`);
        if (og.description) tags.push(`<meta property="og:description" content="${this.escapeHtml(og.description)}">`);
        if (og.image) {
            tags.push(`<meta property="og:image" content="${og.image}">`);
            if (og.imageAlt) tags.push(`<meta property="og:image:alt" content="${this.escapeHtml(og.imageAlt)}">`);
            if (og.imageWidth) tags.push(`<meta property="og:image:width" content="${og.imageWidth}">`);
            if (og.imageHeight) tags.push(`<meta property="og:image:height" content="${og.imageHeight}">`);
        }
        if (og.url) tags.push(`<meta property="og:url" content="${og.url}">`);
        if (this.config.siteName) tags.push(`<meta property="og:site_name" content="${this.escapeHtml(this.config.siteName)}">`);
        if (this.config.locale) tags.push(`<meta property="og:locale" content="${this.config.locale}">`);

        return tags;
    }

    /**
     * Generate Twitter Card meta tags
     * @returns {Array} Array of meta tag strings
     */
    generateTwitterCardTags() {
        const tags = [];
        const twitter = this.config.twitter;

        if (twitter.card) tags.push(`<meta name="twitter:card" content="${twitter.card}">`);
        if (twitter.site) tags.push(`<meta name="twitter:site" content="${twitter.site}">`);
        if (twitter.creator) tags.push(`<meta name="twitter:creator" content="${twitter.creator}">`);
        if (twitter.title) tags.push(`<meta name="twitter:title" content="${this.escapeHtml(twitter.title)}">`);
        if (twitter.description) tags.push(`<meta name="twitter:description" content="${this.escapeHtml(twitter.description)}">`);
        if (twitter.image) {
            tags.push(`<meta name="twitter:image" content="${twitter.image}">`);
            if (twitter.imageAlt) tags.push(`<meta name="twitter:image:alt" content="${this.escapeHtml(twitter.imageAlt)}">`);
        }

        return tags;
    }

    /**
     * Generate structured data script tag
     * @returns {string} Script tag with JSON-LD
     */
    generateStructuredData() {
        const jsonLd = JSON.stringify(this.config.structuredData, null, 2);
        return `<script type="application/ld+json">\n${jsonLd}\n</script>`;
    }

    /**
     * Generate analytics scripts
     * @returns {string} Analytics script tags
     */
    generateAnalyticsScripts() {
        const scripts = [];

        // Google Analytics
        if (this.config.googleAnalytics) {
            scripts.push(`
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalytics}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${this.config.googleAnalytics}');
</script>
<!-- End Google Analytics -->`);
        }

        // Google Tag Manager
        if (this.config.googleTagManager) {
            scripts.push(`
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${this.config.googleTagManager}');</script>
<!-- End Google Tag Manager -->`);
        }

        return scripts.join('\n');
    }

    /**
     * Apply SEO configuration to document
     */
    apply() {
        if (typeof document === 'undefined') return;

        // Update title
        document.title = this.config.title;

        // Update meta description
        this.updateMetaTag('name', 'description', this.config.description);

        // Update meta keywords
        if (this.config.keywords && this.config.keywords.length > 0) {
            const keywords = Array.isArray(this.config.keywords) 
                ? this.config.keywords.join(', ') 
                : this.config.keywords;
            this.updateMetaTag('name', 'keywords', keywords);
        }

        // Update canonical URL
        const canonical = this.config.canonical || window.location.href;
        this.updateLinkTag('canonical', canonical);

        // Update Open Graph tags
        this.updateMetaTag('property', 'og:title', this.config.openGraph.title);
        this.updateMetaTag('property', 'og:description', this.config.openGraph.description);
        this.updateMetaTag('property', 'og:image', this.config.openGraph.image);
        this.updateMetaTag('property', 'og:url', this.config.openGraph.url || window.location.href);

        // Update Twitter Card tags
        this.updateMetaTag('name', 'twitter:title', this.config.twitter.title);
        this.updateMetaTag('name', 'twitter:description', this.config.twitter.description);
        this.updateMetaTag('name', 'twitter:image', this.config.twitter.image);

        // Update structured data
        this.updateStructuredData();
    }

    /**
     * Update meta tag
     * @param {string} attribute - Attribute name ('name' or 'property')
     * @param {string} value - Attribute value
     * @param {string} content - Content value
     */
    updateMetaTag(attribute, value, content) {
        if (!content) return;

        let meta = document.querySelector(`meta[${attribute}="${value}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, value);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    /**
     * Update link tag
     * @param {string} rel - Rel attribute value
     * @param {string} href - Href attribute value
     */
    updateLinkTag(rel, href) {
        if (!href) return;

        let link = document.querySelector(`link[rel="${rel}"]`);
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', rel);
            document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    }

    /**
     * Update structured data
     */
    updateStructuredData() {
        // Remove existing structured data
        const existing = document.querySelector('script[type="application/ld+json"]');
        if (existing) {
            existing.remove();
        }

        // Add new structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(this.config.structuredData, null, 2);
        document.head.appendChild(script);
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
     * Update configuration
     * @param {Object} newConfig - New configuration values
     */
    update(newConfig) {
        this.config = this.deepMerge(this.config, newConfig);
        this.apply();
    }

    /**
     * Get current configuration
     * @returns {Object} Current configuration
     */
    getConfig() {
        return { ...this.config };
    }

    /**
     * Generate complete HTML head section
     * @returns {string} Complete HTML head content
     */
    generateCompleteHead() {
        return `
    <meta charset="UTF-8">
    ${this.generateMetaTags()}
    
    ${this.generateStructuredData()}
    
    ${this.generateAnalyticsScripts()}
`.trim();
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOConfig;
}

// Global export
if (typeof window !== 'undefined') {
    window.SEOConfig = SEOConfig;
} 