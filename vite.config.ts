import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => ({
  base:
    mode === "production"
      ? "/modules/custom/hiberus_offices_map/app/"
      : "/",
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs",
          dest: "maplibre",
        },
        {
          src: "node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs",
          dest: "maplibre",
        },
      ],
    }),
  ],
  assetsInclude: ["**/*.jfif"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["maplibre-gl"],
  },
}));
