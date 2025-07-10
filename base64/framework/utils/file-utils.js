/**
 * File Utilities
 * Helper functions for file operations
 */

class FileUtils {
    /**
     * Format file size in human readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted size string
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Get file extension from filename
     * @param {string} filename - The filename
     * @returns {string} File extension in lowercase
     */
    static getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }

    /**
     * Get MIME type from file extension
     * @param {string} extension - File extension
     * @returns {string} MIME type
     */
    static getMimeType(extension) {
        const mimeTypes = {
            // Text files
            'txt': 'text/plain',
            'csv': 'text/csv',
            'json': 'application/json',
            'xml': 'application/xml',
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'md': 'text/markdown',
            
            // Images
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'webp': 'image/webp',
            'bmp': 'image/bmp',
            'ico': 'image/x-icon',
            'tiff': 'image/tiff',
            'tif': 'image/tiff',
            'avif': 'image/avif',
            'heic': 'image/heic',
            'heif': 'image/heif',
            
            // Documents
            'pdf': 'application/pdf',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            
            // Archives
            'zip': 'application/zip',
            'rar': 'application/x-rar-compressed',
            '7z': 'application/x-7z-compressed',
            'tar': 'application/x-tar',
            'gz': 'application/gzip',
            
            // Audio
            'mp3': 'audio/mpeg',
            'wav': 'audio/wav',
            'ogg': 'audio/ogg',
            'flac': 'audio/flac',
            
            // Video
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'ogg': 'video/ogg',
            'avi': 'video/x-msvideo',
            'mov': 'video/quicktime'
        };
        
        return mimeTypes[extension] || 'application/octet-stream';
    }

    /**
     * Validate file against allowed types and size
     * @param {File} file - The file to validate
     * @param {Object} options - Validation options
     * @returns {Object} Validation result
     */
    static validateFile(file, options = {}) {
        const {
            allowedTypes = [],
            allowedExtensions = [],
            maxSize = 10 * 1024 * 1024, // 10MB default
            minSize = 0
        } = options;

        const errors = [];
        
        // Check if file exists
        if (!file) {
            errors.push('No file provided');
            return { valid: false, errors };
        }

        // Check file size
        if (file.size > maxSize) {
            errors.push(`File size too large. Maximum allowed: ${this.formatFileSize(maxSize)}`);
        }
        
        if (file.size < minSize) {
            errors.push(`File size too small. Minimum required: ${this.formatFileSize(minSize)}`);
        }

        // Check file type
        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
            errors.push(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
        }

        // Check file extension
        if (allowedExtensions.length > 0) {
            const extension = this.getFileExtension(file.name);
            if (!allowedExtensions.includes(extension)) {
                errors.push(`File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`);
            }
        }

        return {
            valid: errors.length === 0,
            errors,
            file: {
                name: file.name,
                size: file.size,
                type: file.type,
                extension: this.getFileExtension(file.name),
                lastModified: file.lastModified
            }
        };
    }

    /**
     * Read file as text
     * @param {File} file - The file to read
     * @returns {Promise<string>} File content as text
     */
    static readAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    /**
     * Read file as data URL
     * @param {File} file - The file to read
     * @returns {Promise<string>} File content as data URL
     */
    static readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }

    /**
     * Read file as array buffer
     * @param {File} file - The file to read
     * @returns {Promise<ArrayBuffer>} File content as array buffer
     */
    static readAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Download text as file
     * @param {string} content - The content to download
     * @param {string} filename - The filename
     * @param {string} mimeType - The MIME type
     */
    static downloadAsFile(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
    }

    /**
     * Download blob as file
     * @param {Blob} blob - The blob to download
     * @param {string} filename - The filename
     */
    static downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
    }

    /**
     * Convert file to base64
     * @param {File} file - The file to convert
     * @returns {Promise<string>} Base64 encoded string
     */
    static async fileToBase64(file) {
        const dataUrl = await this.readAsDataURL(file);
        return dataUrl.split(',')[1]; // Remove data URL prefix
    }

    /**
     * Convert base64 to blob
     * @param {string} base64 - Base64 string
     * @param {string} mimeType - MIME type
     * @returns {Blob} Blob object
     */
    static base64ToBlob(base64, mimeType = 'application/octet-stream') {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }

    /**
     * Get file info
     * @param {File} file - The file to analyze
     * @returns {Object} File information
     */
    static getFileInfo(file) {
        const extension = this.getFileExtension(file.name);
        const mimeType = this.getMimeType(extension);
        
        return {
            name: file.name,
            size: file.size,
            sizeFormatted: this.formatFileSize(file.size),
            type: file.type || mimeType,
            extension: extension,
            lastModified: file.lastModified,
            lastModifiedDate: new Date(file.lastModified),
            isImage: this.isImageFile(file),
            isText: this.isTextFile(file),
            isVideo: this.isVideoFile(file),
            isAudio: this.isAudioFile(file)
        };
    }

    /**
     * Check if file is an image
     * @param {File} file - The file to check
     * @returns {boolean} True if file is an image
     */
    static isImageFile(file) {
        return file.type.startsWith('image/');
    }

    /**
     * Check if file is a text file
     * @param {File} file - The file to check
     * @returns {boolean} True if file is a text file
     */
    static isTextFile(file) {
        const textTypes = [
            'text/',
            'application/json',
            'application/javascript',
            'application/xml',
            'application/xhtml+xml'
        ];
        
        return textTypes.some(type => file.type.startsWith(type));
    }

    /**
     * Check if file is a video file
     * @param {File} file - The file to check
     * @returns {boolean} True if file is a video file
     */
    static isVideoFile(file) {
        return file.type.startsWith('video/');
    }

    /**
     * Check if file is an audio file
     * @param {File} file - The file to check
     * @returns {boolean} True if file is an audio file
     */
    static isAudioFile(file) {
        return file.type.startsWith('audio/');
    }

    /**
     * Generate unique filename
     * @param {string} originalName - Original filename
     * @param {string} prefix - Prefix to add
     * @returns {string} Unique filename
     */
    static generateUniqueFilename(originalName, prefix = '') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const extension = this.getFileExtension(originalName);
        const baseName = originalName.replace(`.${extension}`, '');
        
        return `${prefix}${baseName}-${timestamp}.${extension}`;
    }

    /**
     * Sanitize filename
     * @param {string} filename - The filename to sanitize
     * @returns {string} Sanitized filename
     */
    static sanitizeFilename(filename) {
        // Remove or replace invalid characters
        return filename
            .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
            .replace(/\s+/g, '_')
            .replace(/^\.+/, '')
            .substring(0, 255);
    }

    /**
     * Compare two files
     * @param {File} file1 - First file
     * @param {File} file2 - Second file
     * @returns {boolean} True if files are the same
     */
    static compareFiles(file1, file2) {
        return file1.name === file2.name &&
               file1.size === file2.size &&
               file1.type === file2.type &&
               file1.lastModified === file2.lastModified;
    }

    /**
     * Create file from text
     * @param {string} text - Text content
     * @param {string} filename - Filename
     * @param {string} mimeType - MIME type
     * @returns {File} File object
     */
    static createFileFromText(text, filename, mimeType = 'text/plain') {
        const blob = new Blob([text], { type: mimeType });
        return new File([blob], filename, { type: mimeType });
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileUtils;
}

// Global export
window.FileUtils = FileUtils; 