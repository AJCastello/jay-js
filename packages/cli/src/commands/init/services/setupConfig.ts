import { IPackageVersion, ITsConfigFile } from "../types/index.js";

export const packageVersion: IPackageVersion = {
  "@jay-js/static": "latest",
  "@jay-js/system": "latest",
  "@jay-js/ui": "latest",
  "@jay-js/jsx": "latest",
  "vite": "^4.5.0",
  "tailwindcss": "^3.3.5",
  "postcss": "^8.4.31",
  "autoprefixer": "^10.4.16",
  "typescript": "^5.2.2",
  "daisyui": "^3.9.4"
}

export const tsConfigFile: ITsConfigFile = {
  compilerOptions: {
    target: "ES6",
    module: "ESNext",
    moduleResolution: "node",
    strict: true,
    esModuleInterop: true,
    sourceMap: true,
    lib: ["DOM", "ESNext"],   
    outDir: "dist",
    allowJs: true,
  },
  include: ["src"]
}

export const packageFile: any = {
  name: "",
  private: true,
  version: "1.0.0",
  type: "module",
  scripts: {
  },
  dependencies: {
    "@jay-js/system": packageVersion["@jay-js/system"],
  },
  devDependencies: {
  }
}
