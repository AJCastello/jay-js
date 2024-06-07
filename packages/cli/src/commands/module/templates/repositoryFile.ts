import { toPascalCase } from "../../../utils/case";

export function repositoryFileTemplate(moduleName: string, features: Array<string>): string {
  const formattedName = toPascalCase(moduleName);
  return `import { I${formattedName}Repository } from "./${moduleName}.interfaces";

class ${formattedName}Repository implements I${formattedName}Repository {
}

export const ${moduleName}Repository = new ${formattedName}Repository();
`;
  }
