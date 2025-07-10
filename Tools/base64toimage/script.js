// Global variables
let decodedImageUrl = null;
let decodedBlob = null;
let imageFormat = null;

// DOM elements
const elements = {
    base64Input: document.getElementById('base64Input'),
    pasteBtn: document.getElementById('pasteBase64Btn'),
    clearBtn: document.getElementById('clearBase64Btn'),
    inputLength: document.getElementById('inputLength'),
    inputFormat: document.getElementById('inputFormat'),
    decodeBtn: document.getElementById('decodeBtn'),
    resultsSection: document.getElementById('resultsSection'),
    decodedImage: document.getElementById('decodedImage'),
    imageInfo: document.getElementById('imageInfo'),
    imageFormatSpan: document.getElementById('imageFormat'),
    imageDimensions: document.getElementById('imageDimensions'),
    imageSize: document.getElementById('imageSize'),
    copyBtn: document.getElementById('copyImageBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    newConversionBtn: document.getElementById('newConversionBtn'),
    darkModeToggle: document.getElementById('darkModeToggle'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    toastIcon: document.getElementById('toastIcon'),
    toastClose: document.getElementById('toastClose')
};

// Share button configuration including Instagram
const shareButtons = [
    {id: 'shareXBtn', handler: shareToX},
    {id: 'shareFacebookBtn', handler: shareToFacebook},
    {id: 'shareLinkedInBtn', handler: shareToLinkedIn},
    {id: 'sharePinterestBtn', handler: shareToPinterest},
    {id: 'shareWhatsAppBtn', handler: shareToWhatsApp},
    {id: 'shareTelegramBtn', handler: shareToTelegram},
    {id: 'shareRedditBtn', handler: shareToReddit},
    {id: 'shareEmailBtn', handler: shareToEmail},
    {id: 'shareInstagramBtn', handler: shareToInstagram}
];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
});

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'success');
}

// Event listeners setup
function setupEventListeners() {
    // Dark mode toggle
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Input events
    elements.base64Input.addEventListener('input', handleInput);
    elements.base64Input.addEventListener('paste', handlePaste);
    
    // Button events
    elements.pasteBtn.addEventListener('click', pasteFromClipboard);
    elements.clearBtn.addEventListener('click', clearInput);
    elements.decodeBtn.addEventListener('click', decodeBase64);
    elements.copyBtn.addEventListener('click', copyImageToClipboard);
    elements.downloadBtn.addEventListener('click', downloadImage);
    elements.newConversionBtn.addEventListener('click', startNewConversion);
    elements.toastClose.addEventListener('click', hideToast);
    
    // Share buttons
    shareButtons.forEach(({id, handler}) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', handler);
        }
    });
    
    // Auto-hide toast
    let toastTimeout;
    const originalShowToast = showToast;
    showToast = (message, type) => {
        originalShowToast(message, type);
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(hideToast, 3000);
    };
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.toast.classList.contains('show')) {
            hideToast();
        }
        if (e.ctrlKey && e.key === 'v' && document.activeElement !== elements.base64Input) {
            e.preventDefault();
            pasteFromClipboard();
        }
        if (e.key === 'Enter' && !elements.decodeBtn.disabled) {
            decodeBase64();
        }
    });
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function trimString(str) {
    return typeof str === 'string' ? str.trim() : str;
}

function isValidBase64(str) {
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
    const base64Data = str.replace(base64Regex, '');
    try {
        return btoa(atob(base64Data)) === base64Data;
    } catch (e) {
        return false;
    }
}

function getImageFormat(base64String) {
    const match = base64String.match(/^data:image\/([a-zA-Z]+);base64,/);
    return match ? match[1].toUpperCase() : 'Unknown';
}

function extractBase64Data(dataUrl) {
    return dataUrl.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
}

// Input handling
function handleInput(e) {
    const input = trimString(e.target.value);
    updateInputInfo(input);
    updateDecodeButton(input);
}

function handlePaste(e) {
    setTimeout(() => {
        const input = trimString(e.target.value);
        updateInputInfo(input);
        updateDecodeButton(input);
        if (input.length > 0) {
            showToast('Base64 string pasted successfully!', 'success');
        }
    }, 10);
}

function updateInputInfo(input) {
    elements.inputLength.textContent = `${input.length.toLocaleString()} characters`;
    
    if (input.length > 0) {
        if (input.startsWith('data:image/')) {
            const format = getImageFormat(input);
            elements.inputFormat.textContent = `Format: ${format}`;
            elements.inputFormat.classList.remove('hidden');
        } else {
            elements.inputFormat.classList.add('hidden');
        }
    } else {
        elements.inputFormat.classList.add('hidden');
    }
}

function updateDecodeButton(input) {
    if (input.length > 0 && isValidBase64(input)) {
        elements.decodeBtn.disabled = false;
        elements.decodeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        elements.decodeBtn.disabled = true;
        elements.decodeBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Clipboard operations
async function pasteFromClipboard() {
    try {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
            showToast('Clipboard access not supported in this browser', 'error');
            return;
        }
        
        const text = await navigator.clipboard.readText();
        if (text) {
            elements.base64Input.value = text;
            handleInput({target: {value: text}});
            showToast('Base64 string pasted from clipboard!', 'success');
        } else {
            showToast('No text found in clipboard', 'error');
        }
    } catch (error) {
        if (error.name === 'NotAllowedError') {
            showToast('Clipboard access denied. Please allow clipboard permissions.', 'error');
        } else {
            showToast('Failed to paste from clipboard', 'error');
        }
    }
}

function clearInput() {
    elements.base64Input.value = '';
    updateInputInfo('');
    updateDecodeButton('');
    hideResults();
    showToast('Input cleared', 'success');
}

// Base64 decoding
async function decodeBase64() {
    const input = trimString(elements.base64Input.value);
    if (!input || !isValidBase64(input)) {
        showToast('Please enter a valid Base64 string', 'error');
        return;
    }
    
    const originalText = elements.decodeBtn.innerHTML;
    elements.decodeBtn.innerHTML = '<svg class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path opacity="0.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M4 12H0"></path><path opacity="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12"></path></svg><span>Decoding...</span>';
    elements.decodeBtn.disabled = true;
    
    try {
        // Add small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Get format from data URL
        imageFormat = getImageFormat(input);
        
        // Extract base64 data
        const base64Data = extractBase64Data(input);
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Determine MIME type
        let mimeType = 'image/png';
        if (input.startsWith('data:image/')) {
            const mimeMatch = input.match(/^data:(image\/[a-zA-Z]+);base64,/);
            if (mimeMatch) {
                mimeType = mimeMatch[1];
            }
        } else {
            // Detect format from binary data
            if (binaryString.startsWith('ÿØÿ')) {
                mimeType = 'image/jpeg';
                imageFormat = 'JPEG';
            } else if (binaryString.startsWith('‰PNG')) {
                mimeType = 'image/png';
                imageFormat = 'PNG';
            } else if (binaryString.startsWith('GIF87a') || binaryString.startsWith('GIF89a')) {
                mimeType = 'image/gif';
                imageFormat = 'GIF';
            } else if (binaryString.startsWith('RIFF') && binaryString.includes('WEBP')) {
                mimeType = 'image/webp';
                imageFormat = 'WEBP';
            } else if (binaryString.includes('ftypavif') || binaryString.startsWith('\0\0\0 ftypavif')) {
                mimeType = 'image/avif';
                imageFormat = 'AVIF';
            } else if (binaryString.includes('ftypheic') || binaryString.startsWith('\0\0\0\x18ftypheic') || binaryString.startsWith('\0\0\0 ftypheic')) {
                mimeType = 'image/heic';
                imageFormat = 'HEIC';
            } else if (binaryString.includes('ftypheif')) {
                mimeType = 'image/heif';
                imageFormat = 'HEIF';
            } else if (binaryString.startsWith('BM')) {
                mimeType = 'image/bmp';
                imageFormat = 'BMP';
            } else if (binaryString.startsWith('II*\0') || binaryString.startsWith('MM\0*')) {
                mimeType = 'image/tiff';
                imageFormat = 'TIFF';
            } else if (binaryString.startsWith('\0\0\x01\0')) {
                mimeType = 'image/x-icon';
                imageFormat = 'ICO';
            }
        }
        
        decodedBlob = new Blob([bytes], {type: mimeType});
        decodedImageUrl = URL.createObjectURL(decodedBlob);
        
        await displayImage(decodedImageUrl);
        
        // Show success message - fixed the error issue
        showToast('Base64 decoded successfully!', 'success');
        
    } catch (error) {
        console.error('Decode error:', error);
        showToast('Failed to decode Base64 string. Please check the format.', 'error');
    } finally {
        elements.decodeBtn.innerHTML = originalText;
        elements.decodeBtn.disabled = false;
    }
}

// Display decoded image
async function displayImage(imageUrl) {
    return new Promise((resolve, reject) => {
        elements.decodedImage.onload = () => {
            const width = elements.decodedImage.naturalWidth;
            const height = elements.decodedImage.naturalHeight;
            const size = decodedBlob.size;
            
            elements.imageFormatSpan.textContent = imageFormat;
            elements.imageDimensions.textContent = `${width} × ${height}`;
            elements.imageSize.textContent = formatFileSize(size);
            elements.imageInfo.textContent = `${imageFormat} • ${width}×${height} • ${formatFileSize(size)}`;
            
            // Show format warnings
            if (imageFormat === 'AVIF') {
                showToast('AVIF format detected. Ensure you\'re using Chrome 85+, Firefox 93+, or Safari 16+', 'info');
            } else if (imageFormat === 'HEIC' || imageFormat === 'HEIF') {
                showToast('HEIC/HEIF format detected. This format is mainly supported on Apple devices.', 'info');
            }
            
            enableActionButtons();
            showResults();
            resolve();
        };
        
        elements.decodedImage.onerror = () => {
            reject(new Error('Failed to load decoded image'));
        };
        
        elements.decodedImage.src = imageUrl;
    });
}

// UI management
function enableActionButtons() {
    elements.copyBtn.disabled = false;
    elements.downloadBtn.disabled = false;
    
    const shareButtonIds = ['shareXBtn', 'shareFacebookBtn', 'shareLinkedInBtn', 'sharePinterestBtn', 'shareWhatsAppBtn', 'shareTelegramBtn', 'shareRedditBtn', 'shareEmailBtn', 'shareInstagramBtn'];
    shareButtonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.disabled = false;
            button.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
    
    elements.copyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    elements.downloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
}

function showResults() {
    elements.resultsSection.classList.remove('hidden');
    elements.resultsSection.classList.add('animate-fade-in');
    elements.resultsSection.scrollIntoView({behavior: 'smooth', block: 'start'});
}

function hideResults() {
    elements.resultsSection.classList.add('hidden');
    
    if (decodedImageUrl) {
        URL.revokeObjectURL(decodedImageUrl);
        decodedImageUrl = null;
    }
    
    decodedBlob = null;
    imageFormat = null;
    elements.decodedImage.src = '';
    
    elements.copyBtn.disabled = true;
    elements.downloadBtn.disabled = true;
    
    const shareButtonIds = ['shareXBtn', 'shareFacebookBtn', 'shareLinkedInBtn', 'sharePinterestBtn', 'shareWhatsAppBtn', 'shareTelegramBtn', 'shareRedditBtn', 'shareEmailBtn', 'shareInstagramBtn'];
    shareButtonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.disabled = true;
            button.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });
    
    elements.copyBtn.classList.add('opacity-50', 'cursor-not-allowed');
    elements.downloadBtn.classList.add('opacity-50', 'cursor-not-allowed');
}

// Fixed copy functionality to copy actual image instead of base64
async function copyImageToClipboard() {
    if (!decodedBlob) {
        showToast('No image to copy', 'error');
        return;
    }
    
    const originalText = elements.copyBtn.innerHTML;
    elements.copyBtn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path opacity="0.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M4 12H0"></path><path opacity="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12"></path></svg><span>Copying...</span>';
    
    try {
        if (navigator.clipboard && navigator.clipboard.write) {
            const permissions = await navigator.permissions.query({name: 'clipboard-write'});
            if (permissions.state === 'denied') {
                throw new Error('Clipboard access denied by browser permissions');
            }
            
            let clipboardItem;
            try {
                // Try to copy the image blob directly
                clipboardItem = new ClipboardItem({
                    [decodedBlob.type]: decodedBlob
                });
            } catch (e) {
                // Fallback: convert to PNG canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = elements.decodedImage.naturalWidth;
                canvas.height = elements.decodedImage.naturalHeight;
                ctx.drawImage(elements.decodedImage, 0, 0);
                
                const pngBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                clipboardItem = new ClipboardItem({
                    'image/png': pngBlob
                });
            }
            
            await navigator.clipboard.write([clipboardItem]);
            showToast('Image copied to clipboard!', 'success');
        } else {
            throw new Error('Clipboard API not supported');
        }
        
        // Show success state
        elements.copyBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Copied!</span>';
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
        
    } catch (error) {
        elements.copyBtn.innerHTML = originalText;
        
        // Fallback to copying as base64 text
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = elements.decodedImage.naturalWidth;
            canvas.height = elements.decodedImage.naturalHeight;
            ctx.drawImage(elements.decodedImage, 0, 0);
            
            const dataUrl = canvas.toDataURL('image/png');
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(dataUrl);
                showToast('Image data copied as Base64 text! You can paste it in image editors.', 'success');
            } else {
                // Final fallback using deprecated method
                const textarea = document.createElement('textarea');
                textarea.value = dataUrl;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                
                if (!document.execCommand('copy')) {
                    throw new Error('All copy methods failed');
                }
                
                document.body.removeChild(textarea);
                showToast('Image data copied as Base64 text! You can paste it in image editors.', 'success');
            }
        } catch (fallbackError) {
            console.error('Copy fallback failed:', fallbackError);
            showToast('Copy failed. Try right-clicking the image and selecting "Copy Image".', 'error');
        }
    }
}

// Download functionality - Enhanced version
function downloadImage() {
    if (!decodedImageUrl || !decodedBlob) {
        showToast('No image to download', 'error');
        return;
    }
    
    // Show loading state
    const originalText = elements.downloadBtn.innerHTML;
    elements.downloadBtn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path opacity="0.25" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M4 12H0"></path><path opacity="0.75" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12"></path></svg><span>Downloading...</span>';
    elements.downloadBtn.disabled = true;
    
    try {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        let extension = imageFormat ? imageFormat.toLowerCase() : 'png';
        if (extension === 'jpeg') extension = 'jpg';
        const filename = `decoded-image-${timestamp}.${extension}`;
        
        // Method 1: Modern browser with File System Access API
        if ('showSaveFilePicker' in window) {
            const handle = window.showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    description: 'Images',
                    accept: {
                        'image/*': [`.${extension}`]
                    }
                }]
            });
            
            handle.then(async (fileHandle) => {
                const writable = await fileHandle.createWritable();
                await writable.write(decodedBlob);
                await writable.close();
                restoreDownloadButton();
                showToast('Image downloaded successfully!', 'success');
            }).catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('File System Access API error:', error);
                    fallbackDownload();
                } else {
                    restoreDownloadButton();
                    showToast('Download cancelled', 'info');
                }
            });
            return;
        }
        
        // Method 2: IE/Edge legacy support
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(decodedBlob, filename);
            restoreDownloadButton();
            showToast('Image downloaded successfully!', 'success');
            return;
        }
        
        // Method 3: Standard download with direct blob
        fallbackDownload();
        
    } catch (error) {
        console.error('Download error:', error);
        fallbackDownload();
    }
    
    function fallbackDownload() {
        try {
            // Create canvas and convert to data URL for better compatibility
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size
            canvas.width = elements.decodedImage.naturalWidth;
            canvas.height = elements.decodedImage.naturalHeight;
            
            // Draw image to canvas
            ctx.drawImage(elements.decodedImage, 0, 0);
            
            // Convert to data URL
            const dataURL = canvas.toDataURL('image/png', 1.0);
            
            // Create download link
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = dataURL;
            link.download = `decoded-image-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
            
            // Add to DOM
            document.body.appendChild(link);
            
            // Force download
            link.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
                // Revoke object URL to free memory
                if (dataURL.startsWith('blob:')) {
                    URL.revokeObjectURL(dataURL);
                }
            }, 100);
            
            restoreDownloadButton();
            showToast('Image downloaded successfully!', 'success');
            
        } catch (fallbackError) {
            console.error('Fallback download failed:', fallbackError);
            restoreDownloadButton();
            
            // Final fallback - open image in new tab
            try {
                const newWindow = window.open();
                newWindow.document.write(`
                    <html>
                        <head><title>Download Image</title></head>
                        <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f0f0;">
                            <div style="text-align:center;">
                                <img src="${decodedImageUrl}" style="max-width:90vw; max-height:90vh; border:1px solid #ccc; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
                                <div style="margin-top:20px; font-family:Arial,sans-serif; color:#666;">
                                    <p>Right-click on the image and select "Save image as..." to download</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `);
                newWindow.document.close();
                showToast('Image opened in new tab. Right-click to save.', 'info');
            } catch (finalError) {
                console.error('Final fallback failed:', finalError);
                showToast('Download failed. Please try right-clicking the image and selecting "Save image as...".', 'error');
            }
        }
    }
    
    function restoreDownloadButton() {
        elements.downloadBtn.innerHTML = originalText;
        elements.downloadBtn.disabled = false;
    }
}

// Social sharing configuration
function getShareConfig() {
    return {
        baseUrl: window.location.origin + '/base64toimage/',
        title: '🚀 Amazing Base64 to Image Converter - Free Online Tool!',
        shortTitle: 'Base64 to Image Converter',
        description: '🎨 Transform Base64 strings into stunning images instantly! This incredible FREE tool supports ALL formats (JPEG, PNG, GIF, WebP, AVIF, HEIC & more). No uploads needed - everything happens in your browser! 🔒✨',
        hashtags: '#Base64 #ImageConverter #WebDev #FreeTool #Developer #Design #OnlineTools #TechMagic',
        engagingText: '🔥 Just discovered this AMAZING Base64 to Image converter! Transform encoded strings into beautiful images in seconds. Perfect for developers, designers & tech enthusiasts! Try it FREE now! 💎',
        callToAction: '👉 Check out this incredible tool that saved me hours of work!'
    };
}

// Social sharing functions
function shareToX() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const text = `${config.engagingText}\n\n${config.hashtags}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(config.baseUrl)}`;
    
    window.open(url, '_blank', 'width=550,height=420');
    showToast('🐦 Opening X (Twitter) share...', 'info');
}

function shareToFacebook() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(config.baseUrl)}&quote=${encodeURIComponent(config.callToAction + ' ' + config.description)}`;
    
    window.open(url, '_blank', 'width=580,height=400');
    showToast('📘 Opening Facebook share...', 'info');
}

function shareToLinkedIn() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(config.baseUrl)}&title=${encodeURIComponent(config.title)}&summary=${encodeURIComponent(config.description)}`;
    
    window.open(url, '_blank', 'width=520,height=570');
    showToast('💼 Opening LinkedIn share...', 'info');
}

function shareToPinterest() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(config.baseUrl)}&description=${encodeURIComponent(config.engagingText + ' ' + config.description)}`;
    
    window.open(url, '_blank', 'width=520,height=570');
    showToast('📌 Opening Pinterest share...', 'info');
}

function shareToWhatsApp() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const text = `${config.callToAction}\n\n${config.description}\n\n🔗 ${config.baseUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
    showToast('💬 Opening WhatsApp share...', 'info');
}

function shareToTelegram() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const text = `${config.engagingText}\n\n${config.description}\n\n🔗 ${config.baseUrl}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(config.baseUrl)}&text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
    showToast('✈️ Opening Telegram share...', 'info');
}

function shareToReddit() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const url = `https://reddit.com/submit?url=${encodeURIComponent(config.baseUrl)}&title=${encodeURIComponent(config.title + ' - ' + config.description)}`;
    
    window.open(url, '_blank', 'width=600,height=500');
    showToast('🔴 Opening Reddit share...', 'info');
}

function shareToEmail() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    const subject = config.title;
    const body = `${config.callToAction}\n\n${config.description}\n\nTry it here: ${config.baseUrl}\n\n${config.hashtags}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = url;
    showToast('📧 Opening email client...', 'info');
}

// New Instagram sharing function
function shareToInstagram() {
    if (!decodedImageUrl) {
        showToast('No image to share', 'error');
        return;
    }
    
    const config = getShareConfig();
    // Instagram web doesn't support direct sharing with URL, so we'll copy the message and open Instagram
    const text = `${config.engagingText}\n\n${config.description}\n\n🔗 ${config.baseUrl}\n\n${config.hashtags}`;
    
    // Copy text to clipboard for user to paste
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('📋 Caption copied to clipboard! Opening Instagram...', 'info');
            setTimeout(() => {
                window.open('https://www.instagram.com/', '_blank');
            }, 1000);
        }).catch(() => {
            showToast('📸 Opening Instagram...', 'info');
            window.open('https://www.instagram.com/', '_blank');
        });
    } else {
        showToast('📸 Opening Instagram...', 'info');
        window.open('https://www.instagram.com/', '_blank');
    }
}

// New conversion
function startNewConversion() {
    clearInput();
    hideResults();
    elements.base64Input.focus();
    showToast('Ready for new conversion!', 'success');
}

// Toast notifications
function showToast(message, type = 'info') {
    elements.toastMessage.textContent = message;
    
    const icons = {
        success: '<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        error: '<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        info: '<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    };
    
    elements.toastIcon.innerHTML = icons[type] || icons.info;
    elements.toast.classList.remove('hide');
    elements.toast.classList.add('show');
    
    // Trigger reflow to ensure animation
    elements.toast.offsetHeight;
}

function hideToast() {
    elements.toast.classList.remove('show');
    elements.toast.classList.add('hide');
} 