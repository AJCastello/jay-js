import fs from "fs/promises";
import path from "node:path";
import inquirer, { QuestionCollection } from "inquirer";
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { statesFileTemplate } from "../templates/statesFile";
import { contextFileTemplate } from "../templates/contextFile";
import { interfacesFileTemplate } from "../templates/interfacesFile";
import { actionsFileTemplate } from "../templates/actionsFile";
import { specFileTemplate } from "../templates/specFile";
import { log } from "../../../utils/terminal";

export async function createContext(contextName: string): Promise<void> {
  // get local options
  const questions: QuestionCollection<any> = [
    {
      type: "confirm",
      name: "storage",
      message: "Do you want to use 'Storage' on this context?",
      default: false,
    }
  ];

  inquirer
    .prompt(questions)
    .then(async (options) => {
      const { storage } = options;
      const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir);
      const contextPath = path.join(projectPath, "contexts", contextName);
      await fs.mkdir(contextPath, { recursive: true });
      const actionsFile = actionsFileTemplate(contextName, storage);
      const contextFile = contextFileTemplate(contextName, storage);
      const interfacesFile = interfacesFileTemplate(contextName, storage);
      const specFile = specFileTemplate(contextName);
      const statesFile = statesFileTemplate(contextName);
      await fs.writeFile(path.join(contextPath, `${contextName}.actions.ts`), actionsFile);
      await fs.writeFile(path.join(contextPath, `${contextName}.context.ts`), contextFile);
      await fs.writeFile(path.join(contextPath, `${contextName}.interfaces.ts`), interfacesFile);
      // TODO: detect if vitest is installed
      await fs.writeFile(path.join(contextPath, `${contextName}.spec.ts`), specFile);
      await fs.writeFile(path.join(contextPath, `${contextName}.states.ts`), statesFile);
      log`{gray {green ✔}  Context "{yellow ${contextName}}" has been successfully created!}`;
    });
}
