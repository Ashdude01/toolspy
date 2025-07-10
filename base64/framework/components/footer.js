/**
 * Footer Component
 * Reusable footer with customizable content and layout
 */

class Footer {
    constructor(config = {}) {
        this.config = {
            content: config.content || 'Made with ❤️ for developers.',
            subContent: config.subContent || 'All processing happens locally in your browser.',
            links: config.links || [],
            showPrivacyNote: config.showPrivacyNote !== false,
            customHTML: config.customHTML || '',
            className: config.className || '',
            ...config
        };
        
        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const footerHTML = `
            <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 ${this.config.className}">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    ${this.renderContent()}
                </div>
            </footer>
        `;

        // Insert footer at the end of body
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    renderContent() {
        if (this.config.customHTML) {
            return this.config.customHTML;
        }

        return `
            <div class="text-center">
                ${this.renderMainContent()}
                ${this.renderLinks()}
                ${this.renderPrivacyNote()}
            </div>
        `;
    }

    renderMainContent() {
        if (!this.config.content) return '';
        
        return `
            <p class="text-gray-600 dark:text-gray-400 text-lg">
                ${this.config.content}
            </p>
        `;
    }

    renderLinks() {
        if (!this.config.links || this.config.links.length === 0) {
            return '';
        }

        return `
            <div class="flex flex-wrap justify-center gap-6 mt-4">
                ${this.config.links.map(link => `
                    <a href="${link.url}" 
                       class="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
                       ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
                    >
                        ${link.text}
                    </a>
                `).join('')}
            </div>
        `;
    }

    renderPrivacyNote() {
        if (!this.config.showPrivacyNote || !this.config.subContent) {
            return '';
        }

        return `
            <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                ${this.config.subContent}
            </p>
        `;
    }

    // Method to update footer content dynamically
    updateContent(newConfig) {
        this.config = { ...this.config, ...newConfig };
        const footer = document.querySelector('footer');
        if (footer) {
            footer.remove();
        }
        this.render();
    }

    // Method to add a link dynamically
    addLink(link) {
        if (!this.config.links) {
            this.config.links = [];
        }
        this.config.links.push(link);
        this.updateContent({});
    }

    // Method to remove a link by text or url
    removeLink(identifier) {
        if (!this.config.links) return;
        
        this.config.links = this.config.links.filter(link => 
            link.text !== identifier && link.url !== identifier
        );
        this.updateContent({});
    }
}

// Auto-initialize if config is provided
if (typeof window !== 'undefined' && window.footerConfig) {
    new Footer(window.footerConfig);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Footer;
}

// Global export
window.Footer = Footer; 