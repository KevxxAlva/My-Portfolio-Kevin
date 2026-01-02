import projectDashboard from "@/assets/project-dashboard.jpg";
import projectApi from "@/assets/project-api.jpg";
import projectWeather from "@/assets/project-weather.jpg";
import projectChat from "@/assets/project-chat.jpg";

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

export const projects: Project[] = [
  {
    id: "1",
    titulo: "E-Commerce Dashboard",
    descripcion: "Panel de administración con analytics en tiempo real, gestión de inventario y reportes automatizados.",
    descripcionCompleta: "Dashboard completo para e-commerce construido con React y TypeScript. Incluye visualización de datos con Recharts, gestión de productos, seguimiento de órdenes en tiempo real, y un sistema de notificaciones integrado. La interfaz utiliza un diseño moderno con tema oscuro y componentes reutilizables.",
    tags: ["React", "TypeScript", "Tailwind", "Recharts"],
    imagenUrl: projectDashboard,
    repoLink: "https://github.com/tuusuario/ecommerce-dashboard",
    demoLink: "https://demo-ecommerce.vercel.app",
    destacado: true,
  },
  {
    id: "2",
    titulo: "Task Manager API",
    descripcion: "API RESTful con autenticación JWT, CRUD completo y documentación con Swagger.",
    descripcionCompleta: "Backend robusto desarrollado con Node.js y Express. Implementa autenticación segura con JWT, validación de datos con Zod, y base de datos PostgreSQL con Prisma ORM. Incluye tests unitarios con Jest y documentación interactiva con Swagger UI.",
    tags: ["Node.js", "Express", "PostgreSQL", "Backend"],
    imagenUrl: projectApi,
    repoLink: "https://github.com/tuusuario/task-manager-api",
    demoLink: "https://api-tasks.herokuapp.com/docs",
    destacado: true,
  },
  {
    id: "3",
    titulo: "Weather App PWA",
    descripcion: "Aplicación del clima progresiva con geolocalización y modo offline.",
    descripcionCompleta: "Progressive Web App que muestra el pronóstico del tiempo usando la API de OpenWeather. Soporta geolocalización, notificaciones push, y funciona sin conexión gracias a Service Workers. Diseño responsive con animaciones fluidas.",
    tags: ["React", "PWA", "API", "Tailwind"],
    imagenUrl: projectWeather,
    repoLink: "https://github.com/tuusuario/weather-pwa",
    demoLink: "https://weather-pwa-demo.netlify.app",
    destacado: false,
  },
  {
    id: "4",
    titulo: "Real-time Chat",
    descripcion: "Chat en tiempo real con WebSockets, salas privadas y sistema de mensajes.",
    descripcionCompleta: "Aplicación de chat construida con Socket.io para comunicación en tiempo real. Permite crear salas públicas y privadas, compartir archivos, y tiene indicadores de escritura y lectura. Frontend en React con estado manejado por Zustand.",
    tags: ["React", "Socket.io", "Node.js", "Backend"],
    imagenUrl: projectChat,
    repoLink: "https://github.com/tuusuario/realtime-chat",
    demoLink: "https://chat-realtime.vercel.app",
    destacado: false,
  },
];

export const allTags = ["Todo", ...new Set(projects.flatMap((p) => p.tags))];