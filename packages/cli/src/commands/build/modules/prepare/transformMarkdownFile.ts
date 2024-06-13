// node 
import fs from "fs/promises";
import path from "node:path";

// terminal
import { face, faceChalk } from "../../../../utils/terminal";

// modules
import { parseMarkdown } from "./parseMarkdown";

export async function transformMarkdownFile(filePath: string) {
  const markdownContent = await fs.readFile(filePath, "utf8");
  const transformedContent = await parseMarkdown(markdownContent);
  const transformedJsContent = `export default ${JSON.stringify(transformedContent, null, 2)};`;
  const newFilePath = filePath.replace(/\.mdx?$/, ".js");
  await fs.writeFile(newFilePath, transformedJsContent);
  face.setMessage(`{gray Transforming:} ${path.basename(filePath)}`);  
}