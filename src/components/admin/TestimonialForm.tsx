import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onSave: (data: Omit<Testimonial, "id">) => void;
  onCancel: () => void;
}

export const TestimonialForm = ({ testimonial, onSave, onCancel }: TestimonialFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        text: testimonial.text,
        imageUrl: testimonial.imageUrl || "",
      });
    }
  }, [testimonial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-xl space-y-6">
      <h3 className="text-xl font-bold mb-4">
        {testimonial ? "Editar Testimonio" : "Nuevo Testimonio"}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-background/50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Rol / Cargo</label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
            className="bg-background/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Testimonio</label>
          <Textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
            className="bg-background/50 min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL Imagen (Opcional)</label>
          <Input
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://..."
            className="bg-background/50"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
};
