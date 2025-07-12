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
}

export type ToolCategory = 
  | 'image-tools' 
  | 'pdf-tools' 
  | 'base64-tools' 
  | 'calculators' 
  | 'misc-tools';

export const toolCategories: Record<ToolCategory, { name: string; description: string; icon: string }> = {
  'image-tools': {
    name: 'Professional Image Tools',
    description: 'Convert, compress, and optimize images with advanced algorithms',
    icon: ''
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
  }
};

export const tools: Tool[] = [
  // Image Tools
  {
    id: 'image-compressor',
    name: 'Professional Image Compressor',
    slug: 'image-compressor',
    description: 'Compress images with Toolspy\'s advanced engine to reduce file size while maintaining quality',
    category: 'image-tools',
    icon: '🗜️',
    featured: true,
    tags: ['compress', 'optimize', 'resize', 'jpeg', 'png', 'webp', 'toolspy'],
    path: '/image-compressor',
    status: 'active'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'active'
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
    status: 'active'
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
    status: 'active'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
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
    status: 'coming-soon'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    slug: 'unit-converter',
    description: 'Convert between different units of measurement',
    category: 'calculators',
    icon: '⚖️',
    tags: ['units', 'convert', 'measurement'],
    path: '/unit-converter',
    status: 'coming-soon'
  },

  // Misc Tools
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Generate QR codes for text, URLs, and more',
    category: 'misc-tools',
    icon: '📱',
    tags: ['qr', 'code', 'generator'],
    path: '/qr-code-generator',
    status: 'coming-soon'
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
    status: 'coming-soon'
  }
];

export function getToolsByCategory(): Record<ToolCategory, Tool[]> {
  const categorizedTools: Record<ToolCategory, Tool[]> = {
    'image-tools': [],
    'pdf-tools': [],
    'base64-tools': [],
    'calculators': [],
    'misc-tools': []
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