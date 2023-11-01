// Node.js built-in modules
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

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
const index: string = indexRef.replace(`<script type="module" src="/${jayJsOptions.build?.srcDir}/main.ts"></script>`, "");

const indexDom = new JSDOM(index, { url: "http://localhost/" });

// const configPath = path.resolve(process.cwd(), "jayjs.config.js");
// const configURL = pathToFileURL(configPath);
// try {
//   const config = await import(configURL.href);
// } catch (error) {
//   console.error("Failed to load config file:", error);
// }

Object.getOwnPropertyNames(indexDom.window).forEach((property: string) => {
  if (typeof (global as any)[property] === "undefined") {
    const descriptor = Object.getOwnPropertyDescriptor(indexDom.window, property);
    if (descriptor) {
      Object.defineProperty(global, property, descriptor);
    }
  }
});

export async function renderHTMLFiles(): Promise<void> {
  const relativePath = path.relative(__dirname, process.cwd());
  const mainPath = path.join(relativePath, jayJsOptions.build?.distDir as string, "main.js");
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
      useContent.fileExt = "js";

      const contentPath = path.join(process.cwd(), jayJsOptions.build?.distDir as string, "content", useContent.dir);
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

function distPath(dir: string) {
  return path.join(process.cwd(), jayJsOptions.build?.distDir as string, dir);
}

function srcPath(dir: string) {
  return path.join(process.cwd(), jayJsOptions.build?.srcDir as string, dir);
}

async function manageDirectories() {
  try {
    await fs.remove(srcPath("content_transformed"));
    await fs.remove(distPath("content"));
    await fs.move(distPath("content_transformed"), distPath("content"));

  } catch (error) {
    console.error("Failed to manage directories:", error);
  }
}

async function main() {
  await manageDirectories();
  await renderHTMLFiles();
}

main().then(() => {
  console.log("Static files rendered successfully!");
  process.exit(0);
}).catch((error) => {
  console.error("Failed to render static files:", error);
  process.exit(1);
})