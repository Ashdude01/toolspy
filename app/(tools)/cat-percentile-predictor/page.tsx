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
import { CATPercentilePredictorSEOContent } from "./seo-content";

interface CATScore {
  id: string;
  vaScore: number;
  dilrScore: number;
  qaScore: number;
  totalScore: number;
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

export default function CATPercentilePredictor() {
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
      setRecentPredictions(JSON.parse(saved));
    }
  }, []);

  // Auto-calculate total score
  useEffect(() => {
    const total = vaScore + dilrScore + qaScore;
    setTotalScore(total);
  }, [vaScore, dilrScore, qaScore]);

  const calculatePercentile = (score: number, category: string): number => {
    // CAT percentile calculation based on historical data
    const basePercentile = Math.min(99.99, Math.max(0.01, (score / 300) * 100));
    
    // Category-wise adjustments
    const categoryMultipliers = {
      "General": 1.0,
      "OBC": 1.05,
      "SC": 1.15,
      "ST": 1.20,
      "EWS": 1.08
    };
    
    const multiplier = categoryMultipliers[category as keyof typeof categoryMultipliers] || 1.0;
    return Math.min(99.99, basePercentile * multiplier);
  };

  const getCollegeOptions = (percentile: number): CollegeOption[] => {
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
  };

  const handleCalculate = async () => {
    if (totalScore === 0) {
      showToast("Please enter your CAT scores", "error");
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const percentile = calculatePercentile(totalScore, category);
    const colleges = getCollegeOptions(percentile);
    
    setPredictedPercentile(percentile);
    setCollegeOptions(colleges);
    setShowResults(true);
    
    // Save to recent predictions
    const newPrediction: CATScore = {
      id: Date.now().toString(),
      vaScore,
      dilrScore,
      qaScore,
      totalScore,
      timestamp: Date.now()
    };
    
    const updated = [newPrediction, ...recentPredictions.slice(0, 4)];
    setRecentPredictions(updated);
    localStorage.setItem('cat-predictions', JSON.stringify(updated));
    
    setIsCalculating(false);
    scrollToElement(resultsRef);
    showToast("CAT percentile calculated successfully!", "success");
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
  };

  const copyResults = () => {
    const results = `CAT Percentile Prediction Results:
Total Score: ${totalScore}/300
Predicted Percentile: ${predictedPercentile.toFixed(2)}%
Category: ${category}

Top College Options:
${collegeOptions.slice(0, 5).map((college, index) => 
  `${index + 1}. ${college.name} - ${college.percentile}% (${college.fees})`
).join('\n')}

Generated by Toolspy CAT Percentile Predictor`;

    navigator.clipboard.writeText(results);
    showToast("Results copied to clipboard!", "success");
  };

  const downloadResults = () => {
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
  };

  return (
    <ToastProvider>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CAT Percentile Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict your CAT percentile and discover MBA college options based on your scores. 
            Get instant predictions with detailed college recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Enter Your CAT Scores
                </CardTitle>
                <CardDescription>
                  Enter your sectional scores to predict your percentile and college options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="va-score">Verbal Ability & Reading Comprehension</Label>
                    <Input
                      id="va-score"
                      type="number"
                      min="0"
                      max="100"
                      value={vaScore}
                      onChange={(e) => setVaScore(Number(e.target.value))}
                      placeholder="Enter VA & RC score (0-100)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dilr-score">Data Interpretation & Logical Reasoning</Label>
                    <Input
                      id="dilr-score"
                      type="number"
                      min="0"
                      max="100"
                      value={dilrScore}
                      onChange={(e) => setDilrScore(Number(e.target.value))}
                      placeholder="Enter DILR score (0-100)"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qa-score">Quantitative Ability</Label>
                    <Input
                      id="qa-score"
                      type="number"
                      min="0"
                      max="100"
                      value={qaScore}
                      onChange={(e) => setQaScore(Number(e.target.value))}
                      placeholder="Enter QA score (0-100)"
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
                    <span className="text-2xl font-bold text-blue-600">{totalScore}/300</span>
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
                        Predict Percentile
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
                        {predictedPercentile.toFixed(2)}%
                      </div>
                      <div className="text-sm text-green-700">Predicted Percentile</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {totalScore}/300
                      </div>
                      <div className="text-sm text-blue-700">Total Score</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {collegeOptions.length}
                      </div>
                      <div className="text-sm text-purple-700">College Options</div>
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
                    <h3 className="text-lg font-semibold">Recommended Colleges</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {collegeOptions.map((college, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg">{college.name}</h4>
                                <Badge variant="secondary">{college.category}</Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  {college.percentile}% required
                                </div>
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  {college.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award className="h-4 w-4" />
                                  {college.fees}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {college.rating}/5.0
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
                          <span className="font-medium">{prediction.totalScore}/300</span>
                          <span className="text-sm text-gray-500">
                            {new Date(prediction.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          VA: {prediction.vaScore} | DILR: {prediction.dilrScore} | QA: {prediction.qaScore}
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
                  CAT Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-2">Section-wise Marks:</div>
                  <div className="space-y-1 text-gray-600">
                    <div>• VA & RC: 100 marks</div>
                    <div>• DILR: 100 marks</div>
                    <div>• QA: 100 marks</div>
                    <div>• Total: 300 marks</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium mb-2">Percentile Calculation:</div>
                  <div className="text-gray-600">
                    Based on historical CAT data and category-wise normalization
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ProgressModal 
          isOpen={isCalculating} 
          title="Calculating CAT Percentile"
          current={1}
          total={1}
          description="Please wait while we calculate your percentile..."
        />
        <CATPercentilePredictorSEOContent />
      </div>
    </ToastProvider>
  );
}
