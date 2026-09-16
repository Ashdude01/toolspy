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
  Calculator,
  ArrowUpDown,
  Ruler,
  Scale,
  Droplets,
  Thermometer,
  Square,
  Shield,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ConversionResult {
  inputValue: number;
  inputUnit: string;
  outputValue: number;
  outputUnit: string;
  category: string;
}

function UnitConverterContent() {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState("1");
  const [category, setCategory] = useState("length");
  const [inputUnit, setInputUnit] = useState("meters");
  const [outputUnit, setOutputUnit] = useState("feet");
  const [result, setResult] = useState<ConversionResult | null>(null);

  // Comprehensive conversion factors organized by category
  const conversionData = {
    length: {
      factors: {
        millimeters: 0.001,
        centimeters: 0.01,
        meters: 1,
        kilometers: 1000,
        inches: 0.0254,
        feet: 0.3048,
        yards: 0.9144,
        miles: 1609.344,
      },
      units: [
        { value: "millimeters", label: "Millimeters (mm)" },
        { value: "centimeters", label: "Centimeters (cm)" },
        { value: "meters", label: "Meters (m)" },
        { value: "kilometers", label: "Kilometers (km)" },
        { value: "inches", label: "Inches (in)" },
        { value: "feet", label: "Feet (ft)" },
        { value: "yards", label: "Yards (yd)" },
        { value: "miles", label: "Miles (mi)" },
      ],
    },
    weight: {
      factors: {
        milligrams: 0.001,
        grams: 1,
        kilograms: 1000,
        tonnes: 1000000,
        ounces: 28.3495,
        pounds: 453.592,
        stones: 6350.29,
      },
      units: [
        { value: "milligrams", label: "Milligrams (mg)" },
        { value: "grams", label: "Grams (g)" },
        { value: "kilograms", label: "Kilograms (kg)" },
        { value: "tonnes", label: "Tonnes (t)" },
        { value: "ounces", label: "Ounces (oz)" },
        { value: "pounds", label: "Pounds (lb)" },
        { value: "stones", label: "Stones (st)" },
      ],
    },
    volume: {
      factors: {
        milliliters: 0.001,
        liters: 1,
        cubicMeters: 1000,
        fluidOuncesUS: 0.0295735,
        cupsUS: 0.236588,
        gallonsUS: 3.78541,
        gallonsUK: 4.54609,
      },
      units: [
        { value: "milliliters", label: "Milliliters (ml)" },
        { value: "liters", label: "Liters (L)" },
        { value: "cubicMeters", label: "Cubic Meters (m³)" },
        { value: "fluidOuncesUS", label: "Fluid Ounces US (fl oz)" },
        { value: "cupsUS", label: "Cups US (cup)" },
        { value: "gallonsUS", label: "Gallons US (gal)" },
        { value: "gallonsUK", label: "Gallons UK (gal)" },
      ],
    },
    area: {
      factors: {
        squareCentimeters: 0.0001,
        squareMeters: 1,
        hectares: 10000,
        squareKilometers: 1000000,
        squareInches: 0.00064516,
        squareFeet: 0.092903,
        squareYards: 0.836127,
        acres: 4046.86,
      },
      units: [
        { value: "squareCentimeters", label: "Square Centimeters (cm²)" },
        { value: "squareMeters", label: "Square Meters (m²)" },
        { value: "hectares", label: "Hectares (ha)" },
        { value: "squareKilometers", label: "Square Kilometers (km²)" },
        { value: "squareInches", label: "Square Inches (in²)" },
        { value: "squareFeet", label: "Square Feet (ft²)" },
        { value: "squareYards", label: "Square Yards (yd²)" },
        { value: "acres", label: "Acres (acre)" },
      ],
    },
    temperature: {
      // Temperature uses special conversion logic
      units: [
        { value: "celsius", label: "Celsius (°C)" },
        { value: "fahrenheit", label: "Fahrenheit (°F)" },
        { value: "kelvin", label: "Kelvin (K)" },
        { value: "rankine", label: "Rankine (°R)" },
      ],
    },
  };

  const convertUnits = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      showToast("Please enter a valid number", "error");
      return;
    }

    let outputValue = 0;

    if (category === "temperature") {
      outputValue = convertTemperature(value, inputUnit, outputUnit);
    } else {
      const categoryData = conversionData[category as keyof typeof conversionData] as any;
      const baseValue = value * categoryData.factors[inputUnit];
      outputValue = baseValue / categoryData.factors[outputUnit];
    }

    const conversionResult: ConversionResult = {
      inputValue: value,
      inputUnit,
      outputValue,
      outputUnit,
      category,
    };

    setResult(conversionResult);
    showToast("Units converted successfully!", "success");
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius = 0;
    switch (from) {
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

    // Convert from Celsius to target
    switch (to) {
      case "celsius":
        return celsius;
      case "fahrenheit":
        return celsius * (9/5) + 32;
      case "kelvin":
        return celsius + 273.15;
      case "rankine":
        return (celsius + 273.15) * (9/5);
      default:
        return celsius;
    }
  };

  const swapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
  };

  const resetConverter = () => {
    setInputValue("1");
    setCategory("length");
    setInputUnit("meters");
    setOutputUnit("feet");
    setResult(null);
  };

  const formatValue = (value: number) => {
    if (value === 0) return "0";
    if (Math.abs(value) >= 1e9) return value.toExponential(3);
    if (Math.abs(value) >= 1e6) return (value / 1e6).toFixed(3) + "M";
    if (Math.abs(value) >= 1e3) return (value / 1e3).toFixed(3) + "K";
    if (Math.abs(value) >= 1) return value.toFixed(6).replace(/\.?0+$/, "");
    if (Math.abs(value) >= 0.001) return value.toFixed(6).replace(/\.?0+$/, "");
    return value.toExponential(3);
  };

  const getCategoryIcon = (cat: string) => {
    const icons = {
      length: <Ruler className="h-5 w-5" />,
      weight: <Scale className="h-5 w-5" />,
      volume: <Droplets className="h-5 w-5" />,
      area: <Square className="h-5 w-5" />,
      temperature: <Thermometer className="h-5 w-5" />,
    };
    return icons[cat as keyof typeof icons];
  };

  const updateUnitsForCategory = (newCategory: string) => {
    const defaultUnits = {
      length: { input: "meters", output: "feet" },
      weight: { input: "kilograms", output: "pounds" },
      volume: { input: "liters", output: "gallonsUS" },
      area: { input: "squareMeters", output: "squareFeet" },
      temperature: { input: "celsius", output: "fahrenheit" },
    };

    const defaults = defaultUnits[newCategory as keyof typeof defaultUnits];
    setInputUnit(defaults.input);
    setOutputUnit(defaults.output);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    updateUnitsForCategory(newCategory);
    setResult(null);
  };

  useEffect(() => {
    if (inputValue) {
      convertUnits();
    }
  }, [inputValue, inputUnit, outputUnit, category]);

  const currentCategoryData = conversionData[category as keyof typeof conversionData] as any;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-purple-500 dark:from-purple-600 to-pink-600 dark:to-pink-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Universal Unit Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert between different units of measurement in one comprehensive tool. 
          Support for length, weight, volume, area, and temperature conversions.
        </p>
      </div>

      {/* Category Selection */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Conversion Category</CardTitle>
          <CardDescription>Choose the type of measurement to convert</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3" role="group" aria-label="Unit conversion category selection">
            {Object.keys(conversionData).map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                onClick={() => handleCategoryChange(cat)}
                className="flex flex-col items-center gap-2 h-20"
                aria-label={`Select ${cat} conversion category`}
                aria-pressed={category === cat}
              >
                <span aria-hidden="true">{getCategoryIcon(cat)}</span>
                <span className="text-xs capitalize">{cat}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Converter Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getCategoryIcon(category)}
            {category.charAt(0).toUpperCase() + category.slice(1)} Conversion
          </CardTitle>
          <CardDescription>
            Enter a value and select units to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Value <span className="text-red-500" aria-label="required">*</span></Label>
              <Input
                id="inputValue"
                type="number"
                placeholder="1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="0.001"
                className="text-lg"
                required
                aria-required="true"
                aria-label="Enter value to convert"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-unit-select">From Unit</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger id="from-unit-select" aria-label={`Select source ${category} unit`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentCategoryData.units.map((unit: any) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="h-10 w-10"
                aria-label="Swap source and target units"
              >
                <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Swap units</span>
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-unit-select">To Unit</Label>
              <Select value={outputUnit} onValueChange={setOutputUnit}>
                <SelectTrigger id="to-unit-select" aria-label={`Select target ${category} unit`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentCategoryData.units.map((unit: any) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={convertUnits} 
              className="flex-1"
              disabled={!inputValue}
              aria-label={`Convert ${category} units based on entered value and selected units`}
            >
              <Calculator className="h-4 w-4 mr-2" aria-hidden="true" />
              Convert Units
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
              Conversion Result
            </CardTitle>
            <CardDescription>
              {category.charAt(0).toUpperCase() + category.slice(1)} conversion result
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Conversion Display */}
            <div className="text-center mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <div className="text-3xl font-bold text-muted-foreground mb-2">
                {formatValue(result.inputValue)} 
              </div>
              <div className="text-lg text-muted-foreground mb-2">
                {currentCategoryData.units.find((u: any) => u.value === result.inputUnit)?.label}
              </div>
              <div className="text-sm text-muted-foreground mb-2">equals</div>
              <div className="text-4xl font-bold text-primary mb-2">
                {formatValue(result.outputValue)}
              </div>
              <div className="text-lg text-muted-foreground">
                {currentCategoryData.units.find((u: any) => u.value === result.outputUnit)?.label}
              </div>
            </div>

            {/* Conversion Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversion Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold capitalize">{result.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Input:</span>
                  <span className="font-semibold">
                    {result.inputValue} {currentCategoryData.units.find((u: any) => u.value === result.inputUnit)?.label.split(' ')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Output:</span>
                  <span className="font-semibold">
                    {formatValue(result.outputValue)} {currentCategoryData.units.find((u: any) => u.value === result.outputUnit)?.label.split(' ')[0]}
                  </span>
                </div>
                {category !== "temperature" && (
                  <div className="flex justify-between">
                    <span>Conversion Factor:</span>
                    <span className="font-semibold">
                      × {formatValue(result.outputValue / result.inputValue)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Quick Access Categories */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Popular Conversions</CardTitle>
          <CardDescription>
            Quick access to commonly used conversions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Length</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 meter =</span>
                  <span>3.281 feet</span>
                </div>
                <div className="flex justify-between">
                  <span>1 kilometer =</span>
                  <span>0.621 miles</span>
                </div>
                <div className="flex justify-between">
                  <span>1 inch =</span>
                  <span>2.54 cm</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Weight</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 kilogram =</span>
                  <span>2.205 lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>1 pound =</span>
                  <span>453.6 grams</span>
                </div>
                <div className="flex justify-between">
                  <span>1 stone =</span>
                  <span>14 pounds</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Thermometer className="h-5 w-5 text-red-500" />
                <span className="font-semibold">Temperature</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>0°C =</span>
                  <span>32°F</span>
                </div>
                <div className="flex justify-between">
                  <span>100°C =</span>
                  <span>212°F</span>
                </div>
                <div className="flex justify-between">
                  <span>20°C =</span>
                  <span>68°F</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Unit Conversion Tips</CardTitle>
          <CardDescription>
            Helpful information about unit conversions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Metric System</div>
              <div className="text-muted-foreground">
                Based on powers of 10, used worldwide in science and most countries
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Imperial System</div>
              <div className="text-muted-foreground">
                Traditional system still used in US for everyday measurements
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Precision</div>
              <div className="text-muted-foreground">
                Results are rounded for display but calculations use full precision
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Context Matters</div>
              <div className="text-muted-foreground">
                Choose units appropriate for your specific application or region
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
</div>
  );
}

export default function UnitConverterPage() {
  return (
    <ToolPageWrapper toolSlug="unit-converter"><ToastProvider>
      <UnitConverterContent /></ToastProvider></ToolPageWrapper>
  );
} 