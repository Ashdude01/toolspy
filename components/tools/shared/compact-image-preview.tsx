"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Eye, EyeOff } from "lucide-react";
import {
  formatFileSize,
  getImageFormat,
  getImageDimensions,
} from "@/lib/utils/file-utils";

interface CompactImagePreviewProps {
  file: File;
  onRemove?: () => void;
  showMetadata?: boolean;
  className?: string;
  compressedSize?: number;
  compressionPercentage?: number;
}

export function CompactImagePreview({
  file,
  onRemove,
  showMetadata = true,
  className = "",
  compressedSize,
  compressionPercentage,
}: CompactImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [showFullSize, setShowFullSize] = useState(false);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    // Get image dimensions
    getImageDimensions(file).then(setDimensions).catch(console.error);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const format = getImageFormat(file);

  return (
    <Card className={`relative ${className}`}>
      {onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-.5 right-[0.1px] z-10 h-6 w-6 rounded-full bg-red-500"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Image Preview */}
          <div className="flex-shrink-0">
            {imageUrl && (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={file.name}
                  className={`rounded-lg object-contain bg-muted ${
                    showFullSize ? "w-32 h-32" : "w-20 h-20"
                  }`}
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, #f1f5f9 25%, transparent 25%), 
                      linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #f1f5f9 75%), 
                      linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)
                    `,
                    backgroundSize: "10px 10px",
                    backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
                  }}
                />
              </div>
            )}
          </div>

          {/* File Information */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium truncate mr-2">{file.name}</h3>
              {/* <div className="flex items-center space-x-2">
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setShowFullSize(!showFullSize)}
                >
                  {showFullSize ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </Button>
              </div> */}
            </div>
            {showMetadata && (
              <div className="text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium text-right">
                    {format}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original:</span>
                  <span className="font-medium text-right">
                    {formatFileSize(file.size)}
                  </span>
                </div>

                {compressedSize && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compressed:</span>
                    <span className="font-medium text-right">
                      {formatFileSize(compressedSize)}
                    </span>
                  </div>
                )}

                {compressionPercentage && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saved:</span>
                    <Badge variant="outline" className="text-xs px-1 py-0 h-5 text-right">
                      {compressionPercentage}%
                    </Badge>
                  </div>
                )}

                {dimensions && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="font-medium text-right">
                      {dimensions.width} × {dimensions.height}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
