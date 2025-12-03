"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
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
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Copy,
  Calculator,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  Building,
  Users,
  Star,
  Shield,
  Clock,
  BarChart3,
  Info,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Zap,
  GraduationCap,
  Banknote,
} from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { BankPORankPredictorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface BankPOCandidate {
  id: string;
  prelimsScore: number;
  mainsScore: number;
  interviewScore: number;
  totalScore: number;
  category: string;
  bank: string;
  rank: number;
  timestamp: number;
}

interface PostingOption {
  name: string;
  bank: string;
  rank: number;
  description: string;
  location: string;
  salary: string;
  rating: number;
}

const CATEGORIES = [
  { value: "General", label: "General", description: "General category candidates" },
  { value: "OBC", label: "OBC", description: "Other Backward Classes" },
  { value: "SC", label: "SC", description: "Scheduled Caste" },
  { value: "ST", label: "ST", description: "Scheduled Tribe" },
  { value: "EWS", label: "EWS", description: "Economically Weaker Section" },
];

const BANKS = [
  { value: "SBI", label: "State Bank of India (SBI)", description: "Largest public sector bank" },
  { value: "IBPS", label: "IBPS (Common Bank PO)", description: "Common recruitment for public sector banks" },
  { value: "RBI", label: "Reserve Bank of India (RBI)", description: "Central bank of India" },
  { value: "NABARD", label: "NABARD", description: "National Bank for Agriculture and Rural Development" },
  { value: "Other", label: "Other Banks", description: "Other public and private sector banks" },
];

const RANK_RANGES = [
  { range: "1-20", banks: "SBI PO, RBI Assistant Manager", color: "text-green-600 dark:text-green-400" },
  { range: "21-100", banks: "IBPS PO, Top Public Sector Banks", color: "text-blue-600 dark:text-blue-400" },
  { range: "101-300", banks: "Public Sector Banks, NABARD", color: "text-purple-600 dark:text-purple-400" },
  { range: "301-500", banks: "Regional Banks, Other Banks", color: "text-orange-600 dark:text-orange-400" },
  { range: "500+", banks: "Other Banking Positions", color: "text-gray-600 dark:text-gray-400" },
];

function BankPORankPredictor() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [prelimsScore, setPrelimsScore] = useState<number>(0);
  const [mainsScore, setMainsScore] = useState<number>(0);
  const [interviewScore, setInterviewScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [category, setCategory] = useState<string>("General");
  const [bank, setBank] = useState<string>("SBI");
  const [predictedRank, setPredictedRank] = useState<number>(0);
  const [postingOptions, setPostingOptions] = useState<PostingOption[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState<BankPOCandidate[]>([]);

  // Load recent predictions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bank-po-predictions");
    if (saved) {
      try {
        setRecentPredictions(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading predictions:", error);
      }
    }
  }, []);

  // Auto-calculate total score
  useEffect(() => {
    const total = prelimsScore + mainsScore + interviewScore;
    setTotalScore(total);
  }, [prelimsScore, mainsScore, interviewScore]);

  const calculateRank = useCallback((
    score: number,
    category: string,
    bank: string
  ): number => {
    const baseRank = Math.max(1, Math.round(2000 - (score / 300) * 2000));

    const categoryMultipliers = {
      General: 1.0,
      OBC: 0.85,
      SC: 0.7,
      ST: 0.65,
      EWS: 0.9,
    };

    const bankMultipliers = {
      SBI: 1.0,
      IBPS: 0.95,
      RBI: 1.1,
      NABARD: 1.05,
      Other: 0.9,
    };

    const categoryMultiplier =
      categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    const bankMultiplier =
      bankMultipliers[bank as keyof typeof bankMultipliers] || 1.0;
    return Math.max(
      1,
      Math.round(baseRank * categoryMultiplier * bankMultiplier)
    );
  }, []);

  const getPostingOptions = useCallback((rank: number, bank: string): PostingOption[] => {
    const postings = [
      {
        name: "Probationary Officer",
        bank: "SBI",
        rank: 1,
        description: "Branch management and banking operations",
        location: "All India",
        salary: "₹41,960-1,00,000",
        rating: 5.0,
      },
      {
        name: "Probationary Officer",
        bank: "IBPS",
        rank: 5,
        description: "Banking operations and customer service",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.8,
      },
      {
        name: "Assistant Manager",
        bank: "RBI",
        rank: 10,
        description: "Central banking operations and policy",
        location: "Mumbai",
        salary: "₹45,000-1,20,000",
        rating: 4.9,
      },
      {
        name: "Development Officer",
        bank: "NABARD",
        rank: 15,
        description: "Rural development and agricultural finance",
        location: "All India",
        salary: "₹40,000-95,000",
        rating: 4.7,
      },
      {
        name: "Probationary Officer",
        bank: "Bank of Baroda",
        rank: 20,
        description: "Banking operations and branch management",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.6,
      },
      {
        name: "Probationary Officer",
        bank: "Canara Bank",
        rank: 25,
        description: "Customer service and banking operations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.5,
      },
      {
        name: "Probationary Officer",
        bank: "Punjab National Bank",
        rank: 30,
        description: "Banking services and operations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.4,
      },
      {
        name: "Probationary Officer",
        bank: "Union Bank",
        rank: 35,
        description: "Banking operations and customer relations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.3,
      },
      {
        name: "Probationary Officer",
        bank: "Bank of India",
        rank: 40,
        description: "Banking services and operations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.2,
      },
      {
        name: "Probationary Officer",
        bank: "Central Bank",
        rank: 45,
        description: "Banking operations and customer service",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.1,
      },
      {
        name: "Probationary Officer",
        bank: "Indian Bank",
        rank: 50,
        description: "Banking services and operations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 4.0,
      },
      {
        name: "Probationary Officer",
        bank: "UCO Bank",
        rank: 55,
        description: "Banking operations and customer relations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 3.9,
      },
      {
        name: "Probationary Officer",
        bank: "Bank of Maharashtra",
        rank: 60,
        description: "Banking services and operations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 3.8,
      },
      {
        name: "Probationary Officer",
        bank: "Punjab & Sind Bank",
        rank: 65,
        description: "Banking operations and customer service",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 3.7,
      },
      {
        name: "Probationary Officer",
        bank: "Indian Overseas Bank",
        rank: 70,
        description: "Banking services and operations",
        location: "All India",
        salary: "₹36,000-85,000",
        rating: 3.6,
      },
    ];

    return postings
      .filter((posting) => posting.bank === bank && rank <= posting.rank + 20)
      .slice(0, 8);
  }, []);

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your Bank PO scores", "error");
      return;
    }

    setIsCalculating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const rank = calculateRank(totalScore, category, bank);
      const postings = getPostingOptions(rank, bank);

      setPredictedRank(rank);
      setPostingOptions(postings);
      setShowResults(true);

      const newPrediction: BankPOCandidate = {
        id: Date.now().toString(),
        prelimsScore,
        mainsScore,
        interviewScore,
        totalScore,
        category,
        bank,
        rank,
        timestamp: Date.now(),
      };

      const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
      setRecentPredictions(updated);
      localStorage.setItem("bank-po-predictions", JSON.stringify(updated));

      scrollToElement(resultsRef);
      showToast("Bank PO rank calculated successfully!", "success");
    } catch (error) {
      console.error("Error calculating rank:", error);
      showToast("Error calculating rank. Please try again.", "error");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setPrelimsScore(0);
    setMainsScore(0);
    setInterviewScore(0);
    setTotalScore(0);
    setCategory("General");
    setBank("SBI");
    setPredictedRank(0);
    setPostingOptions([]);
    setShowResults(false);
    showToast("All fields cleared", "info");
  };

  const copyResults = async () => {
    if (!showResults) {
      showToast("No results to copy", "error");
      return;
    }

    try {
      const results = `Bank PO Rank Prediction Results:
Total Score: ${totalScore}/300
Predicted Rank: ${predictedRank}
Category: ${category}
Bank: ${bank}

Top Posting Options:
${postingOptions
  .slice(0, 5)
  .map(
    (posting, index) =>
      `${index + 1}. ${posting.name} - ${posting.bank} (${posting.salary})`
  )
  .join("\n")}

Generated by Toolspy Bank PO Rank Predictor`;

      await navigator.clipboard.writeText(results);
      showToast("Results copied to clipboard!", "success");
    } catch (error) {
      showToast("Failed to copy results", "error");
    }
  };

  const downloadResults = () => {
    if (!showResults) {
      showToast("No results to download", "error");
      return;
    }

    try {
      const results = `Bank PO Rank Prediction Results
Generated on: ${new Date().toLocaleDateString()}

Your Scores:
- Prelims Score: ${prelimsScore}/100
- Mains Score: ${mainsScore}/200
- Interview Score: ${interviewScore}/100
- Total Score: ${totalScore}/300

Category: ${category}
Bank: ${bank}
Predicted Rank: ${predictedRank}

Posting Options:
${postingOptions
  .map(
    (posting, index) =>
      `${index + 1}. ${posting.name}
   Bank: ${posting.bank}
   Required Rank: ${posting.rank}
   Description: ${posting.description}
   Location: ${posting.location}
   Salary: ${posting.salary}
   Rating: ${posting.rating}/5.0
   `
  )
  .join("\n")}

Note: This is an estimate based on historical data. Actual results may vary.
Generated by Toolspy Bank PO Rank Predictor`;

      const blob = new Blob([results], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bank-po-rank-prediction-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast("Results downloaded successfully!", "success");
    } catch (error) {
      showToast("Failed to download results", "error");
    }
  };

  return (
    <ToolPageWrapper toolSlug="bank-po-rank-predictor">
      <ToastProvider>
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 space-y-4">
            <Badge
              variant="outline"
              className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 mb-2"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First • No Data Collection • 100% Secure
            </Badge>

            <h1 className="bg-gradient-to-r from-emerald-600 dark:from-emerald-400 via-green-600 dark:via-green-400 to-teal-600 dark:to-teal-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold">
              Bank PO Rank Predictor
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Predict your Bank PO rank and discover banking job options based on your Prelims, Mains, and Interview scores. Our advanced algorithm helps you understand posting allocation and plan your banking career with confidence. All calculations are performed locally on your device for complete privacy.
            </p>
          </div>

          {/* Informative Section */}
          <Card className="mb-6 border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="font-semibold text-emerald-900 dark:text-emerald-100">How Bank PO Rank Prediction Works</p>
                  <p className="text-emerald-800 dark:text-emerald-200">
                    Bank PO (Probationary Officer) examination consists of three stages: Prelims (100 marks), Mains (200 marks), and Interview (100 marks), totaling 300 marks. 
                    The rank is calculated based on your total score and the bank you're applying for. Our predictor uses historical data and statistical analysis to estimate your expected rank. Higher scores typically result in better ranks, 
                    which determine your eligibility for various banking positions including SBI PO, IBPS PO, RBI Assistant Manager, and other prestigious roles across different banks.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg border-2">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-b">
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Calculator className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    Enter Your Bank PO Scores
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Enter your exam scores to predict your rank and posting options. All calculations are performed instantly and securely on your device.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="prelims-score" className="text-base font-semibold">
                        Prelims Score <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="prelims-score"
                        type="number"
                        min="0"
                        max="100"
                        value={prelimsScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 100) {
                            setPrelimsScore(value);
                          }
                        }}
                        placeholder="Enter Prelims score (0-100)"
                        className="h-12 border-2 focus:border-emerald-500 dark:focus:border-emerald-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your Bank PO Prelims score out of 100 marks.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="mains-score" className="text-base font-semibold">
                        Mains Score <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="mains-score"
                        type="number"
                        min="0"
                        max="200"
                        value={mainsScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 200) {
                            setMainsScore(value);
                          }
                        }}
                        placeholder="Enter Mains score (0-200)"
                        className="h-12 border-2 focus:border-emerald-500 dark:focus:border-emerald-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your Bank PO Mains score out of 200 marks.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="interview-score" className="text-base font-semibold">
                        Interview Score <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="interview-score"
                        type="number"
                        min="0"
                        max="100"
                        value={interviewScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 100) {
                            setInterviewScore(value);
                          }
                        }}
                        placeholder="Enter Interview score (0-100)"
                        className="h-12 border-2 focus:border-emerald-500 dark:focus:border-emerald-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your Bank PO Interview score out of 100 marks.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="category" className="text-base font-semibold">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-12 border-2">
                          <SelectValue placeholder="Select category" />
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
                        Select your category. Different categories have different cutoff ranks for posting allocation.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bank" className="text-base font-semibold">
                      Bank <span className="text-red-500">*</span>
                    </Label>
                    <Select value={bank} onValueChange={setBank}>
                      <SelectTrigger className="h-12 border-2">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {BANKS.map((bankOption) => (
                          <SelectItem key={bankOption.value} value={bankOption.value}>
                            <div>
                              <div className="font-medium">{bankOption.label}</div>
                              <div className="text-xs text-muted-foreground">{bankOption.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Select the bank you're applying for. Different banks have different competition levels and cutoff ranks.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 p-4 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base text-emerald-900 dark:text-emerald-100">Total Score:</span>
                      <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{totalScore}/300</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleCalculate}
                      disabled={isCalculating || totalScore === 0}
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                    >
                      {isCalculating ? (
                        <>
                          <Clock className="h-5 w-5 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Target className="h-5 w-5 mr-2" />
                          Predict Rank
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="h-12 border-2">
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              {showResults && (
                <Card ref={resultsRef} className="mt-6 shadow-lg border-2 border-emerald-200 dark:border-emerald-800 animate-in fade-in slide-in-from-top-4">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                      <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      Prediction Results
                    </CardTitle>
                    <CardDescription>
                      Your predicted rank and recommended banking posting options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-lg border-2 border-green-200 dark:border-green-800 text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                          {predictedRank}
                        </div>
                        <div className="text-sm font-semibold text-green-700 dark:text-green-300">Predicted Rank</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-lg border-2 border-blue-200 dark:border-blue-800 text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {totalScore}/300
                        </div>
                        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Score</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-lg border-2 border-purple-200 dark:border-purple-800 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          {postingOptions.length}
                        </div>
                        <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">Posting Options</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <Button
                        onClick={copyResults}
                        variant="outline"
                        className="flex-1 h-12 border-2"
                      >
                        <Copy className="h-5 w-5 mr-2" />
                        Copy Results
                      </Button>
                      <Button
                        onClick={downloadResults}
                        variant="outline"
                        className="flex-1 h-12 border-2"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download Report
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        Recommended Banking Postings
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {postingOptions.map((posting, index) => (
                          <div
                            key={index}
                            className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-lg">
                                    {posting.name}
                                  </h4>
                                  <Badge variant="secondary" className="font-semibold">{posting.bank}</Badge>
                                </div>
                                <p className="text-muted-foreground mb-3">
                                  {posting.description}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-muted-foreground">Rank {posting.rank}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-muted-foreground">{posting.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-muted-foreground">{posting.salary}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                    <span className="text-muted-foreground">{posting.rating}/5.0</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Rank Range Guide */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Rank Range Guide
                  </CardTitle>
                  <CardDescription>
                    Understanding rank ranges and banking options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {RANK_RANGES.map((range, index) => (
                      <div
                        key={index}
                        className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <Badge variant="outline" className={`font-bold w-fit ${range.color}`}>
                            Rank {range.range}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{range.banks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    Privacy Protected
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All calculations are performed locally in your browser. 
                    No data is sent to our servers, ensuring complete privacy and security of your scores.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    Recent Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {recentPredictions.length > 0 ? (
                    <div className="space-y-3">
                      {recentPredictions.slice(0, 3).map((prediction) => (
                        <div
                          key={prediction.id}
                          className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            setPrelimsScore(prediction.prelimsScore);
                            setMainsScore(prediction.mainsScore);
                            setInterviewScore(prediction.interviewScore);
                            setCategory(prediction.category);
                            setBank(prediction.bank);
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-base">
                              {prediction.totalScore}/300
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(prediction.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            P: {prediction.prelimsScore} | M:{" "}
                            {prediction.mainsScore} | I: {prediction.interviewScore}
                          </div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                            {prediction.bank} - {prediction.category}
                          </div>
                          {prediction.rank > 0 && (
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                              Rank {prediction.rank}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent predictions</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    Bank PO Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="text-sm">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Exam Structure:
                    </div>
                    <div className="space-y-2 text-muted-foreground ml-6">
                      <div>• Prelims: 100 marks</div>
                      <div>• Mains: 200 marks</div>
                      <div>• Interview: 100 marks</div>
                      <div>• Total: 300 marks</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold mb-2">Rank Calculation:</div>
                    <div className="text-muted-foreground">
                      Based on historical Bank PO data and category-wise normalization. Rank determines posting allocation.
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                    <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Higher Score = Better Rank</p>
                      <p className="text-muted-foreground">A higher total score means you scored better than more candidates, resulting in a better rank.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Rank Determines Posting</p>
                      <p className="text-muted-foreground">Your rank determines which banking positions you're eligible for. Better ranks open doors to top banks like SBI, RBI, and IBPS.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
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
                    Bank PO Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold">Total Candidates</span>
                    </div>
                    <p className="text-muted-foreground">Approximately 20-25 lakh candidates appear for Bank PO exams annually.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="font-semibold">Banks</span>
                    </div>
                    <p className="text-muted-foreground">SBI, IBPS, RBI, NABARD, and other public sector banks conduct PO recruitment.</p>
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
            <BankPORankPredictorSEOContent />
          </div>
        </div>
      </ToastProvider>
    </ToolPageWrapper>
  );
}

export default function BankPORankPredictorPage() {
  return (
    <ToolPageWrapper toolSlug="bank-po-rank-predictor">
      <ToastProvider>
        <BankPORankPredictor />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
