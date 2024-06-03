// node 
import * as vm from "vm";
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions.js";

// templates
import { localeFileTemplate } from "../templates/localeFile.js";
import { toKebabCase } from "../../../utils/case.js";

export async function createLocale({ value }: { value: string }) {
  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir);
  const localesPath = path.join(projectPath, "locales");
  const contextFile = localeFileTemplate(value);
  await fs.writeFile(path.join(localesPath, `${toKebabCase(value)}.ts`), contextFile);
  const i18nFile = path.join(localesPath, "i18n.ts");
  const i18nContent = await fs.readFile(i18nFile, "utf8");
  const i18nContentUpdated = i18nContent.replace(
    "languages: [",
    `languages: [
    {
      code: "${toKebabCase(value)}",
      import: async () => (await import("./${toKebabCase(value)}")).default,
    },`
  );
  await fs.writeFile(i18nFile, i18nContentUpdated);
  console.log(`✔ Locale "${value}" has been successfully created!`);
  return;
}

