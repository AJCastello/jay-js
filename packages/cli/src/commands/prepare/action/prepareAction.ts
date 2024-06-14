// node 
import fs from "fs-extra";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions.js";

// terminal
import { log } from "../../../utils/terminal.js";
import { searchAndTransformMarkdownFiles } from "../modules/searchAndTransformMarkdownFiles.js";

export async function prepareAction() {
  const cwd = process.cwd();
  log`Cloning public and content folders...`;
  const {
    srcDir,
    contentDir,
    contentTransformedDir,
    outDir,
    transformedDir
  } = jayJsOptions.build;
  fs.copySync(
    path.join(cwd, srcDir, contentDir),
    path.join(cwd, srcDir, contentTransformedDir)
  );
  fs.copySync(
    path.join(cwd, "public"),
    path.join(cwd, outDir, transformedDir)
  );
  log`{green ✔}  Folders cloned successfully!\n`;
  log`Transforming {italic markdown/content} files...`;
  const pathToContentTransformed = path.join(cwd, srcDir, contentTransformedDir);
  await searchAndTransformMarkdownFiles(pathToContentTransformed);
  log`{green ✔}  Files transformed successfully!\n`;
  process.exit(0);
}