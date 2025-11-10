// Server-side FAQ loader for image-compressor
// This ensures FAQ registration happens before schema generation
// Import the FAQ function directly to trigger registration
import { registerToolFAQ } from '@/components/seo/faq-types'

// FAQ data for image-compressor
const imageCompressorFAQs = [
  {
    question: "Is Toolspy's image compressor completely free to use?",
    answer:
      "Yes, our professional image compressor is completely free with no hidden costs, registration requirements, or usage limitations. You can compress unlimited images without any restrictions. Unlike many competitors who have limited features or require paid subscriptions, Toolspy provides all image compression capabilities free of charge.",
  },
  {
    question: "How fast is the image compression?",
    answer:
      "Our image compressor provides fast processing for any image type. Since all processing happens in your browser, there are no server delays or upload times. You can compress multiple images quickly, making it perfect for batch processing and real-time needs.",
  },
  {
    question: "How secure is the image compression process?",
    answer:
      "Absolutely secure! Our image compressor uses client-side processing, meaning your data is processed directly in your browser and never uploaded to our servers. This ensures complete privacy and security. Your information never leaves your device, making it safer than server-based compressors.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Our compressor supports all major image formats including JPG, PNG, GIF, WebP, and other formats. We also support high-quality compression and can handle various image requirements with proper analysis.",
  },
  {
    question: "Can I customize the compression options?",
    answer:
      "Yes! Our image compressor excels at customization. You can choose compression types, set quality preferences, configure compression options, and adjust compression parameters. This is perfect for meeting specific compression requirements and quality standards.",
  },
  {
    question: "Why choose Toolspy over other free image compressors like TinyPNG or ImageCompressor?",
    answer:
      "Toolspy offers professional-grade features like client-side processing for privacy, complete privacy protection, high-quality compression, and multiple format options. Many competitors like TinyPNG and ImageCompressor use server-based methods, have limited quality, or lack comprehensive features. Our tool provides better privacy protection, more options, and superior functionality completely free.",
  },
  {
    question: "Can I compress images for different project needs?",
    answer:
      "Absolutely! Our image compressor handles different project needs perfectly. You can compress images for file size reduction, web optimization, quality control, and any other compression requirement. The tool supports all standard compression scenarios.",
  },
  {
    question: "What compression options are available?",
    answer:
      "Our tool provides multiple compression formats including high-quality images, multiple quality options, and various customization features. All compression includes professional formatting, making it easy to use the results in your projects.",
  },
  {
    question: "Is it safe to use online image compressors?",
    answer:
      "With Toolspy, yes! Our client-side processing ensures your data is processed locally in your browser and never transmitted to our servers. This eliminates the risk of data being logged, stored, or intercepted. Unlike server-based compressors, our tool provides complete privacy and security for your image compression.",
  },
  {
    question: "Can I use the compressed images for professional purposes?",
    answer:
      "Yes! Our image compressor creates professional compression results that follow ethical guidelines. These results are suitable for professional use in web development, design, and any other application requiring image compression.",
  },
];

// Export function for schema generation
export function getImageCompressorFAQs() {
  return imageCompressorFAQs;
}

// Register FAQ data - this executes at module load time (server-side)
registerToolFAQ("image-compressor", getImageCompressorFAQs);

