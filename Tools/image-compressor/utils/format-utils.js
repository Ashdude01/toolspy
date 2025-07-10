/**
 * Format Detection and Handling Utilities
 * Advanced format support and conversion capabilities
 */

// Format signatures for file type detection
const FORMAT_SIGNATURES = {
    // JPEG
    'jpeg': [
        [0xFF, 0xD8, 0xFF],
        [0xFF, 0xD8, 0xFF, 0xE0],
        [0xFF, 0xD8, 0xFF, 0xE1],
        [0xFF, 0xD8, 0xFF, 0xE2],
        [0xFF, 0xD8, 0xFF, 0xE3]
    ],
    
    // PNG
    'png': [
        [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
    ],
    
    // GIF
    'gif': [
        [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
        [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]  // GIF89a
    ],
    
    // BMP
    'bmp': [
        [0x42, 0x4D]
    ],
    
    // TIFF
    'tiff': [
        [0x49, 0x49, 0x2A, 0x00], // Little-endian
        [0x4D, 0x4D, 0x00, 0x2A]  // Big-endian
    ],
    
    // WebP
    'webp': [
        [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]
    ],
    
    // AVIF
    'avif': [
        [0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66]
    ],
    
    // HEIC/HEIF
    'heic': [
        [0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63],
        [0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x66]
    ],
    
    // JPEG XL
    'jxl': [
        [0xFF, 0x0A], // Codestream
        [0x00, 0x00, 0x00, 0x0C, 0x4A, 0x58, 0x4C, 0x20, 0x0D, 0x0A, 0x87, 0x0A] // Container
    ],
    
    // SVG
    'svg': [
        [0x3C, 0x3F, 0x78, 0x6D, 0x6C], // <?xml
        [0x3C, 0x73, 0x76, 0x67], // <svg
        [0x3C, 0x21, 0x44, 0x4F, 0x43, 0x54, 0x59, 0x50, 0x45, 0x20, 0x73, 0x76, 0x67] // <!DOCTYPE svg
    ],
    
    // PDF
    'pdf': [
        [0x25, 0x50, 0x44, 0x46] // %PDF
    ],
    
    // Photoshop PSD
    'psd': [
        [0x38, 0x42, 0x50, 0x53] // 8BPS
    ],
    
    // Adobe Illustrator AI
    'ai': [
        [0x25, 0x50, 0x44, 0x46] // %PDF (AI files are PDF-based)
    ],
    
    // ICO
    'ico': [
        [0x00, 0x00, 0x01, 0x00]
    ]
};

// Format metadata
const FORMAT_METADATA = {
    'jpeg': {
        name: 'JPEG',
        description: 'Joint Photographic Experts Group',
        extensions: ['.jpg', '.jpeg', '.jfif'],
        mimeTypes: ['image/jpeg'],
        supportsQuality: true,
        supportsProgressive: true,
        supportsTransparency: false,
        supportsAnimation: false,
        maxDimensions: { width: 65535, height: 65535 },
        colorModes: ['RGB', 'CMYK', 'Grayscale'],
        compression: 'lossy'
    },
    
    'png': {
        name: 'PNG',
        description: 'Portable Network Graphics',
        extensions: ['.png'],
        mimeTypes: ['image/png'],
        supportsQuality: false,
        supportsProgressive: true,
        supportsTransparency: true,
        supportsAnimation: false,
        maxDimensions: { width: 2147483647, height: 2147483647 },
        colorModes: ['RGB', 'RGBA', 'Grayscale', 'Indexed'],
        compression: 'lossless'
    },
    
    'gif': {
        name: 'GIF',
        description: 'Graphics Interchange Format',
        extensions: ['.gif'],
        mimeTypes: ['image/gif'],
        supportsQuality: false,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: true,
        maxDimensions: { width: 65535, height: 65535 },
        colorModes: ['Indexed'],
        compression: 'lossless'
    },
    
    'webp': {
        name: 'WebP',
        description: 'Web Picture Format',
        extensions: ['.webp'],
        mimeTypes: ['image/webp'],
        supportsQuality: true,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: true,
        maxDimensions: { width: 16383, height: 16383 },
        colorModes: ['RGB', 'RGBA'],
        compression: 'lossy/lossless'
    },
    
    'avif': {
        name: 'AVIF',
        description: 'AV1 Image File Format',
        extensions: ['.avif'],
        mimeTypes: ['image/avif'],
        supportsQuality: true,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: true,
        maxDimensions: { width: 65536, height: 65536 },
        colorModes: ['RGB', 'RGBA'],
        compression: 'lossy/lossless'
    },
    
    'heic': {
        name: 'HEIC',
        description: 'High Efficiency Image Container',
        extensions: ['.heic', '.heif'],
        mimeTypes: ['image/heic', 'image/heif'],
        supportsQuality: true,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: false,
        maxDimensions: { width: 65536, height: 65536 },
        colorModes: ['RGB', 'RGBA'],
        compression: 'lossy/lossless'
    },
    
    'jxl': {
        name: 'JPEG XL',
        description: 'JPEG XL Image Format',
        extensions: ['.jxl'],
        mimeTypes: ['image/jxl'],
        supportsQuality: true,
        supportsProgressive: true,
        supportsTransparency: true,
        supportsAnimation: true,
        maxDimensions: { width: 1073741824, height: 1073741824 },
        colorModes: ['RGB', 'RGBA', 'CMYK'],
        compression: 'lossy/lossless'
    },
    
    'bmp': {
        name: 'BMP',
        description: 'Bitmap Image File',
        extensions: ['.bmp'],
        mimeTypes: ['image/bmp'],
        supportsQuality: false,
        supportsProgressive: false,
        supportsTransparency: false,
        supportsAnimation: false,
        maxDimensions: { width: 65536, height: 65536 },
        colorModes: ['RGB', 'Indexed'],
        compression: 'uncompressed'
    },
    
    'tiff': {
        name: 'TIFF',
        description: 'Tagged Image File Format',
        extensions: ['.tiff', '.tif'],
        mimeTypes: ['image/tiff'],
        supportsQuality: true,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: false,
        maxDimensions: { width: 4294967295, height: 4294967295 },
        colorModes: ['RGB', 'RGBA', 'CMYK', 'Grayscale'],
        compression: 'lossless/lossy'
    },
    
    'svg': {
        name: 'SVG',
        description: 'Scalable Vector Graphics',
        extensions: ['.svg'],
        mimeTypes: ['image/svg+xml'],
        supportsQuality: false,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: true,
        maxDimensions: { width: Infinity, height: Infinity },
        colorModes: ['RGB', 'RGBA'],
        compression: 'vector'
    },
    
    'pdf': {
        name: 'PDF',
        description: 'Portable Document Format',
        extensions: ['.pdf'],
        mimeTypes: ['application/pdf'],
        supportsQuality: true,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: false,
        maxDimensions: { width: 14400, height: 14400 },
        colorModes: ['RGB', 'CMYK', 'Grayscale'],
        compression: 'lossy/lossless'
    },
    
    'psd': {
        name: 'PSD',
        description: 'Photoshop Document',
        extensions: ['.psd'],
        mimeTypes: ['image/vnd.adobe.photoshop'],
        supportsQuality: false,
        supportsProgressive: false,
        supportsTransparency: true,
        supportsAnimation: false,
        maxDimensions: { width: 300000, height: 300000 },
        colorModes: ['RGB', 'CMYK', 'Grayscale', 'Lab'],
        compression: 'lossless'
    }
};

/**
 * Format detection and handling utilities
 */
class FormatUtils {
    /**
     * Detect file format from binary data
     */
    static detectFormat(buffer) {
        const uint8Array = new Uint8Array(buffer);
        
        for (const [format, signatures] of Object.entries(FORMAT_SIGNATURES)) {
            for (const signature of signatures) {
                if (this.matchesSignature(uint8Array, signature)) {
                    return format;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Check if buffer matches signature
     */
    static matchesSignature(buffer, signature) {
        if (buffer.length < signature.length) {
            return false;
        }
        
        for (let i = 0; i < signature.length; i++) {
            if (signature[i] !== 0x00 && buffer[i] !== signature[i]) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Get format from file extension
     */
    static getFormatFromExtension(filename) {
        const extension = filename.toLowerCase().split('.').pop();
        
        for (const [format, metadata] of Object.entries(FORMAT_METADATA)) {
            if (metadata.extensions.some(ext => ext.slice(1) === extension)) {
                return format;
            }
        }
        
        return null;
    }
    
    /**
     * Get format from MIME type
     */
    static getFormatFromMimeType(mimeType) {
        for (const [format, metadata] of Object.entries(FORMAT_METADATA)) {
            if (metadata.mimeTypes.includes(mimeType)) {
                return format;
            }
        }
        
        return null;
    }
    
    /**
     * Get format metadata
     */
    static getFormatMetadata(format) {
        return FORMAT_METADATA[format] || null;
    }
    
    /**
     * Check if format supports quality setting
     */
    static supportsQuality(format) {
        const metadata = this.getFormatMetadata(format);
        return metadata ? metadata.supportsQuality : false;
    }
    
    /**
     * Check if format supports transparency
     */
    static supportsTransparency(format) {
        const metadata = this.getFormatMetadata(format);
        return metadata ? metadata.supportsTransparency : false;
    }
    
    /**
     * Check if format supports animation
     */
    static supportsAnimation(format) {
        const metadata = this.getFormatMetadata(format);
        return metadata ? metadata.supportsAnimation : false;
    }
    
    /**
     * Get recommended formats for conversion
     */
    static getRecommendedFormats(originalFormat, purpose = 'web') {
        const recommendations = {
            web: ['webp', 'avif', 'jpeg', 'png'],
            print: ['jpeg', 'tiff', 'pdf'],
            storage: ['png', 'tiff', 'psd'],
            sharing: ['jpeg', 'png', 'webp']
        };
        
        return recommendations[purpose] || recommendations.web;
    }
    
    /**
     * Get optimal format for image characteristics
     */
    static getOptimalFormat(characteristics) {
        const {
            hasTransparency = false,
            isPhotographic = false,
            isVector = false,
            targetSize = 'balanced',
            browserSupport = 'modern'
        } = characteristics;
        
        // Vector graphics
        if (isVector) {
            return 'svg';
        }
        
        // Modern browsers with high compression needs
        if (browserSupport === 'modern' && targetSize === 'minimal') {
            return hasTransparency ? 'avif' : 'avif';
        }
        
        // Good balance for modern browsers
        if (browserSupport === 'modern') {
            return hasTransparency ? 'webp' : 'webp';
        }
        
        // Traditional formats for compatibility
        if (hasTransparency) {
            return 'png';
        }
        
        return isPhotographic ? 'jpeg' : 'png';
    }
    
    /**
     * Validate file format
     */
    static async validateFile(file) {
        try {
            // Check file size (allow unlimited as per strategy)
            if (file.size === 0) {
                throw new Error('File is empty');
            }
            
            // Read file header
            const buffer = await this.readFileHeader(file);
            
            // Detect format from binary data
            const detectedFormat = this.detectFormat(buffer);
            
            // Get format from extension and MIME type
            const extensionFormat = this.getFormatFromExtension(file.name);
            const mimeFormat = this.getFormatFromMimeType(file.type);
            
            // Validate consistency
            const formats = [detectedFormat, extensionFormat, mimeFormat].filter(Boolean);
            const isConsistent = formats.length === 0 || formats.every(f => f === formats[0]);
            
            if (!isConsistent) {
                console.warn('Format mismatch detected:', {
                    detected: detectedFormat,
                    extension: extensionFormat,
                    mime: mimeFormat
                });
            }
            
            // Use the most reliable format detection
            const finalFormat = detectedFormat || extensionFormat || mimeFormat;
            
            if (!finalFormat) {
                throw new Error('Unable to determine file format');
            }
            
            return {
                format: finalFormat,
                metadata: this.getFormatMetadata(finalFormat),
                isValid: true,
                warnings: isConsistent ? [] : ['Format mismatch detected']
            };
            
        } catch (error) {
            return {
                format: null,
                metadata: null,
                isValid: false,
                error: error.message
            };
        }
    }
    
    /**
     * Read file header for format detection
     */
    static readFileHeader(file, size = 64) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            
            reader.onerror = reject;
            
            const blob = file.slice(0, size);
            reader.readAsArrayBuffer(blob);
        });
    }
    
    /**
     * Get format compatibility information
     */
    static getCompatibilityInfo(format) {
        const compatibility = {
            'jpeg': {
                browsers: ['all'],
                support: 'universal',
                since: '1995'
            },
            'png': {
                browsers: ['all'],
                support: 'universal',
                since: '1996'
            },
            'gif': {
                browsers: ['all'],
                support: 'universal',
                since: '1989'
            },
            'webp': {
                browsers: ['chrome', 'firefox', 'safari', 'edge'],
                support: 'modern',
                since: '2010'
            },
            'avif': {
                browsers: ['chrome', 'firefox'],
                support: 'cutting-edge',
                since: '2019'
            },
            'heic': {
                browsers: ['safari'],
                support: 'limited',
                since: '2017'
            },
            'jxl': {
                browsers: ['experimental'],
                support: 'experimental',
                since: '2021'
            },
            'bmp': {
                browsers: ['all'],
                support: 'universal',
                since: '1990'
            },
            'tiff': {
                browsers: ['safari'],
                support: 'limited',
                since: '1986'
            },
            'svg': {
                browsers: ['all'],
                support: 'universal',
                since: '2001'
            },
            'pdf': {
                browsers: ['plugin'],
                support: 'plugin-dependent',
                since: '1993'
            }
        };
        
        return compatibility[format] || {
            browsers: ['unknown'],
            support: 'unknown',
            since: 'unknown'
        };
    }
    
    /**
     * Get format conversion matrix
     */
    static getConversionMatrix() {
        return {
            // From -> To mappings with quality ratings
            'jpeg': {
                'webp': { quality: 'good', size: 'smaller' },
                'avif': { quality: 'excellent', size: 'much-smaller' },
                'png': { quality: 'good', size: 'larger' },
                'jxl': { quality: 'excellent', size: 'smaller' }
            },
            'png': {
                'webp': { quality: 'excellent', size: 'smaller' },
                'avif': { quality: 'excellent', size: 'much-smaller' },
                'jpeg': { quality: 'good', size: 'smaller' },
                'jxl': { quality: 'excellent', size: 'smaller' }
            },
            'gif': {
                'webp': { quality: 'good', size: 'smaller' },
                'png': { quality: 'good', size: 'similar' },
                'jpeg': { quality: 'poor', size: 'smaller' }
            },
            'bmp': {
                'jpeg': { quality: 'good', size: 'much-smaller' },
                'png': { quality: 'excellent', size: 'much-smaller' },
                'webp': { quality: 'excellent', size: 'much-smaller' }
            },
            'tiff': {
                'jpeg': { quality: 'good', size: 'much-smaller' },
                'png': { quality: 'good', size: 'smaller' },
                'webp': { quality: 'excellent', size: 'much-smaller' }
            },
            'heic': {
                'jpeg': { quality: 'good', size: 'similar' },
                'webp': { quality: 'good', size: 'smaller' },
                'avif': { quality: 'excellent', size: 'similar' }
            },
            'psd': {
                'jpeg': { quality: 'good', size: 'much-smaller' },
                'png': { quality: 'excellent', size: 'much-smaller' },
                'webp': { quality: 'excellent', size: 'much-smaller' }
            }
        };
    }
    
    /**
     * Get all supported formats list
     */
    static getSupportedFormats() {
        return Object.keys(FORMAT_METADATA);
    }
    
    /**
     * Get format file extensions
     */
    static getFormatExtensions(format) {
        const metadata = this.getFormatMetadata(format);
        return metadata ? metadata.extensions : [];
    }
    
    /**
     * Get format MIME types
     */
    static getFormatMimeTypes(format) {
        const metadata = this.getFormatMetadata(format);
        return metadata ? metadata.mimeTypes : [];
    }
}

// Export utilities
export {
    FormatUtils,
    FORMAT_METADATA,
    FORMAT_SIGNATURES
}; 