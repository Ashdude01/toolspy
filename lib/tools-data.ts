export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  icon: string;
  featured?: boolean;
  tags: string[];
  path: string;
  status: 'active' | 'coming-soon' | 'beta';
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  };
  posterImage?: string;
}

export type ToolCategory = 
  | 'image-tools' 
  | 'pdf-tools' 
  | 'base64-tools' 
  | 'calculators' 
  | 'misc-tools'
  | 'json-tools'
  | 'ai-tools'
  | 'code-tools'
  | 'conversion-tools';

// Helper function to generate SEO data for tools
function generateSEO(tool: {
  name: string;
  slug: string;
  title?: string;
  description: string;
  tags: string[];
}): Tool['seo'] {
  const baseUrl = 'https://toolspy.com';
  const metaTitle = tool.title || `${tool.name} - Free Online Tool | Toolspy`;
  const metaDescription = tool.description.length > 161 
    ? tool.description.substring(0, 157) + '...' 
    : tool.description;
  
  return {
    metaTitle,
    metaDescription,
    canonicalUrl: `${baseUrl}${tool.slug}`,
    keywords: tool.tags,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage: `/images/tools/${tool.slug.replace('/', '')}.jpg`,
    twitterTitle: metaTitle,
    twitterDescription: metaDescription,
    twitterImage: `/images/tools/${tool.slug.replace('/', '')}.jpg`
  };
}

export const toolCategories: Record<ToolCategory, { name: string; description: string; icon: string }> = {
  'image-tools': {
    name: 'Professional Image Tools',
    description: 'Convert, compress, and optimize images with advanced algorithms',
    icon: '🖼️'
  },
  'pdf-tools': {
    name: 'PDF Processing Tools', 
    description: 'Professional PDF manipulation and conversion tools',
    icon: '📄'
  },
  'base64-tools': {
    name: 'Base64 Conversion Tools',
    description: 'Secure encoding and decoding of Base64 data',
    icon: '🔤'
  },
  'calculators': {
    name: 'Advanced Calculators',
    description: 'Professional calculation and conversion tools',
    icon: '🧮'
  },
  'misc-tools': {
    name: 'Utility Tools',
    description: 'Additional professional utilities and helpers',
    icon: '🧰'
  },
  'json-tools': {
    name: 'JSON Processing Tools',
    description: 'Format, validate, and convert JSON data with advanced features',
    icon: '📋'
  },
  'ai-tools': {
    name: 'AI-Powered Tools',
    description: 'Intelligent tools powered by artificial intelligence',
    icon: '🤖'
  },
  'code-tools': {
    name: 'Developer Tools',
    description: 'Code formatting, minification, and development utilities',
    icon: '💻'
  },
  'conversion-tools': {
    name: 'File Conversion Tools',
    description: 'Convert between various file formats and media types',
    icon: '🔄'
  }
};

export const tools: Tool[] = [
  // Image Tools
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    description: 'Compress images with Toolspy\'s advanced engine to reduce file size while maintaining quality',
    category: 'image-tools',
    icon: '🗜️',
    featured: true,
    tags: ['compress', 'optimize', 'resize', 'jpeg', 'png', 'webp', 'toolspy'],
    path: '/image-compressor',
    status: 'active',
    seo: generateSEO({
      name: 'Image Compressor',
      title: 'Free Online Image Compressor – Compress Images | Toolspy',
      slug: '/image-compressor',
      description: "Quickly compress JPG, PNG, and GIF images online with Toolspy's free, secure, browser-based image compressor. Reduce image size without quality loss instantly",
      tags: ['compress', 'optimize', 'resize', 'jpeg', 'png', 'webp', 'toolspy']
    }),
    posterImage: '/images/tools/image-compressor.webp'
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    slug: 'image-converter',
    description: 'Convert images between different formats (PNG, JPG, WebP, etc.)',
    category: 'image-tools',
    icon: '🔄',
    tags: ['convert', 'format', 'png', 'jpg', 'webp'],
    path: '/image-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Image Converter',
      title: "Free Online Image Converter – Convert Images | Toolspy",
      slug: '/image-converter',
      description: "Instantly convert images to JPG, PNG, GIF, and more with Toolspy's fast, secure, and free online image converter. No software needed—convert in your browser",
      tags: ['convert', 'format', 'png', 'jpg', 'webp', 'avif']
    }),
    posterImage: '/images/tools/image-converter.webp'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    description: 'Resize images to specific dimensions or percentages',
    category: 'image-tools',
    icon: '📏',
    tags: ['resize', 'dimensions', 'scale'],
    path: '/image-resizer',
    status: 'active',
    seo: generateSEO({
      name: 'Image Resizer',
      slug: '/image-resizer',
      description: 'Resize images to specific dimensions or percentages',
      tags: ['resize', 'dimensions', 'scale']
    }),
    posterImage: '/images/tools/image-resizer.webp'
  },
  {
    id: 'image-optimizer',
    name: 'Image Optimizer',
    slug: 'image-optimizer',
    description: 'Optimize images for faster loading and better performance',
    category: 'image-tools',
    icon: '📏',
    tags: ['optimize', 'performance', 'compression'],
    path: '/image-optimizer',
    status: 'active',
    seo: generateSEO({
      name: 'Image Optimizer',
      slug: '/image-optimizer',
      description: 'Optimize images for faster loading and better performance',
      tags: ['optimize', 'performance', 'compression']
    }),
    posterImage: '/images/tools/image-optimizer.webp'
  },
  {
    id: 'jfif-to-jpg',
    name: 'JFIF to JPG Converter',
    slug: 'jfif-to-jpg',
    description: 'Convert JFIF images to JPG/JPEG format with high quality preservation',
    category: 'image-tools',
    icon: '🖼️',
    tags: ['jfif', 'jpg', 'jpeg', 'convert', 'format'],
    path: '/jfif-to-jpg',
    status: 'active',
    seo: generateSEO({
      name: 'JFIF to JPG Converter',
      slug: '/jfif-to-jpg',
      description: 'Convert JFIF images to JPG/JPEG format with high quality preservation',
      tags: ['jfif', 'jpg', 'jpeg', 'convert', 'format']
    }),
    posterImage: '/images/tools/jfif-to-jpg.webp'
  },

  // Base64 Tools
  {
    id: 'base64-to-image',
    name: 'Base64 to Image Converter',
    slug: 'base64-to-image',
    description: 'Convert Base64 encoded strings back to image files with Toolspy\'s secure converter',
    category: 'base64-tools',
    icon: '🖼️',
    featured: true,
    tags: ['base64', 'decode', 'image', 'convert', 'toolspy'],
    path: '/base64-to-image',
    status: 'active',
    seo: generateSEO({
      name: 'Base64 to Image Converter',
      slug: '/base64-to-image',
      description: 'Convert Base64 encoded strings back to image files with Toolspy\'s secure converter',
      tags: ['base64', 'decode', 'image', 'convert', 'toolspy']
    }),
    posterImage: '/images/tools/base64-to-image.webp'
  },
  {
    id: 'image-to-base64',
    name: 'Image to Base64 Encoder',
    slug: 'image-to-base64',
    description: 'Convert images to Base64 encoded strings for embedding with Toolspy\'s professional encoder',
    category: 'base64-tools',
    icon: '🔤',
    featured: true,
    tags: ['base64', 'encode', 'image', 'convert', 'embed', 'toolspy'],
    path: '/image-to-base64',
    status: 'active',
    seo: generateSEO({
      name: 'Image to Base64 Encoder',
      slug: '/image-to-base64',
      description: 'Convert images to Base64 encoded strings for embedding with Toolspy\'s professional encoder',
      tags: ['base64', 'encode', 'image', 'convert', 'embed', 'toolspy']
    }),
    posterImage: '/images/tools/image-to-base64.webp'
  },
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder/Decoder',
    slug: 'base64-encoder-decoder',
    description: 'Encode and decode text to/from Base64 format',
    category: 'base64-tools',
    icon: '🔐',
    tags: ['base64', 'encode', 'decode', 'text'],
    path: '/base64-encoder-decoder',
    status: 'active',
    seo: generateSEO({
      name: 'Base64 Encoder/Decoder',
      slug: '/base64-encoder-decoder',
      description: 'Encode and decode text to/from Base64 format',
      tags: ['base64', 'encode', 'decode', 'text']
    }),
    posterImage: '/images/tools/base64-encoder-decoder.webp'
  },

  // PDF Tools
  {
    id: 'pdf-converter',
    name: 'PDF Converter',
    slug: 'pdf-converter',
    description: 'Convert PDFs to various formats and vice versa',
    category: 'pdf-tools',
    icon: '📄',
    tags: ['pdf', 'convert', 'document'],
    path: '/pdf-converter',
    status: 'active',
    seo: generateSEO({
      name: 'PDF Converter',
      slug: '/pdf-converter',
      description: 'Convert PDFs to various formats and vice versa',
      tags: ['pdf', 'convert', 'document']
    }),
    posterImage: '/images/tools/pdf-converter.webp'
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    slug: 'pdf-to-word',
    description: 'Convert PDF documents to editable Word files',
    category: 'pdf-tools',
    icon: '📝',
    tags: ['pdf', 'word', 'convert', 'document'],
    path: '/pdf-to-word',
    status: 'coming-soon',
    seo: generateSEO({
      name: 'PDF to Word',
      slug: '/pdf-to-word',
      description: 'Convert PDF documents to editable Word files',
      tags: ['pdf', 'word', 'convert', 'document']
    }),
    posterImage: '/images/tools/pdf-to-word.webp'
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    slug: 'pdf-to-jpg',
    description: 'Convert PDF pages to JPG images',
    category: 'pdf-tools',
    icon: '🖼️',
    tags: ['pdf', 'jpg', 'convert', 'image'],
    path: '/pdf-to-jpg',
    status: 'coming-soon',
    seo: generateSEO({
      name: 'PDF to JPG',
      slug: '/pdf-to-jpg',
      description: 'Convert PDF pages to JPG images',
      tags: ['pdf', 'jpg', 'convert', 'image']
    }),
    posterImage: '/images/tools/pdf-to-jpg.webp'
  },
  {
    id: 'jfif-to-pdf',
    name: 'JFIF to PDF Converter',
    slug: 'jfif-to-pdf',
    description: 'Convert JFIF images to PDF documents with professional quality',
    category: 'pdf-tools',
    icon: '📄',
    tags: ['jfif', 'pdf', 'convert', 'document'],
    path: '/jfif-to-pdf',
    status: 'active',
    seo: generateSEO({
      name: 'JFIF to PDF Converter',
      slug: '/jfif-to-pdf',
      description: 'Convert JFIF images to PDF documents with professional quality',
      tags: ['jfif', 'pdf', 'convert', 'document']
    }),
    posterImage: '/images/tools/jfif-to-pdf.webp'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF Files',
    slug: 'merge-pdf',
    description: 'Combine multiple PDF files into a single document',
    category: 'pdf-tools',
    icon: '🔗',
    tags: ['pdf', 'merge', 'combine', 'document'],
    path: '/merge-pdf',
    status: 'active',
    seo: generateSEO({
      name: 'Merge PDF Files',
      slug: '/merge-pdf',
      description: 'Combine multiple PDF files into a single document',
      tags: ['pdf', 'merge', 'combine', 'document']
    }),
    posterImage: '/images/tools/merge-pdf.webp'
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image Converter',
    slug: 'pdf-to-image',
    description: 'Convert PDF pages to various image formats (PNG, JPG, WebP)',
    category: 'pdf-tools',
    icon: '🖼️',
    tags: ['pdf', 'image', 'convert', 'png', 'jpg'],
    path: '/pdf-to-image',
    status: 'active',
    seo: generateSEO({
      name: 'PDF to Image Converter',
      slug: '/pdf-to-image',
      description: 'Convert PDF pages to various image formats (PNG, JPG, WebP)',
      tags: ['pdf', 'image', 'convert', 'png', 'jpg']
    }),
    posterImage: '/images/tools/pdf-to-image.webp'
  },
  {
    id: 'compress-pdf',
    name: 'PDF Compressor',
    slug: 'compress-pdf',
    description: 'Compress PDF files to reduce file size while maintaining quality',
    category: 'pdf-tools',
    icon: '🗜️',
    tags: ['pdf', 'compress', 'reduce', 'size'],
    path: '/compress-pdf',
    status: 'active',
    seo: generateSEO({
      name: 'PDF Compressor',
      slug: '/compress-pdf',
      description: 'Compress PDF files to reduce file size while maintaining quality',
      tags: ['pdf', 'compress', 'reduce', 'size']
    }),
    posterImage: '/images/tools/compress-pdf.webp'
  },
  {
    id: 'heic-to-pdf',
    name: 'HEIC to PDF Converter',
    slug: 'heic-to-pdf',
    description: 'Convert HEIC images to PDF documents with high quality',
    category: 'pdf-tools',
    icon: '📄',
    tags: ['heic', 'pdf', 'convert', 'apple', 'iphone'],
    path: '/heic-to-pdf',
    status: 'active',
    seo: generateSEO({
      name: 'HEIC to PDF Converter',
      slug: '/heic-to-pdf',
      description: 'Convert HEIC images to PDF documents with high quality',
      tags: ['heic', 'pdf', 'convert', 'apple', 'iphone']
    }),
    posterImage: '/images/tools/heic-to-pdf.webp'
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word Converter',
    slug: 'pdf-to-word',
    description: 'Convert PDF documents to editable Word files instantly',
    category: 'pdf-tools',
    icon: '📝',
    tags: ['pdf', 'word', 'convert', 'docx', 'editable'],
    path: '/pdf-to-word',
    status: 'active',
    seo: generateSEO({
      name: 'PDF to Word Converter',
      slug: '/pdf-to-word',
      description: 'Convert PDF documents to editable Word files instantly',
      tags: ['pdf', 'word', 'convert', 'docx', 'editable']
    })
  },
  {
    id: 'split-pdf',
    name: 'Split PDF Files',
    slug: 'split-pdf',
    description: 'Split large PDF documents into smaller files by page ranges',
    category: 'pdf-tools',
    icon: '✂️',
    tags: ['pdf', 'split', 'divide', 'pages', 'separate'],
    path: '/split-pdf',
    status: 'active',
    seo: generateSEO({
      name: 'Split PDF Files',
      slug: '/split-pdf',
      description: 'Split large PDF documents into smaller files by page ranges',
      tags: ['pdf', 'split', 'divide', 'pages', 'separate']
    })
  },
  {
    id: 'pdf-password-remover',
    name: 'PDF Password Remover',
    slug: 'pdf-password-remover',
    description: 'Remove password protection from PDF files instantly',
    category: 'pdf-tools',
    icon: '🔓',
    tags: ['pdf', 'password', 'unlock', 'remove', 'decrypt'],
    path: '/pdf-password-remover',
    status: 'active',
    seo: generateSEO({
      name: 'PDF Password Remover',
      slug: '/pdf-password-remover',
      description: 'Remove password protection from PDF files instantly',
      tags: ['pdf', 'password', 'unlock', 'remove', 'decrypt']
    })
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel Converter',
    slug: 'pdf-to-excel',
    description: 'Convert PDF documents to Excel spreadsheets for data analysis',
    category: 'pdf-tools',
    icon: '📊',
    tags: ['pdf', 'excel', 'convert', 'xlsx', 'spreadsheet'],
    path: '/pdf-to-excel',
    status: 'active',
    seo: generateSEO({
      name: 'PDF to Excel Converter',
      slug: '/pdf-to-excel',
      description: 'Convert PDF documents to Excel spreadsheets for data analysis',
      tags: ['pdf', 'excel', 'convert', 'xlsx', 'spreadsheet']
    })
  },
  {
    id: 'pdf-to-csv',
    name: 'PDF to CSV Converter',
    slug: 'pdf-to-csv',
    description: 'Extract tabular data from PDF documents to CSV format',
    category: 'pdf-tools',
    icon: '📋',
    tags: ['pdf', 'csv', 'convert', 'data', 'extract'],
    path: '/pdf-to-csv',
    status: 'active',
    seo: generateSEO({
      name: 'PDF to CSV Converter',
      slug: '/pdf-to-csv',
      description: 'Extract tabular data from PDF documents to CSV format',
      tags: ['pdf', 'csv', 'convert', 'data', 'extract']
    })
  },
  {
    id: 'file-protector',
    name: 'File Protector',
    slug: 'file-protector',
    description: 'Add password protection to your files for enhanced security',
    category: 'misc-tools',
    icon: '🔒',
    tags: ['file', 'protect', 'password', 'security', 'encrypt'],
    path: '/file-protector',
    status: 'active',
    seo: generateSEO({
      name: 'File Protector',
      slug: '/file-protector',
      description: 'Add password protection to your files for enhanced security',
      tags: ['file', 'protect', 'password', 'security', 'encrypt']
    })
  },

  // Calculators
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    description: 'Calculate percentages, percentage increases, and decreases',
    category: 'calculators',
    icon: '%',
    tags: ['percentage', 'calculator', 'math'],
    path: '/percentage-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Percentage Calculator',
      slug: '/percentage-calculator',
      description: 'Calculate percentages, percentage increases, and decreases',
      tags: ['percentage', 'calculator', 'math']
    }),
    posterImage: '/images/tools/percentage-calculator.webp'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    slug: 'age-calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes',
    category: 'calculators',
    icon: '🎂',
    tags: ['age', 'calculator', 'birthday', 'years'],
    path: '/age-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Age Calculator',
      slug: '/age-calculator',
      description: 'Calculate your exact age in years, months, days, hours, and minutes',
      tags: ['age', 'calculator', 'birthday', 'years']
    }),
    posterImage: '/images/tools/age-calculator.webp'
  },
  {
    id: 'love-calculator',
    name: 'Love Calculator',
    slug: 'love-calculator',
    description: 'Calculate love compatibility percentage between two people',
    category: 'calculators',
    icon: '💕',
    tags: ['love', 'calculator', 'compatibility', 'relationship'],
    path: '/love-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Love Calculator',
      slug: '/love-calculator',
      description: 'Calculate love compatibility percentage between two people',
      tags: ['love', 'calculator', 'compatibility', 'relationship']
    }),
    posterImage: '/images/tools/love-calculator.webp'
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate Body Mass Index (BMI) and health status',
    category: 'calculators',
    icon: '⚖️',
    tags: ['bmi', 'calculator', 'health', 'weight', 'fitness'],
    path: '/bmi-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'BMI Calculator',
      slug: '/bmi-calculator',
      description: 'Calculate Body Mass Index (BMI) and health status',
      tags: ['bmi', 'calculator', 'health', 'weight', 'fitness']
    }),
    posterImage: '/images/tools/bmi-calculator.webp'
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    slug: 'loan-calculator',
    description: 'Calculate monthly loan payments, interest, and total cost',
    category: 'calculators',
    icon: '💰',
    tags: ['loan', 'calculator', 'finance', 'payment', 'interest'],
    path: '/loan-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Loan Calculator',
      slug: '/loan-calculator',
      description: 'Calculate monthly loan payments, interest, and total cost',
      tags: ['loan', 'calculator', 'finance', 'payment', 'interest']
    }),
    posterImage: '/images/tools/loan-calculator.webp'
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    slug: 'mortgage-calculator',
    description: 'Calculate mortgage payments, interest rates, and amortization',
    category: 'calculators',
    icon: '🏠',
    tags: ['mortgage', 'calculator', 'home', 'loan', 'finance'],
    path: '/mortgage-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Mortgage Calculator',
      slug: '/mortgage-calculator',
      description: 'Calculate mortgage payments, interest rates, and amortization',
      tags: ['mortgage', 'calculator', 'home', 'loan', 'finance']
    }),
    posterImage: '/images/tools/mortgage-calculator.webp'
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Calculator',
    slug: 'retirement-calculator',
    description: 'Calculate retirement savings needed and investment projections',
    category: 'calculators',
    icon: '🏖️',
    tags: ['retirement', 'calculator', 'savings', 'investment', 'finance'],
    path: '/retirement-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Retirement Calculator',
      slug: '/retirement-calculator',
      description: 'Calculate retirement savings needed and investment projections',
      tags: ['retirement', 'calculator', 'savings', 'investment', 'finance']
    }),
    posterImage: '/images/tools/retirement-calculator.webp'
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    slug: 'investment-calculator',
    description: 'Calculate compound interest and investment growth over time',
    category: 'calculators',
    icon: '📈',
    tags: ['investment', 'calculator', 'compound', 'interest', 'finance'],
    path: '/investment-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Investment Calculator',
      slug: '/investment-calculator',
      description: 'Calculate compound interest and investment growth over time',
      tags: ['investment', 'calculator', 'compound', 'interest', 'finance']
    }),
    posterImage: '/images/tools/investment-calculator.webp'
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    slug: 'tax-calculator',
    description: 'Calculate income tax, tax brackets, and take-home pay',
    category: 'calculators',
    icon: '💼',
    tags: ['tax', 'calculator', 'income', 'finance', 'salary'],
    path: '/tax-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Tax Calculator',
      slug: '/tax-calculator',
      description: 'Calculate income tax, tax brackets, and take-home pay',
      tags: ['tax', 'calculator', 'income', 'finance', 'salary']
    }),
    posterImage: '/images/tools/tax-calculator.webp'
  },
  {
    id: 'salary-calculator',
    name: 'Salary Calculator',
    slug: 'salary-calculator',
    description: 'Convert between hourly, monthly, and yearly salary rates',
    category: 'calculators',
    icon: '💵',
    tags: ['salary', 'calculator', 'wage', 'income', 'hourly'],
    path: '/salary-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Salary Calculator',
      slug: '/salary-calculator',
      description: 'Convert between hourly, monthly, and yearly salary rates',
      tags: ['salary', 'calculator', 'wage', 'income', 'hourly']
    }),
    posterImage: '/images/tools/salary-calculator.webp'
  },

  // Misc Tools (Converters)
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    slug: 'unit-converter',
    description: 'Convert between different units of measurement',
    category: 'misc-tools',
    icon: '⚖️',
    tags: ['units', 'convert', 'measurement'],
    path: '/unit-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Unit Converter',
      slug: '/unit-converter',
      description: 'Convert between different units of measurement',
      tags: ['units', 'convert', 'measurement']
    }),
    posterImage: '/images/tools/unit-converter.webp'
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    slug: 'currency-converter',
    description: 'Convert between different currencies with live exchange rates',
    category: 'misc-tools',
    icon: '💱',
    tags: ['currency', 'converter', 'exchange', 'rate', 'money'],
    path: '/currency-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Currency Converter',
      slug: '/currency-converter',
      description: 'Convert between different currencies with live exchange rates',
      tags: ['currency', 'converter', 'exchange', 'rate', 'money']
    }),
    posterImage: '/images/tools/currency-converter.webp'
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    slug: 'temperature-converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin temperatures',
    category: 'misc-tools',
    icon: '🌡️',
    tags: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin'],
    path: '/temperature-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Temperature Converter',
      slug: '/temperature-converter',
      description: 'Convert between Celsius, Fahrenheit, and Kelvin temperatures',
      tags: ['temperature', 'converter', 'celsius', 'fahrenheit', 'kelvin']
    }),
    posterImage: '/images/tools/temperature-converter.webp'
  },
  {
    id: 'length-converter',
    name: 'Length Converter',
    slug: 'length-converter',
    description: 'Convert between different units of length and distance',
    category: 'misc-tools',
    icon: '📏',
    tags: ['length', 'converter', 'distance', 'measurement', 'units'],
    path: '/length-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Length Converter',
      slug: '/length-converter',
      description: 'Convert between different units of length and distance',
      tags: ['length', 'converter', 'distance', 'measurement', 'units']
    }),
    posterImage: '/images/tools/length-converter.webp'
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    slug: 'weight-converter',
    description: 'Convert between different units of weight and mass',
    category: 'misc-tools',
    icon: '⚖️',
    tags: ['weight', 'converter', 'mass', 'measurement', 'units'],
    path: '/weight-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Weight Converter',
      slug: '/weight-converter',
      description: 'Convert between different units of weight and mass',
      tags: ['weight', 'converter', 'mass', 'measurement', 'units']
    }),
    posterImage: '/images/tools/weight-converter.webp'
  },
  {
    id: 'volume-converter',
    name: 'Volume Converter',
    slug: 'volume-converter',
    description: 'Convert between different units of volume and capacity',
    category: 'misc-tools',
    icon: '🫗',
    tags: ['volume', 'converter', 'capacity', 'measurement', 'units'],
    path: '/volume-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Volume Converter',
      slug: '/volume-converter',
      description: 'Convert between different units of volume and capacity',
      tags: ['volume', 'converter', 'capacity', 'measurement', 'units']
    }),
    posterImage: '/images/tools/volume-converter.webp'
  },
  {
    id: 'area-converter',
    name: 'Area Converter',
    slug: 'area-converter',
    description: 'Convert between different units of area and surface measurement',
    category: 'misc-tools',
    icon: '📐',
    tags: ['area', 'converter', 'surface', 'measurement', 'units'],
    path: '/area-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Area Converter',
      slug: '/area-converter',
      description: 'Convert between different units of area and surface measurement',
      tags: ['area', 'converter', 'surface', 'measurement', 'units']
    }),
    posterImage: '/images/tools/area-converter.webp'
  },

  // Additional misc tools
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Generate QR codes for text, URLs, and more',
    category: 'misc-tools',
    icon: '📱',
    tags: ['qr', 'code', 'generator'],
    path: '/qr-code-generator',
    status: 'active',
    seo: generateSEO({
      name: 'QR Code Generator',
      slug: '/qr-code-generator',
      description: 'Generate QR codes for text, URLs, and more',
      tags: ['qr', 'code', 'generator']
    }),
    posterImage: '/images/tools/qr-code-generator.webp'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    slug: 'color-picker',
    description: 'Pick colors and get hex, RGB, HSL values',
    category: 'misc-tools',
    icon: '🎨',
    tags: ['color', 'picker', 'hex', 'rgb'],
    path: '/color-picker',
    status: 'active',
    seo: generateSEO({
      name: 'Color Picker',
      slug: '/color-picker',
      description: 'Pick colors and get hex, RGB, HSL values',
      tags: ['color', 'picker', 'hex', 'rgb']
    }),
    posterImage: '/images/tools/color-picker.webp'
  },
  {
    id: 'google-indexing-api',
    name: 'Google Indexing API Tool',
    slug: 'google-indexing-api',
    description: 'Submit website URLs to Google Indexing API for faster indexing and improved search visibility',
    category: 'misc-tools',
    icon: '🔍',
    featured: true,
    tags: ['google', 'indexing', 'seo', 'search', 'api', 'submit', 'urls'],
    path: '/google-indexing-api',
    status: 'active',
    seo: generateSEO({
      name: 'Google Indexing API Tool',
      title: 'Google Indexing API Tool - Submit URLs for Fast Indexing | Toolspy',
      slug: '/google-indexing-api',
      description: 'Submit website URLs to Google Indexing API for faster indexing and improved search visibility. Bulk URL submission with service account authentication.',
      tags: ['google', 'indexing', 'seo', 'search', 'api', 'submit', 'urls', 'batch']
    }),
    posterImage: '/images/tools/google-indexing-api.webp'
  },

  // JSON Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    slug: 'json-formatter',
    description: 'Format, validate, and visualize JSON data with advanced tree view, error detection, and export options',
    category: 'json-tools',
    icon: '📋',
    featured: true,
    tags: ['json', 'formatter', 'validator', 'tree', 'beautify', 'minify', 'validate'],
    path: '/json-formatter',
    status: 'active',
    seo: generateSEO({
      name: 'JSON Formatter & Validator',
      title: 'Free Online JSON Formatter, Validator & Viewer – Beautify, Validate, Visualize JSON Instantly | Toolspy',
      slug: '/json-formatter',
      description: 'Format, validate, and visualize JSON data with our advanced online tool. Features tree view, error highlighting, minify/beautify, and secure client-side processing.',
      tags: ['json', 'formatter', 'validator', 'tree', 'beautify', 'minify', 'validate', 'jsonlint']
    }),
    posterImage: '/images/tools/json-formatter.webp'
  },
  {
    id: 'json-table-converter',
    name: 'JSON Table Converter',
    slug: 'json-table-converter',
    description: 'Convert JSON to CSV/Excel and vice versa with advanced preview, batch processing, and intelligent data mapping',
    category: 'json-tools',
    icon: '🔄',
    featured: true,
    tags: ['json', 'csv', 'excel', 'table', 'converter', 'xlsx', 'data', 'transform'],
    path: '/json-table-converter',
    status: 'active',
    seo: generateSEO({
      name: 'JSON Table Converter',
      title: 'Convert JSON to Excel, CSV, and vice versa – Fast, Free, Secure Table Converter | Toolspy',
      slug: '/json-table-converter',
      description: 'Convert JSON to CSV/Excel and table data to JSON with advanced preview, batch processing, and intelligent data mapping. Supports nested objects and custom delimiters.',
      tags: ['json', 'csv', 'excel', 'table', 'converter', 'xlsx', 'data', 'transform', 'tableconvert']
    }),
    posterImage: '/images/tools/json-table-converter.webp'
  },

  // Code Tools
  {
    id: 'code-beautifier',
    name: 'Code Beautifier & Minifier',
    slug: 'code-beautifier',
    description: 'Format, minify, and analyze JavaScript, CSS, HTML code with syntax highlighting, error detection, and AI explanations',
    category: 'code-tools',
    icon: '💻',
    featured: true,
    tags: ['code', 'beautifier', 'minifier', 'javascript', 'css', 'html', 'formatter', 'prettier'],
    path: '/code-beautifier',
    status: 'active',
    seo: generateSEO({
      name: 'Code Beautifier & Minifier',
      title: 'Free Online Code Beautifier & Minifier – Format, Minify, and Explain Code | Toolspy',
      slug: '/code-beautifier',
      description: 'Format and minify JavaScript, CSS, HTML code with advanced syntax highlighting, error detection, and AI-powered code explanations. Secure client-side processing.',
      tags: ['code', 'beautifier', 'minifier', 'javascript', 'css', 'html', 'formatter', 'prettier', 'syntax']
    }),
    posterImage: '/images/tools/code-beautifier.webp'
  },

  // AI Tools  
  {
    id: 'color-palette-generator',
    name: 'AI Color Palette Generator',
    slug: 'color-palette-generator',
    description: 'Generate beautiful color palettes with AI suggestions, accessibility checking, and professional export options',
    category: 'ai-tools',
    icon: '🎨',
    featured: true,
    tags: ['color', 'palette', 'generator', 'ai', 'accessibility', 'design', 'harmony', 'picker'],
    path: '/color-palette-generator',
    status: 'active',
    seo: generateSEO({
      name: 'AI Color Palette Generator',
      title: 'Free Color Palette Generator & Picker – AI-Powered, Accessible, Export Ready | Toolspy',
      slug: '/color-palette-generator',
      description: 'Generate stunning color palettes with AI insights, accessibility checking, and professional export options. Create harmonious colors for design, branding, and web development.',
      tags: ['color', 'palette', 'generator', 'ai', 'accessibility', 'design', 'harmony', 'picker', 'coolors']
    }),
    posterImage: '/images/tools/color-palette-generator.webp'
  },
  {
    id: 'ai-background-remover',
    name: 'AI Background Remover',
    slug: 'ai-background-remover',
    description: 'Remove image backgrounds instantly with AI. Features magic brush for touch-ups, batch processing, and professional export options',
    category: 'ai-tools',
    icon: '✂️',
    featured: true,
    tags: ['ai', 'background', 'remover', 'image', 'magic brush', 'transparent', 'png', 'photo'],
    path: '/ai-background-remover',
    status: 'active',
    seo: generateSEO({
      name: 'AI Background Remover',
      title: 'Remove Image Background Online – Free AI Background Remover | Toolspy',
      slug: '/ai-background-remover',
      description: 'Remove backgrounds from images instantly with AI. Features magic brush for touch-ups, batch processing, and professional export options. Completely private and secure.',
      tags: ['ai', 'background', 'remover', 'image', 'magic brush', 'transparent', 'png', 'photo', 'removebg']
    }),
    posterImage: '/images/tools/ai-background-remover.webp'
  },
  {
    id: 'meme-generator',
    name: 'AI Meme Generator',
    slug: 'meme-generator',
    description: 'Create viral memes with trending templates, AI caption suggestions, and professional editing tools for social media',
    category: 'ai-tools',
    icon: '😂',
    featured: true,
    tags: ['meme', 'generator', 'ai', 'captions', 'templates', 'viral', 'social media', 'humor'],
    path: '/meme-generator',
    status: 'active',
    seo: generateSEO({
      name: 'AI Meme Generator',
      title: 'Free Meme Generator – Create Memes Online with AI Captions | Toolspy',
      slug: '/meme-generator',
      description: 'Create viral memes with trending templates, AI caption suggestions, and professional editing tools. Share to social media instantly with no watermarks.',
      tags: ['meme', 'generator', 'ai', 'captions', 'templates', 'viral', 'social media', 'humor', 'imgflip']
    }),
    posterImage: '/images/tools/meme-generator.webp'
  },
  {
    id: 'ai-writing-tools',
    name: 'AI Writing Tools Suite',
    slug: 'ai-writing-tools',
    description: 'Complete AI writing toolkit: Paraphraser, Summarizer, Humanizer, and AI Detector with advanced customization options',
    category: 'ai-tools',
    icon: '✍️',
    featured: true,
    tags: ['ai', 'writing', 'paraphraser', 'summarizer', 'humanizer', 'detector', 'rewriter', 'tools'],
    path: '/ai-writing-tools',
    status: 'active',
    seo: generateSEO({
      name: 'AI Writing Tools Suite',
      title: 'Free AI Paraphraser, Summarizer & Humanizer – Improve Your Writing Instantly | Toolspy',
      slug: '/ai-writing-tools',
      description: 'Complete AI writing toolkit with paraphraser, summarizer, humanizer, and AI detector. Advanced customization options for professional, academic, and creative writing.',
      tags: ['ai', 'writing', 'paraphraser', 'summarizer', 'humanizer', 'detector', 'rewriter', 'tools', 'quillbot']
    }),
    posterImage: '/images/tools/ai-writing-tools.webp'
  },
  {
    id: 'ai-image-enhancer',
    name: 'AI Image Enhancer',
    slug: 'ai-image-enhancer',
    description: 'Enhance photos with AI: upscale resolution, unblur images, restore old photos, and colorize black & white pictures',
    category: 'ai-tools',
    icon: '⭐',
    featured: true,
    tags: ['ai', 'image', 'enhancer', 'upscale', 'unblur', 'restore', 'colorize', 'photos'],
    path: '/ai-image-enhancer',
    status: 'active',
    seo: generateSEO({
      name: 'AI Image Enhancer',
      title: 'AI Image Enhancer – Upscale, Unblur, Restore, and Colorize Photos Online | Toolspy',
      slug: '/ai-image-enhancer',
      description: 'Enhance photos with AI: upscale resolution up to 4x, remove blur, restore old photos, and colorize black & white images. Professional quality with complete privacy.',
      tags: ['ai', 'image', 'enhancer', 'upscale', 'unblur', 'restore', 'colorize', 'photos', 'topaz', 'waifu2x']
    }),
    posterImage: '/images/tools/ai-image-enhancer.webp'
  },
  {
    id: 'ai-resume-builder',
    name: 'AI Resume Builder',
    slug: 'ai-resume-builder',
    description: 'Build professional resumes with AI-powered suggestions, ATS optimization, job matching, and expert templates',
    category: 'ai-tools',
    icon: '📄',
    featured: true,
    tags: ['ai', 'resume', 'builder', 'ats', 'job', 'templates', 'career', 'cv'],
    path: '/ai-resume-builder',
    status: 'active',
    seo: generateSEO({
      name: 'AI Resume Builder',
      title: 'Free Online Resume Builder – AI-Powered, Professional Templates | Toolspy',
      slug: '/ai-resume-builder',
      description: 'Build professional resumes with AI-powered content suggestions, ATS optimization, job matching, and expert templates. Get hired faster with intelligent resume building.',
      tags: ['ai', 'resume', 'builder', 'ats', 'job', 'templates', 'career', 'cv', 'resumegenius']
    }),
    posterImage: '/images/tools/ai-resume-builder.webp'
  },
  // Social tools (specialized)
  {
    id: 'facebook-image-downloader',
    name: 'Facebook Image Downloader',
    slug: 'facebook-image-downloader',
    description: 'Download public Facebook post images in full quality. Paste a post URL and save photos instantly.',
    category: 'conversion-tools',
    icon: '📘',
    featured: true,
    tags: ['facebook', 'image', 'photo', 'download', 'social'],
    path: '/facebook-image-downloader',
    status: 'active',
    seo: generateSEO({
      name: 'Facebook Image Downloader',
      title: 'Facebook Image Downloader – Save Photos in Full Quality | Toolspy',
      slug: '/facebook-image-downloader',
      description: 'Download Facebook post images in full quality. Paste a public post URL and save photos instantly—free, fast, and secure.',
      tags: ['facebook', 'image', 'photo', 'download', 'social']
    }),
    posterImage: '/images/tools/facebook-image-downloader.webp'
  },
  {
    id: 'youtube-thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    slug: 'youtube-thumbnail-downloader',
    description: 'Get YouTube video thumbnails in max resolution (4K/HD). Enter a video link or ID and download instantly.',
    category: 'conversion-tools',
    icon: '▶️',
    tags: ['youtube', 'thumbnail', 'image', 'download', 'video id'],
    path: '/youtube-thumbnail-downloader',
    status: 'active',
    seo: generateSEO({
      name: 'YouTube Thumbnail Downloader',
      title: 'YouTube Thumbnail Downloader – MaxRes, HD, SD | Toolspy',
      slug: '/youtube-thumbnail-downloader',
      description: 'Download YouTube thumbnails in max resolution (MaxRes, HD, SD). Paste a video URL or ID and save images instantly.',
      tags: ['youtube', 'thumbnail', 'image', 'download', 'maxresdefault']
    }),
    posterImage: '/images/tools/youtube-thumbnail-downloader.webp'
  },
  {
    id: 'instagram-reels-downloader',
    name: 'Instagram Reels Downloader',
    slug: 'instagram-reels-downloader',
    description: 'Save Instagram Reels and short videos in high quality. Paste a reel URL and download fast.',
    category: 'conversion-tools',
    icon: '📺',
    tags: ['instagram', 'reels', 'shorts', 'video', 'download'],
    path: '/instagram-reels-downloader',
    status: 'active',
    seo: generateSEO({
      name: 'Instagram Reels Downloader',
      title: 'Instagram Reels Downloader – Save Reels & Short Videos | Toolspy',
      slug: '/instagram-reels-downloader',
      description: 'Download Instagram Reels and short videos in high quality. Paste a reel URL and save instantly—free and secure.',
      tags: ['instagram', 'reels', 'video', 'download']
    }),
    posterImage: '/images/tools/instagram-reels-downloader.webp'
  },
  {
    id: 'instagram-private-viewer',
    name: 'Instagram Private Viewer (DP Only)',
    slug: 'instagram-private-viewer',
    description: 'View and download public profile pictures. For private accounts, only profile DP is supported (when accessible).',
    category: 'conversion-tools',
    icon: '🔒',
    tags: ['instagram', 'profile', 'dp', 'avatar', 'download'],
    path: '/instagram-private-viewer',
    status: 'active',
    seo: generateSEO({
      name: 'Instagram Private Viewer (DP Only)',
      title: 'Instagram Profile Picture Downloader – View & Save DP | Toolspy',
      slug: '/instagram-private-viewer',
      description: 'View and download Instagram profile pictures in full size. For private accounts, only DP is supported when accessible.',
      tags: ['instagram', 'profile', 'dp', 'avatar', 'download']
    }),
    posterImage: '/images/tools/instagram-private-viewer.webp'
  },
  {
    id: 'youtube-embed-code-generator',
    name: 'YouTube Embed Code Generator',
    slug: 'youtube-embed-code-generator',
    description: 'Create responsive YouTube embed codes. Customize aspect ratio, autoplay, controls, and copy clean HTML.',
    category: 'conversion-tools',
    icon: '🧩',
    tags: ['youtube', 'embed', 'iframe', 'responsive', 'generator'],
    path: '/youtube-embed-code-generator',
    status: 'active',
    seo: generateSEO({
      name: 'YouTube Embed Code Generator',
      title: 'YouTube Embed Code Generator – Responsive Iframe | Toolspy',
      slug: '/youtube-embed-code-generator',
      description: 'Generate responsive YouTube embed code. Choose aspect ratio, autoplay, controls, and copy clean HTML in one click.',
      tags: ['youtube', 'embed', 'iframe', 'responsive', 'generator']
    }),
    posterImage: '/images/tools/youtube-embed-code-generator.webp'
  },
  {
    id: 'ocr-text-extractor',
    name: 'OCR Text Extractor',
    slug: 'ocr-text-extractor',
    description: 'Extract text from images and PDFs with advanced OCR technology. Support for 12+ languages, batch processing, and editable results',
    category: 'conversion-tools',
    icon: '📄',
    featured: true,
    tags: ['ocr', 'text', 'extraction', 'pdf', 'image', 'scanner', 'digitize', 'multilingual'],
    path: '/ocr-text-extractor',
    status: 'active',
    seo: generateSEO({
      name: 'OCR Text Extractor',
      title: 'Free OCR Text Extractor – Extract Text from Images and PDFs Online | Toolspy',
      slug: '/ocr-text-extractor',
      description: 'Extract text from images and PDFs with advanced OCR technology. Support for 12+ languages, batch processing, editable results, and complete privacy protection.',
      tags: ['ocr', 'text', 'extraction', 'pdf', 'image', 'scanner', 'digitize', 'multilingual', 'onlineocr']
    }),
    posterImage: '/images/tools/ocr-text-extractor.webp'
  },
  {
    id: 'media-converter',
    name: 'Media Converter',
    slug: 'media-converter',
    description: 'Convert videos, audio files, and archives between formats. Support for batch processing, quality presets, and advanced settings',
    category: 'conversion-tools',
    icon: '🎬',
    featured: true,
    tags: ['video', 'audio', 'converter', 'gif', 'archive', 'batch', 'mp4', 'mp3'],
    path: '/media-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Media Converter',
      title: 'Free Media Converter – Video, Audio, GIF & Archive Converter Online | Toolspy',
      slug: '/media-converter',
      description: 'Convert videos, audio files, and archives between formats with batch processing, quality presets, and advanced settings. Support for MP4, MP3, GIF, ZIP, and more.',
      tags: ['video', 'audio', 'converter', 'gif', 'archive', 'batch', 'mp4', 'mp3', 'convertio']
    }),
    posterImage: '/images/tools/media-converter.webp'
  },
  {
    id: 'ebook-converter',
    name: 'E-book Converter',
    slug: 'ebook-converter',
    description: 'Convert e-books between EPUB, MOBI, PDF, DOCX formats with professional metadata editing and cover image support',
    category: 'conversion-tools',
    icon: '📚',
    featured: true,
    tags: ['ebook', 'epub', 'mobi', 'pdf', 'kindle', 'converter', 'metadata', 'publisher'],
    path: '/ebook-converter',
    status: 'active',
    seo: generateSEO({
      name: 'E-book Converter',
      title: 'Free E-book Converter – EPUB, MOBI, PDF, DOCX Converter Online | Toolspy',
      slug: '/ebook-converter',
      description: 'Convert e-books between EPUB, MOBI, PDF, DOCX formats with professional metadata editing, cover image support, and batch processing. Perfect for authors and publishers.',
      tags: ['ebook', 'epub', 'mobi', 'pdf', 'kindle', 'converter', 'metadata', 'publisher', 'calibre']
    }),
    posterImage: '/images/tools/ebook-converter.webp'
  },
  {
    id: 'font-converter',
    name: 'Font Converter',
    slug: 'font-converter',
    description: 'Convert fonts between TTF, OTF, WOFF, WOFF2 formats with live preview, AI font pairings, and web optimization features',
    category: 'conversion-tools',
    icon: '🔤',
    featured: true,
    tags: ['font', 'ttf', 'otf', 'woff', 'converter', 'typography', 'web fonts', 'css'],
    path: '/font-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Font Converter',
      title: 'Free Font Converter – TTF, OTF, WOFF, WOFF2 Converter Online | Toolspy',
      slug: '/font-converter',
      description: 'Convert fonts between TTF, OTF, WOFF, WOFF2 formats with live preview, AI font pairings, web optimization, and automatic CSS generation.',
      tags: ['font', 'ttf', 'otf', 'woff', 'converter', 'typography', 'web fonts', 'css', 'fontforge']
    }),
    posterImage: '/images/tools/font-converter.webp'
  }
];

export function getToolsByCategory(): Record<ToolCategory, Tool[]> {
  const categorizedTools: Record<ToolCategory, Tool[]> = {
    'image-tools': [],
    'pdf-tools': [],
    'base64-tools': [],
    'calculators': [],
    'misc-tools': [],
    'json-tools': [],
    'ai-tools': [],
    'code-tools': [],
    'conversion-tools': []
  };

  tools.forEach(tool => {
    categorizedTools[tool.category].push(tool);
  });

  return categorizedTools;
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(tool => tool.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
} 