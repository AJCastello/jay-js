import { defineConfig } from "vite";
import { jayJsViteStatic } from "@jay-js/static/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    jayJsViteStatic({
      contentPath: path.resolve(__dirname, "./src/content")
    })
  ],
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.spec.ts"],
  },
});