import { registerToolFAQ } from "@/components/seo/faq-types";

export function getImageToPdfFAQs() {
  return [
    {
      question: "Is ToolSpy's image to PDF converter really free?",
      answer:
        "Yes, completely. You can convert as many images as you need without paying anything or creating an account.",
    },
    {
      question: "Which image formats are supported?",
      answer:
        "ToolSpy supports JPG, JPEG, PNG, WebP, BMP, and GIF formats for PDF conversion.",
    },
    {
      question: "Can I convert multiple images into one PDF?",
      answer:
        "Absolutely. You can upload multiple images and arrange them in any order before converting them into a single merged PDF.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. Files are processed in your browser session and are not stored or shared by ToolSpy.",
    },
    {
      question: "Do I need to install anything?",
      answer:
        "No. The tool works entirely in your web browser on any device.",
    },
  ];
}

registerToolFAQ("image-to-pdf", getImageToPdfFAQs);
