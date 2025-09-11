'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff } from 'lucide-react';
import { formatFileSize, getImageFormat, getImageDimensions } from '@/lib/utils/file-utils';

interface ImagePreviewProps {
  file: File;
  onRemove?: () => void;
  showMetadata?: boolean;
  className?: string;
}

export function ImagePreview({ 
  file, 
  onRemove, 
  showMetadata = true, 
  className = '' 
}: ImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [showFullSize, setShowFullSize] = useState(false);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    // Get image dimensions
    getImageDimensions(file)
      .then(setDimensions)
      .catch(console.error);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const format = getImageFormat(file);

  return (
    <div className={`relative ${className}`}>
      <Card className="h-full border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium truncate text-slate-700 dark:text-slate-300">
                Selected Image
              </CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Source image for icon generation
              </p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Badge variant="outline" className="text-xs">
                {format}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowFullSize(!showFullSize)}
              >
                {showFullSize ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
              {onRemove && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={onRemove}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {imageUrl && (
            <div className="mb-4">
              <div className="relative w-full h-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                <img
                  src={imageUrl}
                  alt={file.name}
                  className={`w-full h-full object-contain ${
                    showFullSize ? 'max-h-none' : 'max-h-32'
                  }`}
                />
              </div>
            </div>
          )}

          {showMetadata && (
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Size:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{formatFileSize(file.size)}</span>
              </div>
              
              {dimensions && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Dimensions:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {dimensions.width} × {dimensions.height}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Type:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{file.type || 'Unknown'}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 