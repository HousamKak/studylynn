import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served at the custom domain study.lynnhamad.com (root) via GitHub Pages.
// If you ever fall back to the default GH Pages URL, change base to "/studylynn/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
