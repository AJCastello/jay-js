// node 
import fs from "fs-extra";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";

export function addActionMethod({ contextName, action }: { contextName: string; action: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);

  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const actionsFile = path.join(projectPath, `${contextName}.actions.ts`);

  const interfaceContent = fs.readFileSync(interfacesFile, "utf8");
  const actionContent = fs.readFileSync(actionsFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    "/** jayjs:actions */",
    `${action}: () => void;\n  /** jayjs:actions */`
  );

  const actionContentUpdated = actionContent.replace(
    "/** jayjs:actions */",
    `${action}() {\n    // apply the logic here\n  }\n\n  /** jayjs:actions */`
  );

  fs.writeFileSync(interfacesFile, interfacesContentUpdated);
  fs.writeFileSync(actionsFile, actionContentUpdated);

  return;
}