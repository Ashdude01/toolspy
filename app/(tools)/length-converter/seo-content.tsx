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

export function LengthConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Conversion",
      description: "Convert between metric and imperial length units instantly",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "All Length Units",
      description: "From millimeters to kilometers, inches to miles, and more",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Accurate",
      description: "Precise conversions using exact mathematical formulas",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Multiple Systems",
      description: "Support for metric, imperial, and specialized units",
    },
  ];

  const faqs = [
    {
      question: "How do I convert meters to feet?",
      answer: "To convert meters to feet, multiply by 3.28084. For example: 1 meter = 3.28084 feet, so 5 meters = 16.404 feet."
    },
    {
      question: "What's the difference between imperial and metric?",
      answer: "Imperial units (feet, inches, yards) are primarily used in the US. Metric units (meters, centimeters, kilometers) are used worldwide and based on powers of 10."
    },
    {
      question: "How many feet are in a mile?",
      answer: "There are 5,280 feet in a mile. This is a standard conversion in the imperial system."
    },
    {
      question: "What are the most common length conversions?",
      answer: "Common conversions include: 1 inch = 2.54 cm, 1 foot = 30.48 cm, 1 yard = 91.44 cm, 1 mile = 1.609 km."
    },
    {
      question: "How precise are the conversions?",
      answer: "Our converter uses exact mathematical formulas with high precision. Results are accurate to multiple decimal places for professional use."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Length Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between metric and imperial length units with precision. 
            Perfect for construction, engineering, travel, and everyday measurements.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-green-600">
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

      <Card className="bg-green-50 border-green-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Lengths Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get precise length conversions for construction, engineering, and everyday use.
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert Lengths Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 