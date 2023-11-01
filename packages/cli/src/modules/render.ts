// Node.js built-in modules
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

// External libraries
import { JSDOM } from "jsdom";

// Path handling
import { join, dirname } from "path";

// Local type definitions
import { Route } from "../types";
import { jayJsOptions } from "../options/jayJsDefineOptions";

// Local configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexRef: string = fs.readFileSync(join(process.cwd(), "index.html"), "utf8");
const index: string = indexRef.replace(`<script type="module" src="/${jayJsOptions.build?.srcPath}/main.ts"></script>`, "");

const indexDom = new JSDOM(index, { url: "http://localhost/" });

// const configPath = path.resolve(process.cwd(), "jayjs.config.js");
// const configURL = pathToFileURL(configPath);
// try {
//   const config = await import(configURL.href);
//   console.log("Configuração carregada:", config.default);
//   // Use "config" conforme necessário
// } catch (error) {
//   console.error("Erro ao carregar o arquivo de configuração:", error);
// }

Object.getOwnPropertyNames(indexDom.window).forEach((property: string) => {
  if (typeof (global as any)[property] === 'undefined') {
    const descriptor = Object.getOwnPropertyDescriptor(indexDom.window, property);
    if (descriptor) {
      Object.defineProperty(global, property, descriptor);
    }
  }
});

export async function renderHTMLFiles(): Promise<void> {
  const relativePath = path.relative(__dirname, process.cwd());
  const mainPath = path.join(relativePath, jayJsOptions.build?.distPath as string, "main.js");
  const validPath = mainPath.replace(/\\/g, "/");

  const { resolvedRoutes }: { resolvedRoutes: Map<string, Route> } = await import(validPath);

  const layoutsMap = new Map<string, Route>();

  for (const [key, value] of resolvedRoutes.entries()) {
    if (value.layout) {
      layoutsMap.set(key, value);
      resolvedRoutes.delete(key);
    }
  }

  const dynamicRoutes = new Map<string, Route>();

  for (const [key, value] of resolvedRoutes.entries()) {
    if (value.path?.includes(":")) {
      dynamicRoutes.set(key, value);
      resolvedRoutes.delete(key);
    }
  }

  const stylesPath = path.join(process.cwd(), jayJsOptions.build?.outDir as string, "styles")
  const styleFiles = fs.readdirSync(stylesPath);
  const styleFilesCollection: string[] = [];

  styleFiles.forEach(file => {
    const filePath = path.join(stylesPath, file);
    styleFilesCollection.push(filePath);
  });

  if (resolvedRoutes.size > 0) {
    for (const [key, value] of resolvedRoutes.entries()) {
      indexDom.window.document.documentElement.innerHTML = index;
      const indexDocument = indexDom.window.document;
      const head = indexDocument.querySelector("head") as HTMLHeadElement;

      styleFilesCollection.forEach(file => {
        const link = indexDocument.createElement("link");
        link.rel = "stylesheet";
        link.href = file.replace(`./${jayJsOptions.build?.outDir}`, "");
        head.appendChild(link);
      });

      const indexOutlet = indexDocument.querySelector("#root") as HTMLElement;

      if (value.parentLayoutId) {
        const layout = layoutsMap.get(value.parentLayoutId) as Route;
        const layoutElement = await layout.element();
        const outlet = layoutElement.querySelector("[data-router='outlet']");

        const element = await value.element();
        outlet.innerHTML = element.outerHTML;
        indexOutlet.innerHTML = layoutElement.outerHTML;

        const outputPath = path.join(process.cwd(), jayJsOptions.build?.outDir as string, value.path, "index.html")

        const outputDir = dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, indexDocument.documentElement.outerHTML);
      }
    }
  }

  if (dynamicRoutes.size > 0) {
    for (const [key, value] of dynamicRoutes.entries()) {
      const useContent = value.element.useContent;
      // {dir: "support", param: "slug"}

      const contentPath = path.join(process.cwd(), jayJsOptions.build?.distPath as string, "content", useContent.dir);
      const contentFiles = fs.readdirSync(contentPath);
      const contentFilesCollection: Array<string> = [];

      contentFiles.forEach(file => {
        const filePath = file.replace(".js", "");
        contentFilesCollection.push(filePath);
      });

      for (let file of contentFilesCollection) {
        indexDom.window.document.documentElement.innerHTML = index;
        const indexDocument = indexDom.window.document;
        const head = indexDocument.querySelector("head") as HTMLHeadElement;

        styleFilesCollection.forEach(file => {
          const link = indexDocument.createElement("link");
          link.rel = "stylesheet";
          link.href = file.replace(`./${jayJsOptions.build?.outDir}`, "");
          head.appendChild(link);
        });

        const indexOutlet = indexDocument.querySelector("#root") as HTMLElement;

        if (value.parentLayoutId) {
          const layout = layoutsMap.get(value.parentLayoutId) as Route;
          const layoutElement = await layout.element();
          const outlet = layoutElement.querySelector("[data-router='outlet']");
          const element = await value.element(file);

          outlet.innerHTML = element.outerHTML;
          indexOutlet.innerHTML = layoutElement.outerHTML;

          const filePath = value.path.replace(`:${useContent.param}`, file);
          const outputPath = path.join(process.cwd(), jayJsOptions.build?.outDir as string, filePath, "index.html")
          const outputDir = dirname(outputPath);

          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          fs.writeFileSync(outputPath, indexDocument.documentElement.outerHTML);
        }
      }
    }
  }
}

renderHTMLFiles().then(() => {
  console.log("Done processing all directories.");
  process.exit(0);
}).catch(error => {
  console.error(`Error during processing: ${error.message}`);
  process.exit(1);
});
