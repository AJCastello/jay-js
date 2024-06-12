import { descriptionTemplate } from "../templates/description";
import { getFileContent, writeFile } from "../utils";

export async function addActionMethod(
  contextName: string,
  action: string,
  description?: string
) {
  const [actionsFile, actionContent] = await getFileContent(contextName, "actions");
  const descriptionComment = descriptionTemplate(description || action);
  const actionContentUpdated = actionContent.replace(
    "/** jayjs:actions */",
    `/** jayjs:actions */\n\n  ${descriptionComment}\n  ${action}() {}`
  );
  await writeFile(actionsFile, actionContentUpdated);
}