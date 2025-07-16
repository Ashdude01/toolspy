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
  Unlock,
  Shield,
  Zap,
  Settings,
} from "lucide-react";

export function PdfPasswordRemoverSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I remove password protection from a PDF?",
      answer: "Upload your password-protected PDF files, enter the correct password, and click 'Remove Password Protection'. The tool will create unlocked versions of your PDFs that you can download immediately."
    },
    {
      question: "Is my password and PDF data secure?",
      answer: "Yes, completely secure! All password removal happens in your browser using client-side processing. Your password and PDF files never leave your device, ensuring complete privacy and security."
    },
    {
      question: "What if I don't know the password?",
      answer: "Unfortunately, you need the correct password to remove protection from a PDF. This tool requires the original password as a security measure - we cannot crack or bypass unknown passwords."
    },
    {
      question: "Can I remove passwords from multiple PDFs at once?",
      answer: "Yes! You can upload up to 10 PDF files and remove password protection from all of them simultaneously, as long as they all use the same password."
    },
    {
      question: "Will the PDF quality be affected?",
      answer: "No, the PDF quality and content remain exactly the same. We only remove the password protection while preserving all text, images, formatting, and metadata."
    }
  ];

  return (
    <div className="space-y-12 mt-16">
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Professional PDF Password Removal Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Toolspy's PDF Password Remover provides secure and efficient removal of password protection from PDF documents. 
            Our client-side processing ensures your sensitive files and passwords remain completely private while unlocking your PDFs instantly.
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
            Remove PDF Passwords Now
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Unlock your password-protected PDF files instantly with complete privacy and security protection.
          </p>
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Start Removing Passwords →
          </Button>
        </div>
      </section>
    </div>
  );
} 