'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((
    message: string, 
    type: Toast['type'] = 'info', 
    duration: number = 3000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { id, type, message, duration };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const getIcon = (type: Toast['type']) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'error':
        return <XCircle className={`${iconClass} text-red-500`} />;
      case 'warning':
        return <AlertCircle className={`${iconClass} text-yellow-500`} />;
      case 'info':
      default:
        return <Info className={`${iconClass} text-blue-500`} />;
    }
  };

  const getToastStyle = (type: Toast['type']) => {
    const baseStyle = "border-l-2 shadow-lg";
    switch (type) {
      case 'success':
        return `${baseStyle} border-green-500 bg-green-50 dark:bg-green-900/20`;
      case 'error':
        return `${baseStyle} border-red-500 bg-red-50 dark:bg-red-900/20`;
      case 'warning':
        return `${baseStyle} border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20`;
      case 'info':
      default:
        return `${baseStyle} border-blue-500 bg-blue-50 dark:bg-blue-900/20`;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-5 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              ${getToastStyle(toast.type)}
              rounded-lg p-4 animate-in slide-in-from-bottom-2 duration-300
            `}
          >
            <div className="flex items-start space-x-3">
              {getIcon(toast.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
} 