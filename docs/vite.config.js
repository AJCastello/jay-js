import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite";
import { jayJsViteStatic } from "@jay-js/static/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    jayJsViteStatic({
      contentPath: path.resolve(__dirname, "./src/content")
    })
  ],
  build: {
    minify: "terser",
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
});