import { IJayJSCLIInitOptions } from "../types/index.js";

import {
  createDirectory,
  createFile
} from "../utils/filesystem.js";

import {
  generateGitIgnoreFileContent,
  generateIndexHtmlContent,
  generateLogoSVGFileContent,
  generateNpmrFileContent,
} from "../utils/generate.js";

import {
  packageFile
} from "../services/setupConfig.js";

import { toKebabCase } from "../../../utils/case.js";

export async function setupProjectStructure(options: IJayJSCLIInitOptions): Promise<void> {
  const projectRoot = `./${toKebabCase(options.projectName)}`;
  packageFile.name = options.projectName;

  await createDirectory(`${projectRoot}/public`);
  await createFile(`${projectRoot}/public/jayjs.svg`, generateLogoSVGFileContent());
  await createFile(`${projectRoot}/index.html`, generateIndexHtmlContent(options.projectName, options.javascriptVariant));
  await createFile(`${projectRoot}/.gitignore`, generateGitIgnoreFileContent());
  await createFile(`${projectRoot}/.npmrc`, generateNpmrFileContent());
}
