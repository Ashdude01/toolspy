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
import { PDFFileUpload } from "@/components/tools/shared/pdf-file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Trash2,
  Shield,
  FileText,
  ArrowUpDown,
  Plus,
} from "lucide-react";
import { formatFileSize, downloadFile } from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface PdfFile {
  file: File;
  id: string;
  name: string;
  size: number;
}

interface MergeResult {
  file: File;
  success: boolean;
  error?: string;
  totalPages?: number;
  totalSize: number;
}

function MergePdfContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<PdfFile[]>([]);
  const [mergeResult, setMergeResult] = useState<MergeResult | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });

  const handleFileSelect = (files: File[]) => {
    // Filter only PDF files
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      showToast("Please select PDF files only", "error");
      return;
    }
    
    if (pdfFiles.length !== files.length) {
      showToast(`${files.length - pdfFiles.length} non-PDF files were filtered out`, "warning");
    }
    
    const newPdfFiles: PdfFile[] = pdfFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
    }));
    
    setSelectedFiles((prev) => [...prev, ...newPdfFiles]);
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter(f => f.id !== id));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setMergeResult(null);
    showToast("All files cleared", "info");
  };

  const moveFile = (id: string, direction: 'up' | 'down') => {
    setSelectedFiles((prev) => {
      const currentIndex = prev.findIndex(f => f.id === id);
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newFiles = [...prev];
      [newFiles[currentIndex], newFiles[newIndex]] = [newFiles[newIndex], newFiles[currentIndex]];
      return newFiles;
    });
  };

  const mergePdfs = async () => {
    if (selectedFiles.length < 2) {
      showToast("Please select at least 2 PDF files to merge", "error");
      return;
    }

    setIsMerging(true);
    setMergeProgress({
      current: 0,
      total: selectedFiles.length,
      file: "Initializing...",
    });

    try {
      // Import PDF library dynamically
      const { PDFDocument } = await import('pdf-lib');
      
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();
      let totalPages = 0;
      let totalSize = 0;

      for (let i = 0; i < selectedFiles.length; i++) {
        const pdfFile = selectedFiles[i];
        setMergeProgress({
          current: i + 1,
          total: selectedFiles.length,
          file: pdfFile.name,
        });

        try {
          // Read PDF file
          const pdfBytes = await pdfFile.file.arrayBuffer();
          const pdf = await PDFDocument.load(pdfBytes);
          
          // Get all pages from the PDF
          const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          
          // Add pages to merged PDF
          pages.forEach((page) => mergedPdf.addPage(page));
          
          totalPages += pdf.getPageCount();
          totalSize += pdfFile.size;
          
        } catch (error) {
          showToast(`Error processing ${pdfFile.name}: ${error instanceof Error ? error.message : 'Unknown error'}`, "error");
          throw error;
        }
      }

      // Generate the merged PDF
      const mergedPdfBytes = await mergedPdf.save();
      const mergedFile = new File([mergedPdfBytes], 'merged-document.pdf', {
        type: 'application/pdf'
      });

      setMergeResult({
        file: mergedFile,
        success: true,
        totalPages,
        totalSize,
      });

      showToast(`Successfully merged ${selectedFiles.length} PDF files into ${totalPages} pages`, "success");

    } catch (error) {
      setMergeResult({
        file: new File([], ''),
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        totalSize: 0,
      });
      showToast(
        "Merge failed: " + (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsMerging(false);
    }
  };

  const downloadMergedPdf = () => {
    if (mergeResult && mergeResult.success) {
      downloadFile(mergeResult.file, mergeResult.file.name);
      showToast("Merged PDF downloaded", "success");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Merge PDF Files
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Combine multiple PDF documents into a single file with complete control over page order. 
          Fast, secure, and completely private.
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

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Selected PDF Files ({selectedFiles.length})
                </CardTitle>
                <CardDescription>
                  Files will be merged in the order shown below. Use arrows to reorder.
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={clearAllFiles} 
                size="sm"
                aria-label="Clear all selected PDF files"
              >
                <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {selectedFiles.map((pdfFile, index) => (
                <div key={pdfFile.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                  {/* Order Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-sm sm:text-base">
                      {pdfFile.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {formatFileSize(pdfFile.size)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveFile(pdfFile.id, 'up')}
                      disabled={index === 0}
                      title="Move up"
                      aria-label={`Move ${pdfFile.name} up in merge order`}
                    >
                      <ArrowUpDown className="h-3 w-3 rotate-180" aria-hidden="true" />
                      <span className="sr-only">Move up</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveFile(pdfFile.id, 'down')}
                      disabled={index === selectedFiles.length - 1}
                      title="Move down"
                      aria-label={`Move ${pdfFile.name} down in merge order`}
                    >
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">Move down</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(pdfFile.id)}
                      title="Remove file"
                      aria-label={`Remove ${pdfFile.name}`}
                    >
                      <Trash2 className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Merge Button */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardContent className="pt-6">
            <Button
              onClick={mergePdfs}
              disabled={selectedFiles.length < 2 || isMerging}
              size="lg"
              className="w-full"
              aria-label={isMerging 
                ? "Merging PDF files, please wait" 
                : `Merge ${selectedFiles.length} PDF file${selectedFiles.length !== 1 ? 's' : ''}`}
            >
              <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
              {isMerging
                ? "Merging PDFs..."
                : `Merge ${selectedFiles.length} PDF Files`}
            </Button>
            {selectedFiles.length === 1 && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Add at least one more PDF file to merge
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Merge Results */}
      {mergeResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Merge Results
            </CardTitle>
            <CardDescription>
              {mergeResult.success ? "PDF files merged successfully" : "Merge failed"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mergeResult.success ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">{selectedFiles.length}</p>
                    <p className="text-sm text-muted-foreground">Files Merged</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">{mergeResult.totalPages}</p>
                    <p className="text-sm text-muted-foreground">Total Pages</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-2xl font-bold text-primary">{formatFileSize(mergeResult.file.size)}</p>
                    <p className="text-sm text-muted-foreground">Output Size</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={downloadMergedPdf} 
                    size="lg"
                    aria-label="Download merged PDF file"
                  >
                    <Download className="h-5 w-5 mr-2" aria-hidden="true" />
                    Download Merged PDF
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">
                  {mergeResult.error || "An error occurred during merging"}
                </p>
                <Button 
                  onClick={() => setMergeResult(null)} 
                  variant="outline"
                  aria-label="Try merging PDFs again"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isMerging}
        title="Merging PDF Files"
        current={mergeProgress.current}
        total={mergeProgress.total}
        currentFile={mergeProgress.file}
        description="Please wait while we merge your PDF files..."
      />
</div>
  );
}

export default function MergePdfPage() {
  return (
    <ToolPageWrapper toolSlug="merge-pdf"><ToastProvider>
      <MergePdfContent /></ToastProvider></ToolPageWrapper>
  );
} 