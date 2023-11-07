import { IJayJSCLIInitOptions } from "../types/index.js";
import { execSync } from "child_process";

import {
  copyTemplateFiles,
  createDirectory,
  createFile
} from "../utils/filesystem.js";

import {
  generateIndexHtmlContent,
  generatePostCSSFileContent,
  generateStyleFileContent,
  generateTailwindConfigFileContent,
  generateViteConfigFileContent
} from "../utils/generate.js";

let tsConfigFile: any = {}
let packageFile: any = {}

const pkgVersion = {
  // @jay-js
  "@jay-js/static": "^1.0.0",
  "@jay-js/system": "^2.4.3",
  "@jay-js/ui": "^2.5.2",
  "@jay-js/jsx": "^1.0.0",

  "vite": "^4.5.0",
  "tailwindcss": "^3.3.5",
  "postcss": "^8.4.31",
  "autoprefixer": "^10.4.16",
  "typescript": "^5.2.2",

  "daisyui": "^3.9.4"

  // EXPERIMENTAL
  // "babel/preset-react": "^7.14.5",
  // webpack: "^5.51.1",
  // "webpack-cli": "^4.8.0",
  // "webpack-dev-server": "^3.11.2",
  // rollup: "^2.56.3",
  // "rollup-plugin-node-resolve": "^5.2.0",
  // "rollup-plugin-terser": "^7.0.2",
  // esbuild: "^0.12.28",
  // bun: "^0.0.1"
}

function setDefaultFilesConfig(projectName: string, javascriptVariant: "ts" | "js") {
  if (javascriptVariant === "ts") {
    tsConfigFile = {
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        module: "ESNext",
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        skipLibCheck: true,

        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,

        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true
      },
      include: ["src"]
    }
  }

  packageFile = {
    name: projectName,
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
    },
    dependencies: {
      "@jay-js/system": pkgVersion["@jay-js/system"],
    },
  }
}

function setupBuildToolsConfig(options: IJayJSCLIInitOptions) {
  if (options.buildTool === "vite") {
    packageFile.devDependencies = {
      "vite": pkgVersion.vite,
    }
    packageFile.scripts.dev = "vite";
    let buildCommand = "vite build";
    if (options.javascriptVariant === "ts") {
      buildCommand = "tsc && vite build";
    }
    packageFile.scripts.build = buildCommand;
    packageFile.scripts.preview = "vite preview";
  }
  // else if (options.buildTool === "bun") {
  //   packageFile.devDependencies = {
  //     "bun": pkgVersion.bun,
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

export async function setupProjectStructure(options: IJayJSCLIInitOptions): Promise<void> {
  console.log(`Creating project structure for ${options.projectName}...`);

  const ext = options.javascriptVariant;
  const projectRoot = `./${options.projectName}`;

  setDefaultFilesConfig(options.projectName, options.javascriptVariant);
  setupBuildToolsConfig(options);

  const { projectName, javascriptVariant, projectType, useJSX, languageType, installDependencies } = options;
  const templateId = `${projectType}-${javascriptVariant}${useJSX ? "x" : ""}${languageType === "multi" ? "-multi" : ""}`;

  // const templatePath = `templates/${templateId}`;

  await createDirectory(projectRoot);
  await createDirectory(`${projectRoot}/src`);

  await copyTemplateFiles(projectName, templateId);

  await createDirectory(`${projectRoot}/public`);
  await createDirectory(`${projectRoot}/src/styles`);

  await createFile(`${projectRoot}/index.html`, generateIndexHtmlContent(options.projectName, ext));

  if (options.projectType === "static") {
    packageFile.dependencies["@jay-js/static"] = pkgVersion["@jay-js/static"];
    packageFile.scripts.prebuild = "jayjs prepare --static";
    packageFile.scripts.postbuild = "jayjs build --static";
    await createFile(`${projectRoot}/vite.config.js`, generateViteConfigFileContent());
  }

  if (options.installUIPackage) {
    await createFile(`${projectRoot}/src/styles/globals.css`, generateStyleFileContent());
    packageFile.devDependencies.tailwindcss = pkgVersion.tailwindcss;
    packageFile.devDependencies.postcss = pkgVersion.postcss;
    packageFile.devDependencies.autoprefixer = pkgVersion.autoprefixer;
    packageFile.dependencies["@jay-js/ui"] = pkgVersion["@jay-js/ui"];
    // packageFile.scripts["build:css"] = "postcss src/styles/global.css -o public/global.css";

    if (options.cssLibrary === "daisyui") {
      packageFile.devDependencies.daisyui = pkgVersion.daisyui;
    }

    await createFile(`${projectRoot}/tailwind.config.js`, generateTailwindConfigFileContent(options.installUIPackage, options.cssLibrary));
    await createFile(`${projectRoot}/postcss.config.js`, generatePostCSSFileContent());
  }

  // if (options.languageType === "multi") {
  //   createDirectory(`${projectRoot}/src/locales`);
  // }

  if (options.useJSX) {
    packageFile.dependencies["@jay-js/jsx"] = pkgVersion["@jay-js/jsx"];
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

  if (options.javascriptVariant === "ts") {
    packageFile.devDependencies.typescript = pkgVersion.typescript;
    await createFile(`${projectRoot}/tsconfig.json`, JSON.stringify(tsConfigFile, null, 2));
  }

  await createFile(`${projectRoot}/package.json`, JSON.stringify(packageFile, null, 2));

  if (installDependencies) {
    console.log(`Installing dependencies...`);
    execSync(`cd ${projectRoot} && pnpm install`);
  }

  console.log(`Project structure for ${options.projectName} created successfully.`);
}
