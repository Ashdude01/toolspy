"use client";

import { useT } from "@/lib/i18n/use-t";
import { useState, useRef, useCallback, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
  Wand2,
  Upload,
  Settings,
  Zap,
  Eye,
  RefreshCw,
  Type,
  Palette,
  Sparkles,
  TrendingUp,
  Share2,
  Heart,
  Laugh,
  ThumbsUp,
  Image as ImageIcon,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface MemeTemplate {
  id: string;
  name: string;
  image: string;
  textBoxes: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    defaultText: string;
  }[];
  category: string;
  popularity: number;
}

interface TextBox {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  strokeColor: string;
  strokeWidth: number;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textTransform: 'none' | 'uppercase' | 'lowercase';
}

interface AiSuggestion {
  text: string;
  confidence: number;
  category: string;
  mood: string;
}

function MemeGeneratorContent() {
  const t = useT();
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [selectedTextBox, setSelectedTextBox] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestion[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);
  const [memeCategory, setMemeCategory] = useState<'funny' | 'motivational' | 'sarcastic' | 'relatable' | 'trending'>('funny');
  const [backgroundRemoval, setBackgroundRemoval] = useState(false);
  const [watermark, setWatermark] = useState(false);
  
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Popular meme templates
  const memeTemplates: MemeTemplate[] = [
    {
      id: 'drake',
      name: 'Drake Pointing',
      image: '/api/placeholder/400/400',
      textBoxes: [
        { id: 'top', x: 200, y: 50, width: 180, height: 60, defaultText: 'Bad thing' },
        { id: 'bottom', x: 200, y: 250, width: 180, height: 60, defaultText: 'Good thing' }
      ],
      category: 'reaction',
      popularity: 95
    },
    {
      id: 'distracted-boyfriend',
      name: 'Distracted Boyfriend',
      image: '/api/placeholder/400/300',
      textBoxes: [
        { id: 'girlfriend', x: 20, y: 20, width: 100, height: 40, defaultText: 'My current situation' },
        { id: 'boyfriend', x: 150, y: 100, width: 100, height: 40, defaultText: 'Me' },
        { id: 'other-girl', x: 280, y: 50, width: 100, height: 40, defaultText: 'Something tempting' }
      ],
      category: 'relationships',
      popularity: 92
    },
    {
      id: 'change-my-mind',
      name: 'Change My Mind',
      image: '/api/placeholder/400/300',
      textBoxes: [
        { id: 'sign', x: 100, y: 150, width: 200, height: 80, defaultText: 'Your controversial opinion\nCHANGE MY MIND' }
      ],
      category: 'opinion',
      popularity: 88
    },
    {
      id: 'woman-yelling-cat',
      name: 'Woman Yelling at Cat',
      image: '/api/placeholder/400/250',
      textBoxes: [
        { id: 'woman', x: 20, y: 20, width: 160, height: 50, defaultText: 'Person complaining' },
        { id: 'cat', x: 220, y: 20, width: 160, height: 50, defaultText: 'Me, confused' }
      ],
      category: 'reaction',
      popularity: 90
    },
    {
      id: 'this-is-fine',
      name: 'This is Fine',
      image: '/api/placeholder/400/300',
      textBoxes: [
        { id: 'top', x: 50, y: 30, width: 300, height: 40, defaultText: 'Everything is falling apart' },
        { id: 'bottom', x: 50, y: 250, width: 300, height: 40, defaultText: 'This is fine' }
      ],
      category: 'chaos',
      popularity: 87
    }
  ];

  // Initialize text boxes when template is selected
  useEffect(() => {
    if (selectedTemplate) {
      const boxes: TextBox[] = selectedTemplate.textBoxes.map(box => ({
        ...box,
        text: box.defaultText,
        fontSize: 24,
        fontFamily: 'Impact',
        color: '#ffffff',
        backgroundColor: 'transparent',
        strokeColor: '#000000',
        strokeWidth: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textTransform: 'uppercase'
      }));
      setTextBoxes(boxes);
      setSelectedTextBox(boxes[0]?.id || null);
    }
  }, [selectedTemplate]);

  // Generate AI caption suggestions
  const generateAiSuggestions = useCallback(async () => {
    if (!selectedTemplate) return;

    setIsGeneratingAi(true);
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const suggestions: AiSuggestion[] = [
        {
          text: "When you realize it's Monday tomorrow",
          confidence: 0.95,
          category: "relatable",
          mood: "dread"
        },
        {
          text: "Me trying to adult responsibly",
          confidence: 0.89,
          category: "self-deprecating",
          mood: "humorous"
        },
        {
          text: "When someone asks if I'm okay",
          confidence: 0.92,
          category: "mood",
          mood: "sarcastic"
        },
        {
          text: "POV: You're pretending to work",
          confidence: 0.87,
          category: "work",
          mood: "relatable"
        }
      ];

      setAiSuggestions(suggestions);
      showToast(t("tools.memeGenerator.aiSuggestionsGenerated"), "success");
    } catch (error) {
      showToast(t("tools.memeGenerator.failedToGenerateSuggestions"), "error");
    } finally {
      setIsGeneratingAi(false);
    }
  }, [selectedTemplate]);

  const handleTemplateSelect = (template: MemeTemplate) => {
    setSelectedTemplate(template);
    setCustomImage(null);
  };

  const handleCustomImageUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast(t("tools.memeGenerator.pleaseUploadAnImageFile"), "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setCustomImage(imageData);
      setSelectedTemplate(null);
      
      // Create default text box for custom image
      const defaultBox: TextBox = {
        id: 'custom-1',
        text: 'Your meme text here',
        x: 50,
        y: 50,
        width: 300,
        height: 60,
        fontSize: 32,
        fontFamily: 'Impact',
        color: '#ffffff',
        backgroundColor: 'transparent',
        strokeColor: '#000000',
        strokeWidth: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textTransform: 'uppercase'
      };
      setTextBoxes([defaultBox]);
      setSelectedTextBox(defaultBox.id);
      
      showToast(t("tools.memeGenerator.customImageUploaded"), "success");
    };
    reader.readAsDataURL(file);
  };

  const updateTextBox = (id: string, updates: Partial<TextBox>) => {
    setTextBoxes(prev => prev.map(box => 
      box.id === id ? { ...box, ...updates } : box
    ));
  };

  const addTextBox = () => {
    const newBox: TextBox = {
      id: `text-${Date.now()}`,
      text: 'New text',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      fontSize: 24,
      fontFamily: 'Impact',
      color: '#ffffff',
      backgroundColor: 'transparent',
      strokeColor: '#000000',
      strokeWidth: 2,
      textAlign: 'center',
      fontWeight: 'bold',
      fontStyle: 'normal',
      textTransform: 'uppercase'
    };
    setTextBoxes(prev => [...prev, newBox]);
    setSelectedTextBox(newBox.id);
  };

  const removeTextBox = (id: string) => {
    setTextBoxes(prev => prev.filter(box => box.id !== id));
    if (selectedTextBox === id) {
      setSelectedTextBox(textBoxes[0]?.id || null);
    }
  };

  const applySuggestion = (suggestion: AiSuggestion) => {
    if (selectedTextBox) {
      updateTextBox(selectedTextBox, { text: suggestion.text });
      showToast(t("tools.memeGenerator.suggestionApplied"), "success");
    }
  };

  const renderMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw text boxes
      textBoxes.forEach(box => {
        ctx.save();
        
        // Set font properties
        ctx.font = `${box.fontStyle} ${box.fontWeight} ${box.fontSize}px ${box.fontFamily}`;
        ctx.textAlign = box.textAlign;
        ctx.textBaseline = 'middle';
        
        // Background
        if (box.backgroundColor !== 'transparent') {
          ctx.fillStyle = box.backgroundColor;
          ctx.fillRect(box.x, box.y, box.width, box.height);
        }
        
        // Text with stroke
        const text = box.textTransform === 'uppercase' ? box.text.toUpperCase() :
                    box.textTransform === 'lowercase' ? box.text.toLowerCase() : box.text;
        
        const lines = text.split('\n');
        const lineHeight = box.fontSize * 1.2;
        const startY = box.y + box.height / 2 - (lines.length - 1) * lineHeight / 2;
        
        lines.forEach((line, index) => {
          const y = startY + index * lineHeight;
          const x = box.textAlign === 'center' ? box.x + box.width / 2 :
                   box.textAlign === 'right' ? box.x + box.width : box.x;
          
          // Stroke
          if (box.strokeWidth > 0) {
            ctx.strokeStyle = box.strokeColor;
            ctx.lineWidth = box.strokeWidth;
            ctx.strokeText(line, x, y);
          }
          
          // Fill
          ctx.fillStyle = box.color;
          ctx.fillText(line, x, y);
        });
        
        ctx.restore();
      });
    };

    const imageSource = customImage || selectedTemplate?.image;
    if (imageSource) {
      img.src = imageSource;
    }
  }, [textBoxes, customImage, selectedTemplate]);

  // Re-render when text boxes change
  useEffect(() => {
    renderMeme();
  }, [renderMeme]);

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      showToast(t("tools.memeGenerator.noMemeToDownload"), "error");
      return;
    }

    const link = document.createElement('a');
    link.download = `meme-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(t("tools.memeGenerator.memeDownloadedSuccessfully"), "success");
  };

  const shareToSocial = (platform: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // In a real implementation, this would integrate with social media APIs
    const imageData = canvas.toDataURL('image/png');
    
    // For now, just copy to clipboard
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showToast(`Meme copied for ${platform}!`, "success");
        } catch (error) {
          showToast(t("tools.memeGenerator.failedToCopyMeme"), "error");
        }
      }
    });
  };

  const clearAll = () => {
    setSelectedTemplate(null);
    setCustomImage(null);
    setTextBoxes([]);
    setSelectedTextBox(null);
    setAiSuggestions([]);
    showToast(t("tools.memeGenerator.allDataCleared"), "info");
  };

  const trendingTemplates = memeTemplates.sort((a, b) => b.popularity - a.popularity).slice(0, 3);
  const selectedTextBoxData = textBoxes.find(box => box.id === selectedTextBox);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="tool-legacy-hero text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl text-white">
            <Laugh size={24} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            AI Meme Generator
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create viral memes with trending templates, AI caption suggestions, 
          and professional editing tools. Share to social media instantly.
        </p>
      </div>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Choose Template or Upload Image
          </CardTitle>
          <CardDescription>
            {t("tools.memeGenerator.selectFromTrendingMemeTemplatesOr")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Trending Templates */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">{t("tools.memeGenerator.trendingTemplates")}</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trendingTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all hover:scale-105 ${
                    selectedTemplate?.id === template.id ? 'border-yellow-500 ring-2 ring-yellow-200' : 'border-gray-200'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <ImageIcon size={40} className="text-gray-400" />
                  </div>
                  <div className="p-2 text-center">
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Heart size={12} className="text-red-500" />
                      <span className="text-xs text-gray-600">{template.popularity}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Templates */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">{t("tools.memeGenerator.allTemplates")}</Label>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {memeTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`relative cursor-pointer border rounded-lg overflow-hidden transition-all hover:scale-105 ${
                    selectedTemplate?.id === template.id ? 'border-yellow-500' : 'border-gray-200'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <ImageIcon size={24} className="text-gray-400" />
                  </div>
                  <div className="p-1 text-center">
                    <div className="text-xs font-medium truncate">{template.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Upload */}
          <div>
            <Label className="text-sm font-medium mb-3 block">{t("tools.memeGenerator.uploadCustomImage")}</Label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('meme-file-input')?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = Array.from(e.dataTransfer.files);
                handleCustomImageUpload(files);
              }}
            >
              <input
                id="meme-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    handleCustomImageUpload(files);
                  }
                }}
                className="hidden"
              />
              <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload your image</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <Button variant="outline">
                <Upload size={16} className="mr-2" />
                Choose Image
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meme Editor */}
      {(selectedTemplate || customImage) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Eye size={20} />
                    Meme Preview
                  </span>
                  <div className="flex gap-2">
                    <Button onClick={downloadMeme} variant="outline" size="sm">
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                    <Button onClick={() => shareToSocial('clipboard')} variant="outline" size="sm">
                      <Share2 size={16} className="mr-1" />
                      Copy
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative border rounded-lg overflow-hidden bg-gray-50">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto"
                    style={{ maxHeight: '500px' }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Text Boxes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Type size={20} />
                    Text Boxes
                  </span>
                  <Button onClick={addTextBox} size="sm">
                    {t("tools.memeGenerator.addText")}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {textBoxes.map((box) => (
                  <div
                    key={box.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTextBox === box.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedTextBox(box.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Text Box {box.id}</span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTextBox(box.id);
                        }}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <Textarea
                      value={box.text}
                      onChange={(e) => updateTextBox(box.id, { text: e.target.value })}
                      placeholder={t("tools.memeGenerator.enterMemeText")}
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Text Formatting */}
            {selectedTextBoxData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette size={20} />
                    Text Formatting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="font-size">Size: {selectedTextBoxData.fontSize}px</Label>
                      <Slider
                        value={[selectedTextBoxData.fontSize]}
                        onValueChange={([value]) => updateTextBox(selectedTextBoxData.id, { fontSize: value })}
                        max={72}
                        min={12}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="stroke-width">Stroke: {selectedTextBoxData.strokeWidth}px</Label>
                      <Slider
                        value={[selectedTextBoxData.strokeWidth]}
                        onValueChange={([value]) => updateTextBox(selectedTextBoxData.id, { strokeWidth: value })}
                        max={10}
                        min={0}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="text-color">{t("tools.memeGenerator.textColor")}</Label>
                      <Input
                        type="color"
                        value={selectedTextBoxData.color}
                        onChange={(e) => updateTextBox(selectedTextBoxData.id, { color: e.target.value })}
                        className="h-10 p-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="stroke-color">{t("tools.memeGenerator.strokeColor")}</Label>
                      <Input
                        type="color"
                        value={selectedTextBoxData.strokeColor}
                        onChange={(e) => updateTextBox(selectedTextBoxData.id, { strokeColor: e.target.value })}
                        className="h-10 p-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="font-family">{t("tools.memeGenerator.font")}</Label>
                    <Select
                      value={selectedTextBoxData.fontFamily}
                      onValueChange={(value) => updateTextBox(selectedTextBoxData.id, { fontFamily: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Impact">{t("tools.memeGenerator.impact")}</SelectItem>
                        <SelectItem value="Arial">{t("tools.memeGenerator.arial")}</SelectItem>
                        <SelectItem value="Comic Sans MS">{t("tools.memeGenerator.comicSans")}</SelectItem>
                        <SelectItem value="Times New Roman">{t("tools.memeGenerator.times")}</SelectItem>
                        <SelectItem value="Helvetica">{t("tools.memeGenerator.helvetica")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="text-align">{t("tools.memeGenerator.alignment")}</Label>
                    <Select
                      value={selectedTextBoxData.textAlign}
                      onValueChange={(value: any) => updateTextBox(selectedTextBoxData.id, { textAlign: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">{t("tools.memeGenerator.left")}</SelectItem>
                        <SelectItem value="center">{t("tools.memeGenerator.center")}</SelectItem>
                        <SelectItem value="right">{t("tools.memeGenerator.right")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Suggestions */}
            {showAiSuggestions && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles size={20} />
                      AI Caption Ideas
                    </span>
                    <Button onClick={generateAiSuggestions} size="sm" disabled={isGeneratingAi}>
                      {isGeneratingAi ? (
                        <RefreshCw size={16} className="mr-1 animate-spin" />
                      ) : (
                        <Wand2 size={16} className="mr-1" />
                      )}
                      Generate
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {aiSuggestions.length > 0 ? (
                    <div className="space-y-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => applySuggestion(suggestion)}
                        >
                          <div className="text-sm font-medium">{suggestion.text}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {suggestion.category}
                            </Badge>
                            <span className="text-xs text-gray-600">
                              {(suggestion.confidence * 100).toFixed(0)}% match
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Sparkles size={24} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click Generate to get AI caption suggestions</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {(selectedTemplate || customImage) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 size={20} />
              Share & Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={downloadMeme}>
                <Download size={16} className="mr-2" />
                Download PNG
              </Button>
              <Button onClick={() => shareToSocial('Instagram')} variant="outline">
                <ImageIcon size={16} className="mr-2" />
                Instagram
              </Button>
              <Button onClick={() => shareToSocial('Twitter')} variant="outline">
                <Share2 size={16} className="mr-2" />
                Twitter
              </Button>
              <Button onClick={() => shareToSocial('Facebook')} variant="outline">
                <ThumbsUp size={16} className="mr-2" />
                Facebook
              </Button>
              <Button onClick={clearAll} variant="outline">
                <Trash2 size={16} className="mr-2" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
</div>
  );
}

export default function MemeGeneratorPage() {
  return (
    <ToolPageWrapper toolSlug="meme-generator"><ToastProvider>
      <MemeGeneratorContent /></ToastProvider></ToolPageWrapper>
  );
}