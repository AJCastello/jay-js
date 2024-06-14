import { toKebabCase } from "../../../utils/case.js";
import { packageFile, packageVersion, tsConfigFile } from "../services/setupConfig.js";
import { IJayJSCLIInitOptions } from "../types/index.js";
import { createFile } from "../utils/filesystem.js";

export async function finalizeInitialization(options: IJayJSCLIInitOptions) {
  const projectRoot = `./${toKebabCase(options.projectName)}`;
  if (options.javascriptVariant === "ts") {
    packageFile.devDependencies.typescript = packageVersion.typescript;
    await createFile(`${projectRoot}/tsconfig.json`, JSON.stringify(tsConfigFile, null, 2));
  }

  if(options.installDependencies !== "none"){
    // Expected a semver version: enforceExactVersion
    // packageFile.packageManager = options.installDependencies;
  }

  await createFile(`${projectRoot}/package.json`, JSON.stringify(packageFile, null, 2));
}