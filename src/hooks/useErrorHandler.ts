import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface ErrorHandlerOptions {
  showToast?: boolean;
  fallbackMessage?: string;
  onError?: (error: Error) => void;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    showToast = true,
    fallbackMessage = 'An unexpected error occurred. Please try again.',
    onError,
  } = options;

  const handleError = useCallback((error: unknown, context?: string) => {
    let errorMessage = fallbackMessage;
    let errorObject: Error;

    if (error instanceof Error) {
      errorObject = error;
      errorMessage = error.message || fallbackMessage;
    } else if (typeof error === 'string') {
      errorObject = new Error(error);
      errorMessage = error;
    } else {
      errorObject = new Error(fallbackMessage);
    }

    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error${context ? ` in ${context}` : ''}:`, errorObject);
    }

    // Call custom error handler if provided
    onError?.(errorObject);

    // Show toast notification if enabled
    if (showToast) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    }

    return errorObject;
  }, [fallbackMessage, onError, showToast]);

  const handleAsyncError = useCallback(async (
    asyncFn: () => Promise<any>,
    context?: string
  ) => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, context);
      throw error; // Re-throw to allow caller to handle if needed
    }
  }, [handleError]);

  return { handleError, handleAsyncError };
};