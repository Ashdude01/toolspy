/**
 * Shared FAQ data for the home page(s). Used for server-rendered SEO content and schema.
 */
export const homeFaqData = [
  {
    question: "Are all Toolspy tools really free to use?",
    answer:
      "Yes. The tools are free to use and don’t require creating an account. If we introduce limits or paid features in the future, we’ll make that clear on the relevant pages."
  },
  {
    question: "How do you keep my files secure when using Toolspy tools?",
    answer:
      "Many tools run locally in your browser, so inputs are processed on your device. Some tools may require server-side processing depending on the feature. Always avoid uploading sensitive files unless you trust the workflow for that tool."
  },
  {
    question: "What file formats and sizes can I work with on Toolspy?",
    answer:
      "Formats and size limits vary by tool. Image tools typically support common formats like JPG, PNG, WebP and more. PDF tools support common PDF workflows (merge, split, compress, convert). Check each tool page for the exact limits and supported formats."
  },
  {
    question: "Do I need to download or install anything to use Toolspy?",
    answer:
      "No. Toolspy tools are browser-based. Open a tool page, provide the input, and get the result."
  },
  {
    question: "Can I use Toolspy tools on my phone or tablet?",
    answer:
      "Yes. The site is designed to work on mobile, tablet, and desktop. Some workflows are easier on a larger screen, but the tools are usable on phones too."
  },
  {
    question: "How does batch processing work, and how many files can I process?",
    answer:
      "Batch support depends on the tool. Some tools let you process multiple files in one run, while others focus on a single input. Check the tool page for what’s supported."
  },
  {
    question: "What makes Toolspy better than other free online tool websites?",
    answer:
      "Toolspy focuses on a simple workflow: clear inputs, predictable outputs, and short guides for common pitfalls. Many tools run in-browser and don’t require signup."
  },
  {
    question: "Are these tools good enough for business and professional use?",
    answer:
      "They can be. Many users rely on these tools for everyday work tasks. For compliance-heavy or sensitive workflows, validate the output and use the right tool for your specific requirements."
  },
  {
    question: "How often do you add new tools or update existing ones?",
    answer:
      "Tools are updated over time as we improve quality and add new features. If you have a request, you can share it on the feedback page."
  },
  {
    question: "Can I use Toolspy tools for my business or client work?",
    answer:
      "In general, yes. If you’re using outputs in client work, review the results and confirm they meet your project’s requirements."
  }
] as const;
