// Node.js built-in modules

import fs from "node:fs/promises";
import path, { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
// External libraries
import fsEx from "fs-extra";
import { JSDOM } from "jsdom";

// register loader
import "./register-loader.js";

import { jayJsOptions } from "../../../../options/jayJsDefineOptions.js";
// Local type definitions
import type { Route } from "../../../../types/index.js";
import { Face, log } from "../../../../utils/terminal.js";
import { findScriptAndSrc } from "../../utils/findScriptAndSrc.js";
import { finalizeOutDirectory } from "./finalizeOutDirectory.js";
// output
import { manageDirectories } from "./manageDirectories.js";

const face = new Face();

export async function renderHTMLFiles(): Promise<void> {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const CWD = process.cwd();
	const { outDir, contentDir, transformedDir } = jayJsOptions.build;

	const indexRef: string = await fs.readFile(join(CWD, "index.html"), "utf8");
	const scriptAndSrc = findScriptAndSrc(indexRef);

	if (!scriptAndSrc) {
		throw new Error("Could not find script tag in index.html");
	}

	const { script, src } = scriptAndSrc;
	const index: string = indexRef.replace(script, "");
	const indexDom = new JSDOM(index, {
		url: "http://localhost/",
		runScripts: "dangerously",
	});

	Object.getOwnPropertyNames(indexDom.window).forEach((property: string) => {
		if (typeof (global as any)[property] === "undefined") {
			const descriptor = Object.getOwnPropertyDescriptor(indexDom.window, property);
			if (descriptor) {
				Object.defineProperty(global, property, descriptor);
			}
		}
	});

	const relativePath = path.relative(__dirname, CWD);
	const mainPath = path.join(relativePath, outDir as string, "main.js");
	const validPath = mainPath.replace(/\\/g, "/");
	const main = await import(validPath);
	const { resolvedRoutes }: { resolvedRoutes: Map<string, Route> } = main.default;
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

	const stylesPath = path.join(CWD, outDir as string, transformedDir, "styles");

	const styleFiles = await fs.readdir(stylesPath);
	const styleFilesCollection: string[] = [];

	styleFiles.forEach((file) => {
		styleFilesCollection.push(`/styles/${file}`);
	});

	if (resolvedRoutes.size > 0) {
		for (const [_key, value] of resolvedRoutes.entries()) {
			indexDom.window.document.documentElement.innerHTML = index;
			const indexDocument = indexDom.window.document;
			const head = indexDocument.querySelector("head") as HTMLHeadElement;
			styleFilesCollection.forEach((file) => {
				const link = indexDocument.createElement("link");
				link.rel = "stylesheet";
				link.href = file.replace(`./${outDir as string}`, "");
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
				const outputPath = path.join(CWD, outDir as string, transformedDir, value.path, "index.html");
				const outputDir = dirname(outputPath);
				if (!fsEx.existsSync(outputDir)) {
					await fs.mkdir(outputDir, { recursive: true });
				}
				face.setMessage(`Rendering static file: ${outputPath}`);
				await fs.writeFile(outputPath, `<!DOCTYPE html>${indexDocument.documentElement.outerHTML}`);
			}
		}
	}

	if (dynamicRoutes.size > 0) {
		for (const [_key, value] of dynamicRoutes.entries()) {
			const useContent = value.element.content;
			useContent.fileExt = "js";
			const contentPath = path.join(CWD, outDir as string, contentDir, useContent.dir);
			const contentFiles = await fs.readdir(contentPath);
			const contentFilesCollection: Array<string> = [];
			contentFiles.forEach((file) => {
				if (!file.endsWith(".js.map")) {
					const filePath = file.replace(".js", "");
					contentFilesCollection.push(filePath);
				}
			});
			for (const file of contentFilesCollection) {
				indexDom.window.document.documentElement.innerHTML = index;
				const indexDocument = indexDom.window.document;
				const head = indexDocument.querySelector("head") as HTMLHeadElement;
				styleFilesCollection.forEach((file) => {
					const link = indexDocument.createElement("link");
					link.rel = "stylesheet";
					link.href = file.replace(`./${outDir}`, "");
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
					const outputPath = path.join(CWD, outDir, transformedDir, filePath, "index.html");
					const outputDir = dirname(outputPath);
					if (!fsEx.existsSync(outputDir)) {
						await fs.mkdir(outputDir, { recursive: true });
					}
					face.setMessage(`Rendering static file: ${outputPath}`);
					await fs.writeFile(outputPath, `<!DOCTYPE html>${indexDocument.documentElement.outerHTML}`);
				}
			}
		}
	}
}

export async function staticCompiler() {
	try {
		log`{gray.italic Building static content...}`;
		face.startProgress("Rendering static files...");
		await manageDirectories();
		await renderHTMLFiles();
		await finalizeOutDirectory();
		face.endProgress();
		log`{green ✔}  Static files rendered successfully!`;
		process.exit(0);
	} catch (error) {
		log`{red Error rendering static files: ${error}}`;
		process.exit(1);
	}
}
