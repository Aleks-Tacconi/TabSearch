import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: "src/index.html", dest: "" }],
    }),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: "src/content.js",
      },
      output: {
        format: "iife",
        entryFileNames: "content.js",
      },
    },
  },
});
