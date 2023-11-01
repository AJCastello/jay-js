// parsers
import matter from "gray-matter";
import { marked } from "marked";
import fs from 'fs';
import path from 'path';
import { jayJsOptions } from "../options/jayJsDefineOptions";

export function parseMarkdown(src: string): any {
  try {
    const { data, content } = matter(src);
    const htmlContent = marked(content);
    return { ...data, content: htmlContent };
  } catch (error) {
    console.error("Failed to parse markdown", error);
    return { content: "" };
  }
}

export function transformMarkdownFile(filePath: string) {
  const markdownContent = fs.readFileSync(filePath, 'utf8');
  const transformedContent = parseMarkdown(markdownContent);
  const transformedJsContent = `export default ${JSON.stringify(transformedContent, null, 2)};`;
  const newFilePath = filePath.replace(/\.mdx?$/, '.js');
  fs.writeFileSync(newFilePath, transformedJsContent);
  console.log(`File transformed: ${filePath} -> ${newFilePath}`);
}

export function searchAndTransformMarkdownFiles(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      searchAndTransformMarkdownFiles(filePath);
    } else if (/\.(md|mdx)$/.test(filePath)) {
      transformMarkdownFile(filePath);
    }
  }
}

const pathToSrc = path.join(process.cwd(), jayJsOptions.build?.srcPath as string)
searchAndTransformMarkdownFiles(pathToSrc);
