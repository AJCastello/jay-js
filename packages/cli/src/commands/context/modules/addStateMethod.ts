// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addStateMethod({ contextName, state }: { contextName: string; state: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);
  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const statesFile = path.join(projectPath, `${contextName}.states.ts`);
  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const stateContent = await fs.readFile(statesFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(contextName)}ContextStates {`,
    `I${toPascalCase(contextName)}ContextStates {\n  ${state}: () => void;`
  );

  const stateContentUpdated = stateContent.replace(
    "/** jayjs:states */",
    `/** jayjs:states */\n\n  ${state}() {}`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(statesFile, stateContentUpdated);
  console.log(`✔ "${state}" state method added to context "${contextName}"!`);
}