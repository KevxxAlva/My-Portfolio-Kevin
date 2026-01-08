import { Suspense, lazy } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LazySection } from "@/components/LazySection";

// Lazy load all below-the-fold content
const ProjectsSection = lazy(() => import("@/components/ProjectsSection").then(module => ({ default: module.ProjectsSection })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then(module => ({ default: module.ServicesSection })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(module => ({ default: module.TestimonialsSection })));
const AboutSection = lazy(() => import("@/components/AboutSection").then(module => ({ default: module.AboutSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));

// Skeleton loaders for better UX
const SectionSkeleton = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        
        {/* Projects - loads when 300px from viewport (uses Supabase) */}
        <LazySection rootMargin="300px" fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </LazySection>
        
        {/* Services - static content, loads early */}
        <LazySection rootMargin="400px" fallback={<SectionSkeleton />}>
          <ServicesSection />
        </LazySection>
        
        {/* Testimonials - uses Supabase */}
        <LazySection rootMargin="300px" fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </LazySection>
        
        {/* About - static content */}
        <LazySection rootMargin="200px" fallback={<SectionSkeleton />}>
          <AboutSection />
        </LazySection>
        
        {/* Contact - loads Supabase on form submit */}
        <LazySection rootMargin="200px" fallback={<SectionSkeleton />}>
          <ContactSection />
        </LazySection>
      </main>
      
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
