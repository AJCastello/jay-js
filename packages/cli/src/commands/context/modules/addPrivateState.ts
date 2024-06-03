// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addPrivateState({ contextName, contextState }: { contextName: string; contextState: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);

  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const statesFile = path.join(projectPath, `${contextName}.states.ts`);
  const contextFile = path.join(projectPath, `${contextName}.context.ts`);

  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const statesContent = await fs.readFile(statesFile, "utf8");
  const contextContent = await fs.readFile(contextFile, "utf8");

  const interfacesContentUpdated = `export interface I${toPascalCase(contextState)} {};\n${interfaceContent.replace(
    `I${toPascalCase(contextName)}ContextPrivateStates {`,
    `I${toPascalCase(contextName)}ContextPrivateStates {\n  ${contextState}: StateType<I${toPascalCase(contextState)}>;`
  )}`

  const statesContentUpdated = statesContent.replace(
    `implements I${toPascalCase(contextName)}ContextStates {`,
    `implements I${toPascalCase(contextName)}ContextStates {\n  private ${contextState}: StateType<I${toPascalCase(contextState)}>;`
  ).replace(
    `I${toPascalCase(contextName)}ContextPrivateStates) {`,
    `I${toPascalCase(contextName)}ContextPrivateStates) {\n    this.${contextState} = contextStates.${contextState};`
  ).replace(
    "clear() {",
    `clear() {\n    this.${contextState}.clear({});`
  ).replace(
    `} from "./${contextName}.interfaces";`,
    `  I${toPascalCase(contextState)},\n} from "./${contextName}.interfaces";`
  );

  const contextContentUpdated = contextContent.replace(
    "this.contextStates = {",
    `this.contextStates = {\n      ${contextState}: State<I${toPascalCase(contextState)}>({}),`
  ).replace(
    `} from "./${contextName}.interfaces";`,
    `  I${toPascalCase(contextState)},\n} from "./${contextName}.interfaces";`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(statesFile, statesContentUpdated);
  await fs.writeFile(contextFile, contextContentUpdated);

  console.log(`✔ "${contextState}" private state added to context "${contextName}"!`);
}