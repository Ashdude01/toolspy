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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Scale,
  ArrowUpDown,
  Calculator,
  Weight,
  Shield,
  RefreshCw,
  TrendingUp,
  Globe,
} from "lucide-react";
import { WeightConverterSEOContent } from "./seo-content";

interface WeightResult {
  inputValue: number;
  inputUnit: string;
  outputValue: number;
  outputUnit: string;
  allConversions: {
    milligrams: number;
    grams: number;
    kilograms: number;
    tonnes: number;
    ounces: number;
    pounds: number;
    stones: number;
    shortTons: number;
    longTons: number;
    carats: number;
  };
}

function WeightConverterContent() {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState("kilograms");
  const [outputUnit, setOutputUnit] = useState("pounds");
  const [result, setResult] = useState<WeightResult | null>(null);

  // Conversion factors to grams
  const conversionFactors = {
    milligrams: 0.001,
    grams: 1,
    kilograms: 1000,
    tonnes: 1000000,
    ounces: 28.3495,
    pounds: 453.592,
    stones: 6350.29,
    shortTons: 907185,
    longTons: 1016047,
    carats: 0.2,
  };

  const unitSymbols = {
    milligrams: "mg",
    grams: "g",
    kilograms: "kg",
    tonnes: "t",
    ounces: "oz",
    pounds: "lb",
    stones: "st",
    shortTons: "short ton",
    longTons: "long ton",
    carats: "ct",
  };

  const convertWeight = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      showToast("Please enter a valid weight", "error");
      return;
    }

    // Convert input to grams first
    const grams = value * conversionFactors[inputUnit as keyof typeof conversionFactors];
    
    // Convert from grams to all other units
    const allConversions = {
      milligrams: grams / conversionFactors.milligrams,
      grams: grams / conversionFactors.grams,
      kilograms: grams / conversionFactors.kilograms,
      tonnes: grams / conversionFactors.tonnes,
      ounces: grams / conversionFactors.ounces,
      pounds: grams / conversionFactors.pounds,
      stones: grams / conversionFactors.stones,
      shortTons: grams / conversionFactors.shortTons,
      longTons: grams / conversionFactors.longTons,
      carats: grams / conversionFactors.carats,
    };

    const outputValue = allConversions[outputUnit as keyof typeof allConversions];

    const weightResult: WeightResult = {
      inputValue: value,
      inputUnit,
      outputValue,
      outputUnit,
      allConversions,
    };

    setResult(weightResult);
    showToast("Weight converted successfully!", "success");
  };

  const swapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
  };

  const resetConverter = () => {
    setInputValue("1");
    setInputUnit("kilograms");
    setOutputUnit("pounds");
    setResult(null);
  };

  const formatValue = (value: number) => {
    if (value === 0) return "0";
    if (value >= 1e9) return (value / 1e9).toFixed(3) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(3) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(3) + "K";
    if (value >= 1) return value.toFixed(6).replace(/\.?0+$/, "");
    if (value >= 0.001) return value.toFixed(6).replace(/\.?0+$/, "");
    return value.toExponential(3);
  };

  const getUnitDisplayName = (unit: string) => {
    const names = {
      milligrams: "Milligrams",
      grams: "Grams",
      kilograms: "Kilograms",
      tonnes: "Tonnes",
      ounces: "Ounces",
      pounds: "Pounds",
      stones: "Stones",
      shortTons: "Short Tons (US)",
      longTons: "Long Tons (Imperial)",
      carats: "Carats",
    };
    return names[unit as keyof typeof names];
  };

  const getWeightContext = (grams: number) => {
    if (grams < 1) return "Very light (less than a paperclip)";
    if (grams < 10) return "Light (coin or small jewelry)";
    if (grams < 100) return "Moderate (smartphone or small fruit)";
    if (grams < 1000) return "Heavy (book or tablet)";
    if (grams < 10000) return "Very heavy (laptop or small pet)";
    if (grams < 100000) return "Extremely heavy (large person or furniture)";
    if (grams < 1000000) return "Vehicle weight (car or truck)";
    return "Industrial weight (heavy machinery)";
  };

  useEffect(() => {
    if (inputValue) {
      convertWeight();
    }
  }, [inputValue, inputUnit, outputUnit]);

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

        <h1 className="bg-gradient-to-r from-purple-500 dark:from-purple-600 to-orange-600 dark:to-orange-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Weight Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert between different units of weight and mass. 
          Support for metric, imperial, and specialized units with precise calculations.
        </p>
      </div>

      {/* Converter Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-purple-500" />
            Weight Conversion
          </CardTitle>
          <CardDescription>
            Enter a weight value and select units to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Weight Value</Label>
              <Input
                id="inputValue"
                type="number"
                placeholder="1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="0.001"
                className="text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>From Unit</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milligrams">Milligrams (mg)</SelectItem>
                  <SelectItem value="grams">Grams (g)</SelectItem>
                  <SelectItem value="kilograms">Kilograms (kg)</SelectItem>
                  <SelectItem value="tonnes">Tonnes (t)</SelectItem>
                  <SelectItem value="ounces">Ounces (oz)</SelectItem>
                  <SelectItem value="pounds">Pounds (lb)</SelectItem>
                  <SelectItem value="stones">Stones (st)</SelectItem>
                  <SelectItem value="shortTons">Short Tons (US)</SelectItem>
                  <SelectItem value="longTons">Long Tons (Imperial)</SelectItem>
                  <SelectItem value="carats">Carats (ct)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="h-10 w-10"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>To Unit</Label>
              <Select value={outputUnit} onValueChange={setOutputUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milligrams">Milligrams (mg)</SelectItem>
                  <SelectItem value="grams">Grams (g)</SelectItem>
                  <SelectItem value="kilograms">Kilograms (kg)</SelectItem>
                  <SelectItem value="tonnes">Tonnes (t)</SelectItem>
                  <SelectItem value="ounces">Ounces (oz)</SelectItem>
                  <SelectItem value="pounds">Pounds (lb)</SelectItem>
                  <SelectItem value="stones">Stones (st)</SelectItem>
                  <SelectItem value="shortTons">Short Tons (US)</SelectItem>
                  <SelectItem value="longTons">Long Tons (Imperial)</SelectItem>
                  <SelectItem value="carats">Carats (ct)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={convertWeight} 
              className="flex-1"
              disabled={!inputValue}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Convert Weight
            </Button>
            <Button 
              variant="outline" 
              onClick={resetConverter}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Results */}
      {result && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Weight Conversion Results
            </CardTitle>
            <CardDescription>
              Comprehensive conversion to all supported units
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Conversion Display */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-lg">
              <div className="text-3xl font-bold text-muted-foreground mb-2">
                {formatValue(result.inputValue)} {unitSymbols[result.inputUnit as keyof typeof unitSymbols]}
              </div>
              <div className="text-sm text-muted-foreground mb-2">equals</div>
              <div className="text-5xl font-bold text-primary mb-2">
                {formatValue(result.outputValue)} {unitSymbols[result.outputUnit as keyof typeof unitSymbols]}
              </div>
              <div className="text-lg text-muted-foreground mb-4">
                {getUnitDisplayName(result.inputUnit)} → {getUnitDisplayName(result.outputUnit)}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                {getWeightContext(result.inputValue * conversionFactors[result.inputUnit as keyof typeof conversionFactors])}
              </div>
            </div>

            {/* All Unit Conversions - Metric */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Metric Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {formatValue(result.allConversions.milligrams)}
                    </div>
                    <div className="text-sm text-muted-foreground">Milligrams (mg)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {formatValue(result.allConversions.grams)}
                    </div>
                    <div className="text-sm text-muted-foreground">Grams (g)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {formatValue(result.allConversions.kilograms)}
                    </div>
                    <div className="text-sm text-muted-foreground">Kilograms (kg)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600 mb-1">
                      {formatValue(result.allConversions.tonnes)}
                    </div>
                    <div className="text-sm text-muted-foreground">Tonnes (t)</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* All Unit Conversions - Imperial */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Weight className="h-5 w-5" />
                Imperial Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {formatValue(result.allConversions.ounces)}
                    </div>
                    <div className="text-sm text-muted-foreground">Ounces (oz)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600 mb-1">
                      {formatValue(result.allConversions.pounds)}
                    </div>
                    <div className="text-sm text-muted-foreground">Pounds (lb)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600 mb-1">
                      {formatValue(result.allConversions.stones)}
                    </div>
                    <div className="text-sm text-muted-foreground">Stones (st)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-pink-50 dark:bg-pink-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-pink-600 mb-1">
                      {formatValue(result.allConversions.shortTons)}
                    </div>
                    <div className="text-sm text-muted-foreground">Short Tons (US)</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Special Units */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Special Units</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 bg-cyan-50 dark:bg-cyan-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-cyan-600 mb-1">
                      {formatValue(result.allConversions.longTons)}
                    </div>
                    <div className="text-sm text-muted-foreground">Long Tons (Imperial)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-violet-50 dark:bg-violet-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-violet-600 mb-1">
                      {formatValue(result.allConversions.carats)}
                    </div>
                    <div className="text-sm text-muted-foreground">Carats (ct)</div>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weight Reference Table */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Weight Conversion Reference</CardTitle>
          <CardDescription>
            Common weight conversions for quick reference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Unit</th>
                  <th className="text-right p-2">Symbol</th>
                  <th className="text-right p-2">Grams</th>
                  <th className="text-right p-2">Pounds</th>
                  <th className="text-right p-2">Ounces</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Milligram</td>
                  <td className="text-right p-2">mg</td>
                  <td className="text-right p-2">0.001</td>
                  <td className="text-right p-2">0.0000022</td>
                  <td className="text-right p-2">0.000035</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Gram</td>
                  <td className="text-right p-2">g</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">0.0022</td>
                  <td className="text-right p-2">0.035</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Kilogram</td>
                  <td className="text-right p-2">kg</td>
                  <td className="text-right p-2">1000</td>
                  <td className="text-right p-2">2.205</td>
                  <td className="text-right p-2">35.27</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Ounce</td>
                  <td className="text-right p-2">oz</td>
                  <td className="text-right p-2">28.35</td>
                  <td className="text-right p-2">0.0625</td>
                  <td className="text-right p-2">1.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Pound</td>
                  <td className="text-right p-2">lb</td>
                  <td className="text-right p-2">453.6</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">16.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Stone</td>
                  <td className="text-right p-2">st</td>
                  <td className="text-right p-2">6350</td>
                  <td className="text-right p-2">14.00</td>
                  <td className="text-right p-2">224.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Carat</td>
                  <td className="text-right p-2">ct</td>
                  <td className="text-right p-2">0.2</td>
                  <td className="text-right p-2">0.00044</td>
                  <td className="text-right p-2">0.007</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weight Measurement Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Weight Measurement Tips</CardTitle>
          <CardDescription>
            Useful information about different weight units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Metric System</div>
              <div className="text-muted-foreground">
                Based on grams and powers of 10, used worldwide in science and most countries
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Imperial System</div>
              <div className="text-muted-foreground">
                Based on pounds and ounces, primarily used in the United States
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Stones</div>
              <div className="text-muted-foreground">
                Traditional British unit (14 pounds), still used for body weight in UK
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Carats</div>
              <div className="text-muted-foreground">
                Specialized unit for gemstones and precious metals (200 milligrams)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <WeightConverterSEOContent />
    </div>
  );
}

export default function WeightConverterPage() {
  return (
    <ToastProvider>
      <WeightConverterContent />
    </ToastProvider>
  );
} 