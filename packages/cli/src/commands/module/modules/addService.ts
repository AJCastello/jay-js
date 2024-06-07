// node 
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { toPascalCase } from "../../../utils/case";

export async function addService({ moduleName, service }: { moduleName: string; service: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir, "modules", moduleName);
  const interfacesFile = path.join(projectPath, `${moduleName}.interfaces.ts`);
  const serviceFile = path.join(projectPath, `${moduleName}.service.ts`);
  const interfaceContent = await fs.readFile(interfacesFile, "utf8");
  const serviceContent = await fs.readFile(serviceFile, "utf8");

  const interfacesContentUpdated = interfaceContent.replace(
    `I${toPascalCase(moduleName)}Service {`,
    `I${toPascalCase(moduleName)}Service {\n  ${service}: () => void;`
  );

  const serviceContentUpdated = serviceContent.replace(
    `implements I${toPascalCase(moduleName)}Service {`,
    `implements I${toPascalCase(moduleName)}Service {\n  ${service}() {};\n`
  );

  await fs.writeFile(interfacesFile, interfacesContentUpdated);
  await fs.writeFile(serviceFile, serviceContentUpdated);
  console.log(`✔ "${service}" method has been successfully added to "${moduleName}" service!`);
}