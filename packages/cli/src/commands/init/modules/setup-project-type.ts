import { packageFile, packageVersion } from "../services/setup-config.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";

export async function setupProjectType(options: IJayJSCLIInitOptions) {
	if (options.type === "static") {
		packageFile.dependencies["@jay-js/static"] = packageVersion["@jay-js/static"];
	}
}
