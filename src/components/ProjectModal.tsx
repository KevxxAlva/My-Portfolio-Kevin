import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50"
          >
            <div className="glass-strong rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header Image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={project.imagenUrl}
                  alt={project.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full glass text-foreground hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Featured Badge */}
                {project.destacado && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                      <Star className="w-4 h-4 fill-current" />
                      Proyecto Destacado
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {project.titulo}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 rounded-lg bg-secondary text-secondary-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {project.descripcionCompleta}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="lg" className="flex-1" asChild>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Demo en Vivo
                    </a>
                  </Button>
                  <Button variant="glass" size="lg" className="flex-1" asChild>
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Ver Código Fuente
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};