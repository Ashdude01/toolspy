"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  FileText,
  Scissors,
  Shield,
  Zap,
  Settings,
} from "lucide-react";

export function SplitPdfSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I split a PDF into multiple files?",
      answer: "Upload your PDF file, choose your splitting method (page ranges, pages per file, or each page separate), configure the settings, and click 'Split PDF'. You can then download individual files or all files as a ZIP archive."
    },
    {
      question: "What splitting options are available?",
      answer: "You can split by specific page ranges (e.g., 1-3,5-7), by number of pages per file, or extract each page as a separate file. This gives you complete control over how your document is divided."
    },
    {
      question: "Is there a limit on PDF file size?",
      answer: "You can upload PDF files up to 100MB in size. This accommodates most documents including those with high-resolution images and complex layouts."
    },
    {
      question: "Is my data secure when splitting PDFs?",
      answer: "Yes, completely secure! All PDF splitting happens in your browser using client-side processing. Your files never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Can I download all split files at once?",
      answer: "Yes, if you create multiple split files, you can download them all at once as a convenient ZIP archive, or download individual files separately."
    }
  ];

  return (
    <div className="space-y-12 mt-16">
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional PDF Splitting Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Toolspy's PDF Splitter provides precise control over how you divide large PDF documents into smaller, manageable files. 
            Whether you need specific pages, equal-sized chunks, or individual page extraction, our tool delivers professional results.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <Card key={index}>
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setSelectedFaq(selectedFaq === index ? null : index)
                }
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    <h4>{faq.question}</h4>
                  </CardTitle>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>
              {selectedFaq === index && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">
            Split Your PDF Files Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Divide large PDF documents into smaller files with complete control over page selection and privacy protection.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Splitting PDFs →
          </Button>
        </div>
      </section>
    </div>
  );
} 