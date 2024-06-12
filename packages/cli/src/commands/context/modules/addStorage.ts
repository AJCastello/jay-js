import { getFileContent, writeFile } from "../utils";

export async function addStorage(
  contextName: string,
  storage: string
) {
  const [contextFile, contextContent] = await getFileContent(contextName, "context");
  const contextContentUpdated = contextContent.replace(
    "this.storage = {",
    `this.storage = {\n      ${storage}: null,`
  );
  await writeFile(contextFile, contextContentUpdated);
}