/**
 * Example: How to integrate Google Tag Manager tracking in your tools
 * 
 * This is an example component showing how to add GTM tracking to any tool.
 * Copy the tracking patterns shown here into your actual tool components.
 */

'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { trackEvent, trackToolUsage, trackFileOperation } from './google-tag-manager'

export function GTMIntegrationExample() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Track when the tool page loads
  useEffect(() => {
    trackToolUsage('Example Tool', 'tool_loaded', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent
    })
  }, [])

  // Track file upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      
      // Track file upload event
      trackToolUsage('Example Tool', 'file_uploaded', {
        file_type: selectedFile.type,
        file_size: selectedFile.size,
        file_name: selectedFile.name.split('.').pop() // Just extension for privacy
      })
      
      // Also track as file operation
      trackFileOperation('upload', selectedFile.type, selectedFile.size)
    }
  }

  // Track tool processing
  const handleProcess = async () => {
    if (!file) return
    
    setIsProcessing(true)
    
    // Track process start
    trackToolUsage('Example Tool', 'processing_started', {
      file_type: file.type,
      file_size: file.size
    })
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Track successful completion
      trackToolUsage('Example Tool', 'processing_completed', {
        file_type: file.type,
        original_size: file.size,
        processing_time: '2000ms',
        status: 'success'
      })
      
      // Track as file operation
      trackFileOperation('process', file.type, file.size)
      
    } catch (error) {
      // Track errors
      trackEvent('tool_error', {
        tool_name: 'Example Tool',
        error_type: 'processing_failed',
        file_type: file?.type,
        error_message: (error as Error).message
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Track download action
  const handleDownload = () => {
    trackToolUsage('Example Tool', 'file_downloaded', {
      file_type: file?.type,
      download_format: 'processed'
    })
    
    trackFileOperation('download', 'processed_file')
  }

  // Track sharing
  const handleShare = () => {
    trackEvent('social_share', {
      tool_name: 'Example Tool',
      share_type: 'tool_page',
      source: 'share_button'
    })
  }

  // Track button clicks
  const handleButtonClick = (buttonName: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      tool_name: 'Example Tool',
      page_section: 'tool_interface'
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>GTM Integration Example</CardTitle>
        <p className="text-sm text-muted-foreground">
          This shows how to integrate Google Tag Manager tracking in your tools.
          Check the browser console or GTM preview mode to see events being tracked.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload with Tracking */}
        <div>
          <Input
            type="file"
            onChange={handleFileSelect}
            onClick={() => handleButtonClick('file_input')}
          />
        </div>

        {file && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">Selected: {file.name}</p>
            <p className="text-xs text-muted-foreground">
              Size: {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}

        {/* Action Buttons with Tracking */}
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              handleButtonClick('process')
              handleProcess()
            }}
            disabled={!file || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Process File'}
          </Button>

          <Button 
            variant="outline"
            onClick={() => {
              handleButtonClick('download')
              handleDownload()
            }}
            disabled={!file}
          >
            Download
          </Button>

          <Button 
            variant="outline"
            onClick={() => {
              handleButtonClick('share')
              handleShare()
            }}
          >
            Share Tool
          </Button>
        </div>

        {/* Additional tracking examples */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Tracking Events Fired:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Page Load: tool_loaded</li>
            <li>• File Upload: file_uploaded + file_operation</li>
            <li>• Processing: processing_started → processing_completed</li>
            <li>• Download: file_downloaded + file_operation</li>
            <li>• Share: social_share</li>
            <li>• Button Clicks: button_click</li>
            <li>• Errors: tool_error</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Integration Checklist for Your Tools:
 * 
 * 1. Import tracking functions at the top:
 *    import { trackEvent, trackToolUsage, trackFileOperation } from '@/components/analytics/google-tag-manager'
 * 
 * 2. Track tool page load in useEffect:
 *    useEffect(() => {
 *      trackToolUsage('Your Tool Name', 'tool_loaded')
 *    }, [])
 * 
 * 3. Track user actions:
 *    - File uploads: trackFileOperation('upload', fileType, fileSize)
 *    - Processing: trackToolUsage('Tool Name', 'processing_started')
 *    - Downloads: trackToolUsage('Tool Name', 'file_downloaded')
 *    - Errors: trackEvent('tool_error', { error details })
 * 
 * 4. Track button clicks for important actions:
 *    onClick={() => {
 *      trackEvent('button_click', { button_name: 'action_name' })
 *      // Your action logic
 *    }}
 * 
 * 5. Consider tracking:
 *    - Tool completion rates
 *    - File types used
 *    - Error rates
 *    - User engagement patterns
 *    - Performance metrics
 */