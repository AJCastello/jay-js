// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addModels({ moduleName, models }: { moduleName: string; models: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "modules", moduleName);
  const interfacesFile = path.join(projectPath, `${moduleName}.interfaces.ts`);
  const modelsFile = path.join(projectPath, `${moduleName}.models.ts`);
  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const modelsContent = await fs.readFile(modelsFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(moduleName)}Models {`,
    `I${toPascalCase(moduleName)}Models {\n  ${models}: () => void;`
  );

  const modelsContentUpdated = modelsContent.replace(
    `implements I${toPascalCase(moduleName)}Models {`,
    `implements I${toPascalCase(moduleName)}Models {\n  ${models}() {};\n`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(modelsFile, modelsContentUpdated);
  console.log(`✔ "${models}" method has been successfully added to "${moduleName}" models!`);
}