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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Activity,
  Heart,
  Scale,
  Shield,
  Calculator,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface BMIResult {
  bmi: number;
  category: string;
  status: string;
  description: string;
  risks: string[];
  recommendations: string[];
  color: string;
  idealWeight: {
    min: number;
    max: number;
  };
}

function BmiCalculatorContent() {
  const { showToast } = useToast();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      showToast("Please enter valid weight and height values", "error");
      return;
    }

    let bmi: number;
    let heightInMeters: number;

    if (unit === "metric") {
      heightInMeters = heightNum / 100; // Convert cm to meters
      bmi = weightNum / (heightInMeters * heightInMeters);
    } else {
      // Imperial: weight in pounds, height in inches
      bmi = (weightNum / (heightNum * heightNum)) * 703;
      heightInMeters = heightNum * 0.0254; // Convert inches to meters for ideal weight calculation
    }

    // Calculate ideal weight range (BMI 18.5 - 24.9)
    const idealWeightMin = 18.5 * (heightInMeters * heightInMeters);
    const idealWeightMax = 24.9 * (heightInMeters * heightInMeters);

    const bmiResult = getBMIResult(bmi, unit === "imperial" ? idealWeightMin * 2.205 : idealWeightMin, unit === "imperial" ? idealWeightMax * 2.205 : idealWeightMax);
    setResult(bmiResult);
    showToast("BMI calculated successfully!", "success");
  };

  const getBMIResult = (bmi: number, idealMin: number, idealMax: number): BMIResult => {
    const roundedBMI = Math.round(bmi * 10) / 10;

    if (bmi < 16) {
      return {
        bmi: roundedBMI,
        category: "Severely Underweight",
        status: "⚠️ Requires Medical Attention",
        description: "Your BMI indicates severe underweight. This may indicate malnutrition or underlying health conditions.",
        risks: [
          "Weakened immune system",
          "Bone loss and fractures",
          "Anemia and fatigue",
          "Irregular menstrual periods",
          "Growth and development issues"
        ],
        recommendations: [
          "Consult with a healthcare provider immediately",
          "Work with a nutritionist for meal planning",
          "Focus on nutrient-dense, calorie-rich foods",
          "Consider underlying medical conditions",
          "Monitor weight gain progress regularly"
        ],
        color: "text-red-600",
        idealWeight: { min: idealMin, max: idealMax }
      };
    } else if (bmi < 17) {
      return {
        bmi: roundedBMI,
        category: "Moderately Underweight",
        status: "⚠️ Below Healthy Range",
        description: "Your BMI indicates moderate underweight. You may benefit from gaining weight to reach a healthier range.",
        risks: [
          "Increased infection risk",
          "Poor wound healing",
          "Reduced muscle mass",
          "Fatigue and weakness",
          "Nutritional deficiencies"
        ],
        recommendations: [
          "Consult with a healthcare provider",
          "Increase caloric intake gradually",
          "Focus on protein-rich foods",
          "Include healthy fats in your diet",
          "Consider strength training exercises"
        ],
        color: "text-orange-600",
        idealWeight: { min: idealMin, max: idealMax }
      };
    } else if (bmi < 18.5) {
      return {
        bmi: roundedBMI,
        category: "Underweight",
        status: "📈 Consider Weight Gain",
        description: "Your BMI indicates underweight. A small weight gain may help you reach an optimal health range.",
        risks: [
          "Reduced muscle strength",
          "Lower bone density",
          "Slower recovery from illness",
          "Reduced energy levels",
          "Potential fertility issues"
        ],
        recommendations: [
          "Eat regular, balanced meals",
          "Include healthy snacks between meals",
          "Focus on lean proteins and complex carbs",
          "Stay hydrated",
          "Consider talking to a nutritionist"
        ],
        color: "text-yellow-600",
        idealWeight: { min: idealMin, max: idealMax }
      };
    } else if (bmi < 25) {
      return {
        bmi: roundedBMI,
        category: "Normal Weight",
        status: "✅ Healthy Range",
        description: "Congratulations! Your BMI falls within the healthy weight range. Maintain your current lifestyle.",
        risks: [
          "Generally low health risks",
          "Optimal heart health",
          "Good metabolic function",
          "Reduced disease risk",
          "Better physical performance"
        ],
        recommendations: [
          "Maintain a balanced diet",
          "Continue regular physical activity",
          "Stay hydrated",
          "Get adequate sleep",
          "Monitor weight periodically"
        ],
        color: "text-green-600",
        idealWeight: { min: idealMin, max: idealMax }
      };
    } else if (bmi < 30) {
      return {
        bmi: roundedBMI,
        category: "Overweight",
        status: "📉 Consider Weight Loss",
        description: "Your BMI indicates overweight. Losing some weight may reduce health risks and improve well-being.",
        risks: [
          "Increased diabetes risk",
          "Higher blood pressure",
          "Sleep apnea",
          "Heart disease risk",
          "Joint problems"
        ],
        recommendations: [
          "Create a moderate calorie deficit",
          "Increase physical activity",
          "Focus on portion control",
          "Choose nutrient-dense foods",
          "Consider consulting a healthcare provider"
        ],
        color: "text-yellow-600",
        idealWeight: { min: idealMin, max: idealMax }
      };
    } else if (bmi < 35) {
      return {
        bmi: roundedBMI,
        category: "Obesity Class I",
        status: "⚠️ Health Risk",
        description: "Your BMI indicates Class I obesity. Weight loss is recommended to reduce health risks.",
        risks: [
          "Type 2 diabetes",
          "High blood pressure",
          "Heart disease",
          "Stroke risk",
          "Certain cancers"
        ],
        recommendations: [
          "Consult with a healthcare provider",
          "Create a structured weight loss plan",
          "Focus on lifestyle changes",
          "Consider professional guidance",
          "Set realistic, gradual goals"
        ],
        color: "text-orange-600",
        idealWeight: { min: idealMin, max: idealMax }
      };
    } else if (bmi < 40) {
      return {
        bmi: roundedBMI,
        category: "Obesity Class II",
        status: "⚠️ High Health Risk",
        description: "Your BMI indicates Class II obesity. Medical supervision for weight loss is strongly recommended.",
        risks: [
          "Severe diabetes complications",
          "Cardiovascular disease",
          "Sleep disorders",
          "Liver disease",
          "Reduced life expectancy"
        ],
        recommendations: [
          "Seek immediate medical consultation",
          "Consider medically supervised weight loss",
          "Explore all treatment options",
          "Focus on gradual, sustainable changes",
          "Monitor health markers regularly"
        ],
        color: "text-red-600",
        idealWeight: { min: idealMin, max: idealMax }
      };
    } else {
      return {
        bmi: roundedBMI,
        category: "Obesity Class III",
        status: "🚨 Severe Health Risk",
        description: "Your BMI indicates Class III obesity. Immediate medical intervention is strongly recommended.",
        risks: [
          "Life-threatening complications",
          "Severe cardiovascular issues",
          "Multiple organ system problems",
          "Significantly reduced life expectancy",
          "Mobility limitations"
        ],
        recommendations: [
          "Seek immediate medical attention",
          "Consider bariatric surgery consultation",
          "Work with multidisciplinary medical team",
          "Address underlying health conditions",
          "Focus on comprehensive lifestyle intervention"
        ],
        color: "text-red-700",
        idealWeight: { min: idealMin, max: idealMax }
      };
    }
  };

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  const getBMIGauge = (bmi: number) => {
    const maxBMI = 40;
    const percentage = Math.min((bmi / maxBMI) * 100, 100);
    return percentage;
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

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-green-600 dark:to-green-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          BMI Calculator
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Calculate your Body Mass Index (BMI) and get personalized health insights. 
          Understand your weight status and receive tailored recommendations.
        </p>
      </div>

      {/* Calculator Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-500" />
            BMI Calculation
          </CardTitle>
          <CardDescription>
            Enter your weight and height to calculate your BMI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="unit-select">Unit System</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="unit-select" aria-label="Select unit system">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">
                Weight {unit === "metric" ? "(kg)" : "(lbs)"} <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "70" : "154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step="0.1"
                min="1"
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">
                Height {unit === "metric" ? "(cm)" : "(inches)"} <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "175" : "69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                step="0.1"
                min="1"
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={calculateBMI} 
              className="flex-1"
              disabled={!weight || !height}
              aria-label="Calculate BMI based on weight and height"
            >
              <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
              Calculate BMI
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
              className="flex-1 sm:flex-initial"
              aria-label="Reset calculator and clear all fields"
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* BMI Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Your BMI Results
            </CardTitle>
            <CardDescription>
              Body Mass Index analysis and health insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main BMI Display */}
            <div className="text-center mb-8">
              <div className={`text-6xl sm:text-7xl font-bold ${result.color} mb-4`}>
                {result.bmi}
              </div>
              <div className="text-2xl font-semibold mb-2">
                {result.category}
              </div>
              <div className="text-lg mb-4">
                {result.status}
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            {/* BMI Gauge */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">BMI Scale</span>
                <span className="text-sm font-medium">{result.bmi}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 relative">
                {/* BMI Scale Segments */}
                <div className="absolute inset-0 flex rounded-full overflow-hidden">
                  <div className="bg-blue-400 flex-1"></div>
                  <div className="bg-green-400 flex-1"></div>
                  <div className="bg-yellow-400 flex-1"></div>
                  <div className="bg-orange-400 flex-1"></div>
                  <div className="bg-red-400 flex-1"></div>
                </div>
                <div
                  className="absolute top-0 w-1 h-4 bg-black border border-white rounded-sm"
                  style={{ left: `${Math.min(getBMIGauge(result.bmi), 95)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
                <span>Severe</span>
              </div>
            </div>

            {/* Ideal Weight Range */}
            <Card className="mb-6 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-700 dark:text-green-300">Ideal Weight Range</h3>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  For your height, a healthy weight range is{" "}
                  <span className="font-bold">
                    {Math.round(result.idealWeight.min * 10) / 10} - {Math.round(result.idealWeight.max * 10) / 10}
                  </span>{" "}
                  {unit === "metric" ? "kg" : "lbs"}
                </p>
              </CardContent>
            </Card>

            {/* Health Risks & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5 text-red-500" />
                    Health Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.risks.map((risk, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{risk}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5 text-green-500" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* BMI Categories Reference */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>BMI Categories Reference</CardTitle>
          <CardDescription>
            Standard BMI categories and their health implications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="font-medium text-blue-700 dark:text-blue-300">Underweight</div>
              <div className="text-blue-600 dark:text-blue-400">BMI &lt; 18.5</div>
              <div className="text-muted-foreground text-xs mt-1">May indicate malnutrition</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="font-medium text-green-700 dark:text-green-300">Normal Weight</div>
              <div className="text-green-600 dark:text-green-400">BMI 18.5-24.9</div>
              <div className="text-muted-foreground text-xs mt-1">Healthy weight range</div>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="font-medium text-yellow-700 dark:text-yellow-300">Overweight</div>
              <div className="text-yellow-600 dark:text-yellow-400">BMI 25-29.9</div>
              <div className="text-muted-foreground text-xs mt-1">Increased health risks</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="font-medium text-red-700 dark:text-red-300">Obese</div>
              <div className="text-red-600 dark:text-red-400">BMI ≥ 30</div>
              <div className="text-muted-foreground text-xs mt-1">Significant health risks</div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function BmiCalculatorPage() {
  return (
    <ToolPageWrapper toolSlug="bmi-calculator"><ToastProvider>
      <BmiCalculatorContent /></ToastProvider></ToolPageWrapper>
  );
} 