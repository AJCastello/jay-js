// modules

// terminal
import { face, log } from "../../../utils/terminal.js";
import { finalizeInitialization } from "../modules/finalizeInitialization.js";
import { installDependencies } from "../modules/installDependencies.js";
import { setupBuildTools } from "../modules/setupBuildTools.js";
import { setupCloneTemplate } from "../modules/setupCloneTemplate.js";
import { setupJSXConfig } from "../modules/setupJSXConfig.js";
import { setupProjectStructure } from "../modules/setupProjectStructure.js";
import { setupProjectType } from "../modules/setupProjectType.js";
import { setupStylesAndElements } from "../modules/setupStylesAndElements.js";
import { setupTestTools } from "../modules/setupTestTools.js";
// types
import type { IJayJSCLIInitOptions } from "../types/index.js";

export async function init(options: IJayJSCLIInitOptions) {
	face.startProgress(`Starting "${options.projectName}" project setup...`);
	await setupCloneTemplate(options);
	await setupProjectStructure(options);
	await setupBuildTools(options);
	await setupStylesAndElements(options);
	await setupProjectType(options);
	await setupTestTools(options);
	setupJSXConfig(options);
	await finalizeInitialization(options);
	face.endProgress();
	log`{gray {green ✔}  Project "{green ${options.projectName}}" has been successfully set up!}`;
	installDependencies(options);
}
