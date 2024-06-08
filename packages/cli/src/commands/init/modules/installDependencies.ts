// node
import { execSync } from "node:child_process";

// types
import { IJayJSCLIInitOptions } from "../types";

// utils
import { toKebabCase } from "../../../utils/case";

export function installDependencies(options: IJayJSCLIInitOptions) {
  if (options.installDependencies !== "none") {
    console.log("Installing dependencies...");
    process.chdir(toKebabCase(options.projectName));
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
    process.chdir("..");
  };
}