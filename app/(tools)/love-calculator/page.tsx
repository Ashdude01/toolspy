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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Heart,
  Users,
  Sparkles,
  Shield,
  Calculator,
  RefreshCw,
} from "lucide-react";
import { LoveCalculatorSEOContent } from "./seo-content";

interface LoveResult {
  percentage: number;
  message: string;
  description: string;
  tips: string[];
  color: string;
}

function LoveCalculatorContent() {
  const { showToast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [result, setResult] = useState<LoveResult | null>(null);

  const calculateLove = () => {
    if (!firstName.trim() || !secondName.trim()) {
      showToast("Please enter both names", "error");
      return;
    }

    // Fun algorithm based on name letters
    const name1 = firstName.trim().toLowerCase();
    const name2 = secondName.trim().toLowerCase();
    
    // Count common letters
    const letters1 = name1.split('');
    const letters2 = name2.split('');
    let commonLetters = 0;
    
    for (const letter of letters1) {
      if (letters2.includes(letter)) {
        commonLetters++;
      }
    }
    
    // Calculate base percentage
    let percentage = Math.floor((commonLetters / Math.max(name1.length, name2.length)) * 100);
    
    // Add some randomness for fun
    const nameSum = name1.charCodeAt(0) + name2.charCodeAt(0);
    const adjustment = (nameSum % 30) - 15; // Range: -15 to +15
    percentage = Math.max(10, Math.min(100, percentage + adjustment));
    
    // Get result data based on percentage
    const loveResult = getLoveResult(percentage, firstName, secondName);
    setResult(loveResult);
    showToast("Love compatibility calculated!", "success");
  };

  const getLoveResult = (percentage: number, name1: string, name2: string): LoveResult => {
    if (percentage >= 90) {
      return {
        percentage,
        message: "Perfect Match! ❤️",
        description: `${name1} and ${name2} are absolutely perfect for each other! Your souls are deeply connected, and your love is destined to last forever.`,
        tips: [
          "Treasure this rare and beautiful connection",
          "Continue supporting each other's dreams",
          "Celebrate your amazing compatibility",
          "Build a future together with confidence"
        ],
        color: "text-red-500"
      };
    } else if (percentage >= 80) {
      return {
        percentage,
        message: "Excellent Compatibility! 💕",
        description: `${name1} and ${name2} share an amazing bond! You complement each other wonderfully and have great potential for a lasting relationship.`,
        tips: [
          "Keep communicating openly and honestly",
          "Embrace your differences as strengths",
          "Create beautiful memories together",
          "Support each other through challenges"
        ],
        color: "text-pink-500"
      };
    } else if (percentage >= 70) {
      return {
        percentage,
        message: "Great Match! 💖",
        description: `${name1} and ${name2} have a strong connection! With effort and understanding, your relationship can flourish beautifully.`,
        tips: [
          "Focus on building trust and intimacy",
          "Show appreciation for each other daily",
          "Work together to overcome obstacles",
          "Plan romantic dates and adventures"
        ],
        color: "text-rose-500"
      };
    } else if (percentage >= 60) {
      return {
        percentage,
        message: "Good Potential! 💝",
        description: `${name1} and ${name2} have good compatibility! Your relationship has solid potential with the right care and attention.`,
        tips: [
          "Invest time in understanding each other better",
          "Find common interests and hobbies",
          "Practice patience and empathy",
          "Celebrate small victories together"
        ],
        color: "text-purple-500"
      };
    } else if (percentage >= 50) {
      return {
        percentage,
        message: "Worth Exploring! 💜",
        description: `${name1} and ${name2} have moderate compatibility. Every relationship takes work - focus on your strengths!`,
        tips: [
          "Be open to learning about each other",
          "Communicate your needs clearly",
          "Find ways to have fun together",
          "Give your relationship time to grow"
        ],
        color: "text-indigo-500"
      };
    } else if (percentage >= 40) {
      return {
        percentage,
        message: "Challenges Ahead 💙",
        description: `${name1} and ${name2} may face some challenges, but love can overcome obstacles with dedication and compromise.`,
        tips: [
          "Focus on building a strong friendship first",
          "Work on communication skills",
          "Respect each other's differences",
          "Consider couples activities or counseling"
        ],
        color: "text-blue-500"
      };
    } else {
      return {
        percentage,
        message: "Different Paths 💛",
        description: `${name1} and ${name2} are very different, but sometimes opposites can create a unique and exciting dynamic!`,
        tips: [
          "Embrace your differences as learning opportunities",
          "Take things slow and build understanding",
          "Focus on friendship and respect",
          "Remember that love comes in many forms"
        ],
        color: "text-yellow-500"
      };
    }
  };

  const resetCalculator = () => {
    setFirstName("");
    setSecondName("");
    setResult(null);
  };

  const getHeartCount = (percentage: number) => {
    return Math.ceil(percentage / 20); // 1-5 hearts
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-pink-600 dark:to-pink-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Love Calculator
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the love compatibility between two people. Enter names and get a fun 
          compatibility percentage with personalized insights!
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Love Compatibility Calculator
          </CardTitle>
          <CardDescription>
            Enter two names to calculate their love compatibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Person's Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondName">Second Person's Name</Label>
              <Input
                id="secondName"
                type="text"
                placeholder="Enter second name"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                maxLength={50}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateLove} 
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              disabled={!firstName.trim() || !secondName.trim()}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Love Compatibility
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Love Results */}
      {result && (
        <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Love Compatibility Results
            </CardTitle>
            <CardDescription>
              Compatibility analysis for {firstName} and {secondName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Result Display */}
            <div className="text-center mb-8">
              <div className={`text-6xl sm:text-7xl font-bold ${result.color} mb-4`}>
                {result.percentage}%
              </div>
              <div className="text-2xl font-semibold mb-2 text-center">
                {result.message}
              </div>
              <div className="text-4xl mb-4">
                {"❤️".repeat(getHeartCount(result.percentage))}
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            {/* Compatibility Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Compatibility Level</span>
                <span className="text-sm font-medium">{result.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-red-400 to-pink-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${result.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Love Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Relationship Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Fun Facts */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Fun Love Facts</CardTitle>
          <CardDescription>
            Interesting facts about love and relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Chemical Love</div>
              <div className="text-muted-foreground">
                Love triggers release of dopamine, oxytocin, and norepinephrine
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Heart Sync</div>
              <div className="text-muted-foreground">
                Couples' heartbeats can synchronize when they gaze into each other's eyes
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Love at First Sight</div>
              <div className="text-muted-foreground">
                It takes only 0.2 seconds to fall in love according to scientists
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Butterfly Effect</div>
              <div className="text-muted-foreground">
                "Butterflies in stomach" are caused by adrenaline when nervous
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <LoveCalculatorSEOContent />
    </div>
  );
}

export default function LoveCalculatorPage() {
  return (
    <ToastProvider>
      <LoveCalculatorContent />
    </ToastProvider>
  );
} 