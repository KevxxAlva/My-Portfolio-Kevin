import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard = ({ project, index, onOpenModal }: ProjectCardProps) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative glass rounded-xl overflow-hidden hover-lift cursor-pointer"
      onClick={() => onOpenModal(project)}
    >
      {/* Featured Badge */}
      {project.destacado && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            <Star className="w-3 h-3 fill-current" />
            Destacado
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-secondary/50">
        <img
          src={project.imagenUrl}
          alt={project.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.titulo}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.descripcion}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground font-mono">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <motion.a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ x: 2 }}
          >
            <Github className="w-4 h-4" />
            Código
          </motion.a>
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ x: 2 }}
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </motion.a>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
};