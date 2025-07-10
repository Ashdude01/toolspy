/**
 * Validation Utilities
 * Helper functions for data validation
 */

class ValidationUtils {
    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate URL
     * @param {string} url - URL to validate
     * @returns {boolean} True if valid URL
     */
    static isValidURL(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch (e) {
            return false;
        }
    }

    /**
     * Validate phone number (basic)
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if valid phone
     */
    static isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @param {Object} options - Validation options
     * @returns {Object} Validation result with score and feedback
     */
    static validatePassword(password, options = {}) {
        const {
            minLength = 8,
            requireUppercase = true,
            requireLowercase = true,
            requireNumbers = true,
            requireSpecialChars = true,
            maxLength = 128
        } = options;

        const result = {
            valid: false,
            score: 0,
            feedback: [],
            strength: 'weak'
        };

        // Check length
        if (password.length < minLength) {
            result.feedback.push(`Password must be at least ${minLength} characters long`);
        } else {
            result.score += 1;
        }

        if (password.length > maxLength) {
            result.feedback.push(`Password must be no more than ${maxLength} characters long`);
        }

        // Check uppercase
        if (requireUppercase && !/[A-Z]/.test(password)) {
            result.feedback.push('Password must contain at least one uppercase letter');
        } else if (requireUppercase) {
            result.score += 1;
        }

        // Check lowercase
        if (requireLowercase && !/[a-z]/.test(password)) {
            result.feedback.push('Password must contain at least one lowercase letter');
        } else if (requireLowercase) {
            result.score += 1;
        }

        // Check numbers
        if (requireNumbers && !/\d/.test(password)) {
            result.feedback.push('Password must contain at least one number');
        } else if (requireNumbers) {
            result.score += 1;
        }

        // Check special characters
        if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            result.feedback.push('Password must contain at least one special character');
        } else if (requireSpecialChars) {
            result.score += 1;
        }

        // Calculate strength
        const maxScore = 5;
        const percentage = (result.score / maxScore) * 100;
        
        if (percentage >= 80) {
            result.strength = 'strong';
        } else if (percentage >= 60) {
            result.strength = 'medium';
        } else {
            result.strength = 'weak';
        }

        result.valid = result.feedback.length === 0;
        
        return result;
    }

    /**
     * Validate required field
     * @param {any} value - Value to validate
     * @param {string} fieldName - Name of the field
     * @returns {Object} Validation result
     */
    static validateRequired(value, fieldName = 'Field') {
        const isEmpty = value === null || 
                       value === undefined || 
                       value === '' || 
                       (Array.isArray(value) && value.length === 0) ||
                       (typeof value === 'object' && Object.keys(value).length === 0);

        return {
            valid: !isEmpty,
            message: isEmpty ? `${fieldName} is required` : ''
        };
    }

    /**
     * Validate string length
     * @param {string} str - String to validate
     * @param {number} min - Minimum length
     * @param {number} max - Maximum length
     * @param {string} fieldName - Name of the field
     * @returns {Object} Validation result
     */
    static validateLength(str, min = 0, max = Infinity, fieldName = 'Field') {
        const length = str ? str.length : 0;
        const errors = [];

        if (length < min) {
            errors.push(`${fieldName} must be at least ${min} characters long`);
        }

        if (length > max) {
            errors.push(`${fieldName} must be no more than ${max} characters long`);
        }

        return {
            valid: errors.length === 0,
            errors: errors,
            message: errors.join(', ')
        };
    }

    /**
     * Validate number range
     * @param {number} num - Number to validate
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @param {string} fieldName - Name of the field
     * @returns {Object} Validation result
     */
    static validateRange(num, min = -Infinity, max = Infinity, fieldName = 'Field') {
        const errors = [];

        if (isNaN(num)) {
            errors.push(`${fieldName} must be a valid number`);
        } else {
            if (num < min) {
                errors.push(`${fieldName} must be at least ${min}`);
            }

            if (num > max) {
                errors.push(`${fieldName} must be no more than ${max}`);
            }
        }

        return {
            valid: errors.length === 0,
            errors: errors,
            message: errors.join(', ')
        };
    }

    /**
     * Validate against pattern
     * @param {string} value - Value to validate
     * @param {RegExp} pattern - Regex pattern
     * @param {string} message - Error message
     * @returns {Object} Validation result
     */
    static validatePattern(value, pattern, message = 'Invalid format') {
        const valid = pattern.test(value);
        
        return {
            valid: valid,
            message: valid ? '' : message
        };
    }

    /**
     * Validate JSON string
     * @param {string} jsonString - JSON string to validate
     * @returns {Object} Validation result
     */
    static validateJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            return {
                valid: true,
                parsed: parsed,
                message: ''
            };
        } catch (error) {
            return {
                valid: false,
                parsed: null,
                message: `Invalid JSON: ${error.message}`
            };
        }
    }

    /**
     * Validate Base64 string
     * @param {string} base64 - Base64 string to validate
     * @returns {Object} Validation result
     */
    static validateBase64(base64) {
        try {
            // Remove data URL prefix if present
            const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
            
            // Check if it's valid base64
            const decoded = atob(base64Data);
            const encoded = btoa(decoded);
            
            const valid = encoded === base64Data;
            
            return {
                valid: valid,
                message: valid ? '' : 'Invalid Base64 format',
                size: decoded.length
            };
        } catch (error) {
            return {
                valid: false,
                message: `Invalid Base64: ${error.message}`,
                size: 0
            };
        }
    }

    /**
     * Validate hex color
     * @param {string} color - Hex color to validate
     * @returns {Object} Validation result
     */
    static validateHexColor(color) {
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const valid = hexRegex.test(color);
        
        return {
            valid: valid,
            message: valid ? '' : 'Invalid hex color format (e.g., #FF0000 or #F00)'
        };
    }

    /**
     * Validate date
     * @param {string} dateString - Date string to validate
     * @param {string} format - Expected format (optional)
     * @returns {Object} Validation result
     */
    static validateDate(dateString, format = null) {
        const date = new Date(dateString);
        const valid = !isNaN(date.getTime());
        
        return {
            valid: valid,
            parsed: valid ? date : null,
            message: valid ? '' : 'Invalid date format'
        };
    }

    /**
     * Validate credit card number (basic Luhn algorithm)
     * @param {string} cardNumber - Credit card number
     * @returns {Object} Validation result
     */
    static validateCreditCard(cardNumber) {
        // Remove spaces and dashes
        const cleanNumber = cardNumber.replace(/[\s-]/g, '');
        
        // Check if it's all digits
        if (!/^\d+$/.test(cleanNumber)) {
            return {
                valid: false,
                message: 'Credit card number must contain only digits'
            };
        }

        // Check length (most cards are 13-19 digits)
        if (cleanNumber.length < 13 || cleanNumber.length > 19) {
            return {
                valid: false,
                message: 'Credit card number must be 13-19 digits long'
            };
        }

        // Luhn algorithm
        let sum = 0;
        let isEven = false;
        
        for (let i = cleanNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cleanNumber[i]);
            
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            isEven = !isEven;
        }

        const valid = sum % 10 === 0;
        
        return {
            valid: valid,
            message: valid ? '' : 'Invalid credit card number'
        };
    }

    /**
     * Validate IP address
     * @param {string} ip - IP address to validate
     * @param {string} version - IP version ('v4', 'v6', or 'both')
     * @returns {Object} Validation result
     */
    static validateIP(ip, version = 'both') {
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        
        let valid = false;
        let detectedVersion = '';
        
        if (version === 'v4' || version === 'both') {
            if (ipv4Regex.test(ip)) {
                valid = true;
                detectedVersion = 'v4';
            }
        }
        
        if (!valid && (version === 'v6' || version === 'both')) {
            if (ipv6Regex.test(ip)) {
                valid = true;
                detectedVersion = 'v6';
            }
        }
        
        return {
            valid: valid,
            version: detectedVersion,
            message: valid ? '' : `Invalid IPv${version === 'both' ? '4/IPv6' : version} address`
        };
    }

    /**
     * Validate form data
     * @param {Object} data - Form data object
     * @param {Object} rules - Validation rules
     * @returns {Object} Validation result
     */
    static validateForm(data, rules) {
        const errors = {};
        let valid = true;

        for (const [field, fieldRules] of Object.entries(rules)) {
            const value = data[field];
            const fieldErrors = [];

            for (const rule of fieldRules) {
                const result = this.validateField(value, rule, field);
                if (!result.valid) {
                    fieldErrors.push(result.message);
                    valid = false;
                }
            }

            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            }
        }

        return {
            valid: valid,
            errors: errors,
            data: data
        };
    }

    /**
     * Validate single field
     * @param {any} value - Field value
     * @param {Object} rule - Validation rule
     * @param {string} fieldName - Field name
     * @returns {Object} Validation result
     */
    static validateField(value, rule, fieldName) {
        const { type, ...options } = rule;

        switch (type) {
            case 'required':
                return this.validateRequired(value, fieldName);
            
            case 'email':
                return {
                    valid: this.isValidEmail(value),
                    message: this.isValidEmail(value) ? '' : 'Invalid email format'
                };
            
            case 'url':
                return {
                    valid: this.isValidURL(value),
                    message: this.isValidURL(value) ? '' : 'Invalid URL format'
                };
            
            case 'length':
                return this.validateLength(value, options.min, options.max, fieldName);
            
            case 'range':
                return this.validateRange(value, options.min, options.max, fieldName);
            
            case 'pattern':
                return this.validatePattern(value, options.pattern, options.message);
            
            case 'password':
                return this.validatePassword(value, options);
            
            default:
                return { valid: true, message: '' };
        }
    }

    /**
     * Sanitize string (remove HTML tags)
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string
     */
    static sanitizeString(str) {
        if (typeof str !== 'string') return str;
        
        return str.replace(/<[^>]*>/g, '');
    }

    /**
     * Escape HTML characters
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    static escapeHTML(str) {
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
     * Check if string contains only alphanumeric characters
     * @param {string} str - String to check
     * @returns {boolean} True if alphanumeric
     */
    static isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    /**
     * Check if string contains only letters
     * @param {string} str - String to check
     * @returns {boolean} True if letters only
     */
    static isAlpha(str) {
        return /^[a-zA-Z]+$/.test(str);
    }

    /**
     * Check if string contains only digits
     * @param {string} str - String to check
     * @returns {boolean} True if digits only
     */
    static isNumeric(str) {
        return /^\d+$/.test(str);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationUtils;
}

// Global export
window.ValidationUtils = ValidationUtils; 