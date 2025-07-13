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
  Target,
  Zap,
  Shield,
  Settings,
} from "lucide-react";

export function WeightConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Conversion",
      description: "Convert between metric and imperial weight units instantly",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "All Weight Units",
      description: "From milligrams to tonnes, ounces to pounds, and more",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Accurate",
      description: "Precise conversions using exact mathematical formulas",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Multiple Systems",
      description: "Support for metric, imperial, and specialized weight units",
    },
  ];

  const faqs = [
    {
      question: "How do I convert pounds to kilograms?",
      answer: "To convert pounds to kilograms, divide by 2.20462. For example: 10 pounds = 4.536 kilograms."
    },
    {
      question: "What's the difference between mass and weight?",
      answer: "Mass is the amount of matter in an object (constant everywhere), while weight is the force of gravity acting on that mass (varies by location)."
    },
    {
      question: "How many ounces are in a pound?",
      answer: "There are 16 ounces in a pound. This is a standard conversion in the imperial system."
    },
    {
      question: "What are the most common weight conversions?",
      answer: "Common conversions include: 1 pound = 0.453592 kg, 1 ounce = 28.3495 g, 1 stone = 6.35029 kg, 1 tonne = 1,000 kg."
    },
    {
      question: "How precise are the conversions?",
      answer: "Our converter uses exact mathematical formulas with high precision. Results are accurate to multiple decimal places for professional use."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Weight Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between metric and imperial weight units with precision. 
            Perfect for cooking, shipping, fitness, and scientific applications.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-indigo-600">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto text-left"
                  onClick={() =>
                    setSelectedFaq(selectedFaq === index ? null : index)
                  }
                >
                  <span className="font-semibold">{faq.question}</span>
                  {selectedFaq === index ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>
                {selectedFaq === index && (
                  <div className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-indigo-50 border-indigo-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Weights Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get precise weight conversions for cooking, shipping, fitness, and more.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert Weights Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 