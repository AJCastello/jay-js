import { toKebabCase } from "../../../utils/case";
import { packageFile, packageVersion } from "../services/setupConfig";
import type { IJayJSCLIInitOptions } from "../types";

export async function setupTestTools(options: IJayJSCLIInitOptions) {
	const projectRoot = `./${toKebabCase(options.projectName)}`;
	if (options.useTests) {
		packageFile.scripts.test = "vitest";
		packageFile.devDependencies.vitest = packageVersion.vitest;
	}
}
