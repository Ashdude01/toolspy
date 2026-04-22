"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
  variant?: "default" | "modern";
}

export function FAQ({ 
  title = "Frequently Asked Questions", 
  description,
  faqs, 
  className = "",
  variant = "modern"
}: FAQProps) {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);



  if (variant === "modern") {
    return (
      <div className={` bg-transparent ${className}`}>
        <CardHeader className="text-center p-0 mb-5">
          <CardTitle className="flex items-center justify-start gap-3 md:justify-center text-xl md:text-3xl">
            <HelpCircle className="h-8 w-8 text-indigo-600" />
            {title}
          </CardTitle>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 cursor-pointer dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div
                  className="w-full justify-between p-4 gap-3 flex flex-row h-auto font-medium text-left text-base hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/20 dark:hover:to-purple-950/20 transition-all duration-300"
                  onClick={() =>
                    setSelectedFaq(selectedFaq === index ? null : index)
                  }
                >
                  <span className="text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {faq.question}
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedFaq === index ? (
                      <ChevronUp className="h-4 w-4 text-indigo-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
                    )}
                  </div>
                </div>
                {selectedFaq === index && (
                  <div className="px-5 pb-5 border-t border-indigo-100 dark:border-indigo-800">
                    <div className="pt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    );
  }

  // Default variant (simpler design)
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
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
      </CardContent>
    </Card>
  );
}
