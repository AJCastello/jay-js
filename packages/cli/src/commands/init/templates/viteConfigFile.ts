import type { IJayJSCLIInitOptions } from "../types";

function configVitest() {
	return `test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.spec.ts"],
  },`;
}

function staticImports() {
	return `import { jayJsViteStatic } from "@jay-js/static/vite-plugin";
import path from "path";\n`;
}

function staticPlugin() {
	return `plugins: [
    jayJsViteStatic({
      contentPath: path.resolve(__dirname, "./src/content")
    })
  ],`;
}

export function viteConfigFile(options: IJayJSCLIInitOptions): string {
	return `import { defineConfig } from "vite";
${options.type === "static" ? staticImports() : ""}
export default defineConfig({
  ${options.type === "static" ? staticPlugin() : ""}
  ${options.useTests ? configVitest() : ""}
});`;
}
