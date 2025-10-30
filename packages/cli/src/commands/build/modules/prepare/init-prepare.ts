// node

import path from "node:path";
import fs from "fs-extra";

// options
import { jayJsOptions } from "../../../../options/jayjs-define-options.js";

// terminal
import { face, log } from "../../../../utils/terminal.js";
import { searchAndTransformMarkdownFiles } from "./search-and-transform-markdown-files.js";

export async function initPrepare() {
	const cwd = process.cwd();
	log`{gray.italic Preparing content files...}`;
	face.startProgress("Cloning {yellow public} and {yellow content} folders...");
	const { srcDir, contentDir, contentTransformedDir, outDir, transformedDir } = jayJsOptions.build;
	fs.copySync(path.join(cwd, srcDir, contentDir), path.join(cwd, srcDir, contentTransformedDir));
	fs.copySync(path.join(cwd, "public"), path.join(cwd, outDir, transformedDir));
	face.endProgress();
	log`{green ✔}  Folders cloned successfully!`;
	face.startProgress("Transforming {italic markdown/content} files...");
	const pathToContentTransformed = path.join(cwd, srcDir, contentTransformedDir);
	await searchAndTransformMarkdownFiles(pathToContentTransformed);
	face.endProgress();
	log`{green ✔}  Files transformed successfully!`;
	process.exit(0);
}
