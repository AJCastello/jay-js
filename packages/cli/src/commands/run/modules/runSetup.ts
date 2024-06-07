// node 
import fs from "fs/promises";
import path from "node:path";

// yaml
import yaml from "yaml";
import { cliRunner } from "./cliRunner";

async function checkFileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

export async function runSetup(fileName: string) {
  const filePath = path.join(process.cwd(), fileName);

  const yamlFileExists = await checkFileExists(`${filePath}.yml`);
  if (yamlFileExists) {
    const yamlFile = await fs.readFile(`${filePath}.yml`, "utf-8");
    const yamlFileParsed = yaml.parse(yamlFile);
    cliRunner(yamlFileParsed);
    return;
  }

  const jsonFileExists = await checkFileExists(`${filePath}.json`);
  if (jsonFileExists) {
    const jsonFile = await fs.readFile(`${filePath}.json`, "utf-8");
    const jsonFileParsed = JSON.parse(jsonFile);
    cliRunner(jsonFileParsed);    
    return;
  }

  console.error("Error: File not found.");
  process.exit(1);
}