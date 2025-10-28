import { toKebabCase } from "../../../utils/case.js";
import { packageFile, packageVersion, tsConfigFile } from "../services/setupConfig.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";
import { createFile } from "../utils/filesystem.js";

export async function finalizeInitialization(options: IJayJSCLIInitOptions) {
	const projectRoot = `./${toKebabCase(options.projectName)}`;
	if (options.javascriptVariant === "ts") {
		packageFile.devDependencies.typescript = packageVersion.typescript;
		await createFile(`${projectRoot}/tsconfig.json`, JSON.stringify(tsConfigFile, null, 2));
	}

	// Definir npm como gerenciador de pacotes padrão
	if (options.installDependencies === "npm") {
		packageFile.packageManager = "npm@latest";
	} else if (options.installDependencies === "yarn") {
		packageFile.packageManager = "yarn@latest";
	} else if (options.installDependencies === "pnpm") {
		packageFile.packageManager = "pnpm@latest";
	}

	await createFile(`${projectRoot}/package.json`, JSON.stringify(packageFile, null, 2));
}
