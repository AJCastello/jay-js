import { toKebabCase } from "../../../utils/case.js";
import { packageFile, packageVersion } from "../services/setupConfig.js";
import { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory, createFile } from "../utils/filesystem.js";
import { generatePostCSSFileContent, generateStyleFileContent, generateTailwindConfigFileContent } from "../utils/generate.js";

export async function setupUIPackage(options: IJayJSCLIInitOptions) {
  const projectRoot = `./${toKebabCase(options.projectName)}`;
  await createDirectory(`${projectRoot}/src/styles`);
  if (options.uiPackage) {
    await createFile(`${projectRoot}/src/styles/globals.css`, generateStyleFileContent());
    packageFile.devDependencies.tailwindcss = packageVersion.tailwindcss;
    packageFile.devDependencies.postcss = packageVersion.postcss;
    packageFile.devDependencies.autoprefixer = packageVersion.autoprefixer;
    packageFile.dependencies["@jay-js/ui"] = packageVersion["@jay-js/ui"];
  
    if (options.cssPlugin === "daisyui") {
      packageFile.devDependencies.daisyui = packageVersion.daisyui;
    }

    await createFile(`${projectRoot}/tailwind.config.js`, generateTailwindConfigFileContent(options.uiPackage, options.cssPlugin));
    await createFile(`${projectRoot}/postcss.config.js`, generatePostCSSFileContent());
    return;
  }
  await createFile(`${projectRoot}/src/styles/globals.css`, "");
}