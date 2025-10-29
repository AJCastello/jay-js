import { face, log } from "../../../utils/terminal.js";
import { finalizeInitialization } from "../modules/finalize-initialization.js";
import { installDependencies } from "../modules/install-dependencies.js";
import { setupBuildTools } from "../modules/setup-build-tools.js";
import { setupCloneTemplate } from "../modules/setup-clone-template.js";
import { setupJSXConfig } from "../modules/setup-jsx-config.js";
import { setupProjectStructure } from "../modules/setup-project-structure.js";
import { setupProjectType } from "../modules/setup-project-type.js";
import { setupStylesAndElements } from "../modules/setup-styles-and-elements.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";

export async function init(options: IJayJSCLIInitOptions) {
	face.startProgress(`Starting "${options.projectName}" project setup...`);
	await setupCloneTemplate(options);
	await setupProjectStructure(options);
	await setupBuildTools(options);
	await setupStylesAndElements(options);
	await setupProjectType(options);
	setupJSXConfig(options);
	await finalizeInitialization(options);
	face.endProgress();
	log`{gray {green ✔}  Project "{green ${options.projectName}}" has been successfully set up!}`;
	installDependencies(options);
}
