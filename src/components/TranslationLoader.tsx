import { Suspense } from 'react';

// Minimal loading fallback to reduce blank page duration
const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

interface TranslationLoaderProps {
  children: React.ReactNode;
}

export const TranslationLoader = ({ children }: TranslationLoaderProps) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
};