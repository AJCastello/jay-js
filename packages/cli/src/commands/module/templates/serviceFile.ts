import { toPascalCase } from "../../../utils/case";

export function serviceFileTemplate(moduleName: string, features: Array<string>): string {
  const formattedName = toPascalCase(moduleName);
  return `import { I${formattedName}Service } from "./${moduleName}.interfaces";

class ${formattedName}Service implements I${formattedName}Service {
}

export const ${moduleName}Service = new ${formattedName}Service();
`;
  }
