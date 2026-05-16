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
  | 'conversion-tools'
  | 'gst-tools'
  | 'exam-tools';

// Helper function to generate SEO data for tools
function generateSEO(tool: {
  name: string;
  slug: string;
  title?: string;
  description: string;
  tags: string[];
}): Tool['seo'] {
  const baseUrl = 'https://toolspy.net';
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
    ogImage: `/images/tools/${tool.slug.replace('/', '')}.webp`,
    twitterTitle: metaTitle,
    twitterDescription: metaDescription,
    twitterImage: `/images/tools/${tool.slug.replace('/', '')}.webp`
  };
}

export const toolCategories: Record<ToolCategory, { name: string; description: string; icon: string }> = {
  'image-tools': {
    name: 'Image Tools',
    description: 'Convert, compress, and optimize images with advanced algorithms',
    icon: '🖼️'
  },
  'pdf-tools': {
    name: 'PDF Tools', 
    description: 'Professional PDF manipulation and conversion tools',
    icon: '📄'
  },
  'base64-tools': {
    name: 'Base64 Tools',
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
    name: 'JSON Tools',
    description: 'Format, validate, and convert JSON data with advanced features',
    icon: '📋'
  },
  'ai-tools': {
    name: 'AI-Powered Tools',
    description: 'Intelligent tools powered by artificial intelligence',
    icon: '🤖'
  },
  'code-tools': {
    name: 'Coding Tools',
    description: 'Code formatting, minification, and development utilities',
    icon: '💻'
  },
  'conversion-tools': {
    name: 'File Conversion',
    description: 'Convert between various file formats and media types',
    icon: '🔄'
  },
  'gst-tools': {
    name: 'GST/MSME Toolkit',
    description: 'Professional GST calculators and MSME business tools',
    icon: '💰'
  },
  'exam-tools': {
    name: 'Exam Rank/Cutoff Predictors',
    description: 'JEE, NEET, and other exam rank prediction tools',
    icon: '🎓'
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
      title: 'Compress JPG, PNG & GIF Online – Shrink Photos Free | Toolspy',
      slug: '/image-compressor',
      description: "Shrink image size without wrecking quality. Works in your browser—no signup. Drop your JPG, PNG or GIF and get a smaller file in seconds.",
      tags: ['compress image', 'reduce image size', 'jpg compressor', 'png compressor', 'compress photo online', 'shrink image', 'image size reducer']
    }),
    posterImage: '/images/tools/image-compressor.webp'
  },
  {
    id: 'online-image-cropper',
    name: 'Online Image Cropper',
    slug: 'online-image-cropper',
    description: 'Crop images by free selection, aspect ratio, or predefined shapes like circle and polygons — runs in your browser.',
    category: 'image-tools',
    icon: '✂️',
    tags: ['crop image', 'image cropper', 'aspect ratio crop', 'circle crop', 'shape crop', 'online', 'browser'],
    path: '/online-image-cropper',
    status: 'active',
    seo: generateSEO({
      name: 'Online Image Cropper',
      title: 'Online Image Cropper – Freeform, Aspect Ratio & Shape Crop | Toolspy',
      slug: '/online-image-cropper',
      description:
        'Crop images in your browser: freeform selection, fixed aspect ratios, or shapes like circle and polygons. No upload required—download PNG/WebP/JPEG.',
      tags: [
        'online image cropper',
        'crop image online',
        'crop photo',
        'circle image cropper',
        'aspect ratio crop',
        'square crop',
        'crop png',
      ],
    }),
    posterImage: '/images/main.webp',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    slug: 'image-converter',
    description: 'Convert images between different formats (PNG, JPG, WebP, SVG, etc.)',
    category: 'image-tools',
    icon: '🔄',
    featured: true,
    tags: ['convert', 'format', 'png', 'jpg', 'webp', 'avif', 'heic', 'batch', 'privacy', 'free', 'online', 'image converter', 'convert images', 'image format converter'],
    path: '/image-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Image Converter',
      title: 'Convert Image Format Online – JPG, PNG, WebP, HEIC | Toolspy',
      slug: '/image-converter',
      description: "Need a different format? Turn JPG into PNG, HEIC into JPG, WebP into PNG—15+ formats. Batch convert if you've got loads. No account needed.",
      tags: ['image converter', 'convert jpg to png', 'convert png to jpg', 'heic to jpg', 'webp to png', 'change image format', 'convert image online', 'batch image converter']
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
      title: 'Resize Image Online – Set Width, Height or % | Toolspy',
      slug: '/image-resizer',
      description: "Make your photo bigger or smaller. Pick exact pixels or scale by percentage. Handy for profiles, print, or fitting a layout.",
      tags: ['resize image', 'resize photo online', 'change image size', 'image dimensions', 'scale image', 'resize picture']
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
      title: 'Optimize Images for Web – Faster Loading | Toolspy',
      slug: '/image-optimizer',
      description: "Trim the fat off your images so pages load quicker. Same look, smaller file. Great for websites and emails.",
      tags: ['optimize image', 'image optimizer', 'optimize photo for web', 'reduce image file size', 'faster loading images']
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
      title: 'JFIF to JPG Converter – Turn JFIF Into JPG Free | Toolspy',
      slug: '/jfif-to-jpg',
      description: "Got a .jfif file? Convert it to standard JPG so any device or app can open it. Keeps the quality, no fuss.",
      tags: ['jfif to jpg', 'convert jfif to jpeg', 'jfif converter', 'jfif to jpeg online', 'change jfif to jpg']
    }),
    posterImage: '/images/tools/jfif-jpg-convert.webp'
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
      title: 'Base64 to Image – Decode Base64 String to Picture | Toolspy',
      slug: '/base64-to-image',
      description: "Paste a Base64 string and get your image back. No uploads—everything runs in the browser. Handy for devs and data URLs.",
      tags: ['base64 to image', 'decode base64 to image', 'base64 decoder image', 'convert base64 to picture', 'base64 to jpg']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/base64_to_image_jl5bex.webp'
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
      title: 'Image to Base64 – Encode Photo to Base64 String | Toolspy',
      slug: '/image-to-base64',
      description: "Turn any image into a Base64 string. Use it in HTML, CSS, or APIs. Runs locally so your files never leave your machine.",
      tags: ['image to base64', 'encode image to base64', 'photo to base64', 'base64 encode image', 'image base64 converter']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/image_to_base64_g9bxxs.webp'
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
      title: 'Base64 Encode Decode – Text to Base64 & Back | Toolspy',
      slug: '/base64-encoder-decoder',
      description: "Encode text to Base64 or decode it back to plain text. Simple box in, box out. No account, no limits.",
      tags: ['base64 encode', 'base64 decode', 'base64 encoder decoder', 'encode to base64', 'decode base64 text']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/base64_encode_decode_fipglx.webp'
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
      title: 'PDF Converter Online – Convert PDF to Any Format | Toolspy',
      slug: '/pdf-converter',
      description: "Switch PDFs to other formats (or the other way round). Works in the browser—your docs stay on your side. No signup.",
      tags: ['pdf converter', 'convert pdf', 'pdf to other format', 'convert document', 'pdf conversion online']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/pdf_converter_iewyap.webp'
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
      title: 'PDF to Word Converter – Make PDF Editable in Word | Toolspy',
      slug: '/pdf-to-word',
      description: "Turn a PDF into an editable Word doc so you can change the text. Comes in handy when you only have a PDF and need to edit it.",
      tags: ['pdf to word', 'convert pdf to word', 'pdf to docx', 'pdf to doc', 'edit pdf in word']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/pdf-word_bsyilq.webp'
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
      title: 'PDF to JPG – Convert PDF Pages to Images | Toolspy',
      slug: '/pdf-to-jpg',
      description: "Grab each PDF page as a JPG. Pick one page or the whole thing. Useful for thumbnails, slides, or sharing as images.",
      tags: ['pdf to jpg', 'convert pdf to jpg', 'pdf to image', 'pdf page to jpg', 'save pdf as image']
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
      title: 'JFIF to PDF – Turn JFIF Images Into PDF | Toolspy',
      slug: '/jfif-to-pdf',
      description: "Stuck with .jfif files? Turn them into a PDF so you can share or print like a normal document. One click.",
      tags: ['jfif to pdf', 'convert jfif to pdf', 'jfif to pdf online', 'image to pdf jfif']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/jfif-pdf_i1ulbf.webp'
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
      title: 'Merge PDF Files – Combine PDFs Into One | Toolspy',
      slug: '/merge-pdf',
      description: "Got several PDFs? Stick them together in the order you want. One file at the end. No watermarks, no signup.",
      tags: ['merge pdf', 'combine pdf', 'join pdf files', 'merge pdf online', 'combine pdf files into one']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/merge-pdf_y7rcdf.webp'
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
      title: 'PDF to Image – Convert PDF to PNG, JPG, WebP | Toolspy',
      slug: '/pdf-to-image',
      description: "Turn PDF pages into images. Choose PNG, JPG or WebP. Good for screenshots, thumbnails or when you need a picture, not a doc.",
      tags: ['pdf to image', 'pdf to png', 'pdf to jpg', 'convert pdf to image', 'pdf page to image']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/pdf-image_wqc4kl.webp'
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
      title: 'Compress PDF – Shrink PDF Size Free Online | Toolspy',
      slug: '/compress-pdf',
      description: "PDF too big for email or upload? Shrink it here. You pick how much—light squeeze or max compression. Stays readable.",
      tags: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf', 'make pdf smaller']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/v1756527237/compress-pdf_cjhuif.webp'
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
      title: 'HEIC to PDF – Convert iPhone Photos to PDF | Toolspy',
      slug: '/heic-to-pdf',
      description: "iPhone shoots HEIC. Need a PDF? Drop your HEIC pics and get one PDF. Works in the browser, no app to install.",
      tags: ['heic to pdf', 'convert heic to pdf', 'iphone photo to pdf', 'heic to pdf online', 'apple photo to pdf']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/heic-pdf_mq0spy.webp'
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF Converter',
    slug: 'image-to-pdf',
    description: 'Convert JPG, PNG, WebP and other images into a single PDF online',
    category: 'pdf-tools',
    icon: '📄',
    tags: ['image', 'pdf', 'convert', 'jpg', 'png', 'merge'],
    path: '/image-to-pdf',
    status: 'active',
    seo: generateSEO({
      name: 'Image to PDF Converter',
      title: 'Image to PDF Converter – Free & Fast Online Tool | ToolSpy',
      slug: '/image-to-pdf',
      description:
        "Convert images to PDF instantly with ToolSpy's free online image to PDF converter. No sign-up needed. Merge JPG, PNG, WebP files into one polished PDF in seconds.",
      tags: [
        'image to pdf',
        'convert image to pdf',
        'jpg to pdf',
        'png to pdf',
        'merge images to pdf',
        'image to pdf converter free',
      ],
    }),
    posterImage:
      'https://res.cloudinary.com/drby9raee/image/upload/merge-pdf_y7rcdf.webp',
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
      title: 'Split PDF – Split PDF by Pages Free | Toolspy',
      slug: '/split-pdf',
      description: "Big PDF? Chop it by page range or one page per file. Handy when you only need a few pages or want separate docs.",
      tags: ['split pdf', 'split pdf by pages', 'divide pdf', 'extract pages from pdf', 'pdf splitter online']
    }),
    posterImage: "https://res.cloudinary.com/drby9raee/image/upload/split-pdf_bnuavw.webp"
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
      title: 'Remove PDF Password – Unlock PDF Free | Toolspy',
      slug: '/pdf-password-remover',
      description: "Know the PDF password? Enter it and we'll strip it so you can open the file without typing it again. Runs in browser.",
      tags: ['remove pdf password', 'unlock pdf', 'pdf password remover', 'decrypt pdf', 'unlock password protected pdf']
    }),
    posterImage: "https://res.cloudinary.com/drby9raee/image/upload/remove-pdf-password_pmlhby.webp"
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
      title: 'PDF to Excel – Convert PDF Table to Excel | Toolspy',
      slug: '/pdf-to-excel',
      description: "Tables stuck in a PDF? Pull them into Excel so you can edit, sort and crunch numbers. Good for reports and data.",
      tags: ['pdf to excel', 'convert pdf to excel', 'pdf to xlsx', 'pdf table to excel', 'extract table from pdf']
    }),
    posterImage: "https://res.cloudinary.com/drby9raee/image/upload/pdf-excel_ox2ejz.webp"
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
      title: 'PDF to CSV – Extract Table from PDF to CSV | Toolspy',
      slug: '/pdf-to-csv',
      description: "Got a table in a PDF? Get it out as CSV for spreadsheets or code. One less copy-paste headache.",
      tags: ['pdf to csv', 'convert pdf to csv', 'extract table from pdf', 'pdf table to csv', 'pdf to spreadsheet']
    }),
    posterImage: "https://res.cloudinary.com/drby9raee/image/upload/pdf-csv_yl8ljg.webp"
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
      title: 'Password Protect File – Lock Files With Password | Toolspy',
      slug: '/file-protector',
      description: "Put a password on a file so only someone with the code can open it. Handy for sensitive stuff you're sharing.",
      tags: ['password protect file', 'lock file with password', 'encrypt file', 'protect file', 'file encryption online']
    }),
    posterImage: ""
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
      title: 'Percentage Calculator – Find % of a Number | Toolspy',
      slug: '/percentage-calculator',
      description: "What's 20% of 250? Or what percent is 45 of 90? Do the math here. Increase, decrease, whatever you need.",
      tags: ['percentage calculator', 'calculate percentage', 'percent of a number', 'percentage increase', 'percentage decrease']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/percentage_calculator_le7eov.webp'
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
      title: 'Age Calculator – Exact Age in Years, Months, Days | Toolspy',
      slug: '/age-calculator',
      description: "How old are you down to the day? Or the time between two dates? Get years, months, days—even hours and minutes.",
      tags: ['age calculator', 'calculate age', 'how old am i', 'age in days', 'date difference calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/age-calculator_l8kwxt.webp'
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
      title: 'Love Calculator – Compatibility % by Names | Toolspy',
      slug: '/love-calculator',
      description: "Just for fun: type two names and get a compatibility score. Silly but popular. Share the result with your crush.",
      tags: ['love calculator', 'love compatibility', 'name compatibility', 'love percentage', 'relationship calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/love-calculator_kzzs73.webp'
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
      title: 'BMI Calculator – Check Body Mass Index Free | Toolspy',
      slug: '/bmi-calculator',
      description: "Enter height and weight, get your BMI and a rough idea of where you sit (underweight, normal, overweight). Not medical advice.",
      tags: ['bmi calculator', 'body mass index', 'calculate bmi', 'bmi chart', 'weight height calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/bmi-calculator_w5fztx.webp'
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
      title: 'Loan Calculator – Monthly Payment & Interest | Toolspy',
      slug: '/loan-calculator',
      description: "See what you'd pay each month on a loan. Plug in amount, rate and term—we'll show monthly payment and total interest.",
      tags: ['loan calculator', 'monthly payment calculator', 'loan payment', 'interest calculator', 'emi calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/loan-calculator_y1tqqv.webp'
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
      title: 'Mortgage Calculator – Home Loan Payment & Amortization | Toolspy',
      slug: '/mortgage-calculator',
      description: "Thinking of a home loan? See your monthly mortgage payment and how much goes to principal vs interest over time.",
      tags: ['mortgage calculator', 'home loan calculator', 'monthly mortgage payment', 'amortization calculator', 'house loan calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/mortgage-calculator_v7lw9c.webp'
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
      title: 'Retirement Calculator – How Much to Save | Toolspy',
      slug: '/retirement-calculator',
      description: "Rough out how much you might need for retirement and what to save each month. Ballpark numbers, not financial advice.",
      tags: ['retirement calculator', 'retirement savings', 'how much to save for retirement', 'retirement planning', '401k calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/retirement-calculator_ny8f3s.webp'
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
      title: 'Investment Calculator – Compound Interest & Growth | Toolspy',
      slug: '/investment-calculator',
      description: "See how money grows with compound interest. Put in amount, rate and years—we'll show the growth. For planning, not advice.",
      tags: ['investment calculator', 'compound interest calculator', 'investment growth', 'compound interest', 'savings growth calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Investment-calculator_dsq6hr.webp'
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
      title: 'Tax Calculator – Income Tax & Take-Home Pay | Toolspy',
      slug: '/tax-calculator',
      description: "Estimate income tax and what's left after. Enter salary and get a ballpark. Check your country's rules for exact figures.",
      tags: ['tax calculator', 'income tax calculator', 'take home pay', 'salary after tax', 'tax estimator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/tax-calculator_hsxfl3.webp'
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
      title: 'Salary Calculator – Hourly to Yearly & Vice Versa | Toolspy',
      slug: '/salary-calculator',
      description: "Hourly wage to yearly? Or yearly to hourly? Swap between them. Handy when comparing jobs or planning a side gig.",
      tags: ['salary calculator', 'hourly to yearly', 'yearly to hourly', 'wage calculator', 'salary converter']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/salary-calculator_abj5hv.webp'
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
      title: 'Unit Converter – Length, Weight, Volume & More | Toolspy',
      slug: '/unit-converter',
      description: "Need kg in pounds? Liters in gallons? One place for length, weight, volume and other units. No app needed.",
      tags: ['unit converter', 'convert units', 'measurement converter', 'kg to lbs', 'metric to imperial']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/unit_converter_ghqrmg.webp'
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
      title: 'Currency Converter – Live Exchange Rates | Toolspy',
      slug: '/currency-converter',
      description: "How much is 100 USD in euros? Or yen? Check live rates and convert. Useful before a trip or for quick ballparks.",
      tags: ['currency converter', 'exchange rate', 'convert currency', 'usd to inr', 'eur to usd']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/currency_converter_xreikv.webp'
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
      title: 'Temperature Converter – Celsius, Fahrenheit, Kelvin | Toolspy',
      slug: '/temperature-converter',
      description: "C to F? F to C? Or Kelvin? Swap between them. Cooking, weather or science—whatever you need.",
      tags: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'temp converter', 'c to f']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/temperature_converter_iesjzn.webp'
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
      title: 'Length Converter – Meters, Feet, Miles, km | Toolspy',
      slug: '/length-converter',
      description: "Meters to feet? Miles to km? Convert length and distance in one go. Handy for travel, DIY or school.",
      tags: ['length converter', 'meters to feet', 'miles to km', 'distance converter', 'feet to meters']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/JEE_Main_Rank_Predictor_nzxxbe.webp'
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
      title: 'Weight Converter – kg, lbs, oz, grams | Toolspy',
      slug: '/weight-converter',
      description: "kg to pounds? Ounces to grams? Convert weight in a snap. Cooking, luggage or gym—whatever you're measuring.",
      tags: ['weight converter', 'kg to lbs', 'pounds to kg', 'grams to ounces', 'weight conversion']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/weight_converter_k8ebov.webp'
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
      title: 'Volume Converter – Liters, Gallons, ml | Toolspy',
      slug: '/volume-converter',
      description: "Liters to gallons? ml to cups? Swap volume and capacity. Recipes, fuel or science—we've got it.",
      tags: ['volume converter', 'liters to gallons', 'ml to oz', 'volume conversion', 'gallons to liters']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/volume_converter_owmjt1.webp'
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
      title: 'Area Converter – sq ft, sq m, acres | Toolspy',
      slug: '/area-converter',
      description: "Square feet to square meters? Acres to hectares? Convert area for land, rooms or homework. Simple and quick.",
      tags: ['area converter', 'square feet to square meters', 'acres to hectares', 'area conversion', 'sq ft to sq m']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/area_converter_wbzrw9.webp'
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
      title: 'QR Code Generator – Create QR Code Free | Toolspy',
      slug: '/qr-code-generator',
      description: "Make a QR code for a link, text or contact. Paste, click, download. No signup. Use it on flyers, menus or business cards.",
      tags: ['qr code generator', 'create qr code', 'free qr code', 'qr code maker', 'generate qr code']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/QR_Code_Generator_rvcqcm.webp'
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
      title: 'Color Picker – Get Hex, RGB, HSL | Toolspy',
      slug: '/color-picker',
      description: "Click to pick a color. Get hex, RGB and HSL so you can copy into CSS, design tools or code. No install.",
      tags: ['color picker', 'hex color picker', 'rgb color picker', 'pick color', 'color code']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Color_Picker_qnftn6.webp'
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    slug: 'color-palette-generator',
    description: 'Generate beautiful color palettes with drag-and-drop reordering, lock colors, and export in multiple formats',
    category: 'misc-tools',
    icon: '🎨',
    featured: true,
    tags: ['color', 'palette', 'generator', 'design', 'hex', 'rgb', 'hsl', 'export'],
    path: '/color-palette-generator',
    status: 'active',
    seo: generateSEO({
      name: 'Color Palette Generator',
      title: 'Color Palette Generator – Create & Export Palettes | Toolspy',
      slug: '/color-palette-generator',
      description: "Build a color palette, lock the ones you like, reorder by drag. Export as CSS, SCSS, Tailwind or JSON. Handy for design and dev.",
      tags: ['color palette generator', 'create color palette', 'color scheme generator', 'palette maker', 'export color palette']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Color_Palettes_Generator_livayv.webp'
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
      title: 'Google Indexing API – Submit URLs for Faster Indexing | Toolspy',
      slug: '/google-indexing-api',
      description: "Push URLs to Google's Indexing API so new or updated pages get crawled sooner. Bulk submit with a service account. For site owners and SEO.",
      tags: ['google indexing api', 'submit url to google', 'request indexing', 'google index api', 'url indexing tool']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Google_Indexing_API_Tool_pyjog3.webp'
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
      title: 'JSON Formatter – Beautify, Validate & View JSON | Toolspy',
      slug: '/json-formatter',
      description: "Paste messy JSON and we'll pretty-print it. Or minify. Check for errors and browse in a tree. All in the browser.",
      tags: ['json formatter', 'json validator', 'beautify json', 'minify json', 'json viewer', 'validate json']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/JSON_Formatter_Validator_tk2ubr.webp'
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
      title: 'JSON to CSV / Excel – Convert JSON to Table | Toolspy',
      slug: '/json-table-converter',
      description: "Turn JSON into a spreadsheet (CSV or Excel) or the other way round. Preview first, then download. Handy for data and APIs.",
      tags: ['json to csv', 'json to excel', 'convert json to csv', 'json to spreadsheet', 'csv to json']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/JSON_Table_Converter_ydiyox.webp'
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
      title: 'Code Beautifier – Format JS, CSS, HTML | Toolspy',
      slug: '/code-beautifier',
      description: "Paste minified JS, CSS or HTML and we'll pretty-print it. Or minify the other way. Catches basic errors. No upload.",
      tags: ['code beautifier', 'javascript formatter', 'css formatter', 'html formatter', 'minify javascript', 'prettify code']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Code_Beautifier_Minifier_ncesjz.webp'
  },

  // AI Tools  
  {
    id: 'ai-color-palette-generator',
    name: 'AI Color Palette Generator',
    slug: 'ai-color-palette-generator',
    description: 'Generate beautiful color palettes with AI suggestions, accessibility checking, and professional export options',
    category: 'ai-tools',
    icon: '🎨',
    featured: true,
    tags: ['color', 'palette', 'generator', 'ai', 'accessibility', 'design', 'harmony', 'picker'],
    path: '/ai-color-palette-generator',
    status: 'active',
    seo: generateSEO({
      name: 'AI Color Palette Generator',
      title: 'AI Color Palette – Generate Palettes With AI | Toolspy',
      slug: '/ai-color-palette-generator',
      description: "Get color palettes suggested by AI. Check contrast for accessibility, then export. Good for branding, UI and design.",
      tags: ['ai color palette', 'color palette generator ai', 'generate color palette', 'color scheme ai', 'palette generator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/AI_Color_Palette_Generator_e7xt2b.webp'
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
      title: 'Remove Background from Image – AI Background Remover | Toolspy',
      slug: '/ai-background-remover',
      description: "Drop a photo, we strip the background. AI does the heavy lifting; you can touch up with a brush. Export as PNG. No signup.",
      tags: ['remove background', 'background remover', 'remove bg', 'remove image background', 'transparent background']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/AI_Background_Remover_w3pdpf.webp'
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
      title: 'Meme Generator – Create Memes With AI Captions | Toolspy',
      slug: '/meme-generator',
      description: "Pick a template, add your text or let AI suggest captions. Make memes in seconds. No watermarks. Share straight to social.",
      tags: ['meme generator', 'create meme', 'make meme', 'meme maker', 'meme template', 'ai meme']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/AI_Meme_Generator_xrlee8.webp'
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
      title: 'AI Paraphraser, Summarizer & Humanizer – Writing Tools | Toolspy',
      slug: '/ai-writing-tools',
      description: "Rephrase text, shorten it, or make it sound more human. Plus check if something looks AI-written. One place for quick writing fixes.",
      tags: ['paraphraser', 'summarizer', 'ai paraphraser', 'text humanizer', 'ai detector', 'rewrite text']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/AI_Writing_Tools_Suite_etyynu.webp'
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
      title: 'AI Image Enhancer – Upscale, Unblur & Restore Photos | Toolspy',
      slug: '/ai-image-enhancer',
      description: "Upscale a blurry or low-res photo. Unblur, restore old pics, or colorize black and white. AI does the work. Try it and see.",
      tags: ['ai image enhancer', 'upscale image', 'unblur photo', 'restore old photo', 'colorize photo', 'image upscaler']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/ai-image-enhancer_yv5fc9.png'
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
      title: 'Resume Builder – AI-Powered CV & Templates | Toolspy',
      slug: '/ai-resume-builder',
      description: "Build a resume with AI suggestions and templates. Make it ATS-friendly so it gets past the bots. Fill in your stuff and tweak from there.",
      tags: ['resume builder', 'ai resume', 'cv builder', 'resume maker', 'ats resume', 'resume template']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/AI_Resume_Builder_yy02c6.webp'
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
      title: 'Facebook Image Downloader – Facebook Photo Downloader | Toolspy',
      slug: '/facebook-image-downloader',
      description: "Paste a public Facebook post link and grab the photos in full size. No app. Works in the browser. For public posts only.",
      tags: ['facebook image downloader', 'download facebook photos', 'save facebook images', 'fb photo download']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Facebook_Image_Downloader_qgkbdy.webp'
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
      title: 'YouTube Thumbnail Downloader – Get Thumbnails in HD | Toolspy',
      slug: '/youtube-thumbnail-downloader',
      description: "Paste a YouTube link and get the thumbnail in max res (or HD/SD). Good for thumbnails, previews or saving the image.",
      tags: ['youtube thumbnail downloader', 'download youtube thumbnail', 'get youtube thumbnail', 'youtube thumbnail max resolution']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/YouTube_Thumbnail_Downloader_awcnhy.webp'
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
      title: 'Instagram Reels Downloader – Save Reels Video | Toolspy',
      slug: '/instagram-reels-downloader',
      description: "Paste a Reels link and download the video. Keeps the quality. No app—runs in the browser. For your own or public reels.",
      tags: ['instagram reels downloader', 'download instagram reels', 'save reels video', 'reels download']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Instagram_Reels_Downloader_twbraa.webp'
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
      title: 'Instagram DP Downloader – View & Save Profile Pic | Toolspy',
      slug: '/instagram-private-viewer',
      description: "See and save Instagram profile pics in full size. Works for public DPs. Private accounts—only when the DP is viewable.",
      tags: ['instagram dp downloader', 'download instagram profile picture', 'instagram profile pic', 'save instagram dp']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Instagram_Private_Viewer_DP_Only_usclpt.webp'
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
      title: 'YouTube Embed Code – Get Iframe HTML | Toolspy',
      slug: '/youtube-embed-code-generator',
      description: "Paste a YouTube URL and get the iframe code. Pick size, autoplay, controls. Copy the HTML and drop it in your site.",
      tags: ['youtube embed code', 'youtube iframe', 'embed youtube video', 'youtube embed generator', 'embed code generator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/YouTube_Embed_Code_Generator_ngrdql.webp'
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
      title: 'OCR – Extract Text from Image or PDF | Toolspy',
      slug: '/ocr-text-extractor',
      description: "Upload a scan or PDF and pull out the text. Works in 12+ languages. Edit and copy. Handy when you can't copy-paste from a doc.",
      tags: ['ocr', 'extract text from image', 'image to text', 'pdf to text', 'ocr online', 'scan to text']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/OCR_Text_Extractor_njpp5q.webp'
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
      title: 'Media Converter – Video, Audio, GIF & More | Toolspy',
      slug: '/media-converter',
      description: "Convert video, audio, GIF or archives to another format. MP4, MP3, WebM, ZIP—pick what you need. Batch if you've got multiple files.",
      tags: ['media converter', 'video converter', 'audio converter', 'convert video', 'convert mp4', 'gif converter']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Media_Converter_wgmsmn.webp'
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
      title: 'E-book Converter – EPUB, MOBI, PDF, DOCX | Toolspy',
      slug: '/ebook-converter',
      description: "Switch between EPUB, MOBI, PDF and DOCX. Tweak metadata and cover if you want. Good for Kindle, Kobo or reading on any device.",
      tags: ['ebook converter', 'epub to pdf', 'mobi to epub', 'convert epub', 'kindle converter', 'epub to mobi']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/E-book_Converter_tuf5di.webp'
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
      title: 'Font Converter – TTF, OTF, WOFF, WOFF2 | Toolspy',
      slug: '/font-converter',
      description: "Convert between TTF, OTF, WOFF and WOFF2. Preview first, then download. Handy for web fonts or when a site needs a different format.",
      tags: ['font converter', 'ttf to woff', 'otf to woff2', 'convert font', 'woff converter', 'web font converter']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Font_Converter_cf4unb.webp'
  },
  {
    id: 'instagram-engagement-calculator',
    name: 'Instagram Engagement',
    slug: 'instagram-engagement-calculator',
    description: 'Calculate Instagram engagement rate with advanced algorithms, industry benchmarks, and personalized recommendations for social media success',
    category: 'calculators',
    icon: '📊',
    featured: true,
    tags: ['instagram', 'engagement', 'calculator', 'social media', 'analytics', 'metrics', 'followers', 'likes', 'comments'],
    path: '/instagram-engagement-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Instagram Engagement Calculator',
      title: 'Instagram Engagement Rate Calculator | Toolspy',
      slug: '/instagram-engagement-calculator',
      description: "Plug in followers, likes and comments—we'll show your engagement rate. Compare with benchmarks. Useful for creators and brands.",
      tags: ['instagram engagement calculator', 'engagement rate', 'instagram engagement rate', 'calculate engagement', 'instagram analytics']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/JEE_Main_Rank_Predictor_nzxxbe.webp'
  },
  {
    id: 'facebook-engagement-calculator',
    name: 'Facebook Engagement',
    slug: 'facebook-engagement-calculator',
    description: 'Calculate Facebook engagement rate with advanced algorithms, industry benchmarks, and personalized recommendations for social media success',
    category: 'calculators',
    icon: '📊',
    featured: true,
    tags: ['facebook', 'engagement', 'calculator', 'social media', 'analytics', 'metrics', 'followers', 'likes', 'comments', 'reactions'],
    path: '/facebook-engagement-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Facebook Engagement Calculator',
      title: 'Facebook Engagement Rate Calculator | Toolspy',
      slug: '/facebook-engagement-calculator',
      description: "Enter page likes, post reach and reactions. Get your engagement rate and see how you stack up. Quick check for page admins.",
      tags: ['facebook engagement calculator', 'facebook engagement rate', 'calculate fb engagement', 'facebook analytics', 'engagement rate']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Facebook_Engagement_jqkmay.webp'
  },
  {
    id: 'twitter-engagement-calculator',
    name: 'Twitter Engagement',
    slug: 'twitter-engagement-calculator',
    description: 'Calculate Twitter engagement rate with advanced algorithms, industry benchmarks, and personalized recommendations for social media success',
    category: 'calculators',
    icon: '📊',
    featured: true,
    tags: ['twitter', 'engagement', 'calculator', 'social media', 'analytics', 'metrics', 'followers', 'likes', 'retweets', 'replies'],
    path: '/twitter-engagement-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Twitter Engagement Calculator',
      title: 'Twitter / X Engagement Rate Calculator | Toolspy',
      slug: '/twitter-engagement-calculator',
      description: "Put in followers, likes, retweets and replies. We'll show your engagement rate. Handy for X (Twitter) accounts and growth checks.",
      tags: ['twitter engagement calculator', 'x engagement rate', 'twitter engagement rate', 'calculate twitter engagement', 'x analytics']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Twitter_Engagement_ozfnc2.webp'
  },
  {
    id: 'youtube-engagement-calculator',
    name: 'YouTube Engagement',
    slug: 'youtube-engagement-calculator',
    description: 'Calculate YouTube engagement rate with advanced algorithms, industry benchmarks, and personalized recommendations for video success',
    category: 'calculators',
    icon: '📊',
    featured: true,
    tags: ['youtube', 'engagement', 'calculator', 'social media', 'analytics', 'metrics', 'subscribers', 'likes', 'comments', 'views'],
    path: '/youtube-engagement-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'YouTube Engagement Calculator',
      title: 'YouTube Engagement Rate Calculator | Toolspy',
      slug: '/youtube-engagement-calculator',
      description: "Subs, views, likes and comments in—engagement rate out. See how your channel performs. Good for creators and quick audits.",
      tags: ['youtube engagement calculator', 'youtube engagement rate', 'calculate youtube engagement', 'youtube analytics', 'video engagement']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/YouTube_Engagement_jv8cyi.webp'
  },
  {
    id: 'domain-whois-lookup',
    name: 'Domain WHOIS Lookup',
    slug: 'domain-whois-lookup',
    description: 'Get comprehensive domain registration information with our free WHOIS lookup tool. Check domain ownership, registration dates, and contact details instantly.',
    category: 'misc-tools',
    icon: '🔍',
    featured: true,
    tags: ['whois', 'domain', 'lookup', 'registration', 'ownership', 'contact', 'dns', 'registrar', 'expiration', 'domain research', 'domain checker', 'whois lookup', 'domain information'],
    path: '/domain-whois-lookup',
    status: 'active',
    seo: generateSEO({
      name: 'Domain WHOIS Lookup',
      title: 'WHOIS Lookup – Domain Info & Registration Details | Toolspy',
      slug: '/domain-whois-lookup',
      description: "Type a domain and see who owns it, when it expires, and where it's registered. Standard WHOIS data. No signup.",
      tags: ['whois lookup', 'domain lookup', 'who is domain', 'domain registration info', 'check domain', 'domain whois']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Domain_WHOIS_Lookup_hrvg4w.webp'
  },
  {
    id: 'expired-domain-finder',
    name: 'Expired Domain Finder',
    slug: 'expired-domain-finder',
    description: 'Discover valuable expired domains with our comprehensive search tool. Get instant access to domain authority scores, backlink data, and estimated values.',
    category: 'misc-tools',
    icon: '💰',
    featured: true,
    tags: ['expired domains', 'domain finder', 'domain authority', 'backlinks', 'seo', 'domain research', 'domain investment', 'domain value', 'expired domain finder', 'domain search'],
    path: '/expired-domain-finder',
    status: 'active',
    seo: generateSEO({
      name: 'Expired Domain Finder',
      title: 'Expired Domain Finder – DA, Backlinks & Value | Toolspy',
      slug: '/expired-domain-finder',
      description: "Hunt for expired domains with DA, backlinks and rough value. Handy for SEO or flipping. One search, no signup.",
      tags: ['expired domain finder', 'expired domains', 'domain authority', 'backlink checker', 'domain value', 'seo domains']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Expired_Domain_Finder_zp4g7n.webp'
  },
  {
    id: 'app-icon-generator',
    name: 'App Icon Generator',
    slug: 'app-icon-generator',
    description: 'Generate professional app icons for all platforms with Toolspy\'s advanced icon generator. Create icons for Android, iOS, Windows, macOS, Linux, and Web.',
    category: 'image-tools',
    icon: '📱',
    featured: true,
    tags: ['app icon', 'icon generator', 'android', 'ios', 'windows', 'macos', 'linux', 'web', 'mobile', 'desktop', 'pwa', 'app development'],
    path: '/app-icon-generator',
    status: 'active',
    seo: generateSEO({
      name: 'App Icon Generator',
      title: 'App Icon Generator – Android, iOS, Windows & More | Toolspy',
      slug: '/app-icon-generator',
      description: "Upload one image and get app icons for Android, iOS, Windows, macOS and web. All sizes in one go. No design app needed.",
      tags: ['app icon generator', 'create app icon', 'android icon', 'ios app icon', 'app icon maker', 'icon generator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/App_Icon_Generator_n9bapl.webp'
  },
  {
    id: 'pwa-icon-generator',
    name: 'PWA Icon Generator',
    slug: 'pwa-icon-generator',
    description: 'Generate PWA icons and manifest file for Progressive Web Apps with complete privacy protection.',
    category: 'image-tools',
    icon: '🌐',
    featured: true,
    tags: ['pwa icon', 'icon generator', 'pwa', 'progressive web app', 'manifest', 'web app', 'mobile web', 'desktop web', 'cross-platform', 'app development'],
    path: '/pwa-icon-generator',
    status: 'active',
    seo: generateSEO({
      name: 'PWA Icon Generator',
      title: 'PWA Icon Generator – Icons & Manifest | Toolspy',
      slug: '/pwa-icon-generator',
      description: "Make PWA icons and a manifest from one image. Sizes and markup ready to drop into your project. Good for installable web apps.",
      tags: ['pwa icon generator', 'pwa icons', 'progressive web app icon', 'pwa manifest', 'web app icon']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/PWA_Icon_Generator_wwsixv.webp'
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    slug: 'favicon-generator',
    description: 'Generate favicons for your website with Toolspy. Create favicons for all devices and browsers.',
    category: 'image-tools',
    icon: '🌐',
    featured: true,
    tags: ['favicon', 'icon generator', 'website', 'web app', 'browser', 'bookmark', 'html', 'seo', 'web development', 'cross-platform'],
    path: '/favicon-generator',
    status: 'active',
    seo: generateSEO({
      name: 'Favicon Generator',
      title: 'Favicon Generator – Create Favicon for Website | Toolspy',
      slug: '/favicon-generator',
      description: "Turn an image into a favicon. Get the right sizes for tabs and bookmarks. Copy the HTML and you're done.",
      tags: ['favicon generator', 'create favicon', 'favicon maker', 'website favicon', 'favicon.ico']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Favicon_Generator_gykh4v.webp'
  },
  {
    id: 'image-to-ico-converter',
    name: 'Image to ICO Converter',
    slug: 'image-to-ico-converter',
    description: 'Convert images to ICO format with Toolspy\'s advanced converter. Create ICO files for Windows applications and web.',
    category: 'image-tools',
    icon: '📁',
    featured: true,
    tags: ['image to ico', 'ico converter', 'windows', 'desktop', 'icon', 'converter', 'format', 'web app', 'cross-platform', 'app development'],
    path: '/image-to-ico-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Image to ICO Converter',
      title: 'Image to ICO – Convert to ICO Format | Toolspy',
      slug: '/image-to-ico-converter',
      description: "Need a .ico file for Windows or a shortcut? Drop an image and get ICO. Handy for app icons and bookmarks.",
      tags: ['image to ico', 'convert to ico', 'ico converter', 'create ico file', 'png to ico']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Image_to_ICO_Converter_kisnbo.webp'
  },
  {
    id: 'markdown-to-docs-converter',
    name: 'Markdown to Docs Converter',
    slug: 'markdown-to-docs-converter',
    description: 'Convert Markdown to documents with Toolspy\'s advanced converter. Create HTML, PDF, Word, and plain text documents.',
    category: 'conversion-tools',
    icon: '📄',
    featured: true,
    tags: ['markdown to docs', 'document converter', 'html', 'pdf', 'word', 'plain text', 'markdown', 'converter', 'documentation', 'web development'],
    path: '/markdown-to-docs-converter',
    status: 'active',
    seo: generateSEO({
      name: 'Markdown to Docs Converter',
      title: 'Markdown to Docs – HTML, PDF, Word | Toolspy',
      slug: '/markdown-to-docs-converter',
      description: "Paste Markdown and export as HTML, PDF or Word. Good for docs, readmes or turning notes into something shareable.",
      tags: ['markdown to pdf', 'markdown to html', 'markdown to word', 'convert markdown', 'markdown converter']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Markdown_to_Docs_Converter_zcirrd.webp'
  },

  // GST Tools
  {
    id: 'gst-calculator',
    name: 'GST Calculator',
    slug: 'gst-calculator',
    description: 'Calculate GST (Goods and Services Tax) with inclusive and exclusive modes. Support for all GST rates (0%, 5%, 12%, 18%, 28%)',
    category: 'gst-tools',
    icon: '🧮',
    featured: true,
    tags: ['gst', 'calculator', 'tax', 'india', 'business', 'invoice', 'gst calculator', 'gst calculator online', 'gst calculator free', 'calculate gst'],
    path: '/gst-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'GST Calculator',
      title: 'GST Calculator – India GST Rates 0% to 28% | Toolspy',
      slug: '/gst-calculator',
      description: "Add or remove GST. Pick inclusive or exclusive. All India rates (0%, 5%, 12%, 18%, 28%). Quick for invoices and quotes.",
      tags: ['gst calculator', 'gst calculator india', 'calculate gst', 'gst inclusive', 'gst exclusive', 'india gst']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/GST_Calculator_w0upju.webp'
  },
  {
    id: 'reverse-gst-calculator',
    name: 'Reverse GST Calculator',
    slug: 'reverse-gst-calculator',
    description: 'Calculate base amount and GST component from total amount. Perfect for invoice analysis and tax breakdown with all GST rates',
    category: 'gst-tools',
    icon: '🔄',
    featured: true,
    tags: ['reverse gst', 'calculator', 'tax', 'india', 'business', 'invoice analysis', 'reverse gst calculator', 'gst breakdown', 'tax breakdown'],
    path: '/reverse-gst-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Reverse GST Calculator',
      title: 'Reverse GST Calculator – Base Amount From Total | Toolspy',
      slug: '/reverse-gst-calculator',
      description: "You've got a total with GST—we'll split it into base and tax. Handy for invoices and checking what the base was.",
      tags: ['reverse gst calculator', 'gst from total', 'gst breakdown', 'base amount from gst', 'reverse gst india']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Reverse_GST_Calculator_k4b3fw.webp'
  },
  {
    id: 'hsn-sac-finder',
    name: 'HSN/SAC Code Finder',
    slug: 'hsn-sac-finder',
    description: 'Find HSN (Harmonized System of Nomenclature) and SAC (Services Accounting Code) codes with GST rates. Quick search with auto-suggest and reference links',
    category: 'gst-tools',
    icon: '🔍',
    featured: true,
    tags: ['hsn', 'sac', 'code', 'finder', 'gst', 'india', 'business', 'hsn code finder', 'sac code finder', 'find hsn code'],
    path: '/hsn-sac-finder',
    status: 'active',
    seo: generateSEO({
      name: 'HSN/SAC Code Finder',
      title: 'HSN / SAC Code Finder – GST Rates India | Toolspy',
      slug: '/hsn-sac-finder',
      description: "Look up HSN or SAC codes and see the GST rate. Type a keyword and get the code. Handy for invoices and returns.",
      tags: ['hsn code finder', 'sac code finder', 'hsn code list', 'sac code gst', 'gst hsn code', 'india gst code']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/HSNSAC_Code_Finder_jtxd92.webp'
  },
  {
    id: 'cgst-sgst-igst-splitter',
    name: 'CGST/SGST/IGST Splitter',
    slug: 'cgst-sgst-igst-splitter',
    description: 'Auto-split GST into CGST, SGST, and IGST based on intra-state vs inter-state transactions. Perfect for understanding GST distribution across states',
    category: 'gst-tools',
    icon: '✂️',
    featured: true,
    tags: ['cgst', 'sgst', 'igst', 'splitter', 'gst', 'india', 'business', 'cgst sgst calculator', 'igst calculator', 'gst splitter'],
    path: '/cgst-sgst-igst-splitter',
    status: 'active',
    seo: generateSEO({
      name: 'CGST/SGST/IGST Splitter',
      title: 'CGST SGST IGST Splitter – Intra vs Inter State | Toolspy',
      slug: '/cgst-sgst-igst-splitter',
      description: "Same state or different? We'll split GST into CGST+SGST or IGST. Enter amount and state—get the breakdown.",
      tags: ['cgst sgst igst', 'gst splitter', 'intra state gst', 'inter state gst', 'cgst sgst calculator', 'igst calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/CGSTSGSTIGST_Splitter_asvwyh.webp'
  },
  {
    id: 'itc-calculator',
    name: 'Input Tax Credit (ITC) Calculator',
    slug: 'itc-calculator',
    description: 'Track claimable credits vs blocked credits with professional ITC calculator. Perfect for understanding ITC eligibility and compliance',
    category: 'gst-tools',
    icon: '💳',
    featured: true,
    tags: ['itc', 'calculator', 'input tax credit', 'gst', 'india', 'business', 'itc calculator', 'blocked itc', 'claimable itc'],
    path: '/itc-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Input Tax Credit (ITC) Calculator',
      title: 'ITC Calculator – Input Tax Credit GST | Toolspy',
      slug: '/itc-calculator',
      description: "See what's claimable vs blocked for ITC. Enter your numbers and get a clear split. For planning, not official advice.",
      tags: ['itc calculator', 'input tax credit', 'gst itc', 'claimable itc', 'blocked itc', 'gst credit']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Input_Tax_Credit_ITC_Calculator_nyikwu.webp'
  },
  {
    id: 'e-invoice-qr-validator',
    name: 'E-Invoice/QR Code Validator',
    slug: 'e-invoice-qr-validator',
    description: 'Upload/scan E-Invoice QR codes to validate invoice status and extract information. Perfect for invoice verification and compliance checking',
    category: 'gst-tools',
    icon: '📱',
    featured: true,
    tags: ['e-invoice', 'qr code', 'validator', 'gst', 'india', 'business', 'qr validator', 'invoice validator', 'qr scanner'],
    path: '/e-invoice-qr-validator',
    status: 'active',
    seo: generateSEO({
      name: 'E-Invoice/QR Code Validator',
      title: 'E-Invoice QR Validator – Check & Extract Data | Toolspy',
      slug: '/e-invoice-qr-validator',
      description: "Upload or scan an e-invoice QR and we'll validate it and pull out the details. Good for checking invoices and compliance.",
      tags: ['e-invoice validator', 'e-invoice qr', 'gst qr validator', 'invoice qr scanner', 'e-invoice check']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/E-InvoiceQR_Code_Validator_ftaihz.webp'
  },
  {
    id: 'composition-regular-scheme-estimator',
    name: 'Composition vs Regular Scheme Estimator',
    slug: 'composition-regular-scheme-estimator',
    description: 'Compare tax liability under Composition and Regular GST schemes. Perfect for choosing the optimal scheme for your business',
    category: 'gst-tools',
    icon: '⚖️',
    featured: true,
    tags: ['composition', 'regular', 'scheme', 'gst', 'india', 'business', 'scheme comparison', 'composition vs regular', 'gst scheme calculator'],
    path: '/composition-regular-scheme-estimator',
    status: 'active',
    seo: generateSEO({
      name: 'Composition vs Regular Scheme Estimator',
      title: 'Composition vs Regular GST – Compare Schemes | Toolspy',
      slug: '/composition-regular-scheme-estimator',
      description: "See how much tax you'd pay under Composition vs Regular. Enter turnover and we'll show both. Helps you choose.",
      tags: ['composition scheme', 'regular gst', 'composition vs regular', 'gst scheme comparison', 'composition scheme calculator']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Composition_vs_Regular_Scheme_Estimator_zbdo04.webp'
  },
  {
    id: 'penalty-late-fee-calculator',
    name: 'Penalty/Late Fee Calculator',
    slug: 'penalty-late-fee-calculator',
    description: 'Auto-calculate GSTR filing late fees and interest with professional calculator. Perfect for understanding penalty implications and compliance planning',
    category: 'gst-tools',
    icon: '⚠️',
    featured: true,
    tags: ['penalty', 'late fee', 'calculator', 'gst', 'india', 'business', 'penalty calculator', 'late fee calculator', 'gstr penalty'],
    path: '/penalty-late-fee-calculator',
    status: 'active',
    seo: generateSEO({
      name: 'Penalty/Late Fee Calculator',
      title: 'GSTR Late Fee & Penalty Calculator | Toolspy',
      slug: '/penalty-late-fee-calculator',
      description: "Filed GSTR late? See what late fee and interest might apply. Enter details and get a ballpark. Check official rules for exact amounts.",
      tags: ['gstr late fee', 'gst penalty calculator', 'gstr penalty', 'late fee calculator gst', 'gst late filing fee']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/PenaltyLate_Fee_Calculator_ximfqw.webp'
  },
  {
    id: 'jee-main-rank-predictor',
    name: 'JEE Main Rank Predictor',
    slug: 'jee-main-rank-predictor',
    description: 'Predict your JEE Main rank and college options based on percentile. Perfect for understanding admission chances and planning your engineering journey',
    category: 'exam-tools',
    icon: '🎓',
    featured: true,
    tags: ['jee main', 'rank predictor', 'college predictor', 'engineering', 'admission', 'jee rank predictor', 'jee main rank calculator', 'jee college predictor'],
    path: '/jee-main-rank-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'JEE Main Rank Predictor',
      title: 'JEE Main Rank Predictor – Rank & College Options | Toolspy',
      slug: '/jee-main-rank-predictor',
      description: "Enter your JEE Main percentile and get a rough rank and college list. Ballpark only—use official counselling for final choices.",
      tags: ['jee main rank predictor', 'jee rank predictor', 'jee main rank calculator', 'jee college predictor', 'predict jee main rank']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/JEE_Main_Rank_Predictor_nzxxbe.webp'
  },
  {
    id: 'neet-rank-predictor',
    name: 'NEET Rank Predictor',
    slug: 'neet-rank-predictor',
    description: 'Predict your NEET rank and medical college options based on score. Perfect for understanding admission chances and planning your medical journey',
    category: 'exam-tools',
    icon: '🏥',
    featured: true,
    tags: ['neet', 'rank predictor', 'medical college', 'admission', 'medical', 'neet rank predictor', 'neet rank calculator', 'neet college predictor'],
    path: '/neet-rank-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'NEET Rank Predictor',
      title: 'NEET Rank Predictor – Rank & Medical College | Toolspy',
      slug: '/neet-rank-predictor',
      description: "Put in your NEET score and see a rough rank and college options. For planning only—check official counselling for final list.",
      tags: ['neet rank predictor', 'neet rank calculator', 'neet college predictor', 'predict neet rank', 'neet rank estimate']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/NEET_Rank_Predictor_tffgq8.webp'
  },
  {
    id: 'jee-advanced-rank-predictor',
    name: 'JEE Advanced Rank Predictor',
    slug: 'jee-advanced-rank-predictor',
    description: 'Predict your JEE Advanced rank and IIT options based on score. Perfect for understanding admission chances and planning your IIT journey',
    category: 'exam-tools',
    icon: '⭐',
    featured: true,
    tags: ['jee advanced', 'rank predictor', 'iit predictor', 'engineering', 'admission', 'jee advanced rank predictor', 'jee advanced rank calculator', 'iit predictor'],
    path: '/jee-advanced-rank-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'JEE Advanced Rank Predictor',
      title: 'JEE Advanced Rank Predictor – IIT Options | Toolspy',
      slug: '/jee-advanced-rank-predictor',
      description: "Enter your JEE Advanced score and get a rough rank and IIT/branch options. Estimate only—official counselling has the final say.",
      tags: ['jee advanced rank predictor', 'jee advanced rank calculator', 'iit predictor', 'jee advanced rank', 'predict jee advanced']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/JEE_Advanced_Rank_Predictor_mkthwo.webp'
  },
  {
    id: 'gate-rank-predictor',
    name: 'GATE Rank Predictor',
    slug: 'gate-rank-predictor',
    description: 'Predict your GATE rank and college options based on score and subject. Perfect for understanding admission chances and planning your postgraduate journey',
    category: 'exam-tools',
    icon: '📚',
    featured: true,
    tags: ['gate', 'rank predictor', 'college predictor', 'postgraduate', 'admission', 'gate rank predictor', 'gate rank calculator', 'gate college predictor'],
    path: '/gate-rank-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'GATE Rank Predictor',
      title: 'GATE Rank Predictor – Rank & College Options | Toolspy',
      slug: '/gate-rank-predictor',
      description: "Score and subject in—we'll show a rough GATE rank and college list. Use it to plan; check official counselling for final results.",
      tags: ['gate rank predictor', 'gate rank calculator', 'gate college predictor', 'predict gate rank', 'gate rank estimate']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/GATE_Rank_Predictor_wh8ssa.webp'
  },
  {
    id: 'cat-percentile-predictor',
    name: 'CAT Percentile Predictor',
    slug: 'cat-percentile-predictor',
    description: 'Predict your CAT percentile and MBA college options based on sectional scores. Perfect for understanding admission chances and planning your MBA journey',
    category: 'exam-tools',
    icon: '📊',
    featured: true,
    tags: ['cat', 'percentile predictor', 'mba predictor', 'college predictor', 'admission', 'cat percentile predictor', 'cat percentile calculator', 'mba college predictor', 'predict cat percentile'],
    path: '/cat-percentile-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'CAT Percentile Predictor',
      title: 'CAT Percentile Predictor – MBA College Options | Toolspy',
      slug: '/cat-percentile-predictor',
      description: "Enter your CAT sectional scores and get a rough percentile and MBA college list. Ballpark for planning—official results vary.",
      tags: ['cat percentile predictor', 'cat percentile calculator', 'mba college predictor', 'predict cat percentile', 'cat rank predictor']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/CAT_Percentile_Predictor_rf9oba.webp'
  },
  {
    id: 'upsc-rank-predictor',
    name: 'UPSC Rank Predictor',
    slug: 'upsc-rank-predictor',
    description: 'Predict your UPSC rank and civil service options based on exam scores. Perfect for understanding service allocation and planning your civil service career',
    category: 'exam-tools',
    icon: '🏛️',
    featured: true,
    tags: ['upsc', 'rank predictor', 'civil service predictor', 'service predictor', 'admission', 'upsc rank predictor', 'upsc rank calculator', 'civil service predictor', 'predict upsc rank'],
    path: '/upsc-rank-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'UPSC Rank Predictor',
      title: 'UPSC Rank Predictor – Civil Service Options | Toolspy',
      slug: '/upsc-rank-predictor',
      description: "Put in your UPSC marks and see a rough rank and service options. Estimate only—final allocation is from the official list.",
      tags: ['upsc rank predictor', 'upsc rank calculator', 'civil service predictor', 'predict upsc rank', 'upsc rank estimate']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/UPSC_Rank_Predictor_u1gsli.webp'
  },
  {
    id: 'ssc-cgl-rank-predictor',
    name: 'SSC CGL Rank Predictor',
    slug: 'ssc-cgl-rank-predictor',
    description: 'Predict your SSC CGL rank and government job options based on exam scores. Perfect for understanding post allocation and planning your government career',
    category: 'exam-tools',
    icon: '🏢',
    featured: true,
    tags: ['ssc cgl', 'rank predictor', 'government job predictor', 'post predictor', 'admission', 'ssc cgl rank predictor', 'ssc cgl rank calculator', 'government job predictor', 'predict ssc cgl rank'],
    path: '/ssc-cgl-rank-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'SSC CGL Rank Predictor',
      title: 'SSC CGL Rank Predictor – Govt Job Options | Toolspy',
      slug: '/ssc-cgl-rank-predictor',
      description: "Enter your SSC CGL score and get a rough rank and post options. For planning—final posting is as per official merit list.",
      tags: ['ssc cgl rank predictor', 'ssc cgl rank calculator', 'ssc cgl post predictor', 'predict ssc cgl rank', 'government job predictor']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/SSC_CGL_Rank_Predictor_pk42ur.webp'
  },
  {
    id: 'bank-po-rank-predictor',
    name: 'Bank PO Rank Predictor',
    slug: 'bank-po-rank-predictor',
    description: 'Predict your Bank PO rank and banking job options based on exam scores. Perfect for understanding bank allocation and planning your banking career',
    category: 'exam-tools',
    icon: '🏦',
    featured: true,
    tags: ['bank po', 'rank predictor', 'banking job predictor', 'bank predictor', 'admission', 'bank po rank predictor', 'bank po rank calculator', 'banking job predictor', 'predict bank po rank'],
    path: '/bank-po-rank-predictor',
    status: 'active',
    seo: generateSEO({
      name: 'Bank PO Rank Predictor',
      title: 'Bank PO Rank Predictor – Banking Job Options | Toolspy',
      slug: '/bank-po-rank-predictor',
      description: "Score in—we'll show a rough Bank PO rank and bank options. Estimate for planning; final allotment is from the exam body.",
      tags: ['bank po rank predictor', 'bank po rank calculator', 'bank po predictor', 'predict bank po rank', 'banking exam rank']
    }),
    posterImage: 'https://res.cloudinary.com/drby9raee/image/upload/Bank_PO_Rank_Predictor_hhbtek.webp'
  },
  {
    id: 'website-screenshot',
    name: 'Website Screenshot',
    slug: 'website-screenshot',
    description: 'Capture high-quality screenshots of any website in different formats and sizes. Full-page capture, multiple device presets, and instant downloads',
    category: 'misc-tools',
    icon: '📸',
    featured: true,
    tags: ['take screenshots of website', 'website screenshot', 'snapshot a webpage', 'full page screenshot url', 'website screen shot', 'snapshot site', 'web screenshot', 'screenshot website', 'website screenshot tool', 'free website screenshot', 'online screenshot', 'capture website', 'screenshot tool'],
    path: '/website-screenshot',
    status: 'active',
    seo: generateSEO({
      name: 'Website Screenshot',
      title: 'Website Screenshot – Full Page & Device Presets | Toolspy',
      slug: '/website-screenshot',
      description: "Paste a URL and grab a screenshot. Full page or viewport. Pick device size (desktop, tablet, phone). PNG, JPEG or WebP. No install.",
      tags: ['website screenshot', 'screenshot website', 'full page screenshot', 'capture webpage', 'web screenshot tool', 'url to screenshot']
    }),
    posterImage: '/images/tools/website-screenshot.webp'
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
    'conversion-tools': [],
    'gst-tools': [],
    'exam-tools': []
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