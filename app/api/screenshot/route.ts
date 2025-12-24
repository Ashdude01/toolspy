import { NextRequest, NextResponse } from 'next/server';
import captureWebsite from 'capture-website';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, width, height, format, fullPage, quality } = body;

    // Validate required parameters
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    let normalizedUrl: string;
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      normalizedUrl = urlObj.href;
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Validate dimensions
    const viewportWidth = width && width > 0 ? parseInt(width.toString()) : 1920;
    const viewportHeight = height && height > 0 ? parseInt(height.toString()) : 1080;
    const screenshotFormat = format === 'jpeg' || format === 'webp' ? format : 'png';
    const isFullPage = fullPage === true;
    const screenshotQuality = quality && quality >= 1 && quality <= 100 ? quality : 90;

    // Capture screenshot using capture-website
    console.log('Capturing screenshot:', {
      url: normalizedUrl,
      width: viewportWidth,
      height: viewportHeight,
      format: screenshotFormat,
      fullPage: isFullPage,
      quality: screenshotQuality
    });

    let screenshotBuffer: Buffer;
    try {
      screenshotBuffer = await captureWebsite.buffer(normalizedUrl, {
        width: viewportWidth,
        height: viewportHeight,
        fullPage: isFullPage,
        type: screenshotFormat,
        quality: screenshotFormat === 'jpeg' ? screenshotQuality / 100 : undefined,
        timeout: 30000, // 30 seconds timeout
        delay: 1, // Small delay to ensure page is fully loaded
      });
      
      if (!screenshotBuffer || screenshotBuffer.length === 0) {
        throw new Error('Screenshot buffer is empty');
      }
      
      console.log('Screenshot captured successfully, buffer size:', screenshotBuffer.length);
    } catch (captureError: any) {
      console.error('captureWebsite.buffer error:', captureError);
      console.error('Error details:', {
        message: captureError?.message,
        name: captureError?.name,
        stack: captureError?.stack
      });
      throw captureError;
    }

    // Convert buffer to base64 for response
    const base64Image = screenshotBuffer.toString('base64');
    const mimeType = screenshotFormat === 'jpeg' ? 'image/jpeg' : screenshotFormat === 'webp' ? 'image/webp' : 'image/png';

    return NextResponse.json({
      success: true,
      image: `data:${mimeType};base64,${base64Image}`,
      format: screenshotFormat,
      dimensions: {
        width: viewportWidth,
        height: viewportHeight,
      },
      fullPage: isFullPage,
    });

  } catch (error) {
    console.error('Screenshot API error:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    // Handle specific error types
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        return NextResponse.json(
          { 
            error: 'Screenshot capture timed out. The website may be taking too long to load.',
            details: error.message
          },
          { status: 408 }
        );
      }
      if (error.message.includes('net::ERR') || error.message.includes('Navigation failed')) {
        return NextResponse.json(
          { 
            error: 'Failed to access the website. Please check if the URL is correct and accessible.',
            details: error.message
          },
          { status: 400 }
        );
      }
      if (error.message.includes('Protocol error') || error.message.includes('Target closed')) {
        return NextResponse.json(
          { 
            error: 'Browser error occurred while capturing screenshot. Please try again.',
            details: error.message
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Failed to capture screenshot',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const width = searchParams.get('width');
  const height = searchParams.get('height');
  const format = searchParams.get('format');
  const fullPage = searchParams.get('fullPage');
  const quality = searchParams.get('quality');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Normalize URL
    let normalizedUrl: string;
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      normalizedUrl = urlObj.href;
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Parse parameters
    const viewportWidth = width ? parseInt(width) : 1920;
    const viewportHeight = height ? parseInt(height) : 1080;
    const screenshotFormat = format === 'jpeg' || format === 'webp' ? format : 'png';
    const isFullPage = fullPage === 'true';
    const screenshotQuality = quality ? parseInt(quality) : 90;

    // Capture screenshot
    const screenshotBuffer = await captureWebsite.buffer(normalizedUrl, {
      width: viewportWidth,
      height: viewportHeight,
      fullPage: isFullPage,
      type: screenshotFormat,
      quality: screenshotFormat === 'jpeg' ? screenshotQuality / 100 : undefined,
      timeout: 30000,
      delay: 1,
    });

    // Return image directly
    const mimeType = screenshotFormat === 'jpeg' ? 'image/jpeg' : screenshotFormat === 'webp' ? 'image/webp' : 'image/png';
    
    return new NextResponse(screenshotBuffer as any, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="screenshot.${screenshotFormat}"`,
      },
    });

  } catch (error) {
    console.error('Screenshot API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to capture screenshot',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
