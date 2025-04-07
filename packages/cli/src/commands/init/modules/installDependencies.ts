// node
import { execSync } from "node:child_process";

// types
import { IJayJSCLIInitOptions } from "../types";

// utils
import { toKebabCase } from "../../../utils/case";
import { log } from "../../../utils/terminal";

export function installDependencies(options: IJayJSCLIInitOptions) {
  if (options.installDependencies !== "none") {
    log`{yellow Installing dependencies...}`;
    process.chdir(toKebabCase(options.projectName));
    try {
      switch (options.installDependencies) {
        case "npm":
          execSync("npm install", { stdio: "inherit" });
          break;
        case "yarn":
          execSync("yarn install", { stdio: "inherit" });
          break;
        case "pnpm":
          execSync("pnpm install", { stdio: "inherit" });
          break;
      }
    } catch (error) {
      log`{red Error installing dependencies: ${error}}`;
      log`{yellow You can try to install them manually using 'npm install'}`;
    }
    process.chdir("..");
  };
  process.exit(0);
}