// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions.js";

// interfaces
import { ICreateModule, ITemplateFiles } from "../types/index.js";
import { serviceFileTemplate } from "../templates/serviceFile.js";
import { httpFileTemplate } from "../templates/httpFile.js";
import { modelsFileTemplate } from "../templates/modelsFile.js";
import { repositoryFileTemplate } from "../templates/repositoryFile.js";
import { interfacesFileTemplate } from "../templates/interfacesFile.js";

// templates
import inquirer, { QuestionCollection } from "inquirer";
import { faceChalk, log } from "../../../utils/terminal.js";

export async function createModule({ moduleName }: ICreateModule): Promise<void> {
  const questions: QuestionCollection<any> = [
    {
      type: "checkbox",
      name: "features",
      message: "Choose the features/layers you want to add:",
      choices: [
        { name: faceChalk`{greenBright Service}`, value: "service" },
        { name: faceChalk`{blueBright HTTP}`, value: "http" },
        { name: faceChalk`{yellow Models}`, value: "models" },
        { name: faceChalk`{redBright Repository}`, value: "repository" }
      ],
      loop: false,
    }
  ];

  inquirer
    .prompt(questions)
    .then(async (options) => {
      const { features } = options;
      const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir);
      const modulePath = path.join(projectPath, "modules", moduleName);
      await fs.mkdir(modulePath, { recursive: true });
      
      const templateFiles: ITemplateFiles = {
        service: serviceFileTemplate,
        http: httpFileTemplate,
        models: modelsFileTemplate,
        repository: repositoryFileTemplate
      };

      for (const feature in features) {
        const featureName = features[feature];
        const file = templateFiles[featureName](moduleName, features);
        await fs.writeFile(path.join(modulePath, `${moduleName}.${featureName}.ts`), file);
      }

      const interfacesFile = interfacesFileTemplate(moduleName, features);
      await fs.writeFile(path.join(modulePath, `${moduleName}.interfaces.ts`), interfacesFile);
      log`{gray {green ✔}  Module "{yellow ${moduleName}}" has been successfully created!}`
    });
}
