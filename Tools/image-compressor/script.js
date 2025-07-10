/**
 * Image Compressor Pro v2 - Working Implementation
 */

// Global variables
let selectedFiles = [];
let compressedFiles = [];
let currentTheme = localStorage.getItem('theme') || 'light';
let currentPreset = 'balanced';

// Compression presets
const COMPRESSION_PRESETS = {
    'balanced': { quality: 85, format: 'original' },
    'high-quality': { quality: 95, format: 'original' },
    'max-compression': { quality: 60, format: 'webp' },
    'web-optimized': { quality: 80, format: 'webp' }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    applyTheme();
    showNotification('Image Compressor Pro v2 Ready! 🚀', 'success');
}

function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // File input
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
    
    // Drag and drop
    const uploadZone = document.getElementById('uploadZone');
    uploadZone.addEventListener('dragover', handleDragOver);
    uploadZone.addEventListener('dragleave', handleDragLeave);
    uploadZone.addEventListener('drop', handleDrop);
    uploadZone.addEventListener('click', () => document.getElementById('fileInput').click());
    
    // URL input
    document.getElementById('loadUrlBtn').addEventListener('click', loadImageFromURL);
    document.getElementById('urlInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadImageFromURL();
    });
    
    // Paste functionality
    document.getElementById('pasteBtn').addEventListener('click', pasteFromClipboard);
    document.addEventListener('paste', handlePaste);
    
    // Preset cards
    document.querySelectorAll('.preset-card').forEach(card => {
        card.addEventListener('click', () => switchPreset(card.dataset.preset));
    });
    
    // Settings controls
    document.getElementById('qualitySlider').addEventListener('input', updateQualityDisplay);
    document.getElementById('advancedToggle').addEventListener('click', toggleAdvancedSettings);
    document.getElementById('resizeToggle').addEventListener('change', toggleResizeSettings);
    document.getElementById('aspectRatioToggle').addEventListener('change', handleAspectRatioToggle);
    
    // Dimension inputs
    document.getElementById('widthInput').addEventListener('input', () => handleDimensionChange('width'));
    document.getElementById('heightInput').addEventListener('input', () => handleDimensionChange('height'));
    
    // Compression button
    document.getElementById('compressBtn').addEventListener('click', compressImages);
    
    // Action buttons
    document.getElementById('downloadAllBtn').addEventListener('click', downloadAllFiles);
    document.getElementById('downloadZipBtn').addEventListener('click', downloadAsZip);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
    document.getElementById('shareBtn').addEventListener('click', openShareModal);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllFiles);
    
    // Share buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => shareToSocial(btn.dataset.platform));
    });
    
    // PWA install
    document.getElementById('installBtn').addEventListener('click', installPWA);
}

// Theme management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
    localStorage.setItem('theme', currentTheme);
    showNotification(`Switched to ${currentTheme} theme`, 'info');
}

function applyTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        body.setAttribute('data-theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.setAttribute('data-theme', 'light');
    }
    
    themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// Tab switching removed - using single interface design

// File handling
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    processFiles(files);
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
        processFiles(imageFiles);
    } else {
        showNotification('Please drop valid image files', 'error');
    }
}

function processFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
        showNotification('No valid image files selected', 'error');
        return;
    }
    
    selectedFiles = [...selectedFiles, ...imageFiles];
    updateFileQueue();
    updateUIState();
    showNotification(`Added ${imageFiles.length} image(s)`, 'success');
}

async function loadImageFromURL() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();
    
    if (!url) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }
    
    try {
        showNotification('Loading image from URL...', 'info');
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        if (!blob.type.startsWith('image/')) {
            throw new Error('URL does not point to a valid image file');
        }
        
        const filename = url.split('/').pop() || 'image-from-url';
        const file = new File([blob], filename, { type: blob.type });
        
        processFiles([file]);
        urlInput.value = '';
        
    } catch (error) {
        showNotification(`Failed to load image: ${error.message}`, 'error');
    }
}

async function pasteFromClipboard() {
    try {
        if (!navigator.clipboard) {
            throw new Error('Clipboard API not supported');
        }
        
        const clipboardItems = await navigator.clipboard.read();
        
        for (const item of clipboardItems) {
            for (const type of item.types) {
                if (type.startsWith('image/')) {
                    const blob = await item.getType(type);
                    const file = new File([blob], 'pasted-image', { type: blob.type });
                    
                    processFiles([file]);
                    showNotification('Image pasted successfully', 'success');
                    return;
                }
            }
        }
        
        showNotification('No image found in clipboard', 'error');
        
    } catch (error) {
        showNotification(`Failed to paste: ${error.message}`, 'error');
    }
}

function handlePaste(event) {
    const items = event.clipboardData.items;
    
    for (const item of items) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
                processFiles([file]);
                showNotification('Image pasted successfully', 'success');
                return;
            }
        }
    }
}

// Preset management
function switchPreset(preset) {
    currentPreset = preset;
    
    // Update active preset
    document.querySelectorAll('.preset-card').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-preset="${preset}"]`).classList.add('active');
    
    // Apply preset settings
    applyPresetSettings(preset);
    showNotification(`Applied ${preset} preset`, 'info');
}

function applyPresetSettings(preset) {
    const settings = COMPRESSION_PRESETS[preset];
    if (!settings) return;
    
    // Update quality slider
    document.getElementById('qualitySlider').value = settings.quality;
    updateQualityDisplay();
    
    // Update format selection
    document.getElementById('formatSelect').value = settings.format;
}

// Settings controls
function updateQualityDisplay() {
    const slider = document.getElementById('qualitySlider');
    const display = document.getElementById('qualityValue');
    display.textContent = `${slider.value}%`;
}

function toggleAdvancedSettings() {
    const advancedSettings = document.getElementById('advancedSettings');
    const toggleIcon = document.querySelector('.toggle-icon');
    const toggleText = document.querySelector('.toggle-text');
    
    const isVisible = !advancedSettings.classList.contains('hidden');
    
    if (isVisible) {
        advancedSettings.classList.add('hidden');
        toggleIcon.textContent = '▼';
        toggleText.textContent = 'Advanced';
    } else {
        advancedSettings.classList.remove('hidden');
        toggleIcon.textContent = '▲';
        toggleText.textContent = 'Hide';
    }
}

function toggleResizeSettings() {
    const toggle = document.getElementById('resizeToggle');
    const inputs = document.getElementById('resizeInputs');
    
    inputs.style.display = toggle.checked ? 'block' : 'none';
}

function handleAspectRatioToggle() {
    const toggle = document.getElementById('aspectRatioToggle');
    
    if (toggle.checked && selectedFiles.length > 0) {
        handleDimensionChange('width');
    }
}

function handleDimensionChange(changedDimension) {
    const aspectRatioToggle = document.getElementById('aspectRatioToggle');
    
    if (!aspectRatioToggle.checked || selectedFiles.length === 0) {
        return;
    }
    
    // Calculate aspect ratio from first image
    const firstFile = selectedFiles[0];
    calculateAspectRatio(firstFile, changedDimension);
}

async function calculateAspectRatio(file, changedDimension) {
    try {
        const dimensions = await getImageDimensions(file);
        const aspectRatio = dimensions.width / dimensions.height;
        
        const widthInput = document.getElementById('widthInput');
        const heightInput = document.getElementById('heightInput');
        
        if (changedDimension === 'width' && widthInput.value) {
            const newHeight = Math.round(parseInt(widthInput.value) / aspectRatio);
            heightInput.value = newHeight;
        } else if (changedDimension === 'height' && heightInput.value) {
            const newWidth = Math.round(parseInt(heightInput.value) * aspectRatio);
            widthInput.value = newWidth;
        }
    } catch (error) {
        console.error('Error calculating aspect ratio:', error);
    }
}

function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

// File queue management
function updateFileQueue() {
    const fileQueue = document.getElementById('fileQueue');
    fileQueue.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        const fileItem = createFileQueueItem(file, index);
        fileQueue.appendChild(fileItem);
    });
}

function createFileQueueItem(file, index) {
    const item = document.createElement('div');
    item.className = 'file-item';
    
    item.innerHTML = `
        <div class="file-info">
            <div class="file-icon">📄</div>
            <div class="file-details">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${formatFileSize(file.size)}</div>
            </div>
        </div>
        <button class="file-remove" onclick="removeFile(${index})">×</button>
    `;
    
    return item;
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    updateFileQueue();
    updateUIState();
    showNotification('File removed', 'info');
}

function clearAllFiles() {
    selectedFiles = [];
    compressedFiles = [];
    updateFileQueue();
    updateUIState();
    showNotification('All files cleared', 'info');
}

// UI state management
function updateUIState() {
    const hasFiles = selectedFiles.length > 0;
    const hasCompressed = compressedFiles.length > 0;
    
    // Show/hide sections
    const presetsSection = document.getElementById('presetsSection');
    const fileQueueSection = document.getElementById('fileQueueSection');
    const settingsSection = document.getElementById('settingsSection');
    const resultsSection = document.getElementById('resultsSection');
    
    if (hasFiles) {
        presetsSection.classList.remove('hidden');
        presetsSection.style.display = 'block';
        fileQueueSection.classList.remove('hidden');
        fileQueueSection.style.display = 'block';
        settingsSection.classList.remove('hidden');
        settingsSection.style.display = 'block';
    } else {
        presetsSection.classList.add('hidden');
        presetsSection.style.display = 'none';
        fileQueueSection.classList.add('hidden');
        fileQueueSection.style.display = 'none';
        settingsSection.classList.add('hidden');
        settingsSection.style.display = 'none';
    }
    
    if (hasCompressed) {
        resultsSection.classList.remove('hidden');
        resultsSection.style.display = 'block';
    } else {
        resultsSection.classList.add('hidden');
        resultsSection.style.display = 'none';
    }
    
    // Update compression button
    const compressBtn = document.getElementById('compressBtn');
    compressBtn.disabled = !hasFiles;
}

// Compression
async function compressImages() {
    if (selectedFiles.length === 0) {
        showNotification('Please select files to compress', 'error');
        return;
    }
    
    const compressBtn = document.getElementById('compressBtn');
    const btnText = compressBtn.querySelector('.btn-text');
    const btnLoader = compressBtn.querySelector('.btn-loader');
    
    // Show loading state
    compressBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    
    // Show progress modal
    showProgressModal();
    
    try {
        compressedFiles = [];
        const settings = getCompressionSettings();
        
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            updateProgress(i, selectedFiles.length, `Compressing ${file.name}...`);
            
            try {
                const compressedFile = await compressImage(file, settings);
                compressedFiles.push({
                    original: file,
                    compressed: compressedFile,
                    originalSize: file.size,
                    compressedSize: compressedFile.size,
                    compressionRatio: ((file.size - compressedFile.size) / file.size * 100).toFixed(1)
                });
            } catch (error) {
                console.error('Error compressing image:', error);
                showNotification(`Failed to compress ${file.name}`, 'error');
            }
        }
        
        updateProgress(selectedFiles.length, selectedFiles.length, 'Compression complete!');
        
        // Hide progress modal
        setTimeout(() => {
            hideProgressModal();
        }, 1000);
        
        if (compressedFiles.length > 0) {
            showResults();
            updateUIState();
            
            const totalSaved = compressedFiles.reduce((sum, file) => 
                sum + (file.originalSize - file.compressedSize), 0
            );
            
            showNotification(`Compressed ${compressedFiles.length} image(s), saved ${formatFileSize(totalSaved)}`, 'success');
        } else {
            showNotification('No images were compressed successfully', 'error');
        }
        
    } catch (error) {
        console.error('Compression error:', error);
        showNotification('Compression failed: ' + error.message, 'error');
        hideProgressModal();
    } finally {
        // Reset button state
        compressBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
}

function getCompressionSettings() {
    return {
        quality: parseInt(document.getElementById('qualitySlider').value) / 100,
        format: document.getElementById('formatSelect').value,
        targetSize: document.getElementById('targetSize').value ? parseInt(document.getElementById('targetSize').value) : null,
        maxWidth: document.getElementById('resizeToggle').checked ? parseInt(document.getElementById('widthInput').value) || null : null,
        maxHeight: document.getElementById('resizeToggle').checked ? parseInt(document.getElementById('heightInput').value) || null : null,
        preserveExif: document.getElementById('exifHandling')?.value === 'preserve',
        progressive: document.getElementById('progressiveToggle')?.checked || false
    };
}

async function compressImage(file, settings) {
    const options = {
        quality: settings.quality,
        useWebWorker: true,
        preserveExif: settings.preserveExif
    };
    
    if (settings.targetSize) {
        options.maxSizeMB = settings.targetSize / 1024;
    }
    
    if (settings.format !== 'original') {
        options.fileType = `image/${settings.format}`;
    }
    
    if (settings.maxWidth || settings.maxHeight) {
        options.maxWidthOrHeight = Math.max(settings.maxWidth || 0, settings.maxHeight || 0);
    }
    
    try {
        // Use browser-image-compression library
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        // Fallback to canvas compression
        return await compressWithCanvas(file, settings);
    }
}

async function compressWithCanvas(file, settings) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            // Calculate dimensions
            let width = img.width;
            let height = img.height;
            
            if (settings.maxWidth || settings.maxHeight) {
                const aspectRatio = width / height;
                
                if (settings.maxWidth && width > settings.maxWidth) {
                    width = settings.maxWidth;
                    height = width / aspectRatio;
                }
                
                if (settings.maxHeight && height > settings.maxHeight) {
                    height = settings.maxHeight;
                    width = height * aspectRatio;
                }
            }
            
            canvas.width = Math.round(width);
            canvas.height = Math.round(height);
            
            // Draw image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Convert to blob
            const outputFormat = settings.format === 'original' ? file.type : `image/${settings.format}`;
            const quality = settings.quality;
            
            canvas.toBlob(
                (blob) => {
                    if (blob) {
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

// Results display
function showResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsSummary = document.getElementById('resultsSummary');
    
    resultsContainer.innerHTML = '';
    resultsSummary.textContent = `${compressedFiles.length} files processed`;
    
    compressedFiles.forEach((result, index) => {
        const resultItem = createResultItem(result, index);
        resultsContainer.appendChild(resultItem);
    });
}

function createResultItem(result, index) {
    const item = document.createElement('div');
    item.className = 'result-item';
    
    const originalUrl = URL.createObjectURL(result.original);
    const compressedUrl = URL.createObjectURL(result.compressed);
    
    item.innerHTML = `
        <div class="result-comparison">
            <div class="result-side">
                <div class="result-title">Original</div>
                <img src="${originalUrl}" alt="Original" class="result-image">
                <div class="result-stats">
                    <span>${formatFileSize(result.originalSize)}</span>
                    <span>${result.original.type.split('/')[1].toUpperCase()}</span>
                </div>
            </div>
            <div class="result-side">
                <div class="result-title">Compressed</div>
                <img src="${compressedUrl}" alt="Compressed" class="result-image">
                <div class="result-stats">
                    <span>${formatFileSize(result.compressedSize)}</span>
                    <span class="compression-ratio">${result.compressionRatio}% smaller</span>
                </div>
            </div>
        </div>
        <div class="result-actions">
            <button class="btn btn-secondary" onclick="downloadSingleFile(${index})">
                <span class="btn-icon">💾</span>
                <span class="btn-text">Download</span>
            </button>
            <button class="btn btn-secondary" onclick="copySingleFile(${index})">
                <span class="btn-icon">📋</span>
                <span class="btn-text">Copy</span>
            </button>
        </div>
    `;
    
    return item;
}

// Progress modal
function showProgressModal() {
    const modal = document.getElementById('progressModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideProgressModal() {
    const modal = document.getElementById('progressModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function updateProgress(current, total, message) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const percentage = Math.round((current / total) * 100);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = message || `${current} of ${total} images processed`;
}

// Download functionality
async function downloadAllFiles() {
    if (compressedFiles.length === 0) {
        showNotification('No compressed files to download', 'error');
        return;
    }
    
    if (compressedFiles.length === 1) {
        downloadFile(compressedFiles[0].compressed);
    } else {
        // Download files individually
        for (const fileData of compressedFiles) {
            downloadFile(fileData.compressed);
            await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between downloads
        }
    }
}

// Download single file
function downloadSingleFile(index) {
    if (compressedFiles[index]) {
        downloadFile(compressedFiles[index].compressed);
        showNotification('Download started', 'info');
    }
}

// Copy single file
async function copySingleFile(index) {
    if (compressedFiles[index]) {
        try {
            const file = compressedFiles[index].compressed;
            const blob = new Blob([file], { type: file.type });
            
            if (navigator.clipboard && navigator.clipboard.write) {
                const clipboardItem = new ClipboardItem({ [file.type]: blob });
                await navigator.clipboard.write([clipboardItem]);
                showNotification('Image copied to clipboard', 'success');
            } else {
                throw new Error('Clipboard API not supported');
            }
        } catch (error) {
            showNotification('Failed to copy to clipboard', 'error');
            console.error('Clipboard error:', error);
        }
    }
}

function downloadFile(file) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Download started', 'info');
}

async function downloadAsZip() {
    if (compressedFiles.length === 0) {
        showNotification('No compressed files to download', 'error');
        return;
    }
    
    try {
        showNotification('Creating ZIP file...', 'info');
        
        // Create a simple ZIP file using JSZip library or fallback
        if (typeof JSZip !== 'undefined') {
            const zip = new JSZip();
            
            // Add each compressed file to the ZIP
            for (const fileData of compressedFiles) {
                const fileName = fileData.compressed.name || `compressed_${Date.now()}.${getFileExtension(fileData.compressed.type)}`;
                zip.file(fileName, fileData.compressed);
            }
            
            // Generate ZIP file
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const zipFile = new File([zipBlob], 'compressed_images.zip', { type: 'application/zip' });
            
            downloadFile(zipFile);
            showNotification('ZIP file downloaded', 'success');
            
        } else {
            // Fallback: Create a simple text file with base64 data
            let content = 'Compressed Images Data:\n\n';
            
            for (let i = 0; i < compressedFiles.length; i++) {
                const fileData = compressedFiles[i];
                const fileName = fileData.compressed.name || `image_${i + 1}`;
                
                content += `File: ${fileName}\n`;
                content += `Original Size: ${formatFileSize(fileData.originalSize)}\n`;
                content += `Compressed Size: ${formatFileSize(fileData.compressedSize)}\n`;
                content += `Compression Ratio: ${fileData.compressionRatio}%\n`;
                content += `Type: ${fileData.compressed.type}\n`;
                content += '\n---\n\n';
            }
            
            const textBlob = new Blob([content], { type: 'text/plain' });
            const textFile = new File([textBlob], 'compressed_images_info.txt', { type: 'text/plain' });
            
            downloadFile(textFile);
            showNotification('Download info file created (ZIP not supported)', 'info');
        }
        
    } catch (error) {
        showNotification('ZIP creation failed', 'error');
        console.error('ZIP creation error:', error);
    }
}

// Helper function to get file extension from MIME type
function getFileExtension(mimeType) {
    const extensions = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
        'image/bmp': 'bmp',
        'image/svg+xml': 'svg',
        'image/tiff': 'tiff',
        'image/avif': 'avif',
        'image/heic': 'heic',
        'image/heif': 'heif'
    };
    
    return extensions[mimeType] || 'jpg';
}

// Clipboard functionality
async function copyToClipboard() {
    if (compressedFiles.length === 0) {
        showNotification('No files to copy', 'error');
        return;
    }
    
    try {
        if (compressedFiles.length === 1) {
            const file = compressedFiles[0].compressed;
            const blob = new Blob([file], { type: file.type });
            
            if (navigator.clipboard && navigator.clipboard.write) {
                const clipboardItem = new ClipboardItem({ [file.type]: blob });
                await navigator.clipboard.write([clipboardItem]);
                showNotification('Image copied to clipboard', 'success');
            } else {
                throw new Error('Clipboard API not supported');
            }
        } else {
            // For multiple files, copy summary text
            const summary = `Compressed ${compressedFiles.length} images`;
            await navigator.clipboard.writeText(summary);
            showNotification('Summary copied to clipboard', 'success');
        }
    } catch (error) {
        showNotification('Failed to copy to clipboard', 'error');
        console.error('Clipboard error:', error);
    }
}

// Share functionality
function openShareModal() {
    const modal = document.getElementById('shareModal');
    modal.style.display = 'flex';
}

function closeShareModal() {
    const modal = document.getElementById('shareModal');
    modal.style.display = 'none';
}

function shareToSocial(platform) {
    const text = `I just compressed ${compressedFiles.length} images with Image Compressor Pro v2! 🚀`;
    const url = window.location.href;
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        closeShareModal();
        showNotification(`Shared to ${platform}`, 'success');
    } else if (navigator.share && platform === 'native') {
        navigator.share({
            title: 'Image Compressor Pro v2',
            text: text,
            url: url
        }).then(() => {
            closeShareModal();
            showNotification('Shared successfully', 'success');
        }).catch(console.error);
    }
}

// PWA functionality
function installPWA() {
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                showNotification('App installed successfully!', 'success');
            }
            window.deferredPrompt = null;
            document.getElementById('installBtn').style.display = 'none';
        });
    }
}

// Utility functions
function formatFileSize(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `toast ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// PWA install prompt handling
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'flex';
});

// Global functions for HTML onclick handlers
window.removeFile = removeFile;
window.closeShareModal = closeShareModal;
window.downloadSingleFile = downloadSingleFile;
window.copySingleFile = copySingleFile;

console.log('Image Compressor Pro v2 loaded successfully! 🚀'); 