/**
 * Performance utilities for optimizing web vitals and user experience
 */

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

// Debounce function to limit rapid function calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function to limit function execution frequency
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer utility for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  });
};

// Web Vitals tracking
export const trackWebVital = (name: string, value: number) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    // Example: gtag('event', name, { value });
  } else {
    console.log(`Web Vital - ${name}:`, value);
  }
};

// Memory usage monitor (for development)
export const monitorMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memInfo = (performance as any).memory;
    console.log('Memory Usage:', {
      used: `${Math.round(memInfo.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memInfo.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memInfo.jsHeapSizeLimit / 1048576)} MB`,
    });
  }
};

// Critical resource timing
export const measureResourceTiming = (resourceName: string) => {
  if (typeof window === 'undefined') return;
  
  const entries = performance.getEntriesByName(resourceName, 'resource');
  if (entries.length > 0) {
    const entry = entries[0] as PerformanceResourceTiming;
    const timing = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      request: entry.responseStart - entry.requestStart,
      response: entry.responseEnd - entry.responseStart,
      total: entry.responseEnd - entry.startTime,
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Resource timing for ${resourceName}:`, timing);
    }
    
    return timing;
  }
};