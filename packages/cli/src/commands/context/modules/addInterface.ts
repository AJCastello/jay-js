import { toPascalCase } from "../../../utils/case";
import { getFileContent, writeFile } from "../utils";

export async function addInterface(
  contextName: string,
  resource: string,
  type: "States" | "Actions" | "PrivateStorage" | "PrivateStates"
) {
  const [interfacesFile, interfaceContent] = await getFileContent(contextName, "interfaces");
  let resourceInterface = "";

  switch (type) {
    case "States":
      resourceInterface = "() => void";
      break;
    case "Actions":
      resourceInterface = "() => void";
      break;
    case "PrivateStorage":
      resourceInterface = "null";
      break;
    case "PrivateStates":
      resourceInterface = `StateType<I${toPascalCase(resource)}>`;
      break;
  }

  let interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(contextName)}Context${type} {`,
    `I${toPascalCase(contextName)}Context${type} {\n  ${resource}: ${resourceInterface};`
  );

  if (type === "PrivateStates") {
    interfacesContentUpdated = `export interface I${toPascalCase(resource)} {};\n${interfacesContentUpdated}`; 
  }

  await writeFile(interfacesFile, interfacesContentUpdated);
}
