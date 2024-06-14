// node 
import * as vm from "vm";
import fs from "fs/promises";
import path from "node:path";

// options
import { jayJsOptions } from "../../../options/jayJsDefineOptions";
import { Ii18nOptions } from "../types";

// utils
import { toCamelCase, toKebabCase } from "../../../utils/case";
import { Translate } from "../services/translate";
import { face } from "../../../utils/terminal";

export async function addText({ value, translate }: { value: string; translate: boolean }) {
  face.startProgress("Adding text...");

  const projectPath = path.join(process.cwd(), jayJsOptions.build.srcDir);
  const localesPath = path.join(projectPath, "locales");
  const i18nFile = path.join(localesPath, "i18n.ts");
  const i18nContent = await fs.readFile(i18nFile, "utf8");

  const i18nContentUpdated = i18nContent
    .replace(/import\s+.*?;.*?\n/g, "")
    .replace(/export\s+const\s+i18n\s+=\s+useI18n.*?;/g, "")
    .replace(/export const i18nConfig: Ii18nOptions = {/g, "{")
    .replace(/export const i18nConfig = {/g, "{")
    .replace(/};/g, "} ");

  const sandbox = {};
  vm.createContext(sandbox);
  const i18nConfig = vm.runInContext(`(${i18nContentUpdated})`, sandbox) as Ii18nOptions;
  
  for(const language of i18nConfig.languages) {
    const localeFile = path.join(localesPath, `${language.code}.ts`);
    const localeContent = await fs.readFile(localeFile, "utf8");
    let translatedTtext = value;
    if (translate) {
      face.setMessage(`Translating text "${value}" to ${language.code}...`);
      translatedTtext = await Translate(value, toKebabCase(i18nConfig.defaultLocale), language.code);
    }
    face.setMessage(`Adding text "${value}" to ${language.code}...`);
    const localeContentUpdated = localeContent.replace(
      `const ${toCamelCase(language.code)}: Ii18nBase = {`,
      `const ${toCamelCase(language.code)}: Ii18nBase = {\n  "${value}": "${translatedTtext}",`
    );
    await fs.writeFile(localeFile, localeContentUpdated);
  }
  face.endProgress();
  console.log(`✔ Text "${value}" has been successfully added!`);
}