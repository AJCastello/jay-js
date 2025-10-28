// node.js modules
import { writeFileSync } from "node:fs";

export function writeCollection(collection: Array<any>, collectionFile: string, format: string) {
	if (format === "json") {
		const collectionFileContent = JSON.stringify(collection, null, 2);
		writeFileSync(collectionFile, collectionFileContent);
		return;
	}
	const collectionFileContent = `export default ${JSON.stringify(collection, null, 2)};`;
	writeFileSync(collectionFile, collectionFileContent);
}
