import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialListProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

export const TestimonialList = ({ testimonials, onEdit, onDelete }: TestimonialListProps) => {
  return (
    <div className="grid gap-4">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="glass p-4 rounded-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {testimonial.imageUrl && (
              <img 
                src={testimonial.imageUrl} 
                alt={testimonial.name} 
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-bold">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={() => onEdit(testimonial)}>
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onDelete(testimonial.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
      {testimonials.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          No hay testimonios aún.
        </div>
      )}
    </div>
  );
};
