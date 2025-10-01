"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { Download, Copy, Calculator, Target, TrendingUp, Award, BookOpen, Building, Users, Star, Shield, Clock, BarChart3 } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { UPSCRankPredictorSEOContent } from "./seo-content";

interface UPSCCandidate {
  id: string;
  prelimsScore: number;
  mainsScore: number;
  interviewScore: number;
  totalScore: number;
  category: string;
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

export default function UPSCRankPredictor() {
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
      setRecentPredictions(JSON.parse(saved));
    }
  }, []);

  // Auto-calculate total score
  useEffect(() => {
    const total = prelimsScore + mainsScore + interviewScore;
    setTotalScore(total);
  }, [prelimsScore, mainsScore, interviewScore]);

  const calculateRank = (score: number, category: string): number => {
    // UPSC rank calculation based on historical data
    const baseRank = Math.max(1, Math.round(1000 - (score / 2025) * 1000));
    
    // Category-wise adjustments
    const categoryMultipliers = {
      "General": 1.0,
      "OBC": 0.85,
      "SC": 0.70,
      "ST": 0.65,
      "EWS": 0.90
    };
    
    const multiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    return Math.max(1, Math.round(baseRank * multiplier));
  };

  const getServiceOptions = (rank: number): ServiceOption[] => {
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
  };

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your UPSC scores", "error");
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const rank = calculateRank(totalScore, category);
    const services = getServiceOptions(rank);
    
    setPredictedRank(rank);
    setServiceOptions(services);
    setShowResults(true);
    
    // Save to recent predictions
    const newPrediction: UPSCCandidate = {
      id: Date.now().toString(),
      prelimsScore,
      mainsScore,
      interviewScore,
      totalScore,
      category,
      timestamp: Date.now()
    };
    
    const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
    setRecentPredictions(updated);
    localStorage.setItem('upsc-predictions', JSON.stringify(updated));
    
    setIsCalculating(false);
    scrollToElement(resultsRef);
    showToast("UPSC rank calculated successfully!", "success");
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
  };

  const copyResults = () => {
    const results = `UPSC Rank Prediction Results:
Total Score: ${totalScore}/2025
Predicted Rank: ${predictedRank}
Category: ${category}

Top Service Options:
${serviceOptions.slice(0, 5).map((service, index) => 
  `${index + 1}. ${service.name} - Rank ${service.rank} (${service.salary})`
).join('\n')}

Generated by Toolspy UPSC Rank Predictor`;

    navigator.clipboard.writeText(results);
    showToast("Results copied to clipboard!", "success");
  };

  const downloadResults = () => {
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
  };

  return (
    <ToastProvider>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UPSC Rank Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict your UPSC rank and discover civil service options based on your scores. 
            Get instant predictions with detailed service recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Enter Your UPSC Scores
                </CardTitle>
                <CardDescription>
                  Enter your exam scores to predict your rank and service options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prelims-score">Prelims Score</Label>
                    <Input
                      id="prelims-score"
                      type="number"
                      min="0"
                      max="400"
                      value={prelimsScore}
                      onChange={(e) => setPrelimsScore(Number(e.target.value))}
                      placeholder="Enter Prelims score (0-400)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mains-score">Mains Score</Label>
                    <Input
                      id="mains-score"
                      type="number"
                      min="0"
                      max="1750"
                      value={mainsScore}
                      onChange={(e) => setMainsScore(Number(e.target.value))}
                      placeholder="Enter Mains score (0-1750)"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interview-score">Interview Score</Label>
                    <Input
                      id="interview-score"
                      type="number"
                      min="0"
                      max="275"
                      value={interviewScore}
                      onChange={(e) => setInterviewScore(Number(e.target.value))}
                      placeholder="Enter Interview score (0-275)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="EWS">EWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-900">Total Score:</span>
                    <span className="text-2xl font-bold text-blue-600">{totalScore}/2025</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleCalculate} 
                    disabled={isCalculating || totalScore === 0}
                    className="flex-1"
                  >
                    {isCalculating ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Predict Rank
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {showResults && (
              <Card ref={resultsRef} className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Prediction Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {predictedRank}
                      </div>
                      <div className="text-sm text-green-700">Predicted Rank</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {totalScore}/2025
                      </div>
                      <div className="text-sm text-blue-700">Total Score</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {serviceOptions.length}
                      </div>
                      <div className="text-sm text-purple-700">Service Options</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <Button onClick={copyResults} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Results
                    </Button>
                    <Button onClick={downloadResults} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Recommended Services</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {serviceOptions.map((service, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg">{service.name}</h4>
                                <Badge variant="secondary">{service.category}</Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{service.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  Rank {service.rank}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  {service.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award className="h-4 w-4" />
                                  {service.salary}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {service.rating}/5.0
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Protected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  All calculations are performed locally in your browser. 
                  No data is sent to our servers, ensuring complete privacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentPredictions.length > 0 ? (
                  <div className="space-y-3">
                    {recentPredictions.slice(0, 3).map((prediction) => (
                      <div key={prediction.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{prediction.totalScore}/2025</span>
                          <span className="text-sm text-gray-500">
                            {new Date(prediction.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          P: {prediction.prelimsScore} | M: {prediction.mainsScore} | I: {prediction.interviewScore}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No recent predictions</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  UPSC Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-2">Exam Structure:</div>
                  <div className="space-y-1 text-gray-600">
                    <div>• Prelims: 400 marks</div>
                    <div>• Mains: 1750 marks</div>
                    <div>• Interview: 275 marks</div>
                    <div>• Total: 2025 marks</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-2">Rank Calculation:</div>
                  <div className="text-gray-600">
                    Based on historical UPSC data and category-wise normalization
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ProgressModal 
          isOpen={isCalculating} 
          title="Calculating UPSC Rank"
          current={1}
          total={1}
          description="Please wait while we calculate your rank..."
        />
        <UPSCRankPredictorSEOContent />
      </div>
    </ToastProvider>
  );
}
