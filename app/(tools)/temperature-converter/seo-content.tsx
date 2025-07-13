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

export function TemperatureConverterSEOContent() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Conversion",
      description: "Convert between Celsius, Fahrenheit, Kelvin, and Rankine instantly",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "All Temperature Scales",
      description: "Support for Celsius, Fahrenheit, Kelvin, and Rankine temperature scales",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Accurate",
      description: "Precise temperature conversions using exact mathematical formulas",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Context Information",
      description: "Get helpful context about temperature ranges and their meanings",
    },
  ];

  const faqs = [
    {
      question: "How do I convert Celsius to Fahrenheit?",
      answer: "To convert Celsius to Fahrenheit: °F = (°C × 9/5) + 32. For example, 20°C = (20 × 9/5) + 32 = 68°F."
    },
    {
      question: "What's the difference between Celsius and Fahrenheit?",
      answer: "Celsius is based on water's freezing (0°C) and boiling (100°C) points. Fahrenheit uses 32°F for freezing and 212°F for boiling water."
    },
    {
      question: "When would I use Kelvin temperature?",
      answer: "Kelvin is used in scientific calculations because it's an absolute temperature scale starting at absolute zero (-273.15°C)."
    },
    {
      question: "What is absolute zero?",
      answer: "Absolute zero is 0 Kelvin (-273.15°C or -459.67°F), the theoretical temperature where all molecular motion stops."
    },
    {
      question: "Which countries use Celsius vs Fahrenheit?",
      answer: "Most of the world uses Celsius. The US, Myanmar, and Liberia primarily use Fahrenheit for everyday temperature measurements."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Professional Temperature Converter
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between Celsius, Fahrenheit, Kelvin, and Rankine with instant, precise results. 
            Perfect for cooking, science, weather, and international travel.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-orange-600">
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

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Convert Temperatures Instantly
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get precise temperature conversions for cooking, science, weather, and travel.
          </p>
          <Button 
            size="lg" 
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Convert Temperatures
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 