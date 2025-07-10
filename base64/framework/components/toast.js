/**
 * Toast Component
 * Reusable toast notification system with animations and auto-dismiss
 */

class Toast {
    constructor(config = {}) {
        this.config = {
            duration: config.duration || 3000,
            position: config.position || 'bottom-center',
            className: config.className || '',
            autoInit: config.autoInit !== false,
            ...config
        };
        
        this.toastElement = null;
        this.timeoutId = null;
        
        if (this.config.autoInit) {
            this.init();
        }
    }

    init() {
        this.createToastContainer();
        this.attachEventListeners();
    }

    createToastContainer() {
        if (document.getElementById('toast-container')) {
            return; // Already exists
        }

        const positionClasses = {
            'top-left': 'top-4 left-4',
            'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
            'top-right': 'top-4 right-4',
            'bottom-left': 'bottom-4 left-4',
            'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
            'bottom-right': 'bottom-4 right-4',
            'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        };

        const containerHTML = `
            <div id="toast-container" class="fixed ${positionClasses[this.config.position]} z-50 pointer-events-none">
                <!-- Toast notifications will be inserted here -->
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', containerHTML);
    }

    show(message, type = 'info', customDuration = null) {
        const duration = customDuration || this.config.duration;
        const toastId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const toastHTML = `
            <div id="${toastId}" class="toast-item pointer-events-auto transform translate-y-full opacity-0 transition-all duration-300 ease-out mb-4">
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-4 min-w-[300px] max-w-md mx-4 ${this.config.className}">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            ${this.getIcon(type)}
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">
                                ${this.escapeHtml(message)}
                            </p>
                        </div>
                        <button class="toast-close text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('toast-container');
        container.insertAdjacentHTML('afterbegin', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        
        // Add event listener for close button
        const closeBtn = toastElement.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.dismiss(toastId));
        
        // Show toast with animation
        requestAnimationFrame(() => {
            toastElement.classList.remove('translate-y-full', 'opacity-0');
            toastElement.classList.add('translate-y-0', 'opacity-100');
        });
        
        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(toastId);
            }, duration);
        }
        
        return toastId;
    }

    dismiss(toastId) {
        const toastElement = document.getElementById(toastId);
        if (!toastElement) return;
        
        toastElement.classList.remove('translate-y-0', 'opacity-100');
        toastElement.classList.add('translate-y-full', 'opacity-0');
        
        setTimeout(() => {
            toastElement.remove();
        }, 300);
    }

    getIcon(type) {
        const icons = {
            success: `
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            error: `
                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            warning: `
                <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.636 0L3.178 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
            `,
            info: `
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `
        };
        
        return icons[type] || icons.info;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    attachEventListeners() {
        // Listen for theme changes to update toast styling
        document.addEventListener('themeChanged', (e) => {
            // Toast styling automatically adapts via Tailwind classes
        });
    }

    // Static methods for convenience
    static success(message, duration) {
        return Toast.getInstance().show(message, 'success', duration);
    }

    static error(message, duration) {
        return Toast.getInstance().show(message, 'error', duration);
    }

    static warning(message, duration) {
        return Toast.getInstance().show(message, 'warning', duration);
    }

    static info(message, duration) {
        return Toast.getInstance().show(message, 'info', duration);
    }

    static getInstance() {
        if (!Toast._instance) {
            Toast._instance = new Toast();
        }
        return Toast._instance;
    }

    // Clear all toasts
    static clearAll() {
        const container = document.getElementById('toast-container');
        if (container) {
            container.innerHTML = '';
        }
    }
}

// Auto-initialize if config is provided
if (typeof window !== 'undefined' && window.toastConfig) {
    new Toast(window.toastConfig);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Toast;
}

// Global export
window.Toast = Toast; 