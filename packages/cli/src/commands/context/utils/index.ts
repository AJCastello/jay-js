
// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";

export function filterFormat(...args: Array<string | boolean>) {
  return args.filter(Boolean)
}

export async function getFileContent(contextName: string, resource: string) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);
  const filePath = path.join(projectPath, `${contextName}.${resource}.ts`);
  const fileContent = await fs.readFile(filePath, "utf8");
  return [
    filePath,
    fileContent
  ];
}

export async function writeFile(filePath: string, content: string) {
  await fs.writeFile(filePath, content);
}