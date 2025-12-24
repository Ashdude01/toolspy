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
  Thermometer,
  ArrowUpDown,
  Calculator,
  Snowflake,
  Sun,
  Shield,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { TemperatureConverterSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface TemperatureResult {
  inputValue: number;
  inputUnit: string;
  celsius: number;
  fahrenheit: number;
  kelvin: number;
  rankine: number;
  description: string;
  category: string;
}

function TemperatureConverterContent() {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState("25");
  const [inputUnit, setInputUnit] = useState("celsius");
  const [outputUnit, setOutputUnit] = useState("fahrenheit");
  const [result, setResult] = useState<TemperatureResult | null>(null);

  const convertTemperature = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      showToast("Please enter a valid temperature", "error");
      return;
    }

    let celsius = 0;
    let fahrenheit = 0;
    let kelvin = 0;
    let rankine = 0;

    // Convert input to Celsius first
    switch (inputUnit) {
      case "celsius":
        celsius = value;
        break;
      case "fahrenheit":
        celsius = (value - 32) * (5/9);
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
      case "rankine":
        celsius = (value - 491.67) * (5/9);
        break;
    }

    // Convert from Celsius to all units
    fahrenheit = celsius * (9/5) + 32;
    kelvin = celsius + 273.15;
    rankine = (celsius + 273.15) * (9/5);

    // Get temperature description and category
    const { description, category } = getTemperatureDescription(celsius);

    const temperatureResult: TemperatureResult = {
      inputValue: value,
      inputUnit,
      celsius,
      fahrenheit,
      kelvin,
      rankine,
      description,
      category
    };

    setResult(temperatureResult);
    showToast("Temperature converted successfully!", "success");
  };

  const getTemperatureDescription = (celsius: number) => {
    if (celsius < -273.15) {
      return { description: "Below absolute zero (impossible)", category: "impossible" };
    } else if (celsius < -100) {
      return { description: "Extremely cold (liquid nitrogen)", category: "extreme-cold" };
    } else if (celsius < -40) {
      return { description: "Arctic conditions", category: "arctic" };
    } else if (celsius < 0) {
      return { description: "Freezing point of water", category: "freezing" };
    } else if (celsius < 10) {
      return { description: "Cold weather", category: "cold" };
    } else if (celsius < 20) {
      return { description: "Cool weather", category: "cool" };
    } else if (celsius < 30) {
      return { description: "Comfortable room temperature", category: "comfortable" };
    } else if (celsius < 40) {
      return { description: "Warm weather", category: "warm" };
    } else if (celsius < 50) {
      return { description: "Hot weather", category: "hot" };
    } else if (celsius < 100) {
      return { description: "Very hot", category: "very-hot" };
    } else if (celsius === 100) {
      return { description: "Boiling point of water", category: "boiling" };
    } else if (celsius < 200) {
      return { description: "Extremely hot", category: "extreme-hot" };
    } else {
      return { description: "Industrial/scientific temperatures", category: "industrial" };
    }
  };

  const swapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
    if (result) {
      convertTemperature();
    }
  };

  const resetConverter = () => {
    setInputValue("25");
    setInputUnit("celsius");
    setOutputUnit("fahrenheit");
    setResult(null);
  };

  const formatTemperature = (value: number, unit: string) => {
    const symbols = {
      celsius: "°C",
      fahrenheit: "°F",
      kelvin: "K",
      rankine: "°R"
    };
    
    return `${value.toFixed(2)} ${symbols[unit as keyof typeof symbols]}`;
  };

  const getUnitName = (unit: string) => {
    const names = {
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
      rankine: "Rankine"
    };
    return names[unit as keyof typeof names];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "impossible": "text-purple-600",
      "extreme-cold": "text-blue-700",
      "arctic": "text-blue-600",
      "freezing": "text-blue-500",
      "cold": "text-blue-400",
      "cool": "text-green-400",
      "comfortable": "text-green-600",
      "warm": "text-yellow-500",
      "hot": "text-orange-500",
      "very-hot": "text-red-500",
      "boiling": "text-red-600",
      "extreme-hot": "text-red-700",
      "industrial": "text-purple-600"
    };
    return colors[category as keyof typeof colors] || "text-gray-600";
  };

  useEffect(() => {
    if (inputValue) {
      convertTemperature();
    }
  }, [inputValue, inputUnit]);

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

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-red-600 dark:to-red-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Temperature Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine. 
          Get instant conversions with temperature descriptions and scientific context.
        </p>
      </div>

      {/* Converter Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-blue-500" />
            Temperature Conversion
          </CardTitle>
          <CardDescription>
            Enter a temperature and select units to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Temperature Value <span className="text-red-500" aria-label="required">*</span></Label>
              <Input
                id="inputValue"
                type="number"
                placeholder="25"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="0.01"
                className="text-lg"
                required
                aria-required="true"
                aria-label="Enter temperature value to convert"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-unit-select">From Unit</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger id="from-unit-select" aria-label="Select source temperature unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                  <SelectItem value="rankine">Rankine (°R)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="h-10 w-10"
                aria-label="Swap source and target temperature units"
              >
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Swap units</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-unit-select">To Unit</Label>
              <Select value={outputUnit} onValueChange={setOutputUnit}>
                <SelectTrigger id="to-unit-select" aria-label="Select target temperature unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                  <SelectItem value="rankine">Rankine (°R)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={convertTemperature} 
              className="flex-1"
              disabled={!inputValue}
              aria-label="Convert temperature based on entered value and selected units"
            >
              <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
              Convert Temperature
            </Button>
            <Button 
              variant="outline" 
              onClick={resetConverter}
              className="flex-1 sm:flex-initial"
              aria-label="Reset converter and clear all fields"
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
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
              Temperature Conversion Results
            </CardTitle>
            <CardDescription>
              All temperature scales with contextual information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Conversion Display */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-900/20 dark:to-red-900/20 rounded-lg">
              <div className="text-3xl font-bold text-muted-foreground mb-2">
                {formatTemperature(result.inputValue, result.inputUnit)}
              </div>
              <div className="text-sm text-muted-foreground mb-2">equals</div>
              <div className="text-5xl font-bold text-primary mb-2">
                {formatTemperature(result[outputUnit as keyof TemperatureResult] as number, outputUnit)}
              </div>
              <div className={`text-lg font-semibold ${getCategoryColor(result.category)} mt-4`}>
                {result.description}
              </div>
            </div>

            {/* All Unit Conversions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formatTemperature(result.celsius, "celsius")}
                  </div>
                  <div className="text-sm text-muted-foreground">Celsius</div>
                </div>
              </Card>
              <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {formatTemperature(result.fahrenheit, "fahrenheit")}
                  </div>
                  <div className="text-sm text-muted-foreground">Fahrenheit</div>
                </div>
              </Card>
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatTemperature(result.kelvin, "kelvin")}
                  </div>
                  <div className="text-sm text-muted-foreground">Kelvin</div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatTemperature(result.rankine, "rankine")}
                  </div>
                  <div className="text-sm text-muted-foreground">Rankine</div>
                </div>
              </Card>
            </div>

            {/* Temperature Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Snowflake className="h-5 w-5" />
                  Temperature Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">Category:</span>
                  <span className={`font-semibold ${getCategoryColor(result.category)}`}>
                    {result.description}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-2">Reference Points:</div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Absolute Zero:</span>
                        <span>-273.15°C / -459.67°F</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water Freezes:</span>
                        <span>0°C / 32°F</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room Temperature:</span>
                        <span>20°C / 68°F</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Body Temperature:</span>
                        <span>37°C / 98.6°F</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water Boils:</span>
                        <span>100°C / 212°F</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Scale Information:</div>
                    <div className="space-y-1">
                      <div><strong>Celsius:</strong> Based on water's freezing/boiling points</div>
                      <div><strong>Fahrenheit:</strong> Common in US, more granular scale</div>
                      <div><strong>Kelvin:</strong> Absolute temperature scale for science</div>
                      <div><strong>Rankine:</strong> Absolute scale using Fahrenheit degrees</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Temperature Reference Table */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Temperature Reference Table
          </CardTitle>
          <CardDescription>
            Common temperature points in different scales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Description</th>
                  <th className="text-right p-2">Celsius (°C)</th>
                  <th className="text-right p-2">Fahrenheit (°F)</th>
                  <th className="text-right p-2">Kelvin (K)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Absolute Zero</td>
                  <td className="text-right p-2">-273.15</td>
                  <td className="text-right p-2">-459.67</td>
                  <td className="text-right p-2">0.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Dry Ice</td>
                  <td className="text-right p-2">-78.5</td>
                  <td className="text-right p-2">-109.3</td>
                  <td className="text-right p-2">194.65</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Water Freezes</td>
                  <td className="text-right p-2">0.00</td>
                  <td className="text-right p-2">32.00</td>
                  <td className="text-right p-2">273.15</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Room Temperature</td>
                  <td className="text-right p-2">20.00</td>
                  <td className="text-right p-2">68.00</td>
                  <td className="text-right p-2">293.15</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Body Temperature</td>
                  <td className="text-right p-2">37.00</td>
                  <td className="text-right p-2">98.60</td>
                  <td className="text-right p-2">310.15</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Water Boils</td>
                  <td className="text-right p-2">100.00</td>
                  <td className="text-right p-2">212.00</td>
                  <td className="text-right p-2">373.15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Formulas */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Temperature Conversion Formulas</CardTitle>
          <CardDescription>
            Mathematical formulas for temperature conversions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Celsius to Fahrenheit</div>
              <div className="text-muted-foreground">°F = (°C × 9/5) + 32</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Fahrenheit to Celsius</div>
              <div className="text-muted-foreground">°C = (°F - 32) × 5/9</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Celsius to Kelvin</div>
              <div className="text-muted-foreground">K = °C + 273.15</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Kelvin to Celsius</div>
              <div className="text-muted-foreground">°C = K - 273.15</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <TemperatureConverterSEOContent />
    </div>
  );
}

export default function TemperatureConverterPage() {
  return (
    <ToolPageWrapper toolSlug="temperature-converter"><ToastProvider>
      <TemperatureConverterContent /></ToastProvider></ToolPageWrapper>
  );
} 