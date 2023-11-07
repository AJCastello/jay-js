import { IJayJSCLIInitOptions } from "./types/index.js";
import { setupProjectStructure } from "./modules/setupProjectStructure.js";
// import { configureBuildTool } from "./configureBuildTool";
// import { setupCSSLibrary } from "./setupCSSLibrary";
// import { installDependencies } from "./installDependencies";
// import { finalizeInitialization } from "./finalizeInitialization";

export function init(options: IJayJSCLIInitOptions) {
  setupProjectStructure(options);
}
