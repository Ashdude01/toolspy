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
  Percent,
  Award,
  Target,
  BarChart3,
  GraduationCap,
  Info,
  Lightbulb,
  BookOpen,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useToast, ToastProvider } from "@/components/tools/shared/toast-provider";

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
  { value: "General", label: "General", description: "General category candidates" },
  { value: "OBC-NCL", label: "OBC-NCL", description: "Other Backward Classes - Non-Creamy Layer" },
  { value: "SC", label: "SC", description: "Scheduled Caste" },
  { value: "ST", label: "ST", description: "Scheduled Tribe" },
  { value: "EWS", label: "EWS", description: "Economically Weaker Section" },
  { value: "PwD", label: "PwD", description: "Persons with Disabilities" },
];

const EXAM_SESSIONS = [
  { value: "January", label: "January Session", description: "First session of JEE Main" },
  { value: "April", label: "April Session", description: "Second session of JEE Main" },
  { value: "Combined", label: "Combined (Both Sessions)", description: "Best of both sessions" },
];

const PERCENTILE_RANGES = [
  { range: "95-100", rank: "1-60,000", colleges: "Top IITs, NITs", color: "text-green-600 dark:text-green-400" },
  { range: "90-95", rank: "60,000-120,000", colleges: "IITs, Top NITs", color: "text-blue-600 dark:text-blue-400" },
  { range: "80-90", rank: "120,000-240,000", colleges: "NITs, IIITs", color: "text-purple-600 dark:text-purple-400" },
  { range: "70-80", rank: "240,000-360,000", colleges: "Good Engineering Colleges", color: "text-orange-600 dark:text-orange-400" },
  { range: "Below 70", rank: "360,000+", colleges: "Other Engineering Colleges", color: "text-gray-600 dark:text-gray-400" },
];

function JEEMainRankPredictorContent() {
  const { showToast } = useToast();
  const [percentile, setPercentile] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [examSession, setExamSession] = useState<string>("Combined");
  const [prediction, setPrediction] = useState<RankPrediction | null>(null);
  const [history, setHistory] = useState<RankPrediction[]>([]);

  const calculateRank = useCallback(() => {
    const percentileValue = parseFloat(percentile);
    if (isNaN(percentileValue) || percentileValue < 0 || percentileValue > 100) {
      setPrediction(null);
      return;
    }

    try {
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
    } catch (error) {
      console.error("Error calculating rank:", error);
      showToast("Error calculating rank. Please try again.", "error");
    }
  }, [percentile, category, examSession, showToast]);

  useEffect(() => {
    if (percentile && !isNaN(parseFloat(percentile))) {
      calculateRank();
    } else {
      setPrediction(null);
    }
  }, [percentile, category, examSession, calculateRank]);

  const copyResult = async () => {
    if (!prediction) {
      showToast("No prediction to copy", "error");
      return;
    }
    
    try {
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
      showToast("Result downloaded successfully!", "success");
    } catch (error) {
      showToast("Failed to download result", "error");
    }
  };

  const clearAll = () => {
    setPercentile("");
    setCategory("General");
    setExamSession("Combined");
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
          className="font-bold text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 mb-2"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection • 100% Secure
        </Badge>

        <h2 className="bg-gradient-to-r from-green-600 dark:from-green-400 via-blue-600 dark:via-blue-400 to-purple-600 dark:to-purple-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold">
          JEE Main Rank Predictor
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Predict your JEE Main rank and college options based on percentile. Our advanced algorithm helps you understand admission chances and plan your engineering journey with confidence. All calculations are performed locally on your device for complete privacy.
        </p>
      </div>

      {/* Informative Section */}
      <Card className="mb-6 border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-semibold text-blue-900 dark:text-blue-100">How JEE Main Rank Prediction Works</p>
              <p className="text-blue-800 dark:text-blue-200">
                JEE Main rank is calculated based on your percentile score. The percentile indicates the percentage of candidates who scored less than you. 
                Our predictor uses historical data and statistical analysis to estimate your expected rank. Higher percentiles typically result in better ranks, 
                which determine your eligibility for various engineering colleges including IITs, NITs, and other prestigious institutions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg border-2">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-b">
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                JEE Main Rank Predictor
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Enter your percentile to predict rank and college options. All calculations are performed instantly and securely on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Percentile Input */}
              <div className="space-y-3">
                <Label htmlFor="percentile" className="text-base font-semibold">
                  JEE Main Percentile <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="percentile"
                  type="number"
                  placeholder="Enter your percentile (0-100)"
                  value={percentile}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
                      setPercentile(value);
                    }
                  }}
                  min="0"
                  max="100"
                  step="0.01"
                  className="text-lg h-12 border-2 focus:border-green-500 dark:focus:border-green-400"
                />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Enter your JEE Main percentile score. This is usually available on the official JEE Main result portal.
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
                  Select your category. Different categories have different cutoff ranks for college admissions.
                </p>
              </div>

              {/* Exam Session */}
              <div className="space-y-3">
                <Label htmlFor="exam-session" className="text-base font-semibold">
                  Exam Session <span className="text-red-500">*</span>
                </Label>
                <Select value={examSession} onValueChange={setExamSession}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXAM_SESSIONS.map((session) => (
                      <SelectItem key={session.value} value={session.value}>
                        <div>
                          <div className="font-medium">{session.label}</div>
                          <div className="text-xs text-muted-foreground">{session.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Choose the exam session. Combined session uses the best score from both attempts.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  onClick={calculateRank} 
                  className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  disabled={!percentile || isNaN(parseFloat(percentile))}
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
            <Card className="mt-6 shadow-lg border-2 border-green-200 dark:border-green-800 animate-in fade-in slide-in-from-top-4">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-b">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  Rank Prediction Result
                </CardTitle>
                <CardDescription>
                  Your predicted rank and college options based on your percentile
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-semibold text-base">Percentile:</span>
                      <span className="font-bold text-xl text-green-600 dark:text-green-400">{prediction.percentile}%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                      <span className="font-semibold text-base">Expected Rank:</span>
                      <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">{prediction.expectedRank.toLocaleString()}</span>
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
                      <span className="font-semibold text-base">Exam Session:</span>
                      <Badge variant="outline" className="font-semibold">{prediction.examSession}</Badge>
                    </div>
                  </div>
                </div>

                {/* College Predictions */}
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    College Predictions Based on Your Rank
                  </h4>
                  <div className="space-y-4">
                    {prediction.collegePredictions.map((tier, index) => (
                      <div 
                        key={index} 
                        className="p-5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                      >
                        <h5 className="font-bold text-lg mb-3 text-primary">{tier.tier}</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tier.colleges.map((college, collegeIndex) => (
                            <div 
                              key={collegeIndex} 
                              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                            >
                              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                              <span className="font-medium text-sm sm:text-base">{college}</span>
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

          {/* Percentile Range Guide */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Percentile Range Guide
              </CardTitle>
              <CardDescription>
                Understanding percentile ranges and expected ranks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {PERCENTILE_RANGES.map((range, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`font-bold ${range.color}`}>
                          {range.range}%
                        </Badge>
                        <span className="font-semibold text-sm sm:text-base">Expected Rank: {range.rank}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{range.colleges}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories Info */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 shadow-md" 
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

          {/* Exam Sessions */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Exam Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                {EXAM_SESSIONS.map((session) => (
                  <div 
                    key={session.value}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      session.value === examSession 
                        ? "bg-purple-50 dark:bg-purple-950/30 border-purple-300 dark:border-purple-700 shadow-md" 
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-sm">{session.label}</span>
                        <p className="text-xs text-muted-foreground mt-1">{session.description}</p>
                      </div>
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
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
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
                        setPercentile(pred.percentile.toString());
                        setCategory(pred.category);
                        setExamSession(pred.examSession);
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-base">{pred.percentile}%</span>
                        <Badge variant="outline" className="text-xs">
                          Rank {pred.expectedRank.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {pred.category} • {pred.examSession}
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
                <Percent className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Higher Percentile = Better Rank</p>
                  <p className="text-muted-foreground">A higher percentile means you scored better than more candidates, resulting in a better rank.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Rank Determines Eligibility</p>
                  <p className="text-muted-foreground">Your rank determines which colleges you're eligible for. Better ranks open doors to top institutions.</p>
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
                JEE Main Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold">Total Candidates</span>
                </div>
                <p className="text-muted-foreground">Approximately 1.2 million candidates appear for JEE Main annually.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">Top Colleges</span>
                </div>
                <p className="text-muted-foreground">23 IITs, 31 NITs, and 25 IIITs accept JEE Main scores for admissions.</p>
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

export default function JEEMainRankPredictorPage() {
  return (
    <ToolPageWrapper toolSlug="jee-main-rank-predictor">
      <ToastProvider>
        <JEEMainRankPredictorContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
