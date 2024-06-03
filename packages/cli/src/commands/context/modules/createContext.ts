// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions.js";

// interfaces
import { ICreateContext } from "../../../types/index.js";

// templates
import { statesFileTemplate } from "../templates/statesFile.js";
import { contextFileTemplate } from "../templates/contextFile.js";
import { interfacesFileTemplate } from "../templates/interfacesFile.js";
import { actionsFileTemplate } from "../templates/actionsFile.js";

export async function createContext({ contextName }: ICreateContext): Promise<void> {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir);
  const contextPath = path.join(projectPath, "contexts", contextName);
  await fs.mkdir(contextPath, { recursive: true });
  
  const contextFile = contextFileTemplate(contextName);
  const statesFile = statesFileTemplate(contextName);
  const interfacesFile = interfacesFileTemplate(contextName);
  const actionsFile = actionsFileTemplate(contextName);

  await fs.writeFile(path.join(contextPath, `${contextName}.context.ts`), contextFile);
  await fs.writeFile(path.join(contextPath, `${contextName}.states.ts`), statesFile);
  await fs.writeFile(path.join(contextPath, `${contextName}.interfaces.ts`), interfacesFile);
  await fs.writeFile(path.join(contextPath, `${contextName}.actions.ts`), actionsFile);

  console.log(`✔ Context "${contextName}" has been successfully created!`);
}
