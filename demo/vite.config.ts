import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/mini-render/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ["mini-render"],
  },
  resolve: {
    preserveSymlinks: true,
  },
});