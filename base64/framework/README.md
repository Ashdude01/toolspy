# Tool Framework

A modern, reusable framework for building tool-based web applications with clean UI/UX, responsive design, and comprehensive features.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with dark mode support
- **Component-Based**: Modular components for header, footer, toast notifications, and tool templates
- **SEO Optimized**: Built-in SEO configuration with Open Graph and Twitter Card support
- **PWA Ready**: Service worker and manifest.json for progressive web app functionality
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for Core Web Vitals with lazy loading and caching
- **TypeScript Ready**: Well-documented APIs that work great with TypeScript
- **Framework Agnostic**: Works with Tailwind CSS or standalone CSS
- **Developer Friendly**: Comprehensive utilities and helper functions

## 📁 Structure

```
framework/
├── components/          # Reusable UI components
│   ├── header.js       # Header with logo, navigation, and dark mode
│   ├── footer.js       # Footer with links and content
│   ├── toast.js        # Toast notification system
│   └── tool-template.js # Main tool template component
├── styles/             # CSS styling system
│   ├── base.css        # Base styles and variables
│   ├── components.css  # Component-specific styles
│   └── animations.css  # Animation utilities
├── utils/              # Utility functions
│   ├── file-utils.js   # File handling utilities
│   ├── validation.js   # Validation functions
│   └── helpers.js      # General helper functions
├── config/             # Configuration system
│   ├── app-config.js   # Application configuration
│   └── seo-config.js   # SEO and meta tag configuration
├── templates/          # Template files
│   ├── index.html      # HTML template with placeholders
│   ├── manifest.json   # PWA manifest template
│   └── sw.js          # Service worker template
├── assets/             # Static assets
│   └── favicon.svg     # Default favicon
├── examples/           # Example implementations
│   └── text-converter/ # Text case converter example
└── README.md          # Documentation
```

## 🛠️ Quick Start

### 1. Copy the Framework

Copy the `framework` folder to your project directory.

### 2. Basic HTML Setup

Create an HTML file using the template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Tool Name</title>
    
    <!-- Include Tailwind CSS or your own styles -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Framework Components -->
    <script src="framework/components/header.js"></script>
    <script src="framework/components/footer.js"></script>
    <script src="framework/components/toast.js"></script>
    <script src="framework/components/tool-template.js"></script>
    
    <!-- Framework Utilities -->
    <script src="framework/utils/helpers.js"></script>
    <script src="framework/utils/file-utils.js"></script>
    <script src="framework/utils/validation.js"></script>
    
    <!-- Framework Configuration -->
    <script src="framework/config/app-config.js"></script>
    <script src="framework/config/seo-config.js"></script>
</head>
<body>
    <div id="app"></div>
    
    <script>
        // Your application code here
    </script>
</body>
</html>
```

### 3. Initialize Components

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Header
    const header = new Header({
        title: 'My Tool',
        subtitle: 'Description of my tool',
        showDarkModeToggle: true
    });
    
    // Initialize Footer
    const footer = new Footer({
        content: 'Made with ❤️ for developers',
        subContent: 'All processing happens locally'
    });
    
    // Initialize Toast
    const toast = new Toast();
    
    // Initialize Tool Template
    const tool = new ToolTemplate({
        title: 'My Tool',
        description: 'What my tool does',
        onProcess: async function(input) {
            // Your processing logic here
            return input.toUpperCase();
        }
    });
});
```

## 📖 API Reference

### Header Component

```javascript
const header = new Header({
    title: 'Tool Title',              // Header title
    subtitle: 'Tool Description',     // Header subtitle
    logo: '<svg>...</svg>',          // Custom logo SVG
    navigationItems: [               // Navigation links
        { text: 'Home', url: '/' },
        { text: 'About', url: '/about' }
    ],
    showDarkModeToggle: true         // Show dark mode toggle
});
```

### Footer Component

```javascript
const footer = new Footer({
    content: 'Footer content',        // Main footer text
    subContent: 'Subtitle text',      // Secondary footer text
    links: [                         // Footer links
        { text: 'Privacy', url: '/privacy' },
        { text: 'Terms', url: '/terms' }
    ],
    showPrivacyNote: true           // Show privacy note
});
```

### Toast Component

```javascript
const toast = new Toast({
    position: 'bottom-center',       // Position: top/bottom + left/center/right
    duration: 3000,                 // Auto-dismiss duration (ms)
    className: 'custom-toast'       // Custom CSS class
});

// Show notifications
Toast.success('Success message');
Toast.error('Error message');
Toast.warning('Warning message');
Toast.info('Info message');
```

### Tool Template Component

```javascript
const tool = new ToolTemplate({
    title: 'Tool Title',
    description: 'Tool description',
    features: ['Feature 1', 'Feature 2'],
    
    inputSection: {
        type: 'textarea',            // 'textarea', 'file', or custom
        title: 'Input',
        label: 'Enter text',
        placeholder: 'Type here...',
        processButtonText: 'Convert'
    },
    
    outputSection: {
        title: 'Output',
        placeholder: 'Result will appear here...'
    },
    
    showPreview: true,              // Show preview section
    
    // Event handlers
    onProcess: async function(input) {
        // Your processing logic
        return processedOutput;
    },
    
    onClear: function() {
        // Custom clear logic
    },
    
    onCopy: function() {
        // Custom copy logic  
    },
    
    onDownload: function(output) {
        // Custom download logic
    }
});
```

## 🎨 Styling

### Using with Tailwind CSS (Recommended)

The framework is designed to work seamlessly with Tailwind CSS:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    primary: {
                        // Your color palette
                    }
                }
            }
        }
    }
</script>
```

### Using Standalone CSS

If you prefer not to use Tailwind, include the framework CSS files:

```html
<link rel="stylesheet" href="framework/styles/base.css">
<link rel="stylesheet" href="framework/styles/components.css">
<link rel="stylesheet" href="framework/styles/animations.css">
```

### Custom Styling

Override default styles with CSS custom properties:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --background-color: #your-color;
}
```

## ⚙️ Configuration

### App Configuration

```javascript
const config = getConfig({
    app: {
        name: 'My Tool',
        version: '1.0.0',
        description: 'Tool description'
    },
    theme: {
        primaryColor: '#3B82F6',
        darkMode: 'auto'            // 'auto', 'light', 'dark'
    },
    features: {
        analytics: false,
        serviceWorker: true,
        fileUpload: true
    }
});
```

### SEO Configuration

```javascript
const seo = new SEOConfig({
    title: 'Page Title',
    description: 'Page description',
    keywords: ['keyword1', 'keyword2'],
    openGraph: {
        title: 'OG Title',
        description: 'OG Description',
        image: 'https://example.com/og-image.jpg'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Twitter Title',
        description: 'Twitter Description'
    }
});

seo.apply(); // Apply to current page
```

## 🛠️ Utilities

### File Utils

```javascript
// Validate file
const result = FileUtils.validateFile(file, {
    allowedTypes: ['text/plain'],
    maxSize: 1024 * 1024 // 1MB
});

// Read file as text
const content = await FileUtils.readAsText(file);

// Download content as file
FileUtils.downloadAsFile(content, 'output.txt', 'text/plain');

// Get file info
const info = FileUtils.getFileInfo(file);
```

### Validation Utils

```javascript
// Validate email
const isValid = ValidationUtils.isValidEmail('test@example.com');

// Validate form
const result = ValidationUtils.validateForm(data, {
    email: [{ type: 'required' }, { type: 'email' }],
    password: [{ type: 'required' }, { type: 'length', min: 8 }]
});
```

### Helper Utils

```javascript
// Debounce function
const debouncedFn = HelperUtils.debounce(myFunction, 300);

// Copy to clipboard
await HelperUtils.copyToClipboard('text to copy');

// Format number
const formatted = HelperUtils.formatNumber(1234567); // "1,234,567"

// Generate unique ID
const id = HelperUtils.generateId(); // "id-1641234567890-abc123"
```

## 🌐 PWA Features

### Service Worker

The framework includes a configurable service worker template:

```javascript
// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
```

### Manifest

Configure your PWA manifest:

```json
{
    "name": "Your Tool Name",
    "short_name": "Tool",
    "description": "Tool description",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#3B82F6",
    "background_color": "#ffffff"
}
```

## 📱 Responsive Design

The framework is fully responsive out of the box:

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Responsive breakpoints for tablets and desktop
- **Touch Friendly**: Touch-optimized interface elements
- **Flexible Layouts**: Adaptive layouts that work on any screen size

## ♿ Accessibility

Built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML and ARIA labels
- **High Contrast**: Support for high contrast modes
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Clear focus indicators

## 🚀 Performance

Optimized for performance:

- **Lazy Loading**: Components load on demand
- **Caching**: Intelligent caching strategies
- **Compression**: Minimal bundle sizes
- **Core Web Vitals**: Optimized for Google's Core Web Vitals

## 🎯 Examples

### Text Converter Tool

Check out the complete example in `examples/text-converter/` which demonstrates:

- Multiple conversion modes
- Real-time text statistics
- File upload and download
- Responsive design
- Dark mode support

### Creating Your Own Tool

1. Copy the framework folder
2. Modify the HTML template
3. Implement your processing logic
4. Customize the styling
5. Configure SEO settings
6. Test and deploy

## 🔧 Development

### Local Development

1. Serve files from a local server (required for modules):
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

2. Open your browser to `http://localhost:8000`

### Building for Production

1. Minify CSS and JavaScript files
2. Optimize images
3. Configure proper caching headers
4. Set up HTTPS
5. Register service worker

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This framework is released under the MIT License. See LICENSE file for details.

## 🆘 Support

For help and support:

- Check the examples in the `examples/` folder
- Review the API documentation above
- Create an issue for bugs or feature requests

## 🏗️ Roadmap

Future enhancements planned:

- [ ] TypeScript definitions
- [ ] React/Vue component wrappers
- [ ] Additional utility functions
- [ ] More example implementations
- [ ] Testing framework integration
- [ ] Build tool integration
- [ ] Component documentation site

---

**Happy building! 🎉** 