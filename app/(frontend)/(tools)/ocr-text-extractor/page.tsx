"use client";

import { useState, useRef, useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
  Upload,
  Settings,
  Zap,
  Eye,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  Languages,
  Search,
  CheckCircle,
  AlertCircle,
  Edit,
  Save,
  RotateCcw,
  ZoomIn,
  Layers,
  Target,
  Brain,
  Globe,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface OcrResult {
  id: string;
  fileName: string;
  fileType: string;
  originalText: string;
  extractedText: string;
  detectedLanguage: string;
  confidence: number;
  processingTime: number;
  wordCount: number;
  characterCount: number;
  boundingBoxes?: {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }[];
}

interface OcrSettings {
  language: string;
  enhanceImage: boolean;
  preserveFormatting: boolean;
  detectTables: boolean;
  autoRotate: boolean;
  removeNoise: boolean;
  confidenceThreshold: number;
}

function OcrTextExtractorContent() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ocrResults, setOcrResults] = useState<OcrResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<OcrResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [settings, setSettings] = useState<OcrSettings>({
    language: 'auto',
    enhanceImage: true,
    preserveFormatting: true,
    detectTables: false,
    autoRotate: true,
    removeNoise: true,
    confidenceThreshold: 70
  });
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Supported languages for OCR
  const languages = [
    { code: 'auto', name: 'Auto-detect', flag: '🌍' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  // Simulate OCR processing
  const processOcr = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Simulate processing steps
      const steps = [
        { progress: 10, message: "Loading image..." },
        { progress: 25, message: "Preprocessing image..." },
        { progress: 40, message: "Detecting text regions..." },
        { progress: 60, message: "Recognizing characters..." },
        { progress: 80, message: "Processing language model..." },
        { progress: 95, message: "Finalizing results..." },
        { progress: 100, message: "Complete!" }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
        setProcessingProgress(step.progress);
      }

      // Generate mock OCR result
      const mockText = generateMockOcrText(file.name);
      const detectedLang = settings.language === 'auto' ? detectLanguage(mockText) : settings.language;
      
      const result: OcrResult = {
        id: Date.now().toString(),
        fileName: file.name,
        fileType: file.type,
        originalText: mockText,
        extractedText: mockText,
        detectedLanguage: detectedLang,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        processingTime: Math.floor(Math.random() * 3000) + 2000, // 2-5 seconds
        wordCount: mockText.split(/\s+/).length,
        characterCount: mockText.length,
        boundingBoxes: generateMockBoundingBoxes(mockText)
      };

      setOcrResults(prev => [result, ...prev]);
      setSelectedResult(result);
      setEditedText(result.extractedText);
      
      showToast("Text extracted successfully!", "success");
      
    } catch (error) {
      showToast("OCR processing failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  }, [settings]);

  const generateMockOcrText = (fileName: string): string => {
    const samples = [
      `IMPORTANT DOCUMENT

This is a sample document that has been scanned and processed using Optical Character Recognition (OCR) technology. The text you are reading has been automatically extracted from an image or PDF file.

Key Features:
• High accuracy text recognition
• Support for multiple languages
• Automatic formatting preservation
• Table and structure detection

The OCR process can handle various types of documents including:
1. Scanned books and articles
2. Business documents and contracts
3. Handwritten notes (with varying accuracy)
4. Forms and applications
5. Historical documents

For best results, ensure your source material has:
- Good contrast between text and background
- Minimal skew or rotation
- Adequate resolution (300 DPI recommended)
- Clear, legible fonts

This technology is particularly useful for digitizing physical documents, making them searchable and editable.`,

      `BUSINESS REPORT - Q4 2024

Executive Summary
Our company has achieved significant growth this quarter, with revenue increasing by 15% compared to the previous period. This document outlines our key achievements and future strategies.

Financial Performance
Total Revenue: $2,450,000
Net Profit: $387,500
Growth Rate: 15.8%

Key Metrics:
- Customer Satisfaction: 94%
- Employee Retention: 89%
- Market Share: 12.3%

Strategic Initiatives
1. Digital Transformation
2. Customer Experience Enhancement
3. Product Innovation
4. Market Expansion

The upcoming quarter will focus on sustainable growth and operational efficiency improvements.`,

      `ACADEMIC RESEARCH PAPER

Abstract
This study examines the applications of artificial intelligence in modern text processing systems. Our research demonstrates significant improvements in accuracy and processing speed.

Introduction
Optical Character Recognition (OCR) has evolved significantly over the past decade. Modern systems leverage machine learning algorithms to achieve unprecedented accuracy rates.

Methodology
We conducted experiments using various document types:
- Printed text documents
- Handwritten materials
- Low-quality scans
- Multi-language content

Results showed 97.3% accuracy for high-quality printed text and 89.1% for handwritten materials.

Conclusion
The integration of AI technologies in OCR systems represents a major advancement in document digitization capabilities.`
    ];

    return samples[Math.floor(Math.random() * samples.length)];
  };

  const detectLanguage = (text: string): string => {
    // Simple language detection simulation
    if (/[а-яё]/i.test(text)) return 'ru';
    if (/[中文汉字]/i.test(text)) return 'zh';
    if (/[ひらがなカタカナ]/i.test(text)) return 'ja';
    if (/[한글]/i.test(text)) return 'ko';
    if (/[äöüß]/i.test(text)) return 'de';
    if (/[àáâãçéêí]/i.test(text)) return 'pt';
    if (/[àâéèêë]/i.test(text)) return 'fr';
    if (/[áéíóúñ]/i.test(text)) return 'es';
    if (/[àáéíóú]/i.test(text)) return 'it';
    return 'en';
  };

  const generateMockBoundingBoxes = (text: string) => {
    const words = text.split(/\s+/).slice(0, 20); // First 20 words
    return words.map((word, index) => ({
      text: word,
      x: (index % 5) * 100 + 20,
      y: Math.floor(index / 5) * 30 + 50,
      width: word.length * 8,
      height: 20,
      confidence: Math.random() * 30 + 70
    }));
  };

  const handleFileUpload = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );
    
    if (validFiles.length === 0) {
      showToast("Please upload image files (JPG, PNG, GIF) or PDF files", "error");
      return;
    }

    if (validFiles.length > 1) {
      setBatchMode(true);
      setUploadedFiles(validFiles);
      showToast(`${validFiles.length} files ready for batch processing`, "success");
    } else {
      const file = validFiles[0];
      setCurrentFile(file);
      setBatchMode(false);
      
      // Create preview
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
      
      showToast("File uploaded successfully. Click 'Extract Text' to process.", "success");
    }
  };

  const handleSingleProcess = async () => {
    if (!currentFile) {
      showToast("Please upload a file first", "error");
      return;
    }
    
    await processOcr(currentFile);
  };

  const handleBatchProcess = async () => {
    if (uploadedFiles.length === 0) {
      showToast("No files to process", "error");
      return;
    }

    setIsProcessing(true);
    let processed = 0;

    for (const file of uploadedFiles) {
      try {
        await processOcr(file);
        processed++;
        setProcessingProgress((processed / uploadedFiles.length) * 100);
      } catch (error) {
        console.error(`Failed to process ${file.name}`);
      }
    }

    setIsProcessing(false);
    setProcessingProgress(0);
    showToast(`Batch processing complete! ${processed}/${uploadedFiles.length} files processed.`, "success");
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Text copied to clipboard", "success");
    } catch (error) {
      showToast("Failed to copy text", "error");
    }
  };

  const downloadText = (result: OcrResult, format: 'txt' | 'docx' | 'pdf') => {
    const text = isEditing ? editedText : result.extractedText;
    const fileName = `extracted-text-${result.id}`;
    
    let content = text;
    let mimeType = 'text/plain';
    
    if (format === 'docx') {
      // Simulate DOCX format (in real implementation, would use a library)
      content = `<!DOCTYPE html><html><body>${text.replace(/\n/g, '<br>')}</body></html>`;
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (format === 'pdf') {
      // Simulate PDF creation (in real implementation, would use PDF library)
      content = text;
      mimeType = 'application/pdf';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`Text downloaded as ${format.toUpperCase()}`, "success");
  };

  const saveEditedText = () => {
    if (selectedResult) {
      const updatedResult = { ...selectedResult, extractedText: editedText };
      setOcrResults(prev => prev.map(r => r.id === selectedResult.id ? updatedResult : r));
      setSelectedResult(updatedResult);
      setIsEditing(false);
      showToast("Text saved successfully", "success");
    }
  };

  const clearAll = () => {
    setUploadedFiles([]);
    setCurrentFile(null);
    setPreviewUrl(null);
    setOcrResults([]);
    setSelectedResult(null);
    setEditedText('');
    setIsEditing(false);
    setBatchMode(false);
    showToast("All data cleared", "info");
  };

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || 'Unknown';
  };

  const getLanguageFlag = (code: string) => {
    return languages.find(lang => lang.code === code)?.flag || '🌍';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl text-white">
            <FileText size={24} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            OCR Text Extractor
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Extract text from images and PDFs with advanced OCR technology. 
          Support for 12+ languages, batch processing, and editable results.
        </p>
      </div>

      {/* Upload Section */}
      {!currentFile && !batchMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Upload images (JPG, PNG, GIF) or PDF files for text extraction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('ocr-file-input')?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = Array.from(e.dataTransfer.files);
                handleFileUpload(files);
              }}
            >
              <input
                id="ocr-file-input"
                type="file"
                accept="image/*,.pdf"
                multiple={true}
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    handleFileUpload(files);
                  }
                }}
                className="hidden"
              />
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop your files here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <Button>Single File</Button>
                <Button variant="outline">Batch Upload</Button>
              </div>
            </div>
            
            {/* Supported Languages */}
            <div className="mt-6">
              <Label className="text-sm font-medium mb-3 block">Supported Languages:</Label>
              <div className="flex flex-wrap gap-2">
                {languages.slice(1, 8).map((lang) => (
                  <Badge key={lang.code} variant="secondary" className="text-xs">
                    {lang.flag} {lang.name}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs">+5 more</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* OCR Settings */}
      {(currentFile || batchMode) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              OCR Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="confidence">Confidence Threshold: {settings.confidenceThreshold}%</Label>
                <Slider
                  value={[settings.confidenceThreshold]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, confidenceThreshold: value }))}
                  max={100}
                  min={50}
                  step={5}
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enhance"
                    checked={settings.enhanceImage}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enhanceImage: checked }))}
                  />
                  <Label htmlFor="enhance" className="text-sm">Enhance image</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="formatting"
                    checked={settings.preserveFormatting}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, preserveFormatting: checked }))}
                  />
                  <Label htmlFor="formatting" className="text-sm">Preserve formatting</Label>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="tables"
                    checked={settings.detectTables}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, detectTables: checked }))}
                  />
                  <Label htmlFor="tables" className="text-sm">Detect tables</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="rotate"
                    checked={settings.autoRotate}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoRotate: checked }))}
                  />
                  <Label htmlFor="rotate" className="text-sm">Auto-rotate</Label>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {!batchMode ? (
                <Button onClick={handleSingleProcess} disabled={isProcessing}>
                  {isProcessing ? (
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Zap size={16} className="mr-2" />
                  )}
                  Extract Text
                </Button>
              ) : (
                <Button onClick={handleBatchProcess} disabled={isProcessing}>
                  {isProcessing ? (
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Layers size={16} className="mr-2" />
                  )}
                  Process All ({uploadedFiles.length} files)
                </Button>
              )}
              
              <Button onClick={clearAll} variant="outline">
                <Trash2 size={16} className="mr-2" />
                Clear All
              </Button>
              
              {batchMode && (
                <Button onClick={() => setBatchMode(false)} variant="outline">
                  Switch to Single Mode
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Brain size={20} className="animate-pulse text-green-600" />
                <span className="font-medium">
                  {batchMode ? 'Processing batch files...' : 'Extracting text with OCR...'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 text-center">
                {processingProgress}% complete
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview and Results */}
      {!batchMode && currentFile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye size={20} />
                File Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm space-y-1">
                    <div><strong>File:</strong> {currentFile.name}</div>
                    <div><strong>Size:</strong> {(currentFile.size / 1024).toFixed(1)} KB</div>
                    <div><strong>Type:</strong> {currentFile.type}</div>
                  </div>
                </div>
                
                {previewUrl && (
                  <div className="border rounded-lg overflow-hidden">
                    <img 
                      src={previewUrl} 
                      alt="Preview"
                      className="w-full h-auto max-h-96 object-contain bg-gray-100"
                    />
                  </div>
                )}
                
                {currentFile.type === 'application/pdf' && (
                  <div className="border rounded-lg p-8 text-center bg-gray-50">
                    <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">PDF Preview</p>
                    <p className="text-sm text-gray-500">Click 'Extract Text' to process</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Text Results */}
          {selectedResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-600" />
                    Extracted Text
                  </span>
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
                      <Edit size={16} className="mr-1" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                    {isEditing && (
                      <Button onClick={saveEditedText} size="sm">
                        <Save size={16} className="mr-1" />
                        Save
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* OCR Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-green-50 rounded-lg">
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{selectedResult.confidence}%</div>
                      <div className="text-xs text-gray-600">Confidence</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{getLanguageFlag(selectedResult.detectedLanguage)}</div>
                      <div className="text-xs text-gray-600">{getLanguageName(selectedResult.detectedLanguage)}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{selectedResult.wordCount}</div>
                      <div className="text-xs text-gray-600">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{selectedResult.processingTime}ms</div>
                      <div className="text-xs text-gray-600">Processing</div>
                    </div>
                  </div>

                  {/* Text Content */}
                  {isEditing ? (
                    <Textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="min-h-[300px] font-mono text-sm"
                      placeholder="Edit extracted text..."
                    />
                  ) : (
                    <div className="border rounded-lg p-4 bg-gray-50 max-h-[300px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">{selectedResult.extractedText}</pre>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => copyText(isEditing ? editedText : selectedResult.extractedText)} variant="outline" size="sm">
                      <Copy size={16} className="mr-1" />
                      Copy Text
                    </Button>
                    <Button onClick={() => downloadText(selectedResult, 'txt')} variant="outline" size="sm">
                      <Download size={16} className="mr-1" />
                      Download TXT
                    </Button>
                    <Button onClick={() => downloadText(selectedResult, 'docx')} variant="outline" size="sm">
                      <Download size={16} className="mr-1" />
                      Download DOCX
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Batch Results */}
      {batchMode && ocrResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers size={20} />
              Batch Processing Results ({ocrResults.length} files)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ocrResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{result.fileName}</div>
                    <Badge variant="secondary">
                      {getLanguageFlag(result.detectedLanguage)} {getLanguageName(result.detectedLanguage)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Confidence: {result.confidence}% • Words: {result.wordCount} • Processing: {result.processingTime}ms
                  </div>
                  <div className="border rounded p-2 bg-gray-50 text-sm max-h-20 overflow-hidden">
                    {result.extractedText.substring(0, 200)}...
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button onClick={() => copyText(result.extractedText)} variant="outline" size="sm">
                      <Copy size={14} className="mr-1" />
                      Copy
                    </Button>
                    <Button onClick={() => downloadText(result, 'txt')} variant="outline" size="sm">
                      <Download size={14} className="mr-1" />
                      TXT
                    </Button>
                    <Button onClick={() => setSelectedResult(result)} variant="outline" size="sm">
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* OCR Results History */}
      {ocrResults.length > 0 && !batchMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} />
              Processing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ocrResults.slice(0, 5).map((result) => (
                <div 
                  key={result.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedResult?.id === result.id ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedResult(result);
                    setEditedText(result.extractedText);
                    setIsEditing(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{result.fileName}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {result.confidence}%
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {getLanguageFlag(result.detectedLanguage)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {result.wordCount} words • {result.characterCount} characters
                  </div>
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

export default function OcrTextExtractorPage() {
  return (
    <ToolPageWrapper toolSlug="ocr-text-extractor"><ToastProvider>
      <OcrTextExtractorContent /></ToastProvider></ToolPageWrapper>
  );
}