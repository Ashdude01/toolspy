// Server-side FAQ loader for website-screenshot
// This ensures FAQ registration happens before schema generation
// Import the FAQ function directly to trigger registration
import { registerToolFAQ } from '@/components/seo/faq-types'

// FAQ data for website-screenshot
const websiteScreenshotFAQs = [
  {
    question: "Is Toolspy's website screenshot tool completely free to use?",
    answer:
      "Yes, our professional website screenshot tool is completely free with no hidden costs, registration requirements, or usage limitations. You can capture unlimited website screenshots without any restrictions. Unlike many competitors who have limited features or require paid subscriptions, Toolspy provides all screenshot capabilities free of charge.",
  },
  {
    question: "How fast is the website screenshot capture?",
    answer:
      "Our website screenshot tool provides fast processing for any website URL. Screenshots are typically captured within 2-5 seconds depending on the website's loading time. You can capture multiple screenshots quickly, making it perfect for batch processing and real-time needs.",
  },
  {
    question: "How secure is the website screenshot process?",
    answer:
      "Absolutely secure! Our website screenshot tool processes URLs securely and doesn't store any captured screenshots on our servers. The screenshots are generated on-demand and provided directly to you for download. Your privacy is protected, and we don't track or log the websites you screenshot.",
  },
  {
    question: "What image formats are supported for screenshots?",
    answer:
      "Our screenshot tool supports multiple image formats including PNG, JPEG, and WebP. You can choose your preferred format based on your needs. PNG is recommended for high-quality screenshots with transparency, JPEG for smaller file sizes, and WebP for modern web optimization.",
  },
  {
    question: "Can I customize the screenshot options?",
    answer:
      "Yes! Our website screenshot tool excels at customization. You can choose screenshot dimensions (desktop, tablet, mobile), select image formats, enable full-page screenshots, set custom viewport sizes, and adjust quality settings. This is perfect for meeting specific screenshot requirements and quality standards.",
  },
  {
    question: "Why choose Toolspy over other free screenshot tools like Pikwy or ScreenshotAPI?",
    answer:
      "Toolspy offers professional-grade features like multiple format support, customizable dimensions, full-page capture, complete privacy protection, and no registration requirements. Many competitors like Pikwy and ScreenshotAPI have limited free tiers, require registration, or lack comprehensive features. Our tool provides better options, superior functionality, and more customization completely free.",
  },
  {
    question: "Can I capture screenshots for different device types?",
    answer:
      "Absolutely! Our website screenshot tool handles different device types perfectly. You can capture screenshots for desktop (1920x1080), tablet (768x1024), mobile (375x667), or set custom dimensions. The tool supports all standard device scenarios and viewport sizes.",
  },
  {
    question: "What screenshot options are available?",
    answer:
      "Our tool provides multiple screenshot formats including PNG, JPEG, and WebP, various dimension presets (desktop, tablet, mobile), custom viewport sizes, full-page capture option, and quality control settings. All screenshots include professional formatting, making it easy to use the results in your projects.",
  },
  {
    question: "Is it safe to use online website screenshot tools?",
    answer:
      "With Toolspy, yes! Our screenshot tool doesn't store your captured screenshots on our servers. Screenshots are generated on-demand and provided directly to you for download. This eliminates the risk of data being logged, stored, or intercepted. Unlike some server-based tools, our tool provides complete privacy and security for your screenshot needs.",
  },
  {
    question: "Can I use the screenshots for professional purposes?",
    answer:
      "Yes! Our website screenshot tool creates professional screenshot results that follow ethical guidelines. These results are suitable for professional use in web development, design, documentation, presentations, and any other application requiring website screenshots. Always ensure you have permission to screenshot the websites you capture.",
  },
  {
    question: "Does the tool support full-page screenshots?",
    answer:
      "Yes! Our website screenshot tool supports full-page screenshots that capture the entire webpage from top to bottom, not just the visible viewport. This is perfect for capturing long-form content, documentation pages, or complete website layouts. You can toggle between viewport and full-page capture modes.",
  },
  {
    question: "Can I download multiple screenshots at once?",
    answer:
      "Yes! Our website screenshot tool supports batch processing. You can capture multiple website screenshots and download them individually or as a ZIP file. This makes it easy to capture screenshots of multiple pages or websites in one session and organize them efficiently.",
  },
];

// Export function for schema generation
export function getWebsiteScreenshotFAQs() {
  return websiteScreenshotFAQs;
}

// Register FAQ data - this executes at module load time (server-side)
registerToolFAQ("website-screenshot", getWebsiteScreenshotFAQs);
