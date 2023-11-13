import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import os from "os";

export async function downloadTemplateFiles(templateId: string, projectName: string) {
  const repoUrl = "https://github.com/AJCastello/jay-js.git";
  const templatePath = `templates/${templateId}`;
  const tempDir = path.join(os.tmpdir(), projectName);

  if (fs.existsSync(tempDir)) {
    fs.removeSync(tempDir);
  }

  console.log(chalk.bold(`\nCreating project: ${projectName}`));
  console.log(chalk.bold(`Template selected: ${templateId}`));

  try {
    fs.ensureDirSync(projectName);
    console.log(chalk.green(`Directory ${projectName} created successfully.`));

    execSync(`git clone --depth 1 --filter=blob:none --sparse ${repoUrl} "${tempDir}"`);
    execSync(`cd "${tempDir}" && git sparse-checkout set "${templatePath}"`);

    const fullPath = path.join(tempDir, templatePath);
    fs.copySync(fullPath, projectName);
    fs.removeSync(tempDir);

    console.log(chalk.green.bold(`\nProject ${projectName} has been successfully set up!`));
  } catch (err) {
    console.error(chalk.red(`Error setting up the project: ${err}`));
  }
}
