import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        // Aggressive code splitting for better caching and parallel loading
        manualChunks: (id) => {
          // React core - loaded first, cached long term
          if (id.includes('node_modules/react-dom')) {
            return 'react-dom';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) {
            return 'react-core';
          }
          
          // Router - needed for navigation
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          
          // Framer Motion - heavy animation library
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
          
          // Radix UI primitives - UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix';
          }
          
          // Supabase - database client
          if (id.includes('node_modules/@supabase')) {
            return 'supabase';
          }
          
          // React Query - data fetching (only needed for admin)
          if (id.includes('node_modules/@tanstack')) {
            return 'query';
          }
          
          // Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          
          // Other vendor code
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
}));

