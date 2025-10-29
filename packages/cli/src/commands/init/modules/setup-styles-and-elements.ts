import { toKebabCase } from "../../../utils/case.js";
import { packageFile, packageVersion } from "../services/setup-config.js";
import { cssFile } from "../templates/css-file.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory, createFile } from "../utils/filesystem.js";

export async function setupStylesAndElements(options: IJayJSCLIInitOptions) {
	const projectRoot = `./${toKebabCase(options.projectName)}`;
	await createDirectory(`${projectRoot}/src/styles`);

	await createFile(`${projectRoot}/src/styles/globals.css`, cssFile());

	packageFile.devDependencies.tailwindcss = packageVersion.tailwindcss;
	packageFile.devDependencies["@tailwindcss/vite"] = packageVersion["@tailwindcss/vite"];
}
