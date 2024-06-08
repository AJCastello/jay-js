import { toKebabCase } from "../../../utils/case.js";
import { packageFile, packageVersion } from "../services/setupConfig.js";
import { IJayJSCLIInitOptions } from "../types/index.js";
import { createFile } from "../utils/filesystem.js";
import { generateViteConfigFileContent } from "../utils/generate.js";

export async function setupProjectType(options: IJayJSCLIInitOptions) {
  const projectRoot = `./${toKebabCase(options.projectName)}`;
  if (options.type === "static") {
    packageFile.dependencies["@jay-js/static"] = packageVersion["@jay-js/static"];
    if (options.buildTool === "vite") {
      await createFile(`${projectRoot}/vite.config.js`, generateViteConfigFileContent());
    }
  }
}