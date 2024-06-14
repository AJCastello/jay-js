import { descriptionTemplate } from "../templates/description";
import { getFileContent, writeFile } from "../utils";

export async function addStateMethod(
  contextName: string,
  state: string,
  description?: string
) {
  const [statesFile, stateContent] = await getFileContent(contextName, "states");
  const descriptionComment = descriptionTemplate(description || state);
  const stateContentUpdated = stateContent.replace(
    "/** jayjs:states */",
    `/** jayjs:states */\n\n  ${descriptionComment}\n  ${state}() {}`
  );
  await writeFile(statesFile, stateContentUpdated);
}