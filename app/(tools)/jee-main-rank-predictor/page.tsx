"use client";

import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  Copy,
  Download,
  RefreshCw,
  Shield,
  TrendingUp,
  FileText,
  Percent,
  Award,
  Target,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { JEEMainRankPredictorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface RankPrediction {
  percentile: number;
  expectedRank: number;
  category: string;
  examSession: string;
  totalCandidates: number;
  confidence: string;
  collegePredictions: {
    tier: string;
    colleges: string[];
  }[];
}

const CATEGORIES = [
  { value: "General", label: "General" },
  { value: "OBC-NCL", label: "OBC-NCL" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
  { value: "EWS", label: "EWS" },
  { value: "PwD", label: "PwD" },
];

const EXAM_SESSIONS = [
  { value: "January", label: "January Session" },
  { value: "April", label: "April Session" },
  { value: "Combined", label: "Combined (Both Sessions)" },
];

function JEEMainRankPredictorContent() {
  const [percentile, setPercentile] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [examSession, setExamSession] = useState<string>("Combined");
  const [prediction, setPrediction] = useState<RankPrediction | null>(null);
  const [history, setHistory] = useState<RankPrediction[]>([]);

  const calculateRank = () => {
    const percentileValue = parseFloat(percentile);
    if (isNaN(percentileValue) || percentileValue < 0 || percentileValue > 100) return;

    // Simplified rank calculation (actual formula is more complex)
    const totalCandidates = examSession === "Combined" ? 1200000 : 600000;
    const expectedRank = Math.round((100 - percentileValue) * totalCandidates / 100);
    
    // Determine confidence based on percentile
    let confidence = "Low";
    if (percentileValue >= 95) confidence = "Very High";
    else if (percentileValue >= 90) confidence = "High";
    else if (percentileValue >= 80) confidence = "Medium";
    else if (percentileValue >= 70) confidence = "Low";

    // College predictions based on rank
    const collegePredictions = [];
    if (expectedRank <= 1000) {
      collegePredictions.push({
        tier: "Top IITs",
        colleges: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur"]
      });
    } else if (expectedRank <= 5000) {
      collegePredictions.push({
        tier: "IITs",
        colleges: ["IIT Roorkee", "IIT Guwahati", "IIT Hyderabad", "IIT Indore", "IIT BHU"]
      });
    } else if (expectedRank <= 15000) {
      collegePredictions.push({
        tier: "NITs",
        colleges: ["NIT Trichy", "NIT Surathkal", "NIT Warangal", "NIT Calicut", "NIT Durgapur"]
      });
    } else if (expectedRank <= 50000) {
      collegePredictions.push({
        tier: "Good Engineering Colleges",
        colleges: ["IIIT Hyderabad", "BITS Pilani", "DTU Delhi", "NSIT Delhi", "Jadavpur University"]
      });
    } else {
      collegePredictions.push({
        tier: "Other Engineering Colleges",
        colleges: ["State Engineering Colleges", "Private Engineering Colleges", "Regional Engineering Colleges"]
      });
    }

    const newPrediction: RankPrediction = {
      percentile: percentileValue,
      expectedRank,
      category,
      examSession,
      totalCandidates,
      confidence,
      collegePredictions,
    };

    setPrediction(newPrediction);
    setHistory(prev => [newPrediction, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    if (percentile && !isNaN(parseFloat(percentile))) {
      calculateRank();
    }
  }, [percentile, category, examSession]);

  const copyResult = () => {
    if (!prediction) return;
    
    const resultText = `JEE Main Rank Prediction Result:
Percentile: ${prediction.percentile}%
Expected Rank: ${prediction.expectedRank}
Category: ${prediction.category}
Exam Session: ${prediction.examSession}
Confidence: ${prediction.confidence}
Total Candidates: ${prediction.totalCandidates.toLocaleString()}

College Predictions:
${prediction.collegePredictions.map(tier => 
  `${tier.tier}: ${tier.colleges.join(', ')}`
).join('\n')}`;
    
    navigator.clipboard.writeText(resultText);
  };

  const downloadResult = () => {
    if (!prediction) return;
    
    const resultText = `JEE Main Rank Prediction Report
Generated on: ${new Date().toLocaleDateString()}

Prediction Details:
Percentile: ${prediction.percentile}%
Expected Rank: ${prediction.expectedRank}
Category: ${prediction.category}
Exam Session: ${prediction.examSession}
Confidence: ${prediction.confidence}
Total Candidates: ${prediction.totalCandidates.toLocaleString()}

College Predictions:
${prediction.collegePredictions.map(tier => 
  `${tier.tier}: ${tier.colleges.join(', ')}`
).join('\n')}

This prediction is for reference purposes only.
Actual ranks may vary based on various factors.`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jee-main-rank-prediction-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setPercentile("");
    setCategory("General");
    setExamSession("Combined");
    setPrediction(null);
    setHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 mb-4"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-green-500 dark:from-green-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          JEE Main Rank Predictor
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Predict your JEE Main rank and college options based on percentile. 
          Perfect for understanding admission chances and planning your engineering journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                JEE Main Rank Predictor
              </CardTitle>
              <CardDescription>
                Enter your percentile to predict rank and college options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Percentile Input */}
              <div className="space-y-2">
                <Label htmlFor="percentile">JEE Main Percentile</Label>
                <Input
                  id="percentile"
                  type="number"
                  placeholder="Enter your percentile (0-100)"
                  value={percentile}
                  onChange={(e) => setPercentile(e.target.value)}
                  min="0"
                  max="100"
                  step="0.01"
                  className="text-lg"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Exam Session */}
              <div className="space-y-2">
                <Label htmlFor="exam-session">Exam Session</Label>
                <Select value={examSession} onValueChange={setExamSession}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXAM_SESSIONS.map((session) => (
                      <SelectItem key={session.value} value={session.value}>
                        {session.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={calculateRank} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Predict Rank
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {prediction && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Rank Prediction Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Percentile:</span>
                      <span className="font-bold text-lg">{prediction.percentile}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <span className="font-medium">Expected Rank:</span>
                      <span className="font-bold text-lg text-blue-600">{prediction.expectedRank.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Category:</span>
                      <span className="font-bold">{prediction.category}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="font-medium">Confidence:</span>
                      <Badge variant={prediction.confidence === "Very High" ? "default" : "secondary"}>
                        {prediction.confidence}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <span className="font-medium">Total Candidates:</span>
                      <span className="font-bold text-lg text-purple-600">{prediction.totalCandidates.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="font-medium">Exam Session:</span>
                      <span className="font-bold">{prediction.examSession}</span>
                    </div>
                  </div>
                </div>

                {/* College Predictions */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    College Predictions
                  </h4>
                  <div className="space-y-4">
                    {prediction.collegePredictions.map((tier, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <h5 className="font-semibold mb-2 text-primary">{tier.tier}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {tier.colleges.map((college, collegeIndex) => (
                            <div key={collegeIndex} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span>{college}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={copyResult} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Result
                  </Button>
                  <Button variant="outline" onClick={downloadResult} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <div key={cat.value} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{cat.label}</span>
                      {cat.value === category && (
                        <Badge variant="default" className="text-xs">Selected</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exam Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Exam Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {EXAM_SESSIONS.map((session) => (
                  <div key={session.value} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{session.label}</span>
                      {session.value === examSession && (
                        <Badge variant="default" className="text-xs">Selected</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calculation History */}
          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((pred, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{pred.percentile}%</span>
                        <Badge variant="outline" className="text-xs">
                          Rank {pred.expectedRank.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground">
                        {pred.category} • {pred.examSession}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Percent className="h-4 w-4 mt-0.5 text-green-600" />
                <span>Higher percentile means better rank</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 mt-0.5 text-blue-600" />
                <span>Rank determines college eligibility</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-purple-600" />
                <span>All predictions are done locally for privacy</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <JEEMainRankPredictorSEOContent />
    </div>
  );
}

export default function JEEMainRankPredictorPage() {
  return (
    <ToolPageWrapper toolSlug="jee-main-rank-predictor">
      <JEEMainRankPredictorContent />
    </ToolPageWrapper>
  );
}
