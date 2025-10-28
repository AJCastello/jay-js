import { toKebabCase } from "../../../utils/case.js";
import { packageFile } from "../services/setupConfig.js";
import { gitIgnoreFile, logoSVGFile, npmrFile } from "../templates/configFiles.js";
import { indexFile } from "../templates/indexFile.js";
import { viteConfigFile } from "../templates/viteConfigFile.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory, createFile } from "../utils/filesystem.js";

export async function setupProjectStructure(options: IJayJSCLIInitOptions): Promise<void> {
	const projectRoot = `./${toKebabCase(options.projectName)}`;
	packageFile.name = options.projectName;

	await createDirectory(`${projectRoot}/public`);
	await createFile(`${projectRoot}/public/jayjs.svg`, logoSVGFile());
	await createFile(`${projectRoot}/index.html`, indexFile(options.projectName, options.javascriptVariant));
	await createFile(`${projectRoot}/.gitignore`, gitIgnoreFile());
	await createFile(`${projectRoot}/.npmrc`, npmrFile());

	if (options.buildTool === "vite") {
		await createFile(`${projectRoot}/vite.config.js`, viteConfigFile(options));
	}
}
