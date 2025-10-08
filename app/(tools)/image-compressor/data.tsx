// FAQ and testimonial data for image-compressor tool
export interface IFaq {
  id: number;
  question: string;
  answer: string;
}

export interface ITestimonial {
  id: number;
  name: string;
  rating: number;
  desc: string;
  role?: string;
  company?: string;
}

// FAQ data for image compressor
export const faq_data: IFaq[] = [
  {
    id: 1,
    question: "What image formats does the image compressor support?",
    answer: "Our image compressor supports all major formats including JPEG, PNG, WebP, AVIF, and more. You can compress images while maintaining quality or convert between different formats for optimal web performance.",
  },
  {
    id: 2,
    question: "How much can I reduce image file sizes?",
    answer: "File size reduction depends on the original image and settings. Typically, you can achieve 30-80% size reduction while maintaining good visual quality. Our advanced algorithms ensure minimal quality loss during compression.",
  },
  {
    id: 3,
    question: "Is my image data secure and private?",
    answer: "Yes, absolutely! All image processing happens locally in your browser. We don't store, upload, or collect any of your images or personal data. Your privacy is our top priority.",
  },
  {
    id: 4,
    question: "Can I compress multiple images at once?",
    answer: "Yes! You can upload and compress up to 100 images simultaneously. The tool supports batch processing with individual compression settings for each image, and you can download all compressed images as a ZIP file.",
  },
  {
    id: 5,
    question: "What compression presets are available?",
    answer: "We offer four optimized presets: Balanced (good quality + reasonable size), High Quality (best quality, larger size), Max Compression (smallest size, lower quality), and Web Optimized (perfect for websites and web apps).",
  },
  {
    id: 6,
    question: "Can I resize images while compressing?",
    answer: "Yes! The tool includes advanced resize options where you can specify width, height, or both. You can maintain aspect ratio automatically or set custom dimensions for your specific needs.",
  },
  {
    id: 7,
    question: "What is EXIF metadata and should I remove it?",
    answer: "EXIF metadata contains information like camera settings, location data, and timestamps. We offer three options: Remove All (for maximum privacy), Preserve All (keep original data), or Selective (remove only sensitive data while keeping useful information).",
  },
  {
    id: 8,
    question: "How does the target file size feature work?",
    answer: "You can set a target file size in KB, and our algorithm will automatically adjust compression settings to achieve that size while maintaining the best possible quality. This is perfect for meeting specific file size requirements.",
  },
];

// Testimonials for image compressor
export const testimonial: ITestimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    rating: 5,
    desc: "This image compressor is a game-changer! I reduced my website's image sizes by 70% without any noticeable quality loss. The batch processing feature saved me hours of work.",
    role: "Web Developer",
    company: "TechStart Inc."
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    rating: 5,
    desc: "Perfect for my e-commerce store. The Web Optimized preset gives me exactly what I need for fast-loading product images. Customer satisfaction has improved significantly.",
    role: "E-commerce Manager",
    company: "ShopFast"
  },
  {
    id: 3,
    name: "Emily Watson",
    rating: 5,
    desc: "As a photographer, I was skeptical about online compression tools. But this one maintains excellent quality while dramatically reducing file sizes. The privacy-first approach is exactly what I needed.",
    role: "Professional Photographer",
    company: "Watson Photography"
  },
  {
    id: 4,
    name: "David Kim",
    rating: 5,
    desc: "The advanced settings are incredible. Being able to set target file sizes and remove EXIF data selectively gives me complete control. This tool has become essential for my workflow.",
    role: "Digital Marketing Specialist",
    company: "GrowthLab"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    rating: 5,
    desc: "I love how fast and reliable this compressor is. Processing 50+ images takes just minutes, and the ZIP download feature makes it so convenient. Highly recommended!",
    role: "Content Creator",
    company: "Creative Studio"
  },
  {
    id: 6,
    name: "James Wilson",
    rating: 5,
    desc: "The compression presets are spot-on. I use different ones for different purposes - High Quality for print materials and Web Optimized for online use. Saves me so much time!",
    role: "Graphic Designer",
    company: "Design Pro"
  }
];
