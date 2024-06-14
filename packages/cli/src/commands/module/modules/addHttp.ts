// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addHttp({ moduleName, http }: { moduleName: string; http: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "modules", moduleName);
  const interfacesFile = path.join(projectPath, `${moduleName}.interfaces.ts`);
  const httpFile = path.join(projectPath, `${moduleName}.http.ts`);
  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const httpContent = await fs.readFile(httpFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(moduleName)}Http {`,
    `I${toPascalCase(moduleName)}Http {\n  ${http}: () => void;`
  );

  const httpContentUpdated = httpContent.replace(
    `implements I${toPascalCase(moduleName)}Http {`,
    `implements I${toPascalCase(moduleName)}Http {\n  ${http}() {};\n`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(httpFile, httpContentUpdated);
  console.log(`✔ "${http}" method has been successfully added to "${moduleName}" http!`);
}