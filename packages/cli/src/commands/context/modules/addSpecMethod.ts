import { specFileTemplateFunction } from "../templates/specFile";
import { getFileContent, writeFile } from "../utils";

export async function addSpecMethod(
  contextName: string,
  method: string,
  type: "states" | "actions",
  description?: string
) {
  const [specFile, specContent] = await getFileContent(contextName, "spec");
  const methodName = `${contextName}Context.${type}.${method}()`;
  const specContentUpdated = specContent.replace(
    `${type} methods", () => {`,
    `${type} methods", () => {\n${specFileTemplateFunction(methodName, description || method)}\n`
  );
  await writeFile(specFile, specContentUpdated);
}