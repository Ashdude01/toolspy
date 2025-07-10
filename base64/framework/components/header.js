/**
 * Header Component
 * Reusable header with logo, title, navigation, and dark mode toggle
 */

class Header {
    constructor(config = {}) {
        this.config = {
            title: config.title || 'Tool Title',
            subtitle: config.subtitle || 'Tool Description',
            logo: config.logo || this.getDefaultLogo(),
            navigationItems: config.navigationItems || [],
            showDarkModeToggle: config.showDarkModeToggle !== false,
            ...config
        };
        
        this.darkMode = null;
        this.init();
    }

    getDefaultLogo() {
        return `
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
        `;
    }

    init() {
        this.render();
        this.attachEventListeners();
        
        // Initialize dark mode if enabled
        if (this.config.showDarkModeToggle) {
            this.initializeDarkMode();
        }
    }

    render() {
        const headerHTML = `
            <header class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                ${this.config.logo}
                            </div>
                            <div>
                                <h1 class="text-xl font-bold text-gray-900 dark:text-white">${this.config.title}</h1>
                                <p class="text-sm text-gray-500 dark:text-gray-400">${this.config.subtitle}</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-4">
                            ${this.renderNavigationItems()}
                            ${this.config.showDarkModeToggle ? this.renderDarkModeToggle() : ''}
                        </div>
                    </div>
                </div>
            </header>
        `;

        // Insert header at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    renderNavigationItems() {
        if (!this.config.navigationItems || this.config.navigationItems.length === 0) {
            return '';
        }

        return this.config.navigationItems.map(item => `
            <a href="${item.url}" class="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium">
                ${item.text}
            </a>
        `).join('');
    }

    renderDarkModeToggle() {
        return `
            <button 
                id="darkModeToggle"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Toggle dark mode"
            >
                <svg id="sunIcon" class="w-5 h-5 text-gray-700 dark:text-gray-300 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <svg id="moonIcon" class="w-5 h-5 text-gray-700 dark:text-gray-300 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
            </button>
        `;
    }

    attachEventListeners() {
        // Event listeners are attached after DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            if (this.config.showDarkModeToggle) {
                const darkModeToggle = document.getElementById('darkModeToggle');
                if (darkModeToggle) {
                    darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
                }
            }
        });
    }

    initializeDarkMode() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        }
    }

    toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Dispatch custom event for other components to listen
        const event = new CustomEvent('themeChanged', { 
            detail: { theme: isDark ? 'dark' : 'light' } 
        });
        document.dispatchEvent(event);
        
        // Show toast notification if toast system is available
        if (window.Toast) {
            window.Toast.show(
                isDark ? 'Dark mode enabled' : 'Light mode enabled',
                'success'
            );
        }
    }

    // Method to update header content dynamically
    updateContent(newConfig) {
        this.config = { ...this.config, ...newConfig };
        const header = document.querySelector('header');
        if (header) {
            header.remove();
        }
        this.render();
    }
}

// Auto-initialize if config is provided
if (typeof window !== 'undefined' && window.headerConfig) {
    new Header(window.headerConfig);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}

// Global export
window.Header = Header; 