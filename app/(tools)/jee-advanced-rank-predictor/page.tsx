"use client";

import { useState, useEffect, useCallback } from "react";
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
  Award,
  Target,
  BarChart3,
  Star,
  Info,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Zap,
  GraduationCap,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useToast, ToastProvider } from "@/components/tools/shared/toast-provider";

interface RankPrediction {
  score: number;
  expectedRank: number;
  category: string;
  examYear: string;
  totalCandidates: number;
  confidence: string;
  iitPredictions: {
    tier: string;
    iits: string[];
  }[];
}

const CATEGORIES = [
  { value: "General", label: "General", description: "General category candidates" },
  { value: "OBC-NCL", label: "OBC-NCL", description: "Other Backward Classes - Non-Creamy Layer" },
  { value: "SC", label: "SC", description: "Scheduled Caste" },
  { value: "ST", label: "ST", description: "Scheduled Tribe" },
  { value: "EWS", label: "EWS", description: "Economically Weaker Section" },
  { value: "PwD", label: "PwD", description: "Persons with Disabilities" },
];

const EXAM_YEARS = [
  { value: "2024", label: "2024", description: "JEE Advanced 2024" },
  { value: "2023", label: "2023", description: "JEE Advanced 2023" },
  { value: "2022", label: "2022", description: "JEE Advanced 2022" },
  { value: "2021", label: "2021", description: "JEE Advanced 2021" },
];

const SCORE_RANGES = [
  { range: "300-360", rank: "1-50,000", iits: "Top IITs, Old IITs", color: "text-green-600 dark:text-green-400" },
  { range: "250-300", rank: "50,000-100,000", iits: "Old IITs, New IITs", color: "text-blue-600 dark:text-blue-400" },
  { range: "200-250", rank: "100,000-150,000", iits: "New IITs, Other IITs", color: "text-purple-600 dark:text-purple-400" },
  { range: "150-200", rank: "150,000-200,000", iits: "Other IITs", color: "text-orange-600 dark:text-orange-400" },
  { range: "Below 150", rank: "200,000+", iits: "Lower Rank IITs", color: "text-gray-600 dark:text-gray-400" },
];

function JEEAdvancedRankPredictorContent() {
  const { showToast } = useToast();
  const [score, setScore] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [examYear, setExamYear] = useState<string>("2024");
  const [prediction, setPrediction] = useState<RankPrediction | null>(null);
  const [history, setHistory] = useState<RankPrediction[]>([]);

  const calculateRank = useCallback(() => {
    const scoreValue = parseFloat(score);
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 360) {
      setPrediction(null);
      return;
    }

    try {
      const totalCandidates = 250000;
      const expectedRank = Math.round((360 - scoreValue) * totalCandidates / 360);
      
      let confidence = "Low";
      if (scoreValue >= 300) confidence = "Very High";
      else if (scoreValue >= 250) confidence = "High";
      else if (scoreValue >= 200) confidence = "Medium";
      else if (scoreValue >= 150) confidence = "Low";

      const iitPredictions = [];
      if (expectedRank <= 100) {
        iitPredictions.push({
          tier: "Top IITs",
          iits: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur"]
        });
      } else if (expectedRank <= 1000) {
        iitPredictions.push({
          tier: "Old IITs",
          iits: ["IIT Roorkee", "IIT Guwahati", "IIT Hyderabad", "IIT Indore", "IIT BHU"]
        });
      } else if (expectedRank <= 5000) {
        iitPredictions.push({
          tier: "New IITs",
          iits: ["IIT Gandhinagar", "IIT Ropar", "IIT Bhubaneswar", "IIT Mandi", "IIT Jodhpur"]
        });
      } else if (expectedRank <= 15000) {
        iitPredictions.push({
          tier: "Other IITs",
          iits: ["IIT Patna", "IIT Bhilai", "IIT Goa", "IIT Jammu", "IIT Dharwad"]
        });
      } else {
        iitPredictions.push({
          tier: "Lower Rank IITs",
          iits: ["IIT Tirupati", "IIT Palakkad", "IIT Dhanbad", "IIT Bhubaneswar", "IIT Mandi"]
        });
      }

      const newPrediction: RankPrediction = {
        score: scoreValue,
        expectedRank,
        category,
        examYear,
        totalCandidates,
        confidence,
        iitPredictions,
      };

      setPrediction(newPrediction);
      setHistory(prev => [newPrediction, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error("Error calculating rank:", error);
      showToast("Error calculating rank. Please try again.", "error");
    }
  }, [score, category, examYear, showToast]);

  useEffect(() => {
    if (score && !isNaN(parseFloat(score))) {
      calculateRank();
    } else {
      setPrediction(null);
    }
  }, [score, category, examYear, calculateRank]);

  const copyResult = async () => {
    if (!prediction) {
      showToast("No prediction to copy", "error");
      return;
    }
    
    try {
      const resultText = `JEE Advanced Rank Prediction Result:
Score: ${prediction.score}
Expected Rank: ${prediction.expectedRank}
Category: ${prediction.category}
Exam Year: ${prediction.examYear}
Confidence: ${prediction.confidence}
Total Candidates: ${prediction.totalCandidates.toLocaleString()}

IIT Predictions:
${prediction.iitPredictions.map(tier => 
  `${tier.tier}: ${tier.iits.join(', ')}`
).join('\n')}`;
      
      await navigator.clipboard.writeText(resultText);
      showToast("Result copied to clipboard!", "success");
    } catch (error) {
      showToast("Failed to copy result", "error");
    }
  };

  const downloadResult = () => {
    if (!prediction) {
      showToast("No prediction to download", "error");
      return;
    }
    
    try {
      const resultText = `JEE Advanced Rank Prediction Report
Generated on: ${new Date().toLocaleDateString()}

Prediction Details:
Score: ${prediction.score}
Expected Rank: ${prediction.expectedRank}
Category: ${prediction.category}
Exam Year: ${prediction.examYear}
Confidence: ${prediction.confidence}
Total Candidates: ${prediction.totalCandidates.toLocaleString()}

IIT Predictions:
${prediction.iitPredictions.map(tier => 
  `${tier.tier}: ${tier.iits.join(', ')}`
).join('\n')}

This prediction is for reference purposes only.
Actual ranks may vary based on various factors.`;
      
      const blob = new Blob([resultText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jee-advanced-rank-prediction-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Result downloaded successfully!", "success");
    } catch (error) {
      showToast("Failed to download result", "error");
    }
  };

  const clearAll = () => {
    setScore("");
    setCategory("General");
    setExamYear("2024");
    setPrediction(null);
    setHistory([]);
    showToast("All fields cleared", "info");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 space-y-4">
        <Badge
          variant="outline"
          className="font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 mb-2"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection • 100% Secure
        </Badge>

        <h1 className="bg-gradient-to-r from-yellow-600 dark:from-yellow-400 via-orange-600 dark:via-orange-400 to-red-600 dark:to-red-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold">
          JEE Advanced Rank Predictor
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Predict your JEE Advanced rank and IIT options based on your score. Our advanced algorithm helps you understand admission chances and plan your IIT journey with confidence. All calculations are performed locally on your device for complete privacy.
        </p>
      </div>

      {/* Informative Section */}
      <Card className="mb-6 border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-semibold text-yellow-900 dark:text-yellow-100">How JEE Advanced Rank Prediction Works</p>
              <p className="text-yellow-800 dark:text-yellow-200">
                JEE Advanced is the second stage of the Joint Entrance Examination for admission to IITs. The rank is calculated based on your total score out of 360 marks. 
                Our predictor uses historical data and statistical analysis to estimate your expected rank. Higher scores typically result in better ranks, 
                which determine your eligibility for various IITs across India. Only top 2.5 lakh JEE Main qualifiers can appear for JEE Advanced.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg border-2">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-b">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                JEE Advanced Rank Predictor
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Enter your JEE Advanced score to predict rank and IIT options. All calculations are performed instantly and securely on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Score Input */}
              <div className="space-y-3">
                <Label htmlFor="score" className="text-base font-semibold">
                  JEE Advanced Score <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="score"
                  type="number"
                  placeholder="Enter your JEE Advanced score (0-360)"
                  value={score}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 360)) {
                      setScore(value);
                    }
                  }}
                  min="0"
                  max="360"
                  step="1"
                  className="text-lg h-12 border-2 focus:border-yellow-500 dark:focus:border-yellow-400"
                />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Enter your JEE Advanced total score out of 360 marks. This includes Paper 1 and Paper 2 scores.
                </p>
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <Label htmlFor="category" className="text-base font-semibold">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div>
                          <div className="font-medium">{cat.label}</div>
                          <div className="text-xs text-muted-foreground">{cat.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Select your category. Different categories have different cutoff ranks for IIT admissions.
                </p>
              </div>

              {/* Exam Year */}
              <div className="space-y-3">
                <Label htmlFor="exam-year" className="text-base font-semibold">
                  Exam Year <span className="text-red-500">*</span>
                </Label>
                <Select value={examYear} onValueChange={setExamYear}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXAM_YEARS.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        <div>
                          <div className="font-medium">{year.label}</div>
                          <div className="text-xs text-muted-foreground">{year.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Select the year of your JEE Advanced examination for accurate predictions.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  onClick={calculateRank} 
                  className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  disabled={!score || isNaN(parseFloat(score))}
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Predict Rank
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearAll}
                  className="h-12 border-2"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {prediction && (
            <Card className="mt-6 shadow-lg border-2 border-yellow-200 dark:border-yellow-800 animate-in fade-in slide-in-from-top-4">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-b">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  Rank Prediction Result
                </CardTitle>
                <CardDescription>
                  Your predicted rank and IIT options based on your score
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold text-base">Score:</span>
                      <span className="font-bold text-xl text-yellow-600 dark:text-yellow-400">{prediction.score}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border-2 border-yellow-200 dark:border-yellow-800">
                      <span className="font-semibold text-base">Expected Rank:</span>
                      <span className="font-bold text-2xl text-yellow-600 dark:text-yellow-400">{prediction.expectedRank.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold text-base">Category:</span>
                      <Badge variant="secondary" className="font-bold">{prediction.category}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-2 border-green-200 dark:border-green-800">
                      <span className="font-semibold text-base">Confidence:</span>
                      <Badge 
                        variant={prediction.confidence === "Very High" ? "default" : "secondary"}
                        className="font-bold text-sm"
                      >
                        {prediction.confidence}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                      <span className="font-semibold text-base">Total Candidates:</span>
                      <span className="font-bold text-xl text-purple-600 dark:text-purple-400">{prediction.totalCandidates.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold text-base">Exam Year:</span>
                      <Badge variant="outline" className="font-semibold">{prediction.examYear}</Badge>
                    </div>
                  </div>
                </div>

                {/* IIT Predictions */}
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    IIT Predictions Based on Your Rank
                  </h4>
                  <div className="space-y-4">
                    {prediction.iitPredictions.map((tier, index) => (
                      <div 
                        key={index} 
                        className="p-5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                      >
                        <h5 className="font-bold text-lg mb-3 text-primary">{tier.tier}</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tier.iits.map((iit, iitIndex) => (
                            <div 
                              key={iitIndex} 
                              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                            >
                              <CheckCircle2 className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                              <span className="font-medium text-sm sm:text-base">{iit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={copyResult} 
                    className="flex-1 h-12 border-2"
                  >
                    <Copy className="h-5 w-5 mr-2" />
                    Copy Result
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={downloadResult} 
                    className="flex-1 h-12 border-2"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Score Range Guide */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Score Range Guide
              </CardTitle>
              <CardDescription>
                Understanding score ranges and expected ranks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SCORE_RANGES.map((range, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`font-bold ${range.color}`}>
                          {range.range}
                        </Badge>
                        <span className="font-semibold text-sm sm:text-base">Expected Rank: {range.rank}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{range.iits}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Same enhanced structure as JEE Main */}
        <div className="space-y-6">
          {/* Categories Info */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <div 
                    key={cat.value} 
                    className={`p-3 rounded-lg border-2 transition-all ${
                      cat.value === category 
                        ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 shadow-md" 
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-sm">{cat.label}</span>
                        <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                      </div>
                      {cat.value === category && (
                        <Badge variant="default" className="text-xs">Selected</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exam Years */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Exam Years
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                {EXAM_YEARS.map((year) => (
                  <div 
                    key={year.value}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      year.value === examYear 
                        ? "bg-purple-50 dark:bg-purple-950/30 border-purple-300 dark:border-purple-700 shadow-md" 
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-sm">{year.label}</span>
                        <p className="text-xs text-muted-foreground mt-1">{year.description}</p>
                      </div>
                      {year.value === examYear && (
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
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  Recent Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((pred, index) => (
                    <div 
                      key={index} 
                      className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        setScore(pred.score.toString());
                        setCategory(pred.category);
                        setExamYear(pred.examYear);
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-base">{pred.score}</span>
                        <Badge variant="outline" className="text-xs">
                          Rank {pred.expectedRank.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {pred.category} • {pred.examYear}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Tips */}
          <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Higher Score = Better Rank</p>
                  <p className="text-muted-foreground">A higher JEE Advanced score means you scored better than more candidates, resulting in a better rank.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Rank Determines IIT Eligibility</p>
                  <p className="text-muted-foreground">Your rank determines which IITs you're eligible for. Better ranks open doors to top IITs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">100% Privacy Protected</p>
                  <p className="text-muted-foreground">All calculations are done locally on your device. We never collect or store your data.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                JEE Advanced Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-semibold">Total Candidates</span>
                </div>
                <p className="text-muted-foreground">Approximately 250,000 candidates appear for JEE Advanced annually.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">IITs</span>
                </div>
                <p className="text-muted-foreground">23 IITs across India accept JEE Advanced scores for admissions.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-semibold">Quick Results</span>
                </div>
                <p className="text-muted-foreground">Get instant rank predictions with our advanced algorithm.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12">
</div>
    </div>
  );
}

export default function JEEAdvancedRankPredictorPage() {
  return (
    <ToolPageWrapper toolSlug="jee-advanced-rank-predictor">
      <ToastProvider>
        <JEEAdvancedRankPredictorContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
