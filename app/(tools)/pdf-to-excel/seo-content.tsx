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
import {
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
} from "lucide-react";

export function PdfToExcelSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I convert PDF to Excel?",
      answer: "Upload your PDF files, click 'Convert to Excel', and download the resulting .xlsx files. The tool extracts tabular data and text content from your PDFs."
    },
    {
      question: "Will table formatting be preserved?",
      answer: "Our current implementation focuses on data extraction. Complex table formatting may need manual adjustment in Excel, but the core data content is preserved."
    },
    {
      question: "Is the conversion secure?",
      answer: "Yes! All conversion happens in your browser using client-side processing. Your PDF files never leave your device, ensuring complete privacy."
    },
    {
      question: "What Excel format does it output?",
      answer: "The tool outputs .xlsx files compatible with Microsoft Excel, Google Sheets, LibreOffice Calc, and other spreadsheet applications."
    }
  ];

  return (
    <div className="space-y-12 mt-16">
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional PDF to Excel Conversion
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Transform your PDF documents into editable Excel spreadsheets with our advanced conversion technology.
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
            Convert PDF to Excel Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your PDF documents into editable Excel spreadsheets with complete privacy protection.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Converting →
          </Button>
        </div>
      </section>
    </div>
  );
} 