// node 
//import fs from 'node:fs';
import fs from 'fs-extra';

import path from 'node:path';

// parsers
import matter from "gray-matter";
import { marked } from "marked";

// options
import { jayJsOptions } from "../../options/jayJsDefineOptions.js";

// output
import { Face } from '../../utils/terminal.js';
const face = new Face();

let proccessedFiles = 0;

function parseMarkdown(src: string): any {
  try {
    const { data, content } = matter(src);
    const htmlContent = marked(content);
    return { ...data, content: htmlContent };
  } catch (error) {
    console.error("Failed to parse markdown", error);
    return { content: "" };
  }
}

async function transformMarkdownFile(filePath: string) {
  const markdownContent = fs.readFileSync(filePath, 'utf8');
  const transformedContent = parseMarkdown(markdownContent);
  const transformedJsContent = `export default ${JSON.stringify(transformedContent, null, 2)};`;
  const newFilePath = filePath.replace(/\.mdx?$/, '.js');
  fs.writeFileSync(newFilePath, transformedJsContent);
  proccessedFiles++;
  face.setMessage(`Transforming: ${path.basename(filePath)} (${proccessedFiles})`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

function removeMarkdownFile(filePath: string) {
  fs.unlinkSync(filePath);
}

async function searchAndTransformMarkdownFiles(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      searchAndTransformMarkdownFiles(filePath);
    } else if (/\.(md|mdx)$/.test(filePath)) {
      transformMarkdownFile(filePath);
      removeMarkdownFile(filePath);
    }
  }
}

export async function prepare() {
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

  face.write(`\n   ✅ ${proccessedFiles} files transformed successfully!\n\n`);
}