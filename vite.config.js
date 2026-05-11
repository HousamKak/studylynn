import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Site is served at the custom domain study.lynnhamad.com (root), so base = "/".
// If you ever fall back to the default GitHub Pages URL, set VITE_BASE=/neuropath-game/.
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  plugins: [react()],
  base,
});
