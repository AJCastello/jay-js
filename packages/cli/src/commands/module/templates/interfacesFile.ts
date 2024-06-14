import { toPascalCase } from "../../../utils/case";

function interfaceTemplate(formattedName: string, feature: string): string {
  return `export interface I${formattedName}${toPascalCase(feature)} {\n}`
}

export function interfacesFileTemplate(moduleName: string, features: Array<string>): string {
  const formattedName = toPascalCase(moduleName);
  return features.map(feature => interfaceTemplate(formattedName, feature)).join("\n\n");
}