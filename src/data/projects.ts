// Static data removed in favor of Supabase implementation
// import projectDashboard from "@/assets/project-dashboard.jpg";
// import projectApi from "@/assets/project-api.jpg";
// import projectWeather from "@/assets/project-weather.jpg";
// import projectChat from "@/assets/project-chat.jpg";

export interface Project {
  id: string;
  titulo: string;
  descripcion: string;
  descripcionCompleta: string;
  tags: string[];
  imagenUrl: string;
  repoLink: string;
  demoLink: string;
  destacado?: boolean;
}
