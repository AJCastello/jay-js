import { toKebabCase } from "../../../utils/case.js";
import { packageFile, packageVersion } from "../services/setupConfig.js";
import { cssFile } from "../templates/cssFile.js";
import { postCSSFile } from "../templates/postCssFile.js";
import { tailwindConfigFile } from "../templates/tailwindConfigFile.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory, createFile } from "../utils/filesystem.js";

export async function setupStylesAndElements(options: IJayJSCLIInitOptions) {
	const projectRoot = `./${toKebabCase(options.projectName)}`;
	await createDirectory(`${projectRoot}/src/styles`);

	await createFile(`${projectRoot}/src/styles/globals.css`, cssFile());

	packageFile.devDependencies.tailwindcss = packageVersion.tailwindcss;
	packageFile.devDependencies.postcss = packageVersion.postcss;
	packageFile.devDependencies.autoprefixer = packageVersion.autoprefixer;

	await createFile(`${projectRoot}/tailwind.config.js`, tailwindConfigFile());
	await createFile(`${projectRoot}/postcss.config.js`, postCSSFile());
}
