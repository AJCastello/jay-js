import { toPascalCase } from "../../../utils/case";

export function modelsFileTemplate(moduleName: string, features: Array<string>): string {
  const formattedName = toPascalCase(moduleName);
  return `import { I${formattedName}Models } from "./${moduleName}.interfaces";

class ${formattedName}Models implements I${formattedName}Models {
}

export const ${moduleName}Models = new ${formattedName}Models();
`;
  }
