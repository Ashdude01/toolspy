# 🗜️ Image Compressor Tool

A modern, browser-based image compression tool with advanced features and a beautiful user interface. Compress images while maintaining quality, with support for multiple formats and batch processing - all done client-side for maximum privacy.

## ✨ Features

### 🖼️ **Multiple Input Methods**
- **File Upload**: Browse and select files from your device
- **Drag & Drop**: Simply drag images into the drop zone
- **URL Input**: Load images directly from web URLs
- **Clipboard Paste**: Paste images directly from clipboard (Ctrl+V)

### 🔧 **Advanced Compression Options**
- **Quality Control**: Adjust compression quality from 10% to 100%
- **Target Size**: Set specific file size targets (KB/MB)
- **Format Conversion**: Convert between JPG, PNG, WebP, AVIF formats
- **Image Resizing**: Resize images with aspect ratio preservation
- **Batch Processing**: Compress multiple images simultaneously

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Real-time Preview**: See before/after comparison with statistics
- **Progress Indicators**: Visual feedback during compression
- **Intuitive Controls**: Easy-to-use sliders and toggles

### 🚀 **Advanced Features**
- **100% Client-side**: No server uploads - your images stay private
- **Core Web Vitals Optimized**: Fast loading and minimal layout shifts
- **SEO Optimized**: Proper meta tags and structured data
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: WebWorker-based compression for smooth operation

### 💾 **Output Options**
- **Download**: Save compressed images individually or as ZIP
- **Copy to Clipboard**: Copy compressed images for easy sharing
- **Social Sharing**: Share directly to Facebook, Twitter, WhatsApp, etc.
- **Statistics**: View compression ratios and size savings

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in your web browser
2. Choose your preferred input method (Upload, URL, or Paste)
3. Select your images
4. Adjust compression settings as needed
5. Click "Compress Images"
6. Download or share your compressed images

### Installation
No installation required! Simply:
1. Download or clone the project files
2. Open `index.html` in any modern web browser
3. Start compressing images immediately

## 📋 Supported Formats

**Input Formats:**
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- AVIF (.avif)
- GIF (.gif)
- BMP (.bmp)
- And more!

**Output Formats:**
- JPEG (best for photos)
- PNG (best for graphics with transparency)
- WebP (modern format with excellent compression)
- AVIF (next-gen format with superior compression)

## 🎯 Usage Guide

### Basic Compression
1. **Upload Images**: Use any of the four input methods
2. **Adjust Quality**: Use the quality slider (default: 85%)
3. **Compress**: Click the "Compress Images" button
4. **Download**: Save your compressed images

### Advanced Options

#### Target Size Compression
- Enter desired file size in KB
- Tool will automatically adjust quality to meet target
- Useful for social media or web optimization

#### Format Conversion
- Convert images to more efficient formats
- WebP offers ~25-30% better compression than JPEG
- AVIF offers ~50% better compression than JPEG

#### Image Resizing
- Enable "Resize image" checkbox
- Enter new dimensions in pixels
- "Maintain aspect ratio" prevents image distortion
- Useful for creating thumbnails or web-optimized images

#### Batch Processing
- Upload multiple images at once
- All images processed with same settings
- Download as individual files or ZIP archive

### Keyboard Shortcuts
- **Ctrl+V** (Cmd+V on Mac): Paste image from clipboard
- **Enter**: Load image from URL input
- **Escape**: Close modals
- **Tab**: Navigate between controls

## 🔧 Technical Details

### Libraries Used
- **browser-image-compression**: Core compression engine
- **JSZip**: ZIP file creation for batch downloads
- **Native APIs**: Clipboard API, Web Share API, File API

### Browser Support
- **Chrome**: 88+
- **Firefox**: 84+
- **Safari**: 14+
- **Edge**: 88+

### Performance Features
- **WebWorkers**: Non-blocking compression
- **Lazy Loading**: Resources loaded when needed
- **Memory Management**: Automatic cleanup of blob URLs
- **Progressive Enhancement**: Graceful fallbacks for older browsers

## 🎨 Customization

### Theme Colors
The tool supports both light and dark themes. You can customize colors by modifying CSS variables in `styles.css`:

```css
:root {
    --primary-color: #3b82f6;
    --success-color: #10b981;
    --error-color: #ef4444;
    /* ... more variables */
}
```

### Compression Settings
Default compression settings can be modified in `script.js`:

```javascript
// Default quality (85%)
const qualitySlider = document.getElementById('qualitySlider');
qualitySlider.value = 85;

// Default compression options
const options = {
    quality: 0.85,
    useWebWorker: true,
    preserveExif: false
};
```

## 📱 Mobile Optimization

The tool is fully responsive and optimized for mobile devices:
- Touch-friendly controls
- Optimized viewport settings
- Gesture support for drag & drop
- Mobile-first CSS approach

## 🔐 Privacy & Security

- **No Server Uploads**: All processing happens in your browser
- **No Data Collection**: No analytics or tracking
- **No Network Requests**: Works completely offline (after initial load)
- **Local Storage**: Only theme preference is saved locally

## 🤝 Contributing

Feel free to contribute to this project! Areas for improvement:
- Additional image formats
- More compression algorithms
- UI/UX enhancements
- Performance optimizations
- Accessibility improvements

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Images not loading from URL**
- Ensure URL points directly to an image file
- Check if the server allows cross-origin requests
- Try copying the image and pasting instead

**Clipboard paste not working**
- Ensure you're using a modern browser
- Check if the website has clipboard permissions
- Try using Ctrl+V while focused on the paste area

**Download not working**
- Check if pop-up blocker is preventing downloads
- Ensure browser allows automatic downloads
- Try right-clicking and "Save As" on the preview images

**Large files taking long time**
- Large images (>10MB) may take time to process
- Consider resizing very large images first
- Use WebWorkers-enabled browsers for better performance

### Browser Permissions
The tool may request permissions for:
- **Clipboard access**: For paste functionality
- **Downloads**: For saving compressed images
- **Storage**: For theme preferences only

## 🌟 Credits

Built with modern web technologies and best practices. Special thanks to:
- browser-image-compression library for the compression engine
- Modern CSS Grid and Flexbox for responsive layouts
- Web APIs for native browser functionality

---

**Made with ❤️ for the web community** 