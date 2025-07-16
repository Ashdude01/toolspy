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
  Lock,
} from "lucide-react";

export function FileProtectorSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How does the File Protector work?",
      answer: "Upload your files, set a strong password, and our tool will add password protection to your documents. For PDFs, we use built-in PDF encryption. For other files, we create protected containers."
    },
    {
      question: "What types of files can I protect?",
      answer: "You can protect PDFs with built-in encryption, and other file types with container-based protection. PDFs receive the strongest protection with industry-standard encryption."
    },
    {
      question: "How secure is the password protection?",
      answer: "For PDFs, we use PDF-standard encryption. All processing happens in your browser, so your password and files never leave your device, ensuring maximum privacy."
    },
    {
      question: "Can I remove protection later?",
      answer: "Yes, if you have the password, you can use our PDF Password Remover tool to unlock PDF files. For other protected files, you'll need the original password to access the content."
    },
    {
      question: "What makes a strong password?",
      answer: "Use at least 6 characters (longer is better), combine letters, numbers, and special characters. Avoid common words or personal information. The stronger your password, the more secure your files."
    }
  ];

  return (
    <div className="space-y-12 mt-16">
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional File Protection Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Secure your important documents with password protection using our privacy-focused file protection tool.
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
            Protect Your Files Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Add password protection to your important documents with complete privacy and security.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Protecting Files →
          </Button>
        </div>
      </section>
    </div>
  );
} 