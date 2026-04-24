import { registerToolFAQ } from "@/components/seo/faq-types";

const faqs = [
  {
    question: "Does the image cropper upload my photos?",
    answer:
      "No. Cropping runs in your browser using canvas, so your image is processed locally on your device.",
  },
  {
    question: "Can I crop in a circle or other shapes?",
    answer:
      "Yes. You can crop as a rectangle/square, or use shape crops like circle and polygon shapes. Shape crops export with transparency where applicable.",
  },
  {
    question: "How do aspect ratio crops work?",
    answer:
      "Choose an aspect ratio (like 1:1 or 16:9) and your crop area will be constrained to that ratio so the result fits common platform requirements.",
  },
  {
    question: "Which formats are supported for export?",
    answer:
      "Rectangle crops can export as JPEG, PNG, or WebP. Shape crops typically export as PNG (or WebP) to preserve transparency.",
  },
];

export function getOnlineImageCropperFAQs() {
  return faqs;
}

registerToolFAQ("online-image-cropper", getOnlineImageCropperFAQs);

