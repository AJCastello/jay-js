import { toPascalCase } from "../../../utils/case";

export function httpFileTemplate(moduleName: string, features: Array<string>): string {
  const formattedName = toPascalCase(moduleName);
  return `import { I${formattedName}Http } from "./${moduleName}.interfaces";

class ${formattedName}Http implements I${formattedName}Http {
}

export const ${moduleName}Http = new ${formattedName}Http();
`;
  }
