import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg glass hover:glass-strong transition-all group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={20} className="text-primary" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={20} className="text-primary" />
      </motion.div>
      
      {/* Spacer to maintain button size */}
      <div className="opacity-0">
        <Sun size={20} />
      </div>
    </motion.button>
  );
};
