// node

import fs from "node:fs/promises";
import path from "node:path";

// modules
import { transformMarkdownFile } from "./transform-markdown-file";

async function removeMarkdownFile(filePath: string) {
	await fs.unlink(filePath);
}

export async function searchAndTransformMarkdownFiles(dir: string) {
	const files = await fs.readdir(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stats = await fs.stat(filePath);
		if (stats.isDirectory()) {
			await searchAndTransformMarkdownFiles(filePath);
		} else if (/\.(md|mdx)$/.test(filePath)) {
			await transformMarkdownFile(filePath);
			await removeMarkdownFile(filePath);
		}
	}
}
