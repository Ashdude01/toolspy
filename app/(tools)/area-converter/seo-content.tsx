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

export function AreaConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Conversion",
      description: "Convert between metric and imperial area units instantly",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "All Area Units",
      description: "From square millimeters to square kilometers, acres to square feet",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Accurate",
      description: "Precise conversions using exact mathematical formulas",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Multiple Systems",
      description: "Support for metric, imperial, and specialized area units",
    },
  ];

  const faqs = [
    {
      question: "How do I convert square feet to square meters?",
      answer: "To convert square feet to square meters, multiply by 0.092903. For example: 100 square feet = 9.2903 square meters."
    },
    {
      question: "How many square feet are in an acre?",
      answer: "There are 43,560 square feet in an acre. This is a standard conversion in the imperial system for large area measurements."
    },
    {
      question: "What's the difference between area and perimeter?",
      answer: "Area measures the space inside a shape (square units), while perimeter measures the distance around the outside (linear units)."
    },
    {
      question: "How do I calculate room area?",
      answer: "For rectangular rooms: Area = length × width. For example, a 12ft × 10ft room has an area of 120 square feet."
    },
    {
      question: "What are the most common area conversions?",
      answer: "Common conversions include: 1 square foot = 0.0929 m², 1 square yard = 0.836 m², 1 acre = 4,047 m², 1 hectare = 10,000 m²."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Area Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between metric and imperial area units with precision. 
            Perfect for real estate, construction, landscaping, and land measurement.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-yellow-600">
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

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Areas Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get precise area conversions for real estate, construction, and land measurement.
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-600 hover:bg-yellow-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert Areas Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 