import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { jayJsViteOptions } from "../options/jay-js-vite-define-options.js";
import type { IBuildCollection } from "../types/index.js";
import { reduceMetadata } from "../utils/reduce-metadata.js";
import { getParsedFileContent } from "./get-parsed-file-content.js";
import { writeCollection } from "./write-collection.js";

export function buildCollection({
	contentPath: _contentPath,
	suffix = "collection",
	format = "js",
	metadata,
	dir,
}: IBuildCollection) {
	const collectionPath = join(jayJsViteOptions.contentPath, dir);
	const collectionFile = join(jayJsViteOptions.contentPath, `${dir}.${suffix}.${format}`);
	const files = readdirSync(collectionPath);

	const collection: Array<any> = [];

	files.forEach((file) => {
		const filePath = join(collectionPath, file);
		const fileContent = readFileSync(filePath, "utf-8");
		const parsedContent = getParsedFileContent(file, fileContent);
		const reducedMetadata = reduceMetadata(parsedContent, metadata);
		collection.push(reducedMetadata);
	});

	writeCollection(collection, collectionFile, format);
	return collection;
}
