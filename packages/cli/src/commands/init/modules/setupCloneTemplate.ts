import { downloadTemplateFiles } from "../services/downloadTemplateFiles.js";
import { IJayJSCLIInitOptions } from "../types/index.js";
import { createDirectory } from "../utils/filesystem.js";

export async function setupCloneTemplate(options: IJayJSCLIInitOptions) {
  const projectRoot = `./${options.projectName}`;
  const { projectName, javascriptVariant, projectType, useJSX, languageType } = options;
  const templateId = `${projectType}-${javascriptVariant}${useJSX ? "x" : ""}${languageType === "multi" ? "-multi" : ""}`;
  await createDirectory(projectRoot);
  await downloadTemplateFiles(templateId, projectName);
}
