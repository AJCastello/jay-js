import { packageFile, packageVersion, tsConfigFile } from "../services/setupConfig.js";
import { IJayJSCLIInitOptions } from "../types/index.js";

export function setupJSXConfig(options: IJayJSCLIInitOptions) {
  if (options.useJSX) {
    packageFile.dependencies["@jay-js/jsx"] = packageVersion["@jay-js/jsx"];
    if (options.javascriptVariant === "ts") {
      tsConfigFile.compilerOptions.jsx = "react-jsx";
      tsConfigFile.compilerOptions.jsxImportSource = "@jay-js/jsx/runtime";
    } else {
      packageFile.devDependencies["@babel/preset-react"] = "^7.14.5";
      packageFile.babel = {
        presets: [
          "@babel/preset-react"
        ]
      }
    }
  }
}