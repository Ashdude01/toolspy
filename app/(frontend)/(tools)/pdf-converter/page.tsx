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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import { PDFFileUpload } from "@/components/tools/shared/pdf-file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  Download,
  Trash2,
  Shield,
  FileText,
  ArrowUpDown,
  FileImage,
  Package,
  Settings,
} from "lucide-react";
import { formatFileSize, downloadFile, createZipFromFiles, downloadZip } from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useT } from "@/lib/i18n/use-t";

interface ConversionResult {
  id: string;
  originalName: string;
  originalFile: File;
  convertedFile?: File;
  convertedUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  pageCount?: number;
}

function PdfConverterContent() {
  const t = useT();
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [outputFormat, setOutputFormat] = useState('png');
  const [quality, setQuality] = useState([92]);
  const [dpi, setDpi] = useState([150]);
  const [isCreatingZip, setIsCreatingZip] = useState(false);

  // Helper function to add watermark suffix to filename
  const addWatermarkSuffix = (originalFilename: string, format: string): string => {
    const lastDotIndex = originalFilename.lastIndexOf('.');
    const baseName = lastDotIndex > 0 
      ? originalFilename.substring(0, lastDotIndex) 
      : originalFilename;
    return `${baseName}-converted_by_toolspy.net.${format}`;
  };

  const handleFileSelect = (files: File[]) => {
    // Filter only PDF files
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length === 0) {
      showToast(t('tools.pdfConverter.pdfOnly'), "error");
      return;
    }

    if (pdfFiles.length !== files.length) {
      showToast(
        t('tools.pdfConverter.filesFiltered', { count: files.length - pdfFiles.length }),
        "warning"
      );
    }

    const newFiles: ConversionResult[] = pdfFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      originalName: file.name,
      originalFile: file,
      status: 'pending' as const
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    showToast(t('tools.pdfConverter.filesAdded', { count: pdfFiles.length }), "success");
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => {
      const file = prev.find(f => f.id === id);
      if (file?.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAllFiles = () => {
    selectedFiles.forEach(file => {
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
    });
    setSelectedFiles([]);
    showToast(t('tools.pdfConverter.allFilesCleared'), "info");
  };

  const convertPdfs = async () => {
    if (selectedFiles.length === 0) {
      showToast(t('tools.pdfConverter.selectFilesFirst'), "error");
      return;
    }

    setIsConverting(true);
    setConversionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    try {
      // Import PDF libraries dynamically
      const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist');
      
      // Set worker source
      if (typeof window !== "undefined" && !GlobalWorkerOptions.workerSrc) {
        GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      }

      const updatedFiles = [...selectedFiles];
      const qualityValue = quality[0] / 100;
      const dpiValue = dpi[0];
      
      for (let i = 0; i < updatedFiles.length; i++) {
        const file = updatedFiles[i];
        setConversionProgress({
          current: i + 1,
          total: updatedFiles.length,
          file: file.originalName,
        });
        
        try {
          file.status = 'processing';
          setSelectedFiles([...updatedFiles]);

          const arrayBuffer = await file.originalFile.arrayBuffer();
          const pdf = await getDocument({ data: arrayBuffer }).promise;
          const numPages = pdf.numPages;
          file.pageCount = numPages;

          if (outputFormat === 'png' || outputFormat === 'jpg') {
            // Convert PDF to images
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            if (!context) {
              throw new Error('Could not get canvas context');
            }

            const images: Blob[] = [];
            
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const scale = dpiValue / 72; // Convert DPI to scale
              const viewport = page.getViewport({ scale });
              
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              
              await page.render({
                canvas,
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
                }, `image/${outputFormat}`, qualityValue);
              });
              
              images.push(blob);
            }
            
            // Create zip file for multiple images or single file
            if (images.length > 1) {
              const imageFiles: File[] = images.map((imageBlob, index) => {
                const fileName = addWatermarkSuffix(
                  file.originalName.replace('.pdf', ''),
                  outputFormat
                ).replace(`.${outputFormat}`, `_page_${index + 1}.${outputFormat}`);
                return new File([imageBlob], fileName, { type: `image/${outputFormat}` });
              });
              
              const zipFilename = addWatermarkSuffix(file.originalName.replace('.pdf', ''), 'zip');
              const zipBlob = await createZipFromFiles(imageFiles, zipFilename);
              const zipFile = new File([zipBlob], zipFilename, { type: 'application/zip' });
              
              file.convertedFile = zipFile;
              file.convertedUrl = URL.createObjectURL(zipBlob);
            } else {
              const fileName = addWatermarkSuffix(file.originalName.replace('.pdf', ''), outputFormat);
              const imageFile = new File([images[0]], fileName, { type: `image/${outputFormat}` });
              file.convertedFile = imageFile;
              file.convertedUrl = URL.createObjectURL(images[0]);
            }
            
          } else if (outputFormat === 'txt') {
            // Convert PDF to text
            let fullText = '';
            
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
              fullText += `Page ${pageNum}:\n${pageText}\n\n`;
            }
            
            const fileName = addWatermarkSuffix(file.originalName.replace('.pdf', ''), 'txt');
            const textBlob = new Blob([fullText], { type: 'text/plain' });
            const textFile = new File([textBlob], fileName, { type: 'text/plain' });
            
            file.convertedFile = textFile;
            file.convertedUrl = URL.createObjectURL(textBlob);
          }

          file.status = 'completed';
          
        } catch (error) {
          console.error('Error converting PDF:', error);
          file.status = 'error';
          file.error = error instanceof Error ? error.message : 'Unknown error';
        }
        
        setSelectedFiles([...updatedFiles]);
      }
      
      const successCount = updatedFiles.filter(f => f.status === 'completed').length;
      if (successCount > 0) {
        showToast(t('tools.pdfConverter.convertSuccess', { count: successCount }), "success");
      }
      
      const errorCount = updatedFiles.filter(f => f.status === 'error').length;
      if (errorCount > 0) {
        showToast(t('tools.pdfConverter.convertFailedCount', { count: errorCount }), "error");
      }
      
    } catch (error) {
      console.error('Conversion error:', error);
      showToast(
        t('tools.pdfConverter.convertFailed', {
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        "error"
      );
    } finally {
      setIsConverting(false);
    }
  };

  const downloadSingle = (file: ConversionResult) => {
    if (!file.convertedFile) return;
    
    downloadFile(
      new Blob([file.convertedFile], { type: file.convertedFile.type }),
      file.convertedFile.name
    );
    showToast(t('tools.pdfConverter.fileDownloaded'), "success");
  };

  const downloadAll = () => {
    const completedFiles = selectedFiles.filter(f => f.status === 'completed' && f.convertedFile);
    
    if (completedFiles.length === 0) {
      showToast(t('tools.pdfConverter.noConvertedFiles'), "error");
      return;
    }

    completedFiles.forEach(file => {
      if (file.convertedFile) {
        downloadFile(
          new Blob([file.convertedFile], { type: file.convertedFile.type }),
          file.convertedFile.name
        );
      }
    });
    
    showToast(t('tools.pdfConverter.downloadedCount', { count: completedFiles.length }), "success");
  };

  const downloadAllAsZip = async () => {
    try {
      const completedFiles = selectedFiles.filter(f => f.status === 'completed' && f.convertedFile);
      
      if (completedFiles.length === 0) {
        showToast(t('tools.pdfConverter.noFilesForZip'), "error");
        return;
      }

      setIsCreatingZip(true);
      const filesToZip = completedFiles.map(f => f.convertedFile!).filter(Boolean);
      
      const zipFilename = addWatermarkSuffix("converted-pdfs", "zip");
      const zipBlob = await createZipFromFiles(filesToZip, zipFilename);
      downloadZip(zipBlob, zipFilename);
      
      showToast(t('tools.pdfConverter.zipDownloaded', { count: filesToZip.length, filename: zipFilename }), "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create ZIP file";
      showToast(t('tools.pdfConverter.zipError', { message: errorMessage }), "error");
    } finally {
      setIsCreatingZip(false);
    }
  };

  const completedCount = selectedFiles.filter(f => f.status === 'completed').length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          {t('tools.pdfConverter.privacyBadge')}
        </Badge>

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {t('tools.pdfConverter.title')}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('tools.pdfConverter.subtitle')}
        </p>
      </div>

      {/* File Upload */}
      <PDFFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={20}
        maxFileSize={1024 * 1024 * 1024} // 1GB
        className="mb-6 sm:mb-8"
      />

      {selectedFiles.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {/* Selected Files */}
            <Card className="mb-6 sm:mb-8 md:col-span-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {t('tools.pdfConverter.selectedFilesTitle', { count: selectedFiles.length })}
                    </CardTitle>
                    <CardDescription>
                      {t('tools.pdfConverter.selectedFilesDescription')}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={clearAllFiles} 
                    size="sm"
                    aria-label="Clear all selected PDF files"
                  >
                    <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                    {t('toolCommon.clearAll')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 overflow-y-auto">
                  {selectedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            {file.originalName}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {formatFileSize(file.originalFile.size)}
                            {file.pageCount && ` • ${file.pageCount} page(s)`}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        aria-label={`Remove ${file.originalName}`}
                        title="Remove file"
                      >
                        <Trash2 className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Settings */}
            <Card className="mb-6 sm:mb-8 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('tools.pdfConverter.outputFormatTitle')}
                </CardTitle>
                <CardDescription>
                  {t('tools.pdfConverter.outputFormatDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="output-format-select">{t('tools.pdfConverter.formatLabel')}</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger id="output-format-select" aria-label="Select output format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">
                          <div className="flex items-center gap-2">
                            <FileImage className="h-4 w-4" />
                            {t('tools.pdfConverter.formatPngImages')}
                          </div>
                        </SelectItem>
                        <SelectItem value="jpg">
                          <div className="flex items-center gap-2">
                            <FileImage className="h-4 w-4" />
                            {t('tools.pdfConverter.formatJpgImages')}
                          </div>
                        </SelectItem>
                        <SelectItem value="txt">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {t('tools.pdfConverter.formatTextFile')}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(outputFormat === 'png' || outputFormat === 'jpg') && (
                    <>
                      <div className="space-y-2 p-4 rounded-xl border bg-gray-100 dark:bg-gray-800">
                        <Label htmlFor="quality-slider" className="text-sm font-medium">
                          {t('tools.pdfConverter.qualityLabel', { value: quality[0] })}
                        </Label>
                        <Slider
                          id="quality-slider"
                          value={quality}
                          onValueChange={setQuality}
                          max={100}
                          min={10}
                          step={5}
                          className="w-full"
                          aria-label="Image quality slider"
                          aria-valuemin={10}
                          aria-valuemax={100}
                          aria-valuenow={quality[0]}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t('tools.pdfConverter.qualityHint')}
                        </p>
                      </div>

                      <div className="space-y-2 p-4 rounded-xl border bg-gray-100 dark:bg-gray-800">
                        <Label htmlFor="dpi-slider" className="text-sm font-medium">
                          {t('tools.pdfConverter.dpiLabel', { value: dpi[0] })}
                        </Label>
                        <Slider
                          id="dpi-slider"
                          value={dpi}
                          onValueChange={setDpi}
                          max={300}
                          min={72}
                          step={10}
                          className="w-full"
                          aria-label="DPI resolution slider"
                          aria-valuemin={72}
                          aria-valuemax={300}
                          aria-valuenow={dpi[0]}
                        />
                        <p className="text-xs text-muted-foreground">
                          {t('tools.pdfConverter.dpiHint')}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Conversion Button */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>{t('tools.pdfConverter.settingsTitle')}</CardTitle>
            <CardDescription>{t('tools.pdfConverter.settingsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={convertPdfs}
              disabled={selectedFiles.length === 0 || isConverting}
              size="lg"
              className="w-full"
              aria-label={isConverting 
                ? "Converting PDF files, please wait" 
                : `Convert ${selectedFiles.length} PDF file(s) to ${outputFormat.toUpperCase()} format`}
            >
              <ArrowUpDown className="h-5 w-5 mr-2" aria-hidden="true" />
              {isConverting
                ? t('tools.pdfConverter.converting')
                : t('tools.pdfConverter.convertButton', {
                    count: selectedFiles.length,
                    format: outputFormat.toUpperCase(),
                  })}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Conversion Results */}
      {selectedFiles.filter(f => f.status === 'completed' || f.status === 'error').length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('tools.pdfConverter.resultsTitle')}
                </CardTitle>
                <CardDescription>
                  {t('tools.pdfConverter.resultsDescription', { count: completedCount })}
                </CardDescription>
              </div>
              {completedCount > 0 && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={downloadAll} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    {t('toolCommon.downloadAll')}
                  </Button>
                  <Button 
                    onClick={downloadAllAsZip} 
                    size="sm"
                    disabled={isCreatingZip}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    {isCreatingZip ? t('tools.pdfConverter.creatingZip') : t('tools.pdfConverter.downloadAsZip')}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedFiles.map((file) => {
                if (file.status === 'pending' || file.status === 'processing') return null;
                
                return (
                  <div key={file.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm sm:text-base mb-2">
                          {file.originalName}
                        </h4>
                        {file.status === 'completed' ? (
                          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span>
                              Original: {formatFileSize(file.originalFile.size)}
                            </span>
                            {file.convertedFile && (
                              <span>
                                Converted: {formatFileSize(file.convertedFile.size)}
                              </span>
                            )}
                            {file.pageCount && (
                              <Badge variant="secondary" className="text-xs">
                                {file.pageCount} page(s)
                              </Badge>
                            )}
                            <Badge variant="default" className="text-xs">
                              {outputFormat.toUpperCase()}
                            </Badge>
                          </div>
                        ) : (
                          <p className="text-xs text-red-500">
                            Error: {file.error || 'Unknown error'}
                          </p>
                        )}
                      </div>
                      {file.status === 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadSingle(file)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          {t('toolCommon.download')}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isConverting}
        title={t('tools.pdfConverter.progressTitle')}
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.file}
        description={t('tools.pdfConverter.progressDescription')}
      />
</div>
  );
}

export default function PdfConverterPage() {
  return (
    <ToolPageWrapper toolSlug="pdf-converter">
      <ToastProvider>
        <PdfConverterContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
} 