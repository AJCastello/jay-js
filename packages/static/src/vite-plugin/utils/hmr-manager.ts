import { existsSync } from "node:fs";
import { basename, join } from "node:path";
import { jayJsViteOptions } from "../options/jay-js-vite-define-options.js";
import { hmrLogger } from "./hmr-logger.js";

export class HMRManager {
	private collectionCache = new Map<string, any>();
	private fileToCollections = new Map<string, Set<string>>();
	private server: any = null;

	setServer(server: any) {
		this.server = server;
	}

	getCollectionNameFromPath(filePath: string): string | null {
		try {
			const contentPath = jayJsViteOptions.contentPath;
			if (!filePath.startsWith(contentPath)) return null;

			const relativePath = filePath.replace(`${contentPath}/`, "");
			const parts = relativePath.split("/");
			return parts[0];
		} catch {
			return null;
		}
	}

	trackFileCollection(filePath: string, collectionName: string) {
		if (!this.fileToCollections.has(filePath)) {
			this.fileToCollections.set(filePath, new Set());
		}
		this.fileToCollections.get(filePath)?.add(collectionName);
	}

	invalidateCollection(collectionName: string) {
		if (!collectionName || !this.server) return;

		const collectionFiles = [`${collectionName}.collection.js`, `${collectionName}.collection.json`];

		let reloadedCount = 0;
		collectionFiles.forEach((filename) => {
			const collectionPath = join(jayJsViteOptions.contentPath, filename);
			if (existsSync(collectionPath)) {
				const module = this.server.moduleGraph.getModuleById(collectionPath);
				if (module) {
					this.server.reloadModule(module);
					reloadedCount++;
				}
			}
		});

		if (reloadedCount > 0) {
			hmrLogger.hmrUpdate("collection", collectionName);
		}

		// Clear cache for this collection
		this.collectionCache.delete(collectionName);
	}

	getAffectedModules(collectionName: string) {
		if (!this.server) return [];

		const modules = [];
		const collectionFiles = [`${collectionName}.collection.js`, `${collectionName}.collection.json`];

		for (const filename of collectionFiles) {
			const collectionPath = join(jayJsViteOptions.contentPath, filename);
			const module = this.server.moduleGraph.getModuleById(collectionPath);

			if (module?.importers) {
				for (const importer of module.importers) {
					modules.push(importer);
				}
			}
		}

		return modules;
	}

	handleMarkdownChange(filePath: string) {
		const collectionName = this.getCollectionNameFromPath(filePath);

		if (collectionName) {
			hmrLogger.hmrUpdate("markdown", basename(filePath), collectionName);
			this.invalidateCollection(collectionName);
			return this.getAffectedModules(collectionName);
		}

		return [];
	}

	handleCollectionChange(filePath: string) {
		const filename = basename(filePath);
		const collectionName = filename.split(".collection.")[0];

		return this.getAffectedModules(collectionName);
	}

	clearCache() {
		this.collectionCache.clear();
		this.fileToCollections.clear();
	}
}

export const hmrManager = new HMRManager();
