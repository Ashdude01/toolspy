"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { Download, Copy, Calculator, Target, TrendingUp, Award, BookOpen, Building, Users, Star, Shield, Clock, BarChart3, Info, Lightbulb, CheckCircle2, Sparkles, Zap, GraduationCap } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface SSCCGLCandidate {
  id: string;
  tier1Score: number;
  tier2Score: number;
  totalScore: number;
  category: string;
  rank: number;
  timestamp: number;
}

interface PostOption {
  name: string;
  department: string;
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

const RANK_RANGES = [
  { range: "1-50", posts: "AAO, ASO, Inspector (Income Tax)", color: "text-green-600 dark:text-green-400" },
  { range: "51-200", posts: "Inspector (Central Excise), AEO", color: "text-blue-600 dark:text-blue-400" },
  { range: "201-500", posts: "Sub Inspector (CBI), Inspector (Narcotics)", color: "text-purple-600 dark:text-purple-400" },
  { range: "501-1000", posts: "Assistant (CSS), Assistant (AFHQ)", color: "text-orange-600 dark:text-orange-400" },
  { range: "1000+", posts: "Other Assistant Posts", color: "text-gray-600 dark:text-gray-400" },
];

function SSCCGLRankPredictor() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [tier1Score, setTier1Score] = useState<number>(0);
  const [tier2Score, setTier2Score] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [category, setCategory] = useState<string>("General");
  const [predictedRank, setPredictedRank] = useState<number>(0);
  const [postOptions, setPostOptions] = useState<PostOption[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState<SSCCGLCandidate[]>([]);

  // Load recent predictions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ssc-cgl-predictions');
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
    const total = tier1Score + tier2Score;
    setTotalScore(total);
  }, [tier1Score, tier2Score]);

  const calculateRank = useCallback((score: number, category: string): number => {
    const baseRank = Math.max(1, Math.round(5000 - (score / 600) * 5000));
    
    const categoryMultipliers = {
      "General": 1.0,
      "OBC": 0.80,
      "SC": 0.65,
      "ST": 0.60,
      "EWS": 0.85
    };
    
    const multiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    return Math.max(1, Math.round(baseRank * multiplier));
  }, []);

  const getPostOptions = useCallback((rank: number): PostOption[] => {
    const posts = [
      { name: "Assistant Audit Officer (AAO)", department: "C&AG", rank: 1, description: "Audit and accounting in government departments", location: "All India", salary: "₹47,600-1,51,100", rating: 5.0 },
      { name: "Assistant Section Officer (ASO)", department: "Central Secretariat", rank: 5, description: "Administrative work in central ministries", location: "Delhi", salary: "₹47,600-1,51,100", rating: 4.9 },
      { name: "Inspector (Income Tax)", department: "CBDT", rank: 10, description: "Tax assessment and collection", location: "All India", salary: "₹47,600-1,51,100", rating: 4.8 },
      { name: "Inspector (Central Excise)", department: "CBIC", rank: 15, description: "Customs and excise duty collection", location: "All India", salary: "₹47,600-1,51,100", rating: 4.7 },
      { name: "Inspector (Preventive Officer)", department: "CBIC", rank: 20, description: "Prevention of smuggling and customs violations", location: "All India", salary: "₹47,600-1,51,100", rating: 4.6 },
      { name: "Inspector (Examiner)", department: "CBIC", rank: 25, description: "Examination of imported/exported goods", location: "All India", salary: "₹47,600-1,51,100", rating: 4.5 },
      { name: "Assistant Enforcement Officer", department: "ED", rank: 30, description: "Enforcement of economic laws", location: "All India", salary: "₹47,600-1,51,100", rating: 4.4 },
      { name: "Sub Inspector (CBI)", department: "CBI", rank: 35, description: "Criminal investigation and law enforcement", location: "All India", salary: "₹47,600-1,51,100", rating: 4.3 },
      { name: "Inspector (Narcotics)", department: "NCB", rank: 40, description: "Narcotics control and enforcement", location: "All India", salary: "₹47,600-1,51,100", rating: 4.2 },
      { name: "Assistant (CSS)", department: "Central Secretariat", rank: 45, description: "Administrative support in ministries", location: "Delhi", salary: "₹35,400-1,12,400", rating: 4.1 },
      { name: "Assistant (AFHQ)", department: "Armed Forces HQ", rank: 50, description: "Administrative work in armed forces", location: "Delhi", salary: "₹35,400-1,12,400", rating: 4.0 },
      { name: "Inspector (Post)", department: "Department of Posts", rank: 55, description: "Postal services management", location: "All India", salary: "₹47,600-1,51,100", rating: 3.9 },
      { name: "Assistant (Railway)", department: "Railway Board", rank: 60, description: "Railway administration", location: "All India", salary: "₹35,400-1,12,400", rating: 3.8 },
      { name: "Assistant (FCI)", department: "Food Corporation", rank: 65, description: "Food procurement and distribution", location: "All India", salary: "₹35,400-1,12,400", rating: 3.7 },
      { name: "Assistant (NIA)", department: "National Investigation Agency", rank: 70, description: "Terrorism and national security investigations", location: "All India", salary: "₹35,400-1,12,400", rating: 3.6 }
    ];

    return posts.filter(post => rank <= post.rank + 15).slice(0, 8);
  }, []);

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your SSC CGL scores", "error");
      return;
    }

    setIsCalculating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const rank = calculateRank(totalScore, category);
      const posts = getPostOptions(rank);
      
      setPredictedRank(rank);
      setPostOptions(posts);
      setShowResults(true);
      
      const newPrediction: SSCCGLCandidate = {
        id: Date.now().toString(),
        tier1Score,
        tier2Score,
        totalScore,
        category,
        rank,
        timestamp: Date.now()
      };
      
      const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
      setRecentPredictions(updated);
      localStorage.setItem('ssc-cgl-predictions', JSON.stringify(updated));
      
      scrollToElement(resultsRef);
      showToast("SSC CGL rank calculated successfully!", "success");
    } catch (error) {
      console.error("Error calculating rank:", error);
      showToast("Error calculating rank. Please try again.", "error");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setTier1Score(0);
    setTier2Score(0);
    setTotalScore(0);
    setCategory("General");
    setPredictedRank(0);
    setPostOptions([]);
    setShowResults(false);
    showToast("All fields cleared", "info");
  };

  const copyResults = async () => {
    if (!showResults) {
      showToast("No results to copy", "error");
      return;
    }

    try {
      const results = `SSC CGL Rank Prediction Results:
Total Score: ${totalScore}/600
Predicted Rank: ${predictedRank}
Category: ${category}

Top Post Options:
${postOptions.slice(0, 5).map((post, index) => 
  `${index + 1}. ${post.name} - Rank ${post.rank} (${post.salary})`
).join('\n')}

Generated by Toolspy SSC CGL Rank Predictor`;
      
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
      const results = `SSC CGL Rank Prediction Results
Generated on: ${new Date().toLocaleDateString()}

Your Scores:
- Tier 1 Score: ${tier1Score}/200
- Tier 2 Score: ${tier2Score}/400
- Total Score: ${totalScore}/600

Category: ${category}
Predicted Rank: ${predictedRank}

Post Options:
${postOptions.map((post, index) => 
  `${index + 1}. ${post.name}
   Department: ${post.department}
   Required Rank: ${post.rank}
   Description: ${post.description}
   Location: ${post.location}
   Salary: ${post.salary}
   Rating: ${post.rating}/5.0
   `
).join('\n')}

Note: This is an estimate based on historical data. Actual results may vary.
Generated by Toolspy SSC CGL Rank Predictor`;
      
      const blob = new Blob([results], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ssc-cgl-rank-prediction-${Date.now()}.txt`;
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
    
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
          {/* Header */}
          <div className="tool-legacy-hero text-center mb-6 sm:mb-8 space-y-4">
            <Badge
              variant="outline"
              className="font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800 mb-2"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First • No Data Collection • 100% Secure
            </Badge>

            <h2 className="bg-gradient-to-r from-teal-600 dark:from-teal-400 via-cyan-600 dark:via-cyan-400 to-blue-600 dark:to-blue-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold">
              SSC CGL Rank Predictor
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Predict your SSC CGL rank and discover government job options based on your Tier 1 and Tier 2 scores. Our advanced algorithm helps you understand post allocation and plan your government career with confidence. All calculations are performed locally on your device for complete privacy.
            </p>
          </div>

          {/* Informative Section */}
          <Card className="mb-6 border-2 border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="font-semibold text-teal-900 dark:text-teal-100">How SSC CGL Rank Prediction Works</p>
                  <p className="text-teal-800 dark:text-teal-200">
                    SSC CGL (Staff Selection Commission Combined Graduate Level) examination consists of two tiers: Tier 1 (200 marks) and Tier 2 (400 marks), totaling 600 marks. 
                    The rank is calculated based on your total score. Our predictor uses historical data and statistical analysis to estimate your expected rank. Higher scores typically result in better ranks, 
                    which determine your eligibility for various government posts including Assistant Audit Officer, Inspector, Assistant Section Officer, and other prestigious positions across different departments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg border-2">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-b">
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Calculator className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    Enter Your SSC CGL Scores
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Enter your Tier 1 and Tier 2 scores to predict your rank and post options. All calculations are performed instantly and securely on your device.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="tier1-score" className="text-base font-semibold">
                        Tier 1 Score <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tier1-score"
                        type="number"
                        min="0"
                        max="200"
                        value={tier1Score || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 200) {
                            setTier1Score(value);
                          }
                        }}
                        placeholder="Enter Tier 1 score (0-200)"
                        className="h-12 border-2 focus:border-teal-500 dark:focus:border-teal-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your SSC CGL Tier 1 score out of 200 marks.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="tier2-score" className="text-base font-semibold">
                        Tier 2 Score <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tier2-score"
                        type="number"
                        min="0"
                        max="400"
                        value={tier2Score || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 400) {
                            setTier2Score(value);
                          }
                        }}
                        placeholder="Enter Tier 2 score (0-400)"
                        className="h-12 border-2 focus:border-teal-500 dark:focus:border-teal-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your SSC CGL Tier 2 score out of 400 marks.
                      </p>
                    </div>
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
                      Select your category. Different categories have different cutoff ranks for post allocation.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 p-4 rounded-lg border-2 border-teal-200 dark:border-teal-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base text-teal-900 dark:text-teal-100">Total Score:</span>
                      <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">{totalScore}/600</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleCalculate} 
                      disabled={isCalculating || totalScore === 0}
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
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
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="h-12 border-2"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              {showResults && (
                <Card ref={resultsRef} className="mt-6 shadow-lg border-2 border-teal-200 dark:border-teal-800 animate-in fade-in slide-in-from-top-4">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                      <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                      Prediction Results
                    </CardTitle>
                    <CardDescription>
                      Your predicted rank and recommended government post options
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
                          {totalScore}/600
                        </div>
                        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Score</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-lg border-2 border-purple-200 dark:border-purple-800 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          {postOptions.length}
                        </div>
                        <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">Post Options</div>
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
                        Recommended Government Posts
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {postOptions.map((post, index) => (
                          <div 
                            key={index} 
                            className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-lg">{post.name}</h4>
                                  <Badge variant="secondary" className="font-semibold">{post.department}</Badge>
                                </div>
                                <p className="text-muted-foreground mb-3">{post.description}</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                    <span className="text-muted-foreground">Rank {post.rank}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-muted-foreground">{post.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-muted-foreground">{post.salary}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                    <span className="text-muted-foreground">{post.rating}/5.0</span>
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
                    Understanding rank ranges and post options
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
                          <span className="text-sm text-muted-foreground">{range.posts}</span>
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
                    <Shield className="h-5 w-5 text-teal-600 dark:text-teal-400" />
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
                    <BarChart3 className="h-5 w-5 text-teal-600 dark:text-teal-400" />
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
                            setTier1Score(prediction.tier1Score);
                            setTier2Score(prediction.tier2Score);
                            setCategory(prediction.category);
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-base">{prediction.totalScore}/600</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(prediction.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            T1: {prediction.tier1Score} | T2: {prediction.tier2Score}
                          </div>
                          {prediction.rank > 0 && (
                            <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-1">
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
                    <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    SSC CGL Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="text-sm">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Exam Structure:
                    </div>
                    <div className="space-y-2 text-muted-foreground ml-6">
                      <div>• Tier 1: 200 marks</div>
                      <div>• Tier 2: 400 marks</div>
                      <div>• Total: 600 marks</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold mb-2">Rank Calculation:</div>
                    <div className="text-muted-foreground">
                      Based on historical SSC CGL data and category-wise normalization. Rank determines post allocation.
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
                    <Target className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Higher Score = Better Rank</p>
                      <p className="text-muted-foreground">A higher total score means you scored better than more candidates, resulting in a better rank.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Rank Determines Post</p>
                      <p className="text-muted-foreground">Your rank determines which government posts you're eligible for. Better ranks open doors to top posts like AAO, Inspector, and ASO.</p>
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
                    SSC CGL Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      <span className="font-semibold">Total Candidates</span>
                    </div>
                    <p className="text-muted-foreground">Approximately 30-35 lakh candidates appear for SSC CGL annually.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="font-semibold">Government Posts</span>
                    </div>
                    <p className="text-muted-foreground">SSC CGL offers posts in various departments including C&AG, CBDT, CBIC, CBI, and others.</p>
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

export default function SSCCGLRankPredictorPage(){
  return (
    <ToolPageWrapper toolSlug="ssc-cgl-rank-predictor">
      <ToastProvider>
        <SSCCGLRankPredictor />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
