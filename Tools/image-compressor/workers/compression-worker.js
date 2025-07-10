/**
 * Compression Web Worker
 * Handles heavy compression tasks in background to keep UI responsive
 */

// Import compression libraries
importScripts('https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js');

// Worker state
let isInitialized = false;
let wasmModules = new Map();

// Initialize worker
async function initialize() {
    if (isInitialized) return;
    
    try {
        // Load WebAssembly modules if available
        await loadWasmModules();
        isInitialized = true;
        
        self.postMessage({
            type: 'initialized',
            message: 'Worker initialized successfully'
        });
    } catch (error) {
        self.postMessage({
            type: 'error',
            error: `Worker initialization failed: ${error.message}`
        });
    }
}

// Load WebAssembly modules
async function loadWasmModules() {
    const modules = {
        'mozjpeg': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/mozjpeg/mozjpeg.wasm',
        'oxipng': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/oxipng/oxipng.wasm',
        'webp': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/webp/webp.wasm',
        'avif': 'https://cdn.jsdelivr.net/npm/@squoosh/lib@0.4.0/avif/avif.wasm'
    };
    
    for (const [name, url] of Object.entries(modules)) {
        try {
            const response = await fetch(url);
            const wasmBytes = await response.arrayBuffer();
            const wasmModule = await WebAssembly.instantiate(wasmBytes);
            wasmModules.set(name, wasmModule);
        } catch (error) {
            console.warn(`Failed to load ${name} WASM module:`, error);
        }
    }
}

// Handle messages from main thread
self.onmessage = async function(e) {
    const { type, data } = e.data;
    
    try {
        switch (type) {
            case 'init':
                await initialize();
                break;
                
            case 'compress':
                await handleCompression(data);
                break;
                
            case 'batch-compress':
                await handleBatchCompression(data);
                break;
                
            case 'mozjpeg':
                await handleMozJPEGCompression(data);
                break;
                
            case 'oxipng':
                await handleOxiPNGCompression(data);
                break;
                
            case 'webp':
                await handleWebPCompression(data);
                break;
                
            case 'avif':
                await handleAVIFCompression(data);
                break;
                
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
    } catch (error) {
        self.postMessage({
            type: 'error',
            error: error.message,
            taskId: data?.taskId
        });
    }
};

// Handle single image compression
async function handleCompression(data) {
    const { file, options, taskId } = data;
    
    try {
        // Progress callback
        const onProgress = (progress) => {
            self.postMessage({
                type: 'progress',
                taskId,
                progress: Math.round(progress * 100)
            });
        };
        
        // Compress image
        const compressedFile = await compressImage(file, options, onProgress);
        
        // Send result
        self.postMessage({
            type: 'success',
            taskId,
            result: {
                original: file,
                compressed: compressedFile,
                originalSize: file.size,
                compressedSize: compressedFile.size,
                compressionRatio: ((file.size - compressedFile.size) / file.size * 100).toFixed(1)
            }
        });
        
    } catch (error) {
        self.postMessage({
            type: 'error',
            taskId,
            error: error.message
        });
    }
}

// Handle batch compression
async function handleBatchCompression(data) {
    const { files, options, taskId } = data;
    const results = [];
    
    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Progress callback for individual file
            const onProgress = (progress) => {
                const overallProgress = (i + progress) / files.length;
                self.postMessage({
                    type: 'batch-progress',
                    taskId,
                    progress: Math.round(overallProgress * 100),
                    currentFile: i + 1,
                    totalFiles: files.length,
                    filename: file.name
                });
            };
            
            try {
                const compressedFile = await compressImage(file, options, onProgress);
                
                results.push({
                    original: file,
                    compressed: compressedFile,
                    originalSize: file.size,
                    compressedSize: compressedFile.size,
                    compressionRatio: ((file.size - compressedFile.size) / file.size * 100).toFixed(1),
                    success: true
                });
                
            } catch (error) {
                results.push({
                    original: file,
                    error: error.message,
                    success: false
                });
            }
        }
        
        self.postMessage({
            type: 'batch-success',
            taskId,
            results
        });
        
    } catch (error) {
        self.postMessage({
            type: 'error',
            taskId,
            error: error.message
        });
    }
}

// Core compression function
async function compressImage(file, options, onProgress) {
    // Setup compression options
    const compressionOptions = {
        maxSizeMB: options.targetSize ? options.targetSize / 1024 : undefined,
        quality: options.quality / 100,
        maxWidthOrHeight: options.maxWidth || options.maxHeight,
        useWebWorker: false, // We're already in a worker
        preserveExif: options.exifHandling === 'preserve',
        onProgress: onProgress
    };
    
    // Handle format conversion
    if (options.format && options.format !== 'original') {
        compressionOptions.fileType = `image/${options.format}`;
    }
    
    // Handle progressive/interlaced
    if (options.progressive) {
        compressionOptions.progressive = true;
    }
    
    // Use appropriate compression method
    if (options.algorithm && options.algorithm !== 'auto') {
        return await compressWithSpecificAlgorithm(file, options, onProgress);
    }
    
    // Use browser-image-compression library
    return await imageCompression(file, compressionOptions);
}

// Compress with specific algorithm
async function compressWithSpecificAlgorithm(file, options, onProgress) {
    const algorithm = options.algorithm;
    
    switch (algorithm) {
        case 'mozjpeg':
            return await compressWithMozJPEG(file, options, onProgress);
        case 'oxipng':
            return await compressWithOxiPNG(file, options, onProgress);
        case 'webp':
            return await compressWithWebP(file, options, onProgress);
        case 'avif':
            return await compressWithAVIF(file, options, onProgress);
        default:
            throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
}

// MozJPEG compression
async function compressWithMozJPEG(file, options, onProgress) {
    const wasmModule = wasmModules.get('mozjpeg');
    
    if (!wasmModule) {
        throw new Error('MozJPEG WASM module not loaded');
    }
    
    try {
        onProgress(0.1);
        
        // Convert file to ImageData
        const imageData = await fileToImageData(file);
        onProgress(0.3);
        
        // Encode with MozJPEG
        const quality = Math.round(options.quality);
        const progressive = options.progressive || false;
        
        const encodedData = await encodeMozJPEG(imageData, quality, progressive);
        onProgress(0.8);
        
        // Create compressed file
        const compressedFile = new File([encodedData], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
        });
        
        onProgress(1.0);
        return compressedFile;
        
    } catch (error) {
        throw new Error(`MozJPEG compression failed: ${error.message}`);
    }
}

// OxiPNG compression
async function compressWithOxiPNG(file, options, onProgress) {
    const wasmModule = wasmModules.get('oxipng');
    
    if (!wasmModule) {
        throw new Error('OxiPNG WASM module not loaded');
    }
    
    try {
        onProgress(0.1);
        
        // Convert file to ImageData
        const imageData = await fileToImageData(file);
        onProgress(0.3);
        
        // Encode with OxiPNG
        const encodedData = await encodeOxiPNG(imageData);
        onProgress(0.8);
        
        // Create compressed file
        const compressedFile = new File([encodedData], file.name, {
            type: 'image/png',
            lastModified: Date.now()
        });
        
        onProgress(1.0);
        return compressedFile;
        
    } catch (error) {
        throw new Error(`OxiPNG compression failed: ${error.message}`);
    }
}

// WebP compression
async function compressWithWebP(file, options, onProgress) {
    try {
        onProgress(0.1);
        
        // Use canvas for WebP compression
        const canvas = await fileToCanvas(file);
        onProgress(0.5);
        
        // Convert to WebP
        const webpBlob = await canvasToWebP(canvas, options.quality / 100);
        onProgress(0.9);
        
        // Create compressed file
        const compressedFile = new File([webpBlob], file.name, {
            type: 'image/webp',
            lastModified: Date.now()
        });
        
        onProgress(1.0);
        return compressedFile;
        
    } catch (error) {
        throw new Error(`WebP compression failed: ${error.message}`);
    }
}

// AVIF compression
async function compressWithAVIF(file, options, onProgress) {
    const wasmModule = wasmModules.get('avif');
    
    if (!wasmModule) {
        // Fallback to canvas if WASM not available
        return await compressWithCanvas(file, options, onProgress);
    }
    
    try {
        onProgress(0.1);
        
        // Convert file to ImageData
        const imageData = await fileToImageData(file);
        onProgress(0.3);
        
        // Encode with AVIF
        const quality = Math.round(options.quality);
        const encodedData = await encodeAVIF(imageData, quality);
        onProgress(0.8);
        
        // Create compressed file
        const compressedFile = new File([encodedData], file.name, {
            type: 'image/avif',
            lastModified: Date.now()
        });
        
        onProgress(1.0);
        return compressedFile;
        
    } catch (error) {
        throw new Error(`AVIF compression failed: ${error.message}`);
    }
}

// Canvas fallback compression
async function compressWithCanvas(file, options, onProgress) {
    try {
        onProgress(0.1);
        
        const canvas = await fileToCanvas(file);
        onProgress(0.5);
        
        // Determine output format
        const outputFormat = options.format === 'original' ? file.type : `image/${options.format}`;
        const quality = options.quality / 100;
        
        // Convert to blob
        const blob = await canvasToBlob(canvas, outputFormat, quality);
        onProgress(0.9);
        
        // Create compressed file
        const compressedFile = new File([blob], file.name, {
            type: outputFormat,
            lastModified: Date.now()
        });
        
        onProgress(1.0);
        return compressedFile;
        
    } catch (error) {
        throw new Error(`Canvas compression failed: ${error.message}`);
    }
}

// Utility functions
async function fileToImageData(file) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            resolve(imageData);
        };
        
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

async function fileToCanvas(file) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas);
        };
        
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

async function canvasToBlob(canvas, format, quality) {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Failed to convert canvas to blob'));
            }
        }, format, quality);
    });
}

async function canvasToWebP(canvas, quality) {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Failed to convert canvas to WebP'));
            }
        }, 'image/webp', quality);
    });
}

// WebAssembly encoding functions (placeholders)
async function encodeMozJPEG(imageData, quality, progressive) {
    // This would use the actual MozJPEG WASM module
    // For now, throw an error to indicate it's not implemented
    throw new Error('MozJPEG WASM encoding not yet implemented');
}

async function encodeOxiPNG(imageData) {
    // This would use the actual OxiPNG WASM module
    // For now, throw an error to indicate it's not implemented
    throw new Error('OxiPNG WASM encoding not yet implemented');
}

async function encodeAVIF(imageData, quality) {
    // This would use the actual AVIF WASM module
    // For now, throw an error to indicate it's not implemented
    throw new Error('AVIF WASM encoding not yet implemented');
}

// Handle specific compression types
async function handleMozJPEGCompression(data) {
    const { file, options, taskId } = data;
    
    try {
        const compressedFile = await compressWithMozJPEG(file, options, (progress) => {
            self.postMessage({
                type: 'progress',
                taskId,
                progress: Math.round(progress * 100)
            });
        });
        
        self.postMessage({
            type: 'success',
            taskId,
            result: compressedFile
        });
        
    } catch (error) {
        self.postMessage({
            type: 'error',
            taskId,
            error: error.message
        });
    }
}

async function handleOxiPNGCompression(data) {
    const { file, options, taskId } = data;
    
    try {
        const compressedFile = await compressWithOxiPNG(file, options, (progress) => {
            self.postMessage({
                type: 'progress',
                taskId,
                progress: Math.round(progress * 100)
            });
        });
        
        self.postMessage({
            type: 'success',
            taskId,
            result: compressedFile
        });
        
    } catch (error) {
        self.postMessage({
            type: 'error',
            taskId,
            error: error.message
        });
    }
}

async function handleWebPCompression(data) {
    const { file, options, taskId } = data;
    
    try {
        const compressedFile = await compressWithWebP(file, options, (progress) => {
            self.postMessage({
                type: 'progress',
                taskId,
                progress: Math.round(progress * 100)
            });
        });
        
        self.postMessage({
            type: 'success',
            taskId,
            result: compressedFile
        });
        
    } catch (error) {
        self.postMessage({
            type: 'error',
            taskId,
            error: error.message
        });
    }
}

async function handleAVIFCompression(data) {
    const { file, options, taskId } = data;
    
    try {
        const compressedFile = await compressWithAVIF(file, options, (progress) => {
            self.postMessage({
                type: 'progress',
                taskId,
                progress: Math.round(progress * 100)
            });
        });
        
        self.postMessage({
            type: 'success',
            taskId,
            result: compressedFile
        });
        
    } catch (error) {
        self.postMessage({
            type: 'error',
            taskId,
            error: error.message
        });
    }
}

// Initialize worker when loaded
initialize(); 