export function generateIndexHtmlContent(projectName: string, ext: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/jayjs.svg" />
    <title>Jay JS (${projectName})</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.${ext}"></script>
</body>
</html>`;
}

export function generateStyleFileContent(): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
}

export function generatePostCSSFileContent(): string {
  return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`;
}

export function generateTailwindConfigFileContent(ui: boolean, plugin?: string): string {
  return `/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx,md,mdx}",
    ${ui ? '"./node_modules/@jay-js/ui/**/*.styled"' : ""}
  ],
  theme: {
    extend: {}
  },
  plugins: [${plugin === "daisyui" ? 'require("daisyui")' : ""}]
}`;
}

export function generateViteConfigFileContent(): string {
  return `import { defineConfig } from "vite";
import { jayJsViteStatic } from "@jay-js/static/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    jayJsViteStatic({
      contentPath: path.resolve(__dirname, "./src/content")
    })
  ]
});`;
}
