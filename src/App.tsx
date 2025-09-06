import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import { FloatingScrollButton } from "./components/FloatingScrollButton";
import { WhatsAppButton } from "./components/WhatsAppButton";


// Floating UI loaded eagerly to avoid dynamic import issues

// Prefetch route chunks in the background to avoid Suspense delays
if (typeof window !== "undefined") {
  const prefetch = () => {
    import("./pages/About");
    import("./pages/Services");
    import("./pages/Analytics");
    import("./pages/Contact");
    import("./pages/PrivacyPolicy");
    import("./pages/TermsOfService");
    import("./pages/NotFound");
  };
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(prefetch);
  } else {
    setTimeout(prefetch, 1200);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && typeof error.status === 'number' && error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Suspense fallback={
                <div className="min-h-screen bg-background flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            <WhatsAppButton />
            <FloatingScrollButton />
          </HashRouter>
        </HelmetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
