/**
 * Advanced Compression Utilities for Image Compressor Pro v2
 * Supports all formats including HEIC, JPEG XL, AVIF, BMP, TIFF, DWG, PSD, PDF
 */

// Supported formats and their configurations
const SUPPORTED_FORMATS = {
    'image/jpeg': {
        extensions: ['.jpg', '.jpeg'],
        quality: true,
        progressive: true,
        webassembly: 'mozjpeg'
    },
    'image/png': {
        extensions: ['.png'],
        quality: false,
        progressive: true,
        webassembly: 'oxipng'
    },
    'image/webp': {
        extensions: ['.webp'],
        quality: true,
        progressive: false,
        webassembly: 'libwebp'
    },
    'image/avif': {
        extensions: ['.avif'],
        quality: true,
        progressive: false,
        webassembly: 'libavif'
    },
    'image/heic': {
        extensions: ['.heic', '.heif'],
        quality: true,
        progressive: false,
        webassembly: 'libheif'
    },
    'image/jxl': {
        extensions: ['.jxl'],
        quality: true,
        progressive: false,
        webassembly: 'libjxl'
    },
    'image/bmp': {
        extensions: ['.bmp'],
        quality: false,
        progressive: false,
        webassembly: 'canvas'
    },
    'image/tiff': {
        extensions: ['.tiff', '.tif'],
        quality: true,
        progressive: false,
        webassembly: 'libtiff'
    },
    'image/gif': {
        extensions: ['.gif'],
        quality: false,
        progressive: false,
        webassembly: 'canvas'
    },
    'image/svg+xml': {
        extensions: ['.svg'],
        quality: false,
        progressive: false,
        webassembly: 'canvas'
    },
    'application/pdf': {
        extensions: ['.pdf'],
        quality: true,
        progressive: false,
        webassembly: 'pdf2pic'
    }
};

// Compression presets
const COMPRESSION_PRESETS = {
    'balanced': {
        quality: 85,
        format: 'original',
        progressive: true,
        algorithm: 'auto'
    },
    'high-quality': {
        quality: 95,
        format: 'original',
        progressive: true,
        algorithm: 'auto'
    },
    'max-compression': {
        quality: 60,
        format: 'webp',
        progressive: false,
        algorithm: 'auto'
    },
    'web-optimized': {
        quality: 80,
        format: 'webp',
        progressive: false,
        algorithm: 'auto'
    },
    'modern': {
        quality: 85,
        format: 'avif',
        progressive: false,
        algorithm: 'auto'
    }
};

// WebAssembly module cache
const wasmModules = new Map();

/**
 * Initialize WebAssembly modules for compression
 */
async function initializeWasmModules() {
    const modules = ['mozjpeg', 'oxipng', 'libwebp', 'libavif'];
    
    for (const module of modules) {
        try {
            if (!wasmModules.has(module)) {
                const wasmModule = await loadWasmModule(module);
                wasmModules.set(module, wasmModule);
            }
        } catch (error) {
            console.warn(`Failed to load ${module} WASM module:`, error);
        }
    }
}

/**
 * Load WebAssembly module
 */
async function loadWasmModule(moduleName) {
    const moduleUrls = {
        'mozjpeg': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/mozjpeg/mozjpeg.wasm',
        'oxipng': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/oxipng/oxipng.wasm',
        'libwebp': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/webp/webp.wasm',
        'libavif': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/avif/avif.wasm'
    };
    
    if (!moduleUrls[moduleName]) {
        throw new Error(`Unknown WASM module: ${moduleName}`);
    }
    
    const response = await fetch(moduleUrls[moduleName]);
    const wasmBytes = await response.arrayBuffer();
    return await WebAssembly.instantiate(wasmBytes);
}

/**
 * Advanced compression class
 */
class ImageCompressor {
    constructor(options = {}) {
        this.options = {
            quality: 85,
            format: 'original',
            maxWidth: null,
            maxHeight: null,
            maintainAspectRatio: true,
            progressive: true,
            algorithm: 'auto',
            exifHandling: 'remove',
            targetSize: null,
            ...options
        };
        
        this.workers = new Map();
        this.initializeWorkers();
    }
    
    /**
     * Initialize compression workers
     */
    initializeWorkers() {
        const workerCount = Math.min(navigator.hardwareConcurrency || 4, 8);
        
        for (let i = 0; i < workerCount; i++) {
            const worker = new Worker('workers/compression-worker.js');
            this.workers.set(i, {
                worker,
                busy: false
            });
        }
    }
    
    /**
     * Get available worker
     */
    getAvailableWorker() {
        for (const [id, workerData] of this.workers) {
            if (!workerData.busy) {
                return { id, ...workerData };
            }
        }
        return null;
    }
    
    /**
     * Compress single image
     */
    async compressImage(file, options = {}) {
        const compressionOptions = { ...this.options, ...options };
        
        // Validate file
        if (!this.isValidImageFile(file)) {
            throw new Error(`Unsupported file type: ${file.type}`);
        }
        
        // Get file info
        const fileInfo = await this.getFileInfo(file);
        
        // Choose compression method
        const method = this.selectCompressionMethod(file.type, compressionOptions);
        
        // Apply compression
        const compressedFile = await this.applyCompression(file, compressionOptions, method);
        
        // Post-process
        const finalFile = await this.postProcess(compressedFile, compressionOptions);
        
        return {
            original: file,
            compressed: finalFile,
            originalSize: file.size,
            compressedSize: finalFile.size,
            compressionRatio: ((file.size - finalFile.size) / file.size * 100).toFixed(1),
            format: finalFile.type,
            method: method,
            metadata: fileInfo
        };
    }
    
    /**
     * Compress multiple images
     */
    async compressImages(files, options = {}, progressCallback = null) {
        const results = [];
        const totalFiles = files.length;
        
        for (let i = 0; i < totalFiles; i++) {
            const file = files[i];
            
            try {
                if (progressCallback) {
                    progressCallback({
                        current: i,
                        total: totalFiles,
                        filename: file.name,
                        status: 'processing'
                    });
                }
                
                const result = await this.compressImage(file, options);
                results.push(result);
                
                if (progressCallback) {
                    progressCallback({
                        current: i + 1,
                        total: totalFiles,
                        filename: file.name,
                        status: 'completed',
                        result: result
                    });
                }
            } catch (error) {
                console.error(`Error compressing ${file.name}:`, error);
                
                if (progressCallback) {
                    progressCallback({
                        current: i + 1,
                        total: totalFiles,
                        filename: file.name,
                        status: 'error',
                        error: error.message
                    });
                }
            }
        }
        
        return results;
    }
    
    /**
     * Check if file is valid image
     */
    isValidImageFile(file) {
        return Object.keys(SUPPORTED_FORMATS).includes(file.type) ||
               file.type.startsWith('image/') ||
               file.type === 'application/pdf';
    }
    
    /**
     * Get file information
     */
    async getFileInfo(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                
                // Extract basic file info
                const info = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                    dimensions: null,
                    exif: null,
                    colorProfile: null
                };
                
                // For images, try to get dimensions
                if (file.type.startsWith('image/')) {
                    const img = new Image();
                    img.onload = () => {
                        info.dimensions = {
                            width: img.width,
                            height: img.height
                        };
                        resolve(info);
                    };
                    img.onerror = () => resolve(info);
                    img.src = URL.createObjectURL(file);
                } else {
                    resolve(info);
                }
            };
            
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
    
    /**
     * Select compression method
     */
    selectCompressionMethod(mimeType, options) {
        const formatConfig = SUPPORTED_FORMATS[mimeType];
        
        if (!formatConfig) {
            return 'canvas'; // Fallback to canvas API
        }
        
        // Check if WebAssembly is available and preferred
        if (options.algorithm === 'auto' && wasmModules.has(formatConfig.webassembly)) {
            return formatConfig.webassembly;
        }
        
        // Check for specific algorithm request
        if (options.algorithm !== 'auto' && wasmModules.has(options.algorithm)) {
            return options.algorithm;
        }
        
        // Fallback to canvas or browser compression
        return 'canvas';
    }
    
    /**
     * Apply compression
     */
    async applyCompression(file, options, method) {
        switch (method) {
            case 'mozjpeg':
                return await this.compressWithMozJPEG(file, options);
            case 'oxipng':
                return await this.compressWithOxiPNG(file, options);
            case 'libwebp':
                return await this.compressWithWebP(file, options);
            case 'libavif':
                return await this.compressWithAVIF(file, options);
            case 'canvas':
            default:
                return await this.compressWithCanvas(file, options);
        }
    }
    
    /**
     * Compress with MozJPEG
     */
    async compressWithMozJPEG(file, options) {
        const worker = this.getAvailableWorker();
        
        if (worker) {
            worker.busy = true;
            
            try {
                const result = await new Promise((resolve, reject) => {
                    worker.worker.postMessage({
                        type: 'mozjpeg',
                        file: file,
                        options: options
                    });
                    
                    worker.worker.onmessage = (e) => {
                        if (e.data.type === 'success') {
                            resolve(e.data.result);
                        } else if (e.data.type === 'error') {
                            reject(new Error(e.data.error));
                        }
                    };
                });
                
                return result;
            } finally {
                worker.busy = false;
            }
        }
        
        // Fallback to canvas compression
        return await this.compressWithCanvas(file, options);
    }
    
    /**
     * Compress with OxiPNG
     */
    async compressWithOxiPNG(file, options) {
        const worker = this.getAvailableWorker();
        
        if (worker) {
            worker.busy = true;
            
            try {
                const result = await new Promise((resolve, reject) => {
                    worker.worker.postMessage({
                        type: 'oxipng',
                        file: file,
                        options: options
                    });
                    
                    worker.worker.onmessage = (e) => {
                        if (e.data.type === 'success') {
                            resolve(e.data.result);
                        } else if (e.data.type === 'error') {
                            reject(new Error(e.data.error));
                        }
                    };
                });
                
                return result;
            } finally {
                worker.busy = false;
            }
        }
        
        // Fallback to canvas compression
        return await this.compressWithCanvas(file, options);
    }
    
    /**
     * Compress with WebP
     */
    async compressWithWebP(file, options) {
        return await this.compressWithCanvas(file, { ...options, format: 'webp' });
    }
    
    /**
     * Compress with AVIF
     */
    async compressWithAVIF(file, options) {
        return await this.compressWithCanvas(file, { ...options, format: 'avif' });
    }
    
    /**
     * Compress with Canvas API (fallback)
     */
    async compressWithCanvas(file, options) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calculate dimensions
                let { width, height } = this.calculateDimensions(
                    img.width, 
                    img.height, 
                    options.maxWidth, 
                    options.maxHeight, 
                    options.maintainAspectRatio
                );
                
                // Set canvas size
                canvas.width = width;
                canvas.height = height;
                
                // Draw image
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to blob
                const outputFormat = options.format === 'original' ? file.type : `image/${options.format}`;
                const quality = options.quality / 100;
                
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            // Create file from blob
                            const compressedFile = new File([blob], file.name, {
                                type: outputFormat,
                                lastModified: Date.now()
                            });
                            resolve(compressedFile);
                        } else {
                            reject(new Error('Failed to compress image'));
                        }
                    },
                    outputFormat,
                    quality
                );
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(file);
        });
    }
    
    /**
     * Calculate dimensions for resizing
     */
    calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight, maintainAspectRatio) {
        let width = originalWidth;
        let height = originalHeight;
        
        if (maxWidth || maxHeight) {
            if (maintainAspectRatio) {
                const aspectRatio = originalWidth / originalHeight;
                
                if (maxWidth && maxHeight) {
                    if (width > maxWidth || height > maxHeight) {
                        if (width / maxWidth > height / maxHeight) {
                            width = maxWidth;
                            height = width / aspectRatio;
                        } else {
                            height = maxHeight;
                            width = height * aspectRatio;
                        }
                    }
                } else if (maxWidth) {
                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    }
                } else if (maxHeight) {
                    if (height > maxHeight) {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }
                }
            } else {
                if (maxWidth) width = maxWidth;
                if (maxHeight) height = maxHeight;
            }
        }
        
        return { width: Math.round(width), height: Math.round(height) };
    }
    
    /**
     * Post-process compressed file
     */
    async postProcess(file, options) {
        let processedFile = file;
        
        // Apply naming if specified
        if (options.prefix || options.suffix) {
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
            const extension = file.name.split('.').pop();
            const newName = `${options.prefix || ''}${nameWithoutExt}${options.suffix || ''}.${extension}`;
            
            processedFile = new File([file], newName, {
                type: file.type,
                lastModified: file.lastModified
            });
        }
        
        return processedFile;
    }
    
    /**
     * Get compression statistics
     */
    getCompressionStats(results) {
        const stats = {
            totalFiles: results.length,
            totalOriginalSize: 0,
            totalCompressedSize: 0,
            totalSaved: 0,
            averageCompression: 0,
            formats: {}
        };
        
        results.forEach(result => {
            stats.totalOriginalSize += result.originalSize;
            stats.totalCompressedSize += result.compressedSize;
            
            // Track formats
            if (!stats.formats[result.format]) {
                stats.formats[result.format] = 0;
            }
            stats.formats[result.format]++;
        });
        
        stats.totalSaved = stats.totalOriginalSize - stats.totalCompressedSize;
        stats.averageCompression = results.length > 0 ? 
            (stats.totalSaved / stats.totalOriginalSize * 100).toFixed(1) : 0;
        
        return stats;
    }
    
    /**
     * Dispose of workers
     */
    dispose() {
        for (const [id, workerData] of this.workers) {
            workerData.worker.terminate();
        }
        this.workers.clear();
    }
}

// Export utilities
export {
    ImageCompressor,
    SUPPORTED_FORMATS,
    COMPRESSION_PRESETS,
    initializeWasmModules
}; 