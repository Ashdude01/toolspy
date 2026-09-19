"use client";

import { useT } from "@/lib/i18n/use-t";
import { useState, useRef, useMemo, useCallback } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";

import {
  Download,
  Copy,
  Trash2,
  Palette,
  Wand2,
  Upload,
  Settings,
  Zap,
  Eye,
  RefreshCw,
  CheckCircle,
  Sparkles,
  ImageIcon,
  Accessibility,
  Heart,
  Shuffle,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name?: string;
}

interface ColorPalette {
  id: string;
  name: string;
  colors: Color[];
  harmony: string;
  accessibility?: {
    contrastRatio: number;
    wcagAA: boolean;
    wcagAAA: boolean;
  };
}

interface AIInsight {
  mood: string;
  usage: string[];
  psychology: string;
  recommendations: string[];
}

function ColorPaletteGeneratorContent() {
  const t = useT();
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [paletteType, setPaletteType] = useState<'complementary' | 'triadic' | 'analogous' | 'monochromatic' | 'tetradic' | 'split-complementary'>('complementary');
  const [colorCount, setColorCount] = useState([5]);
  const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null);
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [showAccessibility, setShowAccessibility] = useState(true);
  const [extractFromImage, setExtractFromImage] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsight | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Color utility functions
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const calculateContrastRatio = (color1: string, color2: string): number => {
    const getLuminance = (color: string) => {
      const rgb = hexToRgb(color);
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  // Color harmony generators
  const generateComplementary = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: Color[] = [];

    for (let i = 0; i < count; i++) {
      let h = hsl.h;
      if (i === 0) h = hsl.h;
      else if (i === 1) h = (hsl.h + 180) % 360;
      else h = (hsl.h + (i * 30)) % 360;

      const hex = hslToHex(h, hsl.s, hsl.l);
      const newRgb = hexToRgb(hex);
      colors.push({
        hex,
        rgb: newRgb,
        hsl: rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
      });
    }

    return colors;
  };

  const generateTriadic = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: Color[] = [];

    for (let i = 0; i < count; i++) {
      const h = (hsl.h + (i * 120)) % 360;
      const hex = hslToHex(h, hsl.s, hsl.l);
      const newRgb = hexToRgb(hex);
      colors.push({
        hex,
        rgb: newRgb,
        hsl: rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
      });
    }

    return colors;
  };

  const generateAnalogous = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: Color[] = [];

    for (let i = 0; i < count; i++) {
      const h = (hsl.h + (i * 30)) % 360;
      const hex = hslToHex(h, hsl.s, hsl.l);
      const newRgb = hexToRgb(hex);
      colors.push({
        hex,
        rgb: newRgb,
        hsl: rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
      });
    }

    return colors;
  };

  const generateMonochromatic = (baseHex: string, count: number): Color[] => {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: Color[] = [];

    for (let i = 0; i < count; i++) {
      const l = Math.max(10, Math.min(90, hsl.l + (i - Math.floor(count/2)) * 20));
      const hex = hslToHex(hsl.h, hsl.s, l);
      const newRgb = hexToRgb(hex);
      colors.push({
        hex,
        rgb: newRgb,
        hsl: rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
      });
    }

    return colors;
  };

  // Generate color palette based on harmony type
  const generatePalette = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      let colors: Color[] = [];
      
      switch (paletteType) {
        case 'complementary':
          colors = generateComplementary(baseColor, colorCount[0]);
          break;
        case 'triadic':
          colors = generateTriadic(baseColor, colorCount[0]);
          break;
        case 'analogous':
          colors = generateAnalogous(baseColor, colorCount[0]);
          break;
        case 'monochromatic':
          colors = generateMonochromatic(baseColor, colorCount[0]);
          break;
        case 'tetradic':
          colors = generateComplementary(baseColor, colorCount[0]); // Simplified
          break;
        case 'split-complementary':
          colors = generateComplementary(baseColor, colorCount[0]); // Simplified
          break;
      }

      // Calculate accessibility if enabled
      let accessibility;
      if (showAccessibility && colors.length >= 2) {
        const contrastRatio = calculateContrastRatio(colors[0].hex, colors[1].hex);
        accessibility = {
          contrastRatio,
          wcagAA: contrastRatio >= 4.5,
          wcagAAA: contrastRatio >= 7
        };
      }

      const palette: ColorPalette = {
        id: Date.now().toString(),
        name: `${paletteType.charAt(0).toUpperCase() + paletteType.slice(1)} Palette`,
        colors,
        harmony: paletteType,
        accessibility
      };

      setCurrentPalette(palette);

      // Generate AI insights
      if (showAiSuggestions) {
        generateAiInsights(colors);
      }

      showToast(t("tools.aiColorPaletteGenerator.paletteGeneratedSuccessfully"), "success");
    } catch (error) {
      showToast(t("tools.aiColorPaletteGenerator.errorGeneratingPalette"), "error");
    } finally {
      setIsGenerating(false);
    }
  }, [baseColor, paletteType, colorCount, showAccessibility, showAiSuggestions]);

  // Generate AI insights (simulated)
  const generateAiInsights = async (colors: Color[]) => {
    // Simulate AI analysis
    setTimeout(() => {
      const insights: AIInsight = {
        mood: "Energetic and Modern",
        usage: ["Web Design", "Brand Identity", "Digital Art", "UI/UX"],
        psychology: "This color combination evokes feelings of trust, innovation, and professionalism. The harmony creates visual balance while maintaining attention-grabbing contrast.",
        recommendations: [
          "Use the brightest color sparingly for call-to-action elements",
          "Apply darker tones for text and backgrounds",
          "Consider the 60-30-10 rule for color distribution",
          "Test accessibility with your target audience"
        ]
      };
      setAiInsights(insights);
    }, 1500);
  };

  // Extract colors from uploaded image
  const extractColorsFromImage = (file: File) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, img.width, img.height);
      if (!imageData) return;

      // Simple color extraction (would be more sophisticated in real implementation)
      const colors: string[] = [];
      const step = 100; // Sample every 100 pixels
      
      for (let i = 0; i < imageData.data.length; i += step * 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        if (!colors.includes(hex)) {
          colors.push(hex);
        }
        if (colors.length >= colorCount[0]) break;
      }

      if (colors.length > 0) {
        setBaseColor(colors[0]);
        generatePalette();
        showToast(t("tools.aiColorPaletteGenerator.colorsExtractedFromImage"), "success");
      }
    };

    img.src = URL.createObjectURL(file);
  };

  const handleImageUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (file.type.startsWith('image/')) {
      extractColorsFromImage(file);
    } else {
      showToast(t("tools.aiColorPaletteGenerator.pleaseUploadAnImageFile"), "error");
    }
  };

  const savePalette = () => {
    if (!currentPalette) return;
    
    setSavedPalettes(prev => [...prev, currentPalette]);
    showToast(t("tools.aiColorPaletteGenerator.paletteSaved"), "success");
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${type} copied to clipboard`, "success");
    } catch (error) {
      showToast(t("tools.aiColorPaletteGenerator.failedToCopyToClipboard"), "error");
    }
  };

  const exportPalette = (format: 'css' | 'json' | 'ase') => {
    if (!currentPalette) return;

    let content = '';
    const filename = `palette-${currentPalette.id}`;

    switch (format) {
      case 'css':
        content = `:root {\n${currentPalette.colors.map((color, index) => 
          `  --color-${index + 1}: ${color.hex};`
        ).join('\n')}\n}`;
        break;
      case 'json':
        content = JSON.stringify(currentPalette, null, 2);
        break;
      case 'ase':
        // Adobe Swatch Exchange format would need special encoding
        content = currentPalette.colors.map(color => color.hex).join('\n');
        break;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`Palette exported as ${format.toUpperCase()}`, "success");
  };

  const randomizePalette = () => {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setBaseColor(randomColor);
    generatePalette();
  };

  const presets = [
    { name: "Ocean Blue", color: "#0077BE", type: "analogous" as const },
    { name: "Sunset Orange", color: "#FF6B35", type: "complementary" as const },
    { name: "Forest Green", color: "#228B22", type: "monochromatic" as const },
    { name: "Royal Purple", color: "#6A0DAD", type: "triadic" as const },
    { name: "Cherry Red", color: "#DC143C", type: "split-complementary" as const },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Header */}
      <div className="tool-legacy-hero text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-orange-600 rounded-xl text-white">
            <Palette size={24} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
            AI Color Palette Generator
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate beautiful color palettes with AI suggestions, 
          accessibility checking, and professional export options.
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Palette Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="base-color">{t("tools.aiColorPaletteGenerator.baseColor")}</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-10 p-1 border-2"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="palette-type">{t("tools.aiColorPaletteGenerator.harmonyType")}</Label>
              <Select value={paletteType} onValueChange={(value: any) => setPaletteType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complementary">{t("tools.aiColorPaletteGenerator.complementary")}</SelectItem>
                  <SelectItem value="triadic">{t("tools.aiColorPaletteGenerator.triadic")}</SelectItem>
                  <SelectItem value="analogous">{t("tools.aiColorPaletteGenerator.analogous")}</SelectItem>
                  <SelectItem value="monochromatic">{t("tools.aiColorPaletteGenerator.monochromatic")}</SelectItem>
                  <SelectItem value="tetradic">{t("tools.aiColorPaletteGenerator.tetradic")}</SelectItem>
                  <SelectItem value="split-complementary">{t("tools.aiColorPaletteGenerator.splitComplementary")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="color-count">Number of Colors: {colorCount[0]}</Label>
              <Slider
                value={colorCount}
                onValueChange={setColorCount}
                max={10}
                min={3}
                step={1}
                className="mt-2"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="accessibility"
                  checked={showAccessibility}
                  onCheckedChange={setShowAccessibility}
                />
                <Label htmlFor="accessibility">
                  <div className="flex items-center gap-1">
                    <Accessibility size={16} />
                    Accessibility Check
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="ai-suggestions"
                  checked={showAiSuggestions}
                  onCheckedChange={setShowAiSuggestions}
                />
                <Label htmlFor="ai-suggestions">
                  <div className="flex items-center gap-1">
                    <Sparkles size={16} />
                    AI Insights
                  </div>
                </Label>
              </div>
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <Label className="text-sm font-medium mb-2 block">{t("tools.aiColorPaletteGenerator.quickPresets")}</Label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setBaseColor(preset.color);
                    setPaletteType(preset.type);
                  }}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.color }}
                  />
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={generatePalette} disabled={isGenerating}>
              {isGenerating ? (
                <RefreshCw size={16} className="mr-2 animate-spin" />
              ) : (
                <Zap size={16} className="mr-2" />
              )}
              Generate Palette
            </Button>
            
            <Button onClick={randomizePalette} variant="outline">
              <Shuffle size={16} className="mr-2" />
              Random Color
            </Button>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('color-palette-file-input')?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = Array.from(e.dataTransfer.files);
                handleImageUpload(files);
              }}
            >
              <input
                id="color-palette-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    handleImageUpload(files);
                  }
                }}
                className="hidden"
              />
              <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload an image</h3>
              <p className="text-gray-600 mb-4">Extract colors from your favorite photo</p>
              <Button variant="outline">
                <Upload size={16} className="mr-2" />
                Choose Image
              </Button>
            </div>

            {currentPalette && (
              <>
                <Button onClick={savePalette} variant="outline">
                  <Heart size={16} className="mr-2" />
                  Save Palette
                </Button>
                
                <Button onClick={() => exportPalette('css')} variant="outline">
                  <Download size={16} className="mr-2" />
                  Export CSS
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Palette */}
      {currentPalette && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye size={20} />
              {currentPalette.name}
            </CardTitle>
            {currentPalette.accessibility && (
              <div className="flex flex-wrap gap-2">
                <Badge variant={currentPalette.accessibility.wcagAA ? "default" : "destructive"}>
                  WCAG AA: {currentPalette.accessibility.wcagAA ? "✓" : "✗"}
                </Badge>
                <Badge variant={currentPalette.accessibility.wcagAAA ? "default" : "secondary"}>
                  WCAG AAA: {currentPalette.accessibility.wcagAAA ? "✓" : "✗"}
                </Badge>
                <span className="text-sm text-gray-600">
                  Contrast: {currentPalette.accessibility.contrastRatio.toFixed(2)}:1
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {currentPalette.colors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div 
                    className="w-full h-32 rounded-lg border-2 border-gray-200 cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyToClipboard(color.hex, "Color")}
                  />
                  <div className="space-y-1 text-center">
                    <div className="font-mono text-sm font-semibold">{color.hex}</div>
                    <div className="text-xs text-gray-600">
                      RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                    </div>
                    <div className="text-xs text-gray-600">
                      HSL({color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%)
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(color.hex, "Color")}
                      className="w-full"
                    >
                      <Copy size={12} className="mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Export Options */}
            <div className="mt-6 pt-4 border-t">
              <Label className="text-sm font-medium mb-2 block">{t("tools.aiColorPaletteGenerator.exportOptions")}</Label>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => exportPalette('css')}>
                  CSS Variables
                </Button>
                <Button size="sm" variant="outline" onClick={() => exportPalette('json')}>
                  JSON
                </Button>
                <Button size="sm" variant="outline" onClick={() => exportPalette('ase')}>
                  Adobe ASE
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => copyToClipboard(
                    currentPalette.colors.map(c => c.hex).join(', '), 
                    "Palette"
                  )}
                >
                  Copy All Hex
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      {aiInsights && showAiSuggestions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles size={20} />
              AI Color Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-sm">{t("tools.aiColorPaletteGenerator.moodPsychology")}</Label>
                <p className="text-sm text-gray-600 mt-1">{aiInsights.psychology}</p>
              </div>
              <div>
                <Label className="font-medium text-sm">{t("tools.aiColorPaletteGenerator.bestUsedFor")}</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {aiInsights.usage.map((use, index) => (
                    <Badge key={index} variant="secondary">{use}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <Label className="font-medium text-sm">{t("tools.aiColorPaletteGenerator.recommendations")}</Label>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                {aiInsights.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Palettes */}
      {savedPalettes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart size={20} />
              Saved Palettes ({savedPalettes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPalettes.map((palette) => (
                <div key={palette.id} className="border rounded-lg p-3">
                  <div className="flex h-8 rounded mb-2">
                    {palette.colors.slice(0, 5).map((color, index) => (
                      <div
                        key={index}
                        className="flex-1"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-medium">{palette.name}</div>
                  <div className="text-xs text-gray-500">{palette.harmony}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
</div>
  );
}

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolPageWrapper toolSlug="color-palette-generator"><ToastProvider>
      <ColorPaletteGeneratorContent /></ToastProvider></ToolPageWrapper>
  );
}