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
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  Gauge,
  Zap,
  Target,
  Globe,
  Package,
} from "lucide-react";
import { formatFileSize, downloadFile, createZipFromFiles, downloadZip } from "@/lib/utils/file-utils";

interface CompressionResult {
  file: File;
  originalName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  success: boolean;
  error?: string;
}

function CompressPdfContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedResults, setCompressedResults] = useState<
    CompressionResult[]
  >([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [compressionLevel, setCompressionLevel] = useState("balanced");
  const [imageQuality, setImageQuality] = useState([70]);
  const [targetSizeEnabled, setTargetSizeEnabled] = useState(false);
  const [targetSizeValue, setTargetSizeValue] = useState<string>("");
  const [targetSizeUnit, setTargetSizeUnit] = useState<"KB" | "MB">("MB");
  const [isCreatingZip, setIsCreatingZip] = useState(false);

  // Helper function to add watermark suffix to filename
  const addWatermarkSuffix = (originalFilename: string): string => {
    const lastDotIndex = originalFilename.lastIndexOf('.');
    if (lastDotIndex > 0) {
      const name = originalFilename.substring(0, lastDotIndex);
      const extension = originalFilename.substring(lastDotIndex);
      return `${name}-compressed_by_toolspy.net${extension}`;
    }
    return `${originalFilename}-compressed_by_toolspy.net`;
  };

  const handleFileSelect = (files: File[]) => {
    // Filter only PDF files
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length === 0) {
      showToast("Please select PDF files only", "error");
      return;
    }

    if (pdfFiles.length !== files.length) {
      showToast(
        `${files.length - pdfFiles.length} non-PDF files were filtered out`,
        "warning"
      );
    }

    setSelectedFiles((prev) => [...prev, ...pdfFiles]);
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setCompressedResults([]);
    showToast("All files cleared", "info");
  };

  // Helper function to compress image using canvas
  const compressImage = async (
    imageBytes: Uint8Array,
    mimeType: string,
    quality: number,
    maxDimension?: number
  ): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const blob = new Blob([imageBytes.buffer as ArrayBuffer], {
        type: mimeType,
      });
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Resize if needed for maximum compression
        if (maxDimension && (width > maxDimension || height > maxDimension)) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG for compression (works for all image types)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not compress image"));
              return;
            }
            blob.arrayBuffer().then((buffer) => {
              resolve(new Uint8Array(buffer));
            });
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load image"));
      };

      img.src = url;
    });
  };

  // Helper function to compress a single PDF with specific quality and scale
  const compressPdfWithSettings = async (
    pdfBytes: ArrayBuffer,
    originalPdfDoc: any,
    pdf: any,
    numPages: number,
    imageQualityValue: number,
    renderScale: number,
    shouldRasterize: boolean,
    PDFDocument: any,
    pdfjsLib: any
  ): Promise<Uint8Array> => {
    const compressedPdfDoc = await PDFDocument.create();

    // Process pages based on compression level
    if (!shouldRasterize) {
      // Light compression: Just copy pages and optimize structure
      for (let pageNum = 0; pageNum < numPages; pageNum++) {
        try {
          const [copiedPage] = await compressedPdfDoc.copyPages(
            originalPdfDoc,
            [pageNum]
          );
          compressedPdfDoc.addPage(copiedPage);
        } catch (copyError) {
          // If copy fails, fallback to rendering at high quality
          try {
            const page = await pdf.getPage(pageNum + 1);
            const viewport = page.getViewport({ scale: 2.0 });
            const originalPage = originalPdfDoc.getPage(pageNum);
            const { width, height } = originalPage.getSize();

            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext("2d");

            if (context) {
              await page.render({
                canvasContext: context,
                viewport: viewport,
              }).promise;

              const imageData = canvas.toDataURL("image/jpeg", 0.95);
              const base64Data = imageData.split(",")[1];
              const binaryString = atob(base64Data);
              const bytes = new Uint8Array(binaryString.length);
              for (let j = 0; j < binaryString.length; j++) {
                bytes[j] = binaryString.charCodeAt(j);
              }

              const image = await compressedPdfDoc.embedJpg(bytes);
              const newPage = compressedPdfDoc.addPage([width, height]);
              newPage.drawImage(image, {
                x: 0,
                y: 0,
                width: width,
                height: height,
              });
            }
          } catch (renderError) {
            // Skip page if all methods fail
          }
        }
      }
    } else {
      // Balanced and Maximum: Rasterize pages with appropriate quality and scale
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: renderScale });
          const originalPage = originalPdfDoc.getPage(pageNum - 1);
          const { width, height } = originalPage.getSize();

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext("2d");

          if (context) {
            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            const imageData = canvas.toDataURL("image/jpeg", imageQualityValue);
            const base64Data = imageData.split(",")[1];
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let j = 0; j < binaryString.length; j++) {
              bytes[j] = binaryString.charCodeAt(j);
            }

            const image = await compressedPdfDoc.embedJpg(bytes);
            const newPage = compressedPdfDoc.addPage([width, height]);
            newPage.drawImage(image, {
              x: 0,
              y: 0,
              width: width,
              height: height,
            });
          }
        } catch (pageError) {
          // Fallback: try to copy original page
          try {
            const [copiedPage] = await compressedPdfDoc.copyPages(
              originalPdfDoc,
              [pageNum - 1]
            );
            compressedPdfDoc.addPage(copiedPage);
          } catch (copyError) {
            // Skip page if all methods fail
          }
        }
      }
    }

    // Copy metadata
    try {
      const title = originalPdfDoc.getTitle();
      const author = originalPdfDoc.getAuthor();
      const subject = originalPdfDoc.getSubject();
      const creator = originalPdfDoc.getCreator();
      const producer = originalPdfDoc.getProducer();
      const creationDate = originalPdfDoc.getCreationDate();
      const modificationDate = originalPdfDoc.getModificationDate();

      if (title) compressedPdfDoc.setTitle(title);
      if (author) compressedPdfDoc.setAuthor(author);
      if (subject) compressedPdfDoc.setSubject(subject);
      if (creator) compressedPdfDoc.setCreator(creator);
      if (producer) compressedPdfDoc.setProducer(producer);
      if (creationDate) compressedPdfDoc.setCreationDate(creationDate);
      if (modificationDate)
        compressedPdfDoc.setModificationDate(modificationDate);
    } catch (metaError) {
      // Metadata copy is optional
    }

    // Save compressed PDF
    return await compressedPdfDoc.save({
      useObjectStreams: true,
    });
  };

  const compressPdfs = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select PDF files to compress", "error");
      return;
    }

    // Validate target size if enabled
    if (targetSizeEnabled) {
      if (!targetSizeValue || Number(targetSizeValue) <= 0) {
        showToast("Please enter a valid target size", "error");
        return;
      }
    }

    setIsCompressing(true);
    setCompressionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    const results: CompressionResult[] = [];

    try {
      // Import PDF libraries dynamically
      const { PDFDocument } = await import("pdf-lib");
      const pdfjsLib = await import("pdfjs-dist");

      // Configure pdfjs worker
      if (
        typeof window !== "undefined" &&
        !pdfjsLib.GlobalWorkerOptions.workerSrc
      ) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      }

      // Calculate target size in bytes if enabled
      let targetSizeBytes: number | null = null;
      if (targetSizeEnabled && targetSizeValue) {
        const targetValue = Number(targetSizeValue);
        targetSizeBytes =
          targetSizeUnit === "MB"
            ? targetValue * 1024 * 1024
            : targetValue * 1024;
      }

      // Determine compression settings based on level
      let imageQualityValue: number;
      let renderScale: number;
      let shouldRasterize: boolean;

      switch (compressionLevel) {
        case "light":
          // Light: High quality (0.92-0.95), high scale (2.0x), structural optimization only
          imageQualityValue = Math.max(
            0.92,
            Math.min(0.95, imageQuality[0] / 100)
          );
          renderScale = 2.0;
          shouldRasterize = false; // Just optimize structure
          break;
        case "balanced":
          // Balanced: Medium quality (0.75-0.85), medium scale (1.5x), compress images
          imageQualityValue = Math.max(
            0.75,
            Math.min(0.85, (imageQuality[0] / 100) * 0.9)
          );
          renderScale = 1.5;
          shouldRasterize = true; // Rasterize to compress
          break;
        case "maximum":
          // Maximum: Lower quality (0.50-0.70), lower scale (1.2x), aggressive compression
          imageQualityValue = Math.max(
            0.5,
            Math.min(0.7, (imageQuality[0] / 100) * 0.8)
          );
          renderScale = 1.2;
          shouldRasterize = true; // Rasterize for maximum compression
          break;
        default:
          imageQualityValue = 0.85;
          renderScale = 1.5;
          shouldRasterize = true;
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setCompressionProgress({
          current: i + 1,
          total: selectedFiles.length,
          file: file.name,
        });

        try {
          const pdfBytes = await file.arrayBuffer();
          const originalPdfDoc = await PDFDocument.load(pdfBytes);
          const originalSize = file.size;

          // Load with pdfjs to extract images
          const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
          const pdf = await loadingTask.promise;
          const numPages = pdf.numPages;

          let compressedPdfBytes: Uint8Array;
          let finalQuality = imageQualityValue;
          let finalScale = renderScale;
          let finalShouldRasterize = shouldRasterize;

          // If target size is enabled, use binary search to find optimal quality
          if (targetSizeEnabled && targetSizeBytes !== null) {
            if (targetSizeBytes >= originalSize) {
              // Target size is larger than or equal to original, just optimize structure
              compressedPdfBytes = await compressPdfWithSettings(
                pdfBytes,
                originalPdfDoc,
                pdf,
                numPages,
                0.95,
                2.0,
                false,
                PDFDocument,
                pdfjsLib
              );
            } else {
              // Force rasterization for target size mode
              finalShouldRasterize = true;

              // Start with initial quality based on compression level
              let minQuality = 0.1;
              let maxQuality = 0.95;
              let bestQuality = imageQualityValue;
              let bestResult: Uint8Array | null = null;
              let bestDiff = Infinity;
              const tolerance = 0.05; // 5% tolerance

              // Binary search for optimal quality (max 8 iterations to avoid too long processing)
              for (let iteration = 0; iteration < 8; iteration++) {
                finalQuality = (minQuality + maxQuality) / 2;

                // Adjust scale based on quality for better compression
                if (finalQuality < 0.4) {
                  finalScale = 1.0; // Very low quality, use lower scale
                } else if (finalQuality < 0.6) {
                  finalScale = 1.2;
                } else if (finalQuality < 0.8) {
                  finalScale = 1.5;
                } else {
                  finalScale = 2.0;
                }

                const testResult = await compressPdfWithSettings(
                  pdfBytes,
                  originalPdfDoc,
                  pdf,
                  numPages,
                  finalQuality,
                  finalScale,
                  finalShouldRasterize,
                  PDFDocument,
                  pdfjsLib
                );

                const currentSize = testResult.length;
                const diff = Math.abs(currentSize - targetSizeBytes);
                const ratio = currentSize / targetSizeBytes;

                // If we're within tolerance, use this result
                if (ratio >= 0.95 && ratio <= 1.05) {
                  bestResult = testResult;
                  bestQuality = finalQuality;
                  break;
                }

                // Track the best result so far
                if (diff < bestDiff) {
                  bestDiff = diff;
                  bestResult = testResult;
                  bestQuality = finalQuality;
                }

                // Adjust search range
                if (currentSize > targetSizeBytes) {
                  // Too large, reduce quality
                  maxQuality = finalQuality;
                } else {
                  // Too small, increase quality
                  minQuality = finalQuality;
                }

                // If range is very small, stop
                if (maxQuality - minQuality < 0.05) {
                  break;
                }
              }

              compressedPdfBytes =
                bestResult ||
                (await compressPdfWithSettings(
                  pdfBytes,
                  originalPdfDoc,
                  pdf,
                  numPages,
                  bestQuality,
                  finalScale,
                  finalShouldRasterize,
                  PDFDocument,
                  pdfjsLib
                ));
              finalQuality = bestQuality;
            }
          } else {
            // Normal compression without target size
            compressedPdfBytes = await compressPdfWithSettings(
              pdfBytes,
              originalPdfDoc,
              pdf,
              numPages,
              imageQualityValue,
              renderScale,
              shouldRasterize,
              PDFDocument,
              pdfjsLib
            );
          }

          const compressedSize = compressedPdfBytes.length;
          let compressionRatio = Math.round(
            ((originalSize - compressedSize) / originalSize) * 100
          );

          // If compression increased size, try basic optimization instead
          if (compressionRatio < 0 && compressionLevel !== "maximum") {
            try {
              const optimizedPdfDoc = await PDFDocument.load(pdfBytes);
              const optimizedBytes = await optimizedPdfDoc.save({
                useObjectStreams: true,
              });

              const optimizedSize = optimizedBytes.length;
              const optimizedRatio = Math.round(
                ((originalSize - optimizedSize) / originalSize) * 100
              );

              // Use the better result
              if (optimizedRatio > compressionRatio) {
                // Add watermark suffix to compressed filename
                const watermarkedFilename = addWatermarkSuffix(file.name);
                const optimizedFile = new File(
                  [optimizedBytes.buffer as ArrayBuffer],
                  watermarkedFilename,
                  {
                    type: "application/pdf",
                  }
                );

                results.push({
                  file: optimizedFile,
                  originalName: file.name,
                  originalSize,
                  compressedSize: optimizedSize,
                  compressionRatio: Math.max(0, optimizedRatio),
                  success: true,
                });
                continue;
              }
            } catch (optError) {
              // Continue with original compression result
            }
          }

          // Ensure we don't return a file larger than original (unless it's maximum mode)
          if (compressionRatio < 0 && compressionLevel !== "maximum") {
            // Return original file if compression made it worse (still add watermark)
            const watermarkedFilename = addWatermarkSuffix(file.name);
            const watermarkedFile = new File(
              [file],
              watermarkedFilename,
              {
                type: "application/pdf",
              }
            );
            results.push({
              file: watermarkedFile,
              originalName: file.name,
              originalSize,
              compressedSize: originalSize,
              compressionRatio: 0,
              success: true,
            });
          } else {
            // Add watermark suffix to compressed filename
            const watermarkedFilename = addWatermarkSuffix(file.name);
            const compressedFile = new File(
              [compressedPdfBytes.buffer as ArrayBuffer],
              watermarkedFilename,
              {
                type: "application/pdf",
              }
            );

            results.push({
              file: compressedFile,
              originalName: file.name,
              originalSize,
              compressedSize,
              compressionRatio: Math.max(0, compressionRatio),
              success: true,
            });
          }
        } catch (error) {
          // Fallback: Try basic optimization
          try {
            const { PDFDocument } = await import("pdf-lib");
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);

            const optimizedBytes = await pdfDoc.save({
              useObjectStreams: true,
            });

            const originalSize = file.size;
            const compressedSize = optimizedBytes.length;
            const compressionRatio = Math.round(
              ((originalSize - compressedSize) / originalSize) * 100
            );

            // Only use if it actually compresses
            if (compressionRatio > 0) {
              // Add watermark suffix to compressed filename
              const watermarkedFilename = addWatermarkSuffix(file.name);
              const compressedFile = new File(
                [optimizedBytes.buffer as ArrayBuffer],
                watermarkedFilename,
                {
                  type: "application/pdf",
                }
              );

              results.push({
                file: compressedFile,
                originalName: file.name,
                originalSize,
                compressedSize,
                compressionRatio: compressionRatio,
                success: true,
              });
            } else {
              // Return original if optimization doesn't help (still add watermark)
              const watermarkedFilename = addWatermarkSuffix(file.name);
              const watermarkedFile = new File(
                [file],
                watermarkedFilename,
                {
                  type: "application/pdf",
                }
              );
              results.push({
                file: watermarkedFile,
                originalName: file.name,
                originalSize,
                compressedSize: originalSize,
                compressionRatio: 0,
                success: true,
              });
            }
          } catch (fallbackError) {
            results.push({
              file: file,
              originalName: file.name,
              originalSize: file.size,
              compressedSize: file.size,
              compressionRatio: 0,
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            });
          }
        }
      }

      setCompressedResults(results);
      const successCount = results.filter((r) => r.success).length;
      const totalSaved = results.reduce(
        (sum, r) => sum + Math.max(0, r.originalSize - r.compressedSize),
        0
      );

      if (successCount > 0) {
        const avgCompression =
          results
            .filter((r) => r.success && r.compressionRatio > 0)
            .reduce((sum, r) => sum + r.compressionRatio, 0) /
          Math.max(
            1,
            results.filter((r) => r.success && r.compressionRatio > 0).length
          );

        if (totalSaved > 0) {
          showToast(
            `Compressed ${successCount} PDF(s), saved ${formatFileSize(
              totalSaved
            )} (avg ${Math.round(avgCompression)}% reduction)`,
            "success"
          );
        } else {
          showToast(
            `Processed ${successCount} PDF(s) - files are already optimized`,
            "info"
          );
        }
      }
      const errorCount = results.filter((r) => !r.success).length;
      if (errorCount > 0) {
        showToast(`Failed to compress ${errorCount} file(s)`, "error");
      }
    } catch (error) {
      showToast(
        "Compression failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadSingle = (result: CompressionResult) => {
    if (result.success) {
      downloadFile(result.file, result.file.name);
      showToast("Compressed PDF downloaded", "success");
    }
  };

  const downloadAll = () => {
    const successResults = compressedResults.filter((r) => r.success);
    successResults.forEach((result) => {
      downloadFile(result.file, result.file.name);
    });
    showToast(
      `Downloaded ${successResults.length} compressed PDF files`,
      "success"
    );
  };

  const downloadAllAsZip = async () => {
    try {
      const successResults = compressedResults.filter((r) => r.success);
      
      if (successResults.length === 0) {
        showToast("No compressed PDFs available for download", "error");
        return;
      }

      setIsCreatingZip(true);
      const files = successResults.map((result) => result.file);
      
      const zipBlob = await createZipFromFiles(files, "compressed_by_toolspy.net.zip");
      
      downloadZip(zipBlob, "compressed_by_toolspy.net.zip");
      
      showToast(
        `ZIP file downloaded with ${successResults.length} PDF(s)`,
        "success"
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create ZIP file";
      showToast(`ZIP Error: ${errorMessage}`, "error");
    } finally {
      setIsCreatingZip(false);
    }
  };

  const compressionPresets = [
    {
      key: "light",
      icon: <Zap className="h-5 w-5" />,
      title: "Light Compression",
      description: "Minimal compression, keeps original quality",
      savings: "10-20%",
    },
    {
      key: "balanced",
      icon: <Target className="h-5 w-5" />,
      title: "Balanced",
      description: "Good balance of quality and file size",
      savings: "20-40%",
    },
    {
      key: "maximum",
      icon: <Gauge className="h-5 w-5" />,
      title: "Maximum Compression",
      description: "Smallest file size, some quality loss",
      savings: "40-60%",
    },
  ];

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

        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          PDF Compressor
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Reduce PDF file sizes while maintaining quality. Compress documents
          for faster sharing, storage efficiency, and web optimization.
        </p>
      </div>

      {/* File Upload */}
      <PDFFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={20}
        maxFileSize={Infinity} // Unlimited
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
                      Selected PDF Files ({selectedFiles.length})
                    </CardTitle>
                    <CardDescription>
                      Files ready for compression
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={clearAllFiles} size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            {file.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile(index)}
                        title="Remove file"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compression Presets */}
            <Card className="mb-6 sm:mb-8 md:col-span-2">
              <CardHeader>
                <CardTitle>Compression Presets</CardTitle>
                <CardDescription>
                  Choose a compression level that best fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {compressionPresets.map(
                    ({ key, icon, title, description, savings }) => (
                      <Card
                        key={key}
                        className={`cursor-pointer transition-all duration-200 ${
                          compressionLevel === key
                            ? "ring-1 ring-primary bg-gray-300/50 dark:bg-gray-500/50"
                            : "hover:shadow-md hover:ring-1 hover:ring-primary"
                        }`}
                        onClick={() => setCompressionLevel(key)}
                      >
                        <CardContent className="p-3 mb-0">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                              {icon}
                            </div>
                            <div>
                              <div className="flex flex-row gap-5 items-center">
                                <h3 className="font-semibold text-sm sm:text-base">
                                  {title}
                                </h3>
                                <p className="text-xs text-green-600 font-medium">
                                  {savings}
                                </p>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                {description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Compression Settings */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Fine-tune compression parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Quality and Target Size Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image Quality */}
              <div className="space-y-2 p-4 rounded-xl border bg-gray-100 dark:bg-gray-800">
                <Label className="text-sm font-medium">
                  Image Quality: {imageQuality[0]}%
                </Label>
                <Slider
                  value={imageQuality}
                  onValueChange={setImageQuality}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                  disabled={targetSizeEnabled}
                />
                <p className="text-xs text-muted-foreground">
                  {targetSizeEnabled
                    ? "Disabled when target size is set"
                    : "Lower = smaller files, Higher = better quality"}
                </p>
              </div>

              {/* Target Size Option */}
              <div className="space-y-2 p-4 rounded-xl border bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Target File Size
                  </Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="target-size-enabled"
                      checked={targetSizeEnabled}
                      onChange={(e) => {
                        setTargetSizeEnabled(e.target.checked);
                        if (!e.target.checked) {
                          setTargetSizeValue("");
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <Label
                      htmlFor="target-size-enabled"
                      className="text-xs text-muted-foreground cursor-pointer"
                    >
                      Enable
                    </Label>
                  </div>
                </div>

                {targetSizeEnabled ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="Enter size"
                      value={targetSizeValue}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (!isNaN(Number(value)) && Number(value) > 0)
                        ) {
                          setTargetSizeValue(value);
                        }
                      }}
                      min="0.1"
                      step="0.1"
                      className="flex-1 ring-1 ring-gray-400"
                    />
                    <Select
                      value={targetSizeUnit}
                      onValueChange={(value: "KB" | "MB") =>
                        setTargetSizeUnit(value)
                      }
                    >
                      <SelectTrigger className="w-20 ring-1 ring-gray-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KB">KB</SelectItem>
                        <SelectItem value="MB">MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="text-xs text-muted-foreground">
                      Optional: Set a specific file size target
                    </p>
                  </div>
                )}
                {targetSizeEnabled && (
                  <p className="text-xs text-muted-foreground">
                    Quality will auto-adjust to reach target size
                  </p>
                )}
              </div>
            </div>

            {/* Compress Button */}
            <Button
              onClick={compressPdfs}
              disabled={selectedFiles.length === 0 || isCompressing}
              size="lg"
              className="w-full"
            >
              <Gauge className="h-5 w-5 mr-2" />
              {isCompressing
                ? "Compressing..."
                : `Compress ${selectedFiles.length} PDF Files`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Compression Results */}
      {compressedResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Compression Results
                </CardTitle>
                <CardDescription>
                  {compressedResults.filter((r) => r.success).length} PDF(s)
                  compressed successfully
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={downloadAll} size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
                <Button 
                  onClick={downloadAllAsZip} 
                  size="sm"
                  disabled={isCreatingZip}
                >
                  <Package className="h-4 w-4 mr-2" />
                  {isCreatingZip ? "Creating ZIP..." : "Download as ZIP"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compressedResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm sm:text-base mb-2">
                        {result.originalName}
                      </h4>
                      {result.success ? (
                        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span>
                            Original: {formatFileSize(result.originalSize)}
                          </span>
                          <span>
                            Compressed: {formatFileSize(result.compressedSize)}
                          </span>
                          <Badge
                            variant={
                              result.compressionRatio > 20
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {result.compressionRatio}% smaller
                          </Badge>
                        </div>
                      ) : (
                        <p className="text-xs text-red-500">
                          Error: {result.error}
                        </p>
                      )}
                    </div>
                    {result.success && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSingle(result)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isCompressing}
        title="Compressing PDF Files"
        current={compressionProgress.current}
        total={compressionProgress.total}
        currentFile={compressionProgress.file}
        description="Please wait while we compress your PDF files..."
      />
</div>
  );
}

export default function CompressPdfLazyInner() {
  return (
    <ToastProvider>
      <CompressPdfContent />
    </ToastProvider>
  );
}
