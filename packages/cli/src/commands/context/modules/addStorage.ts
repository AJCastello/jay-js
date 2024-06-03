// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addStorage({ contextName, storage }: { contextName: string; storage: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);
  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const contextFile = path.join(projectPath, `${contextName}.context.ts`);
  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const contextContent = await fs.readFile(contextFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(contextName)}ContextPrivateStorage {`,
    `I${toPascalCase(contextName)}ContextPrivateStorage {\n  ${storage}: null;`
  );

  const contextContentUpdated = contextContent.replace(
    "this.storage = {",
    `this.storage = {\n      ${storage}: null,`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(contextFile, contextContentUpdated);
  console.log(`✔ "${storage}" storage added to context "${contextName}"!`);
}