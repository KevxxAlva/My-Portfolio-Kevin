import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

// Lazy load ALL pages including Index for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));

// Lazy load heavy UI components - only load after initial render
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

// Minimal page loader - no external dependencies
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh',
    background: 'hsl(0 0% 0%)'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '4px solid hsl(0 100% 50%)',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Deferred components wrapper - loads after hydration
const DeferredComponents = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Defer loading of non-critical components
    const timer = requestIdleCallback(() => setMounted(true), { timeout: 2000 });
    return () => cancelIdleCallback(timer);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
    </Suspense>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <LanguageProvider>
      <GoogleAnalytics />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <DeferredComponents />
    </LanguageProvider>
  </ThemeProvider>
);

export default App;

