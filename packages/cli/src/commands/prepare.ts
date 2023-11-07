// parsers
import matter from "gray-matter";
import { marked } from "marked";
import fs from 'fs';
import path from 'path';
import { jayJsOptions } from "../options/jayJsDefineOptions";
import { execSync } from "child_process";

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

function transformMarkdownFile(filePath: string) {
  const markdownContent = fs.readFileSync(filePath, 'utf8');
  const transformedContent = parseMarkdown(markdownContent);
  const transformedJsContent = `export default ${JSON.stringify(transformedContent, null, 2)};`;
  const newFilePath = filePath.replace(/\.mdx?$/, '.js');
  fs.writeFileSync(newFilePath, transformedJsContent);
  console.log(`File transformed: ${filePath} -> ${newFilePath}`);
}

function removeMarkdownFile(filePath: string) {
  fs.unlinkSync(filePath);
  console.log(`File removed: ${filePath}`);
}

function searchAndTransformMarkdownFiles(dir: string) {
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

const buildCommand = `cpy ${jayJsOptions.build?.srcDir}/content/**/* ${jayJsOptions.build?.srcDir}/content_transformed/`;
execSync(buildCommand, { stdio: "inherit" });

const pathToContentTransformed = path.join(process.cwd(), jayJsOptions.build?.srcDir as string, "content_transformed")
searchAndTransformMarkdownFiles(pathToContentTransformed);
