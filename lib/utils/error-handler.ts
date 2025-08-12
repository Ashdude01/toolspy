// Error handling utilities for better user engagement

export interface ErrorInfo {
  message: string;
  stack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  errorId: string;
}

export interface EngagementMetrics {
  pageViews: number;
  bounceRate: number;
  timeOnPage: number;
  userActions: string[];
}

// Generate a unique error ID
export function generateErrorId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Log error with context
export function logError(error: Error, context?: Record<string, any>): ErrorInfo {
  const errorInfo: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    errorId: generateErrorId(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorInfo);
    if (context) {
      console.error('Error context:', context);
    }
  }

  // In production, you would send this to your error tracking service
  // Example: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // sendToErrorTrackingService(errorInfo, context);
  }

  return errorInfo;
}

// Track user engagement on error pages
export function trackErrorPageEngagement(action: string): void {
  if (typeof window === 'undefined') return;

  const engagementData = {
    action,
    timestamp: Date.now(),
    url: window.location.href,
    referrer: document.referrer,
  };

  // Store in localStorage for analytics
  const existingData = localStorage.getItem('errorPageEngagement');
  const engagementHistory = existingData ? JSON.parse(existingData) : [];
  engagementHistory.push(engagementData);
  
  // Keep only last 10 interactions
  if (engagementHistory.length > 10) {
    engagementHistory.splice(0, engagementHistory.length - 10);
  }
  
  localStorage.setItem('errorPageEngagement', JSON.stringify(engagementHistory));

  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // sendToAnalyticsService('error_page_engagement', engagementData);
  }
}

// Get user-friendly error messages
export function getUserFriendlyMessage(error: Error): string {
  const errorMessage = error.message.toLowerCase();
  
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'Network connection issue. Please check your internet connection and try again.';
  }
  
  if (errorMessage.includes('timeout')) {
    return 'Request timed out. The server is taking longer than expected to respond.';
  }
  
  if (errorMessage.includes('not found') || errorMessage.includes('404')) {
    return 'The page or resource you\'re looking for doesn\'t exist.';
  }
  
  if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
    return 'You don\'t have permission to access this resource.';
  }
  
  if (errorMessage.includes('forbidden') || errorMessage.includes('403')) {
    return 'Access to this resource is forbidden.';
  }
  
  if (errorMessage.includes('server') || errorMessage.includes('500')) {
    return 'Server error. Our team has been notified and is working to fix this issue.';
  }
  
  return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
}

// Check if error is recoverable
export function isRecoverableError(error: Error): boolean {
  const errorMessage = error.message.toLowerCase();
  
  // Network errors are usually recoverable
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return true;
  }
  
  // Timeout errors are recoverable
  if (errorMessage.includes('timeout')) {
    return true;
  }
  
  // 5xx server errors might be recoverable
  if (errorMessage.includes('500') || errorMessage.includes('502') || errorMessage.includes('503')) {
    return true;
  }
  
  // 4xx client errors are usually not recoverable
  if (errorMessage.includes('400') || errorMessage.includes('401') || errorMessage.includes('403') || errorMessage.includes('404')) {
    return false;
  }
  
  return true;
}

// Get suggested actions based on error type
export function getSuggestedActions(error: Error): Array<{ label: string; action: string; priority: 'high' | 'medium' | 'low' }> {
  const errorMessage = error.message.toLowerCase();
  const actions: Array<{ label: string; action: string; priority: 'high' | 'medium' | 'low' }> = [];
  
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    actions.push(
      { label: 'Check your internet connection', action: 'network_check', priority: 'high' },
      { label: 'Try refreshing the page', action: 'refresh', priority: 'high' },
      { label: 'Contact support if problem persists', action: 'contact_support', priority: 'medium' }
    );
  }
  
  if (errorMessage.includes('timeout')) {
    actions.push(
      { label: 'Try again in a few moments', action: 'retry', priority: 'high' },
      { label: 'Check if the service is down', action: 'check_status', priority: 'medium' },
      { label: 'Contact support', action: 'contact_support', priority: 'low' }
    );
  }
  
  if (errorMessage.includes('not found') || errorMessage.includes('404')) {
    actions.push(
      { label: 'Browse all available tools', action: 'browse_tools', priority: 'high' },
      { label: 'Search for what you need', action: 'search', priority: 'high' },
      { label: 'Go back to homepage', action: 'go_home', priority: 'medium' }
    );
  }
  
  if (errorMessage.includes('server') || errorMessage.includes('500')) {
    actions.push(
      { label: 'Try again later', action: 'retry_later', priority: 'high' },
      { label: 'Check service status', action: 'check_status', priority: 'medium' },
      { label: 'Report this issue', action: 'report_issue', priority: 'medium' }
    );
  }
  
  // Default actions if no specific ones found
  if (actions.length === 0) {
    actions.push(
      { label: 'Try refreshing the page', action: 'refresh', priority: 'high' },
      { label: 'Go back to homepage', action: 'go_home', priority: 'medium' },
      { label: 'Contact support', action: 'contact_support', priority: 'low' }
    );
  }
  
  return actions;
}

// Track error page performance
export function trackErrorPagePerformance(): void {
  if (typeof window === 'undefined') return;

  const performanceData = {
    loadTime: performance.now(),
    timestamp: Date.now(),
    url: window.location.href,
  };

  // Send to analytics
  if (process.env.NODE_ENV === 'production') {
    // sendToAnalyticsService('error_page_performance', performanceData);
  }
}
