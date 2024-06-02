// node 
import fs from "fs-extra";
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
  fs.mkdirSync(contextPath, { recursive: true });
  
  const contextFile = contextFileTemplate(contextName);
  const statesFile = statesFileTemplate(contextName);
  const interfacesFile = interfacesFileTemplate(contextName);
  const actionsFile = actionsFileTemplate(contextName);

  fs.writeFileSync(path.join(contextPath, `${contextName}.context.ts`), contextFile);
  fs.writeFileSync(path.join(contextPath, `${contextName}.states.ts`), statesFile);
  fs.writeFileSync(path.join(contextPath, `${contextName}.interfaces.ts`), interfacesFile);
  fs.writeFileSync(path.join(contextPath, `${contextName}.actions.ts`), actionsFile);
}
