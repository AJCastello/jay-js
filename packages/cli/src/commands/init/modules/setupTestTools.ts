import { IJayJSCLIInitOptions } from "../types";
import { packageFile, packageVersion } from "../services/setupConfig";
import { toKebabCase } from "../../../utils/case";

export async function setupTestTools(options: IJayJSCLIInitOptions) {
  const projectRoot = `./${toKebabCase(options.projectName)}`;
  if (options.useTests) {
    packageFile.scripts.test = "vitest";
    packageFile.devDependencies.vitest = packageVersion.vitest;
  }
}

