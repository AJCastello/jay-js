import { IJayJSCLIInitOptions } from "../types/index.js";
import { packageFile, packageVersion } from "../services/setupConfig.js";
import { createFile } from "../utils/filesystem.js";
import { toKebabCase } from "../../../utils/case.js";
import { viteTypesFile } from "../templates/configFiles.js";

export async function setupBuildTools(options: IJayJSCLIInitOptions) {
  const projectRoot = `./${toKebabCase(options.projectName)}`;
  if (options.buildTool === "vite") {
    packageFile.devDependencies = {
      "vite": packageVersion.vite,
    }
    packageFile.scripts.dev = "vite";
    let buildCommand = "vite build";
    if (options.javascriptVariant === "ts") {
      if (options.type === "static") {
        buildCommand = "tsc";
      } else {
        buildCommand = "tsc && vite build";
      }
    }
    packageFile.scripts.build = buildCommand;
    if (options.type === "static") {
      packageFile.scripts.prebuild = "jayjs build --prepare";
      if (options.uiPackage) {
        packageFile.scripts.prebuild = "jayjs build --prepare && npm run build:css";
        packageFile.scripts["build:css"] = "tailwindcss -i ./src/styles/globals.css -o ./dist/transformed/styles/globals.css";
      }
      packageFile.scripts.postbuild = "jayjs build --static";
    }
    packageFile.scripts.preview = "vite preview";
    await createFile(`${projectRoot}/src/vite-env.d.ts`, viteTypesFile());
  }

  // else if (options.buildTool === "bun") {
  //   packageFile.devDependencies = {
  //     "bun": packageVersion.bun,
  //   }
  //   packageFile.scripts.dev = "bun dev";
  //   packageFile.scripts.build = "bun build";
  // } else if (options.buildTool === "webpack") {

  //   packageFile.devDependencies = {
  //     "webpack": "^5.51.1",
  //     "webpack-cli": "^4.8.0",
  //     "webpack-dev-server": "^3.11.2"
  //   }
  //   packageFile.scripts.dev = "webpack serve";
  //   packageFile.scripts.build = "webpack";
  // } else if (options.buildTool === "rollup") {
  //   packageFile.devDependencies = {
  //     "rollup": "^2.56.3",
  //     "rollup-plugin-node-resolve": "^5.2.0",
  //     "rollup-plugin-terser": "^7.0.2"
  //   }
  //   packageFile.scripts.dev = "rollup -c -w";
  //   packageFile.scripts.build = "rollup -c";
  // } else if (options.buildTool === "esbuild") {
  //   packageFile.devDependencies = {
  //     "esbuild": "^0.12.28"
  //   }
  //   packageFile.scripts.dev = "esbuild --watch";
  //   packageFile.scripts.build = "esbuild";
  // }
}