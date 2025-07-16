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
  Database,
} from "lucide-react";

export function PdfToCsvSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I convert PDF to CSV?",
      answer: "Upload your PDF files containing tabular data, click 'Convert to CSV', and download the resulting .csv files. The tool extracts structured data from your PDFs."
    },
    {
      question: "What type of data can be extracted?",
      answer: "Our tool is designed to extract tabular data, tables, and structured text from PDF documents. It works best with PDFs that contain clear data structures."
    },
    {
      question: "Is the data extraction accurate?",
      answer: "The accuracy depends on the structure and quality of the original PDF. Clean, well-formatted tables extract better than complex layouts. Manual review is recommended for critical data."
    },
    {
      question: "Can I import the CSV into Excel or Google Sheets?",
      answer: "Yes! The CSV files are compatible with Excel, Google Sheets, LibreOffice Calc, and any other application that supports CSV format."
    },
    {
      question: "Is my data secure during conversion?",
      answer: "Absolutely! All processing happens in your browser using client-side technology. Your PDF files and extracted data never leave your device."
    }
  ];

  return (
    <div className="space-y-12 mt-16">
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional PDF to CSV Data Extraction
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Extract structured data from your PDF documents and convert it to CSV format for easy analysis and manipulation.
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
            Extract PDF Data to CSV Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert your PDF documents to CSV format for easy data analysis and manipulation with complete privacy protection.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Extracting Data →
          </Button>
        </div>
      </section>
    </div>
  );
} 