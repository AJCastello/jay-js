import { toKebabCase } from "../../../utils/case.js";
import { downloadTemplateFiles } from "../services/download-template-files.js";
import type { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory } from "../utils/filesystem.js";

export async function setupCloneTemplate(options: IJayJSCLIInitOptions) {
	const projectRoot = `./${toKebabCase(options.projectName)}`;
	const { projectName, javascriptVariant, type, useJSX, language } = options;
	const templateId = `${type}-${javascriptVariant}${useJSX ? "x" : ""}${language === "multi" ? "-multi" : ""}`;
	await createDirectory(projectRoot);
	await downloadTemplateFiles(templateId, projectName);
}
