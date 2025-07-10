/**
 * Application Configuration
 * Centralized configuration management for the framework
 */

class AppConfig {
    constructor(config = {}) {
        this.config = this.mergeWithDefaults(config);
        this.listeners = new Map();
    }

    /**
     * Default configuration values
     */
    getDefaults() {
        return {
            // Application Info
            app: {
                name: 'Tool Application',
                version: '1.0.0',
                description: 'A powerful tool application',
                author: 'Your Name',
                url: 'https://yourdomain.com'
            },

            // Theme Configuration
            theme: {
                primaryColor: '#3B82F6',
                secondaryColor: '#9333EA',
                successColor: '#22C55E',
                errorColor: '#EF4444',
                warningColor: '#F59E0B',
                darkMode: 'auto', // 'auto', 'light', 'dark'
                fontFamily: 'Inter, sans-serif'
            },

            // Layout Configuration
            layout: {
                maxWidth: '1200px',
                headerHeight: '64px',
                footerHeight: 'auto',
                sidebarWidth: '280px',
                containerPadding: '1rem'
            },

            // Component Configuration
            components: {
                header: {
                    show: true,
                    sticky: false,
                    showLogo: true,
                    showNavigation: true,
                    showDarkModeToggle: true
                },
                footer: {
                    show: true,
                    showPrivacyNote: true,
                    links: []
                },
                toast: {
                    position: 'bottom-center',
                    duration: 3000,
                    maxToasts: 5
                },
                animations: {
                    enabled: true,
                    duration: 300,
                    easing: 'ease-out'
                }
            },

            // Feature Flags
            features: {
                analytics: false,
                serviceWorker: true,
                offline: false,
                pushNotifications: false,
                fileUpload: true,
                dragAndDrop: true,
                clipboard: true,
                keyboard: true
            },

            // API Configuration
            api: {
                baseUrl: '',
                timeout: 10000,
                retries: 3,
                headers: {}
            },

            // Storage Configuration
            storage: {
                prefix: 'app_',
                engine: 'localStorage', // 'localStorage', 'sessionStorage', 'indexedDB'
                encrypt: false
            },

            // Performance Configuration
            performance: {
                enableLazyLoading: true,
                preloadImages: false,
                optimizeImages: true,
                minifyOutput: false
            },

            // Accessibility Configuration
            accessibility: {
                enableKeyboardNavigation: true,
                enableScreenReader: true,
                enableHighContrast: false,
                enableReducedMotion: 'auto' // 'auto', 'enabled', 'disabled'
            },

            // Development Configuration
            development: {
                debug: false,
                showPerformanceMetrics: false,
                enableHotReload: false,
                showGridOverlay: false
            }
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
     * Get configuration value
     * @param {string} path - Configuration path (e.g., 'theme.primaryColor')
     * @param {any} defaultValue - Default value if not found
     * @returns {any} Configuration value
     */
    get(path, defaultValue = undefined) {
        const keys = path.split('.');
        let current = this.config;

        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }

        return current;
    }

    /**
     * Set configuration value
     * @param {string} path - Configuration path
     * @param {any} value - Value to set
     */
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = this.config;

        // Navigate to the parent object
        for (const key of keys) {
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }

        // Set the value
        const oldValue = current[lastKey];
        current[lastKey] = value;

        // Notify listeners
        this.notifyListeners(path, value, oldValue);

        // Save to storage if enabled
        this.saveToStorage();
    }

    /**
     * Check if configuration path exists
     * @param {string} path - Configuration path
     * @returns {boolean} True if exists
     */
    has(path) {
        return this.get(path) !== undefined;
    }

    /**
     * Remove configuration value
     * @param {string} path - Configuration path
     */
    remove(path) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = this.config;

        // Navigate to the parent object
        for (const key of keys) {
            if (!current[key] || typeof current[key] !== 'object') {
                return; // Path doesn't exist
            }
            current = current[key];
        }

        // Remove the value
        const oldValue = current[lastKey];
        delete current[lastKey];

        // Notify listeners
        this.notifyListeners(path, undefined, oldValue);

        // Save to storage if enabled
        this.saveToStorage();
    }

    /**
     * Get all configuration
     * @returns {Object} Full configuration object
     */
    getAll() {
        return { ...this.config };
    }

    /**
     * Replace entire configuration
     * @param {Object} newConfig - New configuration
     */
    setAll(newConfig) {
        const oldConfig = { ...this.config };
        this.config = this.mergeWithDefaults(newConfig);

        // Notify listeners for all changed paths
        this.notifyAllListeners(oldConfig, this.config);

        // Save to storage if enabled
        this.saveToStorage();
    }

    /**
     * Reset configuration to defaults
     */
    reset() {
        this.setAll({});
    }

    /**
     * Add configuration change listener
     * @param {string} path - Configuration path to watch
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    onChange(path, callback) {
        if (!this.listeners.has(path)) {
            this.listeners.set(path, new Set());
        }
        
        this.listeners.get(path).add(callback);

        // Return unsubscribe function
        return () => {
            const pathListeners = this.listeners.get(path);
            if (pathListeners) {
                pathListeners.delete(callback);
                if (pathListeners.size === 0) {
                    this.listeners.delete(path);
                }
            }
        };
    }

    /**
     * Notify listeners of configuration changes
     * @param {string} path - Changed path
     * @param {any} newValue - New value
     * @param {any} oldValue - Old value
     */
    notifyListeners(path, newValue, oldValue) {
        // Notify exact path listeners
        const pathListeners = this.listeners.get(path);
        if (pathListeners) {
            pathListeners.forEach(callback => {
                try {
                    callback(newValue, oldValue, path);
                } catch (error) {
                    console.error('Error in config change listener:', error);
                }
            });
        }

        // Notify wildcard listeners
        const wildcardListeners = this.listeners.get('*');
        if (wildcardListeners) {
            wildcardListeners.forEach(callback => {
                try {
                    callback(newValue, oldValue, path);
                } catch (error) {
                    console.error('Error in config change listener:', error);
                }
            });
        }
    }

    /**
     * Notify all listeners (used when replacing entire config)
     * @param {Object} oldConfig - Old configuration
     * @param {Object} newConfig - New configuration
     */
    notifyAllListeners(oldConfig, newConfig) {
        const changedPaths = this.getChangedPaths(oldConfig, newConfig);
        
        changedPaths.forEach(({ path, oldValue, newValue }) => {
            this.notifyListeners(path, newValue, oldValue);
        });
    }

    /**
     * Get paths that changed between two configurations
     * @param {Object} oldConfig - Old configuration
     * @param {Object} newConfig - New configuration
     * @param {string} basePath - Base path for recursion
     * @returns {Array} Array of changed paths
     */
    getChangedPaths(oldConfig, newConfig, basePath = '') {
        const changes = [];
        const allKeys = new Set([
            ...Object.keys(oldConfig || {}),
            ...Object.keys(newConfig || {})
        ]);

        allKeys.forEach(key => {
            const currentPath = basePath ? `${basePath}.${key}` : key;
            const oldValue = oldConfig?.[key];
            const newValue = newConfig?.[key];

            if (this.isObject(oldValue) && this.isObject(newValue)) {
                // Recursively check nested objects
                changes.push(...this.getChangedPaths(oldValue, newValue, currentPath));
            } else if (oldValue !== newValue) {
                changes.push({
                    path: currentPath,
                    oldValue,
                    newValue
                });
            }
        });

        return changes;
    }

    /**
     * Load configuration from storage
     */
    loadFromStorage() {
        try {
            const storageKey = `${this.get('storage.prefix')}config`;
            const engine = this.get('storage.engine');
            let stored = null;

            if (engine === 'localStorage' && typeof localStorage !== 'undefined') {
                stored = localStorage.getItem(storageKey);
            } else if (engine === 'sessionStorage' && typeof sessionStorage !== 'undefined') {
                stored = sessionStorage.getItem(storageKey);
            }

            if (stored) {
                const parsedConfig = JSON.parse(stored);
                this.config = this.mergeWithDefaults(parsedConfig);
            }
        } catch (error) {
            console.warn('Failed to load config from storage:', error);
        }
    }

    /**
     * Save configuration to storage
     */
    saveToStorage() {
        try {
            const storageKey = `${this.get('storage.prefix')}config`;
            const engine = this.get('storage.engine');
            const configStr = JSON.stringify(this.config);

            if (engine === 'localStorage' && typeof localStorage !== 'undefined') {
                localStorage.setItem(storageKey, configStr);
            } else if (engine === 'sessionStorage' && typeof sessionStorage !== 'undefined') {
                sessionStorage.setItem(storageKey, configStr);
            }
        } catch (error) {
            console.warn('Failed to save config to storage:', error);
        }
    }

    /**
     * Clear configuration from storage
     */
    clearStorage() {
        try {
            const storageKey = `${this.get('storage.prefix')}config`;
            const engine = this.get('storage.engine');

            if (engine === 'localStorage' && typeof localStorage !== 'undefined') {
                localStorage.removeItem(storageKey);
            } else if (engine === 'sessionStorage' && typeof sessionStorage !== 'undefined') {
                sessionStorage.removeItem(storageKey);
            }
        } catch (error) {
            console.warn('Failed to clear config from storage:', error);
        }
    }

    /**
     * Export configuration as JSON
     * @returns {string} JSON string
     */
    export() {
        return JSON.stringify(this.config, null, 2);
    }

    /**
     * Import configuration from JSON
     * @param {string} jsonString - JSON configuration string
     */
    import(jsonString) {
        try {
            const importedConfig = JSON.parse(jsonString);
            this.setAll(importedConfig);
        } catch (error) {
            throw new Error('Invalid JSON configuration: ' + error.message);
        }
    }

    /**
     * Validate configuration against schema
     * @param {Object} schema - Configuration schema
     * @returns {Object} Validation result
     */
    validate(schema) {
        // Basic validation implementation
        // This could be extended with a proper schema validation library
        const errors = [];
        
        function validateObject(obj, schemaObj, path = '') {
            for (const key in schemaObj) {
                const currentPath = path ? `${path}.${key}` : key;
                const schemaProperty = schemaObj[key];
                const value = obj[key];

                if (schemaProperty.required && (value === undefined || value === null)) {
                    errors.push(`Required property '${currentPath}' is missing`);
                    continue;
                }

                if (value !== undefined && schemaProperty.type) {
                    const actualType = Array.isArray(value) ? 'array' : typeof value;
                    if (actualType !== schemaProperty.type) {
                        errors.push(`Property '${currentPath}' should be of type '${schemaProperty.type}', got '${actualType}'`);
                    }
                }

                if (schemaProperty.properties && typeof value === 'object' && !Array.isArray(value)) {
                    validateObject(value, schemaProperty.properties, currentPath);
                }
            }
        }

        validateObject(this.config, schema);

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

// Singleton instance
let configInstance = null;

/**
 * Get or create configuration instance
 * @param {Object} config - Initial configuration
 * @returns {AppConfig} Configuration instance
 */
function getConfig(config = {}) {
    if (!configInstance) {
        configInstance = new AppConfig(config);
        
        // Auto-load from storage if available
        if (typeof window !== 'undefined') {
            configInstance.loadFromStorage();
        }
    }
    return configInstance;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppConfig, getConfig };
}

// Global export
if (typeof window !== 'undefined') {
    window.AppConfig = AppConfig;
    window.getConfig = getConfig;
} 