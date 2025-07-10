# Image Compressor Pro v2 - Working Version

## 🚀 Features
- **Dark/Light Theme Toggle** - Working theme switching
- **File Upload & Drag-Drop** - Functional file handling
- **URL Import** - Load images from URLs
- **Clipboard Paste** - Paste images directly
- **Image Compression** - Real compression with quality control
- **Multiple Formats** - Support for JPEG, PNG, WebP, AVIF
- **Batch Processing** - Handle multiple files at once
- **PWA Support** - Installable as an app

## 🛠️ Fixed Issues
This version fixes all the core functionality issues:
- ✅ Dark mode toggle working
- ✅ Image compression working
- ✅ Drag and drop working
- ✅ File upload working
- ✅ Image paste working
- ✅ Import from URL working
- ✅ Compression presets working
- ✅ Compact, functional UI

## 🎯 How to Use

### 1. Start the App
Open `index.html` in a web browser or run a local server:
```bash
cd v2
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

### 2. Add Images
- **Upload**: Click "Browse Files" or drag & drop images
- **URL**: Switch to URL tab and paste image URL
- **Paste**: Use Ctrl+V or click "Paste Image" button

### 3. Choose Settings
- Select compression preset (Balanced, High Quality, Max Compression, Web Optimized)
- Adjust quality slider (1-100%)
- Choose output format (JPEG, PNG, WebP, AVIF)
- Optional: Enable resize with custom dimensions

### 4. Compress & Download
- Click "Compress Images" button
- Wait for processing to complete
- Download individual files or all at once
- Copy to clipboard or share results

## 🔧 Technical Details
- **Client-side Processing**: All compression happens in your browser
- **Privacy-First**: No uploads to servers
- **WebAssembly**: Uses `browser-image-compression` library for advanced compression
- **Canvas Fallback**: Manual canvas compression for unsupported formats
- **Progressive Web App**: Can be installed as a native app

## 🎨 Theme Toggle
Click the moon/sun icon in the header to switch between light and dark themes. Your preference is saved locally.

## 📱 Mobile Support
The app is fully responsive and works on mobile devices. On mobile, you can:
- Use the file picker to select images
- Paste images from clipboard
- Install as a PWA for offline use

## 🔍 Testing
A test file is included at `test-image.html` to verify functionality:
- Basic function tests
- Theme toggle test
- File input test
- Drag & drop test
- Canvas compression test

## 🐛 Troubleshooting
- **Images not loading**: Check browser console for errors
- **Compression not working**: Ensure browser supports Canvas API
- **Paste not working**: Check clipboard permissions
- **PWA not installing**: Ensure HTTPS or localhost

## 📊 Performance
- Processes images up to 50MB efficiently
- Handles batch operations of 10+ images
- Uses Web Workers for background processing
- Optimized memory usage with blob cleanup

## 🔒 Privacy
- 100% client-side processing
- No data sent to servers
- No analytics or tracking
- Local storage only for theme preference

## 🛡️ Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License
MIT License - Free for personal and commercial use. 