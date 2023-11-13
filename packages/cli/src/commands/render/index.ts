// Node.js built-in modules
import path from "node:path";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// External libraries
import fs from "fs-extra";
import { JSDOM } from "jsdom";

// register loader
import "./register-loader.js";

// Local type definitions
import { Route } from "../../types/index.js";
import { jayJsOptions } from "../../options/jayJsDefineOptions.js";
import { findScriptAndSrc } from "./utils/findScriptAndSrc.js";

// output
import { Face } from '../../utils/terminal.js';
const face = new Face();

export async function renderHTMLFiles(): Promise<void> {
  // Local configurations
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const indexRef: string = fs.readFileSync(join(process.cwd(), "index.html"), "utf8");
  const scriptAndSrc = findScriptAndSrc(indexRef);

  if (!scriptAndSrc) {
    throw new Error("Could not find script tag in index.html");
  }

  const { script, src } = scriptAndSrc;
  const index: string = indexRef.replace(script, "");
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

  const relativePath = path.relative(__dirname, process.cwd());
  const mainPath = path.join(relativePath, jayJsOptions.build?.outDir as string, "main.js");
  const validPath = mainPath.replace(/\\/g, "/");
  const main = await import(validPath);
  const { resolvedRoutes }: { resolvedRoutes: Map<string, Route> } = main.default
  const layoutsMap = new Map<string, Route>();
  const dynamicRoutes = new Map<string, Route>();

  for (const [key, value] of resolvedRoutes.entries()) {
    if (value.layout) {
      layoutsMap.set(key, value);
      resolvedRoutes.delete(key);
    }
    if (value.path?.includes(":")) {
      dynamicRoutes.set(key, value);
      resolvedRoutes.delete(key);
    }
  }

  const stylesPath = path.join(
    process.cwd(),
    jayJsOptions.build?.outDir as string,
    jayJsOptions.build?.transformedDir as string,
    "styles"
  )

  const styleFiles = fs.readdirSync(stylesPath);
  const styleFilesCollection: string[] = [];

  styleFiles.forEach(file => {
    styleFilesCollection.push(`/styles/${file}`);
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

      const indexOutlet = indexDocument.querySelector("#app") as HTMLElement;

      if (value.parentLayoutId) {
        const layout = layoutsMap.get(value.parentLayoutId) as Route;
        const layoutElement = await layout.element();
        const outlet = layoutElement.querySelector("[data-router='outlet']");
        const element = await value.element();
        outlet.innerHTML = element.outerHTML;
        indexOutlet.innerHTML = layoutElement.outerHTML;

        const outputPath = path.join(
          process.cwd(),
          jayJsOptions.build?.outDir as string,
          jayJsOptions.build?.transformedDir as string,
          value.path,
          "index.html"
        )

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

      const contentPath = path.join(process.cwd(), jayJsOptions.build?.outDir as string, jayJsOptions.build?.contentDir as string, useContent.dir);
      const contentFiles = fs.readdirSync(contentPath);
      const contentFilesCollection: Array<string> = [];

      contentFiles.forEach(file => {
        if (!file.endsWith(".js.map")) {
          const filePath = file.replace(".js", "");
          contentFilesCollection.push(filePath);
        }
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

        const indexOutlet = indexDocument.querySelector("#app") as HTMLElement;

        if (value.parentLayoutId) {
          const layout = layoutsMap.get(value.parentLayoutId) as Route;
          const layoutElement = await layout.element();
          const outlet = layoutElement.querySelector("[data-router='outlet']");
          const element = await value.element(file);

          outlet.innerHTML = element.outerHTML;
          indexOutlet.innerHTML = layoutElement.outerHTML;

          const filePath = value.path.replace(`:${useContent.param}`, file);
          const outputPath = path.join(process.cwd(), jayJsOptions.build?.outDir as string, jayJsOptions.build?.transformedDir as string, filePath, "index.html")
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

async function manageDirectories() {
  try {
    await fs.remove(
      path.join(
        process.cwd(),
        jayJsOptions.build?.srcDir as string,
        jayJsOptions.build?.contentTransformedDir as string
      )
    );
    await fs.move(
      path.join(
        process.cwd(),
        jayJsOptions.build?.outDir as string,
        jayJsOptions.build?.contentTransformedDir as string
      ),
      path.join(
        process.cwd(),
        jayJsOptions.build?.outDir as string,
        jayJsOptions.build?.contentDir as string
      ),
      {
        overwrite: true,
      }
    );
  } catch (error) {
    console.error("Failed to manage directories:", error);
  }
}

async function finalizeOutDirectory() {
  try {
    await fs.move(
      path.join(
        process.cwd(),
        jayJsOptions.build?.outDir as string
      ),
      path.join(
        process.cwd(),
        "dist_temp"
      ),
      {
        overwrite: true,
      }
    );
    await fs.move(
      path.join(
        process.cwd(),
        "dist_temp",
        jayJsOptions.build?.transformedDir as string
      ),
      path.join(
        process.cwd(),
        jayJsOptions.build?.outDir as string
      ),
      {
        overwrite: true,
      }
    );
    await fs.remove(
      path.join(
        process.cwd(),
        "dist_temp"
      )
    );
  } catch (error) {
    console.error("Failed to finalize out directory:", error);
  }
}

export async function render() {
  try {
    await manageDirectories();
    await renderHTMLFiles();
    await finalizeOutDirectory();
    console.log("Static files rendered successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to render static files:", error);
    process.exit(1);
  }
}