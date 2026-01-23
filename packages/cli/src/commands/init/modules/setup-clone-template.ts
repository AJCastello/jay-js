import { toKebabCase } from "../../../utils/case.js";
import { downloadTemplateFiles } from "../services/download-template-files.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory } from "../utils/filesystem.js";

export async function setupCloneTemplate(options: IJayJSCLIInitOptions) {
	const projectRoot = `./${toKebabCase(options.projectName)}`;
	const { projectName, javascriptVariant, type, language } = options;
	// JSX is now mandatory - all templates use JSX/TSX
	const templateId = `${type}-${javascriptVariant}x${language === "multi" ? "-multi" : ""}`;
	await createDirectory(projectRoot);
	await downloadTemplateFiles(templateId, projectName);
}
