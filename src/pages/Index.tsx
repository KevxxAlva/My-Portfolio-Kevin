import { Suspense, lazy } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

// Lazy load below-the-fold content
const ProjectsSection = lazy(() => import("@/components/ProjectsSection").then(module => ({ default: module.ProjectsSection })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then(module => ({ default: module.ServicesSection })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(module => ({ default: module.TestimonialsSection })));
const AboutSection = lazy(() => import("@/components/AboutSection").then(module => ({ default: module.AboutSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));

// Simple fallback to prevent layout shifts
const SectionLoader = () => <div className="py-20" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
          <ServicesSection />
          <TestimonialsSection />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;