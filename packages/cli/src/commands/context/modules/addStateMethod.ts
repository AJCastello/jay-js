// node 
import fs from "fs-extra";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";

export function addStateMethod({ contextName, state }: { contextName: string; state: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);

  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const statesFile = path.join(projectPath, `${contextName}.states.ts`);

  const interfaceContent = fs.readFileSync(interfacesFile, "utf8");
  const stateContent = fs.readFileSync(statesFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    "/** jayjs:states */",
    `${state}: () => void;\n  /** jayjs:states */`
  );

  const stateContentUpdated = stateContent.replace(
    "/** jayjs:states */",
    `${state}() {\n    // apply the logic here\n  }\n\n  /** jayjs:states */`
  );

  fs.writeFileSync(interfacesFile, interfacesContentUpdated);
  fs.writeFileSync(statesFile, stateContentUpdated);

  return;
}