import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { face } from "../../../utils/terminal";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createDirectory(targetDir: string): Promise<void> {
  try {
    await fs.ensureDir(targetDir);
    face.setMessage(`Directory created: ${targetDir}`);
  } catch (err) {
    console.log(chalk.red(`Error creating directory ${targetDir}: ${err}`));
    throw err;
  }
}

export async function createFile(filePath: string, content: string): Promise<void> {
  try {
    await fs.outputFile(filePath, content);
    face.setMessage(`File created: ${filePath}`);
  } catch (err) {
    console.log(chalk.red(`Error creating file ${filePath}: ${err}`));
    throw err;
  }
}

export async function readDirectory(dirPath: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dirPath);
    return files;
  } catch (err) {
    console.log(chalk.red(`Error reading directory ${dirPath}: ${err}`));
    throw err;
  }
}
