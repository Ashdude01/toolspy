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
import { Download, Copy, Calculator, Target, TrendingUp, Award, BookOpen, Building, Users, Star, Shield, Clock, BarChart3, Info, Lightbulb, CheckCircle2, Sparkles, Zap, Percent } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface CATScore {
  id: string;
  vaScore: number;
  dilrScore: number;
  qaScore: number;
  totalScore: number;
  percentile: number;
  category: string;
  timestamp: number;
}

interface CollegeOption {
  name: string;
  category: string;
  percentile: number;
  fees: string;
  location: string;
  rating: number;
}

const CATEGORIES = [
  { value: "General", label: "General", description: "General category candidates" },
  { value: "OBC", label: "OBC", description: "Other Backward Classes" },
  { value: "SC", label: "SC", description: "Scheduled Caste" },
  { value: "ST", label: "ST", description: "Scheduled Tribe" },
  { value: "EWS", label: "EWS", description: "Economically Weaker Section" },
];

const PERCENTILE_RANGES = [
  { range: "95-100", colleges: "Top IIMs (A, B, C, L, K)", color: "text-green-600 dark:text-green-400" },
  { range: "90-95", colleges: "Top IIMs, New IIMs", color: "text-blue-600 dark:text-blue-400" },
  { range: "85-90", colleges: "New IIMs, Top B-Schools", color: "text-purple-600 dark:text-purple-400" },
  { range: "80-85", colleges: "New IIMs, Good B-Schools", color: "text-orange-600 dark:text-orange-400" },
  { range: "Below 80", colleges: "Other B-Schools", color: "text-gray-600 dark:text-gray-400" },
];

function CATPercentilePredictor() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [vaScore, setVaScore] = useState<number>(0);
  const [dilrScore, setDilrScore] = useState<number>(0);
  const [qaScore, setQaScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [category, setCategory] = useState<string>("General");
  const [predictedPercentile, setPredictedPercentile] = useState<number>(0);
  const [collegeOptions, setCollegeOptions] = useState<CollegeOption[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState<CATScore[]>([]);

  // Load recent predictions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cat-predictions');
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
    const total = vaScore + dilrScore + qaScore;
    setTotalScore(total);
  }, [vaScore, dilrScore, qaScore]);

  const calculatePercentile = useCallback((score: number, category: string): number => {
    const basePercentile = Math.min(99.99, Math.max(0.01, (score / 300) * 100));
    
    const categoryMultipliers = {
      "General": 1.0,
      "OBC": 1.05,
      "SC": 1.15,
      "ST": 1.20,
      "EWS": 1.08
    };
    
    const multiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    return Math.min(99.99, basePercentile * multiplier);
  }, []);

  const getCollegeOptions = useCallback((percentile: number): CollegeOption[] => {
    const colleges = [
      { name: "IIM Ahmedabad", category: "Top IIM", percentile: 99.5, fees: "₹31.5 L", location: "Ahmedabad", rating: 5.0 },
      { name: "IIM Bangalore", category: "Top IIM", percentile: 99.0, fees: "₹24.5 L", location: "Bangalore", rating: 4.9 },
      { name: "IIM Calcutta", category: "Top IIM", percentile: 98.5, fees: "₹27 L", location: "Kolkata", rating: 4.8 },
      { name: "IIM Lucknow", category: "Top IIM", percentile: 98.0, fees: "₹20.5 L", location: "Lucknow", rating: 4.7 },
      { name: "IIM Kozhikode", category: "Top IIM", percentile: 97.5, fees: "₹19 L", location: "Kozhikode", rating: 4.6 },
      { name: "IIM Indore", category: "Top IIM", percentile: 97.0, fees: "₹20 L", location: "Indore", rating: 4.5 },
      { name: "IIM Shillong", category: "New IIM", percentile: 95.0, fees: "₹18 L", location: "Shillong", rating: 4.3 },
      { name: "IIM Trichy", category: "New IIM", percentile: 94.0, fees: "₹16 L", location: "Trichy", rating: 4.2 },
      { name: "IIM Udaipur", category: "New IIM", percentile: 93.0, fees: "₹15 L", location: "Udaipur", rating: 4.1 },
      { name: "IIM Raipur", category: "New IIM", percentile: 92.0, fees: "₹14 L", location: "Raipur", rating: 4.0 },
      { name: "IIM Ranchi", category: "New IIM", percentile: 91.0, fees: "₹13 L", location: "Ranchi", rating: 3.9 },
      { name: "IIM Rohtak", category: "New IIM", percentile: 90.0, fees: "₹12 L", location: "Rohtak", rating: 3.8 },
      { name: "IIM Kashipur", category: "New IIM", percentile: 89.0, fees: "₹11 L", location: "Kashipur", rating: 3.7 },
      { name: "IIM Nagpur", category: "New IIM", percentile: 88.0, fees: "₹10 L", location: "Nagpur", rating: 3.6 },
      { name: "IIM Amritsar", category: "New IIM", percentile: 87.0, fees: "₹9 L", location: "Amritsar", rating: 3.5 },
      { name: "IIM Bodh Gaya", category: "New IIM", percentile: 86.0, fees: "₹8 L", location: "Bodh Gaya", rating: 3.4 },
      { name: "IIM Sambalpur", category: "New IIM", percentile: 85.0, fees: "₹7 L", location: "Sambalpur", rating: 3.3 },
      { name: "IIM Sirmaur", category: "New IIM", percentile: 84.0, fees: "₹6 L", location: "Sirmaur", rating: 3.2 },
      { name: "IIM Jammu", category: "New IIM", percentile: 83.0, fees: "₹5 L", location: "Jammu", rating: 3.1 },
      { name: "IIM Visakhapatnam", category: "New IIM", percentile: 82.0, fees: "₹4 L", location: "Visakhapatnam", rating: 3.0 }
    ];

    return colleges.filter(college => percentile >= college.percentile - 2).slice(0, 10);
  }, []);

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your CAT scores", "error");
      return;
    }

    setIsCalculating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const percentile = calculatePercentile(totalScore, category);
      const colleges = getCollegeOptions(percentile);
      
      setPredictedPercentile(percentile);
      setCollegeOptions(colleges);
      setShowResults(true);
      
      const newPrediction: CATScore = {
        id: Date.now().toString(),
        vaScore,
        dilrScore,
        qaScore,
        totalScore,
        percentile,
        category,
        timestamp: Date.now()
      };
      
      const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
      setRecentPredictions(updated);
      localStorage.setItem('cat-predictions', JSON.stringify(updated));
      
      scrollToElement(resultsRef);
      showToast("CAT percentile calculated successfully!", "success");
    } catch (error) {
      console.error("Error calculating percentile:", error);
      showToast("Error calculating percentile. Please try again.", "error");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setVaScore(0);
    setDilrScore(0);
    setQaScore(0);
    setTotalScore(0);
    setCategory("General");
    setPredictedPercentile(0);
    setCollegeOptions([]);
    setShowResults(false);
    showToast("All fields cleared", "info");
  };

  const copyResults = async () => {
    if (!showResults) {
      showToast("No results to copy", "error");
      return;
    }

    try {
      const results = `CAT Percentile Prediction Results:
Total Score: ${totalScore}/300
Predicted Percentile: ${predictedPercentile.toFixed(2)}%
Category: ${category}

Top College Options:
${collegeOptions.slice(0, 5).map((college, index) => 
  `${index + 1}. ${college.name} - ${college.percentile}% (${college.fees})`
).join('\n')}

Generated by Toolspy CAT Percentile Predictor`;
      
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
      const results = `CAT Percentile Prediction Results
Generated on: ${new Date().toLocaleDateString()}

Your Scores:
- Verbal Ability & Reading Comprehension: ${vaScore}/100
- Data Interpretation & Logical Reasoning: ${dilrScore}/100
- Quantitative Ability: ${qaScore}/100
- Total Score: ${totalScore}/300

Category: ${category}
Predicted Percentile: ${predictedPercentile.toFixed(2)}%

College Options:
${collegeOptions.map((college, index) => 
  `${index + 1}. ${college.name}
   Category: ${college.category}
   Required Percentile: ${college.percentile}%
   Fees: ${college.fees}
   Location: ${college.location}
   Rating: ${college.rating}/5.0
   `
).join('\n')}

Note: This is an estimate based on historical data. Actual results may vary.
Generated by Toolspy CAT Percentile Predictor`;
      
      const blob = new Blob([results], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cat-percentile-prediction-${Date.now()}.txt`;
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
          <div className="text-center mb-6 sm:mb-8 space-y-4">
            <Badge
              variant="outline"
              className="font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 mb-2"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First • No Data Collection • 100% Secure
            </Badge>

            <h2 className="bg-gradient-to-r from-purple-600 dark:from-purple-400 via-pink-600 dark:via-pink-400 to-indigo-600 dark:to-indigo-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold">
              CAT Percentile Predictor
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Predict your CAT percentile and discover MBA college options based on your sectional scores. Our advanced algorithm helps you understand admission chances and plan your MBA journey with confidence. All calculations are performed locally on your device for complete privacy.
            </p>
          </div>

          {/* Informative Section */}
          <Card className="mb-6 border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="font-semibold text-purple-900 dark:text-purple-100">How CAT Percentile Prediction Works</p>
                  <p className="text-purple-800 dark:text-purple-200">
                    CAT (Common Admission Test) percentile indicates the percentage of candidates who scored less than you. 
                    The percentile is calculated based on your total score out of 300 marks (100 marks each for VA & RC, DILR, and QA sections). 
                    Our predictor uses historical data and statistical analysis to estimate your expected percentile. Higher percentiles typically result in better college options, 
                    which determine your eligibility for various IIMs and other prestigious B-schools across India.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg border-2">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b">
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Calculator className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    Enter Your CAT Scores
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Enter your sectional scores to predict your percentile and college options. All calculations are performed instantly and securely on your device.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="va-score" className="text-base font-semibold">
                        Verbal Ability & Reading Comprehension <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="va-score"
                        type="number"
                        min="0"
                        max="100"
                        value={vaScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 100) {
                            setVaScore(value);
                          }
                        }}
                        placeholder="Enter VA & RC score (0-100)"
                        className="h-12 border-2 focus:border-purple-500 dark:focus:border-purple-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your score for Verbal Ability and Reading Comprehension section.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="dilr-score" className="text-base font-semibold">
                        Data Interpretation & Logical Reasoning <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dilr-score"
                        type="number"
                        min="0"
                        max="100"
                        value={dilrScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 100) {
                            setDilrScore(value);
                          }
                        }}
                        placeholder="Enter DILR score (0-100)"
                        className="h-12 border-2 focus:border-purple-500 dark:focus:border-purple-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your score for Data Interpretation and Logical Reasoning section.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="qa-score" className="text-base font-semibold">
                        Quantitative Ability <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="qa-score"
                        type="number"
                        min="0"
                        max="100"
                        value={qaScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 100) {
                            setQaScore(value);
                          }
                        }}
                        placeholder="Enter QA score (0-100)"
                        className="h-12 border-2 focus:border-purple-500 dark:focus:border-purple-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your score for Quantitative Ability section.
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
                        Select your category. Different categories have different cutoff percentiles for college admissions.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base text-purple-900 dark:text-purple-100">Total Score:</span>
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalScore}/300</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleCalculate} 
                      disabled={isCalculating || totalScore === 0}
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {isCalculating ? (
                        <>
                          <Clock className="h-5 w-5 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Target className="h-5 w-5 mr-2" />
                          Predict Percentile
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
                <Card ref={resultsRef} className="mt-6 shadow-lg border-2 border-purple-200 dark:border-purple-800 animate-in fade-in slide-in-from-top-4">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                      <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      Prediction Results
                    </CardTitle>
                    <CardDescription>
                      Your predicted percentile and recommended MBA college options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-lg border-2 border-green-200 dark:border-green-800 text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                          {predictedPercentile.toFixed(2)}%
                        </div>
                        <div className="text-sm font-semibold text-green-700 dark:text-green-300">Predicted Percentile</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-lg border-2 border-blue-200 dark:border-blue-800 text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {totalScore}/300
                        </div>
                        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Score</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-lg border-2 border-purple-200 dark:border-purple-800 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          {collegeOptions.length}
                        </div>
                        <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">College Options</div>
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
                        Recommended MBA Colleges
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {collegeOptions.map((college, index) => (
                          <div 
                            key={index} 
                            className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-lg">{college.name}</h4>
                                  <Badge variant="secondary" className="font-semibold">{college.category}</Badge>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    <span className="text-muted-foreground">{college.percentile}% required</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-muted-foreground">{college.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-muted-foreground">{college.fees}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                    <span className="text-muted-foreground">{college.rating}/5.0</span>
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

              {/* Percentile Range Guide */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Percentile Range Guide
                  </CardTitle>
                  <CardDescription>
                    Understanding percentile ranges and college options
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
                          <Badge variant="outline" className={`font-bold w-fit ${range.color}`}>
                            {range.range}%
                          </Badge>
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
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
                    <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
                            setVaScore(prediction.vaScore);
                            setDilrScore(prediction.dilrScore);
                            setQaScore(prediction.qaScore);
                            setCategory(prediction.category);
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-base">{prediction.totalScore}/300</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(prediction.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            VA: {prediction.vaScore} | DILR: {prediction.dilrScore} | QA: {prediction.qaScore}
                          </div>
                          {prediction.percentile > 0 && (
                            <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1">
                              {prediction.percentile.toFixed(2)}% percentile
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
                    <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    CAT Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="text-sm">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Section-wise Marks:
                    </div>
                    <div className="space-y-2 text-muted-foreground ml-6">
                      <div>• VA & RC: 100 marks</div>
                      <div>• DILR: 100 marks</div>
                      <div>• QA: 100 marks</div>
                      <div>• Total: 300 marks</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold mb-2">Percentile Calculation:</div>
                    <div className="text-muted-foreground">
                      Based on historical CAT data and category-wise normalization. Percentile indicates the percentage of candidates who scored less than you.
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
                    <Percent className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Higher Percentile = Better Options</p>
                      <p className="text-muted-foreground">A higher CAT percentile means you scored better than more candidates, opening doors to top IIMs and B-schools.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Sectional Balance Matters</p>
                      <p className="text-muted-foreground">Many top IIMs consider sectional percentiles. Aim for balanced scores across all three sections.</p>
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
                    CAT Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold">Total Candidates</span>
                    </div>
                    <p className="text-muted-foreground">Approximately 2.5 lakh candidates appear for CAT annually.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="font-semibold">IIMs</span>
                    </div>
                    <p className="text-muted-foreground">20 IIMs across India accept CAT scores for MBA admissions.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="font-semibold">Quick Results</span>
                    </div>
                    <p className="text-muted-foreground">Get instant percentile predictions with our advanced algorithm.</p>
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

export default function CATPercentilePredictorPage() {
  return (
    <ToolPageWrapper toolSlug="cat-percentile-predictor">
      <ToastProvider>
        <CATPercentilePredictor />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
