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
  Droplets,
  ArrowUpDown,
  Calculator,
  Beaker,
  Shield,
  RefreshCw,
  TrendingUp,
  Globe,
} from "lucide-react";
import { VolumeConverterSEOContent } from "./seo-content";

interface VolumeResult {
  inputValue: number;
  inputUnit: string;
  outputValue: number;
  outputUnit: string;
  allConversions: {
    milliliters: number;
    liters: number;
    cubicMeters: number;
    fluidOuncesUS: number;
    cupsUS: number;
    pintsUS: number;
    quartsUS: number;
    gallonsUS: number;
    fluidOuncesUK: number;
    pintsUK: number;
    gallonsUK: number;
    cubicInches: number;
    cubicFeet: number;
  };
}

function VolumeConverterContent() {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState("liters");
  const [outputUnit, setOutputUnit] = useState("gallonsUS");
  const [result, setResult] = useState<VolumeResult | null>(null);

  // Conversion factors to liters
  const conversionFactors = {
    milliliters: 0.001,
    liters: 1,
    cubicMeters: 1000,
    fluidOuncesUS: 0.0295735,
    cupsUS: 0.236588,
    pintsUS: 0.473176,
    quartsUS: 0.946353,
    gallonsUS: 3.78541,
    fluidOuncesUK: 0.0284131,
    pintsUK: 0.568261,
    gallonsUK: 4.54609,
    cubicInches: 0.0163871,
    cubicFeet: 28.3168,
  };

  const unitSymbols = {
    milliliters: "ml",
    liters: "L",
    cubicMeters: "m³",
    fluidOuncesUS: "fl oz (US)",
    cupsUS: "cup (US)",
    pintsUS: "pt (US)",
    quartsUS: "qt (US)",
    gallonsUS: "gal (US)",
    fluidOuncesUK: "fl oz (UK)",
    pintsUK: "pt (UK)",
    gallonsUK: "gal (UK)",
    cubicInches: "in³",
    cubicFeet: "ft³",
  };

  const convertVolume = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      showToast("Please enter a valid volume", "error");
      return;
    }

    // Convert input to liters first
    const liters = value * conversionFactors[inputUnit as keyof typeof conversionFactors];
    
    // Convert from liters to all other units
    const allConversions = {
      milliliters: liters / conversionFactors.milliliters,
      liters: liters / conversionFactors.liters,
      cubicMeters: liters / conversionFactors.cubicMeters,
      fluidOuncesUS: liters / conversionFactors.fluidOuncesUS,
      cupsUS: liters / conversionFactors.cupsUS,
      pintsUS: liters / conversionFactors.pintsUS,
      quartsUS: liters / conversionFactors.quartsUS,
      gallonsUS: liters / conversionFactors.gallonsUS,
      fluidOuncesUK: liters / conversionFactors.fluidOuncesUK,
      pintsUK: liters / conversionFactors.pintsUK,
      gallonsUK: liters / conversionFactors.gallonsUK,
      cubicInches: liters / conversionFactors.cubicInches,
      cubicFeet: liters / conversionFactors.cubicFeet,
    };

    const outputValue = allConversions[outputUnit as keyof typeof allConversions];

    const volumeResult: VolumeResult = {
      inputValue: value,
      inputUnit,
      outputValue,
      outputUnit,
      allConversions,
    };

    setResult(volumeResult);
    showToast("Volume converted successfully!", "success");
  };

  const swapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
  };

  const resetConverter = () => {
    setInputValue("1");
    setInputUnit("liters");
    setOutputUnit("gallonsUS");
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
      milliliters: "Milliliters",
      liters: "Liters",
      cubicMeters: "Cubic Meters",
      fluidOuncesUS: "Fluid Ounces (US)",
      cupsUS: "Cups (US)",
      pintsUS: "Pints (US)",
      quartsUS: "Quarts (US)",
      gallonsUS: "Gallons (US)",
      fluidOuncesUK: "Fluid Ounces (UK)",
      pintsUK: "Pints (UK)",
      gallonsUK: "Gallons (UK)",
      cubicInches: "Cubic Inches",
      cubicFeet: "Cubic Feet",
    };
    return names[unit as keyof typeof names];
  };

  const getVolumeContext = (liters: number) => {
    if (liters < 0.001) return "Very small (eye drop or small pill)";
    if (liters < 0.01) return "Small (teaspoon or small sip)";
    if (liters < 0.1) return "Small serving (shot glass or medicine dose)";
    if (liters < 0.5) return "Medium serving (cup of coffee or water glass)";
    if (liters < 2) return "Large serving (water bottle or soda)";
    if (liters < 10) return "Household container (milk jug or large pot)";
    if (liters < 100) return "Large container (bucket or gas tank)";
    if (liters < 1000) return "Very large container (bathtub or small pool)";
    return "Industrial volume (swimming pool or tank)";
  };

  useEffect(() => {
    if (inputValue) {
      convertVolume();
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

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-cyan-600 dark:to-cyan-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Volume Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert between different units of volume and capacity. 
          Support for metric, US customary, UK imperial, and cubic units.
        </p>
      </div>

      {/* Converter Input */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Volume Conversion
          </CardTitle>
          <CardDescription>
            Enter a volume value and select units to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inputValue">Volume Value</Label>
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
                  <SelectItem value="milliliters">Milliliters (ml)</SelectItem>
                  <SelectItem value="liters">Liters (L)</SelectItem>
                  <SelectItem value="cubicMeters">Cubic Meters (m³)</SelectItem>
                  <SelectItem value="fluidOuncesUS">Fluid Ounces US (fl oz)</SelectItem>
                  <SelectItem value="cupsUS">Cups US (cup)</SelectItem>
                  <SelectItem value="pintsUS">Pints US (pt)</SelectItem>
                  <SelectItem value="quartsUS">Quarts US (qt)</SelectItem>
                  <SelectItem value="gallonsUS">Gallons US (gal)</SelectItem>
                  <SelectItem value="fluidOuncesUK">Fluid Ounces UK (fl oz)</SelectItem>
                  <SelectItem value="pintsUK">Pints UK (pt)</SelectItem>
                  <SelectItem value="gallonsUK">Gallons UK (gal)</SelectItem>
                  <SelectItem value="cubicInches">Cubic Inches (in³)</SelectItem>
                  <SelectItem value="cubicFeet">Cubic Feet (ft³)</SelectItem>
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
                  <SelectItem value="milliliters">Milliliters (ml)</SelectItem>
                  <SelectItem value="liters">Liters (L)</SelectItem>
                  <SelectItem value="cubicMeters">Cubic Meters (m³)</SelectItem>
                  <SelectItem value="fluidOuncesUS">Fluid Ounces US (fl oz)</SelectItem>
                  <SelectItem value="cupsUS">Cups US (cup)</SelectItem>
                  <SelectItem value="pintsUS">Pints US (pt)</SelectItem>
                  <SelectItem value="quartsUS">Quarts US (qt)</SelectItem>
                  <SelectItem value="gallonsUS">Gallons US (gal)</SelectItem>
                  <SelectItem value="fluidOuncesUK">Fluid Ounces UK (fl oz)</SelectItem>
                  <SelectItem value="pintsUK">Pints UK (pt)</SelectItem>
                  <SelectItem value="gallonsUK">Gallons UK (gal)</SelectItem>
                  <SelectItem value="cubicInches">Cubic Inches (in³)</SelectItem>
                  <SelectItem value="cubicFeet">Cubic Feet (ft³)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={convertVolume} 
              className="flex-1"
              disabled={!inputValue}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Convert Volume
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
              Volume Conversion Results
            </CardTitle>
            <CardDescription>
              Comprehensive conversion to all supported units
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Main Conversion Display */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
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
              <div className="text-sm text-cyan-600 dark:text-cyan-400">
                {getVolumeContext(result.inputValue * conversionFactors[result.inputUnit as keyof typeof conversionFactors])}
              </div>
            </div>

            {/* All Unit Conversions - Metric */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Metric Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {formatValue(result.allConversions.milliliters)}
                    </div>
                    <div className="text-sm text-muted-foreground">Milliliters (ml)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {formatValue(result.allConversions.liters)}
                    </div>
                    <div className="text-sm text-muted-foreground">Liters (L)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {formatValue(result.allConversions.cubicMeters)}
                    </div>
                    <div className="text-sm text-muted-foreground">Cubic Meters (m³)</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* All Unit Conversions - US Customary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5" />
                US Customary Units
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {formatValue(result.allConversions.fluidOuncesUS)}
                    </div>
                    <div className="text-sm text-muted-foreground">FL Oz (US)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-yellow-600 mb-1">
                      {formatValue(result.allConversions.cupsUS)}
                    </div>
                    <div className="text-sm text-muted-foreground">Cups (US)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600 mb-1">
                      {formatValue(result.allConversions.pintsUS)}
                    </div>
                    <div className="text-sm text-muted-foreground">Pints (US)</div>
                  </div>
                </Card>
                <Card className="p-4 bg-pink-50 dark:bg-pink-900/20">
                  <div className="text-center">
                    <div className="text-xl font-bold text-pink-600 mb-1">
                      {formatValue(result.allConversions.gallonsUS)}
                    </div>
                    <div className="text-sm text-muted-foreground">Gallons (US)</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* UK Imperial & Cubic Units */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">UK Imperial Units</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-600 mb-1">
                        {formatValue(result.allConversions.fluidOuncesUK)}
                      </div>
                      <div className="text-sm text-muted-foreground">FL Oz (UK)</div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-teal-50 dark:bg-teal-900/20">
                    <div className="text-center">
                      <div className="text-xl font-bold text-teal-600 mb-1">
                        {formatValue(result.allConversions.pintsUK)}
                      </div>
                      <div className="text-sm text-muted-foreground">Pints (UK)</div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-emerald-50 dark:bg-emerald-900/20">
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-600 mb-1">
                        {formatValue(result.allConversions.gallonsUK)}
                      </div>
                      <div className="text-sm text-muted-foreground">Gallons (UK)</div>
                    </div>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Cubic Units</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Card className="p-4 bg-violet-50 dark:bg-violet-900/20">
                    <div className="text-center">
                      <div className="text-xl font-bold text-violet-600 mb-1">
                        {formatValue(result.allConversions.cubicInches)}
                      </div>
                      <div className="text-sm text-muted-foreground">Cubic Inches (in³)</div>
                    </div>
                  </Card>
                  <Card className="p-4 bg-cyan-50 dark:bg-cyan-900/20">
                    <div className="text-center">
                      <div className="text-xl font-bold text-cyan-600 mb-1">
                        {formatValue(result.allConversions.cubicFeet)}
                      </div>
                      <div className="text-sm text-muted-foreground">Cubic Feet (ft³)</div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Volume Reference Table */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Volume Conversion Reference</CardTitle>
          <CardDescription>
            Common volume conversions for quick reference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Unit</th>
                  <th className="text-right p-2">Symbol</th>
                  <th className="text-right p-2">Liters</th>
                  <th className="text-right p-2">Gallons (US)</th>
                  <th className="text-right p-2">Fluid Oz (US)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Milliliter</td>
                  <td className="text-right p-2">ml</td>
                  <td className="text-right p-2">0.001</td>
                  <td className="text-right p-2">0.000264</td>
                  <td className="text-right p-2">0.0338</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Liter</td>
                  <td className="text-right p-2">L</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">0.264</td>
                  <td className="text-right p-2">33.81</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Cup (US)</td>
                  <td className="text-right p-2">cup</td>
                  <td className="text-right p-2">0.237</td>
                  <td className="text-right p-2">0.0625</td>
                  <td className="text-right p-2">8.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Pint (US)</td>
                  <td className="text-right p-2">pt</td>
                  <td className="text-right p-2">0.473</td>
                  <td className="text-right p-2">0.125</td>
                  <td className="text-right p-2">16.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Quart (US)</td>
                  <td className="text-right p-2">qt</td>
                  <td className="text-right p-2">0.946</td>
                  <td className="text-right p-2">0.25</td>
                  <td className="text-right p-2">32.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Gallon (US)</td>
                  <td className="text-right p-2">gal</td>
                  <td className="text-right p-2">3.785</td>
                  <td className="text-right p-2">1.00</td>
                  <td className="text-right p-2">128.00</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">Gallon (UK)</td>
                  <td className="text-right p-2">gal</td>
                  <td className="text-right p-2">4.546</td>
                  <td className="text-right p-2">1.201</td>
                  <td className="text-right p-2">153.72</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Volume Measurement Tips */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Volume Measurement Tips</CardTitle>
          <CardDescription>
            Useful information about different volume units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Metric System</div>
              <div className="text-muted-foreground">
                Based on liters and powers of 10, used worldwide in science
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">US vs UK</div>
              <div className="text-muted-foreground">
                US and UK gallons are different - UK gallon is about 20% larger
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Cooking Measurements</div>
              <div className="text-muted-foreground">
                Cups, tablespoons, and teaspoons are common in cooking recipes
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Cubic Measurements</div>
              <div className="text-muted-foreground">
                Cubic units measure 3D space, useful for containers and rooms
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <VolumeConverterSEOContent />
    </div>
  );
}

export default function VolumeConverterPage() {
  return (
    <ToastProvider>
      <VolumeConverterContent />
    </ToastProvider>
  );
} 