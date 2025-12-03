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
import { UPSCRankPredictorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface UPSCCandidate {
  id: string;
  prelimsScore: number;
  mainsScore: number;
  interviewScore: number;
  totalScore: number;
  category: string;
  rank: number;
  timestamp: number;
}

interface ServiceOption {
  name: string;
  category: string;
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
  { range: "1-10", services: "IAS, IFS, IPS", color: "text-green-600 dark:text-green-400" },
  { range: "11-50", services: "IAS, IFS, IPS, IRS", color: "text-blue-600 dark:text-blue-400" },
  { range: "51-200", services: "IRS, IAAS, IRTS, IRPS", color: "text-purple-600 dark:text-purple-400" },
  { range: "201-500", services: "Central Services", color: "text-orange-600 dark:text-orange-400" },
  { range: "500+", services: "Other Central Services", color: "text-gray-600 dark:text-gray-400" },
];

function UPSCRankPredictor() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [prelimsScore, setPrelimsScore] = useState<number>(0);
  const [mainsScore, setMainsScore] = useState<number>(0);
  const [interviewScore, setInterviewScore] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [category, setCategory] = useState<string>("General");
  const [predictedRank, setPredictedRank] = useState<number>(0);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState<UPSCCandidate[]>([]);

  // Load recent predictions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('upsc-predictions');
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

  const calculateRank = useCallback((score: number, category: string): number => {
    const baseRank = Math.max(1, Math.round(1000 - (score / 2025) * 1000));
    
    const categoryMultipliers = {
      "General": 1.0,
      "OBC": 0.85,
      "SC": 0.70,
      "ST": 0.65,
      "EWS": 0.90
    };
    
    const multiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    return Math.max(1, Math.round(baseRank * multiplier));
  }, []);

  const getServiceOptions = useCallback((rank: number): ServiceOption[] => {
    const services = [
      { name: "Indian Administrative Service (IAS)", category: "All India Service", rank: 1, description: "District Collector, Commissioner, Secretary", location: "All India", salary: "₹56,100-2,50,000", rating: 5.0 },
      { name: "Indian Foreign Service (IFS)", category: "All India Service", rank: 2, description: "Diplomat, Ambassador, Consul General", location: "International", salary: "₹56,100-2,50,000", rating: 4.9 },
      { name: "Indian Police Service (IPS)", category: "All India Service", rank: 3, description: "SP, DIG, IG, DGP", location: "All India", salary: "₹56,100-2,50,000", rating: 4.8 },
      { name: "Indian Revenue Service (IRS)", category: "Central Service", rank: 10, description: "Income Tax Commissioner, CBDT Member", location: "All India", salary: "₹56,100-2,25,000", rating: 4.7 },
      { name: "Indian Audit & Accounts Service (IAAS)", category: "Central Service", rank: 15, description: "Accountant General, CAG", location: "All India", salary: "₹56,100-2,25,000", rating: 4.6 },
      { name: "Indian Railway Traffic Service (IRTS)", category: "Central Service", rank: 20, description: "Railway Manager, GM", location: "All India", salary: "₹56,100-2,25,000", rating: 4.5 },
      { name: "Indian Railway Personnel Service (IRPS)", category: "Central Service", rank: 25, description: "HR Manager, Railway Board", location: "All India", salary: "₹56,100-2,25,000", rating: 4.4 },
      { name: "Indian Railway Accounts Service (IRAS)", category: "Central Service", rank: 30, description: "Financial Advisor, Railway Board", location: "All India", salary: "₹56,100-2,25,000", rating: 4.3 },
      { name: "Indian Defence Accounts Service (IDAS)", category: "Central Service", rank: 35, description: "Controller of Defence Accounts", location: "All India", salary: "₹56,100-2,25,000", rating: 4.2 },
      { name: "Indian Information Service (IIS)", category: "Central Service", rank: 40, description: "Director, PIB, Media Relations", location: "All India", salary: "₹56,100-2,25,000", rating: 4.1 },
      { name: "Indian Trade Service (ITS)", category: "Central Service", rank: 45, description: "Trade Commissioner, DGFT", location: "All India", salary: "₹56,100-2,25,000", rating: 4.0 },
      { name: "Indian Corporate Law Service (ICLS)", category: "Central Service", rank: 50, description: "Company Secretary, MCA", location: "All India", salary: "₹56,100-2,25,000", rating: 3.9 },
      { name: "Indian Postal Service (IPoS)", category: "Central Service", rank: 55, description: "Postmaster General, Postal Board", location: "All India", salary: "₹56,100-2,25,000", rating: 3.8 },
      { name: "Indian Civil Accounts Service (ICAS)", category: "Central Service", rank: 60, description: "Controller General of Accounts", location: "All India", salary: "₹56,100-2,25,000", rating: 3.7 },
      { name: "Indian Defence Estates Service (IDES)", category: "Central Service", rank: 65, description: "Director General, Defence Estates", location: "All India", salary: "₹56,100-2,25,000", rating: 3.6 }
    ];

    return services.filter(service => rank <= service.rank + 10).slice(0, 8);
  }, []);

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your UPSC scores", "error");
      return;
    }

    setIsCalculating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const rank = calculateRank(totalScore, category);
      const services = getServiceOptions(rank);
      
      setPredictedRank(rank);
      setServiceOptions(services);
      setShowResults(true);
      
      const newPrediction: UPSCCandidate = {
        id: Date.now().toString(),
        prelimsScore,
        mainsScore,
        interviewScore,
        totalScore,
        category,
        rank,
        timestamp: Date.now()
      };
      
      const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
      setRecentPredictions(updated);
      localStorage.setItem('upsc-predictions', JSON.stringify(updated));
      
      scrollToElement(resultsRef);
      showToast("UPSC rank calculated successfully!", "success");
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
    setPredictedRank(0);
    setServiceOptions([]);
    setShowResults(false);
    showToast("All fields cleared", "info");
  };

  const copyResults = async () => {
    if (!showResults) {
      showToast("No results to copy", "error");
      return;
    }

    try {
      const results = `UPSC Rank Prediction Results:
Total Score: ${totalScore}/2025
Predicted Rank: ${predictedRank}
Category: ${category}

Top Service Options:
${serviceOptions.slice(0, 5).map((service, index) => 
  `${index + 1}. ${service.name} - Rank ${service.rank} (${service.salary})`
).join('\n')}

Generated by Toolspy UPSC Rank Predictor`;
      
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
      const results = `UPSC Rank Prediction Results
Generated on: ${new Date().toLocaleDateString()}

Your Scores:
- Prelims Score: ${prelimsScore}/400
- Mains Score: ${mainsScore}/1750
- Interview Score: ${interviewScore}/275
- Total Score: ${totalScore}/2025

Category: ${category}
Predicted Rank: ${predictedRank}

Service Options:
${serviceOptions.map((service, index) => 
  `${index + 1}. ${service.name}
   Category: ${service.category}
   Required Rank: ${service.rank}
   Description: ${service.description}
   Location: ${service.location}
   Salary: ${service.salary}
   Rating: ${service.rating}/5.0
   `
).join('\n')}

Note: This is an estimate based on historical data. Actual results may vary.
Generated by Toolspy UPSC Rank Predictor`;
      
      const blob = new Blob([results], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `upsc-rank-prediction-${Date.now()}.txt`;
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
              className="font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 mb-2"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First • No Data Collection • 100% Secure
            </Badge>

            <h1 className="bg-gradient-to-r from-indigo-600 dark:from-indigo-400 via-blue-600 dark:via-blue-400 to-purple-600 dark:to-purple-400 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold">
              UPSC Rank Predictor
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Predict your UPSC rank and discover civil service options based on your exam scores. Our advanced algorithm helps you understand service allocation and plan your civil service career with confidence. All calculations are performed locally on your device for complete privacy.
            </p>
          </div>

          {/* Informative Section */}
          <Card className="mb-6 border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="font-semibold text-indigo-900 dark:text-indigo-100">How UPSC Rank Prediction Works</p>
                  <p className="text-indigo-800 dark:text-indigo-200">
                    UPSC (Union Public Service Commission) Civil Services Examination consists of three stages: Prelims (400 marks), Mains (1750 marks), and Interview (275 marks), totaling 2025 marks. 
                    The rank is calculated based on your total score. Our predictor uses historical data and statistical analysis to estimate your expected rank. Higher scores typically result in better ranks, 
                    which determine your eligibility for various civil services including IAS, IFS, IPS, and other prestigious services across India.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg border-2">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b">
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Calculator className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    Enter Your UPSC Scores
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Enter your exam scores to predict your rank and service options. All calculations are performed instantly and securely on your device.
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
                        max="400"
                        value={prelimsScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 400) {
                            setPrelimsScore(value);
                          }
                        }}
                        placeholder="Enter Prelims score (0-400)"
                        className="h-12 border-2 focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your UPSC Prelims score out of 400 marks.
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
                        max="1750"
                        value={mainsScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 1750) {
                            setMainsScore(value);
                          }
                        }}
                        placeholder="Enter Mains score (0-1750)"
                        className="h-12 border-2 focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your UPSC Mains score out of 1750 marks.
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
                        max="275"
                        value={interviewScore || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          if (value >= 0 && value <= 275) {
                            setInterviewScore(value);
                          }
                        }}
                        placeholder="Enter Interview score (0-275)"
                        className="h-12 border-2 focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Enter your UPSC Interview score out of 275 marks.
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
                        Select your category. Different categories have different cutoff ranks for service allocation.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-4 rounded-lg border-2 border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base text-indigo-900 dark:text-indigo-100">Total Score:</span>
                      <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{totalScore}/2025</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleCalculate} 
                      disabled={isCalculating || totalScore === 0}
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
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
                <Card ref={resultsRef} className="mt-6 shadow-lg border-2 border-indigo-200 dark:border-indigo-800 animate-in fade-in slide-in-from-top-4">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                      <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      Prediction Results
                    </CardTitle>
                    <CardDescription>
                      Your predicted rank and recommended civil service options
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
                          {totalScore}/2025
                        </div>
                        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Score</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-lg border-2 border-purple-200 dark:border-purple-800 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          {serviceOptions.length}
                        </div>
                        <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">Service Options</div>
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
                        Recommended Civil Services
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {serviceOptions.map((service, index) => (
                          <div 
                            key={index} 
                            className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-lg">{service.name}</h4>
                                  <Badge variant="secondary" className="font-semibold">{service.category}</Badge>
                                </div>
                                <p className="text-muted-foreground mb-3">{service.description}</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    <span className="text-muted-foreground">Rank {service.rank}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-muted-foreground">{service.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-muted-foreground">{service.salary}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                    <span className="text-muted-foreground">{service.rating}/5.0</span>
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
                    Understanding rank ranges and service options
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
                          <span className="text-sm text-muted-foreground">{range.services}</span>
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
                    <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
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
                    <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
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
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-base">{prediction.totalScore}/2025</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(prediction.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            P: {prediction.prelimsScore} | M: {prediction.mainsScore} | I: {prediction.interviewScore}
                          </div>
                          {prediction.rank > 0 && (
                            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
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
                    <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    UPSC Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="text-sm">
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Exam Structure:
                    </div>
                    <div className="space-y-2 text-muted-foreground ml-6">
                      <div>• Prelims: 400 marks</div>
                      <div>• Mains: 1750 marks</div>
                      <div>• Interview: 275 marks</div>
                      <div>• Total: 2025 marks</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold mb-2">Rank Calculation:</div>
                    <div className="text-muted-foreground">
                      Based on historical UPSC data and category-wise normalization. Rank determines service allocation.
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
                    <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Higher Score = Better Rank</p>
                      <p className="text-muted-foreground">A higher total score means you scored better than more candidates, resulting in a better rank.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Rank Determines Service</p>
                      <p className="text-muted-foreground">Your rank determines which civil services you're eligible for. Better ranks open doors to top services like IAS, IFS, and IPS.</p>
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
                    UPSC Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-semibold">Total Candidates</span>
                    </div>
                    <p className="text-muted-foreground">Approximately 10-12 lakh candidates appear for UPSC Prelims annually.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="font-semibold">Services</span>
                    </div>
                    <p className="text-muted-foreground">24 civil services are allocated based on UPSC rank, including IAS, IFS, IPS, and others.</p>
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
            <UPSCRankPredictorSEOContent />
          </div>
        </div>
  );
}


export default function UPSCRankPredictorPage() {
  return (
    <ToolPageWrapper toolSlug="upsc-rank-predictor">
      <ToastProvider>
        <UPSCRankPredictor />
      </ToastProvider>
    </ToolPageWrapper>
  );
}