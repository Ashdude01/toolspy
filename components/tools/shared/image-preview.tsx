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
    <Card className={`relative ${className}`}>
      {onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-0 right-0 z-10 h-6 w-6 rounded-full bg-red-500"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base truncate mr-2">
            {file.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
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
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {imageUrl && (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt={file.name}
              className={`w-full rounded-lg object-contain bg-muted ${
                showFullSize ? 'max-h-none' : 'max-h-48'
              }`}
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #f1f5f9 25%, transparent 25%), 
                  linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #f1f5f9 75%), 
                  linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            />
          </div>
        )}

        {showMetadata && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size:</span>
              <span className="font-medium">{formatFileSize(file.size)}</span>
            </div>
            
            {dimensions && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="font-medium">
                  {dimensions.width} × {dimensions.height}
                </span>
              </div>
            )}
            
            {/* <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{file.type || 'Unknown'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Modified:</span>
              <span className="font-medium">
                {new Date(file.lastModified).toLocaleDateString()}
              </span>
            </div> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 