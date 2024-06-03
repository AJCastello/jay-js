// node 
import fs from "fs-extra";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions.js";

// terminal
import { face } from "../../../utils/terminal.js";
import { searchAndTransformMarkdownFiles } from "../modules/searchAndTransformMarkdownFiles.js";

export async function prepareAction() {
  face.write("Cloning public and content folders...\n");
  face.startProgress();
  
  fs.copySync(
    path.join(process.cwd(), jayJsOptions.build?.srcDir as string, jayJsOptions.build?.contentDir as string),
    path.join(process.cwd(), jayJsOptions.build?.srcDir as string, jayJsOptions.build?.contentTransformedDir as string)
  );

  fs.copySync(
    path.join(process.cwd(), "public" as string),
    path.join(process.cwd(), jayJsOptions.build?.outDir as string, jayJsOptions.build?.transformedDir as string)
  );

  face.endProgress();
  face.write("\n   ✅ Folders cloned successfully!\n");
  face.write("\nTransforming markdown/content files...\n");
  face.startProgress();
  
  const pathToContentTransformed = path.join(process.cwd(), jayJsOptions.build?.srcDir as string, jayJsOptions.build?.contentTransformedDir as string);
  await searchAndTransformMarkdownFiles(pathToContentTransformed);

  face.write(`\n   ✅ Files transformed successfully!\n\n`);
}