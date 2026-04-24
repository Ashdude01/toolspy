'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface ProgressModalProps {
  isOpen: boolean;
  title: string;
  current: number;
  total: number;
  currentFile?: string;
  description?: string;
  onCancel?: () => void;
}

// Function to intelligently truncate filename
function truncateFilename(filename: string, maxLength: number = 40): string {
  if (filename.length <= maxLength) {
    return filename;
  }

  // Find the last dot for extension
  const lastDotIndex = filename.lastIndexOf('.');
  
  if (lastDotIndex === -1) {
    // No extension, just truncate from the end
    return filename.slice(0, maxLength - 3) + '...';
  }

  const extension = filename.slice(lastDotIndex);
  const nameWithoutExt = filename.slice(0, lastDotIndex);
  
  // If extension is too long, truncate the whole thing
  if (extension.length > 10) {
    return filename.slice(0, maxLength - 3) + '...';
  }

  // Calculate how much space we have for the name part
  const spaceForName = maxLength - extension.length - 3; // 3 for "..."
  
  if (spaceForName < 5) {
    // Not enough space, just show start of filename
    return filename.slice(0, maxLength - 3) + '...';
  }

  // Show start of name + ... + extension
  return nameWithoutExt.slice(0, spaceForName) + '...' + extension;
}

export function ProgressModal({
  isOpen,
  title,
  current,
  total,
  currentFile,
  description,
  onCancel,
}: ProgressModalProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const displayFilename = currentFile ? truncateFilename(currentFile, 35) : '';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel?.();
      }}
    >
      <DialogContent className="sm:max-w-md max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 pr-6">
            <Loader2 className="h-5 w-5 animate-spin flex-shrink-0" />
            <span className="truncate">{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 min-w-0">
          {description && (
            <p className="text-sm text-muted-foreground break-words">{description}</p>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="flex-shrink-0">{current} of {total}</span>
            </div>
            <Progress value={percentage} className="w-full" />
            <div className="text-center text-sm font-medium">
              {percentage}%
            </div>
          </div>
          
          {currentFile && (
            <div className="space-y-1 min-w-0">
              <p className="text-sm font-medium">Current file:</p>
              <div className="bg-muted/50 rounded-md p-2 border">
                <p 
                  className="text-sm text-muted-foreground font-mono break-all leading-tight" 
                  title={currentFile}
                  style={{
                    wordBreak: 'break-all',
                    overflowWrap: 'anywhere',
                    maxWidth: '100%'
                  }}
                >
                  {displayFilename}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 