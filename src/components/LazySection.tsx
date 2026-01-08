import { useState, useEffect, useRef, Suspense, ReactNode, ComponentType } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

/**
 * LazySection - Only renders children when section is near viewport
 * Uses Intersection Observer to defer loading of heavy components
 */
export const LazySection = ({ 
  children, 
  fallback = <div className="py-20" />,
  rootMargin = "200px" // Start loading 200px before visible
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

/**
 * Creates a lazy component wrapper with Intersection Observer
 */
export function createLazySection<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | { [key: string]: T }>,
  exportName?: string
) {
  return function LazyWrapper(props: any) {
    const [Component, setComponent] = useState<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: "300px" }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (isVisible && !Component) {
        importFn().then((module) => {
          const comp = exportName 
            ? (module as any)[exportName] 
            : (module as any).default;
          setComponent(() => comp);
        });
      }
    }, [isVisible, Component]);

    if (!isVisible) {
      return <div ref={ref} className="min-h-[200px]" />;
    }

    if (!Component) {
      return <div ref={ref} className="py-20 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>;
    }

    return <Component {...props} />;
  };
}
