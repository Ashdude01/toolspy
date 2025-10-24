"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  Download,
  RefreshCw,
  Shield,
  FileText,
  ArrowUpDown,
  X,
  FileImage,
  FileSpreadsheet,
} from "lucide-react";
import { PdfConverterSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ProcessedFile {
  id: string;
  name: string;
  originalFile: File;
  convertedBlob?: Blob;
  convertedUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

function PdfConverterContent() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState(0);
  const [outputFormat, setOutputFormat] = useState('png');
  const [quality, setQuality] = useState(92);
  const [dpi, setDpi] = useState(150);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxFiles = 10;

  const handleFileSelect = (selectedFiles: File[]) => {
    const newFiles: ProcessedFile[] = selectedFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      originalFile: file,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...newFiles]);
    showToast(`${selectedFiles.length} PDF file(s) added`, "success");
  };

  const handleFileUploadError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    showToast("File removed", "success");
  };

  const clearAllFiles = () => {
    files.forEach(file => {
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
    });
    setFiles([]);
    showToast("All files cleared", "success");
  };

  const convertPdfs = async () => {
    if (files.length === 0) {
      showToast("Please select PDF files first", "error");
      return;
    }

    setIsProcessing(true);
    setCurrentFile(0);

    try {
      // Import PDF-lib dynamically
      const { PDFDocument } = await import('pdf-lib');
      const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist');
      
      // Set worker source
      GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

      const updatedFiles = [...files];
      
      for (let i = 0; i < updatedFiles.length; i++) {
        const file = updatedFiles[i];
        setCurrentFile(i);
        
        try {
          file.status = 'processing';
          setFiles([...updatedFiles]);

          if (outputFormat === 'png' || outputFormat === 'jpg') {
            // Convert PDF to images
            const arrayBuffer = await file.originalFile.arrayBuffer();
            const pdf = await getDocument({ data: arrayBuffer }).promise;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            if (!context) {
              throw new Error('Could not get canvas context');
            }

            const images: Blob[] = [];
            
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const scale = dpi / 72; // Convert DPI to scale
              const viewport = page.getViewport({ scale });
              
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              
              await page.render({
                canvasContext: context,
                viewport: viewport
              }).promise;
              
              const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob((blob) => {
                  if (blob) {
                    resolve(blob);
                  } else {
                    reject(new Error('Could not create blob'));
                  }
                }, `image/${outputFormat}`, quality / 100);
              });
              
              images.push(blob);
            }
            
            // Create zip file for multiple images
            if (images.length > 1) {
              const JSZip = (await import('jszip')).default;
              const zip = new JSZip();
              
              images.forEach((imageBlob, index) => {
                const fileName = `${file.name.replace('.pdf', '')}_page_${index + 1}.${outputFormat}`;
                zip.file(fileName, imageBlob);
              });
              
              const zipBlob = await zip.generateAsync({ type: 'blob' });
              file.convertedBlob = zipBlob;
              file.convertedUrl = URL.createObjectURL(zipBlob);
            } else {
              file.convertedBlob = images[0];
              file.convertedUrl = URL.createObjectURL(images[0]);
            }
            
          } else if (outputFormat === 'txt') {
            // Convert PDF to text (basic implementation)
            const arrayBuffer = await file.originalFile.arrayBuffer();
            const pdf = await getDocument({ data: arrayBuffer }).promise;
            let fullText = '';
            
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
              fullText += `Page ${pageNum}:\n${pageText}\n\n`;
            }
            
            const textBlob = new Blob([fullText], { type: 'text/plain' });
            file.convertedBlob = textBlob;
            file.convertedUrl = URL.createObjectURL(textBlob);
          }

          file.status = 'completed';
          
        } catch (error) {
          console.error('Error converting PDF:', error);
          file.status = 'error';
          file.error = `Failed to convert: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
        
        setFiles([...updatedFiles]);
      }
      
      showToast("PDF conversion completed!", "success");
      
    } catch (error) {
      console.error('Conversion error:', error);
      showToast("Conversion failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: ProcessedFile) => {
    if (!file.convertedUrl) return;
    
    const link = document.createElement('a');
    link.href = file.convertedUrl;
    
    // Create filename based on output format
    let fileName = file.name.replace('.pdf', '');
    if (outputFormat === 'png' || outputFormat === 'jpg') {
      fileName += files.length > 1 ? `.zip` : `.${outputFormat}`;
    } else {
      fileName += `.${outputFormat}`;
    }
    
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${file.name} downloaded`, "success");
  };

  const downloadAllFiles = () => {
    const completedFiles = files.filter(file => file.status === 'completed' && file.convertedUrl);
    
    if (completedFiles.length === 0) {
      showToast("No converted files to download", "error");
      return;
    }

    completedFiles.forEach(file => downloadFile(file));
  };

  const resetAll = () => {
    clearAllFiles();
    setOutputFormat('png');
    setQuality(92);
    setDpi(150);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FileImage className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'png':
      case 'jpg':
        return <FileImage className="h-4 w-4" />;
      case 'txt':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileSpreadsheet className="h-4 w-4" />;
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          PDF Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert PDF files to various formats including images, text, and more. 
          High-quality conversion with customizable settings for professional results.
        </p>
      </div>

      {/* File Upload */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload PDF Files
          </CardTitle>
          <CardDescription>
            Select PDF files to convert (max {maxFiles} files)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            onFileSelect={handleFileSelect}
            onError={handleFileUploadError}
            accept=".pdf,application/pdf"
            multiple
            maxFiles={maxFiles}
          />
        </CardContent>
      </Card>

      {/* Conversion Settings */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Conversion Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">
                    <div className="flex items-center gap-2">
                      <FileImage className="h-4 w-4" />
                      PNG Images
                    </div>
                  </SelectItem>
                  <SelectItem value="jpg">
                    <div className="flex items-center gap-2">
                      <FileImage className="h-4 w-4" />
                      JPG Images
                    </div>
                  </SelectItem>
                  <SelectItem value="txt">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Text File
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(outputFormat === 'png' || outputFormat === 'jpg') && (
              <>
                <div className="space-y-2">
                  <Label>Quality: {quality}%</Label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>DPI: {dpi}</Label>
                  <input
                    type="range"
                    min="72"
                    max="300"
                    value={dpi}
                    onChange={(e) => setDpi(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Files to Convert</CardTitle>
            <CardDescription>
              {files.length} file(s) selected, {completedCount} converted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(file.status)}
                    <div className="flex-1">
                      <div className="font-medium">{file.name}</div>
                      {file.error && (
                        <div className="text-red-500 text-sm">{file.error}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowUpDown className="h-3 w-3" />
                      {getFormatIcon(outputFormat)}
                      {outputFormat.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {file.status === 'completed' && file.convertedUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadFile(file)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={convertPdfs}
              disabled={files.length === 0 || isProcessing}
              className="flex-1"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {isProcessing ? 'Converting...' : `Convert to ${outputFormat.toUpperCase()}${files.length > 1 ? ` (${files.length})` : ''}`}
            </Button>
            
            {completedCount > 0 && (
              <Button
                variant="outline"
                onClick={downloadAllFiles}
                disabled={isProcessing}
                className="flex-1 sm:flex-initial"
              >
                <Download className="h-4 w-4 mr-2" />
                Download All ({completedCount})
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={resetAll}
              disabled={isProcessing}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isProcessing}
        current={currentFile}
        total={files.length}
        title="Converting PDFs"
        description="Processing your PDFs, please wait..."
        currentFile={files[currentFile]?.name}
      />

      {/* Info Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>About PDF Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Image Conversion</div>
              <div className="text-muted-foreground">
                Convert PDF pages to high-quality PNG or JPG images
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Text Extraction</div>
              <div className="text-muted-foreground">
                Extract text content from PDFs for editing and analysis
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Custom DPI</div>
              <div className="text-muted-foreground">
                Adjust resolution from 72 to 300 DPI for different needs
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Batch Processing</div>
              <div className="text-muted-foreground">
                Convert multiple PDFs simultaneously for efficiency
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <PdfConverterSEOContent />
    </div>
  );
}

export default function PdfConverterPage() {
  return (
    <ToolPageWrapper toolSlug="pdf-converter"><ToastProvider>
      <PdfConverterContent /></ToastProvider></ToolPageWrapper>
  );
} 