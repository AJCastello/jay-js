import { extname } from "node:path";
import { jayJsViteDefineOptions } from "../options/jay-js-vite-define-options.js";
import { buildCollection } from "../services/build-collection.js";
import type { IJayJsViteOptions } from "../types/index.js";
import { extractUseCollectionData } from "../utils/extract-use-collection-data.js";
import { hmrLogger } from "../utils/hmr-logger.js";
import { hmrManager } from "../utils/hmr-manager.js";
import { parseMarkdown } from "../utils/parse-markdown.js";

export function jayJsViteStatic(options: IJayJsViteOptions) {
	if (options) {
		jayJsViteDefineOptions(options);
	}

	return {
		name: "jay-js-vite",
		configureServer(server: any) {
			hmrManager.setServer(server);
			hmrLogger.success("HMR enabled for Markdown files and collections");
		},
		transform(src: string, id: string) {
			if ([".md", ".mdx"].includes(extname(id))) {
				const parsedMarkdown = parseMarkdown(src);
				const newSrc = `export default ${JSON.stringify(parsedMarkdown, null, 2)};`;

				const collectionName = hmrManager.getCollectionNameFromPath(id);
				if (collectionName) {
					hmrManager.trackFileCollection(id, collectionName);
				}

				return {
					code: newSrc,
					map: null,
				};
			}
			if ([".ts", ".js", ".tsx", ".jsx"].includes(extname(id))) {
				const useCollectionData = extractUseCollectionData(src);
				if (useCollectionData) {
					buildCollection(useCollectionData);
				}
				return {
					code: src,
					map: null,
				};
			}
		},
		handleHotUpdate(ctx: any) {
			const { file } = ctx;

			if ([".md", ".mdx"].includes(extname(file))) {
				const collectionName = hmrManager.getCollectionNameFromPath(file);

				if (collectionName) {
					try {
						const useCollectionData = {
							contentPath: options?.contentPath || "",
							dir: collectionName,
							format: "js" as const,
							suffix: "collection",
						};

						buildCollection(useCollectionData);
						hmrLogger.collectionRebuilt(collectionName);

						return hmrManager.handleMarkdownChange(file);
					} catch (error) {
						hmrLogger.error("Error rebuilding collection on HMR:", error);
					}
				}

				return [];
			}

			if (file.includes(".collection.")) {
				hmrLogger.info(`Collection file changed: ${file}`);
				return hmrManager.handleCollectionChange(file);
			}
			return undefined;
		},
		buildStart() {
			hmrManager.clearCache();
		},
	};
}
