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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Shuffle,
  Target,
  PenTool,
  Brain,
  Zap,
  Copy,
  Download,
  RotateCcw,
} from "lucide-react";
import { AIWritingToolsSEOContent } from "./seo-content";

interface WritingResult {
  original: string;
  processed: string;
  tool: string;
  timestamp: number;
}

const AiWritingToolsContent = () => {
  const [inputText, setInputText] = useState("");
  const [activeTool, setActiveTool] = useState<'paraphraser' | 'summarizer' | 'humanizer' | 'detector'>('paraphraser');
  const [result, setResult] = useState<WritingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { showToast } = useToast();

  const processText = async () => {
    if (!inputText.trim()) {
      showToast("Please enter some text to process", "error");
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let processedText = "";
    
    switch (activeTool) {
      case 'paraphraser':
        processedText = `Paraphrased: ${inputText}`;
        break;
      case 'summarizer':
        processedText = `Summary: ${inputText.split(' ').slice(0, 20).join(' ')}...`;
        break;
      case 'humanizer':
        processedText = `Humanized: ${inputText}`;
        break;
      case 'detector':
        processedText = `AI Detection: ${Math.random() > 0.5 ? 'Likely AI-generated' : 'Likely human-written'}`;
        break;
    }

    setResult({
      original: inputText,
      processed: processedText,
      tool: activeTool,
      timestamp: Date.now()
    });
    
    setIsProcessing(false);
    showToast("Text processed successfully!", "success");
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard", "success");
    } catch (error) {
      showToast("Failed to copy to clipboard", "error");
    }
  };

  const clearAll = () => {
    setInputText("");
    setResult(null);
    showToast("All data cleared", "info");
  };

  const tools = [
    {
      id: 'paraphraser',
      name: 'AI Paraphraser',
      description: 'Rewrite text while preserving meaning',
      icon: <Shuffle size={20} />,
      color: 'blue'
    },
    {
      id: 'summarizer',
      name: 'AI Summarizer',
      description: 'Extract key points and main ideas',
      icon: <Target size={20} />,
      color: 'green'
    },
    {
      id: 'humanizer',
      name: 'AI Humanizer',
      description: 'Make text sound more natural and human',
      icon: <PenTool size={20} />,
      color: 'purple'
    },
    {
      id: 'detector',
      name: 'AI Detector',
      description: 'Detect if text was written by AI',
      icon: <Brain size={20} />,
      color: 'orange'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
            <PenTool size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Writing Tools Suite
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete AI writing toolkit with paraphraser, summarizer, humanizer, and AI detector. 
          Perfect for content creators, students, and professionals.
        </p>
      </div>

      {/* Tool Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Writing Tool</CardTitle>
          <CardDescription>
            Select the AI writing tool you want to use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={activeTool === tool.id ? "default" : "outline"}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  activeTool === tool.id ? 'bg-blue-600 hover:bg-blue-700' : ''
                }`}
                onClick={() => setActiveTool(tool.id as any)}
              >
                <div className={activeTool === tool.id ? 'text-white' : `text-${tool.color}-600`}>
                  {tool.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className={`text-xs ${activeTool === tool.id ? 'text-blue-100' : 'text-gray-600'}`}>
                    {tool.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>
            Enter the text you want to process with {tools.find(t => t.id === activeTool)?.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="input-text">Text to Process</Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter text for ${activeTool}...`}
              className="min-h-[200px]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={processText} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Zap size={16} className="mr-2" />
                  Process Text
                </>
              )}
            </Button>
            
            <Button onClick={clearAll} variant="outline">
              <RotateCcw size={16} className="mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              Processed with {tools.find(t => t.id === result.tool)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Original Text</Label>
              <div className="p-3 bg-gray-50 rounded border text-sm">
                {result.original}
              </div>
            </div>
            
            <div>
              <Label>Processed Text</Label>
              <div className="p-3 bg-blue-50 rounded border text-sm">
                {result.processed}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => copyToClipboard(result.processed)} variant="outline" size="sm">
                <Copy size={16} className="mr-1" />
                Copy Result
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
      <AIWritingToolsSEOContent />
    </div>
  );
};

export default function AiWritingToolsPage() {
  return (
    <ToastProvider>
      <AiWritingToolsContent />
    </ToastProvider>
  );
}