import { packageFile, packageVersion } from "../services/setupConfig.js";
import { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory, createFile } from "../utils/filesystem.js";
import { generatePostCSSFileContent, generateStyleFileContent, generateTailwindConfigFileContent } from "../utils/generate.js";

export async function setupUIPackage(options: IJayJSCLIInitOptions) {
  const projectRoot = `./${options.projectName}`;
  await createDirectory(`${projectRoot}/src/styles`);
  if (options.installUIPackage) {
    await createFile(`${projectRoot}/src/styles/globals.css`, generateStyleFileContent());
    packageFile.devDependencies.tailwindcss = packageVersion.tailwindcss;
    packageFile.devDependencies.postcss = packageVersion.postcss;
    packageFile.devDependencies.autoprefixer = packageVersion.autoprefixer;
    packageFile.dependencies["@jay-js/ui"] = packageVersion["@jay-js/ui"];
  
    if (options.cssLibrary === "daisyui") {
      packageFile.devDependencies.daisyui = packageVersion.daisyui;
    }

    await createFile(`${projectRoot}/tailwind.config.js`, generateTailwindConfigFileContent(options.installUIPackage, options.cssLibrary));
    await createFile(`${projectRoot}/postcss.config.js`, generatePostCSSFileContent());
    return;
  }
  await createFile(`${projectRoot}/src/styles/globals.css`, "");
}