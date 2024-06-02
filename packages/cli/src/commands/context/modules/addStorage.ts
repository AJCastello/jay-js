// node 
import fs from "fs-extra";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";

export function addStorage({ contextName, storage }: { contextName: string; storage: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);

  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const contextFile = path.join(projectPath, `${contextName}.context.ts`);

  const interfaceContent = fs.readFileSync(interfacesFile, "utf8");
  const contextContent = fs.readFileSync(contextFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    "/** jayjs:storage */",
    `${storage}: null;\n  /** jayjs:storage */`
  );

  const contextContentUpdated = contextContent.replace(
    "/** jayjs:storage */",
    `${storage}: null\n      /** jayjs:storage */`
  );

  fs.writeFileSync(interfacesFile, interfacesContentUpdated);
  fs.writeFileSync(contextFile, contextContentUpdated);

  return;
}