// Global variables
let selectedFiles = [];
let compressedFiles = [];
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    applyTheme();
});

function initializeApp() {
    // Check if browser supports required APIs
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('Your browser does not support file handling. Please use a modern browser.');
        return;
    }
    
    // Initialize clipboard API check
    if (!navigator.clipboard) {
        console.warn('Clipboard API not supported');
    }
    
    // Initialize Web Share API check
    if (!navigator.share) {
        console.warn('Web Share API not supported');
    }
}

function setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
    
    // File input
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    
    // URL input
    const loadUrlBtn = document.getElementById('loadUrlBtn');
    loadUrlBtn.addEventListener('click', loadImageFromUrl);
    
    const urlInput = document.getElementById('urlInput');
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadImageFromUrl();
    });
    
    // Paste functionality
    const pasteBtn = document.getElementById('pasteBtn');
    pasteBtn.addEventListener('click', pasteFromClipboard);
    
    document.addEventListener('paste', handlePaste);
    
    // Controls
    const qualitySlider = document.getElementById('qualitySlider');
    qualitySlider.addEventListener('input', updateQualityValue);
    
    const resizeToggle = document.getElementById('resizeToggle');
    resizeToggle.addEventListener('change', toggleResizeControls);
    
    const aspectRatioToggle = document.getElementById('aspectRatioToggle');
    aspectRatioToggle.addEventListener('change', handleAspectRatioToggle);
    
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    widthInput.addEventListener('input', () => handleDimensionChange('width'));
    heightInput.addEventListener('input', () => handleDimensionChange('height'));
    
    // Compression button
    const compressBtn = document.getElementById('compressBtn');
    compressBtn.addEventListener('click', compressImages);
    
    // Action buttons
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    downloadAllBtn.addEventListener('click', downloadAllImages);
    
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', copyToClipboard);
    
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', openShareModal);
    
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', clearAll);
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Share modal
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => shareToSocial(btn.dataset.platform));
    });
    
    // Modal close handlers
    document.getElementById('progressModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            // Don't close progress modal by clicking outside
        }
    });
    
    document.getElementById('shareModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeShareModal();
        }
    });
}

// Tab switching
function switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add('active');
}

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
    selectedFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (selectedFiles.length === 0) {
        showNotification('No valid image files selected', 'error');
        return;
    }
    
    showNotification(`${selectedFiles.length} image(s) selected`, 'success');
    showSection('controlsSection');
    
    // Pre-fill dimensions from first image
    if (selectedFiles.length > 0) {
        const firstImage = selectedFiles[0];
        const img = new Image();
        img.onload = function() {
            document.getElementById('widthInput').placeholder = `${img.width}`;
            document.getElementById('heightInput').placeholder = `${img.height}`;
        };
        img.src = URL.createObjectURL(firstImage);
    }
}

// URL loading
async function loadImageFromUrl() {
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
            throw new Error('Failed to fetch image');
        }
        
        const blob = await response.blob();
        if (!blob.type.startsWith('image/')) {
            throw new Error('URL does not point to a valid image');
        }
        
        const file = new File([blob], 'image-from-url', { type: blob.type });
        selectedFiles = [file];
        
        showNotification('Image loaded successfully', 'success');
        showSection('controlsSection');
        
        // Clear URL input
        urlInput.value = '';
        
    } catch (error) {
        showNotification('Failed to load image from URL: ' + error.message, 'error');
    }
}

// Clipboard functionality
async function pasteFromClipboard() {
    try {
        const clipboardItems = await navigator.clipboard.read();
        
        for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
                if (type.startsWith('image/')) {
                    const blob = await clipboardItem.getType(type);
                    const file = new File([blob], 'pasted-image', { type: blob.type });
                    selectedFiles = [file];
                    
                    showNotification('Image pasted successfully', 'success');
                    showSection('controlsSection');
                    return;
                }
            }
        }
        
        showNotification('No image found in clipboard', 'error');
        
    } catch (error) {
        showNotification('Failed to paste from clipboard: ' + error.message, 'error');
    }
}

function handlePaste(event) {
    const items = event.clipboardData.items;
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
                selectedFiles = [file];
                showNotification('Image pasted successfully', 'success');
                showSection('controlsSection');
                
                // Switch to paste tab
                switchTab('paste');
                return;
            }
        }
    }
}

// Compression controls
function updateQualityValue() {
    const slider = document.getElementById('qualitySlider');
    const valueDisplay = document.getElementById('qualityValue');
    valueDisplay.textContent = slider.value;
}

function toggleResizeControls() {
    const toggle = document.getElementById('resizeToggle');
    const controls = document.getElementById('resizeControls');
    
    if (toggle.checked) {
        controls.style.display = 'block';
    } else {
        controls.style.display = 'none';
    }
}

function handleAspectRatioToggle() {
    const toggle = document.getElementById('aspectRatioToggle');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    
    if (toggle.checked && widthInput.value && selectedFiles.length > 0) {
        // Calculate and set height based on aspect ratio
        calculateAspectRatio('width');
    }
}

function handleDimensionChange(changedDimension) {
    const aspectRatioToggle = document.getElementById('aspectRatioToggle');
    
    if (aspectRatioToggle.checked) {
        calculateAspectRatio(changedDimension);
    }
}

function calculateAspectRatio(changedDimension) {
    if (selectedFiles.length === 0) return;
    
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    
    const firstImage = selectedFiles[0];
    const img = new Image();
    
    img.onload = function() {
        const aspectRatio = img.width / img.height;
        
        if (changedDimension === 'width' && widthInput.value) {
            const newWidth = parseInt(widthInput.value);
            const newHeight = Math.round(newWidth / aspectRatio);
            heightInput.value = newHeight;
        } else if (changedDimension === 'height' && heightInput.value) {
            const newHeight = parseInt(heightInput.value);
            const newWidth = Math.round(newHeight * aspectRatio);
            widthInput.value = newWidth;
        }
    };
    
    img.src = URL.createObjectURL(firstImage);
}

// Image compression
async function compressImages() {
    if (selectedFiles.length === 0) {
        showNotification('Please select images first', 'error');
        return;
    }
    
    const compressBtn = document.getElementById('compressBtn');
    const btnText = compressBtn.querySelector('.btn-text');
    const btnLoader = compressBtn.querySelector('.btn-loader');
    
    // Show loading state
    compressBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    
    // Show progress modal
    showProgressModal();
    
    try {
        compressedFiles = [];
        const options = getCompressionOptions();
        
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            updateProgress(i, selectedFiles.length, `Compressing ${file.name}...`);
            
            try {
                const compressedFile = await compressImage(file, options);
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
        
        // Hide progress modal after a short delay
        setTimeout(() => {
            hideProgressModal();
        }, 1000);
        
        if (compressedFiles.length > 0) {
            showPreview();
            showSection('previewSection');
            showSection('actionsSection');
            showNotification(`Successfully compressed ${compressedFiles.length} image(s)`, 'success');
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
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
}

function getCompressionOptions() {
    const quality = document.getElementById('qualitySlider').value / 100;
    const targetSize = document.getElementById('targetSize').value;
    const format = document.getElementById('formatSelect').value;
    const resizeToggle = document.getElementById('resizeToggle').checked;
    const width = document.getElementById('widthInput').value;
    const height = document.getElementById('heightInput').value;
    
    const options = {
        quality: quality,
        useWebWorker: true,
        preserveExif: false
    };
    
    if (targetSize) {
        options.maxSizeMB = targetSize / 1024; // Convert KB to MB
    }
    
    if (format !== 'original') {
        options.fileType = `image/${format}`;
    }
    
    if (resizeToggle && (width || height)) {
        if (width) options.maxWidthOrHeight = parseInt(width);
        if (height && !width) options.maxWidthOrHeight = parseInt(height);
    }
    
    return options;
}

async function compressImage(file, options) {
    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error('Error in compression:', error);
        throw error;
    }
}

// Preview functionality
function showPreview() {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '';
    
    compressedFiles.forEach((fileData, index) => {
        const previewItem = createPreviewItem(fileData, index);
        previewContainer.appendChild(previewItem);
    });
}

function createPreviewItem(fileData, index) {
    const item = document.createElement('div');
    item.className = 'preview-item';
    
    const originalUrl = URL.createObjectURL(fileData.original);
    const compressedUrl = URL.createObjectURL(fileData.compressed);
    
    item.innerHTML = `
        <div class="preview-image">
            <h4>Original</h4>
            <img src="${originalUrl}" alt="Original image">
            <div class="preview-stats">
                <div class="stat-item">
                    <span>Size:</span>
                    <span class="stat-value">${formatFileSize(fileData.originalSize)}</span>
                </div>
                <div class="stat-item">
                    <span>Format:</span>
                    <span class="stat-value">${fileData.original.type.split('/')[1].toUpperCase()}</span>
                </div>
            </div>
        </div>
        <div class="preview-image">
            <h4>Compressed</h4>
            <img src="${compressedUrl}" alt="Compressed image">
            <div class="preview-stats">
                <div class="stat-item">
                    <span>Size:</span>
                    <span class="stat-value">${formatFileSize(fileData.compressedSize)}</span>
                </div>
                <div class="stat-item">
                    <span>Format:</span>
                    <span class="stat-value">${fileData.compressed.type.split('/')[1].toUpperCase()}</span>
                </div>
                <div class="stat-item">
                    <span>Reduction:</span>
                    <span class="stat-value">${fileData.compressionRatio}%</span>
                </div>
            </div>
            <div class="compression-ratio">
                ${fileData.compressionRatio}% smaller
            </div>
        </div>
    `;
    
    return item;
}

// Action handlers
async function downloadAllImages() {
    if (compressedFiles.length === 0) {
        showNotification('No compressed images to download', 'error');
        return;
    }
    
    if (compressedFiles.length === 1) {
        // Single file download
        const fileData = compressedFiles[0];
        const url = URL.createObjectURL(fileData.compressed);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compressed_${fileData.original.name}`;
        a.click();
        URL.revokeObjectURL(url);
    } else {
        // Multiple files - create zip
        try {
            const JSZip = await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js');
            const zip = new JSZip.default();
            
            compressedFiles.forEach((fileData, index) => {
                const filename = `compressed_${fileData.original.name}`;
                zip.file(filename, fileData.compressed);
            });
            
            const zipBlob = await zip.generateAsync({type: 'blob'});
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'compressed_images.zip';
            a.click();
            URL.revokeObjectURL(url);
            
            showNotification('All images downloaded as zip file', 'success');
        } catch (error) {
            console.error('Error creating zip:', error);
            showNotification('Failed to create zip file', 'error');
        }
    }
}

async function copyToClipboard() {
    if (compressedFiles.length === 0) {
        showNotification('No compressed images to copy', 'error');
        return;
    }
    
    try {
        const fileData = compressedFiles[0]; // Copy first image
        const clipboardItem = new ClipboardItem({
            [fileData.compressed.type]: fileData.compressed
        });
        
        await navigator.clipboard.write([clipboardItem]);
        showNotification('Image copied to clipboard', 'success');
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        showNotification('Failed to copy to clipboard', 'error');
    }
}

function openShareModal() {
    if (compressedFiles.length === 0) {
        showNotification('No compressed images to share', 'error');
        return;
    }
    
    document.getElementById('shareModal').style.display = 'flex';
}

function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

async function shareToSocial(platform) {
    if (compressedFiles.length === 0) {
        showNotification('No compressed images to share', 'error');
        return;
    }
    
    const fileData = compressedFiles[0];
    
    if (navigator.share && platform === 'native') {
        try {
            await navigator.share({
                title: 'Compressed Image',
                text: 'Check out this compressed image!',
                files: [fileData.compressed]
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        // Open social media sharing URLs
        const urls = {
            facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
            twitter: 'https://twitter.com/intent/tweet?text=',
            whatsapp: 'https://wa.me/?text=',
            telegram: 'https://t.me/share/url?url=',
            linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url='
        };
        
        const shareText = encodeURIComponent('Check out this compressed image!');
        const shareUrl = urls[platform] + shareText;
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    
    closeShareModal();
}

function clearAll() {
    selectedFiles = [];
    compressedFiles = [];
    
    // Reset form
    document.getElementById('fileInput').value = '';
    document.getElementById('urlInput').value = '';
    
    // Hide sections
    hideSection('controlsSection');
    hideSection('previewSection');
    hideSection('actionsSection');
    
    // Reset controls
    document.getElementById('qualitySlider').value = 85;
    document.getElementById('qualityValue').textContent = '85';
    document.getElementById('targetSize').value = '';
    document.getElementById('formatSelect').value = 'original';
    document.getElementById('resizeToggle').checked = false;
    document.getElementById('widthInput').value = '';
    document.getElementById('heightInput').value = '';
    toggleResizeControls();
    
    showNotification('All images cleared', 'info');
}

// Theme handling
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
    localStorage.setItem('theme', currentTheme);
}

function applyTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    } else {
        body.classList.remove('dark-theme');
        themeIcon.textContent = '🌙';
    }
}

// Progress modal
function showProgressModal() {
    document.getElementById('progressModal').style.display = 'flex';
}

function hideProgressModal() {
    document.getElementById('progressModal').style.display = 'none';
}

function updateProgress(current, total, message) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const percentage = (current / total) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${message} (${current} of ${total})`;
}

// Utility functions
function showSection(sectionId) {
    document.getElementById(sectionId).style.display = 'block';
}

function hideSection(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        transition: all 0.3s ease;
        transform: translateX(100%);
        opacity: 0;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance optimization - preload resources
function preloadResources() {
    // Preload JSZip for zip downloads
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
    document.head.appendChild(link);
}

// Initialize preloading
preloadResources(); 