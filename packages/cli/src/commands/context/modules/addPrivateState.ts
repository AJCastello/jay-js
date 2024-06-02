// node 
import fs from "fs-extra";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { pascalCase } from "../utils";

export function addPrivateState({ contextName, contextState }: { contextName: string; contextState: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "contexts", contextName);

  const interfacesFile = path.join(projectPath, `${contextName}.interfaces.ts`);
  const statesFile = path.join(projectPath, `${contextName}.states.ts`);
  const contextFile = path.join(projectPath, `${contextName}.context.ts`);

  const interfaceContent = fs.readFileSync(interfacesFile, "utf8");
  const statesContent = fs.readFileSync(statesFile, "utf8");
  const contextContent = fs.readFileSync(contextFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    "/** jayjs:contextState */",
    `${contextState}: StateType<I${pascalCase(contextState)}>;\n  /** jayjs:contextState */`
  ).replace(
    "/** jayjs:interface */",
    `export interface I${pascalCase(contextState)} {};\n/** jayjs:interface */`
  );

  const statesContentUpdated = statesContent.replace(
    "/** jayjs:contextState */",
    `private ${contextState}: StateType<I${pascalCase(contextState)}>;\n  /** jayjs:contextState */`
  ).replace(
    "/** jayjs:constructState */",
    `this.${contextState} = contextStates.${contextState};\n    /** jayjs:constructState */`
  ).replace(
    "/** jayjs:clearStates */",
    `this.${contextState}.clear({});\n    /** jayjs:clearStates */`
  ).replace(
    "/** jayjs:interfaces */",
    `I${pascalCase(contextState)},\n  /** jayjs:interfaces */`
  );

  const contextContentUpdated = contextContent.replace(
    "/** jayjs:contextStates */",
    `${contextState}: State<I${pascalCase(contextState)}>({}),\n      /** jayjs:contextStates */`
  ).replace(
    "/** jayjs:interfaces */",
    `I${pascalCase(contextState)},\n  /** jayjs:interfaces */`
  );

  fs.writeFileSync(interfacesFile, interfacesContentUpdated);
  fs.writeFileSync(statesFile, statesContentUpdated);
  fs.writeFileSync(contextFile, contextContentUpdated);

  return;
}