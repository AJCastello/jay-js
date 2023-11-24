// node
import { execSync } from "node:child_process";

// modules
import { IJayJSCLIInitOptions } from "./types/index.js";
import { setupProjectStructure } from "./modules/setupProjectStructure.js";
import { setupBuildTools } from "./modules/setupBuildTools.js";
import { setupJSXConfig } from "./modules/setupJSXConfig.js";
import { setupProjectType } from "./modules/setupProjectType.js";
import { setupProjectLanguage } from "./modules/setupProjectLanguage.js";
import { setupCloneTemplate } from "./modules/setupCloneTemplate.js";
import { setupUIPackage } from "./modules/setupUIPackage.js";
import { finalizeInitialization } from "./modules/finalizeInitialization.js";

export async function init(options: IJayJSCLIInitOptions) {
  await setupCloneTemplate(options);
  await setupProjectStructure(options);
  await setupBuildTools(options);
  await setupUIPackage(options);
  await setupProjectType(options);
  setupProjectLanguage(options);
  setupJSXConfig(options);
  await finalizeInitialization(options);
  if (options.installDependencies) {
    process.chdir(options.projectName);
    execSync(`pnpm install`, { stdio: "inherit" });
    process.chdir("..");
  }
}