import { toPascalCase } from "../../../utils/case";
import { getFileContent, writeFile } from "../utils";

export async function addPrivateState(
  contextName: string,
  contextState: string
): Promise<void> {
  await addPrivateStateOnContext(contextName, contextState);
  await addPrivateStateOnStates(contextName, contextState);
}

async function addPrivateStateOnContext(
  contextName: string,
  contextState: string
): Promise<void> {
  const [contextFile, contextContent] = await getFileContent(contextName, "context");
  const contextContentUpdated = contextContent.replace(
    "this.privateStates = {",
    `this.privateStates = {\n      ${contextState}: State<I${toPascalCase(contextState)}>({}),`
  ).replace(
    `} from "./${contextName}.interfaces";`,
    `  I${toPascalCase(contextState)},\n} from "./${contextName}.interfaces";`
  );
  await writeFile(contextFile, contextContentUpdated);
}

async function addPrivateStateOnStates(
  contextName: string,
  contextState: string
): Promise<void> {
  const [statesFile, statesContent] = await getFileContent(contextName, "states");
  const statesContentUpdated = statesContent.replace(
    `implements I${toPascalCase(contextName)}ContextStates {`,
    `implements I${toPascalCase(contextName)}ContextStates {\n  private ${contextState}: StateType<I${toPascalCase(contextState)}>;`
  ).replace(
    `I${toPascalCase(contextName)}ContextPrivateStates) {`,
    `I${toPascalCase(contextName)}ContextPrivateStates) {\n    this.${contextState} = privateStates.${contextState};`
  ).replace(
    "clear() {",
    `clear() {\n    this.${contextState}.clear({});`
  ).replace(
    `} from "./${contextName}.interfaces";`,
    `  I${toPascalCase(contextState)},\n} from "./${contextName}.interfaces";`
  );
  await writeFile(statesFile, statesContentUpdated);
}
