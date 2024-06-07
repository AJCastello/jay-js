// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addRepository({ moduleName, repository }: { moduleName: string; repository: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "modules", moduleName);
  const interfacesFile = path.join(projectPath, `${moduleName}.interfaces.ts`);
  const repositoryFile = path.join(projectPath, `${moduleName}.repository.ts`);
  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const repositoryContent = await fs.readFile(repositoryFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(moduleName)}Repository {`,
    `I${toPascalCase(moduleName)}Repository {\n  ${repository}: () => void;`
  );

  const repositoryContentUpdated = repositoryContent.replace(
    `implements I${toPascalCase(moduleName)}Repository {`,
    `implements I${toPascalCase(moduleName)}Repository {\n  ${repository}() {};\n`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(repositoryFile, repositoryContentUpdated);
  console.log(`✔ "${repository}" method has been successfully added to "${moduleName}" repository!`);
}