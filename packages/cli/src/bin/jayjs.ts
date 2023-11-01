#!/usr/bin/env node

import { Command } from "commander";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const relativePath = path.relative(process.cwd(), __dirname);

function joinPathRelative(...paths: string[]) {
  return path.join(relativePath, ...paths).replace(/\\/g, "/");
}

const program = new Command();

program
  .command("build")
  .description("Compiling the project")
  .option("--static", "Compiles the project to a static site")
  .action(async (options) => {
    if (options.static) {
      console.log("Compiling to static site...");
      const fileLoaderPath = joinPathRelative("../utils/loader.js");
      const renderPath = joinPathRelative("../modules/render.js");
      const buildCommand = `node --experimental-modules --es-module-specifier-resolution=node --experimental-loader ${fileLoaderPath} ${renderPath}`;
      execSync(buildCommand, { stdio: "inherit" });
    } else {
      console.log("Other build options are not yet available");
    }
  });


program
  .command("prepare")
  .description("Prepare content for static site generation")
  .option("--static", "Prepare static content")
  .action((options) => {
    if (options.static) {
      console.log("Preparing static content...");
      const preparerPath = joinPathRelative("../modules/prepare.js");
      const prepareCommand = `node --experimental-modules --es-module-specifier-resolution=node ${preparerPath}`;
      execSync(prepareCommand, { stdio: "inherit" });
    }
  });

program.parse(process.argv);
