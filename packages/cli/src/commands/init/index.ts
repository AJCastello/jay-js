// modules
import { IJayJSCLIInitOptions } from "./types/index.js";
import { setupProjectStructure } from "./modules/setupProjectStructure.js";
import { setupBuildTools } from "./modules/setupBuildTools.js";
import { setupJSXConfig } from "./modules/setupJSXConfig.js";
import { setupProjectType } from "./modules/setupProjectType.js";
import { setupCloneTemplate } from "./modules/setupCloneTemplate.js";
import { setupUIPackage } from "./modules/setupUIPackage.js";
import { finalizeInitialization } from "./modules/finalizeInitialization.js";
import { face } from "../../utils/terminal.js";
import chalk from "chalk";
import { installDependencies } from "./modules/installDependencies.js";

export async function init(options: IJayJSCLIInitOptions) {
  face.startProgress(`Starting "${options.projectName}" project setup...`);
  await setupCloneTemplate(options);
  await setupProjectStructure(options);
  await setupBuildTools(options);
  await setupUIPackage(options);
  await setupProjectType(options);
  setupJSXConfig(options);
  await finalizeInitialization(options);
  face.endProgress();
  console.log(chalk.green(`✔ Project "${options.projectName}" has been successfully set up!`));
  installDependencies(options);
}