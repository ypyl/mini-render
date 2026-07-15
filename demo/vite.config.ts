import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/mini-render/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    preserveSymlinks: true,
  },
});