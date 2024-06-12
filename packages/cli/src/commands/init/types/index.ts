export type TBuildTool = "vite" | "bun" | "webpack" | "rollup" | "esbuild";

export interface IJayJSCLIInitOptions {
  projectName: string;
  javascriptVariant: "ts" | "js";
  buildTool: TBuildTool;
  type: "static" | "spa";
  language: "single" | "multi";
  defaultLanguage?: string;
  uiPackage: boolean;
  cssPlugin?: "daisyui" | "none";
  useThemeProvider: boolean;
  useJSX: boolean;
  useTests: boolean;
  testLibrary?: "vitest" | "none";
  installDependencies: "npm" | "yarn" | "pnpm" | "none";
}

export interface IPackageVersion {
  "@jay-js/static": string;
  "@jay-js/system": string;
  "@jay-js/ui": string;
  "@jay-js/jsx": string;
  "vite": string;
  "tailwindcss": string;
  "postcss": string;
  "autoprefixer": string;
  "typescript": string;
  "daisyui": string;
  "vitest": string;
  // EXPERIMENTAL
  // "babel/preset-react": string;
  // webpack: string;
  // "webpack-cli": string;
  // "webpack-dev-server": string;
  // rollup: string;
  // "rollup-plugin-node-resolve": string;
  // "rollup-plugin-terser": string;
  // esbuild: string;
  // bun: string;
}

export interface ITsConfigFile {
  compilerOptions: Partial<{
    target: string;
    useDefineForClassFields: boolean;
    module: string;
    lib: Array<string>;
    skipLibCheck: boolean;

    esModuleInterop: boolean;
    moduleResolution: string;
    allowImportingTsExtensions: boolean;
    resolveJsonModule: boolean;
    isolatedModules: boolean;
    noEmit: boolean;
    sourceMap: boolean;

    strict: boolean;
    noUnusedLocals: boolean;
    noUnusedParameters: boolean;
    noFallthroughCasesInSwitch: boolean;
    jsx: "react-jsx";
    jsxImportSource: "@jay-js/jsx/runtime";
    outDir: string;
    allowJs: boolean;
  }>;
  include: ["src"];
}


interface IDevScripts {
  dev: string;
  build: string;
  preview: string;
  prebuild: string;
  postbuild: string;
  test: string;
  "build:css": string;
}

interface IDevDependencies {
  "@jay-js/static": string;
  "@jay-js/ui": string;
  "@jay-js/jsx": string;
  "vite": string;
  "tailwindcss": string;
  "postcss": string;
  "autoprefixer": string;
  "typescript": string;
  "daisyui": string;
  "vitest": string;
  "@babel/preset-react": string;
}

interface IDependencies {
  "@jay-js/system": string;
  "@jay-js/ui": string;
  "@jay-js/jsx": string;
  "@jay-js/static": string;
}

export interface IPackageFile {
  name: string;
  private: boolean;
  version: string;
  type: string;
  scripts: Partial<IDevScripts>;
  dependencies: Partial<IDependencies>;
  devDependencies: Partial<IDevDependencies>;
  babel?: {
    presets: Array<string>;
  };
  packageManager?: string;
}