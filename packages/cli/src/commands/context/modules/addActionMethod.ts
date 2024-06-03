// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addActionMethod({ contextName, action }: { contextName: string; action: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);
  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const actionsFile = path.join(projectPath, `${contextName}.actions.ts`);
  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const actionContent = await fs.readFile(actionsFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(contextName)}ContextActions {`,
    `I${toPascalCase(contextName)}ContextActions {\n  ${action}: () => void;`
  );
  const actionContentUpdated = actionContent.replace(
    "/** jayjs:actions */",
    `/** jayjs:actions */\n\n  ${action}() {}`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(actionsFile, actionContentUpdated);
  console.log(`✔ "${action}" action method added to context "${contextName}"!`);
}