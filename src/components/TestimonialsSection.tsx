import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParallaxElement } from "@/components/ui/ParallaxElement";
import { useTestimonials } from "@/hooks/useTestimonials";

export const TestimonialsSection = () => {
  const { t } = useLanguage();
  const { testimonials, isLoaded } = useTestimonials();

  // Don't render section if not loaded yet to avoid flash of empty content
  if (!isLoaded) return null;

  // Only render if there are testimonials
  if (testimonials.length === 0) return null;

  const displayTestimonials = testimonials.map(t => ({
      name: t.name,
      role: t.role,
      text: t.text,
      image: t.imageUrl || "https://i.pravatar.cc/150", 
  }));

  return (
    <section id="testimonios" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <ParallaxElement offset={30}>
          <div className="text-center mb-16">
            <p className="text-primary font-mono mb-4">{`<${t("nav_testimonials")} />`}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">{t("testimonials_title").split(" ")[0]} </span>
              <span className="gradient-text">{t("testimonials_title").split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("testimonials_subtitle")}
            </p>
          </div>
        </ParallaxElement>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl relative group"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-muted-foreground italic leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
